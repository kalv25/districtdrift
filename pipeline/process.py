"""Process Michigan redistricting data and compute partisan metrics.

Inputs  (from pipeline/download.py):
  data/raw/boundaries/cd{congress}/   — NHGIS shapefiles (national, all states)
  data/raw/elections/1976-2022-house.csv — MIT Election Lab returns

Outputs:
  data/processed/mi_districts_{year}.geojson — one file per cycle
  data/processed/mi_stats.json               — all cycles, all metrics

Metrics computed per district per cycle:
  - efficiency_gap      : wasted votes metric; positive = favors Republicans
  - partisan_lean       : Democratic vote share (2-party)
  - polsby_popper       : compactness score (0–1, higher = more compact)
  - d_votes, r_votes    : aggregate 2-party votes for the district
  - won_by              : "D" | "R" | "split" (if district flipped mid-cycle)

Cycle-level metrics:
  - total_efficiency_gap  : sum across all districts / total votes
  - seats_d, seats_r      : seat count by party
  - votes_d, votes_r      : total 2-party votes statewide
  - seat_vote_ratio       : (D seats / total) / (D vote share)

Usage:
  python -m pipeline.process
"""

import io
import json
import math
from pathlib import Path

import geopandas as gpd
import pandas as pd

from .config import CYCLES, MI_FIPS, MI_STATE_PO, MICHIGAN_CRS, PROCESSED_DIR, RAW_DIR

RAW = Path(RAW_DIR)
PROCESSED = Path(PROCESSED_DIR)
BOUNDARIES_DIR = RAW / "boundaries"
ELECTIONS_CSV = RAW / "elections" / "1976-2024-house.tab"


# ---------------------------------------------------------------------------
# Load and filter data
# ---------------------------------------------------------------------------

def load_district_boundaries(cycle_year: int) -> gpd.GeoDataFrame:
    """Load NHGIS shapefile and filter to Michigan districts."""
    congress = CYCLES[cycle_year]["congress"]
    shp_dir = BOUNDARIES_DIR / f"cd{congress}"
    shp_files = list(shp_dir.glob("*.shp"))
    if not shp_files:
        raise FileNotFoundError(
            f"No shapefile found in {shp_dir}. Run pipeline.download first."
        )
    gdf = gpd.read_file(shp_files[0])

    # NHGIS state FIPS column varies by vintage:
    #   Modern:    STATEFP, STATEFP10, STATEFP20
    #   Older:     STATE, STATE80, STATE90, STATE00
    fips_candidates = {"STATEFP", "STATE", "STATEFP00", "STATEFP10", "STATEFP20",
                       "STATE80", "STATE90", "STATE00"}
    fips_col = next(
        (c for c in gdf.columns if c.upper() in fips_candidates),
        None,
    )
    if fips_col is None:
        raise ValueError(f"Cannot find state FIPS column in {shp_files[0]}. Columns: {list(gdf.columns)}")

    mi = gdf[gdf[fips_col].astype(str).str.zfill(2) == MI_FIPS].copy()
    mi = mi.reset_index(drop=True)

    # Normalize district number column to "district" (int).
    # NHGIS uses CD, CD108FP, CD113FP, CD118FP, etc. depending on vintage.
    import re as _re
    cd_col = next(
        (c for c in mi.columns
         if c.upper() in ("CD", "DISTNO", "DISTRICT")
         or _re.match(r"CD\d+FP$", c.upper())),
        None,
    )
    if cd_col:
        mi["district"] = pd.to_numeric(mi[cd_col], errors="coerce").astype("Int64")

    mi["cycle_year"] = cycle_year
    mi["congress"] = congress
    return mi


