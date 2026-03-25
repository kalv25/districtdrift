"""Download raw data for the redistricting pipeline.

Data sources:
  1. Congressional district boundaries — NHGIS via IPUMS API
     Requires a free API key: https://account.ipums.org/api_keys
     Set NHGIS_API_KEY in .env (see .env.example)

  2. US House election returns — MIT Election Lab via Harvard Dataverse
     Public, no key required.
     Dataset: https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/IG0UN2

Usage:
  uv run python -m pipeline.download          # downloads boundaries for all configured states
  uv run python -m pipeline.download --state NC
"""

import argparse
import io
import os
import re
import sys
import time
import zipfile
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv

from .config import (
    MIT_ELECTIONS_DOI,
    MIT_ELECTIONS_FILENAME,
    NHGIS_API_BASE,
    NHGIS_API_VERSION,
    RAW_DIR,
    STATES,
)

RAW = Path(RAW_DIR)
BOUNDARIES_DIR = RAW / "boundaries"
ELECTIONS_DIR = RAW / "elections"


# ---------------------------------------------------------------------------
# NHGIS / IPUMS API — congressional district boundaries
# ---------------------------------------------------------------------------

def _nhgis_headers(api_key: str) -> dict[str, str]:
    return {"Authorization": api_key}


def _nhgis_url(path: str) -> str:
    return f"{NHGIS_API_BASE}{path}?product=nhgis&version={NHGIS_API_VERSION}"


def list_nhgis_shapefiles(api_key: str) -> list[dict[str, Any]]:
    """Return the NHGIS shapefile catalog so you can verify shapefile IDs."""
    url = f"{NHGIS_API_BASE}/metadata/nhgis/shapefiles?version={NHGIS_API_VERSION}"
    resp = requests.get(url, headers=_nhgis_headers(api_key), timeout=30)
    resp.raise_for_status()
    return resp.json()


def submit_nhgis_extract(api_key: str, shapefile_ids: list[str]) -> str:
    """Submit a shapefile extract for the given shapefile IDs.

    Returns the extract ID to poll with wait_for_nhgis_extract().
    """
    payload = {"shapefiles": shapefile_ids}
    url = _nhgis_url("/extracts/")
    resp = requests.post(url, json=payload, headers=_nhgis_headers(api_key), timeout=30)
    if not resp.ok:
        print(f"NHGIS API error {resp.status_code}:")
        try:
            print(resp.json())
        except Exception:
            print(resp.text)
        sys.exit(1)
    extract_id = resp.json()["number"]
    print(f"  Submitted NHGIS extract #{extract_id}")
    return extract_id


def wait_for_nhgis_extract(api_key: str, extract_id: str, poll_seconds: int = 15) -> str:
    """Poll until the extract is ready. Returns the download URL."""
    url = _nhgis_url(f"/extracts/{extract_id}")
    print(f"  Waiting for extract #{extract_id} to complete", end="", flush=True)
    while True:
        resp = requests.get(url, headers=_nhgis_headers(api_key), timeout=30)
        resp.raise_for_status()
        data = resp.json()
        status = data["status"]
        if status == "completed":
            print(" done.")
            return data["download_links"]["gis_data"]
        elif status == "failed":
            print(f"\nExtract failed: {data}")
            sys.exit(1)
        print(".", end="", flush=True)
        time.sleep(poll_seconds)


def _congress_from_shapefile_id(shapefile_id: str) -> int | None:
    """Parse congress number from a shapefile ID like 'us_cd108th_2000_tl2010'."""
    m = re.search(r"cd(\d+)", shapefile_id)
    return int(m.group(1)) if m else None


