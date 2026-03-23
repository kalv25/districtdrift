"""Process redistricting data and compute partisan metrics.

Inputs  (from pipeline/download.py):
  data/raw/boundaries/cd{congress}/   — NHGIS shapefiles (national, all states)
  data/raw/elections/1976-2024-house.tab — MIT Election Lab returns

Outputs (per state):
  data/processed/{state_lower}_districts_{year}.geojson — one file per cycle
  data/processed/{state_lower}_stats.json               — all cycles, all metrics

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
  uv run python -m pipeline.process --state NC
  uv run python -m pipeline.process --state MI
"""

import argparse
import io
import json
import math
import re as _re
import sys
from pathlib import Path

import geopandas as gpd
import pandas as pd

from .config import MIT_ELECTIONS_FILENAME, PROCESSED_DIR, RAW_DIR, get_state

RAW = Path(RAW_DIR)
PROCESSED = Path(PROCESSED_DIR)
BOUNDARIES_DIR = RAW / "boundaries"
ELECTIONS_CSV = RAW / "elections" / MIT_ELECTIONS_FILENAME


# ---------------------------------------------------------------------------
# Load and filter data
# ---------------------------------------------------------------------------

def load_district_boundaries(cycle_year: int, state_fips: str, cycles: dict) -> gpd.GeoDataFrame:
    """Load NHGIS shapefile and filter to the given state's districts."""
    congress = cycles[cycle_year]["congress"]
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

    state_gdf = gdf[gdf[fips_col].astype(str).str.zfill(2) == state_fips].copy()
    state_gdf = state_gdf.reset_index(drop=True)

    # Normalize district number column to "district" (int).
    cd_col = next(
        (c for c in state_gdf.columns
         if c.upper() in ("CD", "DISTNO", "DISTRICT")
         or _re.match(r"CD\d+FP$", c.upper())),
        None,
    )
    if cd_col:
        state_gdf["district"] = pd.to_numeric(state_gdf[cd_col], errors="coerce").astype("Int64")

    state_gdf["cycle_year"] = cycle_year
    state_gdf["congress"] = congress
    return state_gdf


