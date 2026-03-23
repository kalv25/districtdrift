"""Download and merge demographic data into the processed stats JSON.

For each redistricting cycle, queries NHGIS tabular data at the congressional-district
geographic level and merges race/ethnicity, income, and educational attainment fields
into each district's entry in the stats JSON.

Sources (all NHGIS / IPUMS):
  1992 cycle  → 1990 Census STF1 (race/pop) + STF3 (income/edu)   — geog: cd103rd
  2002 cycle  → 2000 Census SF1a (race/pop) + SF3a (income/edu)   — geog: cd108th
  2012 cycle  → ACS 2008–2012 5-year (race, income, edu)          — geog: cd113th
  2022 cycle  → ACS 2018–2022 5-year (race, income, edu)          — geog: cd118th

Usage:
  uv run python -m pipeline.demographics --state MI
"""

from __future__ import annotations

import argparse
import io
import json
import os
import sys
import time
import zipfile
from pathlib import Path

import pandas as pd
import requests
from dotenv import load_dotenv

from .config import NHGIS_API_BASE, NHGIS_API_VERSION, PROCESSED_DIR

# ---------------------------------------------------------------------------
# NHGIS dataset / table / geog-level constants
# (Resolved via metadata API; stored here to avoid repeated API lookups.)
# ---------------------------------------------------------------------------

# Each cycle entry:
#   "race"  → (dataset_name, table_code, geog_level, is_acs)
#   "socioeconomic" → (dataset_name, [income_table, edu_table], geog_level, is_acs)
#   "income_source" → human-readable label for the income data source
CYCLE_SOURCES: dict[int, dict] = {
    1992: {
        "race": ("1990_STF1", "NP10", "cd103rd", False),
        "socioeconomic": ("1990_STF3", ["NP80A", "NP57"], "cd103rd", False),
        "income_source": "1990 Census STF3 (income in 1989)",
    },
    2002: {
        "race": ("2000_SF1a", "NP008A", "cd108th", False),
        "socioeconomic": ("2000_SF3a", ["NP053A", "NP037C"], "cd108th", False),
        "income_source": "2000 Census SF3a (income in 1999)",
    },
    2012: {
        # ACS 2008-2012 has both race (B03002) and income/edu at cd113th
        "race": ("2008_2012_ACS5a", "B03002", "cd113th", True),
        "socioeconomic": ("2008_2012_ACS5a", ["B19013", "B15003"], "cd113th", True),
        "income_source": "ACS 2008–2012 5-year",
    },
    2022: {
        "race": ("2018_2022_ACS5a", "B03002", "cd118th", True),
        "socioeconomic": ("2018_2022_ACS5a", ["B19013", "B15003"], "cd118th", True),
        "income_source": "ACS 2018–2022 5-year",
    },
}

NHGIS_API_BASE_URL = NHGIS_API_BASE
VERSION = NHGIS_API_VERSION

RAW_DIR = Path("data/raw/demographics")
PROCESSED = Path(PROCESSED_DIR)


# ---------------------------------------------------------------------------
# NHGIS API helpers
# ---------------------------------------------------------------------------

def _headers(api_key: str) -> dict:
    return {"Authorization": api_key}


def _nhgis_url(path: str) -> str:
    return f"{NHGIS_API_BASE_URL}{path}?product=nhgis&version={VERSION}"


def submit_tabular_extract(
    api_key: str,
    dataset_name: str,
    table_codes: list[str],
    geog_level: str,
    is_acs: bool,
) -> str:
    """Submit an NHGIS tabular data extract. Returns the extract number."""
    ds_payload: dict = {
        "data_tables": table_codes,
        "geog_levels": [geog_level],
    }
    if is_acs:
        # ACS datasets have multiple file types and require breakdown specification
        ds_payload["breakdown_values"] = ["bs32.ge00"]  # Total area

    base_payload: dict = {
        "datasets": {dataset_name: ds_payload},
        "data_format": "csv_header",
    }
    if is_acs:
        base_payload["breakdown_and_data_type_layout"] = "single_file"

    url = _nhgis_url("/extracts/")
    resp = requests.post(url, json=base_payload, headers=_headers(api_key), timeout=30)
    if not resp.ok:
        print(f"  ERROR submitting extract for {dataset_name}: {resp.status_code}")
        try:
            print("  ", resp.json())
        except Exception:
            print("  ", resp.text)
        sys.exit(1)
    extract_num = resp.json()["number"]
    print(f"  Submitted extract #{extract_num} — {dataset_name} / {geog_level} / {table_codes}")
    return str(extract_num)


