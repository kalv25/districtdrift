"""Generate PMTiles from processed Michigan district GeoJSON files.

Requires tippecanoe to be installed:
  macOS: brew install tippecanoe
  Linux: https://github.com/felt/tippecanoe

Inputs:
  data/processed/mi_districts_{year}.geojson  (one per cycle)

Output:
  tiles/mi_districts.pmtiles  (all cycles in one file, distinguished by cycle_year property)

Usage:
  python -m pipeline.tile
"""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

from .config import CYCLES, PROCESSED_DIR, TILES_DIR

PROCESSED = Path(PROCESSED_DIR)
TILES = Path(TILES_DIR)


def check_tippecanoe() -> None:
    """Verify tippecanoe is installed and accessible."""
    result = subprocess.run(
        ["tippecanoe", "--version"],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        print(
            "ERROR: tippecanoe not found.\n"
            "  Install on macOS: brew install tippecanoe\n"
            "  Install on Linux: https://github.com/felt/tippecanoe#installation"
        )
        sys.exit(1)
    print(f"  tippecanoe: {result.stdout.strip() or result.stderr.strip()}")


def merge_geojsons() -> dict:
    """Merge all per-cycle GeoJSON files into a single FeatureCollection.

    Each feature retains its cycle_year property so the frontend can
    filter/style by decade.
    """
    merged = {"type": "FeatureCollection", "features": []}
    for cycle_year in sorted(CYCLES.keys()):
        src = PROCESSED / f"mi_districts_{cycle_year}.geojson"
        if not src.exists():
            print(f"  WARNING: {src} not found, skipping {cycle_year}.")
            continue
        with open(src) as fh:
            fc = json.load(fh)
        for feature in fc["features"]:
            feature["properties"]["cycle_year"] = cycle_year
        merged["features"].extend(fc["features"])
        print(f"  Added {len(fc['features'])} features from {cycle_year}")
    return merged


def run_tippecanoe(input_path: Path, output_path: Path) -> None:
    """Run tippecanoe to convert GeoJSON to PMTiles."""
    cmd = [
        "tippecanoe",
        "--output", str(output_path),
        "--force",                           # overwrite if exists
        "--generate-ids",                    # stable feature IDs
        "--minimum-zoom=2",
        "--maximum-zoom=10",
        "--simplification=4",                # simplify at lower zooms
        "--no-tile-size-limit",              # allow larger tiles if needed
        "--coalesce-smallest-as-needed",     # merge tiny polygons
        "--layer=mi_districts",
        str(input_path),
    ]
    print(f"  Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=False)
    if result.returncode != 0:
        print(f"ERROR: tippecanoe failed with exit code {result.returncode}")
        sys.exit(1)


def main() -> None:
    print("=== Generating Michigan PMTiles ===\n")

    check_tippecanoe()
    TILES.mkdir(parents=True, exist_ok=True)

    print("\n[1/2] Merging GeoJSON files...")
    merged = merge_geojsons()
    if not merged["features"]:
        print("ERROR: No features found. Run pipeline.process first.")
        sys.exit(1)
    print(f"  Total features: {len(merged['features'])}")

    print("\n[2/2] Generating PMTiles...")
    output = TILES / "mi_districts.pmtiles"
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".geojson", delete=False
    ) as tmp:
        json.dump(merged, tmp)
        tmp_path = Path(tmp.name)

    try:
        run_tippecanoe(tmp_path, output)
    finally:
        tmp_path.unlink(missing_ok=True)

    size_mb = output.stat().st_size / (1024 * 1024)
    print(f"\nWrote {output} ({size_mb:.1f} MB)")
    print("PMTiles generation complete.")


if __name__ == "__main__":
    main()