def load_election_results(cycle_year: int, state_po: str) -> pd.DataFrame:
    """Load MIT Election Lab returns for the given state and election year.

    Returns a DataFrame with columns: district, d_votes, r_votes, total_2party, won_by.
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

    state_df = df[
        (df["state_po"] == state_po)
        & (df["year"] == cycle_year)
        & (df["stage"] == "GEN")
        & (~df["special"].astype(bool))
        & (df["office"] == "US HOUSE")
    ].copy()

    if state_df.empty:
        raise ValueError(f"No MIT Election Lab results found for {state_po} {cycle_year}.")

    state_df["party_clean"] = state_df["party"].str.upper().str.strip()

    # Party labels vary by state and era. Minnesota DFL ran as
    # "DEMOCRATIC-FARMER-LABOR" (or "DEMOCRATIC-FARM-LABOR"); Minnesota
    # Republicans ran as "INDEPENDENT-REPUBLICAN" through 1994.
    DEM_LABELS = frozenset({
        "DEMOCRAT", "DEMOCRATIC",
        "DEMOCRATIC-FARMER-LABOR", "DEMOCRATIC-FARM-LABOR",
    })
    REP_LABELS = frozenset({
        "REPUBLICAN", "INDEPENDENT-REPUBLICAN",
    })

    # Total votes cast per district (all parties, not just 2-party)
    total_votes_by_district = state_df.groupby("district")["candidatevotes"].sum().reset_index()
    total_votes_by_district.columns = ["district", "total_votes_cast"]

    def agg_district(grp: pd.DataFrame) -> pd.Series:
        d = grp[grp["party_clean"].isin(DEM_LABELS)]["candidatevotes"].sum()
        r = grp[grp["party_clean"].isin(REP_LABELS)]["candidatevotes"].sum()
        total = d + r
        won_by = "D" if d > r else ("R" if r > d else "tie")
        contested = bool(d > 0 and r > 0)
        margin_pct = abs(d - r) / total if (contested and total > 0) else None
        return pd.Series({"d_votes": int(d), "r_votes": int(r),
                          "total_2party": int(total), "won_by": won_by,
                          "contested": contested, "margin_pct": margin_pct})

    results = state_df.groupby("district").apply(agg_district).reset_index()
    results["district"] = pd.to_numeric(results["district"], errors="coerce").astype("Int64")
    total_votes_by_district["district"] = pd.to_numeric(
        total_votes_by_district["district"], errors="coerce"
    ).astype("Int64")
    results = results.merge(total_votes_by_district, on="district", how="left")
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
        if d > r:
            wasted_d += d - threshold
            wasted_r += r
        else:
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

def process_cycle(
    cycle_year: int,
    state_fips: str,
    state_po: str,
    state_crs: str,
    cycles: dict,
) -> tuple[gpd.GeoDataFrame, dict]:
    """Process one redistricting cycle. Returns (GeoDataFrame, cycle_stats_dict)."""
    print(f"  Loading {cycle_year} boundaries...")
    gdf = load_district_boundaries(cycle_year, state_fips, cycles)

    print(f"  Loading {cycle_year} election results...")
    results = load_election_results(cycle_year, state_po)

    gdf = gdf.merge(results, on="district", how="left")

    print(f"  Computing compactness scores...")
    gdf_proj = gdf.to_crs(state_crs)
    gdf["polsby_popper"] = gdf_proj.geometry.apply(
        lambda geom: (4 * math.pi * geom.area) / (geom.length ** 2)
        if geom.length > 0 else 0.0
    )

    gdf["partisan_lean_d"] = gdf.apply(
        lambda r: r["d_votes"] / r["total_2party"]
        if pd.notna(r["total_2party"]) and r["total_2party"] > 0 else None,
        axis=1,
    )

    valid = gdf.dropna(subset=["d_votes", "r_votes"])
    eg = compute_efficiency_gap(valid)
    mm = compute_mean_median(valid)
    meta = cycles[cycle_year]
    total_seats = meta["seats"]
    seats_d = int((valid["won_by"] == "D").sum())
    seats_r = int((valid["won_by"] == "R").sum())
    votes_d = int(valid["d_votes"].sum())
    votes_r = int(valid["r_votes"].sum())
    total_2party = votes_d + votes_r
    seat_vote_ratio = (
        (seats_d / total_seats) / (votes_d / total_2party)
        if total_2party > 0 and votes_d > 0 else None
    )

    # Average compactness across districts with valid geometry
    pp_valid = valid["polsby_popper"].dropna()
    avg_compactness = round(float(pp_valid.mean()), 4) if not pp_valid.empty else None

    # District competitiveness breakdown by partisan lean
    # Thresholds: solid D >60%, lean D 55–60%, competitive 45–55%, lean R 40–45%, solid R <40%
    lean = valid["partisan_lean_d"].dropna()
    competitiveness = {
        "solid_d":    int((lean > 0.60).sum()),
        "lean_d":     int(((lean > 0.55) & (lean <= 0.60)).sum()),
        "competitive": int(((lean >= 0.45) & (lean <= 0.55)).sum()),
        "lean_r":     int(((lean >= 0.40) & (lean < 0.45)).sum()),
        "solid_r":    int((lean < 0.40).sum()),
    }

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
        "avg_compactness": avg_compactness,
        "competitiveness": competitiveness,
    }

    gdf["polsby_popper"] = gdf["polsby_popper"].round(4)
    gdf["partisan_lean_d"] = gdf["partisan_lean_d"].astype(float).round(4)

    # Build per-district list for the stats JSON
    districts = []
    for _, row in gdf.sort_values("district").iterrows():
        d = {
            "district": int(row["district"]) if pd.notna(row.get("district")) else None,
            "won_by": row.get("won_by", None),
            "partisan_lean_d": float(row["partisan_lean_d"]) if pd.notna(row.get("partisan_lean_d")) else None,
            "polsby_popper": float(row["polsby_popper"]) if pd.notna(row.get("polsby_popper")) else None,
            "d_votes": int(row["d_votes"]) if pd.notna(row.get("d_votes")) else None,
            "r_votes": int(row["r_votes"]) if pd.notna(row.get("r_votes")) else None,
            "total_votes_cast": int(row["total_votes_cast"]) if pd.notna(row.get("total_votes_cast")) else None,
            "margin_pct": round(float(row["margin_pct"]), 4) if pd.notna(row.get("margin_pct")) else None,
            "contested": bool(row["contested"]) if pd.notna(row.get("contested")) else None,
        }
        districts.append(d)
    cycle_stats["districts"] = districts

    return gdf, cycle_stats


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def export_cycle(gdf: gpd.GeoDataFrame, cycle_year: int, state_lower: str) -> Path:
    """Write per-cycle GeoJSON to data/processed/."""
    PROCESSED.mkdir(parents=True, exist_ok=True)
    dest = PROCESSED / f"{state_lower}_districts_{cycle_year}.geojson"

    keep = [
        "district", "cycle_year", "congress",
        "d_votes", "r_votes", "total_2party", "won_by",
        "partisan_lean_d", "polsby_popper",
        "geometry",
    ]
    out = gdf[[c for c in keep if c in gdf.columns]].copy()
    out = out.to_crs("EPSG:4326")
    out.to_file(dest, driver="GeoJSON")
    print(f"  Wrote {dest}")
    return dest


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

CREDITS = [
    {"label": "Redistricting Data Hub", "url": "https://redistrictingdatahub.org",
     "note": "precinct election results & shapefiles"},
    {"label": "NHGIS", "url": "https://www.nhgis.org",
     "note": "congressional district boundaries"},
    {"label": "MIT Election Lab", "url": "https://electionlab.mit.edu/data",
     "note": "US House election returns 1976–2024"},
    {"label": "US Census TIGER", "url": "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html",
     "note": "base geography"},
]


def main() -> None:
    parser = argparse.ArgumentParser(description="Process redistricting data for a state")
    parser.add_argument("--state", required=True, help="State postal code (e.g. MI, NC)")
    args = parser.parse_args()

    try:
        state_cfg = get_state(args.state)
    except ValueError as e:
        print(f"ERROR: {e}")
        sys.exit(1)

    state_po = args.state.upper()
    state_lower = state_po.lower()
    state_name = state_cfg["name"]
    state_fips = state_cfg["fips"]
    state_crs = state_cfg["crs"]
    cycles = state_cfg["cycles"]

    print(f"=== Processing {state_name} redistricting data ===\n")

    all_stats = {
        "state": state_name,
        "fips": state_fips,
        "credits": CREDITS,
        "cycles": [],
    }

    for cycle_year in sorted(cycles.keys()):
        print(f"\n[Cycle {cycle_year}]")
        gdf, cycle_stats = process_cycle(cycle_year, state_fips, state_po, state_crs, cycles)
        export_cycle(gdf, cycle_year, state_lower)
        all_stats["cycles"].append(cycle_stats)

        print(f"  Efficiency gap : {cycle_stats['efficiency_gap']:+.4f}")
        print(f"  Seats D/R      : {cycle_stats['seats_d']} / {cycle_stats['seats_r']} of {cycle_stats['total_seats']}")
        print(f"  Controller     : {cycle_stats['redistricting_controller']}")

    PROCESSED.mkdir(parents=True, exist_ok=True)
    stats_path = PROCESSED / f"{state_lower}_stats.json"
    with open(stats_path, "w") as fh:
        json.dump(all_stats, fh, indent=2)
    print(f"\nWrote {stats_path}")
    print("Processing complete.")


if __name__ == "__main__":
    main()
