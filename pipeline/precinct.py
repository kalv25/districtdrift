"""Generate precinct-level PMTiles from RDH VEST shapefiles.

Input: RDH VEST shapefiles placed manually at:
  data/raw/precincts/{state_lower}/{year}.zip

RDH VEST files bundle precinct geometries WITH election results in a single
shapefile. Column naming follows the VEST convention:
  G{YY}{OFFICE}{PARTY}{CANDIDATE}  e.g. G22USHDBENSON, G22USHRJAMES

This script:
1. Reads the VEST ZIP for each available cycle
2. Detects and sums US House D/R vote columns (falls back to PRES if absent)
3. Computes pct_d, adds cycle_year, reprojects to WGS84
4. Runs Tippecanoe → {state_lower}_precincts.pmtiles in web/static/tiles/

Usage:
  uv run python -m pipeline.precinct --state MI
  uv run python -m pipeline.precinct --state GA --cycles 2022

Getting the input data:
  1. Create a free account at redistrictingdatahub.org
  2. Search for "{state} VEST {year} precinct election results and boundaries"
  3. Download the ZIP and place it at data/raw/precincts/{state_lower}/{year}.zip
     e.g. data/raw/precincts/mi/2022.zip
"""

import argparse
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path
from typing import cast

import geopandas as gpd

from .config import TILES_DIR, get_state

RAW_PRECINCTS = Path("data/raw/precincts")
TILES = Path(TILES_DIR)

# Cycles for which precinct data is commonly available from RDH
PRECINCT_CYCLES = [2012, 2022]

# VEST election-year prefixes: cycle_year → 2-digit election year(s) to try
# For 2022 cycle: use 2022 election (G22); for 2012 cycle: try G12 then G14
CYCLE_TO_ELEC_YEARS: dict[int, list[str]] = {
    2012: ["12", "14", "16"],
    2022: ["22", "20"],
}


# ---------------------------------------------------------------------------
# Column detection
# ---------------------------------------------------------------------------

def _find_vote_columns(
    columns: list[str],
    elec_years: list[str],
    offices: list[str],
    party: str,
) -> list[str]:
    """Find VEST vote columns for the given party and office preferences.

    Returns the first matching set (highest-priority year × office combo).
    """
    for yr in elec_years:
        for office in offices:
            prefix = f"G{yr}{office}{party}"
            matches = [c for c in columns if c.upper().startswith(prefix.upper())]
            if matches:
                return matches
    return []


def detect_vote_columns(
    columns: list[str],
    cycle_year: int,
) -> tuple[list[str], list[str], str]:
    """Return (d_cols, r_cols, source_label) for the best available office.

    Priority: US House → Governor → Senate → President
    Falls back through election years within the cycle.
    """
    elec_years = CYCLE_TO_ELEC_YEARS.get(cycle_year, ["22"])
    offices = ["USH", "GOV", "USS", "PRES"]

    for yr in elec_years:
        for office in offices:
            d_cols = _find_vote_columns(columns, [yr], [office], "D")
            r_cols = _find_vote_columns(columns, [yr], [office], "R")
            if d_cols and r_cols:
                label = f"20{yr} {office}"
                return d_cols, r_cols, label

    return [], [], "unknown"


# ---------------------------------------------------------------------------
# Shapefile processing
# ---------------------------------------------------------------------------

def process_vest_zip(zip_path: Path, cycle_year: int, _state_po: str) -> gpd.GeoDataFrame | None:
    """Read a RDH VEST ZIP, extract votes, return a tiled-ready GeoDataFrame."""
    print(f"  Reading {zip_path.name}...")

    with tempfile.TemporaryDirectory() as tmpdir:
        with zipfile.ZipFile(zip_path) as zf:
            zf.extractall(tmpdir)

        # Find the shapefile (may be nested inside a subdirectory)
        shp_files = list(Path(tmpdir).rglob("*.shp"))
        if not shp_files:
            print(f"    ERROR: no .shp file found in {zip_path.name}")
            return None

        shp_path = shp_files[0]
        print(f"    Shapefile: {shp_path.name}")
        gdf = gpd.read_file(shp_path)

    print(f"    Rows: {len(gdf)}, CRS: {gdf.crs}")
    cols = list(gdf.columns)

    d_cols, r_cols, source_label = detect_vote_columns(cols, cycle_year)

    if not d_cols or not r_cols:
        print(f"    WARNING: no D/R vote columns found for cycle {cycle_year}.")
        print(f"    Available columns (first 40): {cols[:40]}")
        print(f"    Skipping {cycle_year}.")
        return None

    print(f"    Vote source: {source_label}")
    print(f"    D cols ({len(d_cols)}): {d_cols[:3]}{'...' if len(d_cols) > 3 else ''}")
    print(f"    R cols ({len(r_cols)}): {r_cols[:3]}{'...' if len(r_cols) > 3 else ''}")

    # Sum votes — coerce to numeric first (VEST columns are sometimes stored as strings)
    for c in d_cols + r_cols:
        gdf[c] = gpd.pd.to_numeric(gdf[c], errors="coerce").fillna(0)

    gdf["d_votes"] = gdf[d_cols].sum(axis=1).astype(int)
    gdf["r_votes"] = gdf[r_cols].sum(axis=1).astype(int)
    gdf["total_votes"] = gdf["d_votes"] + gdf["r_votes"]

    # pct_d: 0.0–1.0; None for uncontested precincts with 0 total votes
    gdf["pct_d"] = gdf.apply(
        lambda row: round(row["d_votes"] / row["total_votes"], 4)
        if row["total_votes"] > 0 else None,
        axis=1,
    )

    gdf["cycle_year"] = cycle_year
    gdf["vote_source"] = source_label

    # Keep only what we need for tiles
    keep = ["d_votes", "r_votes", "total_votes", "pct_d", "cycle_year", "geometry"]
    gdf = gdf[keep].copy()

    # Reproject to WGS84 for GeoJSON / Tippecanoe
    if gdf.crs and gdf.crs.to_epsg() != 4326:
        gdf = gdf.to_crs(epsg=4326)

    # Drop precincts with no geometry or 0 total votes
    gdf = gdf[gdf.geometry.notna() & gdf.geometry.is_valid]
    gdf = gdf[gdf["total_votes"] > 0].copy()

    print(f"    Kept {len(gdf)} precincts with valid geometry and votes")
    return cast(gpd.GeoDataFrame, gdf)