def wait_for_tabular_extract(api_key: str, extract_num: str, poll_seconds: int = 15) -> dict:
    """Poll until extract is complete. Returns the full extract status dict.

    NHGIS status transitions:
      queued → published → completed  (normal path)
      queued → published → failed     (error path)
    "published" means received and queued; wait until "completed".
    Download links appear only when status == "completed".
    """
    url = _nhgis_url(f"/extracts/{extract_num}")
    print(f"  Waiting for extract #{extract_num}", end="", flush=True)
    while True:
        resp = requests.get(url, headers=_headers(api_key), timeout=30)
        resp.raise_for_status()
        data = resp.json()
        status = data["status"]
        links = data.get("download_links", {})
        # Completed when status is "completed" (shapefile style) or when
        # status is "published" and download_links are populated (tabular style)
        if status == "completed" or (status in ("completed", "published") and links):
            print(" done.")
            return data
        elif status == "failed":
            print(f"\n  Extract #{extract_num} failed: {data}")
            sys.exit(1)
        print(".", end="", flush=True)
        time.sleep(poll_seconds)


def download_extract_csv(api_key: str, extract_data: dict, dest_dir: Path) -> list[Path]:
    """Download the tabular CSV from a completed extract. Returns list of CSV paths."""
    download_links = extract_data.get("download_links", {})

    # Tabular data extracts use "table_data" key (shapefile extracts use "gis_data")
    download_url = download_links.get("table_data") or download_links.get("data")
    if not download_url:
        print(f"  ERROR: no table_data download link in extract. Links: {download_links}")
        sys.exit(1)

    dest_dir.mkdir(parents=True, exist_ok=True)
    extract_num = extract_data["number"]

    print(f"  Downloading extract #{extract_num} CSV...")
    resp = requests.get(download_url, headers=_headers(api_key), stream=True, timeout=120)
    resp.raise_for_status()

    outer_zip = zipfile.ZipFile(io.BytesIO(resp.content))
    csv_paths = []
    for name in outer_zip.namelist():
        if name.endswith(".csv"):
            data_bytes = outer_zip.read(name)
            csv_path = dest_dir / Path(name).name
            csv_path.write_bytes(data_bytes)
            csv_paths.append(csv_path)
            print(f"  Extracted {csv_path.name} ({len(data_bytes):,} bytes)")

    if not csv_paths:
        # Some extracts wrap in inner ZIPs
        for name in outer_zip.namelist():
            if name.endswith(".zip"):
                inner_bytes = outer_zip.read(name)
                inner_zip = zipfile.ZipFile(io.BytesIO(inner_bytes))
                for iname in inner_zip.namelist():
                    if iname.endswith(".csv"):
                        data_bytes = inner_zip.read(iname)
                        csv_path = dest_dir / Path(iname).name
                        csv_path.write_bytes(data_bytes)
                        csv_paths.append(csv_path)
                        print(f"  Extracted (inner) {csv_path.name}")

    return csv_paths


# ---------------------------------------------------------------------------
# Column-name parsing helpers
# ---------------------------------------------------------------------------

def _find_state_col(df: pd.DataFrame) -> str | None:
    for col in df.columns:
        cu = col.upper()
        if cu in ("STATEA", "STATE", "STATEFP"):
            return col
    return None


def _find_cd_col(df: pd.DataFrame, congress: int | None = None) -> str | None:
    """Find the congressional district column in an NHGIS tabular CSV.

    NHGIS CSVs at cd-level geographies may include multiple CD columns (e.g. CD101A and CD103A
    for a dataset covering the 103rd Congress). Pass the target congress number so we pick the
    correct one (e.g. congress=103 → CD103A).
    """
    if congress is not None:
        target = f"CD{congress}A"
        if target in df.columns:
            return target
        # Try zero-padded variants (CD103A, CD108A, etc. — no padding needed for 3-digit)
    candidates = []
    for col in df.columns:
        cu = col.upper()
        if cu in ("CONG_DISTA", "CONGA", "CONGRESSIONAL_DISTRICTA"):
            return col
        if cu.startswith("CD") and cu.endswith("A"):
            candidates.append(col)
    if candidates:
        # Prefer the column with the highest congress number (most recent geography)
        return max(candidates)
    # Fallback: look for any column containing DIST or CD
    for col in df.columns:
        cu = col.upper()
        if "DIST" in cu and col not in ("GISJOIN",):
            candidates.append(col)
    return candidates[0] if candidates else None


# ---------------------------------------------------------------------------
# Race / ethnicity parsing
# ---------------------------------------------------------------------------