def load_election_results(cycle_year: int) -> pd.DataFrame:
    """Load MIT Election Lab returns for Michigan in the given election year.

    Returns a DataFrame with columns: district, d_votes, r_votes, total_votes, won_by.
    Uses 2-party vote totals only (excludes third parties for partisan metrics).
    """
    # The Dataverse export wraps each data row in outer double quotes while
    # the header is unquoted. Strip those outer quotes before parsing so
    # commas inside candidate names don't confuse the CSV parser.
    with open(ELECTIONS_CSV, encoding="latin-1") as fh:
        lines = fh.readlines()
    cleaned = [lines[0]] + [
        (ln.strip()[1:-1] + "\n" if ln.strip().startswith('"') and ln.strip().endswith('"')
         else ln)
        for ln in lines[1:]
    ]
    df = pd.read_csv(io.StringIO("".join(cleaned)), low_memory=False,
                     on_bad_lines="skip")

    # Filter to Michigan general elections in the target year
    mi = df[
        (df["state_po"] == MI_STATE_PO)
        & (df["year"] == cycle_year)
        & (df["stage"] == "GEN")
        & (~df["special"].astype(bool))
        & (df["office"] == "US HOUSE")
    ].copy()

    if mi.empty:
        raise ValueError(f"No MIT Election Lab results found for MI {cycle_year}.")

    # Normalize party labels
    mi["party_clean"] = mi["party"].str.upper().str.strip()

    # Aggregate D and R votes per district
    def agg_district(grp: pd.DataFrame) -> pd.Series:
        d = grp[grp["party_clean"].isin(("DEMOCRAT", "DEMOCRATIC"))]["candidatevotes"].sum()
        r = grp[grp["party_clean"] == "REPUBLICAN"]["candidatevotes"].sum()
        total = d + r  # 2-party total
        won_by = "D" if d > r else ("R" if r > d else "tie")
        return pd.Series({"d_votes": int(d), "r_votes": int(r),
                          "total_2party": int(total), "won_by": won_by})

    results = mi.groupby("district").apply(agg_district).reset_index()
    results["district"] = pd.to_numeric(results["district"], errors="coerce").astype("Int64")
    return results


# ---------------------------------------------------------------------------
# Partisan metrics
# ---------------------------------------------------------------------------

def compute_efficiency_gap(results: pd.DataFrame) -> float:
    """Compute statewide efficiency gap.

    Wasted votes = all votes for the losing party + (winning margin - 1) for the winner.
    EG = (wasted_D - wasted_R) / total_votes
    Positive EG = Democrats waste more votes = maps favor Republicans.
    """
    wasted_d = 0
    wasted_r = 0
    total = 0

    for _, row in results.iterrows():
        d, r = row["d_votes"], row["r_votes"]
        t = d + r
        if t == 0:
            continue
        threshold = math.floor(t / 2) + 1
        if d > r:  # D wins
            wasted_d += d - threshold
            wasted_r += r
        else:  # R wins (or tie — treated as R)
            wasted_r += r - threshold
            wasted_d += d
        total += t

    if total == 0:
        return 0.0
    return (wasted_d - wasted_r) / total


def compute_mean_median(results: pd.DataFrame) -> float:
    """Mean-median difference: mean D vote share minus median D vote share.

    Negative = median is above mean = maps pack D voters = favors Republicans.
    """
    shares = results.apply(
        lambda r: r["d_votes"] / (r["d_votes"] + r["r_votes"])
        if (r["d_votes"] + r["r_votes"]) > 0 else float("nan"),
        axis=1,
    ).dropna()
    if shares.empty:
        return 0.0
    return float(shares.mean() - shares.median())


# ---------------------------------------------------------------------------
# Per-cycle processing
# ---------------------------------------------------------------------------

