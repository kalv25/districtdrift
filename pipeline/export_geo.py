"""Export simplified per-cycle GeoJSON files for frontend morphing animation.

Reads the already-processed GeoJSON files from data/processed/ and writes
smaller, simplified versions to web/static/geo/ for use in the morph animation.

Usage:
  uv run python -m pipeline.export_geo
"""

from pathlib import Path
import geopandas as gpd

from .config import CYCLES, PROCESSED_DIR

PROCESSED = Path(PROCESSED_DIR)
DEST = Path(__file__).parent.parent / "web" / "static" / "geo"

# Simplification tolerance in degrees. At zoom 5–7 over a US state,
# ~0.005° (~500 m) is plenty of detail for smooth animation.
SIMPLIFY_TOL = 0.005


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)

    for year in sorted(CYCLES.keys()):
        src = PROCESSED / f"mi_districts_{year}.geojson"
        if not src.exists():
            print(f"  SKIP {year}: {src} not found — run pipeline.process first.")
            continue

        gdf = gpd.read_file(src)  # already in WGS84 from process.py

        gdf = gdf[["district", "won_by", "geometry"]].copy()
        gdf.geometry = gdf.geometry.simplify(SIMPLIFY_TOL, preserve_topology=True)

        dest = DEST / f"mi_{year}.geojson"
        gdf.to_file(dest, driver="GeoJSON")

        size_kb = dest.stat().st_size / 1024
        print(f"  mi_{year}.geojson  {size_kb:.0f} KB  ({len(gdf)} districts)")

    print("Done.")


if __name__ == "__main__":
    main()