def parse_race_1990(df: pd.DataFrame) -> pd.DataFrame:
    """Parse 1990 STF1 NP10 (Hispanic Origin by Race).

    NP10 has 10 variables (nhgis_code prefix ET2):
      ET2001 = Total
      ET2002 = Not Hispanic: White
      ET2003 = Not Hispanic: Black
      ET2004 = Not Hispanic: American Indian
      ET2005 = Not Hispanic: Asian & Pacific Islander
      ET2006 = Not Hispanic: Other race
      ET2007 = Hispanic: White
      ET2008 = Hispanic: Black
      ET2009 = Hispanic: American Indian
      ET2010 = Hispanic: Asian & Pacific Islander (very small)
      (ET2011 = Hispanic: Other race — wait, 10 vars total)

    Actually 1990 NP10 layout (ET2 prefix):
      001 = Not of Hispanic origin: White
      002 = Not of Hispanic origin: Black
      003 = Not of Hispanic origin: American Indian, Eskimo, or Aleut
      004 = Not of Hispanic origin: Asian or Pacific Islander
      005 = Not of Hispanic origin: Other race
      006 = Hispanic origin: White
      007 = Hispanic origin: Black
      008 = Hispanic origin: American Indian, Eskimo, or Aleut
      009 = Hispanic origin: Asian or Pacific Islander
      010 = Hispanic origin: Other race
    Total = sum of all
    """
    code = "ET2"
    # Find columns with this prefix
    cols = [c for c in df.columns if c.startswith(code)]
    if not cols:
        # Try lower or alternate prefix
        print(f"    WARNING: no columns with prefix '{code}' found. Columns: {list(df.columns[:20])}")
        return pd.DataFrame()

    def row_to_race(row):
        try:
            nh_white = float(row.get(f"{code}001", 0) or 0)
            nh_black = float(row.get(f"{code}002", 0) or 0)
            nh_aian  = float(row.get(f"{code}003", 0) or 0)
            nh_asian = float(row.get(f"{code}004", 0) or 0)
            nh_other = float(row.get(f"{code}005", 0) or 0)
            h_white  = float(row.get(f"{code}006", 0) or 0)
            h_black  = float(row.get(f"{code}007", 0) or 0)
            h_aian   = float(row.get(f"{code}008", 0) or 0)
            h_asian  = float(row.get(f"{code}009", 0) or 0)
            h_other  = float(row.get(f"{code}010", 0) or 0)
        except (KeyError, ValueError):
            return pd.Series({
                "population": None, "pct_white": None, "pct_black": None,
                "pct_hispanic": None, "pct_asian": None, "pct_other": None,
            })

        # Use mutually exclusive categories (matching ACS convention):
        # white = non-Hispanic White; black/asian = non-Hispanic only; hispanic = any race
        white    = nh_white
        black    = nh_black
        hispanic = h_white + h_black + h_aian + h_asian + h_other
        asian    = nh_asian
        other    = nh_aian + nh_other
        total    = nh_white + nh_black + nh_aian + nh_asian + nh_other + hispanic
        if total == 0:
            return pd.Series({
                "population": 0, "pct_white": None, "pct_black": None,
                "pct_hispanic": None, "pct_asian": None, "pct_other": None,
            })
        return pd.Series({
            "population": int(total),
            "pct_white":    round(white / total, 6),
            "pct_black":    round(black / total, 6),
            "pct_hispanic": round(hispanic / total, 6),
            "pct_asian":    round(asian / total, 6),
            "pct_other":    round(other / total, 6),
        })

    return df.apply(row_to_race, axis=1)


def parse_race_2000(df: pd.DataFrame) -> pd.DataFrame:
    """Parse 2000 SF1a NP008A (Population by Hispanic or Latino and Not HL by Race).

    nhgis_code FMS, 14 variables:
      FMS001 = Not Hispanic: White alone
      FMS002 = Not Hispanic: Black alone
      FMS003 = Not Hispanic: AIAN alone
      FMS004 = Not Hispanic: Asian alone
      FMS005 = Not Hispanic: NHPI alone
      FMS006 = Not Hispanic: Some other race alone
      FMS007 = Not Hispanic: Two or more races
      FMS008 = Hispanic: White alone
      FMS009 = Hispanic: Black alone
      FMS010 = Hispanic: AIAN alone
      FMS011 = Hispanic: Asian alone
      FMS012 = Hispanic: NHPI alone
      FMS013 = Hispanic: Some other race alone
      FMS014 = Hispanic: Two or more races
    """
    code = "FMS"
    cols = [c for c in df.columns if c.startswith(code)]
    if not cols:
        print(f"    WARNING: no columns with prefix '{code}'. Columns: {list(df.columns[:20])}")
        return pd.DataFrame()

    def row_to_race(row):
        try:
            nh = [float(row.get(f"{code}{str(i).zfill(3)}", 0) or 0) for i in range(1, 8)]
            h  = [float(row.get(f"{code}{str(i).zfill(3)}", 0) or 0) for i in range(8, 15)]
        except (KeyError, ValueError):
            return pd.Series({
                "population": None, "pct_white": None, "pct_black": None,
                "pct_hispanic": None, "pct_asian": None, "pct_other": None,
            })

        nh_white, nh_black, nh_aian, nh_asian, nh_nhpi, nh_other, nh_multi = nh
        # h_white, h_black, h_aian, h_asian, h_nhpi, h_other, h_multi (all Hispanic)

        # Mutually exclusive categories matching ACS convention:
        white    = nh_white
        black    = nh_black
        hispanic = sum(h)
        asian    = nh_asian + nh_nhpi
        other    = nh_aian + nh_other + nh_multi
        total    = sum(nh) + sum(h)
        if total == 0:
            return pd.Series({
                "population": 0, "pct_white": None, "pct_black": None,
                "pct_hispanic": None, "pct_asian": None, "pct_other": None,
            })
        return pd.Series({
            "population":   int(total),
            "pct_white":    round(white / total, 6),
            "pct_black":    round(black / total, 6),
            "pct_hispanic": round(hispanic / total, 6),
            "pct_asian":    round(asian / total, 6),
            "pct_other":    round(other / total, 6),
        })

    return df.apply(row_to_race, axis=1)


