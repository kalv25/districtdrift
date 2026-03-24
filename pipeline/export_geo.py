"""Export simplified per-cycle GeoJSON files for frontend morphing animation.

Reads the already-processed GeoJSON files from data/processed/ and writes
smaller, simplified versions to web/static/geo/ for use in the morph animation.

Usage:
  uv run python -m pipeline.export_geo --state NC
  uv run python -m pipeline.export_geo --state MI
"""

import argparse
import sys
from pathlib import Path

import geopandas as gpd
import pyogrio

from .config import PROCESSED_DIR, get_state

PROCESSED = Path(PROCESSED_DIR)
DEST = Path(__file__).parent.parent / "web" / "static" / "geo"

# Simplification tolerance in degrees. At zoom 5–7 over a US state,
# ~0.005° (~500 m) is plenty of detail for smooth animation.
SIMPLIFY_TOL = 0.005


def main() -> None:
    parser = argparse.ArgumentParser(description="Export simplified GeoJSON for frontend")
    parser.add_argument("--state", required=True, help="State postal code (e.g. MI, NC)")
    args = parser.parse_args()

    try:
        state_cfg = get_state(args.state)
    except ValueError as e:
        print(f"ERROR: {e}")
        sys.exit(1)

    state_lower = args.state.lower()
    cycles = state_cfg["cycles"]

    DEST.mkdir(parents=True, exist_ok=True)

    for year in sorted(cycles.keys()):
        src = PROCESSED / f"{state_lower}_districts_{year}.geojson"
        if not src.exists():
            print(f"  SKIP {year}: {src} not found — run pipeline.process first.")
            continue

        pyogrio.set_gdal_config_options({"OGR_GEOJSON_MAX_OBJ_SIZE": "0"})
        gdf = gpd.read_file(src)
        gdf = gdf[["district", "won_by", "partisan_lean_d", "geometry"]].copy()
        gdf.geometry = gdf.geometry.simplify(SIMPLIFY_TOL, preserve_topology=True)

        dest = DEST / f"{state_lower}_{year}.geojson"
        gdf.to_file(dest, driver="GeoJSON")

        size_kb = dest.stat().st_size / 1024
        print(f"  {dest.name}  {size_kb:.0f} KB  ({len(gdf)} districts)")

    print("Done.")


if __name__ == "__main__":
    main()