def process_cycle(cycle_year: int) -> tuple[gpd.GeoDataFrame, dict]:
    """Process one redistricting cycle. Returns (GeoDataFrame, cycle_stats_dict)."""
    print(f"  Loading {cycle_year} boundaries...")
    gdf = load_district_boundaries(cycle_year)

    print(f"  Loading {cycle_year} election results...")
    results = load_election_results(cycle_year)

    # Merge results onto geometry by district number
    gdf = gdf.merge(results, on="district", how="left")

    # Per-district compactness (project once for all districts)
    print(f"  Computing compactness scores...")
    gdf_proj = gdf.to_crs(MICHIGAN_CRS)
    gdf["polsby_popper"] = gdf_proj.geometry.apply(
        lambda geom: (4 * math.pi * geom.area) / (geom.length ** 2)
        if geom.length > 0 else 0.0
    )

    # Per-district partisan lean (D 2-party share)
    gdf["partisan_lean_d"] = gdf.apply(
        lambda r: r["d_votes"] / r["total_2party"]
        if pd.notna(r["total_2party"]) and r["total_2party"] > 0 else None,
        axis=1,
    )

    # Statewide metrics
    valid = gdf.dropna(subset=["d_votes", "r_votes"])
    eg = compute_efficiency_gap(valid)
    mm = compute_mean_median(valid)
    seats_d = int((valid["won_by"] == "D").sum())
    seats_r = int((valid["won_by"] == "R").sum())
    total_seats = CYCLES[cycle_year]["seats"]
    votes_d = int(valid["d_votes"].sum())
    votes_r = int(valid["r_votes"].sum())
    total_2party = votes_d + votes_r
    seat_vote_ratio = (
        (seats_d / total_seats) / (votes_d / total_2party)
        if total_2party > 0 and votes_d > 0 else None
    )

    meta = CYCLES[cycle_year]
    cycle_stats = {
        "cycle_year": cycle_year,
        "congress": meta["congress"],
        "total_seats": total_seats,
        "redistricting_controller": meta["redistricting_controller"],
        "notes": meta.get("notes", ""),
        "efficiency_gap": round(eg, 4),
        "mean_median_diff": round(mm, 4),
        "seats_d": seats_d,
        "seats_r": seats_r,
        "votes_d": votes_d,
        "votes_r": votes_r,
        "seat_vote_ratio_d": round(seat_vote_ratio, 4) if seat_vote_ratio else None,
    }

    # Round floats for output
    gdf["polsby_popper"] = gdf["polsby_popper"].round(4)
    gdf["partisan_lean_d"] = gdf["partisan_lean_d"].round(4)

    return gdf, cycle_stats


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def export_cycle(gdf: gpd.GeoDataFrame, cycle_year: int) -> Path:
    """Write per-cycle GeoJSON to data/processed/."""
    PROCESSED.mkdir(parents=True, exist_ok=True)
    dest = PROCESSED / f"mi_districts_{cycle_year}.geojson"

    # Keep only columns relevant to the frontend; drop raw NHGIS columns
    keep = [
        "district", "cycle_year", "congress",
        "d_votes", "r_votes", "total_2party", "won_by",
        "partisan_lean_d", "polsby_popper",
        "geometry",
    ]
    out = gdf[[c for c in keep if c in gdf.columns]].copy()

    # Reproject to WGS84 for GeoJSON
    out = out.to_crs("EPSG:4326")
    out.to_file(dest, driver="GeoJSON")
    print(f"  Wrote {dest}")
    return dest


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    print("=== Processing Michigan redistricting data ===\n")

    credits = [
        {"label": "Redistricting Data Hub", "url": "https://redistrictingdatahub.org", "note": "precinct election results & shapefiles"},
        {"label": "NHGIS", "url": "https://www.nhgis.org", "note": "congressional district boundaries"},
        {"label": "Princeton Gerrymandering Project", "url": "https://gerrymander.princeton.edu", "note": "partisan scores"},
        {"label": "US Census TIGER", "url": "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html", "note": "base geography"},
    ]
    all_stats = {"state": "Michigan", "fips": MI_FIPS, "credits": credits, "cycles": []}

    for cycle_year in sorted(CYCLES.keys()):
        print(f"\n[Cycle {cycle_year}]")
        gdf, cycle_stats = process_cycle(cycle_year)
        export_cycle(gdf, cycle_year)
        all_stats["cycles"].append(cycle_stats)

        print(f"  Efficiency gap : {cycle_stats['efficiency_gap']:+.4f}")
        print(f"  Seats D/R      : {cycle_stats['seats_d']} / {cycle_stats['seats_r']} of {cycle_stats['total_seats']}")
        print(f"  Controller     : {cycle_stats['redistricting_controller']}")

    # Write summary JSON
    PROCESSED.mkdir(parents=True, exist_ok=True)
    stats_path = PROCESSED / "mi_stats.json"
    with open(stats_path, "w") as fh:
        json.dump(all_stats, fh, indent=2)
    print(f"\nWrote {stats_path}")
    print("Processing complete.")


if __name__ == "__main__":
    main()