def parse_race_acs(df: pd.DataFrame, nhgis_code: str) -> pd.DataFrame:
    """Parse ACS B03002 (Hispanic or Latino Origin by Race) columns.

    B03002 has 21 variables (ACS 2008-2012: prefix QSY; ACS 2018-2022: prefix AQNO):
      001 = Total
      002 = Not Hispanic: Total
      003 = Not Hispanic: White alone
      004 = Not Hispanic: Black alone
      005 = Not Hispanic: AIAN alone
      006 = Not Hispanic: Asian alone
      007 = Not Hispanic: NHPI alone
      008 = Not Hispanic: Some other race alone
      009 = Not Hispanic: Two or more races
      010 = Not Hispanic: Two or more: White + Black
      011 = Not Hispanic: Two or more: White + AIAN
      ...
      012 = Hispanic or Latino: Total
      013 = Hispanic: White alone
      014 = Hispanic: Black alone
      015 = Hispanic: AIAN alone
      016 = Hispanic: Asian alone
      017 = Hispanic: NHPI alone
      018 = Hispanic: Some other race alone
      019 = Hispanic: Two or more races
      020 = Hispanic: Two or more: White + Black
      021 = Hispanic: Two or more: White + AIAN
    """
    # ACS estimate columns use {code}E{num} format (e.g. QSYE001, AQNOE001)
    code = nhgis_code
    def _v(row, n): return float(row.get(f"{code}E{str(n).zfill(3)}", 0) or 0)

    def row_to_race(row):
        try:
            total     = _v(row, 1)
            nh_white  = _v(row, 3)
            nh_black  = _v(row, 4)
            nh_aian   = _v(row, 5)
            nh_asian  = _v(row, 6)
            nh_nhpi   = _v(row, 7)
            nh_other  = _v(row, 8)
            nh_multi  = _v(row, 9)
            hispanic  = _v(row, 12)
        except (KeyError, ValueError):
            return pd.Series({
                "population": None, "pct_white": None, "pct_black": None,
                "pct_hispanic": None, "pct_asian": None, "pct_other": None,
            })

        if total == 0:
            return pd.Series({
                "population": 0, "pct_white": None, "pct_black": None,
                "pct_hispanic": None, "pct_asian": None, "pct_other": None,
            })

        white = nh_white
        black = nh_black
        asian = nh_asian + nh_nhpi
        other = nh_aian + nh_other + nh_multi
        # Note: hispanic is already counted in some of the above (census uses mutually exclusive Hispanic/non-Hispanic)
        # For a clean breakdown, use non-Hispanic categories + Hispanic as its own group
        # pct_white = non-Hispanic White only (standard demographic convention)

        return pd.Series({
            "population":   int(total),
            "pct_white":    round(white / total, 6),
            "pct_black":    round(black / total, 6),
            "pct_hispanic": round(hispanic / total, 6),
            "pct_asian":    round(asian / total, 6),
            "pct_other":    round(other / total, 6),
        })

    return df.apply(row_to_race, axis=1)


# ---------------------------------------------------------------------------
# Socioeconomic parsing
# ---------------------------------------------------------------------------

def parse_income_1990(df: pd.DataFrame) -> pd.Series:
    """Parse 1990 STF3 NP80A (Median Household Income in 1989). nhgis_code E4U."""
    code = "E4U"
    col = f"{code}001"
    if col not in df.columns:
        print(f"    WARNING: column {col} not found. Cols: {list(df.columns[:20])}")
        return pd.Series([None] * len(df), index=df.index)
    return df[col].apply(lambda v: int(v) if pd.notna(v) and str(v).strip() not in ("", "0", "-") else None)


def parse_edu_1990(df: pd.DataFrame) -> pd.Series:
    """Parse 1990 STF3 NP57 (Educational Attainment). nhgis_code E33.

    NP57 has 7 variables (E33 prefix):
      001 = Less than 9th grade
      002 = 9th to 12th, no diploma
      003 = High school graduate
      004 = Some college, no degree
      005 = Associate degree
      006 = Bachelor's degree
      007 = Graduate or professional degree
    pct_bachelors_plus = (006 + 007) / sum(001..007)
    """
    code = "E33"
    cols_needed = [f"{code}{str(i).zfill(3)}" for i in range(1, 8)]
    present = [c for c in cols_needed if c in df.columns]
    if not present:
        print(f"    WARNING: no E33 columns found.")
        return pd.Series([None] * len(df), index=df.index)

    def row_to_edu(row):
        vals = [float(row.get(c, 0) or 0) for c in cols_needed]
        total = sum(vals)
        if total == 0:
            return None
        bachelors_plus = vals[5] + vals[6]  # indices 5,6 = bachelor + grad
        return round(bachelors_plus / total, 6)

    return df.apply(row_to_edu, axis=1)