# ---------------------------------------------------------------------------
# Tippecanoe
# ---------------------------------------------------------------------------

def run_tippecanoe_precincts(input_path: Path, output_path: Path, layer_name: str) -> None:
    cmd = [
        "tippecanoe",
        "--output", str(output_path),
        "--force",
        "--generate-ids",
        "--minimum-zoom=5",
        "--maximum-zoom=14",
        "--simplification=8",
        "--drop-smallest-as-needed",
        "--coalesce-smallest-as-needed",
        "--no-tile-size-limit",
        "--attribute-type=d_votes:int",
        "--attribute-type=r_votes:int",
        "--attribute-type=total_votes:int",
        "--attribute-type=cycle_year:int",
        f"--layer={layer_name}",
        str(input_path),
    ]
    print(f"  Running tippecanoe...")
    result = subprocess.run(cmd, capture_output=False)
    if result.returncode != 0:
        print(f"ERROR: tippecanoe failed (exit {result.returncode})")
        sys.exit(1)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Generate precinct PMTiles from RDH VEST shapefiles")
    parser.add_argument("--state", required=True, help="State postal code (e.g. MI)")
    parser.add_argument(
        "--cycles", nargs="+", type=int, default=PRECINCT_CYCLES,
        help=f"Cycle years to process (default: {PRECINCT_CYCLES})",
    )
    args = parser.parse_args()

    state_po = args.state.upper()
    state_lower = state_po.lower()

    try:
        state_cfg = get_state(state_po)
    except ValueError as e:
        print(f"ERROR: {e}")
        sys.exit(1)

    print(f"=== Precinct tiles for {state_cfg['name']} ===\n")

    # Collect available cycle ZIPs
    precinct_dir = RAW_PRECINCTS / state_lower
    frames: list[gpd.GeoDataFrame] = []

    for cycle_year in sorted(args.cycles):
        zip_path = precinct_dir / f"{cycle_year}.zip"
        if not zip_path.exists():
            print(f"  [{cycle_year}] SKIP — {zip_path} not found")
            print(f"         Get VEST data from redistrictingdatahub.org and place at {zip_path}")
            continue

        print(f"\n[{cycle_year}]")
        gdf = process_vest_zip(zip_path, cycle_year, state_po)
        if gdf is not None:
            frames.append(gdf)

    if not frames:
        print("\nNo data to tile. Download RDH VEST shapefiles and retry.")
        sys.exit(0)

    # Merge all cycles into one FeatureCollection for Tippecanoe
    merged = gpd.pd.concat(frames, ignore_index=True)
    merged = gpd.GeoDataFrame(merged, geometry="geometry", crs="EPSG:4326")
    print(f"\nTotal precincts across all cycles: {len(merged)}")

    # Write merged GeoJSON to temp file
    TILES.mkdir(parents=True, exist_ok=True)
    output = TILES / f"{state_lower}_precincts.pmtiles"
    layer_name = f"{state_lower}_precincts"

    with tempfile.NamedTemporaryFile(mode="w", suffix=".geojson", delete=False) as tmp:
        merged.to_file(tmp.name, driver="GeoJSON")
        tmp_path = Path(tmp.name)

    try:
        print(f"\nGenerating {output.name}...")
        run_tippecanoe_precincts(tmp_path, output, layer_name)
    finally:
        tmp_path.unlink(missing_ok=True)

    size_mb = output.stat().st_size / (1024 * 1024)
    print(f"\nWrote {output} ({size_mb:.1f} MB)")
    print("Precinct tiling complete.")


if __name__ == "__main__":
    main()
