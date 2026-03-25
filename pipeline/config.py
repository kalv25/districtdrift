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

from __future__ import annotations

from typing import Any

STATES: dict[str, dict[str, Any]] = {
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 13,
                "redistricting_controller": "Independent Commission (MICRC)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Court-drawn (governor veto)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 17,
                "redistricting_controller": "Democrat",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 28,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 11,
                "redistricting_controller": "Court-drawn (commission deadlock)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 15,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 38,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 17,
                "redistricting_controller": "Court-drawn (governor veto)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Democrat (veto override)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 119,
                "shapefile_id": "us_cd119th_2024_tl2024",
                "seats": 14,
                "redistricting_controller": "Republican",
                "notes": "2024 elections held under court-ordered remedial maps in Pendergrass v. Raffensperger; a second majority-Black district (GA-6, redrawn) was required, shifting one seat from Republican to Democratic",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 26,
                "redistricting_controller": "Court-drawn (Dem gerrymander struck down)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 52,
                "redistricting_controller": "Independent Commission (CCRC)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 12,
                "redistricting_controller": "Bipartisan Commission",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "AZ": {
        "name": "Arizona",
        "fips": "04",
        "crs": "EPSG:32612",   # NAD83 / UTM Zone 12N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 6,
                "redistricting_controller": "Republican",
                "notes": "Governor Symington (R) and a Republican-controlled legislature drew maps after Arizona gained 1 seat from the 1990 census",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 8,
                "redistricting_controller": "Independent Commission (AIRC)",
                "notes": "Proposition 106 (2000) created the Arizona Independent Redistricting Commission, removing redistricting from legislative control. Arizona gained 2 seats from the 2000 census. The first AIRC maps were used starting in 2002.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 9,
                "redistricting_controller": "Independent Commission (AIRC)",
                "notes": "Arizona gained 1 seat after the 2010 census. The Republican-controlled legislature attempted to remove AIRC chair Colleen Mathis in 2011; the AZ Supreme Court reinstated her. The legislature then sued to abolish the AIRC entirely — Arizona State Legislature v. Arizona Independent Redistricting Commission (2015) — but SCOTUS upheld the commission 5-4.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 9,
                "redistricting_controller": "Independent Commission (AIRC)",
                "notes": "The AIRC drew maps for the third time; Arizona retained 9 seats after the 2020 census. Maps produced a competitive delegation in one of the nation's premier swing states, with Democrats and Republicans each winning seats across multiple cycles.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 9,
                "redistricting_controller": "Independent Commission (AIRC)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "CO": {
        "name": "Colorado",
        "fips": "08",
        "crs": "EPSG:32613",   # NAD83 / UTM Zone 13N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 6,
                "redistricting_controller": "Split (Dem governor, split legislature)",
                "notes": "Governor Romer (D) and a split legislature (Dem House, Rep Senate) produced negotiated maps; Colorado retained 6 seats after the 1990 census",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 7,
                "redistricting_controller": "Court-drawn (legislative deadlock + mid-decade Republican remap struck)",
                "notes": "Colorado gained 1 seat after the 2000 census. A split legislature deadlocked; a court drew maps for 2002. Republicans won control of the legislature in 2002 and passed new mid-decade maps in 2003. Salazar v. Davidson (Colo. 2003) struck the mid-decade remap as unconstitutional — the court-drawn 2002 maps remained in use for the full cycle.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 7,
                "redistricting_controller": "Split (Dem governor, split legislature)",
                "notes": "Governor Hickenlooper (D) and a divided legislature negotiated maps; Colorado retained 7 seats. A split government produced relatively competitive maps.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Independent Commission (CIRC)",
                "notes": "Amendment Y (2018) created the Colorado Independent Congressional Redistricting Commission. Colorado gained 1 seat after the 2020 census, reaching 8 districts. The CIRC drew maps through an extensive public process; the CO Supreme Court approved the final maps in November 2021.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Independent Commission (CIRC)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "MN": {
        "name": "Minnesota",
        "fips": "27",
        "crs": "EPSG:26915",   # NAD83 / UTM Zone 15N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 8,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "Governor Carlson (R) and a DFL-controlled legislature could not agree; a three-judge panel of the MN Supreme Court drew the congressional maps, which were used through the decade. Minnesota retained 8 seats after the 1990 census.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 8,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "Governor Ventura (Reform Party) and a divided legislature deadlocked; the MN Supreme Court again drew congressional maps. Minnesota retained 8 seats after the 2000 census.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 8,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "Governor Dayton (DFL) and a Republican-controlled legislature deadlocked; a special redistricting panel of MN appellate judges drew the maps for the third consecutive cycle. Minnesota retained 8 seats after the 2010 census.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "Governor Walz (DFL) and a Republican-controlled Senate deadlocked for the fourth consecutive cycle; a special redistricting panel drew maps. Minnesota narrowly retained 8 seats after the 2020 census (it came within ~26 people of losing a seat to New York).",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
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
            2024: {
                "congress": 119,
                "shapefile_id": "us_cd119th_2024_tl2024",
                "seats": 14,
                "redistricting_controller": "Republican",
                "notes": "2024 elections held under new maps redrawn by the Republican legislature in 2023 after the NC Supreme Court reversed its own decision in Harper v. Hall; the new maps were significantly more Republican-favorable, producing an 11-3 Republican delegation",
            },
        },
    },
    "AL": {
        "name": "Alabama",
        "fips": "01",
        "crs": "EPSG:26916",   # NAD83 / UTM Zone 16N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 7,
                "redistricting_controller": "Democrat",
                "notes": "Governor Hunt (D) and a Democratic legislature drew maps maintaining 7 seats; VRA required creation of a majority-Black district",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 7,
                "redistricting_controller": "Democrat",
                "notes": "Governor Siegelman (D) and a Democratic-controlled legislature drew maps; Alabama retained 7 seats after the 2000 census",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 7,
                "redistricting_controller": "Republican",
                "notes": "Governor Bentley (R) and a Republican supermajority legislature drew maps after Republicans swept Alabama in 2010; Alabama retained 7 seats. Maps packed Black voters into a single majority-Black district (AL-7), enabling a 6-1 Republican advantage in a state roughly 27% Black.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 7,
                "redistricting_controller": "Republican",
                "notes": "Governor Ivey (R) and Republican legislature drew maps keeping one majority-Black district despite Black residents comprising 27% of the population. Allen v. Milligan (2023): SCOTUS ruled 5-4 that the maps violated VRA Section 2 by failing to draw a second district where Black voters could elect a preferred candidate; remedial maps ordered for 2024 produced a second majority-Black seat.",
            },
            2024: {
                "congress": 119,
                "shapefile_id": "us_cd119th_2024_tl2024",
                "seats": 7,
                "redistricting_controller": "Republican",
                "notes": "2024 elections held under VRA remedial maps ordered by federal court in Allen v. Milligan (2023); a second majority-Black district was drawn, producing a 6-1 Republican delegation with 2 majority-Black seats",
            },
        },
    },
    "IN": {
        "name": "Indiana",
        "fips": "18",
        "crs": "EPSG:32616",   # UTM Zone 16N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 10,
                "redistricting_controller": "Split (Dem governor, split legislature)",
                "notes": "Governor Bayh (D) and a closely divided legislature drew maps; Indiana retained 10 seats after the 1990 census",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 9,
                "redistricting_controller": "Split (Dem governor, Rep legislature)",
                "notes": "Governor O'Bannon (D) and a Republican-controlled General Assembly drew maps after Indiana lost 1 seat from the 2000 census; Republicans held majorities in both chambers",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 9,
                "redistricting_controller": "Republican",
                "notes": "Governor Daniels (R) and a Republican supermajority legislature drew maps after Republicans swept Indiana in 2010; Indiana retained 9 seats. Maps produced a 7-2 Republican delegation.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 9,
                "redistricting_controller": "Republican",
                "notes": "Governor Holcomb (R) and a Republican supermajority legislature drew maps; Indiana retained 9 seats after the 2020 census. Maps maintained a 7-2 Republican advantage.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 9,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "LA": {
        "name": "Louisiana",
        "fips": "22",
        "crs": "EPSG:26915",   # NAD83 / UTM Zone 15N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 7,
                "redistricting_controller": "Democrat",
                "notes": "Governor Edwards (D) and a Democratic legislature drew maps; Louisiana retained 7 seats. VRA required creation of majority-Black districts. The resulting 4th District (I-49 corridor) was challenged in United States v. Hays (1995) for its unusual shape.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 7,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Foster (R) and a Democratic-controlled legislature drew maps; Louisiana retained 7 seats after the 2000 census",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 6,
                "redistricting_controller": "Republican",
                "notes": "Governor Jindal (R) and a legislature newly controlled by Republicans drew maps after Louisiana lost 1 seat from the 2010 census. Republicans passed maps over Democratic objections producing a 5-1 Republican delegation.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 6,
                "redistricting_controller": "Republican (veto override)",
                "notes": "Governor Edwards (D) vetoed Republican maps that contained only one majority-Black district despite Black residents comprising 33% of the population; the Republican supermajority legislature overrode the veto. Robinson v. Ardoin: federal court ruled the maps violated VRA Section 2; a remedial map with two majority-Black districts was ordered for 2024.",
            },
            2024: {
                "congress": 119,
                "shapefile_id": "us_cd119th_2024_tl2024",
                "seats": 6,
                "redistricting_controller": "Republican (veto override)",
                "notes": "2024 elections held under court-ordered remedial maps in Robinson v. Ardoin; a second majority-Black district was drawn along the Mississippi River corridor, producing a 5-1 Republican delegation with 2 majority-Black seats",
            },
        },
    },
    "MA": {
        "name": "Massachusetts",
        "fips": "25",
        "crs": "EPSG:32619",   # NAD83 / UTM Zone 19N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 10,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Weld (R) and a heavily Democratic legislature drew maps after Massachusetts lost 1 seat from the 1990 census (11→10); the Democratic legislature controlled the process",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 10,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Acting Governor Swift (R) and a heavily Democratic legislature drew maps; Massachusetts retained 10 seats after the 2000 census. The Democratic legislature produced maps preserving all 10 incumbents.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 9,
                "redistricting_controller": "Democrat",
                "notes": "Governor Patrick (D) and a Democratic legislature drew maps after Massachusetts lost 1 seat from the 2010 census (10→9); the process was relatively uncontroversial as Democrats held all seats",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 9,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Baker (R) and a heavily Democratic legislature drew maps; Massachusetts retained 9 seats after the 2020 census. A bipartisan redistricting committee produced relatively uncontested maps in a solidly Democratic state.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 9,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "MO": {
        "name": "Missouri",
        "fips": "29",
        "crs": "EPSG:26915",   # NAD83 / UTM Zone 15N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 9,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Ashcroft (R) and a Democratic-controlled legislature drew maps; Missouri retained 9 seats after the 1990 census",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 9,
                "redistricting_controller": "Split (Dem governor, split legislature)",
                "notes": "Governor Holden (D) and a narrowly divided legislature drew maps; Missouri retained 9 seats after the 2000 census. Republicans gained the House majority in 2002; maps were drawn while Democrats still held a narrow edge.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 8,
                "redistricting_controller": "Split (Dem governor, Rep legislature)",
                "notes": "Governor Nixon (D) and a Republican-supermajority legislature drew maps after Missouri lost 1 seat from the 2010 census (9→8); Republicans drew maps over Democratic objections producing a 6-2 Republican advantage",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Republican",
                "notes": "Governor Parson (R) and a Republican supermajority legislature drew maps; Missouri retained 8 seats. Maps maintained a 6-2 Republican advantage in a state Trump won by 15 points.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 8,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "OR": {
        "name": "Oregon",
        "fips": "41",
        "crs": "EPSG:32610",   # NAD83 / UTM Zone 10N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 5,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "Governor Roberts (D) and a split legislature (Rep Senate, Dem House) deadlocked; a Marion County Circuit Court drew congressional maps. Oregon retained 5 seats after the 1990 census.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 5,
                "redistricting_controller": "Court-drawn (split government)",
                "notes": "Governor Kitzhaber (D) and a split legislature again deadlocked; a Marion County Circuit Court drew maps for the second consecutive decade. Oregon retained 5 seats after the 2000 census.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 5,
                "redistricting_controller": "Democrat",
                "notes": "Governor Kitzhaber (D) and a Democratic-controlled legislature drew maps for the first time since the 1980s; Oregon retained 5 seats after the 2010 census. Democrats maintained a 4-1 advantage.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 6,
                "redistricting_controller": "Democrat",
                "notes": "Governor Brown (D) and a Democratic legislature drew maps after Oregon gained 1 seat from the 2020 census (5→6). Democrats drew an aggressive map targeting 5 of 6 seats; Republicans and independents challenged the maps but they survived court review. A nonpartisan redistricting reform measure narrowly failed at the ballot in 2022.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 6,
                "redistricting_controller": "Democrat",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "SC": {
        "name": "South Carolina",
        "fips": "45",
        "crs": "EPSG:32617",   # UTM Zone 17N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 6,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Campbell (R) and a Democratic-controlled legislature drew maps; South Carolina retained 6 seats. VRA required creation of a majority-Black district (SC-6), producing the first Black congressman from South Carolina since Reconstruction.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 6,
                "redistricting_controller": "Split (Dem governor, Rep legislature)",
                "notes": "Governor Hodges (D) and a Republican-controlled legislature drew maps; South Carolina retained 6 seats after the 2000 census. Republicans held both chambers and drove the process.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 7,
                "redistricting_controller": "Republican",
                "notes": "Governor Haley (R) and a Republican supermajority legislature drew maps after South Carolina gained 1 seat from the 2010 census (6→7). Republicans drew maps maintaining a 6-1 advantage; the new 7th District (Myrtle Beach) was drawn as a safe Republican seat.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 7,
                "redistricting_controller": "Republican",
                "notes": "Governor McMaster (R) and a Republican supermajority legislature drew maps; South Carolina retained 7 seats. Alexander v. South Carolina State Conference of the NAACP: SCOTUS ruled 6-3 in 2023 that the 1st District (Charleston) was not an unconstitutional racial gerrymander despite cracking the Black community in North Charleston, applying a high presumption of legislative good faith.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 7,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "TN": {
        "name": "Tennessee",
        "fips": "47",
        "crs": "EPSG:32616",   # UTM Zone 16N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 9,
                "redistricting_controller": "Democrat",
                "notes": "Governor McWherter (D) and a Democratic legislature drew maps; Tennessee retained 9 seats after the 1990 census",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 9,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Sundquist (R) and a Democratic-controlled legislature drew maps; Tennessee retained 9 seats after the 2000 census. Democrats held both chambers and controlled the process.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 9,
                "redistricting_controller": "Republican",
                "notes": "Governor Haslam (R) and a Republican supermajority legislature drew maps after Republicans swept Tennessee in 2010; Tennessee retained 9 seats. Maps produced a 7-2 Republican delegation.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 9,
                "redistricting_controller": "Republican",
                "notes": "Governor Lee (R) and a Republican supermajority legislature drew maps; Tennessee retained 9 seats after the 2020 census. Republicans also controversially redrew state legislative maps in 2023 to split Nashville across three congressional districts, diluting the city's Democratic voting power — a move critics called an unconstitutional partisan gerrymander.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 9,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "WA": {
        "name": "Washington",
        "fips": "53",
        "crs": "EPSG:32610",   # NAD83 / UTM Zone 10N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 9,
                "redistricting_controller": "Independent Commission (WRC)",
                "notes": "Washington's nonpartisan Redistricting Commission (created by Initiative 63 in 1983) drew maps after Washington gained 1 seat from the 1990 census (8→9). The WRC consists of four partisan appointees who must reach consensus; maps cannot be drawn by the legislature unless the commission deadlocks.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 9,
                "redistricting_controller": "Independent Commission (WRC)",
                "notes": "The Washington Redistricting Commission drew maps; Washington retained 9 seats after the 2000 census. The WRC produced maps generally seen as competitive and nonpartisan.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 10,
                "redistricting_controller": "Independent Commission (WRC)",
                "notes": "The Washington Redistricting Commission drew maps after Washington gained 1 seat from the 2010 census (9→10). The new 10th District (Tacoma/South Puget Sound) was drawn as a competitive seat; Democrats won it in 2012.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 10,
                "redistricting_controller": "Independent Commission (WRC)",
                "notes": "The Washington Redistricting Commission drew maps; Washington retained 10 seats after the 2020 census. A last-minute alteration by the WRC drew controversy — staff made unauthorized changes to the final maps after the commission vote, which the WA Supreme Court struck; the original commission maps were used.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 10,
                "redistricting_controller": "Independent Commission (WRC)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    # -----------------------------------------------------------------------
    # Batch 3: remaining 24 states (completing all 50)
    # -----------------------------------------------------------------------
    "AK": {
        "name": "Alaska",
        "fips": "02",
        "crs": "EPSG:3338",   # NAD83 / Alaska Albers
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "Alaska has elected one at-large representative throughout its statehood. With a single district coterminous with the state, congressional redistricting is not applicable.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "Alaska retained its single at-large seat after the 2020 census. In 2020, Alaska voters approved Measure 2, which instituted nonpartisan top-four primaries and ranked-choice voting for general elections beginning with the 2022 cycle.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
        },
    },
    "AR": {
        "name": "Arkansas",
        "fips": "05",
        "crs": "EPSG:32615",   # UTM Zone 15N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 4,
                "redistricting_controller": "Democrat",
                "notes": "Governor Tucker (D) — who succeeded Bill Clinton upon his election to the presidency — and a Democratic legislature drew maps; Arkansas retained 4 seats after the 1990 census",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 4,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Huckabee (R) and a Democratic-controlled legislature drew maps; Arkansas retained 4 seats after the 2000 census. Democrats held both chambers of the General Assembly and controlled the process.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 4,
                "redistricting_controller": "Democrat",
                "notes": "Governor Beebe (D) and a Democratic legislature drew maps for the last time; Arkansas retained 4 seats. Democrats still held both chambers of the General Assembly for the 2011 redistricting, though Republicans swept state legislative races in the 2012 elections — the first Republican legislative majority since Reconstruction.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "Governor Hutchinson (R) and a Republican supermajority legislature drew maps; Arkansas retained 4 seats after the 2020 census. Republicans produced a 4-0 delegation map in a state Trump won by 28 points.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "CT": {
        "name": "Connecticut",
        "fips": "09",
        "crs": "EPSG:32618",   # UTM Zone 18N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 6,
                "redistricting_controller": "Bipartisan Commission",
                "notes": "Connecticut uses a bipartisan Reapportionment Commission (equal D/R members + tiebreaker); if it deadlocks, a special master draws maps. Governor Weicker (A Connecticut Party/independent) and a Democratic legislature oversaw the process; Connecticut retained 6 seats after the 1990 census.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 5,
                "redistricting_controller": "Bipartisan Commission",
                "notes": "Connecticut lost 1 seat after the 2000 census (6→5). Governor Rowland (R) and a Democratic legislature oversaw the bipartisan commission process. The commission deadlocked; a Hartford Superior Court judge drew the maps.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 5,
                "redistricting_controller": "Democrat",
                "notes": "Governor Malloy (D) and a narrowly Democratic legislature drew maps; Connecticut retained 5 seats after the 2010 census. The bipartisan commission reached agreement for the first time in decades.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 5,
                "redistricting_controller": "Democrat",
                "notes": "Governor Lamont (D) and a Democratic legislature drew maps; Connecticut retained 5 seats after the 2020 census. Democrats held all 5 seats going into the cycle.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 5,
                "redistricting_controller": "Democrat",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "DE": {
        "name": "Delaware",
        "fips": "10",
        "crs": "EPSG:32618",   # UTM Zone 18N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "Delaware has elected one at-large representative throughout its modern history. With a single district coterminous with the state, congressional redistricting is not applicable.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
        },
    },
    "HI": {
        "name": "Hawaii",
        "fips": "15",
        "crs": "EPSG:26904",   # NAD83 / UTM Zone 4N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Waihee (D) and a Democratic legislature drew maps; Hawaii retained 2 seats. Hawaii uses a Reapportionment Commission to draw legislative and congressional districts.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Cayetano (D) and a Democratic legislature oversaw the reapportionment commission process; Hawaii retained 2 seats after the 2000 census",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Abercrombie (D) and a Democratic legislature oversaw the process; Hawaii retained 2 seats after the 2010 census. Hawaii has never sent a Republican to Congress since achieving statehood in 1959.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Ige (D) and a Democratic legislature oversaw the reapportionment commission; Hawaii retained 2 seats after the 2020 census",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "IA": {
        "name": "Iowa",
        "fips": "19",
        "crs": "EPSG:26915",   # NAD83 / UTM Zone 15N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 5,
                "redistricting_controller": "Nonpartisan (LSB)",
                "notes": "Iowa uses a unique nonpartisan redistricting process: the Legislative Services Bureau (LSB), a nonpartisan staff office, draws maps following strict criteria (compactness, contiguity, equal population — no partisan or incumbent data considered). The legislature may accept or reject but cannot amend. Iowa retained 5 seats after the 1990 census; Republican governor Branstad and a split legislature approved the LSB plan.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 5,
                "redistricting_controller": "Nonpartisan (LSB)",
                "notes": "Iowa retained 5 seats after the 2000 census. Democratic governor Vilsack and a Republican-controlled legislature approved the LSB's plan. Iowa's nonpartisan process is widely cited as a model for redistricting reform.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 4,
                "redistricting_controller": "Nonpartisan (LSB)",
                "notes": "Iowa lost 1 seat after the 2010 census (5→4). Republican governor Branstad and a Republican legislature rejected the first two LSB plans before accepting the third. The accepted plan eliminated the 1st District's liberal college-town base, reshuffling incumbents significantly.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Nonpartisan (LSB)",
                "notes": "Iowa retained 4 seats after the 2020 census. Republican governor Reynolds and a Republican supermajority legislature rejected the LSB's first plan and accepted the second, which created a more Republican-leaning 3rd District (Des Moines area) — a rare instance of a party exercising leverage within Iowa's nonpartisan framework.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Nonpartisan (LSB)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "ID": {
        "name": "Idaho",
        "fips": "16",
        "crs": "EPSG:32611",   # UTM Zone 11N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 2,
                "redistricting_controller": "Split (Dem governor, Rep legislature)",
                "notes": "Governor Andrus (D) and a Republican-controlled legislature drew maps; Idaho retained 2 seats after the 1990 census. Idaho's bipartisan redistricting commission was not created until 1994 (Prop 1), so the legislature drew the 1992 maps.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 2,
                "redistricting_controller": "Bipartisan Commission (IRC)",
                "notes": "Idaho's bipartisan Citizens' Commission for Reapportionment (6 members: 3 appointed by each party's legislative leaders) drew maps for the first time after its creation by Proposition 1 (1994). Idaho retained 2 seats after the 2000 census.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 2,
                "redistricting_controller": "Bipartisan Commission (IRC)",
                "notes": "The Idaho Citizens' Commission for Reapportionment drew maps; Idaho retained 2 seats after the 2010 census. The commission reached consensus on maps preserving Boise's concentration in the 2nd District.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Bipartisan Commission (IRC)",
                "notes": "The Idaho Citizens' Commission for Reapportionment drew maps; Idaho retained 2 seats after the 2020 census. VRA advocates argued the maps diluted the Native American vote in southeastern Idaho (Pocatello area), though no federal challenge was ultimately sustained.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Bipartisan Commission (IRC)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "KS": {
        "name": "Kansas",
        "fips": "20",
        "crs": "EPSG:32614",   # UTM Zone 14N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 4,
                "redistricting_controller": "Split (Dem governor, Rep legislature)",
                "notes": "Governor Finney (D) — one of only two women governors in Kansas history — and a Republican-controlled legislature drew maps; Kansas retained 4 seats after the 1990 census. The Republican legislature controlled the process.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "Governor Graves (R) and a Republican-controlled legislature drew maps; Kansas retained 4 seats after the 2000 census. Republicans maintained all 4 seats.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "Governor Brownback (R) and a Republican supermajority legislature drew maps; Kansas retained 4 seats after the 2010 census. Republicans maintained a 4-0 delegation.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Republican (veto override)",
                "notes": "Governor Kelly (D) vetoed the Republican legislature's congressional maps, which split the Kansas City metro area to shore up the 3rd District (Wyandotte/Johnson counties) as a safe Republican seat. The Republican supermajority legislature overrode the veto. Democrats subsequently won the 3rd District in 2022 and 2024 anyway.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Republican (veto override)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "KY": {
        "name": "Kentucky",
        "fips": "21",
        "crs": "EPSG:32617",   # UTM Zone 17N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 6,
                "redistricting_controller": "Democrat",
                "notes": "Governor Jones (D) and a Democratic legislature drew maps; Kentucky retained 6 seats after the 1990 census. Democrats controlled both chambers of the General Assembly.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 6,
                "redistricting_controller": "Split (Dem governor, split legislature)",
                "notes": "Governor Patton (D) and a split legislature (Dem House, Rep Senate) drew maps; Kentucky retained 6 seats after the 2000 census. Negotiated maps maintained the partisan status quo.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 6,
                "redistricting_controller": "Split (Dem governor, split legislature)",
                "notes": "Governor Beshear (D) and a split legislature (Dem House, Rep Senate) drew maps; Kentucky retained 6 seats after the 2010 census. Republicans held the Senate and were positioned to take the House in subsequent elections.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 6,
                "redistricting_controller": "Republican (veto override)",
                "notes": "Governor Beshear (D) vetoed congressional maps drawn by the Republican supermajority General Assembly, which captured both chambers in 2016. The legislature overrode the veto. The resulting maps split Louisville across multiple districts to dilute its Democratic lean, producing a 5-1 Republican delegation.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 6,
                "redistricting_controller": "Republican (veto override)",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "ME": {
        "name": "Maine",
        "fips": "23",
        "crs": "EPSG:32619",   # UTM Zone 19N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 2,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor McKernan (R) and a Democratic legislature drew maps; Maine retained 2 seats after the 1990 census. Maine uses a bipartisan apportionment commission whose recommendations the legislature votes on.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 2,
                "redistricting_controller": "Independent governor, Dem legislature",
                "notes": "Governor King (I) — an independent who served two terms — and a Democratic legislature drew maps; Maine retained 2 seats after the 2000 census. Maine adopted ranked-choice voting for congressional races via citizen initiative in 2016.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 2,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor LePage (R) and a split legislature drew maps; Maine retained 2 seats after the 2010 census. LePage was one of the most controversial governors in Maine history; redistricting was relatively uncontested given the small delegation.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Mills (D) and a Democratic legislature drew maps; Maine retained 2 seats after the 2020 census. Maine's unique congressional district allocation of Electoral College votes (CD method, same as Nebraska) makes the 2nd District (rural northern Maine) a perennial presidential battleground.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "MS": {
        "name": "Mississippi",
        "fips": "28",
        "crs": "EPSG:26916",   # NAD83 / UTM Zone 16N
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 5,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Fordice (R) — the first Republican governor of Mississippi since Reconstruction — and a Democratic legislature drew maps; Mississippi retained 5 seats. The Democratic legislature controlled the congressional redistricting process.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 4,
                "redistricting_controller": "Democrat",
                "notes": "Governor Musgrove (D) and a Democratic legislature drew maps after Mississippi lost 1 seat from the 2000 census (5→4). Democrats still controlled both chambers of the legislature.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 4,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Barbour (R) and a Democratic legislature drew maps; Mississippi retained 4 seats after the 2010 census. Democrats narrowly held both legislative chambers for the 2011 redistricting, but Republicans swept both chambers in the November 2011 elections — marking the end of Democratic legislative control in Mississippi.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "Governor Reeves (R) and a Republican supermajority legislature drew maps; Mississippi retained 4 seats after the 2020 census. Maps maintained a 3-1 Republican delegation. VRA advocates noted that Black residents (38% of the population) are represented by only one majority-Black district (MS-2), with little change from the pattern challenged in prior decades.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "MT": {
        "name": "Montana",
        "fips": "30",
        "crs": "EPSG:32612",   # UTM Zone 12N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "Montana lost 1 of its 2 congressional seats after the 1990 census and became an at-large state for the 103rd Congress — the same reapportionment that cost Washington, Massachusetts, and New York seats. With one district covering the entire state, congressional redistricting was not applicable.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "Montana retained its single at-large seat after the 2000 census, coming within a small margin of regaining a second seat",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "Montana retained its single at-large seat after the 2010 census, again narrowly missing a second seat",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Republican",
                "notes": "Montana regained a second congressional seat after the 2020 census — its first two-district map since the 1992 reapportionment. Governor Gianforte (R) and a Republican supermajority legislature drew the new 2-district map. Republicans drew the Eastern 2nd District as a safe rural Republican seat and the Western 1st District (Missoula/Helena corridor) as a competitive lean-Republican seat.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "ND": {
        "name": "North Dakota",
        "fips": "38",
        "crs": "EPSG:32614",   # UTM Zone 14N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "North Dakota has elected one at-large representative since losing its second seat after the 1970 census. With a single district coterminous with the state, congressional redistricting is not applicable.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
        },
    },
    "NE": {
        "name": "Nebraska",
        "fips": "31",
        "crs": "EPSG:32614",   # UTM Zone 14N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 3,
                "redistricting_controller": "Republican",
                "notes": "Nebraska's unicameral, officially nonpartisan legislature drew maps; Nebraska retained 3 seats after the 1990 census. The legislature leans conservative/Republican in practice. Nebraska and Maine are the only states that allocate Electoral College votes by congressional district.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 3,
                "redistricting_controller": "Republican",
                "notes": "Nebraska's unicameral legislature drew maps; Nebraska retained 3 seats after the 2000 census. Governor Johanns (R) worked with the Republican-leaning legislature to draw maps producing a 3-0 Republican delegation.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 3,
                "redistricting_controller": "Republican",
                "notes": "Nebraska's unicameral legislature drew maps; Nebraska retained 3 seats after the 2010 census. Republicans drew maps maintaining a 3-0 delegation. The 2nd District (Omaha) notably awarded its Electoral College vote to Obama in both 2008 and 2012, making it a target for Republican map-drawers.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 3,
                "redistricting_controller": "Republican",
                "notes": "Nebraska's unicameral legislature drew maps; Nebraska retained 3 seats after the 2020 census. Republicans redrew the 2nd District (Omaha) to absorb more Republican-leaning suburban areas after it voted for Biden in 2020; the district nonetheless remained competitive.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 3,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "NH": {
        "name": "New Hampshire",
        "fips": "33",
        "crs": "EPSG:32619",   # UTM Zone 19N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 2,
                "redistricting_controller": "Republican",
                "notes": "Governor Gregg (R) and a Republican-controlled General Court drew maps; New Hampshire retained 2 seats after the 1990 census. New Hampshire's part-time citizen legislature (one of the largest in the world) drew relatively compact, county-based maps.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 2,
                "redistricting_controller": "Republican",
                "notes": "Governor Shaheen (D) and a Republican-controlled legislature drew maps; New Hampshire retained 2 seats after the 2000 census. The Republican legislature controlled the process.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 2,
                "redistricting_controller": "Split (Dem governor, Rep legislature)",
                "notes": "Governor Lynch (D) and a Republican-controlled General Court (which swept to a supermajority in 2010) drew maps; New Hampshire retained 2 seats after the 2010 census. The Republican legislature controlled the redistricting process.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Republican",
                "notes": "Governor Sununu (R) and a Republican-controlled General Court drew maps; New Hampshire retained 2 seats after the 2020 census. Republicans redrew the 1st District (Manchester/Portsmouth) to be more competitive, producing one safe Republican and one swing seat.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "NM": {
        "name": "New Mexico",
        "fips": "35",
        "crs": "EPSG:32613",   # UTM Zone 13N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 3,
                "redistricting_controller": "Democrat",
                "notes": "Governor King (D) and a Democratic legislature drew maps; New Mexico retained 3 seats after the 1990 census. Democrats drew maps producing a 2-1 Democratic delegation.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 3,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Johnson (R) and a Democratic legislature drew maps; New Mexico retained 3 seats after the 2000 census. Democrats controlled the legislature and drew maps that maintained a 2-1 Democratic advantage.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 3,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Martinez (R) and a Democratic legislature drew maps; New Mexico retained 3 seats after the 2010 census. Democrats drew maps maintaining 2 safe Democratic seats and 1 competitive Republican-leaning seat.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 3,
                "redistricting_controller": "Democrat",
                "notes": "Governor Lujan Grisham (D) and a Democratic legislature drew maps; New Mexico retained 3 seats after the 2020 census. Democrats drew an aggressive map targeting all 3 seats; Republicans challenged the maps in state court but they were ultimately upheld, producing a 3-0 Democratic delegation in 2022.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 3,
                "redistricting_controller": "Democrat",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "NV": {
        "name": "Nevada",
        "fips": "32",
        "crs": "EPSG:32611",   # UTM Zone 11N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Miller (D) and a Democratic-controlled legislature drew maps after Nevada gained 1 seat from the 1990 census (1→2). The new 2nd District covered rural Nevada while the 1st District covered Las Vegas.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 3,
                "redistricting_controller": "Split (Rep governor, split legislature)",
                "notes": "Governor Guinn (R) and a split legislature (Dem Senate, Rep Assembly) drew maps after Nevada gained 1 seat from the 2000 census (2→3) — one of the fastest-growing states in the nation. The new 3rd District covered suburban Las Vegas (Henderson/Summerlin).",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 4,
                "redistricting_controller": "Split (Rep governor, Dem legislature)",
                "notes": "Governor Sandoval (R) and a Democratic legislature drew maps after Nevada gained 1 seat from the 2010 census (3→4). Democrats drew maps creating a new 4th District (suburban Las Vegas/Henderson) as a competitive Democratic-leaning seat.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Democrat",
                "notes": "Governor Sisolak (D) and a Democratic legislature drew maps; Nevada retained 4 seats after the 2020 census. Democrats drew an aggressive map to protect all 3 of their seats; Republicans challenged the maps but courts upheld them. All 4 seats remained competitive in 2022.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Democrat",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "OK": {
        "name": "Oklahoma",
        "fips": "40",
        "crs": "EPSG:32614",   # UTM Zone 14N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 6,
                "redistricting_controller": "Democrat",
                "notes": "Governor Walters (D) and a Democratic legislature drew maps; Oklahoma retained 6 seats after the 1990 census. Democrats controlled both chambers and the governorship for the last time in this redistricting cycle.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 5,
                "redistricting_controller": "Split (Rep governor, split legislature)",
                "notes": "Governor Keating (R) and a split legislature (Dem Senate, Rep House) drew maps after Oklahoma lost 1 seat from the 2000 census (6→5). Despite competing interests, maps were enacted producing a 5-0 Republican delegation within a cycle.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 5,
                "redistricting_controller": "Republican",
                "notes": "Governor Fallin (R) and a Republican supermajority legislature drew maps; Oklahoma retained 5 seats after the 2010 census. Republicans drew maps maintaining a 5-0 Republican delegation.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 5,
                "redistricting_controller": "Republican",
                "notes": "Governor Stitt (R) and a Republican supermajority legislature drew maps; Oklahoma retained 5 seats after the 2020 census. Maps maintained a 5-0 Republican delegation.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 5,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "RI": {
        "name": "Rhode Island",
        "fips": "44",
        "crs": "EPSG:32619",   # UTM Zone 19N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Sundlun (D) and a Democratic legislature drew maps; Rhode Island retained 2 seats after the 1990 census. Rhode Island came close to losing a seat to reapportionment.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Almond (R) and a Democratic legislature drew maps; Rhode Island retained 2 seats after the 2000 census, again narrowly. Democrats controlled the General Assembly and drew the maps.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor Chafee (I, former Republican) and a Democratic legislature drew maps; Rhode Island retained 2 seats after the 2010 census. Democrats controlled both chambers of the General Assembly.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "Governor McKee (D) and a Democratic legislature drew maps; Rhode Island retained 2 seats after the 2020 census. Rhode Island uses a Reapportionment Commission; maps were relatively uncontested as Democrats held both seats.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Democrat",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "SD": {
        "name": "South Dakota",
        "fips": "46",
        "crs": "EPSG:32614",   # UTM Zone 14N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "South Dakota has elected one at-large representative since losing its second seat after the 1980 census. With a single district coterminous with the state, congressional redistricting is not applicable.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
        },
    },
    "UT": {
        "name": "Utah",
        "fips": "49",
        "crs": "EPSG:32612",   # UTM Zone 12N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 3,
                "redistricting_controller": "Republican",
                "notes": "Governor Leavitt (R) and a Republican legislature drew maps; Utah retained 3 seats after the 1990 census. The Republican legislature controlled the process in one of the nation's most Republican states.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 3,
                "redistricting_controller": "Republican",
                "notes": "Governor Leavitt (R) and a Republican legislature drew maps; Utah retained 3 seats after the 2000 census. Utah came extremely close to gaining a 4th seat — a dispute that led Congress to pass a bill adding a seat for Utah (which would have also added a Republican seat for a Republican state to offset it), though the bill died in the Senate.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "Governor Herbert (R) and a Republican legislature drew maps after Utah gained 1 seat from the 2010 census (3→4). Republicans drew maps that divided Salt Lake City four ways — splitting the city across all four congressional districts to prevent Utah's only significant urban Democratic base from electing a representative.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "Governor Cox (R) and a Republican legislature drew maps; Utah retained 4 seats after the 2020 census. Republicans maintained the Salt Lake City-splitting strategy from 2012. League of Women Voters v. Utah challenged the maps as an unconstitutional partisan gerrymander under the state constitution; courts upheld the maps.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 4,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "VT": {
        "name": "Vermont",
        "fips": "50",
        "crs": "EPSG:32618",   # UTM Zone 18N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "Vermont has elected one at-large representative throughout its modern history. With a single district coterminous with the state, congressional redistricting is not applicable. Vermont's at-large seat was held by Bernie Sanders (I) from 1991 onward.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
        },
    },
    "WV": {
        "name": "West Virginia",
        "fips": "54",
        "crs": "EPSG:32617",   # UTM Zone 17N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 4,
                "redistricting_controller": "Democrat",
                "notes": "Governor Caperton (D) and a Democratic legislature drew maps; West Virginia retained 4 seats after the 1990 census. West Virginia was still a reliably Democratic state at the federal level in the early 1990s.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 3,
                "redistricting_controller": "Democrat",
                "notes": "Governor Wise (D) and a Democratic legislature drew maps after West Virginia lost 1 seat from the 2000 census (4→3). Democrats still controlled both chambers of the Legislature; the state's shift toward Republicans was accelerating at the presidential level but had not yet reached state offices.",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 3,
                "redistricting_controller": "Democrat",
                "notes": "Governor Tomblin (D) and a Democratic legislature drew maps; West Virginia retained 3 seats after the 2010 census. Democrats still held both chambers of the Legislature for the 2011 redistricting, though Republicans swept the Legislature in the 2014 elections — ending over a century of Democratic legislative control.",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Republican",
                "notes": "Governor Justice (R, originally elected as a Democrat but switched parties in 2017) and a Republican supermajority legislature drew maps after West Virginia lost 1 seat from the 2020 census (3→2). The state has lost half its congressional delegation since 1990, reflecting decades of population decline. Republicans drew maps pitting two Democratic incumbents (Mooney and Miller) against each other.",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 2,
                "redistricting_controller": "Republican",
                "notes": "2024 election results shown with 118th Congress boundaries (same maps as 2022 — no redistricting between cycles). Demographics reflect the 2020 Census.",
            },
        },
    },
    "WY": {
        "name": "Wyoming",
        "fips": "56",
        "crs": "EPSG:32613",   # UTM Zone 13N (NAD83)
        "cycles": {
            1992: {
                "congress": 103,
                "shapefile_id": "us_cd103rd_1990_tl2000",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
                "notes": "Wyoming has elected one at-large representative throughout its modern history. With a single district coterminous with the state, congressional redistricting is not applicable.",
            },
            2002: {
                "congress": 108,
                "shapefile_id": "us_cd108th_2000_tl2010",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2012: {
                "congress": 113,
                "shapefile_id": "us_cd113th_2012_tl2012",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2022: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
            },
            2024: {
                "congress": 118,
                "shapefile_id": "us_cd118th_2022_tl2022",
                "seats": 1,
                "redistricting_controller": "At-large (no redistricting)",
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
NHGIS_API_VERSION = "2"

# Raw and processed data directories (relative to repo root)
RAW_DIR = "data/raw"
PROCESSED_DIR = "data/processed"
TILES_DIR = "web/static/tiles"


def get_state(state_po: str) -> dict[str, Any]:
    """Return state config for the given postal abbreviation (e.g. 'MI', 'NC')."""
    key = state_po.upper()
    if key not in STATES:
        raise ValueError(f"Unknown state '{state_po}'. Known states: {list(STATES)}")
    return STATES[key]