def parse_income_2000(df: pd.DataFrame) -> pd.Series:
    """Parse 2000 SF3a NP053A (Median Household Income in 1999). nhgis_code GMY."""
    code = "GMY"
    col = f"{code}001"
    if col not in df.columns:
        print(f"    WARNING: column {col} not found. Cols: {list(df.columns[:20])}")
        return pd.Series([None] * len(df), index=df.index)
    return df[col].apply(lambda v: int(v) if pd.notna(v) and str(v).strip() not in ("", "0", "-") else None)


def parse_edu_2000(df: pd.DataFrame) -> pd.Series:
    """Parse 2000 SF3a NP037C (Population 25+ by Sex by Educational Attainment). nhgis_code GKT.

    GKT has 32 variables:
      Male: 001=Total, 002=None, 003=Nursery-4th, 004=5th-6th, 005=7th-8th, 006=9th, 007=10th,
            008=11th, 009=12th no diploma, 010=HS grad, 011=some college<1yr, 012=some college 1+ yr,
            013=Associate, 014=Bachelor, 015=Master, 016=Professional, 017=Doctorate
      Female: 018-034 same structure
    pct_bachelors_plus = sum(014,015,016,017,031,032,033,034) / sum(001+018)
    """
    code = "GKT"
    # Bachelor + Master + Professional + Doctorate for Male (014-017) and Female (031-034)
    bach_cols = [f"{code}{str(i).zfill(3)}" for i in [14, 15, 16, 17, 31, 32, 33, 34]]
    total_m_col = f"{code}001"
    total_f_col = f"{code}018"

    def row_to_edu(row):
        total_m = float(row.get(total_m_col, 0) or 0)
        total_f = float(row.get(total_f_col, 0) or 0)
        total = total_m + total_f
        if total == 0:
            return None
        bach = sum(float(row.get(c, 0) or 0) for c in bach_cols)
        return round(bach / total, 6)

    return df.apply(row_to_edu, axis=1)


def parse_income_acs(df: pd.DataFrame, nhgis_code: str) -> pd.Series:
    """Parse ACS B19013 (Median Household Income). ACS estimate column: {code}E001."""
    col = f"{nhgis_code}E001"
    if col not in df.columns:
        print(f"    WARNING: column {col} not found. Cols: {list(df.columns[:20])}")
        return pd.Series([None] * len(df), index=df.index)
    return df[col].apply(lambda v: int(float(v)) if pd.notna(v) and str(v).strip() not in ("", "0", "-", "-666666666") else None)


def parse_edu_acs(df: pd.DataFrame, nhgis_code: str) -> pd.Series:
    """Parse ACS B15003 (Educational Attainment for Pop 25+). 25 variables.

    B15003 variables (ACS 2008-2012 code QUS, ACS 2018-2022 code AQPK):
      001 = Total
      022 = Bachelor's degree
      023 = Master's degree
      024 = Professional school degree
      025 = Doctorate degree
    pct_bachelors_plus = sum(022, 023, 024, 025) / 001
    ACS estimate columns use {code}E{num} format.
    """
    code = nhgis_code
    total_col = f"{code}E001"
    bach_cols = [f"{code}E{str(i).zfill(3)}" for i in [22, 23, 24, 25]]

    def row_to_edu(row):
        total = float(row.get(total_col, 0) or 0)
        if total == 0:
            return None
        bach = sum(float(row.get(c, 0) or 0) for c in bach_cols)
        return round(bach / total, 6)

    return df.apply(row_to_edu, axis=1)


# ---------------------------------------------------------------------------
# CSV loading helpers
# ---------------------------------------------------------------------------

def load_and_filter_csv(csv_path: Path, state_fips: str) -> pd.DataFrame:
    """Load NHGIS CSV and filter to the given state."""
    df = pd.read_csv(csv_path, encoding="latin-1", low_memory=False)

    # Normalize column names to upper for lookup
    df.columns = [c.upper() if not c[0].isupper() else c for c in df.columns]

    state_col = _find_state_col(df)
    if state_col is None:
        print(f"    WARNING: cannot find state column in {csv_path.name}. Cols: {list(df.columns[:15])}")
        return df

    # NHGIS state FIPS is zero-padded 2 digits
    df = df[df[state_col].astype(str).str.zfill(2) == state_fips.zfill(2)].copy()
    return df


