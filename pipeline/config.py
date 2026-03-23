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
    "IL": {
        "name": "Illinois",
        "fips": "17",
        "crs": "EPSG:32616",   # UTM Zone 16N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 20,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Edgar (R) and a Democratic-controlled General Assembly produced negotiated maps; Illinois lost 2 seats from the 1990 census. Note: NHGIS 103rd Congress shapefile severely incomplete for Illinois — only districts 11-12 and 14-20 have boundaries; districts 1-10 and 13 are missing.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 19,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "Governor Ryan (R) and a split legislature deadlocked; a federal court drew the congressional map in Hastert v. State Board of Elections (2001); Illinois lost 1 seat",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 18,
                "redistricting_controller": "Democrat",
                "notes": "Governor Quinn (D) and a Democratic-controlled legislature drew maps producing a 12-6 Democratic delegation; Illinois lost 1 seat from the 2010 census",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 17,
                "redistricting_controller": "Democrat",
                "notes": "Governor Pritzker (D) and Democratic legislature drew aggressive maps after Illinois lost 1 seat; challenged under VRA for diluting Black and Hispanic representation in Illinois State Conference of NAACP v. Illinois State Board of Elections",
            },
        },
    },
    "FL": {
        "name": "Florida",
        "fips": "12",
        "crs": "EPSG:32617",   # UTM Zone 17N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 23,
                "redistricting_controller": "Democrat",
                "notes": "Governor Chiles (D) and a Democratic legislature drew maps after the 1990 census gave Florida 4 additional seats; VRA required new majority-minority districts. Note: NHGIS 103rd Congress shapefile missing boundary for FL-9.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 25,
                "redistricting_controller": "Republican",
                "notes": "Governor Jeb Bush (R) and a Republican-controlled legislature drew maps after Florida gained 2 seats; Republicans won 18 of 25 seats",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 27,
                "redistricting_controller": "Republican",
                "notes": "Governor Rick Scott (R) and Republican legislature drew maps constrained by the Fair Districts Amendment (Amendment 6, 2010); FL Supreme Court struck the maps in 2015 (LWV v. Detzner) as violating the amendment — remedial maps used from 2016 onward",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 28,
                "redistricting_controller": "Republican",
                "notes": "Governor DeSantis (R) rejected the legislature's map and submitted his own, eliminating the majority-Black 5th District (I-10 corridor); a federal court struck it as a VRA violation but the 11th Circuit reversed, allowing the maps to stand for 2022",
            },
        },
    },
    "VA": {
        "name": "Virginia",
        "fips": "51",
        "crs": "EPSG:32618",   # UTM Zone 18N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 11,
                "redistricting_controller": "Democrat",
                "notes": "Governor Douglas Wilder (D) — the first Black governor of any U.S. state in modern history — and a Democratic legislature drew the map; VRA required creation of majority-minority districts",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 11,
                "redistricting_controller": "Split (Rep governor, split legislature)",
                "notes": "Governor Gilmore (R) and a split General Assembly (Rep House of Delegates, Dem Senate) negotiated maps; Virginia retained 11 seats",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 11,
                "redistricting_controller": "Republican",
                "notes": "Governor McDonnell (R) signed Republican-drawn maps; the majority-Black 3rd District was packed more densely, cracking adjacent districts to benefit Republicans",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 11,
                "redistricting_controller": "Court-drawn (commission deadlock)",
                "notes": "Virginia's new bipartisan redistricting commission (created by Amendment 1 in 2020) deadlocked along party lines; the Virginia Supreme Court drew maps through special masters, producing relatively proportional results",
            },
        },
    },
    "OH": {
        "name": "Ohio",
        "fips": "39",
        "crs": "EPSG:32617",   # UTM Zone 17N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 19,
                "redistricting_controller": "Split (Rep governor, Dem House)",
                "notes": "Governor Voinovich (R) and a split legislature negotiated maps after Ohio lost 2 seats from the 1990 census. Note: NHGIS 103rd Congress shapefile missing district boundaries for OH-3, OH-10, and OH-11.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 18,
                "redistricting_controller": "Republican",
                "notes": "Governor Taft (R) and a Republican-controlled legislature drew maps after Ohio lost 1 seat",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 16,
                "redistricting_controller": "Republican",
                "notes": "Governor Kasich (R) and Republican legislature drew maps producing a 12-4 Republican delegation in a presidential swing state; Ohio lost 2 seats from the 2010 census",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 15,
                "redistricting_controller": "Republican",
                "notes": "The Republican-majority Ohio Redistricting Commission drew maps the Ohio Supreme Court struck twice (Jan and July 2022); the unconstitutional maps were nonetheless used for the 2022 elections after the court missed its own deadlines",
            },
        },
    },
    "TX": {
        "name": "Texas",
        "fips": "48",
        "crs": "EPSG:3083",   # NAD83 / Texas Centric Albers Equal Area
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 30,
                "redistricting_controller": "Democrat",
                "notes": "Governor Ann Richards (D) and a Democratic legislature drew maps after the 1990 census gave Texas 3 additional seats; VRA required majority-minority districts",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 32,
                "redistricting_controller": "Court-drawn (legislative deadlock)",
                "notes": "Legislature deadlocked (Dem House, Rep Senate); a three-judge federal panel drew maps in Balderas v. Texas (2001). Note: Tom DeLay orchestrated a mid-decade Republican redraw in 2003 (LULAC v. Perry) that took effect in 2004 — only the 2002 election used these court-drawn maps",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 36,
                "redistricting_controller": "Republican",
                "notes": "Governor Perry (R) and Republican legislature drew maps; VRA Section 5 preclearance denied by D.C. Circuit in Texas v. US (2012). SCOTUS ordered interim maps in Perry v. Perez (2012); court-negotiated maps used through the cycle",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 38,
                "redistricting_controller": "Republican",
                "notes": "Governor Abbott (R) and Republican legislature drew maps adding 2 new seats; VRA Section 2 challenges filed in Brooks v. Abbott and related cases over minority representation",
            },
        },
    },
    "PA": {
        "name": "Pennsylvania",
        "fips": "42",
        "crs": "EPSG:32617",   # UTM Zone 17N (NAD83) — centers on Pennsylvania
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 21,
                "redistricting_controller": "Split (Dem governor, Rep legislature)",
                "notes": "Governor Bob Casey (D) and a Republican-controlled legislature negotiated maps; result was roughly proportional. Note: NHGIS 103rd Congress shapefile is missing district boundaries for PA-14 and PA-18.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 19,
                "redistricting_controller": "Republican",
                "notes": "Governor Schweiker (R) signed Republican-drawn maps; Vieth v. Jubelirer (2004) challenged them as a partisan gerrymander but SCOTUS ruled 5–4 that such claims were not justiciable",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 18,
                "redistricting_controller": "Republican",
                "notes": "Governor Corbett (R) signed maps including the infamous 'Goofy Kicking Donald Duck' 7th District; PA Supreme Court struck maps in 2018 (League of Women Voters v. Commonwealth) and drew its own remedial map used from 2018 onward",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 17,
                "redistricting_controller": "Court-drawn (governor veto)",
                "notes": "Governor Wolf (D) vetoed Republican maps; PA Supreme Court drew its own congressional map in February 2022, producing a near-proportional 9-8 delegation",
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
    "GA": {
        "name": "Georgia",
        "fips": "13",
        "crs": "EPSG:26916",   # NAD83 / UTM Zone 16N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 11,
                "redistricting_controller": "Democrat",
                "notes": "Governor Zell Miller (D) and a Democratic legislature drew maps after the 1990 census; VRA required creation of majority-Black districts, producing the serpentine 11th District challenged in Miller v. Johnson (1995), which SCOTUS struck as an unconstitutional racial gerrymander",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 13,
                "redistricting_controller": "Democrat",
                "notes": "Governor Roy Barnes (D) and a Democratic legislature drew maps after Georgia gained 2 seats from the 2000 census; Democrats attempted to protect incumbents but Republicans swept to a 7-6 majority in 2002 anyway, foreshadowing the state's rightward shift",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 14,
                "redistricting_controller": "Republican",
                "notes": "Governor Nathan Deal (R) and a Republican-controlled General Assembly drew maps after Georgia gained 1 seat; maps produced a 9-5 Republican delegation; VRA Section 5 preclearance required DOJ approval",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 14,
                "redistricting_controller": "Republican",
                "notes": "Governor Brian Kemp (R) and Republican legislature drew maps maintaining a 9-5 Republican delegation; Pendergrass v. Raffensperger challenged the maps as packing Black voters in violation of VRA Section 2; court ordered remedial maps for 2024 elections",
            },
        },
    },
    "NY": {
        "name": "New York",
        "fips": "36",
        "crs": "EPSG:32618",   # NAD83 / UTM Zone 18N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 31,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Cuomo (D) and a split legislature (Dem Assembly, Rep Senate) produced negotiated maps; New York lost 3 seats from the 1990 census, shrinking from 34 to 31. Note: NHGIS 103rd Congress shapefile severely incomplete for New York — only 15 of 31 district boundaries are present (districts 8, 12, 14-15, 19-27, 29, 31); predominantly NYC and inner-suburban districts are missing.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 29,
                "redistricting_controller": "Split (Rep governor, split legislature)",
                "notes": "Governor Pataki (R) and a divided legislature (Dem Assembly, Rep Senate) negotiated an incumbent-protection gerrymander; New York lost 2 seats from the 2000 census",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 27,
                "redistricting_controller": "Split (Dem governor, split legislature)",
                "notes": "Governor Cuomo (D) and a divided legislature drew maps after New York lost 2 seats; Cuomo threatened a veto but signed the bipartisan incumbent-protection plan",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 26,
                "redistricting_controller": "Court-drawn (Dem gerrymander struck down)",
                "notes": "Democrats drew an aggressive gerrymander targeting 22 of 26 seats; the NY Court of Appeals struck the maps as violating the 2014 anti-gerrymandering amendment; a court-appointed special master drew replacement maps used in 2022, producing a 15-11 Democratic delegation in a state Biden won by 23 points",
            },
        },
    },
    "CA": {
        "name": "California",
        "fips": "06",
        "crs": "EPSG:3310",   # CA Albers Equal Area
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 52,
                "redistricting_controller": "Democrat",
                "notes": "Governor Pete Wilson (R) vetoed the Democratic legislature's maps; a special master drew initial maps, then a ballot initiative (Prop 118/119) failed; the CA Supreme Court appointed masters who drew the maps used through the cycle. California gained 7 seats from the 1990 census.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 53,
                "redistricting_controller": "Democrat",
                "notes": "Governor Gray Davis (D) and a Democratic legislature drew an incumbent-protection gerrymander so effective it produced zero seat changes in 2002 and 2004; California gained 1 seat from the 2000 census. The maps were widely criticized as the 'incumbent protection act of 2001.'",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 53,
                "redistricting_controller": "Independent Commission (CCRC)",
                "notes": "Proposition 11 (2008) created the California Citizens Redistricting Commission; Proposition 20 (2010) extended its authority to congressional districts. The CCRC's maps were the first non-legislatively drawn congressional maps in California in decades.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 52,
                "redistricting_controller": "Independent Commission (CCRC)",
                "notes": "The California Citizens Redistricting Commission drew maps after California lost 1 seat from the 2020 census — the first loss in state history. The CCRC process involved extensive public hearings; maps produced a delegation roughly proportional to the state's Democratic lean.",
            },
        },
    },
    "NJ": {
        "name": "New Jersey",
        "fips": "34",
        "crs": "EPSG:32618",   # NAD83 / UTM Zone 18N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 13,
                "redistricting_controller": "Bipartisan Commission",
                "notes": "New Jersey uses a bipartisan Apportionment Commission (6 Democrats, 6 Republicans + 1 tiebreaker); a Democratic tiebreaker chose the Democratic plan for the 1992 maps",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 13,
                "redistricting_controller": "Bipartisan Commission",
                "notes": "The bipartisan commission deadlocked; Republican tiebreaker Nathaniel Gorenstein chose the Republican plan, producing maps that helped Republicans win 7 of 13 seats in 2002",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 12,
                "redistricting_controller": "Bipartisan Commission",
                "notes": "New Jersey lost 1 seat after the 2010 census; the bipartisan commission deadlocked again; tiebreaker John Farmer chose a compromise plan producing a 6-6 delegation split",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 12,
                "redistricting_controller": "Bipartisan Commission",
                "notes": "The bipartisan commission deadlocked; tiebreaker Philip Carchman chose the Democratic plan in January 2022, producing maps that helped Democrats hold a 9-3 advantage in a state Biden won by 16 points",
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
