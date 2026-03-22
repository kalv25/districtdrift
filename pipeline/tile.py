"""Generate PMTiles from processed district GeoJSON files.

Requires tippecanoe to be installed:
  macOS: brew install tippecanoe
  Linux: https://github.com/felt/tippecanoe

Inputs:
  data/processed/{state_lower}_districts_{year}.geojson  (one per cycle)

Output:
  tiles/{state_lower}_districts.pmtiles  (all cycles in one file)

Usage:
  uv run python -m pipeline.tile --state NC
  uv run python -m pipeline.tile --state MI
"""

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from .config import PROCESSED_DIR, TILES_DIR, get_state

PROCESSED = Path(PROCESSED_DIR)
TILES = Path(TILES_DIR)


def check_tippecanoe() -> None:
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


def merge_geojsons(state_lower: str, cycles: dict) -> dict:
    """Merge all per-cycle GeoJSON files into a single FeatureCollection."""
    merged = {"type": "FeatureCollection", "features": []}
    for cycle_year in sorted(cycles.keys()):
        src = PROCESSED / f"{state_lower}_districts_{cycle_year}.geojson"
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


def run_tippecanoe(input_path: Path, output_path: Path, layer_name: str) -> None:
    cmd = [
        "tippecanoe",
        "--output", str(output_path),
        "--force",
        "--generate-ids",
        "--minimum-zoom=2",
        "--maximum-zoom=10",
        "--simplification=4",
        "--no-tile-size-limit",
        "--coalesce-smallest-as-needed",
        f"--layer={layer_name}",
        str(input_path),
    ]
    print(f"  Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=False)
    if result.returncode != 0:
        print(f"ERROR: tippecanoe failed with exit code {result.returncode}")
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate PMTiles for a state")
    parser.add_argument("--state", required=True, help="State postal code (e.g. MI, NC)")
    args = parser.parse_args()

    try:
        state_cfg = get_state(args.state)
    except ValueError as e:
        print(f"ERROR: {e}")
        sys.exit(1)

    state_lower = args.state.lower()
    state_name = state_cfg["name"]
    cycles = state_cfg["cycles"]
    layer_name = f"{state_lower}_districts"

    print(f"=== Generating {state_name} PMTiles ===\n")

    check_tippecanoe()
    TILES.mkdir(parents=True, exist_ok=True)

    print("\n[1/2] Merging GeoJSON files...")
    merged = merge_geojsons(state_lower, cycles)
    if not merged["features"]:
        print("ERROR: No features found. Run pipeline.process first.")
        sys.exit(1)
    print(f"  Total features: {len(merged['features'])}")

    print("\n[2/2] Generating PMTiles...")
    output = TILES / f"{state_lower}_districts.pmtiles"
    with tempfile.NamedTemporaryFile(mode="w", suffix=".geojson", delete=False) as tmp:
        json.dump(merged, tmp)
        tmp_path = Path(tmp.name)

    try:
        run_tippecanoe(tmp_path, output, layer_name)
    finally:
        tmp_path.unlink(missing_ok=True)

    size_mb = output.stat().st_size / (1024 * 1024)
    print(f"\nWrote {output} ({size_mb:.1f} MB)")
    print("PMTiles generation complete.")


if __name__ == "__main__":
    main()