def extract_cd_number(df: pd.DataFrame, congress: int | None = None) -> pd.Series:
    """Extract integer district number from the CD column (handles e.g. '01', '98', etc.)."""
    cd_col = _find_cd_col(df, congress=congress)
    if cd_col is None:
        print(f"    WARNING: cannot find CD column. Cols: {list(df.columns[:20])}")
        return pd.Series([None] * len(df), index=df.index)
    return pd.to_numeric(df[cd_col], errors="coerce").astype("Int64")


# ---------------------------------------------------------------------------
# Main per-cycle processing
# ---------------------------------------------------------------------------

def build_demographics_for_cycle(
    cycle_year: int,
    state_fips: str,
    api_key: str,
    cache_dir: Path,
) -> dict:
    """Download (or use cached) NHGIS data for one cycle. Returns dict keyed by district number."""
    sources = CYCLE_SOURCES[cycle_year]
    race_ds, race_table, race_geog, race_is_acs = sources["race"]
    soc_ds, soc_tables, soc_geog, soc_is_acs = sources["socioeconomic"]

    # --------------- Submit / retrieve race extract ---------------
    race_cache = cache_dir / f"{cycle_year}_race_{race_ds}.csv"
    soc_cache_income = cache_dir / f"{cycle_year}_soc_income_{soc_ds}.csv"
    soc_cache_edu = cache_dir / f"{cycle_year}_soc_edu_{soc_ds}.csv"

    # If same dataset for race and soc, combine into one extract
    same_ds = (race_ds == soc_ds)

    race_df = None
    soc_df = None

    if same_ds:
        combined_cache = cache_dir / f"{cycle_year}_combined_{race_ds}.csv"
        if combined_cache.exists():
            print(f"    Using cached {combined_cache.name}")
            df = pd.read_csv(combined_cache, encoding="latin-1", low_memory=False)
            race_df = soc_df = df
        else:
            all_tables = [race_table] + soc_tables
            extract_num = submit_tabular_extract(
                api_key, race_ds, all_tables, race_geog, race_is_acs
            )
            extract_data = wait_for_tabular_extract(api_key, extract_num)
            csv_paths = download_extract_csv(api_key, extract_data, cache_dir)
            # Find the data CSV (not the codebook)
            data_csvs = [p for p in csv_paths if "codebook" not in p.name.lower()]
            if not data_csvs:
                print(f"    ERROR: no data CSV found for extract #{extract_num}")
                sys.exit(1)
            # Rename to combined cache
            data_csvs[0].rename(combined_cache)
            race_df = soc_df = pd.read_csv(combined_cache, encoding="latin-1", low_memory=False)
    else:
        # Separate extracts for race and socioeconomic
        if race_cache.exists():
            print(f"    Using cached {race_cache.name}")
            race_df = pd.read_csv(race_cache, encoding="latin-1", low_memory=False)
        else:
            extract_num = submit_tabular_extract(
                api_key, race_ds, [race_table], race_geog, race_is_acs
            )
            extract_data = wait_for_tabular_extract(api_key, extract_num)
            csv_paths = download_extract_csv(api_key, extract_data, cache_dir)
            data_csvs = [p for p in csv_paths if "codebook" not in p.name.lower()]
            if data_csvs:
                data_csvs[0].rename(race_cache)
            race_df = pd.read_csv(race_cache, encoding="latin-1", low_memory=False)

        soc_merged_cache = cache_dir / f"{cycle_year}_soc_{soc_ds}.csv"
        if soc_merged_cache.exists():
            print(f"    Using cached {soc_merged_cache.name}")
            soc_df = pd.read_csv(soc_merged_cache, encoding="latin-1", low_memory=False)
        else:
            extract_num = submit_tabular_extract(
                api_key, soc_ds, soc_tables, soc_geog, soc_is_acs
            )
            extract_data = wait_for_tabular_extract(api_key, extract_num)
            csv_paths = download_extract_csv(api_key, extract_data, cache_dir)
            data_csvs = [p for p in csv_paths if "codebook" not in p.name.lower()]
            if data_csvs:
                data_csvs[0].rename(soc_merged_cache)
            soc_df = pd.read_csv(soc_merged_cache, encoding="latin-1", low_memory=False)

    # --------------- Filter to state ---------------
    race_df = load_and_filter_csv_df(race_df, state_fips)
    soc_df = load_and_filter_csv_df(soc_df, state_fips)

    # --------------- Extract district numbers ---------------
    # Extract congress number from geog_level (e.g. "cd103rd" → 103) so we pick the right CD column.
    import re as _re
    _m = _re.match(r"cd(\d+)", race_geog)
    congress = int(_m.group(1)) if _m else None
    race_df["_district"] = extract_cd_number(race_df, congress=congress)
    soc_df["_district"] = extract_cd_number(soc_df, congress=congress)

    # Filter out at-large / non-voting delegate rows (district 98, 99, etc.)
    race_df = race_df[race_df["_district"].notna() & (race_df["_district"] < 90)].copy()
    soc_df = soc_df[soc_df["_district"].notna() & (soc_df["_district"] < 90)].copy()

    # --------------- Parse race/ethnicity ---------------
    if cycle_year == 1992:
        race_parsed = parse_race_1990(race_df)
    elif cycle_year == 2002:
        race_parsed = parse_race_2000(race_df)
    else:
        # ACS B03002
        nhgis_code = "QSY" if cycle_year == 2012 else "AQNO"
        race_parsed = parse_race_acs(race_df, nhgis_code)

    race_df = pd.concat([race_df[["_district"]].reset_index(drop=True),
                         race_parsed.reset_index(drop=True)], axis=1)

    # --------------- Parse income ---------------
    if cycle_year == 1992:
        soc_df["_median_income"] = parse_income_1990(soc_df)
    elif cycle_year == 2002:
        soc_df["_median_income"] = parse_income_2000(soc_df)
    else:
        income_code = "QU1" if cycle_year == 2012 else "AQP6"
        soc_df["_median_income"] = parse_income_acs(soc_df, income_code)

    # --------------- Parse education ---------------
    if cycle_year == 1992:
        soc_df["_pct_bachelors_plus"] = parse_edu_1990(soc_df)
    elif cycle_year == 2002:
        soc_df["_pct_bachelors_plus"] = parse_edu_2000(soc_df)
    else:
        edu_code = "QUS" if cycle_year == 2012 else "AQPK"
        soc_df["_pct_bachelors_plus"] = parse_edu_acs(soc_df, edu_code)

    soc_df = soc_df[["_district", "_median_income", "_pct_bachelors_plus"]].copy()

    # --------------- Merge and build district dict ---------------
    merged = race_df.merge(soc_df, on="_district", how="outer")

    district_data: dict[int, dict] = {}
    for _, row in merged.iterrows():
        d = int(row["_district"])
        pop = row.get("population")
        district_data[d] = {
            "population": int(pop) if pd.notna(pop) and pop is not None else None,
            "pct_white": round(float(row["pct_white"]), 4) if pd.notna(row.get("pct_white")) else None,
            "pct_black": round(float(row["pct_black"]), 4) if pd.notna(row.get("pct_black")) else None,
            "pct_hispanic": round(float(row["pct_hispanic"]), 4) if pd.notna(row.get("pct_hispanic")) else None,
            "pct_asian": round(float(row["pct_asian"]), 4) if pd.notna(row.get("pct_asian")) else None,
            "pct_other": round(float(row["pct_other"]), 4) if pd.notna(row.get("pct_other")) else None,
            "median_income": int(row["_median_income"]) if pd.notna(row.get("_median_income")) and row.get("_median_income") else None,
            "pct_bachelors_plus": round(float(row["_pct_bachelors_plus"]), 4) if pd.notna(row.get("_pct_bachelors_plus")) else None,
        }

    return district_data


