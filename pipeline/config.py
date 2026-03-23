"""Shared configuration for the redistricting data pipeline.

Each state entry contains:
  fips   — two-digit Census state FIPS code
  crs    — projected CRS for accurate area/perimeter calculations
  cycles — redistricting cycles keyed by first election year
             congress              : Congress number drawn under those maps
             shapefile_id          : NHGIS national shapefile ID (same across states)
             seats                 : congressional seat count
             redistricting_controller
             notes (optional)      : litigation / special circumstances
"""

STATES: dict[str, dict] = {
    "MI": {
        "name": "Michigan",
        "fips": "26",
        "crs": "EPSG:6493",   # Michigan GeoRef
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 16,
                "redistricting_controller": "Republican",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 15,
                "redistricting_controller": "Split (Dem governor, Rep legislature)",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 14,
                "redistricting_controller": "Republican",
                "notes": "2011 maps subject to litigation; remedial maps used in 2020 only",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 13,
                "redistricting_controller": "Independent Commission (MICRC)",
                "notes": "Proposal 2 (2018) created the Michigan Independent Citizens Redistricting Commission",
            },
        },
    },
    "WI": {
        "name": "Wisconsin",
        "fips": "55",
        "crs": "EPSG:3071",   # Wisconsin Transverse Mercator (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 9,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "Governor Tommy Thompson (R) and a divided legislature could not agree on a plan; a three-judge federal panel drew the maps in Prosser v. Elections Board (1992)",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 8,
                "redistricting_controller": "Republican",
                "notes": "Governor McCallum (R) signed Republican-drawn maps after Democrats failed to block them; Baumgart v. Wendelberger (W.D. Wis. 2002) approved the plan",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 8,
                "redistricting_controller": "Republican",
                "notes": "Governor Walker (R) and Republican legislature drew Act 43; Gill v. Whitford (2018) challenged the state legislative maps (not congressional) but the SCOTUS remanded for lack of standing",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Court-drawn (governor veto)",
                "notes": "Governor Evers (D) vetoed Republican legislative maps; the WI Supreme Court drew remedial maps using a 'least change' approach in Johnson v. Wisconsin Elections Commission (2022)",
            },
        },
    },
    "MD": {
        "name": "Maryland",
        "fips": "24",
        "crs": "EPSG:32618",   # UTM Zone 18N (NAD83) — covers the Chesapeake Bay region
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 8,
                "redistricting_controller": "Democrat",
                "notes": "Governor Schaefer (D) and a Democratic legislature drew maps preserving 7 of 8 Democratic seats",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 8,
                "redistricting_controller": "Democrat",
                "notes": "Governor Glendening (D) and Democratic legislature maintained the 7-1 Democratic delegation",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 8,
                "redistricting_controller": "Democrat",
                "notes": "Governor O'Malley (D) signed maps that redrew the 6th District — held by Republicans since 1991 — into a heavily Democratic seat by adding Montgomery County suburbs; Benisek v. Lamone challenged the 6th as a partisan gerrymander",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Democrat (veto override)",
                "notes": "Republican governor Hogan vetoed the Democratic legislature's maps; the legislature overrode the veto. Szeliga v. Lamone struck the original map as unconstitutional; remedial maps ordered and used in 2022",
            },
        },
    },
    "NC": {
        "name": "North Carolina",
        "fips": "37",
        "crs": "EPSG:32119",  # NC State Plane (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 12,
                "redistricting_controller": "Democrat",
                "notes": "Shaw v. Reno (1993) challenged majority-minority district shapes; maps redrawn multiple times through decade",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 13,
                "redistricting_controller": "Democrat",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 13,
                "redistricting_controller": "Republican",
                "notes": "Cooper v. Harris (2017) struck 2 districts as racial gerrymanders; Rucho v. Common Cause (2019) blocked federal partisan gerrymandering review",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 14,
                "redistricting_controller": "Republican",
                "notes": "Harper v. Hall: NC Supreme Court struck maps, then reversed after court composition changed; new maps enacted 2023",
            },
        },
    },
}

# NHGIS shapefile IDs needed (de-duplicated across all states)
ALL_SHAPEFILE_IDS = list({
    meta["shapefile_id"]
    for state in STATES.values()
    for meta in state["cycles"].values()
})

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


def get_state(state_po: str) -> dict:
    """Return state config for the given postal abbreviation (e.g. 'MI', 'NC')."""
    key = state_po.upper()
    if key not in STATES:
        raise ValueError(f"Unknown state '{state_po}'. Known states: {list(STATES)}")
    return STATES[key]