def _extract_inner_zips(shapefile_ids: list[str]) -> None:
    """Extract inner shapefile ZIPs under BOUNDARIES_DIR into cd{congress} dirs.

    NHGIS outer ZIPs contain one inner ZIP per shapefile, named like:
      nhgis0005_shapefile_tl2000_us_cd103rd_1990.zip
    """
    inner_zips = list(BOUNDARIES_DIR.rglob("nhgis*_shapefile_*.zip"))
    if not inner_zips:
        print("  WARNING: no inner shapefile ZIPs found under boundaries/")
        return

    # Keep only the most recent extract's ZIPs (highest nhgis number) to avoid
    # duplicates when the same shapefile_id appears multiple times.
    n = len(shapefile_ids)
    latest = sorted(inner_zips, key=lambda p: p.name)[-n:]
    for zip_path in sorted(latest):
        m = re.search(r"cd(\d+)", zip_path.name)
        if not m:
            print(f"  WARNING: could not parse congress from {zip_path.name}, skipping.")
            continue
        congress = int(m.group(1))
        dst_dir = BOUNDARIES_DIR / f"cd{congress}"
        if dst_dir.exists():
            continue
        dst_dir.mkdir()
        with zipfile.ZipFile(zip_path) as zf:
            zf.extractall(dst_dir)
        print(f"  Extracted cd{congress} → {dst_dir}")


def download_nhgis_boundaries(api_key: str, shapefile_ids: list[str]) -> None:
    """Download NHGIS congressional district shapefiles for the given shapefile IDs."""
    BOUNDARIES_DIR.mkdir(parents=True, exist_ok=True)

    # Determine which congress dirs are needed
    congress_numbers = [_congress_from_shapefile_id(sid) for sid in shapefile_ids]
    needed = [c for c in congress_numbers if c is not None]

    # Check if all needed congress dirs already exist
    all_present = all((BOUNDARIES_DIR / f"cd{c}").exists() for c in needed)
    if all_present:
        print("  NHGIS boundaries already extracted, skipping.")
        return

    # If inner ZIPs already downloaded from a prior run, extract without re-downloading
    if list(BOUNDARIES_DIR.rglob("nhgis*_shapefile_*.zip")):
        print("  Inner ZIPs found on disk, extracting without re-downloading...")
        _extract_inner_zips(shapefile_ids)
        return

    extract_id = submit_nhgis_extract(api_key, shapefile_ids)
    download_url = wait_for_nhgis_extract(api_key, extract_id)

    print("  Downloading boundaries ZIP from NHGIS...")
    resp = requests.get(download_url, headers=_nhgis_headers(api_key),
                        stream=True, timeout=120)
    resp.raise_for_status()

    # Outer ZIP contains inner ZIPs — one per shapefile. Extract outer first.
    outer = zipfile.ZipFile(io.BytesIO(resp.content))
    outer.extractall(BOUNDARIES_DIR)

    # Now extract all inner ZIPs found anywhere under BOUNDARIES_DIR.
    _extract_inner_zips(shapefile_ids)
    print(f"  Saved boundaries to {BOUNDARIES_DIR}")


# ---------------------------------------------------------------------------
# Census TIGER — congressional district boundaries (congress ≥ 119)
# NHGIS lags on new Congress shapefiles; TIGER is available immediately.
# ---------------------------------------------------------------------------

# Map congress number → Census TIGER ZIP URL.
# Add new entries here as each new Congress is certified.
_TIGER_CD_URLS: dict[int, str] = {
    119: "https://www2.census.gov/geo/tiger/TIGER2024/CD/tl_2024_us_cd119.zip",
}


def download_tiger_boundaries(congress_numbers: list[int]) -> None:
    """Download Census TIGER congressional district shapefiles."""
    BOUNDARIES_DIR.mkdir(parents=True, exist_ok=True)
    for congress in congress_numbers:
        dst_dir = BOUNDARIES_DIR / f"cd{congress}"
        if dst_dir.exists():
            print(f"  cd{congress} already present, skipping.")
            continue
        url = _TIGER_CD_URLS.get(congress)
        if url is None:
            print(f"  WARNING: no Census TIGER URL configured for congress {congress}.")
            continue
        print(f"  Downloading cd{congress} from Census TIGER...")
        resp = requests.get(url, stream=True, timeout=120)
        resp.raise_for_status()
        dst_dir.mkdir()
        with zipfile.ZipFile(io.BytesIO(resp.content)) as zf:
            zf.extractall(dst_dir)
        print(f"  Extracted cd{congress} → {dst_dir}")


# ---------------------------------------------------------------------------
# MIT Election Lab — US House returns 1976–2024
# ---------------------------------------------------------------------------