def load_and_filter_csv_df(df: pd.DataFrame, state_fips: str) -> pd.DataFrame:
    """Filter a pre-loaded DataFrame to the given state FIPS.

    NHGIS CSVs include both STATE (state name) and STATEA (FIPS code).
    We must use STATEA (or STATEFP) for numeric comparison — not STATE.
    """
    col_map = {col.upper(): col for col in df.columns}
    # Prefer STATEA (NHGIS FIPS column) over STATE (name) over STATEFP
    state_col = col_map.get("STATEA") or col_map.get("STATEFP") or col_map.get("STATE")
    if state_col is None:
        print(f"    WARNING: no state column found. Filtering skipped.")
        return df
    return df[df[state_col].astype(str).str.zfill(2) == state_fips.zfill(2)].copy()


# ---------------------------------------------------------------------------
# Cycle-level demographic aggregates
# ---------------------------------------------------------------------------

def compute_cycle_demographics(
    district_data: dict[int, dict],
    total_seats: int,
    income_source: str,
) -> dict:
    """Compute state-level demographic aggregates from district-level data."""
    pops = [d["population"] for d in district_data.values() if d.get("population") is not None]
    total_pop = sum(pops) if pops else None
    ideal_pop = round(total_pop / total_seats) if total_pop and total_seats else None

    def weighted_avg(field: str) -> float | None:
        vals = []
        for d in district_data.values():
            pop = d.get("population")
            val = d.get(field)
            if pop is not None and val is not None:
                vals.append((val, pop))
        if not vals:
            return None
        total_w = sum(p for _, p in vals)
        if total_w == 0:
            return None
        return round(sum(v * p for v, p in vals) / total_w, 4)

    incomes = [d["median_income"] for d in district_data.values() if d.get("median_income") is not None]
    median_income = round(sum(incomes) / len(incomes)) if incomes else None

    return {
        "total_population": total_pop,
        "ideal_district_pop": ideal_pop,
        "pct_white": weighted_avg("pct_white"),
        "pct_black": weighted_avg("pct_black"),
        "pct_hispanic": weighted_avg("pct_hispanic"),
        "pct_asian": weighted_avg("pct_asian"),
        "pct_other": weighted_avg("pct_other"),
        "median_income": median_income,
        "pct_bachelors_plus": weighted_avg("pct_bachelors_plus"),
        "income_source": income_source,
    }


