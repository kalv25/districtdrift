"""Shared constants for the Michigan redistricting pipeline."""

# Michigan FIPS state code
MI_FIPS = "26"
MI_STATE_PO = "MI"

# Congressional election years and their redistricting cycle
# Each maps to: the Congress number drawn under that cycle's maps
CYCLES = {
    1992: {"congress": 103, "shapefile_id": "us_cd103rd_1990_tl2000", "seats": 16,
           "redistricting_controller": "Republican"},
    2002: {"congress": 108, "shapefile_id": "us_cd108th_2000_tl2010", "seats": 15,
           "redistricting_controller": "Split (Dem governor, Rep legislature)"},
    2012: {"congress": 113, "shapefile_id": "us_cd113th_2012_tl2012", "seats": 14,
           "redistricting_controller": "Republican",
           "notes": "2011 maps subject to litigation; remedial maps used in 2020 only"},
    2022: {"congress": 118, "shapefile_id": "us_cd118th_2022_tl2022", "seats": 13,
           "redistricting_controller": "Independent Commission (MICRC)",
           "notes": "Proposal 2 (2018) created the Michigan Independent Citizens Redistricting Commission"},
}

# CRS for accurate area/perimeter calculations (Michigan GeoRef)
MICHIGAN_CRS = "EPSG:6493"

# MIT Election Lab US House returns — Harvard Dataverse
MIT_ELECTIONS_DOI = "doi:10.7910/DVN/IG0UN2"
MIT_ELECTIONS_FILENAME = "1976-2024-house.tab"

# NHGIS IPUMS API
NHGIS_API_BASE = "https://api.ipums.org"
NHGIS_API_VERSION = "v1"

# Raw and processed data directories (relative to repo root)
RAW_DIR = "data/raw"
PROCESSED_DIR = "data/processed"
TILES_DIR = "tiles"