def _dataverse_file_id(doi: str, filename: str) -> int:
    """Look up a file's numeric ID in a Harvard Dataverse dataset by filename."""
    url = (
        f"https://dataverse.harvard.edu/api/datasets/:persistentId/versions/"
        f":latest/files?persistentId={doi}"
    )
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    files = resp.json()["data"]
    for f in files:
        if f["dataFile"]["filename"] == filename:
            return f["dataFile"]["id"]
    available = [f["dataFile"]["filename"] for f in files]
    raise FileNotFoundError(
        f"{filename!r} not found in {doi}. Available files: {available}"
    )


def download_mit_elections() -> None:
    """Download the MIT Election Lab US House returns CSV."""
    ELECTIONS_DIR.mkdir(parents=True, exist_ok=True)
    dest = ELECTIONS_DIR / MIT_ELECTIONS_FILENAME
    if dest.exists():
        print("  MIT elections CSV already present, skipping.")
        return

    print(f"  Looking up {MIT_ELECTIONS_FILENAME} in Harvard Dataverse...")
    file_id = _dataverse_file_id(MIT_ELECTIONS_DOI, MIT_ELECTIONS_FILENAME)
    url = f"https://dataverse.harvard.edu/api/access/datafile/{file_id}"
    print(f"  Downloading MIT Election Lab returns (file ID {file_id})...")
    resp = requests.get(url, stream=True, timeout=120)
    resp.raise_for_status()
    with open(dest, "wb") as fh:
        for chunk in resp.iter_content(chunk_size=1 << 16):
            fh.write(chunk)
    print(f"  Saved to {dest}")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Download redistricting source data")
    parser.add_argument(
        "--state", default=None,
        help="State postal code (e.g. MI, NC). Defaults to all configured states.",
    )
    args = parser.parse_args()

    if args.state:
        state_key = args.state.upper()
        if state_key not in STATES:
            print(f"ERROR: Unknown state '{args.state}'. Known: {list(STATES)}")
            sys.exit(1)
        states_to_download = {state_key: STATES[state_key]}
    else:
        states_to_download = STATES

    # Collect unique shapefile IDs and congress numbers across all requested states
    all_shapefile_ids = {
        meta["shapefile_id"]
        for state in states_to_download.values()
        for meta in state["cycles"].values()
    }
    all_congress_numbers = {
        meta["congress"]
        for state in states_to_download.values()
        for meta in state["cycles"].values()
    }

    # Route: congress ≥ 119 → Census TIGER; older → NHGIS
    tiger_congresses = sorted(c for c in all_congress_numbers if c >= 119)
    nhgis_ids = [sid for sid in all_shapefile_ids
                 if (_congress_from_shapefile_id(sid) or 0) < 119]

    state_names = ", ".join(s["name"] for s in states_to_download.values())
    print(f"=== Downloading redistricting data ({state_names}) ===\n")

    # --- Congressional district boundaries (NHGIS, congress ≤ 118) ---
    if nhgis_ids:
        load_dotenv()
        api_key = os.getenv("NHGIS_API_KEY", "").strip()
        if not api_key:
            print(
                "ERROR: Set NHGIS_API_KEY environment variable.\n"
                "  Get a free key at https://account.ipums.org/api_keys\n"
                "  Then run: NHGIS_API_KEY=your_key python -m pipeline.download"
            )
            sys.exit(1)
        print(f"  API key loaded: {len(api_key)} chars, starts with '{api_key[:4]}...'")
        print(f"[1/3] Congressional district boundaries (NHGIS) — {len(nhgis_ids)} shapefiles...")
        download_nhgis_boundaries(api_key, nhgis_ids)

    # --- Congressional district boundaries (Census TIGER, congress ≥ 119) ---
    if tiger_congresses:
        step = "2" if nhgis_ids else "1"
        print(f"\n[{step}/3] Congressional district boundaries (Census TIGER) — congress {tiger_congresses}...")
        download_tiger_boundaries(tiger_congresses)

    # --- Election returns (MIT Election Lab) ---
    print("\n[3/3] US House election returns (MIT Election Lab)...")
    download_mit_elections()

    print("\nAll downloads complete.")
    print(f"  Boundaries : {BOUNDARIES_DIR}")
    print(f"  Elections  : {ELECTIONS_DIR}")


if __name__ == "__main__":
    main()