# ---------------------------------------------------------------------------
# Population deviation (ideal district population)
# ---------------------------------------------------------------------------

def add_pop_deviation(district_data: dict[int, dict], ideal_pop: int | None) -> None:
    """Add pop_deviation_pct to each district in-place."""
    if ideal_pop is None or ideal_pop == 0:
        return
    for d in district_data.values():
        pop = d.get("population")
        if pop is not None:
            d["pop_deviation_pct"] = round((pop - ideal_pop) / ideal_pop, 4)
        else:
            d["pop_deviation_pct"] = None


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(description="Add demographic data to redistricting stats JSON")
    parser.add_argument("--state", required=True, help="State postal code (e.g. MI)")
    args = parser.parse_args()

    state_po = args.state.upper()
    state_lower = state_po.lower()

    from .config import get_state
    try:
        state_cfg = get_state(state_po)
    except ValueError as e:
        print(f"ERROR: {e}")
        sys.exit(1)

    state_fips = state_cfg["fips"]
    cycles = state_cfg["cycles"]

    api_key = os.getenv("NHGIS_API_KEY", "").strip()
    if not api_key:
        print("ERROR: Set NHGIS_API_KEY in environment or .env file.")
        sys.exit(1)

    # Load existing stats JSON
    stats_path = PROCESSED / f"{state_lower}_stats.json"
    if not stats_path.exists():
        print(f"ERROR: {stats_path} not found. Run pipeline.process first.")
        sys.exit(1)

    with open(stats_path) as fh:
        stats = json.load(fh)

    print(f"=== Adding demographics for {state_cfg['name']} ===\n")
    print(f"Stats file: {stats_path} ({stats_path.stat().st_size:,} bytes)\n")

    # Use a shared national cache so the same CSV is not re-downloaded for each state.
    # NHGIS tabular extracts return all congressional districts nationally; we filter per state.
    cache_dir = Path("data/raw/demographics/national")
    cache_dir.mkdir(parents=True, exist_ok=True)

    for cycle in stats["cycles"]:
        cycle_year = cycle["cycle_year"]
        if cycle_year not in CYCLE_SOURCES:
            print(f"[{cycle_year}] No NHGIS source configured, skipping.")
            continue

        print(f"\n[Cycle {cycle_year}]")
        total_seats = cycle.get("total_seats", len(cycle.get("districts", [])))
        income_source = CYCLE_SOURCES[cycle_year]["income_source"]

        try:
            district_data = build_demographics_for_cycle(
                cycle_year, state_fips, api_key, cache_dir
            )
        except (SystemExit, Exception) as exc:
            print(f"  ERROR fetching demographics for {cycle_year}: {exc}")
            import traceback; traceback.print_exc()
            continue

        # Compute cycle-level aggregates
        cycle_demo = compute_cycle_demographics(district_data, total_seats, income_source)
        ideal_pop = cycle_demo.get("ideal_district_pop")
        add_pop_deviation(district_data, ideal_pop)

        # Merge into districts array
        existing_districts = cycle.get("districts", [])
        if not existing_districts:
            print(f"  WARNING: no districts array in cycle {cycle_year} — run process.py first.")
        else:
            matched = 0
            for d_entry in existing_districts:
                dist_num = d_entry.get("district")
                if dist_num is not None and dist_num in district_data:
                    d_entry.update(district_data[dist_num])
                    matched += 1
                else:
                    # Fill with nulls if no match
                    d_entry.update({
                        "population": None,
                        "pop_deviation_pct": None,
                        "pct_white": None,
                        "pct_black": None,
                        "pct_hispanic": None,
                        "pct_asian": None,
                        "pct_other": None,
                        "median_income": None,
                        "pct_bachelors_plus": None,
                    })
            print(f"  Matched demographics for {matched}/{len(existing_districts)} districts")

        cycle["demographics"] = cycle_demo
        print(f"  Total pop: {cycle_demo.get('total_population'):,}" if cycle_demo.get('total_population') else "  Total pop: N/A")
        print(f"  Income source: {income_source}")

    # Write back to processed/
    with open(stats_path, "w") as fh:
        json.dump(stats, fh, indent=2)
    new_size = stats_path.stat().st_size
    print(f"\nWrote {stats_path} ({new_size:,} bytes)")

    # Copy to web/static/ for frontend consumption
    import shutil
    web_dest = Path("web/static") / f"{state_lower}_stats.json"
    if web_dest.parent.exists():
        shutil.copy2(stats_path, web_dest)
        print(f"Copied → {web_dest}")

    print("Demographics pipeline complete.")


if __name__ == "__main__":
    main()
