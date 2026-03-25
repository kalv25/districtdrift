export type CycleEvent = {
  title: string;
  detail: string;
  url?: string;
};

// CYCLE_EVENTS[statePostal][cycleYear]
export const CYCLE_EVENTS: Record<string, Record<number, CycleEvent[]>> = {
  MI: {
    1992: [
      {
        title: 'Michigan loses 2 seats',
        detail: 'The 1990 census reduces Michigan\'s delegation from 18 to 16, forcing a full redraw of the congressional map.',
      },
      {
        title: 'Legislature deadlocks; court draws the maps',
        detail: 'With Democrats controlling the House and Republicans the Senate and governorship, the legislature cannot agree on a plan. A three-judge federal panel is convened under 28 U.S.C. § 2284.',
      },
      {
        title: '⚖ Good v. Austin — court-drawn map adopted',
        detail: 'Filed July 29, 1991 in the U.S. District Court for the Eastern District of Michigan. On March 23, 1992, the three-judge panel holds Michigan\'s existing districts unconstitutional, rejects both parties\' proposed plans, and draws its own map. No party appeals. The court-drawn map is used for all elections in the 1992 cycle.',
      },
    ],
    2002: [
      {
        title: 'Michigan loses 1 seat',
        detail: 'The 2000 census reduces the delegation from 16 to 15. Governor John Engler (R) is in his final year in office.',
      },
      {
        title: 'Republicans draw the maps (SB 546)',
        detail: 'With unified control of the legislature and governorship, Republicans pass SB 546. It is signed into law on September 19, 2001, and precleared by the DOJ on February 11, 2002.',
      },
      {
        title: '⚖ LeRoux v. Secretary of State — maps upheld',
        detail: 'Plaintiffs challenge SB 546 in the Michigan Supreme Court, arguing the bill was improperly altered after passage and that redistricting guidelines were violated. On March 25, 2002, the MSC upholds the plan unanimously, ruling the changes were technical corrections and the 1999 guidelines non-binding.',
      },
      {
        title: '⚖ O\'Lear v. Miller — partisan gerrymander claim dismissed',
        detail: 'Democratic voters file a federal suit in the Eastern District of Michigan arguing the congressional plan is an unconstitutional partisan gerrymander under Article I and the Equal Protection Clause. The court dismisses the case, holding that disproportionate partisan results alone do not constitute a constitutional violation.',
        url: 'https://law.justia.com/cases/federal/district-courts/FSupp2/222/850/2305410/',
      },
      {
        title: 'Efficiency gap reaches +15.6%',
        detail: 'The resulting maps produce a large efficiency gap favoring Republicans — Democrats win 40% of seats on 46% of the statewide congressional vote.',
      },
    ],
    2012: [
      {
        title: 'Michigan loses 1 more seat',
        detail: 'The 2010 census reduces the delegation from 15 to 14. Republicans hold the legislature and the governorship under Rick Snyder.',
      },
      {
        title: 'Republicans draw the maps (HB 4780)',
        detail: 'HB 4780 passes the Republican-controlled legislature on June 29, 2011 and is signed on August 9, 2011. Republicans win 9 of 14 seats in 2012 despite receiving fewer total votes than Democrats.',
      },
      {
        title: '⚖ NAACP v. Snyder — VRA challenge dismissed',
        detail: 'Filed December 8, 2011 by the Michigan NAACP, the UAW, and Latino community groups. The suit challenges congressional and state House maps as violating the Voting Rights Act — alleging Black incumbents were targeted for pairing and that the Latino community in southwest Detroit was cracked. A three-judge federal panel dismisses the case on April 6, 2012.',
      },
      {
        title: '⚖ LWV v. Benson — struck down, then vacated by SCOTUS',
        detail: 'Filed December 22, 2017 by the League of Women Voters and 11 Democratic voters. A federal three-judge panel rules on April 25, 2019 that 9 congressional and 25 legislative districts are unconstitutional partisan gerrymanders. However, congressional claims had already been dropped in a January 2019 settlement. SCOTUS issues a stay in May 2019, then vacates the ruling in October 2019 following Rucho v. Common Cause, which barred federal courts from adjudicating partisan gerrymandering claims. No congressional maps are redrawn.',
        url: 'https://www.brennancenter.org/our-work/court-cases/league-women-voters-michigan-v-benson',
      },
    ],
    2022: [
      {
        title: 'Voters approve Proposal 2 (2018)',
        detail: 'With 61.28% of the vote, Michigan voters approve a constitutional amendment creating an independent redistricting commission — taking the power to draw maps away from the legislature entirely.',
      },
      {
        title: 'Michigan loses 1 seat',
        detail: 'The 2020 census reduces the delegation from 14 to 13, continuing a decades-long decline driven by population growth in Sun Belt states.',
      },
      {
        title: 'MICRC draws the most balanced maps in 50 years',
        detail: 'The 13-member Michigan Independent Citizens Redistricting Commission (4 Democrats, 4 Republicans, 5 independents) finalizes maps in December 2021. PlanScore rates them as offering no significant advantage to either party.',
        url: 'https://planscore.org/',
      },
      {
        title: '⚖ Detroit Caucus v. MICRC — VRA challenge dismissed',
        detail: 'Plaintiffs challenge both congressional and legislative MICRC maps for diluting Black voting strength under Voting Rights Act § 2. The Michigan Supreme Court dismisses in a 4–3 decision on February 3, 2022. A parallel federal claim in the Eastern District of Michigan is also dismissed for lack of evidence.',
      },
      {
        title: '⚖ Banerian v. Benson — malapportionment claim dismissed',
        detail: 'Republican-aligned voters file suit in the Western District of Michigan on January 20, 2022, arguing the congressional plan violates the one person, one vote standard and the 14th Amendment. The district court denies a preliminary injunction on April 1, 2022 and upholds the map. Plaintiffs appeal directly to SCOTUS; the Supreme Court dismisses the appeal as moot on November 7, 2022 after the elections have already been held.',
        url: 'https://www.scotusblog.com/cases/case-files/banerian-v-benson/',
      },
      {
        title: 'Democrats win state Senate for first time since 1984',
        detail: 'The 2022 elections — the first held under MICRC maps — produce results far more proportional to the statewide vote, with Democrats winning the state House, Senate, and governorship simultaneously.',
      },
    ],
  },

  IL: {
    1992: [
      {
        title: 'Illinois loses 2 seats',
        detail: 'The 1990 census reduces Illinois\'s delegation from 22 to 20, reflecting population loss to Sun Belt states. Republican governor Jim Edgar and a Democratic-controlled General Assembly must negotiate a map.',
      },
      {
        title: 'Negotiated maps preserve incumbent seats',
        detail: 'With split control, the resulting maps are a classic incumbent-protection compromise. Both parties\' incumbents are drawn into safe seats, producing a delegation that changes little despite Illinois\'s shifting demographics.',
      },
      {
        title: 'Chicago\'s majority-Black districts anchor the Democratic side',
        detail: 'The 1st and 7th Districts on Chicago\'s South and West Sides are majority-Black districts anchored by decades of Black political representation. The 4th District — shaped like a pair of earmuffs connected by a thin strip along I-294 — is a majority-Hispanic district created to comply with VRA requirements.',
      },
    ],
    2002: [
      {
        title: 'Illinois loses 1 seat; legislature deadlocks',
        detail: 'The 2000 census reduces the delegation from 20 to 19. Republican governor George Ryan and a split legislature — Democratic Senate, Republican House — cannot agree on a congressional map.',
      },
      {
        title: '⚖ Hastert v. State Board of Elections — court draws the map',
        detail: 'With the legislature deadlocked, House Speaker Dennis Hastert (R) and other Republican members file suit seeking a court-drawn map favorable to Republicans. A three-judge federal panel draws its own congressional map in October 2001, attempting a neutral compromise. Democrats retain a slight edge, winning 10 of 19 seats in 2002.',
      },
      {
        title: 'Court-drawn map preserves Chicago\'s majority-minority seats',
        detail: 'The court\'s map retains the majority-Black 1st, 2nd, and 7th Districts on Chicago\'s South and West Sides, along with the majority-Hispanic 4th District, satisfying Voting Rights Act requirements. The court-drawn plan is widely viewed as more competitive than either party\'s proposed alternative.',
      },
      {
        title: 'Illinois delegation remains nearly even under neutral map',
        detail: 'The court-drawn map yields a 10-9 Democratic delegation in 2002 — a near-even split in a state with a genuine Democratic lean at the presidential level. The neutrality of the court-drawn map stands in sharp contrast to the aggressive Democratic gerrymander Illinois would enact the following decade.',
      },
    ],
    2012: [
      {
        title: 'Illinois loses 1 seat; Democrats take full control',
        detail: 'The 2010 census reduces the delegation from 19 to 18. Despite a strong Republican year nationally, Democrats retain control of both chambers of the Illinois General Assembly, giving them unilateral redistricting power alongside Governor Pat Quinn (D).',
      },
      {
        title: 'Democrats draw a 12-6 map in a 55% Democratic state',
        detail: 'The Democratic-drawn map is widely cited as one of the most aggressive Democratic gerrymanders of the cycle, producing a 12-6 delegation on roughly 55% of the statewide vote. Republicans are packed into 6 districts in rural downstate Illinois and the collar counties around Chicago.',
      },
      {
        title: 'The "Earmuffs" 4th District survives — then grows stranger',
        detail: 'The majority-Hispanic 4th District, which connects two Hispanic communities on Chicago\'s North and South Sides via a narrow strip along the highway, is retained and modified. It becomes a recurring example cited in debates over whether VRA compliance and partisan gerrymanding can be intertwined.',
      },
    ],
    2022: [
      {
        title: 'Illinois loses 1 seat; Democrats draw another aggressive map',
        detail: 'The 2020 census reduces the delegation from 18 to 17. Governor J.B. Pritzker (D) and a Democratic legislature pass new congressional maps designed to deliver 14 of 17 seats — a near-maximal gerrymander in a state trending toward Democrats but not by that margin.',
      },
      {
        title: 'Final maps scaled back but still heavily Democratic',
        detail: 'After early drafts drawing 14 safe Democratic seats draw criticism, the legislature passes slightly revised maps. Analysts estimate the maps would produce 13-14 Democratic seats. In 2022, Democrats win 14 of 17 seats.',
      },
      {
        title: '⚖ Illinois State Conference of NAACP v. Illinois State Board of Elections',
        detail: 'Civil rights groups challenge the Democratic maps as diluting Black and Hispanic voting power — arguing that in combining minority communities with white liberal neighborhoods to create \"coalition districts,\" the maps actually reduce minority political control. The case highlights tensions between maximizing minority representation and partisan advantage within the same party\'s coalition.',
      },
    ],
  },

  FL: {
    1992: [
      {
        title: 'Florida gains 4 seats — fastest-growing state',
        detail: 'The 1990 census reflects Florida\'s explosive population growth, expanding the delegation from 19 to 23. Governor Lawton Chiles (D) and a Democratic legislature draw the new map, creating new majority-minority districts under the Voting Rights Act.',
      },
      {
        title: 'New majority-minority districts elected first Black and Hispanic members',
        detail: 'The 1992 map creates the majority-Black 3rd District (the "Z District," stretching from Jacksonville to Gainesville to Orlando) and expands Hispanic representation in South Florida. Corrine Brown and Alcee Hastings win majority-Black seats; the newly drawn 21st and 18th Districts send Hispanic members from Miami-Dade.',
      },
      {
        title: '⚖ Shaw v. Reno fallout — 3rd District challenged',
        detail: 'Following the Supreme Court\'s ruling in Shaw v. Reno (1993), the oddly shaped majority-Black 3rd District is challenged as a racial gerrymander. Courts ultimately uphold it after several rounds of litigation, but the district\'s boundaries are modified in subsequent cycles.',
      },
    ],
    2002: [
      {
        title: 'Florida gains 2 seats; Republicans take full control',
        detail: 'The 2000 census gives Florida 25 seats. Governor Jeb Bush (R) and a Republican-controlled legislature have unified control of redistricting for the first time in modern Florida history.',
      },
      {
        title: 'Republicans draw an 18-7 map',
        detail: 'The Republican-drawn map produces an 18-7 Republican delegation in a state where presidential elections are decided by hundreds of votes. Democrats are packed into a handful of urban and majority-minority districts while Republicans are spread efficiently across the rest of the state.',
      },
      {
        title: 'Minority districts preserved under VRA — but boundaries shift',
        detail: 'The Republican-drawn plan preserves majority-Black and majority-Hispanic districts in South Florida and Jacksonville to satisfy the Voting Rights Act, giving it insulation from certain legal challenges. However, the boundaries of surrounding districts are drawn to maximize Republican performance, producing a map where competitive seats are systematically tilted Republican.',
      },
    ],
    2012: [
      {
        title: 'Florida gains 2 seats; voters pass the Fair Districts Amendment',
        detail: 'The 2000 census gives Florida 27 seats. In 2010, Florida voters pass Amendment 6 — the Fair Districts Amendment — by 63%, prohibiting the legislature from drawing maps that favor a political party or incumbent. It is the strongest anti-gerrymandering provision in any state constitution at the time.',
      },
      {
        title: 'Republicans draw maps in secret, violating the amendment',
        detail: 'Despite the Fair Districts Amendment, Republican operatives secretly draft congressional maps under the direction of party consultants, feeding them to legislators as if they were drawn independently. Internal emails later revealed in litigation show the maps were designed to protect Republican incumbents and maximize Republican seats.',
      },
      {
        title: '⚖ League of Women Voters v. Detzner — maps struck',
        detail: 'The League of Women Voters and other plaintiffs sue under the Fair Districts Amendment. The Florida Supreme Court rules unanimously in July 2015 that eight congressional districts were drawn in violation of the amendment — finding that the legislature was "tainted by unconstitutional intent." The court orders a remedial map, which takes effect for the 2016 elections.',
        url: 'https://redistrictingdatahub.org/state/florida/',
      },
    ],
    2022: [
      {
        title: 'Florida gains 1 seat; DeSantis rejects legislature\'s map',
        detail: 'The 2020 census gives Florida 28 seats. In an unprecedented move, Governor Ron DeSantis (R) rejects the map passed by the Republican-controlled legislature — which had attempted to preserve the majority-Black 5th District — and submits his own congressional map.',
      },
      {
        title: 'DeSantis map eliminates the majority-Black I-10 corridor district',
        detail: 'The DeSantis map dismantles the majority-Black 5th District, which had stretched along the I-10 corridor connecting Black communities in Jacksonville and Tallahassee. Under the new map, no district in that region has a Black voting-age majority. Republicans gain 2 additional seats, moving from a 16-11 delegation to an expected 20-8 advantage.',
      },
      {
        title: '⚖ Black Voters Matter v. Byrd — VRA challenge reversed on appeal',
        detail: 'A coalition of civil rights groups challenges the elimination of the majority-Black district as a violation of VRA Section 2. A federal district court strikes the map in May 2022, finding it likely dilutes Black voting power. However, the 11th Circuit Court of Appeals reverses in September 2022, ruling that the VRA does not require the creation of majority-minority districts under these circumstances. The DeSantis maps are used for the 2022 elections.',
      },
    ],
  },

  VA: {
    1992: [
      {
        title: 'Virginia redraws under the VRA',
        detail: 'Virginia retains 11 seats after the 1990 census. Governor Douglas Wilder — the first Black governor elected in any U.S. state since Reconstruction — and the Democratic legislature draw the map. The Voting Rights Act requires creation of a majority-Black congressional district.',
      },
      {
        title: '3rd District created — first Black Virginian elected to Congress since 1891',
        detail: 'The new majority-Black 3rd District stretches from Richmond to Norfolk. Robert Scott wins in 1992, becoming the first Black Virginian elected to Congress in over a century. The oddly shaped district soon draws legal scrutiny.',
      },
      {
        title: '⚖ Moon v. Meadows — 3rd District challenged',
        detail: 'White voters challenge the majority-Black 3rd District as an unconstitutional racial gerrymander following Shaw v. Reno (1993). A three-judge district court upholds the district in 1996, distinguishing Virginia\'s plan from the struck-down North Carolina maps on the grounds that race was not the sole or predominant factor.',
      },
    ],
    2002: [
      {
        title: 'Split government produces negotiated maps',
        detail: 'Virginia retains 11 seats after the 2000 census. Republican governor Jim Gilmore and a divided General Assembly — Republican House of Delegates, Democratic Senate — must negotiate. The result is an incumbency-protection map that changes little from the prior decade.',
      },
      {
        title: 'Republicans gain House seats as Virginia shifts right',
        detail: 'Despite maps drawn under split control, Republicans benefit from broader political trends in Virginia, winning 8 of 11 seats by 2004 as the state swings toward Republicans in congressional races throughout the decade.',
      },
      {
        title: 'Northern Virginia\'s rapid growth begins transforming the state\'s partisan geography',
        detail: 'The 2000 census captures the beginning of Northern Virginia\'s explosive growth driven by the federal contracting and tech economy. Fairfax County alone grows by nearly 150,000 people in the decade. The congressional maps drawn in 2001 do not yet capture this Democratic shift — suburban Northern Virginia seats remain Republican-leaning but begin trending Democratic throughout the cycle.',
      },
    ],
    2012: [
      {
        title: 'Republicans draw maps under unified control',
        detail: 'Governor Bob McDonnell (R) and a Republican-controlled House of Delegates draw the congressional map after the 2010 census. Virginia retains 11 seats. Republicans pack the majority-Black 3rd District with even more Black voters, freeing adjacent districts to lean Republican.',
      },
      {
        title: '⚖ Wittman v. Personhuballah — racial packing in 3rd District',
        detail: 'Plaintiffs challenge the Republican-drawn congressional map, arguing the 3rd District was racially packed — using race as the predominant factor to concentrate Black voters and dilute their influence in surrounding districts. The Supreme Court dismisses the case on standing grounds in 2016, but a district court subsequently orders remedial maps. New maps used from 2016 onward reduce the Black voting-age population in the 3rd District and make several adjacent seats more competitive.',
        url: 'https://www.oyez.org/cases/2015/14-1504',
      },
    ],
    2022: [
      {
        title: 'Voters approve bipartisan redistricting commission',
        detail: 'Virginia voters approve Amendment 1 in November 2020, creating the Virginia Redistricting Commission — 8 legislators (4 from each party) and 8 citizen members (4 from each party). It is the first time redistricting power has been taken from the legislature since Virginia became a state.',
      },
      {
        title: 'Commission deadlocks; Virginia Supreme Court takes over',
        detail: 'The newly created commission fails to agree on any congressional map, splitting 8–8 along party lines. Under the amendment\'s terms, the Virginia Supreme Court takes jurisdiction and appoints two special masters to draw maps independently.',
      },
      {
        title: '⚖ Virginia Supreme Court draws the maps',
        detail: 'Using the special masters\' proposals, the Virginia Supreme Court adopts a congressional map in December 2021. The court-drawn maps are widely viewed as among the most competitive in the state\'s history — Virginia elects a 6–5 Democratic delegation in 2022 in a state with a nearly even partisan split.',
      },
    ],
  },

  OH: {
    1992: [
      {
        title: 'Ohio loses 2 seats',
        detail: 'The 1990 census reduces Ohio\'s delegation from 21 to 19, reflecting decades of population loss as manufacturing jobs leave the Rust Belt. Republican governor George Voinovich and a divided legislature — Democratic House, Republican Senate — must negotiate a new map.',
      },
      {
        title: 'Negotiated maps produce a competitive delegation',
        detail: 'With neither party holding full control, the resulting maps are a compromise. Democrats hold 11 of 19 seats after the 1992 elections, roughly tracking the statewide vote in a year that favored Democrats nationally.',
      },
      {
        title: 'Majority-Black 11th District anchors Cleveland\'s representation',
        detail: 'The 11th District covering Cleveland\'s East Side is drawn as a majority-Black district, electing Louis Stokes — who had served since 1969. The district anchors Black political representation in northeastern Ohio for the full cycle. Cleveland and Columbus anchor the two major Democratic urban clusters; Cincinnati is less reliably Democratic.',
      },
    ],
    2002: [
      {
        title: 'Ohio loses 1 seat',
        detail: 'The 2000 census reduces the delegation from 19 to 18. Governor Bob Taft (R) and a Republican-controlled legislature have unilateral control over redistricting for the first time in decades.',
      },
      {
        title: 'Republicans draw an incumbency-protection map',
        detail: 'The Republican-drawn map is designed to lock in a safe majority. Republicans win 12 of 18 seats in 2002, a 2-to-1 advantage in a state where presidential elections are decided by a few points.',
      },
      {
        title: 'Democrats packed into just 6 districts; suburban cracking weakens swing seats',
        detail: 'The Republican maps concentrate Democrats into 6 heavily urban districts (Cleveland, Columbus, Dayton, Cincinnati, Akron, Toledo) and crack the suburbs across multiple Republican-leaning districts. The design holds up for the full decade — Republicans retain a 12-6 or 11-7 edge even in strong Democratic years like 2006 and 2008.',
      },
    ],
    2012: [
      {
        title: 'Ohio loses 2 more seats',
        detail: 'The 2010 census reduces the delegation from 18 to 16 — Ohio has lost 6 congressional seats since 1990. Republicans sweep the 2010 elections, winning the governorship (John Kasich) and supermajorities in the legislature, giving them unilateral redistricting control.',
      },
      {
        title: '12-4 Republican delegation in a 50/50 state',
        detail: 'The Republican-drawn map produces one of the most lopsided delegations relative to the statewide vote in the country. In 2012, Obama carries Ohio by 3 points while Republicans win 12 of 16 congressional seats. The map concentrates Democratic voters into 4 districts while spreading Republican voters efficiently across 12.',
      },
      {
        title: '⚖ Ohio A. Philip Randolph Institute v. Husted — challenge dismissed',
        detail: 'Plaintiffs challenge the congressional map as an unconstitutional partisan gerrymander. The case is ultimately dismissed following the Supreme Court\'s ruling in Rucho v. Common Cause (2019), which held that federal courts cannot review partisan gerrymandering claims.',
      },
    ],
    2022: [
      {
        title: 'Voters approve redistricting reform — twice',
        detail: 'Ohio voters pass Issue 1 (2015) and Issue 2 (2018), creating the Ohio Redistricting Commission to draw both legislative and congressional maps. The commission includes the governor, auditor, secretary of state, and four legislative leaders — giving Republicans a majority given their dominance of statewide offices.',
      },
      {
        title: 'Ohio loses 1 seat',
        detail: 'The 2020 census reduces the delegation from 16 to 15, continuing Ohio\'s long decline. The Republican-majority Redistricting Commission draws a map designed to produce an 11-4 Republican delegation.',
      },
      {
        title: '⚖ League of Women Voters v. Ohio Redistricting Commission — maps struck twice',
        detail: 'The Ohio Supreme Court strikes the congressional map as an unconstitutional partisan gerrymander under the Ohio Constitution in January 2022, then strikes the remedial map again in July 2022. The commission repeatedly passes maps that the court rejects. After the court misses its own deadlines amid political standoff, the unconstitutional maps are nonetheless used for the November 2022 elections — a striking breakdown of judicial enforcement.',
        url: 'https://www.aclu.org/cases/league-of-women-voters-of-ohio-v-ohio-redistricting-commission',
      },
    ],
  },

  TX: {
    1992: [
      {
        title: 'Texas gains 3 seats',
        detail: 'The 1990 census reflects Texas\'s rapid population growth, expanding the delegation from 27 to 30. Governor Ann Richards (D) and the Democratic-controlled legislature draw the new map.',
      },
      {
        title: 'VRA forces majority-minority districts',
        detail: 'Under the Voting Rights Act, the Justice Department requires Texas to create majority-Black and majority-Hispanic districts. The 1992 map includes new minority-opportunity seats — the 18th (Houston, majority-Black) and the 29th (Houston, majority-Hispanic) — contributing to the first Black and Hispanic members from those areas in decades.',
      },
      {
        title: '⚖ Vera v. Richards — racial gerrymander claims',
        detail: 'White voters challenge several oddly shaped districts as unconstitutional racial gerrymanders. The Supreme Court rules in Bush v. Vera (1996) that three Texas districts (18th, 29th, 30th) were drawn with race as the predominant factor and must be redrawn. Texas redraws those districts, but the maps survive the decade in modified form.',
        url: 'https://www.oyez.org/cases/1995/94-805',
      },
    ],
    2002: [
      {
        title: 'Texas gains 2 seats',
        detail: 'The 2000 census gives Texas 32 seats. Rick Perry (R) became governor when George W. Bush left for the presidency in January 2001. The Texas House remained Democratic; the Senate was Republican.',
      },
      {
        title: '⚖ Balderas v. Texas — court draws the map',
        detail: 'The divided legislature fails to agree on a plan before the deadline. A three-judge federal panel draws its own congressional map in November 2001 — a court-imposed compromise used for the 2002 elections. Democrats hold 17 of 32 seats.',
      },
      {
        title: 'DeLay\'s mid-decade redistricting — unprecedented',
        detail: 'After Republicans win control of the Texas House in 2002, U.S. House Majority Leader Tom DeLay orchestrates a mid-decade congressional redistricting in 2003 — the first since the 19th century. The new map, designed to maximize Republican seats, takes effect in 2004. Republicans gain 5 seats, producing a 21–11 delegation.',
      },
      {
        title: '⚖ LULAC v. Perry — mid-decade redraw reaches SCOTUS',
        detail: 'Plaintiffs challenge DeLay\'s 2003 redistricting as an unconstitutional partisan gerrymander and a VRA violation. In League of United Latin American Citizens v. Perry (2006), the Supreme Court rules 5–4 that mid-decade redistricting is not inherently unconstitutional, but strikes District 23 as a VRA violation for diluting Hispanic voting strength. The 2002 election data shown here reflects the original court-drawn map, not the DeLay redraw.',
        url: 'https://www.oyez.org/cases/2005/05-204',
      },
    ],
    2012: [
      {
        title: 'Texas gains 4 seats — largest gain in the country',
        detail: 'The 2010 census gives Texas 36 seats, the biggest gain of any state. Population growth is driven heavily by Hispanic and Black residents, but Republicans control redistricting under Governor Perry.',
      },
      {
        title: 'Republicans draw maps over DOJ objections',
        detail: 'The Republican legislature passes maps in June 2011. The DOJ objects under VRA Section 5, arguing the maps dilute minority voting strength despite minority communities driving all of Texas\'s population growth.',
      },
      {
        title: '⚖ Texas v. United States — preclearance denied',
        detail: 'Texas sues in the D.C. District Court for VRA Section 5 preclearance. In August 2012, the court denies preclearance, finding the maps likely dilute minority representation — the first time a state\'s congressional map had been rejected since the preclearance regime began.',
        url: 'https://www.justice.gov/crt/redistricting-0',
      },
      {
        title: '⚖ Perry v. Perez — SCOTUS orders interim maps',
        detail: 'While preclearance litigation continues, the Supreme Court rules unanimously in January 2012 that lower courts must draw interim maps for imminent elections. A court-modified map is used for 2012 elections. After Shelby County v. Holder (2013) struck down the VRA preclearance formula, the legislature\'s original maps — with minor court modifications — are restored for 2014 onward.',
        url: 'https://www.oyez.org/cases/2011/11-713',
      },
    ],
    2022: [
      {
        title: 'Texas gains 2 seats',
        detail: 'The 2020 census gives Texas 38 seats. Hispanic residents accounted for more than half of Texas\'s population growth in the decade — but Republicans, who control all statewide offices and both legislative chambers, draw the new map.',
      },
      {
        title: 'Republican maps crack growing minority communities',
        detail: 'The legislature passes maps in October 2021 that increase the number of safe Republican districts from 22 to 25, adding 2 new Republican-leaning seats from the 2 gained from reapportionment. Analysts find the maps significantly underrepresent Hispanic and Black voters relative to their population growth.',
      },
      {
        title: '⚖ Brooks v. Abbott — VRA Section 2 challenge ongoing',
        detail: 'A coalition of plaintiffs challenges the 2021 maps as a violation of VRA Section 2 for diluting minority voting strength. The case is consolidated with related suits and works through the federal courts. Unlike the 2012 cycle, there is no Section 5 preclearance requirement since Shelby County v. Holder eliminated it in 2013.',
      },
    ],
  },

  PA: {
    1992: [
      {
        title: 'Pennsylvania loses 2 seats',
        detail: 'The 1990 census reduces Pennsylvania\'s delegation from 23 to 21, reflecting decades of population loss to Sun Belt states. Democratic governor Bob Casey and a Republican-controlled legislature must negotiate a new map.',
      },
      {
        title: 'Negotiated maps produce proportional results',
        detail: 'With split control, neither party can impose its preferred map. The resulting compromise produces a delegation that roughly tracks the statewide vote — an unusual outcome for Pennsylvania redistricting.',
      },
      {
        title: 'Philadelphia and Pittsburgh anchor the Democratic base',
        detail: 'The 1992 map anchors Democratic representation in Philadelphia (1st and 2nd Districts) and Pittsburgh (14th District). Suburban Philadelphia districts are drawn as competitive swing seats. Democrats win 11 of 21 seats in 1992 — roughly proportional to the state\'s partisan balance in a presidential year that favored Clinton.',
      },
    ],
    2002: [
      {
        title: 'Pennsylvania loses 2 more seats',
        detail: 'The 2000 census reduces the delegation from 21 to 19. Governor Tom Ridge leaves to become the first Secretary of Homeland Security; Republican Mark Schweiker takes over and signs the Republican legislature\'s redistricting plan.',
      },
      {
        title: 'Republicans draw an aggressive map',
        detail: 'The Republican-drawn map concentrates Democratic voters in a handful of districts and gives Republicans an outsized advantage. Republicans win 12 of 19 seats in 2002 despite Pennsylvania being a closely contested presidential state.',
      },
      {
        title: '⚖ Vieth v. Jubelirer — partisan gerrymandering not justiciable',
        detail: 'Democratic voters challenge the 2001 congressional map as an unconstitutional partisan gerrymander. In a fractured 5–4 decision in 2004, the U.S. Supreme Court rules that partisan gerrymandering claims present a political question beyond federal court review — though Justice Kennedy\'s concurrence leaves open the possibility of a future manageable standard. The ruling stands until Rucho v. Common Cause (2019) closes the door definitively.',
        url: 'https://www.oyez.org/cases/2003/02-1580',
      },
    ],
    2012: [
      {
        title: 'Pennsylvania loses 1 seat',
        detail: 'The 2010 census reduces the delegation from 19 to 18. Republicans sweep the 2010 midterms, winning the governorship (Tom Corbett) and large majorities in both legislative chambers — giving them unilateral control of redistricting.',
      },
      {
        title: 'The "Goofy Kicking Donald Duck" — most contorted district in the country',
        detail: 'The Republican-drawn 7th District winds through five counties in suburban Philadelphia with tentacles as narrow as a single block, cracking Democratic communities across multiple districts. The shape — nicknamed after the cartoon characters it resembled — became a national symbol of extreme partisan cartography. Republicans win 13 of 18 seats despite a near-even statewide vote.',
      },
      {
        title: '⚖ League of Women Voters v. Commonwealth — PA Supreme Court strikes maps',
        detail: 'Filed under the Pennsylvania Constitution\'s free and equal elections clause rather than the federal constitution (sidestepping Vieth v. Jubelirer), the case reaches the PA Supreme Court. In January 2018, the court strikes the 2011 congressional map 5–2 as an unconstitutional partisan gerrymander — a landmark state-court ruling. When the Republican legislature fails to produce an acceptable remedial plan, the court draws its own map, used from the 2018 elections onward.',
        url: 'https://www.pubintlaw.org/cases-and-projects/league-of-women-voters-of-pa-v-commonwealth-of-pa/',
      },
    ],
    2022: [
      {
        title: 'Pennsylvania loses 1 seat',
        detail: 'The 2020 census reduces the delegation from 18 to 17. Democratic governor Tom Wolf faces a Republican-controlled legislature, setting up another redistricting clash.',
      },
      {
        title: 'Wolf vetoes Republican maps; second straight court intervention',
        detail: 'The Republican legislature passes a congressional map in January 2022 designed to produce a 11-6 Republican delegation. Wolf vetoes it. Pennsylvania faces its second consecutive decade of court-drawn congressional maps.',
      },
      {
        title: '⚖ Carter v. Chapman — PA Supreme Court draws new map',
        detail: 'The PA Supreme Court takes jurisdiction and, after receiving competing map submissions, adopts a remedial congressional plan on February 23, 2022. The court-drawn map produces a competitive 9-8 Republican advantage in 2022 — far more proportional than what the Republican legislature proposed.',
        url: 'https://www.pacourts.us/news-and-statistics/cases-of-public-interest/carter-v-chapman',
      },
    ],
  },

  MD: {
    1992: [
      {
        title: 'Democrats draw incumbent-protection maps',
        detail: 'Governor William Schaefer (D) and the Democratic-controlled legislature redraw Maryland\'s 8 congressional districts after the 1990 census. Despite Democratic map control, 1992 proves competitive: Republicans win 4 of 8 seats on the strength of suburban gains, including a new open seat.',
      },
      {
        title: 'Maryland\'s only Republican district survives — for now',
        detail: 'The 6th District in western Maryland remains Republican-leaning, anchored by rural conservative counties. Republican Roscoe Bartlett wins the seat in 1992 and holds it for ten consecutive terms through 2012.',
      },
      {
        title: 'Baltimore\'s majority-Black districts anchor the Democratic base',
        detail: 'The 2nd, 4th, and 7th Districts in and around Baltimore are drawn to include large African American populations, electing Kweisi Mfume (MD-7, Baltimore City) and other Black Democrats. Mfume leaves in 1996 to lead the NAACP; Elijah Cummings wins the seat and holds it until his death in 2019.',
      },
    ],
    2002: [
      {
        title: 'Democrats maintain 7-1 grip',
        detail: 'Governor Parris Glendening (D) and the Democratic legislature redraw the map after the 2000 census. Maryland\'s seat count stays at 8. The maps preserve the 7-1 Democratic advantage with minimal changes from the prior decade.',
      },
      {
        title: 'Democrats concentrate Republican voters in the 6th and 1st Districts',
        detail: 'The Democratic-drawn maps pack Republican-leaning voters into the already-Republican 6th District (western Maryland) and the 1st District (Eastern Shore) — limiting the GOP to two seats and making every other district safely Democratic. The 8th District (Montgomery County suburbs of Washington) trends strongly Democratic as the DC suburb population grows.',
      },
      {
        title: 'Maryland becomes a textbook case of partisan map control without federal VRA conflict',
        detail: 'Unlike many Southern states where VRA preclearance complicates redistricting, Maryland faces no preclearance requirement. Democrats draw maps entirely on partisan and incumbency grounds, producing a 7-1 delegation that outperforms the state\'s partisan composition — Democrats typically win around 60% of the statewide congressional vote but hold 87.5% of seats.',
      },
    ],
    2012: [
      {
        title: 'O\'Malley targets the only Republican district',
        detail: 'Governor Martin O\'Malley (D) convenes a special session to redraw the 6th District — the state\'s lone Republican-held seat. The new map strips out rural conservative counties in western Maryland and adds heavily Democratic Montgomery County suburbs, transforming a district Roscoe Bartlett had won by 28 points into one Democrats would carry by 21. Bartlett loses his seat in 2012.',
      },
      {
        title: 'Efficiency gap reaches double digits — favoring Democrats',
        detail: 'The 2012 maps produce a 7-1 Democratic delegation on a statewide vote that was far closer. Maryland becomes a textbook example of Democratic gerrymandering alongside Republican gerrymanders in Wisconsin and North Carolina.',
      },
      {
        title: '⚖ Benisek v. Lamone — partisan gerrymander claim dismissed',
        detail: 'Republican voters in the 6th District challenge the O\'Malley redistricting as an unconstitutional partisan gerrymander under the First Amendment. The case works through the courts for nearly a decade. After Rucho v. Common Cause (2019) bars federal courts from adjudicating partisan gerrymandering claims, the case is ultimately dismissed on those grounds in 2020.',
        url: 'https://www.oyez.org/cases/2018/18-726',
      },
    ],
    2022: [
      {
        title: 'Legislature overrides Republican governor\'s veto',
        detail: 'Republican Governor Larry Hogan vetoes the Democratic legislature\'s congressional maps, calling them "the most extreme partisan gerrymander in the nation." The Democratic supermajority immediately overrides the veto. The maps are designed to flip the 6th District back to deep-blue and pack Republicans into a single district.',
      },
      {
        title: '⚖ Szeliga v. Lamone — maps struck as unconstitutional',
        detail: 'A group of Republican plaintiffs challenge the maps in Anne Arundel County Circuit Court under the Maryland Constitution. In March 2022, Judge Lynne Battaglia strikes the congressional map as an unconstitutional partisan gerrymander — the first time a Maryland court had done so. The legislature is ordered to draw remedial maps.',
      },
      {
        title: 'Remedial maps drawn; 6th District becomes competitive',
        detail: 'The legislature passes revised maps in April 2022. The remedial 6th District, while still more Democratic than the pre-2012 version, becomes significantly more competitive. Democrats win the seat in 2022 but by a narrower margin.',
      },
    ],
  },

  WI: {
    1992: [
      {
        title: 'Wisconsin loses 1 seat',
        detail: 'The 1990 census reduces Wisconsin\'s congressional delegation from 10 to 9. Governor Tommy Thompson (R) faces a divided legislature with Democrats controlling the Assembly.',
      },
      {
        title: 'Legislature deadlocks; federal court draws maps',
        detail: 'The Republican-controlled Senate and Democratic-controlled Assembly cannot agree on a redistricting plan. A three-judge federal panel is convened to draw the congressional map.',
      },
      {
        title: '⚖ Prosser v. Elections Board — court-drawn map adopted',
        detail: 'Filed in the Western District of Wisconsin in 1991. In March 1992, the three-judge panel rejects the competing legislative proposals and adopts its own remedial congressional map. The court-drawn boundaries govern Wisconsin elections for the entire decade.',
      },
    ],
    2002: [
      {
        title: 'Wisconsin loses 1 more seat',
        detail: 'The 2000 census reduces the delegation from 9 to 8. Governor Tommy Thompson has left to become U.S. Secretary of HHS; Republican Scott McCallum becomes governor with a Republican-controlled legislature.',
      },
      {
        title: 'Republicans draw the maps',
        detail: 'With unified Republican control of government, the legislature passes congressional and state maps in 2001. Democrats challenge the plan in federal court but fail to block it.',
      },
      {
        title: '⚖ Baumgart v. Wendelberger — maps upheld',
        detail: 'Plaintiffs challenge the Republican-drawn congressional map in the Western District of Wisconsin as a partisan gerrymander and VRA violation. The three-judge panel upholds the plan, finding no constitutional or statutory violation.',
      },
    ],
    2012: [
      {
        title: 'Republicans redraw all maps after 2010 sweep',
        detail: 'Scott Walker wins the governorship and Republicans win supermajorities in both chambers of the legislature in 2010, giving them unified control for redistricting after the 2010 census. The congressional seat count stays at 8.',
      },
      {
        title: 'Act 43 — secretly drafted partisan maps',
        detail: 'Legislative maps (Act 43) are drafted in secret by a private law firm, with Republican legislators signing confidentiality agreements before viewing them. Congressional maps follow similar lines. Republicans win 5 of 8 seats in 2012 despite a near-even statewide vote.',
      },
      {
        title: '⚖ Gill v. Whitford — partisan gerrymandering reaches SCOTUS',
        detail: 'Democratic voters file suit in 2015 challenging Wisconsin\'s state legislative maps as an unconstitutional partisan gerrymander using the efficiency gap metric. A three-judge district court rules in plaintiffs\' favor in 2016. The U.S. Supreme Court takes up the case but in June 2018 remands 5–4 on standing grounds, finding plaintiffs must demonstrate district-specific harm. The case returns to the district court without a ruling on the merits.',
        url: 'https://www.oyez.org/cases/2017/16-1161',
      },
    ],
    2022: [
      {
        title: 'Split government — maps go to court again',
        detail: 'Governor Tony Evers (D) wins re-election in 2018 but faces a Republican legislature. After the 2020 census, the legislature passes new congressional maps that Evers vetoes. The Wisconsin Supreme Court must resolve the impasse.',
      },
      {
        title: '⚖ Johnson v. Wisconsin Elections Commission — "least change" maps',
        detail: 'The Wisconsin Supreme Court, in a 4–3 ruling, adopts a "least change" approach: modifying the existing districts only as much as required by population equality. This preserves the partisan structure of the 2011 Republican maps, effectively continuing the gerrymander into the decade. Republicans retain a 6–2 congressional advantage despite near-even statewide vote totals.',
        url: 'https://www.wicourts.gov/sc/opinion/DisplayDocument.pdf?content=html&seqNo=553492',
      },
      {
        title: '⚖ Clarke v. Wisconsin Elections Commission — maps redrawn',
        detail: 'After the Wisconsin Supreme Court\'s composition shifted to a 4–3 liberal majority following the April 2023 election of Justice Janet Protasiewicz, the court reopens redistricting. In December 2023, it strikes the 2022 legislative maps as unconstitutional gerrymanders and orders new ones — though the congressional boundaries remain unchanged for 2024.',
      },
    ],
  },

  GA: {
    1992: [
      {
        title: 'Democrats draw majority-Black districts under VRA pressure',
        detail: 'Governor Zell Miller (D) and a Democratic legislature draw maps after the 1990 census. The Voting Rights Act requires creation of majority-Black districts in Georgia for the first time, producing three majority-Black congressional districts — including the sprawling 11th District stretching from Atlanta\'s suburbs to Savannah. Georgia retains 11 seats.',
      },
      {
        title: 'The "serpentine" 11th District — a target from the start',
        detail: 'The 11th District winds through 26 counties connecting Black communities in metro Atlanta to Savannah, creating a majority-Black constituency. Critics call it one of the most oddly shaped districts in the country — a direct product of VRA pressure combined with Democratic incumbent protection.',
      },
      {
        title: '⚖ Miller v. Johnson (1995) — 11th District struck as unconstitutional racial gerrymander',
        detail: 'In a 5–4 ruling, the U.S. Supreme Court strikes down Georgia\'s 11th District, holding that race was the predominant factor in drawing the district and that such race-based line-drawing requires strict scrutiny — which Georgia could not satisfy. The state is required to redraw its maps; remedial maps are enacted in 1995 and again in 1997 under court supervision.',
        url: 'https://www.oyez.org/cases/1994/94-631',
      },
      {
        title: 'Remedial maps redrawn under court supervision',
        detail: 'Following Miller v. Johnson, Georgia redraws its congressional map twice in the mid-1990s, reducing the number of majority-Black districts from three to two. The litigation reshapes the delegation mid-decade and sets precedents applied across Southern states facing similar VRA compliance questions.',
      },
    ],
    2002: [
      {
        title: 'Georgia gains 2 seats after rapid population growth',
        detail: 'The 2000 census reflects Georgia\'s booming population, expanding the delegation from 11 to 13. Governor Roy Barnes (D) and a Democratic-controlled legislature draw the new map — the last time Democrats control Georgia redistricting for decades.',
      },
      {
        title: 'Democratic maps fail to hold back the Republican wave',
        detail: 'Despite controlling the redistricting process, Democrats design maps to protect incumbents and maximize Democratic seats. The strategy backfires: Republicans sweep to a 7–6 congressional majority in 2002 as the state rapidly shifts rightward, foreshadowing the Democratic collapse in Georgia state politics.',
      },
      {
        title: 'Republicans seize full control of state government by 2005',
        detail: 'The 2002 elections end Democratic dominance of the Georgia legislature. By 2005, Republicans hold the governorship (Sonny Perdue, first Republican governor since Reconstruction), both legislative chambers, and a congressional majority — completing one of the fastest partisan realignments in modern Southern history.',
      },
    ],
    2012: [
      {
        title: 'Georgia gains 1 seat; Republicans draw the maps',
        detail: 'The 2010 census gives Georgia 14 congressional seats. Governor Nathan Deal (R) and a Republican-controlled General Assembly have full control of redistricting for the first time. The resulting maps produce a 9–5 Republican delegation.',
      },
      {
        title: 'VRA Section 5 preclearance required',
        detail: 'As a covered jurisdiction under the Voting Rights Act, Georgia must obtain DOJ preclearance for any electoral changes. The Obama DOJ preclears the 2011 congressional maps, finding they do not reduce minority voting strength relative to the benchmark plan.',
      },
      {
        title: '⚖ Shelby County v. Holder (2013) — Section 5 gutted',
        detail: 'The U.S. Supreme Court strikes down the VRA\'s coverage formula in a 5–4 ruling, effectively ending Section 5 preclearance for Georgia and other Southern states. Future redistricting in Georgia will proceed without DOJ advance approval, shifting civil rights enforcement entirely to Section 2 litigation after the fact.',
        url: 'https://www.oyez.org/cases/2012/12-96',
      },
    ],
    2022: [
      {
        title: 'Republicans maintain 9-5 delegation in a purple state',
        detail: 'Governor Brian Kemp (R) and the Republican legislature draw maps maintaining a 9–5 Republican congressional delegation — despite Georgia being carried by Biden in 2020 and electing two Democratic U.S. Senators in January 2021 runoffs. Analysts find the maps pack Black voters in the Atlanta metro area into fewer districts, diluting their influence in surrounding seats.',
      },
      {
        title: '⚖ Pendergrass v. Raffensperger — VRA Section 2 challenge',
        detail: 'A coalition of civil rights organizations and voters challenge Georgia\'s congressional map as diluting Black voting strength in violation of VRA Section 2. The federal district court finds the maps likely violate Section 2 by packing Black voters and orders the legislature to draw remedial congressional and state legislative maps adding a second majority-Black congressional district.',
      },
      {
        title: 'Court orders remedial maps for 2024 elections',
        detail: 'Following the Pendergrass ruling, the Georgia legislature enacts new congressional maps creating an additional majority-Black district in the Atlanta suburbs. The remedial maps are used in the 2024 elections, shifting one seat toward Democrats and producing a 9–5 Republican delegation — unchanged in seat count despite the new district lines.',
      },
    ],
    2024: [
      {
        title: 'Lucy McBath wins redrawn CD-6 under Pendergrass remedial maps',
        detail: 'Under remedial maps enacted December 2023 (court-approved December 28) in Pendergrass v. Raffensperger (N.D. Ga.), CD-6 is redrawn as a majority-Black district anchored in Cobb, Douglas, Fayette, and Fulton counties west/southwest of Atlanta. Lucy McBath (D) wins the redrawn seat; the overall 9R-5D delegation is unchanged in total count.',
        url: 'https://redistricting.lls.edu/case/pendergrass-v-raffensperger/',
      },
      {
        title: 'CD-7 dismantlement challenged; 11th Circuit appeal pending',
        detail: 'The legislature\'s remedial maps dismantled the existing CD-7 (Gwinnett County), a coalition minority opportunity district east of Atlanta, arguing the two changes balanced each other. Plaintiffs contend that trading one majority-minority district for another is itself a VRA violation. The 11th Circuit Court of Appeals heard argument in early 2025; a ruling could affect Georgia\'s maps for 2026.',
      },
    ],
  },

  AZ: {
    1992: [
      {
        title: 'Arizona gains 1 congressional seat',
        detail: 'Arizona gained 1 congressional seat after the 1990 census, reaching 6 districts.',
      },
      {
        title: 'Republican-drawn maps favor GOP',
        detail: 'Governor Symington (R) and a Republican-controlled legislature drew maps favoring Republicans. Republicans won 5 of 6 seats in a state that leaned reliably Republican at the time.',
      },
    ],
    2002: [
      {
        title: 'Arizona gains 2 congressional seats',
        detail: 'Arizona gained 2 congressional seats after the 2000 census, reaching 8 districts.',
      },
      {
        title: 'Proposition 106 creates the AIRC',
        detail: 'Proposition 106 (2000), passed by voters, created the Arizona Independent Redistricting Commission — removing redistricting from legislative control. The AIRC drew its first congressional maps, with a bipartisan commission of 2 Democrats, 2 Republicans, and 1 independent chair.',
      },
      {
        title: 'AIRC produces more competitive districts',
        detail: 'Maps produced more competitive districts than the prior legislative-drawn maps.',
      },
    ],
    2012: [
      {
        title: 'Arizona gains 1 seat; legislature attacks AIRC',
        detail: 'Arizona gained 1 seat after the 2010 census, reaching 9 districts. Governor Brewer (R) and the Republican legislature attempted to remove AIRC chair Colleen Mathis — the AZ Supreme Court reinstated her.',
      },
      {
        title: '⚖ Arizona State Legislature v. Arizona Independent Redistricting Commission (2015)',
        detail: 'SCOTUS upheld 5-4 that voters can strip redistricting authority from legislatures via ballot initiative. Maps drew legal challenges but produced a competitive 5-4 Republican delegation.',
        url: 'https://www.supremecourt.gov/opinions/14pdf/13-1314_kjfl.pdf',
      },
    ],
    2022: [
      {
        title: 'AIRC draws maps for third cycle',
        detail: 'Arizona retained 9 seats after the 2020 census; the AIRC drew maps for the third cycle. Maps were drawn to maintain competitive districts in a premier swing state — Biden and Trump each won Arizona in consecutive presidential elections.',
      },
      {
        title: 'Delegation shifts to 6-3 Republican',
        detail: 'The delegation shifted to 6-3 Republican after the 2022 elections. Arizona\'s AIRC model has become a template for redistricting reform efforts nationally.',
      },
    ],
  },

  NC: {
    1992: [
      {
        title: 'NC gains 1 seat',
        detail: 'The 1990 census increases North Carolina\'s delegation from 11 to 12. Democrats control both chambers of the General Assembly and the governorship.',
      },
      {
        title: 'DOJ pushes for majority-minority districts',
        detail: 'Under the Voting Rights Act, the Justice Department requires North Carolina to create at least one majority-Black district. The legislature draws two — the 1st District in the northeast and the infamous 12th District, a narrow corridor running 160 miles along I-85.',
      },
      {
        title: '⚖ Shaw v. Reno (1993) — landmark racial gerrymandering ruling',
        detail: 'White voters challenge the oddly shaped 12th District as an unconstitutional racial gerrymander. In a 5–4 ruling, the U.S. Supreme Court holds that bizarrely shaped districts drawn predominantly on racial grounds must survive strict scrutiny — the first time such a claim was recognized. The case is remanded; litigation over the 12th District continues for nearly a decade.',
        url: 'https://www.oyez.org/cases/1992/92-357',
      },
      {
        title: '⚖ Shaw v. Hunt (1996) — 12th District struck down',
        detail: 'On remand, the Supreme Court strikes down the original 12th District as an unconstitutional racial gerrymander. The district is redrawn, but majority-minority requirements are retained in a more compact form.',
        url: 'https://www.oyez.org/cases/1995/94-923',
      },
    ],
    2002: [
      {
        title: 'NC gains 1 seat',
        detail: 'The 2000 census increases North Carolina\'s delegation from 12 to 13. Democrats still control the General Assembly, but by a narrower margin.',
      },
      {
        title: 'Democrats draw the maps',
        detail: 'Democrats retain control of the redistricting process and draw maps that favor their incumbents. Republicans win only 5 of 13 seats in 2002 despite winning about 46% of the congressional vote.',
      },
      {
        title: '⚖ Easley v. Cromartie (2001) — racial sorting upheld',
        detail: 'In a case concerning the prior decade\'s 12th District, the Supreme Court rules 5–4 that the district\'s shape was driven by partisan rather than racial considerations and need not meet strict scrutiny — allowing race-conscious but politically motivated districting to stand.',
        url: 'https://www.oyez.org/cases/2000/99-1864',
      },
    ],
    2012: [
      {
        title: 'Republicans take control for first time since Reconstruction',
        detail: 'In the 2010 midterms, Republicans win majorities in both chambers of the NC General Assembly for the first time since 1898, giving them full control of redistricting following the 2010 census. The seat count holds at 13.',
      },
      {
        title: 'Efficiency gap reaches +21.4% — one of the worst in US history',
        detail: 'The Republican-drawn maps produce 9 R seats and 4 D seats despite a nearly even statewide vote. Democrats win 44% of congressional votes but only 31% of seats.',
      },
      {
        title: '⚖ Cooper v. Harris (2017) — racial gerrymander struck down',
        detail: 'The Supreme Court rules 5–3 that the 1st and 12th Districts are unconstitutional racial gerrymanders — race was the predominant factor even if partisan intent was also present. North Carolina is ordered to redraw two districts; remedial maps are used from 2016 onward.',
        url: 'https://www.oyez.org/cases/2016/15-1262',
      },
      {
        title: '⚖ Common Cause v. Rucho — partisan gerrymandering not reviewable by federal courts',
        detail: 'After a three-judge panel strikes the NC congressional map as an unconstitutional partisan gerrymander, the U.S. Supreme Court reverses in Rucho v. Common Cause (2019). In a 5–4 decision, the Court holds that federal courts cannot review partisan gerrymandering claims — sending such cases to state courts.',
        url: 'https://www.oyez.org/cases/2018/18-422',
      },
    ],
    2022: [
      {
        title: 'NC gains 1 seat',
        detail: 'The 2020 census increases North Carolina\'s delegation from 13 to 14, reflecting strong population growth. Republicans control the legislature; Democrat Roy Cooper holds the governorship with veto power.',
      },
      {
        title: 'Republicans draw aggressive maps; Cooper vetoes',
        detail: 'The Republican-controlled General Assembly passes congressional maps in October 2021 that would likely produce a 10–4 Republican delegation. Governor Cooper vetoes the plan, but the legislature overrides the veto.',
      },
      {
        title: '⚖ Harper v. Hall — NC Supreme Court strikes maps',
        detail: 'The NC Supreme Court rules 4–3 in February 2022 that the congressional map is an unconstitutional partisan gerrymander under the NC Constitution. The court orders new maps, which are used in the 2022 elections and produce a 7–7 seat split.',
        url: 'https://www.ncleg.gov/redistricting',
      },
      {
        title: '⚖ Moore v. Harper — Independent State Legislature theory rejected',
        detail: 'The U.S. Supreme Court takes up the case to consider whether state legislatures have unchecked authority over federal elections under the Elections Clause. In June 2023, the Court rejects the Independent State Legislature theory 6–3, affirming that state courts can review redistricting under state constitutions.',
        url: 'https://www.oyez.org/cases/2022/21-1271',
      },
      {
        title: 'Harper reversed; aggressive new maps enacted for 2024',
        detail: 'After Republicans gain a supermajority and the NC Supreme Court\'s composition shifts, the court reverses Harper v. Hall in April 2023. New, heavily Republican-leaning congressional maps are enacted and used in the 2024 elections, producing a 10–4 Republican delegation.',
      },
    ],
    2024: [
      {
        title: 'Republicans win 10 of 14 seats under SB 757',
        detail: 'The SB 757 partisan remap (signed October 2023) produces a 10R-4D delegation as designed. Five newly drawn Republican seats are won by new members: Tim Moore, Addison McDowell, Mark Harris, Pat Harrigan, and Brad Knott. The only competitive race is CD-1, where incumbent Don Davis (D) narrowly survives 49.5%–47.9% against Republican Laurie Buckhout.',
      },
      {
        title: 'NC swings from 7-7 to 10-4 in a single election',
        detail: 'The shift from the 2022 result (7D-7R under court-ordered fair maps) to 2024 (4D-10R under the SB 757 remap) is a net 6-seat partisan swing — the single largest congressional gerrymander payoff of the 2024 cycle. Federal litigation challenging SB 757 continues but faces high hurdles after Rucho v. Common Cause (2019) foreclosed federal partisan gerrymandering claims, and the NC Supreme Court has already barred the state constitutional path.',
      },
    ],
  },
  NY: {
    1992: [
      {
        title: 'New York loses 3 seats',
        detail: 'The 1990 census reduces New York\'s delegation from 34 to 31, forcing a substantial redraw of the congressional map.',
      },
      {
        title: 'Split government produces negotiated incumbent-protection maps',
        detail: 'Governor Mario Cuomo (D) and a split legislature — Democratic Assembly, Republican Senate — negotiate maps that protect incumbents of both parties rather than maximizing partisan advantage. The resulting delegation is roughly proportional to the heavily Democratic state\'s partisan lean.',
      },
      {
        title: 'VRA creates new majority-minority districts in New York City',
        detail: 'The 1992 maps create new majority-Hispanic districts in the South Bronx and Brooklyn under Voting Rights Act requirements, and preserve majority-Black districts in Harlem and Bedford-Stuyvesant. The resulting delegation includes several firsts: Nydia Velázquez wins the newly drawn 12th District (Brooklyn/Queens) to become the first Puerto Rican woman elected to Congress.',
      },
    ],
    2002: [
      {
        title: 'New York loses 2 more seats',
        detail: 'The 2000 census reduces the delegation from 31 to 29. Governor George Pataki (R) and a divided legislature (Democratic Assembly, Republican Senate) must negotiate a new map.',
      },
      {
        title: 'Bipartisan incumbent-protection gerrymander',
        detail: 'Governor Pataki (R) and the divided legislature produce a bipartisan incumbent-protection gerrymander — both parties protect their incumbents rather than maximizing partisan advantage. The delegation remains roughly proportional to the state\'s partisan composition.',
      },
      {
        title: 'Not a single seat changes parties during the entire decade',
        detail: 'The incumbent-protection maps are so effective that not one of New York\'s 29 congressional districts changes party hands between 2002 and 2010 — despite national waves in 2006 and 2008 that changed outcomes across the country. The frozen delegation stands as one of the most extreme examples of bipartisan incumbency protection in the cycle.',
      },
    ],
    2012: [
      {
        title: 'New York loses 2 more seats',
        detail: 'The 2010 census reduces the delegation from 29 to 27. Governor Andrew Cuomo (D) and a divided legislature (Democratic Assembly, Republican Senate) control redistricting.',
      },
      {
        title: 'Another incumbent-protection plan; Cuomo signs despite veto threat',
        detail: 'Governor Cuomo threatened to veto any map drawn by the legislature, calling for an independent redistricting commission. The legislature passed a bipartisan incumbent-protection plan anyway, and Cuomo ultimately signed it.',
      },
      {
        title: 'Voters approve independent redistricting commission for future cycles',
        detail: 'New York voters approve a constitutional amendment in 2014 creating a bipartisan redistricting commission to draw maps after the 2020 census, replacing the legislative process.',
      },
    ],
    2022: [
      {
        title: 'Democrats draw aggressive gerrymander',
        detail: 'After the newly created redistricting commission deadlocked along party lines, the Democratic-controlled legislature drew its own maps targeting 22 of 26 congressional seats for Democrats — an aggressive gerrymander in a state Biden won by 23 points.',
      },
      {
        title: '⚖ Harkenrider v. Hochul — maps struck down by NY Court of Appeals',
        detail: 'The NY Court of Appeals, the state\'s highest court, strikes down the Democratic congressional maps in April 2022, ruling they violate the 2014 constitutional amendment prohibiting partisan gerrymandering. The court orders a special master to draw replacement maps.',
        url: 'https://www.nycourts.gov/ctapps/Decisions/2022/Apr22/60opn22-Decision.pdf',
      },
      {
        title: 'Court-appointed special master draws replacement maps',
        detail: 'Special master Jonathan Cervas draws replacement congressional maps used in the 2022 elections. The court-drawn maps produce a 15–11 Democratic delegation — far fewer seats than Democrats sought, but still reflecting the state\'s Democratic lean.',
      },
    ],
  },
  CA: {
    1992: [
      {
        title: 'California gains 7 seats — the largest gain of any state',
        detail: 'The 1990 census increases California\'s congressional delegation from 45 to 52, requiring a complete redraw of the congressional map.',
      },
      {
        title: 'Governor Wilson vetoes Democratic maps; court draws them instead',
        detail: 'Governor Pete Wilson (R) vetoed the Democratic legislature\'s redistricting plan. Ballot initiatives to establish a redistricting commission (Prop 118/119) failed in 1990. The California Supreme Court appointed special masters who drew the maps used through the cycle.',
      },
      {
        title: 'Court-drawn maps reflect California\'s Democratic lean',
        detail: 'The special master maps produce a delegation with Democrats winning roughly 65% of seats (30 of 52), broadly proportional to the state\'s partisan composition.',
      },
    ],
    2002: [
      {
        title: 'California gains 1 seat to reach 53 districts',
        detail: 'The 2000 census gives California one additional congressional seat. Governor Gray Davis (D) and a Democratic legislature control redistricting.',
      },
      {
        title: 'Incumbent-protection gerrymander — the \'incumbent protection act of 2001\'',
        detail: 'Maps were designed to freeze the existing delegation in place, so effectively that zero seats changed party hands in 2002 or 2004. The plan drew criticism from both parties and reformers as a blatant incumbent-protection gerrymander.',
      },
      {
        title: '⚖ Schwarzenegger\'s Proposition 77 redistricting reform fails',
        detail: 'Governor Schwarzenegger placed Proposition 77 on the November 2005 special election ballot, which would have transferred redistricting authority to a panel of retired judges. Voters rejected it, leaving the incumbent-protection maps in place.',
      },
    ],
    2012: [
      {
        title: 'California Citizens Redistricting Commission draws congressional maps for the first time',
        detail: 'Proposition 11 (2008) created the California Citizens Redistricting Commission (CCRC); Proposition 20 (2010) extended its authority to congressional districts. The CCRC drew maps through an extensive public process, replacing legislative control of redistricting for the first time in decades.',
      },
      {
        title: 'New competitive maps dramatically change the delegation',
        detail: 'The CCRC maps created several new competitive districts. Multiple incumbents retired or lost in the new landscape. Democrats won 38 of 53 seats; the competitive environment contrasted sharply with the frozen 2002 delegation.',
      },
      {
        title: 'California also adopts the top-two primary ("jungle primary") in 2012',
        detail: 'Alongside the new district maps, California\'s Proposition 14 (2010) top-two primary system takes effect for congressional races — the first state to use it for federal elections. Under the new system, all candidates regardless of party compete together, and the top two advance to the general election. This produces several same-party general election matchups and transforms the strategic landscape in safe districts.',
      },
    ],
    2022: [
      {
        title: 'California loses 1 seat — the first population-share decline in state history',
        detail: 'The 2020 census reduces California\'s congressional delegation from 53 to 52 — the first time in state history the delegation has shrunk. The California Citizens Redistricting Commission again draws the maps.',
      },
      {
        title: 'CCRC maps produce roughly proportional delegation',
        detail: 'After an extensive public hearing process, the CCRC maps produce a delegation roughly proportional to California\'s partisan composition. Several incumbent vs. incumbent matchups result from the seat reduction.',
      },
      {
        title: 'Competitive seats emerge in Orange County and the Central Valley',
        detail: 'The CCRC maps create several genuinely competitive districts — particularly in Orange County (CA-45, CA-47) and the Central Valley (CA-13, CA-22) — that produce some of the most closely watched House races of 2022 and 2024. The commission\'s competitive-district design contrasts with the incumbent-protection maps of the 2002 cycle.',
      },
    ],
  },
  NJ: {
    1992: [
      {
        title: 'Bipartisan Apportionment Commission structure',
        detail: 'New Jersey uses a bipartisan Apportionment Commission — 6 Democrats, 6 Republicans, plus a tiebreaker appointed by the NJ Supreme Court Chief Justice.',
      },
      {
        title: 'Democratic tiebreaker selects Democratic plan',
        detail: 'The commission deadlocked along party lines; a Democratic tiebreaker selected the Democratic plan. Maps produced a delegation roughly reflecting New Jersey\'s partisan lean at the time.',
      },
      {
        title: 'New Jersey retains 13 seats; suburban Philadelphia and New York City districts are the battlegrounds',
        detail: 'New Jersey retains all 13 seats after the 1990 census. The delegation includes competitive suburban Philadelphia seats (NJ-3 in Burlington/Camden, NJ-4 in central NJ) and suburban New York City seats (NJ-7, NJ-11 in Morris/Essex) that shift between the parties with national political trends. Democrats win 7 of 13 seats in 1992.',
      },
    ],
    2002: [
      {
        title: 'Republican tiebreaker Nathaniel Gorenstein chooses Republican plan',
        detail: 'The bipartisan commission deadlocked again; Republican tiebreaker Nathaniel Gorenstein chose the Republican plan. Maps were drawn to favor Republicans, who won 7 of 13 seats in 2002 despite New Jersey\'s Democratic lean.',
      },
      {
        title: 'Tiebreaker\'s party affiliation determined the partisan outcome',
        detail: 'The tiebreaker\'s party affiliation determined the partisan outcome — illustrating the limits of \'bipartisan\' commissions where the tiebreaker holds all the power.',
      },
      {
        title: 'Republican maps hold through 2004 but collapse in 2006 wave',
        detail: 'The Republican-favoring maps produce a 7-6 Republican edge in 2002 and 2004, but the 2006 Democratic wave flips the delegation to 7-6 Democratic as suburban New Jersey moves sharply toward Democrats. The shift foreshadows New Jersey\'s rapid realignment into a consistently blue state.',
      },
    ],
    2012: [
      {
        title: 'New Jersey loses 1 seat after the 2010 census',
        detail: 'New Jersey\'s congressional delegation falls from 13 to 12 districts after the 2010 census.',
      },
      {
        title: 'Tiebreaker John Farmer chooses compromise plan',
        detail: 'The bipartisan commission deadlocked; tiebreaker John Farmer, a former state attorney general, chose a compromise plan. Maps produced a near-even 6-6 delegation split in a state with a consistent Democratic lean.',
      },
      {
        title: 'Sandy and the suburban shift transform NJ politics during the cycle',
        detail: 'Superstorm Sandy (October 2012) devastates the Jersey Shore and reshapes the political environment for the 2012 elections. Governor Christie\'s bipartisan response lifts his approval ratings. By the end of the cycle, New Jersey\'s suburban seats accelerate their Democratic trend as college-educated suburban voters shift — a harbinger of national trends.',
      },
    ],
    2022: [
      {
        title: 'Commission deadlocks for the third consecutive cycle',
        detail: 'The bipartisan commission deadlocked for the third consecutive cycle. Tiebreaker Philip Carchman, a retired NJ appellate judge, chose the Democratic plan in January 2022.',
      },
      {
        title: '⚖ Republican challenge to maps fails',
        detail: 'Republican lawmakers challenged the process but courts upheld the maps. Maps produced a 9-3 Democratic delegation in a state Biden won by 16 points.',
      },
      {
        title: 'NJ-7 and NJ-3 remain among the most competitive seats in the country',
        detail: 'Despite Democratic-favoring maps, the 7th District (central New Jersey) and the redrawn 3rd District (Burlington/Ocean Counties) remain genuinely competitive seats that flip between the parties. NJ-7 is rated one of the top 10 most competitive House districts nationally in both 2022 and 2024.',
      },
    ],
  },

  CO: {
    1992: [
      {
        title: 'Colorado retains 6 seats after the 1990 census',
        detail: 'Colorado retained 6 congressional seats after the 1990 census.',
      },
      {
        title: 'Governor Romer and split legislature negotiate maps',
        detail: 'Governor Romer (D) and a split legislature (Dem House, Rep Senate) negotiated maps reflecting Colorado\'s competitive partisan balance at the time.',
      },
      {
        title: 'Relatively even delegation in a swing state',
        detail: 'Colorado was a swing state in the 1990s; maps produced a roughly even delegation.',
      },
    ],
    2002: [
      {
        title: 'Colorado gains 1 seat after the 2000 census, reaching 7 districts',
        detail: 'Colorado gained 1 congressional seat after the 2000 census, reaching 7 districts.',
      },
      {
        title: 'Split legislature deadlocks; court draws maps for 2002',
        detail: 'A split legislature deadlocked; a court drew maps used for the 2002 elections.',
      },
      {
        title: 'Republicans pass mid-decade remap in 2003',
        detail: 'Republicans won control of both chambers in 2002 and passed new mid-decade maps in 2003.',
      },
      {
        title: '⚖ Salazar v. Davidson — mid-decade remap struck as unconstitutional',
        detail: 'The Colorado Supreme Court struck the Republican mid-decade remap as unconstitutional in 2003 — the original court-drawn maps remained for the full cycle.',
      },
    ],
    2012: [
      {
        title: 'Colorado retains 7 seats after the 2010 census',
        detail: 'Colorado retained 7 seats after the 2010 census.',
      },
      {
        title: 'Governor Hickenlooper and divided legislature negotiate competitive maps',
        detail: 'Governor Hickenlooper (D) and a divided legislature negotiated relatively competitive maps.',
      },
      {
        title: 'Rapidly urbanizing state; suburban Denver districts become battlegrounds',
        detail: 'Colorado was rapidly urbanizing and trending Democratic; suburban Denver districts became key battlegrounds.',
      },
    ],
    2022: [
      {
        title: 'Colorado gains 1 seat after the 2020 census, reaching 8 districts',
        detail: 'Colorado gained 1 seat after the 2020 census, reaching 8 districts.',
      },
      {
        title: 'Amendment Y (2018) creates the Colorado Independent Congressional Redistricting Commission',
        detail: 'Amendment Y (2018), passed by 71% of voters, created the Colorado Independent Congressional Redistricting Commission.',
      },
      {
        title: 'CIRC draws maps through extensive public hearings; CO Supreme Court approves in November 2021',
        detail: 'The CIRC drew maps through extensive public hearings; the CO Supreme Court approved them in November 2021.',
      },
      {
        title: 'Maps produce a competitive 4-4 delegation',
        detail: 'Maps produced a competitive 4-4 delegation in a state that had shifted toward Democrats.',
      },
    ],
  },
  MN: {
    1992: [
      {
        title: 'Minnesota retained 8 congressional seats after the 1990 census',
        detail: 'Minnesota retained 8 congressional seats after the 1990 census.',
      },
      {
        title: 'Governor Carlson (R) and the DFL-controlled legislature deadlocked — the MN Supreme Court drew the maps',
        detail: 'Governor Carlson (R) and the DFL-controlled legislature deadlocked — the MN Supreme Court drew the congressional maps.',
      },
      {
        title: 'Court-drawn maps produced a competitive delegation reflecting Minnesota\'s closely divided politics',
        detail: 'Court-drawn maps produced a competitive delegation reflecting Minnesota\'s closely divided politics.',
      },
      {
        title: 'Minnesota has used court-drawn congressional maps for every redistricting cycle since 1992',
        detail: 'Minnesota has used court-drawn congressional maps for every redistricting cycle since 1992 — a streak unmatched by any other state.',
      },
    ],
    2002: [
      {
        title: 'Minnesota retained 8 seats after the 2000 census',
        detail: 'Minnesota retained 8 seats after the 2000 census.',
      },
      {
        title: 'Governor Ventura (Reform/Independence Party) and a divided legislature again deadlocked',
        detail: 'Governor Ventura (Reform/Independence Party) and a divided legislature again deadlocked on congressional maps.',
      },
      {
        title: 'The MN Supreme Court drew maps for the second consecutive cycle',
        detail: 'The MN Supreme Court drew congressional maps for the second consecutive cycle.',
      },
      {
        title: 'Maps maintained Minnesota\'s competitive balance; the state was a perennial presidential toss-up',
        detail: 'Maps maintained Minnesota\'s competitive balance; the state was a perennial presidential toss-up through this era.',
      },
    ],
    2012: [
      {
        title: 'Minnesota retained 8 seats after the 2010 census',
        detail: 'Minnesota retained 8 seats after the 2010 census.',
      },
      {
        title: 'Governor Dayton (DFL) and a Republican-controlled legislature deadlocked for the third consecutive cycle',
        detail: 'Governor Dayton (DFL) and a Republican-controlled legislature deadlocked for the third consecutive cycle.',
      },
      {
        title: 'A special five-judge redistricting panel drew congressional maps',
        detail: 'A special five-judge redistricting panel of MN appellate judges drew the congressional maps.',
      },
      {
        title: 'Maps produced a 5-3 DFL delegation in a state Obama won by 7.5 points',
        detail: 'Maps produced a 5-3 DFL delegation in a state Obama won by 7.5 points.',
      },
    ],
    2022: [
      {
        title: 'Minnesota narrowly retained 8 seats after the 2020 census — within ~26 people of losing a seat to New York',
        detail: 'Minnesota narrowly retained 8 seats after the 2020 census — it came within approximately 26 people of losing a seat to New York.',
      },
      {
        title: 'Governor Walz (DFL) and a Republican-controlled Senate deadlocked for the fourth straight cycle',
        detail: 'Governor Walz (DFL) and a Republican-controlled Senate deadlocked for the fourth consecutive redistricting cycle.',
      },
      {
        title: 'A special redistricting panel drew maps for the fourth consecutive time — a streak unmatched by any other state',
        detail: 'A special redistricting panel drew congressional maps for the fourth consecutive time — a streak unmatched by any other state.',
      },
      {
        title: 'Maps produced a competitive 4-4 delegation in a state Biden won by 7 points',
        detail: 'Maps produced a competitive 4-4 delegation in a state Biden won by 7 points.',
      },
    ],
  },

  AL: {
    1992: [
      {
        title: 'VRA mandates Alabama\'s first majority-Black district since Reconstruction',
        detail: 'Governor Hunt (D) and a Democratic legislature draw maps after the 1990 census. The Voting Rights Act requires creation of a majority-Black congressional district. AL-7 is drawn in the Birmingham–Tuscaloosa corridor, producing Alabama\'s first Black congressman since Reconstruction.',
      },
      {
        title: 'One majority-Black district; six white-majority seats',
        detail: 'Despite Black Alabamians comprising 26% of the population, the maps concentrate that vote into a single district. The other six are drawn as effectively white-majority — a structure that would persist unchanged for 30 years.',
      },
    ],
    2002: [
      {
        title: 'Democratic legislature draws maps as the state shifts rightward',
        detail: 'Governor Siegelman (D) and a Democratic legislature retain control of redistricting — their last cycle to do so. Alabama retains 7 seats. The delegation runs 5-2 Republican despite Democratic mapmaking, reflecting the state\'s accelerating realignment toward Republicans in federal elections.',
      },
      {
        title: 'Single majority-Black district preserved; surrounding seats all Republican',
        detail: 'The Democratic-drawn maps maintain one majority-Black district (AL-7, Birmingham corridor) as required by the Voting Rights Act. The surrounding six districts are all majority-white and trend Republican. Earl Hilliard loses AL-7 in the 2002 Democratic primary to Artur Davis — an intraparty Black candidate contest that draws national attention — and Davis holds the seat through 2010.',
      },
    ],
    2012: [
      {
        title: 'Republicans win state legislature for first time in modern history',
        detail: 'The 2010 elections give Republicans supermajorities in both chambers of the Alabama legislature — their first legislative majority since Reconstruction. Governor Bentley (R) and the new Republican majority draw congressional maps for 2012.',
      },
      {
        title: 'Maps pack Black voters into a single district, enabling a 6-1 Republican delegation',
        detail: 'The Republican-drawn maps preserve one majority-Black district (AL-7) and draw the remaining six as safe Republican seats. Democrats receive roughly 37% of the statewide congressional vote but win only one of seven seats.',
      },
    ],
    2022: [
      {
        title: 'Republican maps maintain a single majority-Black district',
        detail: 'Governor Ivey (R) and Republican legislature draw maps that keep one majority-Black district (AL-7) despite Black residents comprising 27% of the population — enough to sustain a second district under the Voting Rights Act, according to plaintiffs.',
      },
      {
        title: '⚖ Allen v. Milligan — SCOTUS orders second majority-Black district',
        detail: 'In a landmark 5-4 ruling (June 8, 2023), Chief Justice Roberts joined the liberal justices to hold that Alabama\'s maps likely violate Section 2 of the Voting Rights Act. The Court rejects Alabama\'s argument that race-neutral redistricting criteria should presumptively control, reaffirming the Gingles framework for vote-dilution claims. Remedial maps for 2024 create a second majority-Black district in the southwestern "Black Belt" region, producing a 2-5 Democratic-Republican split.',
        url: 'https://www.supremecourt.gov/opinions/22pdf/21-1086_1co6.pdf',
      },
    ],
    2024: [
      {
        title: 'Remedial CD-2 enacted; court orders Remedial Plan 3 for 2024 only',
        detail: 'Following Allen v. Milligan, the three-judge panel in Milligan v. Allen (N.D. Ala.) rejected the legislature\'s non-compliant remedial attempt and on October 5, 2023 ordered Remedial Plan 3 — drawn by a special master — for use in the 2024 election only. CD-2, previously a majority-white Republican seat covering the Black Belt counties and the Mobile corridor, was redrawn to approximately 49% Black voting-age population.',
      },
      {
        title: 'Shomari Figures wins CD-2; Alabama elects two Black members simultaneously for the first time',
        detail: 'Democrat Shomari Figures wins the remedially redrawn CD-2 with ~54.5% of the vote, defeating Republican Caroleene Dobson. Combined with Terri Sewell\'s continued hold on CD-7, Alabama sends two Black representatives to Congress simultaneously for the first time — the first since 2008 that Alabama elected two Democrats to Congress. The remedial map was ordered for 2024 only; the Alabama congressional map for 2026 remains unresolved.',
      },
    ],
  },

  AR: {
    1992: [
      {
        title: 'Clinton successor draws Democratic maps',
        detail: 'Governor Tucker (D) — who succeeded Bill Clinton upon his election to the presidency — and a Democratic legislature draw maps. Arkansas retains 4 seats after the 1990 census. The maps protect Democratic incumbents in a state trending rightward at the presidential level but still electing Democrats statewide.',
      },
      {
        title: 'Arkansas sends an all-Democratic delegation for the last time',
        detail: 'The 1992 elections produce an all-Democratic 4-0 Arkansas delegation — the last time the state would send an entirely Democratic congressional delegation. The realignment to Republicans accelerates through the 1990s as rural white voters in the Delta and Ozarks shift toward Republicans in federal races even while continuing to elect conservative Democrats at the state level.',
      },
    ],
    2002: [
      {
        title: 'Split government: Huckabee (R) and Democratic legislature',
        detail: 'Governor Huckabee (R) and a Democratic-controlled General Assembly draw maps after Arkansas retains 4 seats. Democrats hold both chambers and control the process. The maps maintain a 3-1 Democratic delegation heading into 2002.',
      },
      {
        title: 'Arkansas delegation shifts to 3-1 Republican despite Democratic maps',
        detail: 'Despite Democratic control of redistricting, the Arkansas delegation flips to 3-1 Republican by 2004 as the state\'s congressional realignment outpaces Democratic mapmaking advantages. John Boozman (AR-3, northwest Arkansas/Fort Smith) and Tim Griffin (AR-2, Little Rock) are emblematic of the Republican takeover of formerly Democratic districts.',
      },
    ],
    2012: [
      {
        title: 'Last Democratic maps — drawn just before the party loses the legislature',
        detail: 'Governor Beebe (D) and a Democratic legislature draw maps for what would be their final redistricting cycle. Democrats still hold both chambers of the General Assembly for the 2011 redistricting — but Republicans sweep the legislature in the 2012 elections, ending Democratic legislative control for the first time since Reconstruction.',
      },
      {
        title: 'Delegation flips to 4-0 Republican',
        detail: 'Despite drawing the maps, Democrats lose all four congressional seats in the 2012 and 2014 elections as the state\'s rapid rightward shift in federal races overwhelms any mapmaking advantage.',
      },
    ],
    2022: [
      {
        title: 'First full Republican redistricting cycle',
        detail: 'Governor Hutchinson (R) and a Republican supermajority legislature draw maps after Arkansas retains 4 seats. Republicans produce maps maintaining a 4-0 delegation in a state Trump won by 28 points in 2020.',
      },
      {
        title: 'Little Rock split across districts to dilute urban Democratic vote',
        detail: 'The Republican maps divide Pulaski County (Little Rock), the state\'s only large urban Democratic stronghold, across multiple congressional districts — preventing its Democratic voters from consolidating into a competitive seat. The strategy is consistent with Republican redistricting approaches in other Southern states with isolated urban Democratic centers.',
      },
    ],
  },

  CT: {
    1992: [
      {
        title: 'Independent governor, Democratic legislature navigate bipartisan commission',
        detail: 'Connecticut uses a bipartisan Reapportionment Commission — equal numbers of Democrats and Republicans plus a tiebreaker. Governor Weicker, elected as an independent in 1990 on the "A Connecticut Party" ticket, oversees the process. Connecticut retains 6 seats after the 1990 census.',
      },
      {
        title: 'Connecticut\'s 5th District (Waterbury/Danbury) is the state\'s premier swing seat',
        detail: 'The 5th District covering western Connecticut — including the struggling manufacturing cities of Waterbury, New Britain, and the growing suburbs around Danbury — is the most competitive congressional seat in the state throughout the 1990s and 2000s. It changes party control multiple times before Connecticut becomes more reliably Democratic through the 2010s.',
      },
    ],
    2002: [
      {
        title: 'Connecticut loses 1 seat after the 2000 census',
        detail: 'The 2000 census reduces the delegation from 6 to 5, requiring a full reorganization of the congressional map. Governor Rowland (R) and a Democratic legislature oversee the bipartisan commission process.',
      },
      {
        title: 'Commission deadlocks; Hartford court draws the map',
        detail: 'The bipartisan Reapportionment Commission deadlocks along partisan lines. Under Connecticut\'s constitutional procedure, a Hartford Superior Court judge draws the congressional map — producing a 3-2 Democratic delegation.',
      },
    ],
    2012: [
      {
        title: 'Commission reaches agreement for first time in decades',
        detail: 'Governor Malloy (D) and a narrowly Democratic legislature oversee the commission process. Connecticut retains 5 seats after the 2010 census. The bipartisan commission reaches consensus, agreeing on maps that preserve the 3-2 Democratic advantage.',
      },
      {
        title: 'Connecticut trends toward solid Democratic control through the decade',
        detail: 'Connecticut\'s 5th District — formerly the state\'s swing seat — elects Democrat Elizabeth Esty in 2012 and Democrats hold all 5 seats from 2014 onward. Connecticut\'s shift reflects the national trend of college-educated suburban voters moving toward Democrats; Fairfield County (Greenwich, Stamford, Bridgeport) shifts substantially leftward through the decade.',
      },
    ],
    2022: [
      {
        title: 'Democrats draw maps maintaining 5-seat delegation',
        detail: 'Governor Lamont (D) and a Democratic legislature draw maps after Connecticut retains 5 seats. Democrats hold all 5 seats going into the cycle; the maps preserve a 4-1 or 3-2 Democratic edge in one of the nation\'s most reliably Democratic states.',
      },
      {
        title: 'Connecticut\'s 5th District remains the only competitive seat',
        detail: 'The 5th District covering Waterbury, New Britain, and the Naugatuck Valley is redrawn with a slightly more Democratic lean following population shifts toward Bridgeport-area suburbs. Democrats retain all 5 seats in 2022 and 2024, making Connecticut one of the most reliably all-Democratic congressional delegations among states with 5 or more seats.',
      },
    ],
  },

  HI: {
    1992: [
      {
        title: 'Democratic legislature uses Reapportionment Commission',
        detail: 'Hawaii\'s Reapportionment Commission — a 9-member body appointed by the legislature and governor — draws all legislative and congressional maps. Governor Waihee (D) and a Democratic legislature oversee the process. Hawaii retains 2 seats. Hawaii has never elected a Republican to Congress since achieving statehood in 1959.',
      },
      {
        title: 'HI-1 covers urban Honolulu; HI-2 covers neighbor islands and rural Oahu',
        detail: 'Hawaii\'s two congressional districts follow the state\'s geographic structure: HI-1 covers the urban core of Honolulu (Waikiki, downtown, Pearl Harbor) on the island of Oahu, while HI-2 covers the outer islands (Maui, Hawaii, Kauai, Molokai) and rural Oahu. HI-1 is the safer Democratic seat; HI-2 is occasionally competitive due to its rural and military-adjacent voter base.',
      },
    ],
    2002: [
      {
        title: 'Reapportionment Commission draws modest adjustments',
        detail: 'Governor Cayetano (D) and a Democratic legislature oversee the process. Hawaii retains 2 seats after the 2000 census. The maps maintain the two districts: HI-1 (urban Honolulu) and HI-2 (rural Oahu + neighbor islands).',
      },
      {
        title: 'Hawaii\'s Native Hawaiian population raises VRA questions not resolved this cycle',
        detail: 'Hawaii has the largest Native Hawaiian and Pacific Islander population of any state. Advocates argue that redistricting should consider the concentration of Native Hawaiians in communities like the Waiʻanae Coast (western Oahu) to ensure political representation. The 2002 maps do not address these concerns directly; the issue resurfaces in subsequent redistricting cycles.',
      },
    ],
    2012: [
      {
        title: 'Hawaii retains 2 seats; Democratic dominance continues',
        detail: 'Governor Abercrombie (D) and a Democratic legislature oversee the Reapportionment Commission. Hawaii retains 2 seats after the 2010 census. The state\'s congressional delegation has been entirely Democratic since statehood — one of the longest such streaks nationally.',
      },
      {
        title: 'Mazie Hirono becomes the first Asian-American woman elected to the Senate',
        detail: 'Although a Senate race rather than a congressional redistricting outcome, Mazie Hirono\'s 2012 election to the U.S. Senate — after serving in HI-2 — illustrates the broader pattern of Hawaii\'s diverse representation. Hawaii regularly elects the nation\'s most racially diverse congressional delegation: Asian American, Native Hawaiian, and multiracial members have represented both districts across all four redistricting cycles.',
      },
    ],
    2022: [
      {
        title: 'Reapportionment Commission draws maps; HI-2 remains a swing district',
        detail: 'Governor Ige (D) and a Democratic legislature oversee the commission. Hawaii retains 2 seats after the 2020 census. HI-2 (rural islands + part of Oahu) is occasionally competitive — Republicans won it briefly in the 2010 wave — making it one of the few Hawaii races with genuine partisan uncertainty.',
      },
      {
        title: 'Hawaii\'s unique political culture produces low-competitiveness races',
        detail: 'Hawaii\'s congressional races are among the least competitive in the nation by margin — both seats regularly return Democrats by 30+ points. The state\'s low Republican base (among the lowest in the US) and highly unionized workforce in the tourism, construction, and public-sector industries produce a political environment where redistricting has minimal impact on outcomes.',
      },
    ],
  },

  IA: {
    1992: [
      {
        title: 'Nonpartisan LSB draws Iowa\'s congressional map',
        detail: 'Iowa\'s Legislative Services Bureau — a nonpartisan staff agency — draws congressional maps under a unique state law that prohibits consideration of partisan data, incumbent addresses, or prior election results. The legislature may accept or reject but cannot amend the plan. Iowa retains 5 seats after the 1990 census.',
      },
      {
        title: 'Republican governor Branstad signs LSB plan',
        detail: 'Governor Branstad (R) and a split legislature approve the LSB\'s first proposed plan. Iowa\'s nonpartisan process is widely cited as a national model for independent redistricting.',
      },
    ],
    2002: [
      {
        title: 'LSB draws maps for second cycle; Iowa retains 5 seats',
        detail: 'Iowa retains 5 seats after the 2000 census. Democratic governor Vilsack and a Republican-controlled legislature approve the LSB\'s plan. The process proceeds without litigation — a notable contrast with most other states that cycle.',
      },
      {
        title: 'No incumbent addresses or election results considered in the plan',
        detail: 'Iowa law prohibits the LSB from considering incumbent home addresses, prior election results, or partisan registration data when drawing districts — the strictest such prohibition in any state. The resulting maps sometimes pair incumbents of the same party in the same district, creating competitive primaries that would never occur under partisan-drawn maps.',
      },
    ],
    2012: [
      {
        title: 'Iowa loses 1 seat after the 2010 census',
        detail: 'The 2010 census reduces Iowa\'s delegation from 5 to 4. Republican governor Branstad and a Republican legislature must approve a map that eliminates one district.',
      },
      {
        title: 'Legislature rejects first two LSB plans, accepts the third',
        detail: 'In a rare exercise of legislative leverage within Iowa\'s nonpartisan framework, the Republican-controlled legislature rejects the LSB\'s first two proposed maps before accepting the third. The accepted plan reorganizes the districts in a way that disadvantages some Democratic incumbents — raising questions about whether the rejections were truly nonpartisan.',
      },
    ],
    2022: [
      {
        title: 'Republican legislature rejects LSB plan, accepts second',
        detail: 'Iowa retains 4 seats after the 2020 census. Republican governor Reynolds and a Republican supermajority legislature reject the LSB\'s first plan and accept the second — which drew a more Republican-leaning 3rd District (Des Moines corridor). Critics argue repeated rejections of LSB plans undermine the system\'s nonpartisan intent.',
      },
      {
        title: 'Iowa produces some of the most competitive districts in the country',
        detail: 'Despite Republican-leaning maps, Iowa\'s LSB-drawn districts remain genuinely competitive by national standards. The 1st District (Cedar Rapids/Iowa City), 2nd District (Davenport/Waterloo), and 3rd District (Des Moines) are all rated as competitive in 2022 and 2024 — a product of Iowa\'s near-even partisan balance and the LSB\'s prohibition on partisan manipulation.',
      },
    ],
  },

  ID: {
    1992: [
      {
        title: 'Legislature draws maps before commission era; split government',
        detail: 'Idaho\'s bipartisan redistricting commission did not exist until 1994. For the 1992 cycle, Governor Andrus (D) and a Republican-controlled legislature drew the maps — Idaho\'s last legislatively drawn congressional plan. Idaho retains 2 seats.',
      },
      {
        title: 'Both Idaho seats are reliably Republican; Boise begins trending Democratic',
        detail: 'The 1992 maps maintain two reliably Republican seats — the 1st District (western and northern Idaho) and the 2nd District (eastern and southern Idaho). Boise, then a smaller city, is included in the 1st District. Over the following three decades, Boise\'s growth and increasing diversity make the 1st District gradually more competitive, but Republicans retain both seats throughout all cycles.',
      },
    ],
    2002: [
      {
        title: 'First cycle under Idaho\'s new Citizens\' Commission for Reapportionment',
        detail: 'Proposition 1 (1994) created Idaho\'s bipartisan Citizens\' Commission for Reapportionment — six members appointed equally by each party\'s legislative leaders. This is its first redistricting cycle. Idaho retains 2 seats after the 2000 census.',
      },
      {
        title: 'Commission draws compact, county-based maps',
        detail: 'The commission draws maps grouping counties into two districts: the 1st (western and northern Idaho, including Boise) and the 2nd (eastern and southern Idaho, including Idaho Falls and Twin Falls). The maps are widely regarded as fair and are not challenged in court.',
      },
    ],
    2012: [
      {
        title: 'Commission draws maps after Idaho retains 2 seats',
        detail: 'Idaho retains 2 seats after the 2010 census. The Citizens\' Commission draws maps preserving the basic east-west split. The Boise metro area continues to trend Democratic, generating pressure to include more of it in the 1st District.',
      },
      {
        title: 'Boise\'s growth makes Idaho\'s 1st District increasingly competitive',
        detail: 'Boise\'s rapid growth — driven by tech industry migration and a booming population — makes Ada County (Boise) increasingly Democratic-leaning through the 2010s. The commission\'s maps preserve the 1st District\'s geographic structure, but Boise\'s shifting demographics make the seat marginally competitive by the end of the decade, though Republicans retain it comfortably.',
      },
    ],
    2022: [
      {
        title: 'Commission draws maps; VRA advocates raise concerns about Pocatello',
        detail: 'Idaho retains 2 seats after the 2020 census. The Citizens\' Commission draws new maps. Advocates argue the maps dilute the Native American vote in southeastern Idaho (particularly around Fort Hall and Pocatello), though no federal court challenge is ultimately sustained.',
      },
      {
        title: 'Idaho\'s 1st District remains the most competitive in the state despite Republican lean',
        detail: 'The new maps maintain a 1st District that includes Boise and the growing Treasure Valley corridor (Nampa, Caldwell, Meridian). Republicans retain the seat but by smaller margins than the 2nd District; the Boise metro\'s Democratic trend makes the 1st District a potential competitive seat in future cycles if urban growth continues.',
      },
    ],
  },

  IN: {
    1992: [
      {
        title: 'Split government produces negotiated maps',
        detail: 'Governor Bayh (D) and a split Indiana General Assembly (Democratic House, Republican Senate) draw maps after Indiana retains 10 seats from the 1990 census. The split government produces compromise maps with minimal partisan distortion.',
      },
      {
        title: 'Democrats and Republicans each protect their incumbents',
        detail: 'The compromise map safeguards all incumbents of both parties. Democrats hold seats anchored in Indianapolis (IN-10) and Gary/Northwest Indiana (IN-1), while Republicans hold the remaining eight districts. The resulting delegation closely tracks Indiana\'s competitive-but-lean-Republican political balance of the early 1990s.',
      },
    ],
    2002: [
      {
        title: 'Indiana loses 1 seat after the 2000 census',
        detail: 'The 2000 census reduces Indiana\'s delegation from 10 to 9, requiring elimination of one district. Governor O\'Bannon (D) must sign maps drawn by a Republican-controlled General Assembly.',
      },
      {
        title: 'Republican legislature draws maps over Democratic governor\'s signature',
        detail: 'Republicans hold majorities in both chambers of the Indiana General Assembly and draw maps producing a 7-2 Republican delegation. Governor O\'Bannon signs the plan, having limited leverage against the Republican-controlled legislature.',
      },
    ],
    2012: [
      {
        title: 'Republican supermajority draws maps after 2010 sweep',
        detail: 'Governor Daniels (R) and a Republican supermajority legislature draw maps after Indiana retains 9 seats. Republicans won supermajorities in both chambers in the 2010 elections. The resulting maps pack Democrats into the Indianapolis-based 7th District (André Carson) and the Bloomington/Gary-influenced 1st District.',
      },
      {
        title: 'Maps produce a 7-2 Republican delegation',
        detail: 'The Republican-drawn maps yield a 7-2 delegation in a state Obama lost by 10 points in 2012. The two Democratic seats (IN-1 in Gary/Northwest Indiana and IN-7 in Indianapolis) are safe minority-coalition districts.',
      },
    ],
    2022: [
      {
        title: 'Republican supermajority maintains 7-2 delegation structure',
        detail: 'Governor Holcomb (R) and a Republican supermajority legislature draw maps after Indiana retains 9 seats. Maps preserve the 7-2 Republican advantage. Democrats challenge maps in state court as an unconstitutional partisan gerrymander but courts uphold the plan.',
      },
      {
        title: 'Indianapolis cracking dilutes urban Democratic vote',
        detail: 'The Republican maps divide Marion County (Indianapolis) across multiple congressional districts, preventing the growing Democratic-majority city from consolidating its vote into an additional congressional seat. The 5th District (suburban Indianapolis), which had briefly gone Democratic in 2018 and 2020, is redrawn to lean more reliably Republican.',
      },
    ],
  },

  KS: {
    1992: [
      {
        title: 'Democratic governor, Republican legislature split control',
        detail: 'Governor Finney (D) — one of only two women ever to serve as Kansas governor — and a Republican-controlled legislature draw maps after Kansas retains 4 seats from the 1990 census. Split government produces relatively neutral maps.',
      },
      {
        title: 'Kansas retains a competitive 3rd District anchored by Kansas City suburbs',
        detail: 'The 1992 maps preserve a competitive 3rd District (Kansas City\'s Johnson and Wyandotte counties) where Democrat Dennis Moore wins in 1998 and holds it through 2010. The remaining three districts — covering the western plains (KS-1), the Wichita area (KS-4), and the Topeka/Lawrence/eastern Kansas corridor (KS-2) — are reliably Republican.',
      },
    ],
    2002: [
      {
        title: 'Republican unified control; maps maintain 4-seat delegation',
        detail: 'Governor Graves (R) and a Republican-controlled legislature draw maps after Kansas retains 4 seats. Republicans hold a 3-1 advantage in the delegation, but the 3rd District (Kansas City suburbs) remains competitive.',
      },
      {
        title: 'KS-1 is one of the largest congressional districts in the contiguous US',
        detail: 'The 1st District covering western Kansas — the "Big First" — is one of the largest congressional districts by area in the contiguous United States, spanning more than 60,000 square miles of wheat fields, cattle ranches, and small towns. It is among the most reliably Republican districts in the country, returning Republicans by enormous margins every cycle.',
      },
    ],
    2012: [
      {
        title: 'Republican supermajority reinforces 4-0 delegation',
        detail: 'Governor Brownback (R) and a Republican supermajority legislature draw maps after Kansas retains 4 seats. The 3rd District (Johnson County suburbs) is redrawn to be more Republican-leaning as the Kansas City suburbs began trending Democratic — an effort to preempt the demographic shift.',
      },
      {
        title: 'Kansas produces one of the cycle\'s most partisan statewide vote-seat mismatches',
        detail: 'Democrats regularly win 30-35% of the statewide congressional vote in Kansas but hold zero of four seats. The Republican maps concentrate Democratic voters in Johnson County (Kansas City suburbs) and dilute their influence by pairing it with Republican-leaning rural precincts. The 3rd District\'s eventual Democratic trend cannot be fully contained — Democrats win the seat in 2018 despite the unfavorable maps.',
      },
    ],
    2022: [
      {
        title: 'Republican legislature splits Kansas City metro to dilute Democratic vote',
        detail: 'Governor Kelly (D) vetoes congressional maps drawn by the Republican supermajority legislature. The maps split the Kansas City metro area — dividing Wyandotte County (heavily Democratic) across two districts to prevent Democrats from consolidating their urban base. The Republican supermajority overrides the veto.',
      },
      {
        title: '⚖ League of Women Voters v. Schwab — veto override maps upheld',
        detail: 'Plaintiffs challenge the maps in Kansas state court under the Kansas Constitution, arguing the split of the Kansas City metro area constitutes an unconstitutional partisan gerrymander. Kansas courts ultimately uphold the maps. Democrats nonetheless win the 3rd District in 2022 and 2024 under maps drawn to disadvantage them — reflecting the accelerating Democratic trend in the Johnson County suburbs.',
      },
    ],
  },

  KY: {
    1992: [
      {
        title: 'Democrats draw maps in a still-blue Kentucky',
        detail: 'Governor Jones (D) and a Democratic legislature draw maps after Kentucky retains 6 seats. Kentucky\'s congressional delegation is majority-Democratic heading into the 1990s — the state\'s full shift to Republicans in federal elections is still a decade away.',
      },
      {
        title: 'Democrats hold 4 of 6 seats; eastern Kentucky coal country is competitive',
        detail: 'The Democrat-drawn maps produce a 4-2 Democratic delegation in 1992. Eastern Kentucky\'s coal mining communities — historically the most reliably Democratic region in the South, rooted in the New Deal — return a Democratic incumbent in the 5th District even as the state\'s presidential vote shifts Republican. The unraveling of this Democratic coalition accelerates through the 1990s.',
      },
    ],
    2002: [
      {
        title: 'Split government in an increasingly competitive state',
        detail: 'Governor Patton (D) and a split legislature (Democratic House, Republican Senate) draw maps after Kentucky retains 6 seats. Negotiated maps split the delegation roughly along incumbent-protection lines.',
      },
      {
        title: 'Democrats retain 4 seats but rural eastern Kentucky begins flipping',
        detail: 'Despite Democrat-drawn maps, Republicans make gains in eastern Kentucky as coal country voters align with Republicans in federal races. By 2010, Republicans have won 5 of 6 seats as the final white working-class Democratic strongholds in Appalachian Kentucky shift away from the party.',
      },
    ],
    2012: [
      {
        title: 'Split government persists; maps favor incumbents',
        detail: 'Governor Beshear (D) and a split legislature (Democratic House, Republican Senate) draw maps after Kentucky retains 6 seats. Republicans hold the Senate and control the most important chamber for redistricting. Maps produce a 5-1 Republican delegation in a state Romney won by 23 points.',
      },
      {
        title: 'Louisville anchors the single Democratic district',
        detail: 'The 3rd District (Louisville) is the only safe Democratic seat in Kentucky under both the 2012 and 2022 maps. John Yarmuth holds the seat from 2006 until his retirement in 2022. Louisville\'s congressional seat reflects the urban-rural partisan divide in a state that has become one of the most reliably Republican at the federal level.',
      },
    ],
    2022: [
      {
        title: 'Republicans seize full control and override Democratic governor',
        detail: 'Republicans won the Kentucky House in 2016, giving them full legislative control. Governor Beshear (D) vetoes congressional maps drawn by the Republican supermajority General Assembly, which split Louisville across multiple districts to dilute its Democratic lean. The legislature overrides the veto.',
      },
      {
        title: 'Louisville split across three districts',
        detail: 'The Republican maps divide Louisville — Kentucky\'s only large urban center and a reliably Democratic city — across the 2nd, 3rd, and 4th congressional districts. The 3rd District (which had elected a Democrat since 1974) is redrawn to include Republican-leaning suburbs. Democrats retain the Louisville core but lose influence in surrounding suburbs.',
      },
    ],
  },

  LA: {
    1992: [
      {
        title: 'VRA requires majority-Black district; unusual shape results',
        detail: 'Governor Edwards (D) and a Democratic legislature draw maps after Louisiana retains 7 seats. The Voting Rights Act requires creation of majority-Black districts. The resulting 4th District runs along the I-49 corridor from Shreveport to Alexandria — an unusual shape connecting dispersed Black population centers.',
      },
      {
        title: '⚖ United States v. Hays — district\'s shape challenged',
        detail: 'Plaintiffs challenge the 4th District\'s unusual shape as an unconstitutional racial gerrymander in United States v. Hays (1995). SCOTUS dismisses for lack of standing, but the challenge forces a redraw. The replacement district is somewhat more compact while remaining majority-Black.',
        url: 'https://supreme.justia.com/cases/federal/us/515/737/',
      },
    ],
    2002: [
      {
        title: 'Democratic legislature maintains maps; state retains 7 seats',
        detail: 'Governor Foster (R) and a Democratic-controlled legislature draw maps after Louisiana retains 7 seats. Democrats hold both chambers and control the process, maintaining a delegation that mixes majority-Black districts with competitive suburban seats.',
      },
      {
        title: 'Louisiana\'s political realignment accelerates during the cycle',
        detail: 'Despite Democrat-drawn maps, Louisiana\'s congressional delegation shifts markedly rightward over the decade. By 2004, Republicans hold 5 of 7 seats, reflecting the broader white conservative realignment in Deep South states. The 2nd District (New Orleans, majority-Black) and the 5th District (northern Louisiana) are the only seats with Democratic competition.',
      },
    ],
    2012: [
      {
        title: 'Louisiana loses 1 seat; Republicans take control',
        detail: 'The 2010 census reduces Louisiana\'s delegation from 7 to 6. Republicans win control of the state legislature in the 2010 elections for the first time in modern Louisiana history. Governor Jindal (R) and the new Republican majority draw the maps, producing a 5-1 Republican delegation.',
      },
      {
        title: 'New Orleans\' majority-Black 2nd District preserved under VRA',
        detail: 'The Republican maps preserve the majority-Black 2nd District anchored in New Orleans, satisfying Voting Rights Act requirements. Cedric Richmond wins the seat in 2010 and holds it through 2021. The remaining five districts are drawn as reliable Republican seats across suburban and rural Louisiana.',
      },
    ],
    2022: [
      {
        title: 'Governor Edwards (D) vetoes Republican maps with single majority-Black district',
        detail: 'Governor Edwards (D) vetoes congressional maps drawn by the Republican supermajority legislature. The maps contain only one majority-Black district despite Black Louisianans comprising 33% of the population — sufficient under the Gingles framework to sustain a second majority-Black district. The legislature overrides the veto.',
      },
      {
        title: '⚖ Robinson v. Ardoin — VRA orders second majority-Black district',
        detail: 'A federal district court rules in Robinson v. Ardoin that Louisiana\'s maps likely violate Section 2 of the Voting Rights Act by failing to draw a second majority-Black district. Following Allen v. Milligan (2023), the court orders Louisiana to redraw its maps. Remedial maps for 2024 create a second majority-Black district in the Shreveport–Baton Rouge corridor, producing a 2-4 Democratic-Republican split.',
        url: 'https://www.naacpldf.org/case-issue/robinson-v-ardoin/',
      },
    ],
    2024: [
      {
        title: 'Cleo Fields returns to Congress in newly drawn CD-6',
        detail: 'The Louisiana legislature passes SB 8 (signed January 2024) under court deadline, creating a second majority-Black district — CD-6 — running from Shreveport through Alexandria and Lafayette to Baton Rouge. Cleo Fields (D) wins the seat, returning to Congress three decades after his earlier term (1993–1997), which was itself won in a VRA-mandated majority-Black district that was subsequently dismantled by litigation. Louisiana\'s delegation becomes 2D-4R.',
      },
      {
        title: '⚖ Louisiana v. Callais — SCOTUS weighs whether VRA compliance violates the 14th Amendment',
        detail: 'White voters file Callais v. Landry arguing SB 8 is an unconstitutional racial gerrymander under the Equal Protection Clause. The Supreme Court accepts Louisiana v. Callais (No. 24-109) and on June 27, 2025 orders reargument, signaling the justices are divided over whether creating majority-minority districts to satisfy VRA Section 2 can itself violate the Constitution. Louisiana\'s 2026 congressional map remains uncertain pending a final ruling.',
        url: 'https://www.scotusblog.com/case-files/cases/louisiana-v-callais/',
      },
    ],
  },

  MA: {
    1992: [
      {
        title: 'Massachusetts loses 1 seat after the 1990 census',
        detail: 'The 1990 census reduces the delegation from 11 to 10. Republican governor Weld and a heavily Democratic legislature must negotiate a new 10-district map. Democrats control the process; the maps are designed to protect all 10 incumbents.',
      },
      {
        title: 'Democratic legislature draws maps over Republican governor\'s objections',
        detail: 'Governor Weld (R) objects to the partisan nature of the Democratic maps but cannot veto them under the legislative redistricting process. Democrats retain control of all 10 seats after the 1992 elections — the first cycle Massachusetts sends an entirely Democratic congressional delegation.',
      },
      {
        title: 'Massachusetts has not sent a Republican to Congress since 1994',
        detail: 'The last Republican elected to a Massachusetts congressional seat was Peter Blute (MA-3) in 1994, who lost his reelection in 1996. Since 1996, Massachusetts has maintained an entirely Democratic congressional delegation — the longest unbroken Democratic delegation of any state with more than 2 seats.',
      },
    ],
    2002: [
      {
        title: 'Massachusetts retains 10 seats; split government',
        detail: 'Massachusetts retains 10 seats after the 2000 census. Acting Governor Swift (R) and a heavily Democratic legislature draw maps. The Democratic-controlled legislature drives the process, producing maps that protect all incumbents. Massachusetts has not sent a Republican to Congress since 1994.',
      },
      {
        title: 'Boston-area districts drawn to maximize Democratic performance',
        detail: 'The 8th, 9th, and 10th Districts in the Boston metropolitan area are redrawn to cluster Democratic voters efficiently. No Republican comes close to winning any of the 10 seats during the decade — the delegation is 10-0 Democratic through every election from 2002 through 2010.',
      },
    ],
    2012: [
      {
        title: 'Massachusetts loses 1 more seat after the 2010 census',
        detail: 'The 2010 census reduces the delegation from 10 to 9. Governor Patrick (D) and a Democratic legislature draw maps. With only Democrats in the delegation, the redistricting is primarily about which communities are grouped together — no Republican interests to balance.',
      },
      {
        title: 'Maps are uncontested; process is unusually smooth',
        detail: 'The Democratic-controlled process produces relatively uncontroversial maps. No major litigation follows. Massachusetts becomes one of the few states in the 2012 cycle without a redistricting court case.',
      },
      {
        title: 'Scott Brown\'s 2010 Senate upset does not affect congressional redistricting',
        detail: 'Republican Scott Brown\'s January 2010 special election upset victory to fill Ted Kennedy\'s Senate seat creates a national sensation but has no effect on the congressional redistricting process, which is entirely controlled by the Democratic legislature. Brown loses his Senate seat to Elizabeth Warren in November 2012.',
      },
    ],
    2022: [
      {
        title: 'Massachusetts retains 9 seats; split government again',
        detail: 'Massachusetts retains 9 seats after the 2020 census. Republican governor Baker and a heavily Democratic legislature draw maps. The Democratic legislature controls the process; maps preserve a solidly Democratic delegation in a state Biden won by 33 points.',
      },
      {
        title: 'Maps adjusted to address growing Hispanic communities',
        detail: 'The 2022 redistricting process includes attention to Massachusetts\'s growing Latino populations in Lawrence, Lowell, and Worcester. The Democratic legislature redesigns district boundaries in the Merrimack Valley and central Massachusetts to reflect demographic changes from the 2020 census, though no seat changes party.',
      },
    ],
  },

  ME: {
    1992: [
      {
        title: 'Bipartisan commission process in a competitive two-district state',
        detail: 'Governor McKernan (R) and a Democratic legislature oversee Maine\'s bipartisan apportionment commission. Maine retains 2 seats. The two districts divide the state between urban southern Maine (ME-1, Portland/Biddeford) and rural northern Maine (ME-2, Augusta/Bangor).',
      },
      {
        title: 'Maine adopts congressional district Electoral College allocation in 1972 — first used in 1972',
        detail: 'Maine is one of only two states to award Electoral College votes by congressional district rather than winner-take-all — a system adopted in 1969 and first used in 1972. The practical effect of the split-allocation system is not realized until ME-2 awards its single electoral vote to Barack Obama in 2008, making the rural northern Maine district a national focus in close presidential elections.',
      },
    ],
    2002: [
      {
        title: 'Independent governor Angus King oversees redistricting',
        detail: 'Governor King (I) — an independent who won two terms — and a Democratic legislature oversee the redistricting process. Maine retains 2 seats after the 2000 census. Maine\'s bipartisan commission draws maps with minimal controversy. The 2nd District covers nearly 80% of the state\'s land area.',
      },
      {
        title: 'ME-2 is the largest congressional district east of the Mississippi River',
        detail: 'The 2nd District covering central, western, and northern Maine is the largest congressional district by land area east of the Mississippi — spanning more than 26,000 square miles of forests, potato farms, paper mill towns, and the Canadian border. Its sparse, predominantly white working-class population made it reliably Democratic through the 1990s before shifting sharply toward Republicans.',
      },
    ],
    2012: [
      {
        title: 'Governor LePage and split government draw maps',
        detail: 'Governor LePage (R) and a split legislature draw maps after Maine retains 2 seats. LePage, one of the most controversial governors in Maine history, has limited redistricting impact given the small delegation. Maps preserve the basic urban/rural split.',
      },
      {
        title: 'Maine adopts ranked-choice voting via citizen initiative',
        detail: 'Maine voters approve Question 5 in 2016, instituting ranked-choice voting for all federal primary and general elections — the first state in the nation to do so. This does not affect district lines but transforms how winners are determined in competitive ME-2 races.',
      },
    ],
    2022: [
      {
        title: 'Democratic governor and legislature draw maps for the first time',
        detail: 'Governor Mills (D) and a Democratic legislature draw maps after Maine retains 2 seats. Maine\'s unique congressional district Electoral College allocation makes ME-2 (rural northern Maine) a perennial presidential battleground — Trump won it in 2016 and 2020, while ME-1 voted for Clinton and Biden by large margins.',
      },
      {
        title: 'ME-2 becomes the premier rural-white-working-class battleground in New England',
        detail: 'Under the 2022 maps, ME-2 represents the most Democratic-accessible rural Republican district in the country — a seat Biden lost by 7 points but where Democrat Jared Golden (a pro-gun, anti-abortion-rights moderate) consistently wins by significant margins. Golden\'s ability to win ME-2 while Maine\'s Electoral College vote goes to Republicans illustrates how candidate quality and incumbency can overcome partisan geography in small states.',
      },
    ],
  },

  MO: {
    1992: [
      {
        title: 'Republican governor, Democratic legislature split control',
        detail: 'Governor Ashcroft (R) and a Democratic-controlled General Assembly draw maps after Missouri retains 9 seats from the 1990 census. Split government produces relatively neutral incumbent-protection maps maintaining the 6-3 Democratic delegation.',
      },
      {
        title: 'Missouri elects one of the most competitive delegations of the cycle',
        detail: 'The negotiated maps reflect Missouri\'s genuinely competitive political balance of the early 1990s — a state that voted for Nixon, Reagan, and Bush at the presidential level while electing Democratic senators and representatives. Democrats win 6 of 9 seats in 1992, but several seats are highly competitive. Missouri loses this competitive balance over the following two decades.',
      },
    ],
    2002: [
      {
        title: 'Narrowly split government draws maps; Missouri retains 9 seats',
        detail: 'Governor Holden (D) and a narrowly divided legislature draw maps after Missouri retains 9 seats. Democrats held a slim House majority during the redistricting process, but Republicans gained control of the House in the 2002 elections — the cycle\'s maps were drawn by a legislature in transition.',
      },
      {
        title: 'Delegation flips to 5-4 Republican as rural Missouri shifts right',
        detail: 'Despite maps drawn under partly Democratic control, Missouri\'s rapid rural realignment produces a 5-4 Republican delegation by 2002 — reflecting the same political trend as Tennessee, Arkansas, and other mid-South states where rural white voters shift decisively toward Republicans in federal races.',
      },
    ],
    2012: [
      {
        title: 'Missouri loses 1 seat after the 2010 census',
        detail: 'The 2010 census reduces Missouri\'s delegation from 9 to 8. Republican supermajorities win both chambers in the 2010 wave. Governor Nixon (D) faces a Republican legislature with veto-override capability.',
      },
      {
        title: 'Republican legislature draws a 6-2 map; governor signs',
        detail: 'Republicans draw maps producing a 6-2 Republican delegation in a state Obama lost by 10 points in 2012. Democrats are packed into the St. Louis-area 1st District and the Kansas City-area 5th District.',
      },
    ],
    2022: [
      {
        title: 'Republican supermajority draws maps; Missouri retains 8 seats',
        detail: 'Governor Parson (R) and a Republican supermajority legislature draw maps after Missouri retains 8 seats. Maps maintain a 6-2 Republican advantage. The Kansas City and St. Louis cores remain the two Democratic seats; rural and suburban Missouri is solidly Republican.',
      },
      {
        title: 'St. Louis and Kansas City packed into two safe Democratic districts',
        detail: 'Republicans draw both urban cores — St. Louis (MO-1, the 1st District) and Kansas City (MO-5, the 5th District) — as safely Democratic districts, wasting Democratic votes and allowing Republicans to run up large margins in the surrounding six districts. The strategy has produced a consistent 6-2 Republican delegation since 2012 despite Missouri\'s ongoing population loss.',
      },
    ],
  },

  MS: {
    1992: [
      {
        title: 'First Republican governor since Reconstruction faces Democratic legislature',
        detail: 'Governor Fordice (R) — the first Republican governor of Mississippi since Reconstruction, elected in 1991 — and a Democratic legislature draw maps. Mississippi retains 5 seats after the 1990 census. Democrats control both chambers and drive the redistricting process.',
      },
      {
        title: 'VRA requires majority-Black district; MS-2 is strengthened',
        detail: 'The 2nd District (Delta region) is drawn as a majority-Black district, electing Bennie Thompson in 1993 — the first Black congressman from Mississippi since John Roy Lynch in the 1880s. The remaining four districts are drawn as white-majority.',
      },
    ],
    2002: [
      {
        title: 'Mississippi loses 1 seat after the 2000 census',
        detail: 'The 2000 census reduces the delegation from 5 to 4. Governor Musgrove (D) and a Democratic legislature draw maps. The loss of a seat requires a full reorganization; the 2nd District (majority-Black Delta) is preserved.',
      },
      {
        title: 'Bennie Thompson wins the majority-Black 2nd District through the full cycle',
        detail: 'Bennie Thompson (D), who first won the 2nd District in a 1993 special election, retains the seat through the 2002 redistricting and all subsequent cycles. The 2nd District — covering the Mississippi Delta, the most heavily Black rural region in the country — is one of the most reliably Democratic districts in the South and the only safe Democratic congressional seat in Mississippi.',
      },
    ],
    2012: [
      {
        title: 'Republican governor, Democratic legislature — last Democratic maps',
        detail: 'Governor Barbour (R) and a Democratic legislature draw maps after Mississippi retains 4 seats. Democrats narrowly hold both chambers for the 2011 redistricting — but Republicans sweep both chambers in the November 2011 elections, ending over a century of Democratic legislative control in Mississippi.',
      },
      {
        title: 'Mississippi\'s 3-1 Republican delegation reflects the state\'s complete partisan realignment',
        detail: 'The maps produce a 3-1 Republican delegation in a state that was 4-1 Democratic in congressional seats as recently as the early 1990s. Mississippi\'s transformation — from the most reliably Democratic white-majority state to the most reliably Republican — is complete by this cycle. Black voters remain majority-Democratic; white voters are overwhelmingly Republican.',
      },
    ],
    2022: [
      {
        title: 'First Republican redistricting cycle in Mississippi',
        detail: 'Governor Reeves (R) and a Republican supermajority legislature draw maps after Mississippi retains 4 seats. Republicans produce a 3-1 Republican delegation. Black Mississippians — 38% of the population — continue to be represented by a single majority-Black district (MS-2), with critics arguing a second such district is achievable.',
      },
      {
        title: 'VRA Section 2 pressure echoes Allen v. Milligan but courts uphold Mississippi maps',
        detail: 'Following the Supreme Court\'s 2023 ruling in Allen v. Milligan — which required Alabama to draw a second majority-Black district — civil rights advocates argue Mississippi\'s maps similarly dilute Black voting strength. Mississippi\'s Black population (38%) is even larger than Alabama\'s relative to total population. Litigation proceeds but produces no court-ordered remedial maps before the 2024 elections.',
      },
    ],
  },

  MT: {
    1992: [
      {
        title: 'Montana loses 1 of 2 congressional seats after the 1990 census',
        detail: 'The 1990 census reduces Montana\'s delegation from 2 to 1, making it an at-large state. Montana joins North Dakota, South Dakota, Wyoming, Vermont, Delaware, and Alaska as states with a single at-large representative coterminous with the entire state.',
      },
      {
        title: 'Montana\'s at-large district spans 147,000 square miles',
        detail: 'As an at-large state, Montana\'s single congressional district encompasses all 147,000 square miles of the state — the largest congressional district by area in the contiguous United States during the 1992–2020 period. Ron Marlenee loses his seat as the two districts merge; Pat Williams (D) wins the at-large seat in 1992 but Republican Rick Hill wins it in 1996, beginning a long stretch of Republican dominance.',
      },
    ],
    2022: [
      {
        title: 'Montana regains a second congressional seat after 30 years',
        detail: 'The 2020 census restores Montana\'s second congressional seat — its first two-district map since 1992. Governor Gianforte (R) and a Republican supermajority legislature draw the new map.',
      },
      {
        title: 'Republicans draw a western seat and a rural eastern seat',
        detail: 'The new MT-1 covers western Montana (Missoula, Helena, Kalispell) — the more Democratic half of the state — while MT-2 covers the eastern plains (Billings, Great Falls). Republicans draw both districts to lean Republican; Democrats are competitive in MT-1 in favorable environments.',
      },
    ],
  },

  NE: {
    1992: [
      {
        title: 'Unicameral legislature draws nonpartisan maps',
        detail: 'Nebraska\'s unique unicameral, officially nonpartisan legislature draws congressional maps after Nebraska retains 3 seats. In practice the legislature leans conservative, and maps maintain a 3-0 Republican delegation.',
      },
      {
        title: 'Nebraska adopts congressional district Electoral College allocation',
        detail: 'Nebraska (along with Maine) awards Electoral College votes by congressional district rather than winner-take-all — two votes for the statewide winner, one each for the winner of each congressional district. This makes the 2nd District (Omaha) a perennial Electoral College battleground.',
      },
    ],
    2002: [
      {
        title: 'Unicameral legislature draws maps; Nebraska retains 3 seats',
        detail: 'Nebraska retains 3 seats after the 2000 census. Governor Johanns (R) works with the Republican-leaning legislature to draw maps maintaining a 3-0 Republican delegation. The Omaha-based 2nd District is redrawn to absorb more Republican suburban precincts.',
      },
      {
        title: 'Nebraska\'s unique Electoral College system makes NE-2 a national target',
        detail: 'Nebraska\'s congressional district Electoral College allocation — adopted in 1991 alongside Maine — makes the Omaha-based 2nd District one of the most politically significant individual congressional districts in the country during close presidential races. Both parties invest heavily in the district during presidential campaigns, knowing its single Electoral College vote could be decisive.',
      },
    ],
    2012: [
      {
        title: 'Nebraska retains 3 seats; 2nd District votes for Obama',
        detail: 'Nebraska retains 3 seats after the 2010 census. The Omaha-based 2nd District awarded its single Electoral College vote to Barack Obama in both 2008 and 2012, making it one of the most-watched individual congressional districts in presidential elections.',
      },
      {
        title: 'Republican legislature redraws 2nd District to reduce Democratic lean',
        detail: 'Republicans draw maps moving some Republican-leaning Sarpy County precincts into NE-2 and shifting Democratic-leaning Douglas County precincts out, attempting to reduce the district\'s Democratic lean. The 2nd District nonetheless remained competitive through subsequent cycles.',
      },
    ],
    2022: [
      {
        title: 'Nebraska retains 3 seats; 2nd District votes for Biden',
        detail: 'Nebraska retains 3 seats after the 2020 census. The Omaha-based 2nd District awards its Electoral College vote to Biden in 2020. Republicans again redraw the district to absorb more Republican-leaning suburbs; the district remains competitive.',
      },
      {
        title: 'Republican push to eliminate Nebraska\'s district-level Electoral College allocation',
        detail: 'After NE-2 awards its Electoral College vote to Biden in 2020, Nebraska Republicans push to eliminate the district-level allocation system and adopt winner-take-all. The change is blocked in the Nebraska unicameral legislature but resurfaces as a priority in subsequent sessions, reflecting the high national stakes of the single Omaha-area electoral vote.',
      },
    ],
  },

  NH: {
    1992: [
      {
        title: 'Republican legislature draws compact maps in a competitive state',
        detail: 'Governor Gregg (R) and a Republican-controlled General Court draw maps after New Hampshire retains 2 seats. New Hampshire\'s massive part-time citizen legislature (one of the largest deliberative bodies in the world) draws relatively simple county-based districts. Both seats are genuinely competitive in this era.',
      },
      {
        title: 'NH-1 covers Manchester/Nashua; NH-2 covers Concord and the western and northern regions',
        detail: 'New Hampshire\'s two districts follow a basic geographic split: NH-1 covers the urban southeastern corridor including Manchester and Nashua (historically mill towns with blue-collar Democratic voters), while NH-2 covers the western and northern regions including Concord, Keene, and the Lakes Region. Both seats swing between parties regularly through all four redistricting cycles.',
      },
    ],
    2002: [
      {
        title: 'Republican legislature maintains control; New Hampshire retains 2 seats',
        detail: 'Governor Shaheen (D) and a Republican-controlled legislature draw maps after New Hampshire retains 2 seats. The Republican legislature controls the process. New Hampshire\'s two seats split between a Republican-leaning 1st District (Manchester/southern NH) and a more competitive 2nd District (Concord/western NH).',
      },
      {
        title: 'New Hampshire\'s "live free or die" political culture produces genuine swing districts',
        detail: 'Unlike most states where redistricting produces safe seats for both parties, New Hampshire\'s compact geography and limited population make it nearly impossible to draw districts that reliably favor one party. Both seats change party control multiple times during the cycle — in 1994, 2002, 2006, 2008, and 2010 — making them among the most genuinely competitive seats in the nation.',
      },
    ],
    2012: [
      {
        title: 'Republican supermajority draws maps after 2010 wave',
        detail: 'Governor Lynch (D) and a Republican-controlled General Court — which swept to a supermajority in the 2010 wave — draw maps after New Hampshire retains 2 seats. The Republican legislature controls the process.',
      },
      {
        title: 'Both seats flip to Democratic in 2012, back to Republican in 2014',
        detail: 'New Hampshire\'s two congressional seats flip to Democrats in the 2012 Obama wave election — with Carol Shea-Porter (NH-1) and Annie Kuster (NH-2) both winning — then split in 2014 as Republicans recapture NH-1. The back-and-forth reflects New Hampshire\'s status as one of the nation\'s most genuinely competitive two-seat states.',
      },
    ],
    2022: [
      {
        title: 'Republican legislature draws new maps; both seats remain competitive',
        detail: 'Governor Sununu (R) and a Republican-controlled General Court draw maps after New Hampshire retains 2 seats. Both districts remain competitive; New Hampshire is one of the nation\'s premier swing states, regularly electing split partisan delegations.',
      },
      {
        title: 'New Hampshire\'s demographics shift toward Democrats as Massachusetts-origin migrants arrive',
        detail: 'New Hampshire\'s population grows substantially through migration from Massachusetts — a pattern that has gradually shifted the state from a moderate-Republican lean to a genuine tossup. Southern New Hampshire\'s Nashua and Manchester suburbs, in particular, absorb large numbers of Massachusetts transplants who register Democratic. Both congressional seats become marginally more Democratic-leaning through the 2022 cycle.',
      },
    ],
  },

  NM: {
    1992: [
      {
        title: 'Democratic legislature draws maps; New Mexico retains 3 seats',
        detail: 'Governor King (D) and a Democratic legislature draw maps after New Mexico retains 3 seats from the 1990 census. Maps produce a 2-1 Democratic delegation with a competitive 2nd District (southern NM) that swings between the parties.',
      },
      {
        title: 'NM-3 (northern New Mexico) drawn as a majority-Hispanic seat',
        detail: 'The 3rd District covering northern New Mexico is drawn as a majority-Hispanic district — one of the most reliably Democratic districts in the state, anchored by Santa Fe, Taos, and the largely Native American and Hispanic communities of the Rio Grande corridor. Bill Richardson wins the seat and holds it from 1983 until leaving for the Cabinet in 2002.',
      },
    ],
    2002: [
      {
        title: 'Libertarian governor Johnson faces Democratic legislature',
        detail: 'Governor Johnson (R), a fiscal conservative with libertarian leanings, faces a Democratic legislature. Democrats control the process and maintain a 2-1 Democratic delegation after New Mexico retains 3 seats.',
      },
      {
        title: 'New Mexico\'s 2nd District is the premier battleground seat in the state',
        detail: 'The 2nd District covering southern New Mexico (Las Cruces, Roswell, Hobbs) is one of the most competitive congressional districts in the Southwest — swinging between the parties multiple times between 1992 and 2022 as the district\'s mix of Hispanic, rural white, and oil-patch communities shifts with national political winds.',
      },
    ],
    2012: [
      {
        title: 'Republican governor faces Democratic legislature',
        detail: 'Governor Martinez (R) — the first Latina governor in US history — faces a Democratic legislature that controls redistricting. New Mexico retains 3 seats after the 2010 census. Democrats maintain 2 safe Democratic seats and 1 competitive Republican-leaning 2nd District.',
      },
      {
        title: 'New Mexico\'s growing Hispanic majority shapes the delegation',
        detail: 'New Mexico is the most Hispanic state in the nation by percentage. The 2012 maps reflect a majority-Hispanic population — all three districts have substantial Hispanic populations. Democratic dominance grows through the cycle as Hispanic voter registration and turnout trends Democratic, culminating in New Mexico becoming a reliably blue state by the 2020s.',
      },
    ],
    2022: [
      {
        title: 'Democrats draw aggressive 3-0 map',
        detail: 'Governor Lujan Grisham (D) and a Democratic legislature draw maps after New Mexico retains 3 seats. Democrats target all three seats, redrawing the traditionally Republican 2nd District (southern NM) to add Albuquerque suburbs and reduce its Republican lean.',
      },
      {
        title: '⚖ Republican challenge fails; 3-0 Democratic delegation elected',
        detail: 'Republicans challenge the maps in state court as an unconstitutional partisan gerrymander, but courts uphold them under New Mexico law. Democrats win all three seats in 2022, producing the state\'s first all-Democratic congressional delegation.',
      },
    ],
  },

  NV: {
    1992: [
      {
        title: 'Nevada gains 1 seat after the 1990 census',
        detail: 'The 1990 census gives Nevada a second congressional seat, reflecting its rapid population growth. Governor Miller (D) and a Democratic legislature draw the new 2-district map. NV-1 covers urban Las Vegas; NV-2 covers rural Nevada and Reno.',
      },
      {
        title: 'Nevada begins rapid transition from Republican to swing state',
        detail: 'Nevada voted Republican in every presidential election from 1952 through 1992 except 1964. The influx of union workers in the Las Vegas casino and construction industries through the 1980s and 1990s begins a demographic shift toward Democrats. NV-1 (Las Vegas) trends Democratic; NV-2 (rural Nevada) remains reliably Republican for the full cycle.',
      },
    ],
    2002: [
      {
        title: 'Nevada gains another seat — one of the fastest-growing states in the nation',
        detail: 'Nevada gains a third congressional seat after the 2000 census, reflecting continued explosive growth in the Las Vegas metro. Governor Guinn (R) and a split legislature (Democratic Senate, Republican Assembly) negotiate the new 3-district map. The new NV-3 covers suburban Henderson and Summerlin.',
      },
      {
        title: 'Split government produces a competitive 3-district map',
        detail: 'The split legislature produces a negotiated map. NV-1 (urban Las Vegas, heavily union) is a safe Democratic seat; NV-2 (northern Nevada and rural areas) is a safe Republican seat; NV-3 (suburban Las Vegas) is drawn as a competitive swing district that changes party control multiple times during the cycle.',
      },
    ],
    2012: [
      {
        title: 'Nevada gains a fourth seat — the fastest-growing state of the decade',
        detail: 'Nevada gains a fourth congressional seat after the 2010 census, one of only a handful of states to gain multiple seats across two consecutive censuses. Governor Sandoval (R) and a Democratic legislature draw the new 4-district map.',
      },
      {
        title: 'Democrats draw a map targeting 3 of 4 seats',
        detail: 'The Democratic-controlled legislature draws maps creating a new NV-4 (suburban Las Vegas/Henderson) as a Democratic-leaning seat. Democrats immediately win NV-4 in 2012, achieving a 3-1 Democratic delegation. Republicans challenge the maps but courts uphold them.',
      },
    ],
    2022: [
      {
        title: 'Democrats draw aggressive map to protect 3-seat advantage',
        detail: 'Governor Sisolak (D) and a Democratic legislature draw maps after Nevada retains 4 seats. Democrats draw maps protecting all three of their seats; Republicans challenge them in state court. All four districts remain highly competitive — Nevada is one of the nation\'s foremost swing states.',
      },
      {
        title: 'Nevada\'s union-driven demographics shape redistricting priorities',
        detail: 'Nevada\'s congressional districts are heavily shaped by the Las Vegas Culinary Workers Union (UNITE HERE Local 226), one of the most politically powerful local unions in the country. The union\'s membership — predominantly Hispanic, Black, and Asian American — drives Democratic turnout in NV-1 and NV-3, making Nevada one of the most diverse congressional delegations relative to its state population.',
      },
    ],
  },

  OK: {
    1992: [
      {
        title: 'Democrats draw maps in a still-blue Oklahoma',
        detail: 'Governor Walters (D) and a Democratic legislature draw maps after Oklahoma retains 6 seats from the 1990 census. Democrats hold all statewide offices and both legislative chambers. Despite Democratic mapmaking, Republicans begin winning congressional seats as the state\'s rural voters shift right.',
      },
      {
        title: 'Oklahoma\'s 5th District (Oklahoma City) is the premier swing seat',
        detail: 'The 5th District covering Oklahoma City and surrounding suburbs is drawn as the state\'s most competitive seat in 1992. It switches between the parties multiple times during the decade as Oklahoma City\'s suburban voters shift from moderate Democrats to Republicans. By 1994, Republicans have won 5 of 6 Oklahoma congressional seats — a rapid reversal of the Democratic maps\' intended effect.',
      },
    ],
    2002: [
      {
        title: 'Oklahoma loses 1 seat after the 2000 census',
        detail: 'The 2000 census reduces Oklahoma\'s delegation from 6 to 5. Governor Keating (R) and a split legislature (Democratic Senate, Republican House) negotiate a new 5-district map. Republicans hold the House and drive the process.',
      },
      {
        title: 'Maps produce a 4-1 Republican delegation',
        detail: 'The new 5-district map produces a 4-1 Republican delegation as Oklahoma\'s congressional realignment accelerates. The lone Democratic seat (OK-2, eastern Oklahoma) reflects the rural white Democratic voters who had not yet fully realigned — a transition completed by the 2010 elections.',
      },
    ],
    2012: [
      {
        title: 'Republican supermajority draws maps; Oklahoma retains 5 seats',
        detail: 'Governor Fallin (R) and a Republican supermajority legislature draw maps after Oklahoma retains 5 seats. Republicans produce a 5-0 delegation. Oklahoma becomes one of the most reliably Republican congressional delegations in the nation.',
      },
      {
        title: 'Oklahoma City and Tulsa split across districts to dilute urban Democratic votes',
        detail: 'Republicans draw maps that divide Oklahoma City across the 3rd, 4th, and 5th Districts — preventing the city\'s growing Democratic and minority voter base from consolidating into a competitive seat. Tulsa is similarly divided between the 1st and 2nd Districts. The result is a 5-0 Republican delegation despite Oklahoma City and Tulsa becoming increasingly diverse.',
      },
    ],
    2022: [
      {
        title: 'Republican supermajority maintains 5-0 delegation',
        detail: 'Governor Stitt (R) and a Republican supermajority legislature draw maps after Oklahoma retains 5 seats. Maps maintain a 5-0 Republican delegation in a state Trump won by 33 points in 2020.',
      },
      {
        title: 'Tribal sovereignty complicates redistricting after McGirt v. Oklahoma',
        detail: 'The Supreme Court\'s 2020 McGirt v. Oklahoma ruling — which held that much of eastern Oklahoma remains Indian Country for purposes of federal criminal law — creates novel redistricting questions. The decision does not directly affect congressional district lines, but it raises questions about Native American political representation in eastern Oklahoma\'s 2nd District, which covers most of the Five Civilized Tribes\' treaty territory.',
      },
    ],
  },

  OR: {
    1992: [
      {
        title: 'Split government deadlocks; court draws the map',
        detail: 'Governor Roberts (D) and a split legislature (Republican Senate, Democratic House) cannot agree on a congressional map. Oregon retains 5 seats after the 1990 census. A Marion County Circuit Court draws the congressional map for the first time — beginning a streak of court-drawn maps that would span two consecutive cycles.',
      },
      {
        title: 'Court-drawn map produces a competitive 4-1 Democratic delegation',
        detail: 'The court-drawn map produces a 4-1 Democratic delegation as Oregon leans Democratic in the Clinton wave of 1992. The 5th District (Salem/mid-Willamette Valley) is the most competitive seat — a perennial battleground that changes party control multiple times over the following two decades.',
      },
    ],
    2002: [
      {
        title: 'Split government deadlocks again; court draws maps for second consecutive cycle',
        detail: 'Governor Kitzhaber (D) and a split legislature again fail to agree on a congressional map after Oregon retains 5 seats. A Marion County Circuit Court draws the maps for the second consecutive redistricting cycle — one of only a handful of states in modern history to have court-drawn congressional maps in back-to-back decades.',
      },
      {
        title: 'OR-5 (Salem/mid-valley) is the nation\'s most reliably competitive district',
        detail: 'The court-drawn maps preserve the competitive nature of the 5th District — it changes party hands in 1994, 2000, 2002, 2004, 2006, and 2008, making it one of the most frequently contested seats in the country. Republican Darlene Hooley holds it from 1996 to 2009, then passes it to Democrat Kurt Schrader.',
      },
    ],
    2012: [
      {
        title: 'Democrats draw maps for first time in decades',
        detail: 'Governor Kitzhaber (D) and a Democratic-controlled legislature draw congressional maps for the first time since the 1980s. Oregon retains 5 seats after the 2010 census. Democrats produce a 4-1 Democratic delegation, drawing the 5th District (Salem/Willamette Valley) as a competitive Democratic-lean seat.',
      },
      {
        title: 'Eastern Oregon\'s 2nd District — the largest by area in the contiguous US',
        detail: 'The 2nd District covering eastern Oregon is the largest congressional district by land area in the contiguous United States, spanning more than 69,000 square miles — larger than Washington state. Its enormous rural ranching and agricultural expanse is solidly Republican; the district has been held by Republicans continuously since 1994.',
      },
    ],
    2022: [
      {
        title: 'Oregon gains 1 seat; Democrats draw aggressive 5-1 map',
        detail: 'Oregon gains a sixth congressional seat after the 2020 census — its first new seat since the 1980s. Governor Brown (D) and a Democratic legislature draw maps targeting 5 of 6 seats. The new OR-6 is drawn as a competitive Democratic-lean district covering the Salem–Willamette Valley corridor.',
      },
      {
        title: 'Nonpartisan reform measure narrowly fails',
        detail: 'Measure 113 — a ballot initiative to create an independent redistricting commission — fails narrowly in 2022, leaving Oregon\'s legislature in control of redistricting for future cycles. Oregon is one of the few states to put redistricting reform directly to voters and reject it.',
      },
    ],
  },

  RI: {
    1992: [
      {
        title: 'Democratic legislature draws maps; Rhode Island retains 2 seats',
        detail: 'Governor Sundlun (D) and a Democratic legislature draw maps after Rhode Island retains 2 seats — though just barely, coming very close to losing one seat in the 1990 reapportionment. Rhode Island uses a bipartisan Reapportionment Commission, but Democrats dominate the process.',
      },
      {
        title: 'Rhode Island\'s 1st and 2nd Districts reflect Providence-vs.-suburbs divide',
        detail: 'RI-1 covers the urban core of Providence, Pawtucket, and the densely populated northeastern cities — the most Democratic part of the state. RI-2 covers the western and southern suburbs of Providence plus the rural southwestern corner — somewhat more competitive but reliably Democratic by the 1990s. Both seats are safely Democratic for the full cycle.',
      },
    ],
    2002: [
      {
        title: 'Rhode Island retains 2 seats despite declining population',
        detail: 'Governor Almond (R) and a Democratic legislature draw maps after Rhode Island retains 2 seats following the 2000 census, again narrowly avoiding a loss. The maps are drawn primarily to protect incumbents in one of the nation\'s smallest and most reliably Democratic states.',
      },
      {
        title: 'Rhode Island has not sent a Republican to Congress since 1994',
        detail: 'Ronald Machtley held RI-1 through 1994, when he left to run for governor. Patrick Kennedy (D) won the open seat, beginning a Democratic monopoly on both Rhode Island congressional seats that has continued unbroken. The state\'s strong union tradition, large Catholic and minority populations, and small size make it one of the most reliably Democratic delegations among states with 2 or more seats.',
      },
    ],
    2012: [
      {
        title: 'Independent governor; Democratic legislature draws maps',
        detail: 'Governor Chafee (a former Republican running as an independent) and a Democratic General Assembly draw maps after Rhode Island retains 2 seats following the 2010 census. Rhode Island has not sent a Republican to Congress since 1994.',
      },
      {
        title: 'Rhode Island nearly loses a seat again — population declines continue',
        detail: 'Rhode Island\'s population continues to stagnate relative to the nation, again coming close to losing one of its two congressional seats in the 2010 reapportionment. The state retains both seats but the close call reflects Providence\'s ongoing population loss, high unemployment, and pension crisis that define Rhode Island politics through the decade.',
      },
    ],
    2022: [
      {
        title: 'Reapportionment Commission draws uncontested maps',
        detail: 'Governor McKee (D) and a Democratic legislature oversee the Reapportionment Commission. Rhode Island retains 2 seats after the 2020 census. Maps are relatively uncontested — both districts are safely Democratic, and no major litigation follows.',
      },
      {
        title: 'Providence\'s growing Hispanic population reshapes RI-1',
        detail: 'Providence has become one of the most diverse mid-sized cities in New England, with large Hispanic (primarily Dominican and Guatemalan) and Cape Verdean populations. The 2022 maps draw RI-1 to encompass more of Providence\'s diverse communities, though the seat remains safely Democratic. Gabe Amo wins RI-1 in 2023 as the first Black congressperson from Rhode Island.',
      },
    ],
  },

  SC: {
    1992: [
      {
        title: 'VRA creates South Carolina\'s first majority-Black district since Reconstruction',
        detail: 'Governor Campbell (R) and a Democratic legislature draw maps after South Carolina retains 6 seats. The Voting Rights Act requires creation of a majority-Black congressional district. SC-6 is drawn in the Low Country and Pee Dee regions, producing South Carolina\'s first Black congressman (James Clyburn) since Reconstruction.',
      },
      {
        title: 'Jim Clyburn wins the new majority-Black 6th District',
        detail: 'James Clyburn wins the newly drawn 6th District in 1992, beginning a congressional career that would last more than three decades. The 6th District links African American communities in Columbia, Florence, and the Low Country — a geographic configuration maintained across all subsequent redistricting cycles. South Carolina had gone more than 90 years without Black congressional representation.',
      },
    ],
    2002: [
      {
        title: 'Republican legislature draws maps as the state shifts',
        detail: 'Governor Hodges (D) faces a Republican-controlled legislature that drives the redistricting process. South Carolina retains 6 seats after the 2000 census. Republicans draw maps producing a 4-2 Republican delegation while preserving the majority-Black 6th District.',
      },
      {
        title: 'South Carolina\'s rapid Republican realignment locks in during this cycle',
        detail: 'South Carolina is one of the few Southern states where Republicans seized legislative control before the 2010 wave. Republicans win both chambers of the General Assembly in 1994 and maintain that control through all subsequent redistricting cycles. The resulting maps consolidate a 4-2, then 5-1, then 6-1 Republican advantage as the state\'s population grows and Democratic voters are confined to the majority-Black 6th District.',
      },
    ],
    2012: [
      {
        title: 'South Carolina gains 1 seat after the 2010 census',
        detail: 'The 2010 census gives South Carolina a 7th congressional seat, reflecting its rapid population growth. Governor Haley (R) and a Republican supermajority legislature draw the new map.',
      },
      {
        title: 'Republicans draw 7th District as safe Republican seat',
        detail: 'The new SC-7 covers the Myrtle Beach coast and Horry County — among the fastest-growing areas in the state and reliably Republican. Maps produce a 6-1 Republican delegation; the lone Democratic seat (SC-6) is the majority-Black Low Country district held by Jim Clyburn.',
      },
    ],
    2022: [
      {
        title: 'Republican supermajority draws maps as South Carolina retains 7 seats',
        detail: 'Governor McMaster (R) and a Republican supermajority legislature draw maps after South Carolina retains 7 congressional seats following the 2020 census. Republicans target a 6-1 delegation — preserving only the majority-Black 6th District (Jim Clyburn) while drawing the remaining six seats to lean Republican.',
      },
      {
        title: '⚖ Alexander v. South Carolina State Conference of the NAACP — SCOTUS upholds maps',
        detail: 'Plaintiffs challenge SC-1 (Charleston area) as an unconstitutional racial gerrymander, arguing Republicans cracked the Black community in North Charleston to dilute its voting power. The Supreme Court rules 6-3 in Alexander v. SCSCON (May 2023) that the district is not an unconstitutional racial gerrymander, applying a strong presumption of legislative good faith and holding that plaintiffs did not rebut the presumption that race was not the predominant factor. Justice Jackson\'s dissent accuses the majority of making racial gerrymandering nearly impossible to prove.',
        url: 'https://www.supremecourt.gov/opinions/22pdf/21-1406_g31j.pdf',
      },
    ],
  },

  TN: {
    1992: [
      {
        title: 'Democrats draw maps in a competitive Tennessee',
        detail: 'Governor McWherter (D) and a Democratic legislature draw maps after Tennessee retains 9 seats from the 1990 census. Tennessee is still genuinely competitive at the federal level in the early 1990s — the state elected Democrat Al Gore to the Senate and had a mixed congressional delegation.',
      },
      {
        title: 'Maps protect Democratic incumbents while the state begins shifting right',
        detail: 'The Democrat-drawn maps protect all Democratic incumbents while drawing Memphis (TN-9) and Nashville (TN-5) as safe Democratic anchor seats. The remaining seven districts span the rural and suburban areas of the state. Democrats win 6 of 9 seats in 1992, but the delegation begins eroding toward Republicans in subsequent elections as the state\'s rural white voters realign.',
      },
    ],
    2002: [
      {
        title: 'Republican governor, Democratic legislature produce split maps',
        detail: 'Governor Sundquist (R) and a Democratic-controlled legislature draw maps after Tennessee retains 9 seats. Democrats hold both chambers and drive the redistricting process, maintaining maps that produce a 5-4 Democratic delegation heading into 2002.',
      },
      {
        title: 'Tennessee\'s political realignment accelerates through the decade',
        detail: 'Despite Democrat-drawn maps designed to protect Democratic incumbents, the Tennessee delegation shifts dramatically through the cycle. By 2008, Republicans have won 7 of 9 seats as rural and small-town Democratic voters fully realign toward Republicans in federal races. Al Gore loses his home state in the 2000 presidential election — the first Democratic presidential candidate to do so in modern history.',
      },
    ],
    2012: [
      {
        title: 'Republicans sweep to power after 2010 wave',
        detail: 'Governor Haslam (R) and a Republican supermajority legislature — which won both chambers in 2010 for the first time — draw maps after Tennessee retains 9 seats. Republicans draw a 7-2 delegation, packing Democrats into Memphis (TN-9) and Nashville (TN-5).',
      },
      {
        title: 'Two safe Democratic seats reflect Tennessee\'s urban-rural divide',
        detail: 'The Republican maps concentrate Democratic voters into the Memphis (TN-9) and Nashville (TN-5) districts — both majority-minority, majority-urban seats. Every other district is drawn to lean Republican by comfortable margins. The 5th District (Nashville) elects Jim Cooper, who wins for the final time in 2020 before the district is redrawn in 2022.',
      },
    ],
    2022: [
      {
        title: 'Republican supermajority maintains 7-2 delegation',
        detail: 'Governor Lee (R) and a Republican supermajority legislature draw maps after Tennessee retains 9 seats. Maps maintain a 7-2 Republican advantage. Memphis and Nashville remain the two Democratic seats.',
      },
      {
        title: 'Republicans subsequently split Nashville across 3 congressional districts',
        detail: 'In 2023 — after the cycle\'s congressional maps were already in place — Republican legislators redrew state legislative district lines to split Nashville\'s core across three different congressional districts (TN-5, TN-6, and TN-7), dispersing the city\'s Democratic voters into Republican-leaning surrounding areas. Critics called it the most aggressive mid-decade urban gerrymander in modern Tennessee history.',
      },
    ],
  },

  UT: {
    1992: [
      {
        title: 'Republican legislature draws maps in a heavily Republican state',
        detail: 'Governor Leavitt (R) and a Republican legislature draw maps after Utah retains 3 seats from the 1990 census. Utah is one of the most Republican states in the nation; maps produce a 3-0 Republican delegation.',
      },
      {
        title: 'Salt Lake City\'s 2nd District is Utah\'s sole competitive seat',
        detail: 'The 2nd District covering Salt Lake City and its immediate suburbs is the only seat with genuine partisan competition during the 1990s. Democrat Bill Orton holds the 3rd District (Utah County/Provo) through 1996 before losing to a Republican — reflecting the state\'s overwhelming tilt toward Republicans. Salt Lake City itself trends Democratic but is not yet large enough to dominate a full congressional district.',
      },
    ],
    2002: [
      {
        title: 'Utah comes within 857 people of gaining a 4th seat',
        detail: 'Utah retains 3 seats after the 2000 census — but misses gaining a fourth seat by only 857 people. Frustrated Republican leaders press Congress for a remedy; a bill passes the House that would have added one seat to Utah (and one to Washington D.C. to maintain partisan balance) but dies in the Senate.',
      },
      {
        title: 'Census counting controversy — overseas missionaries excluded from Utah\'s count',
        detail: 'Utah officials argue that the Census Bureau improperly excluded Mormon missionaries serving overseas from Utah\'s population count, which would have given Utah a fourth seat. Federal courts reject the challenge, ruling that the Census Bureau\'s methodology is within its discretion. The episode reflects the political significance of reapportionment arithmetic and the lobbying that surrounds it.',
      },
    ],
    2012: [
      {
        title: 'Utah gains a 4th seat after the 2010 census',
        detail: 'The 2010 census gives Utah a fourth congressional seat. Governor Herbert (R) and a Republican legislature draw the new map.',
      },
      {
        title: 'Salt Lake City divided four ways to dilute Democratic vote',
        detail: 'Republicans draw maps that split Salt Lake City — the state\'s only significant urban Democratic base — across all four congressional districts. Each district includes a slice of Salt Lake City plus large expanses of Republican-dominated rural Utah, ensuring that urban Democratic voters cannot elect a representative. The strategy prevents Salt Lake County from having a congressman who represents the city\'s interests.',
      },
    ],
    2022: [
      {
        title: 'Republican maps maintain Salt Lake City-splitting strategy',
        detail: 'Governor Cox (R) and a Republican legislature draw maps after Utah retains 4 seats. Republicans maintain the four-way split of Salt Lake City. The 4th District (South Salt Lake/Provo suburbs) is redrawn to be slightly more Republican-leaning after it came close to electing a Democrat in 2018.',
      },
      {
        title: '⚖ League of Women Voters v. Utah — maps upheld',
        detail: 'The League of Women Voters and other plaintiffs challenge the maps in state court under the Utah Constitution as an unconstitutional partisan gerrymander. Utah courts ultimately uphold the maps, finding no violation of state constitutional standards. A citizen initiative (Proposition 4, 2018) that had created an independent redistricting commission was weakened by the legislature before it could affect the 2022 maps.',
      },
    ],
  },

  WA: {
    1992: [
      {
        title: 'Redistricting Commission draws maps after Washington gains 1 seat',
        detail: 'Washington\'s nonpartisan Redistricting Commission — created by Initiative 63 in 1983 — draws its second congressional map. The 1990 census gives Washington a ninth seat, reflecting the state\'s rapid growth. The WRC consists of four partisan appointees who must reach consensus; maps go to the legislature only if the commission deadlocks.',
      },
      {
        title: 'Commission produces competitive maps in a swing state',
        detail: 'Washington is a genuine swing state in the early 1990s — it voted for Reagan twice before going for Dukakis in 1988. The commission\'s maps produce a competitive delegation. Democrats win 6 of 9 seats in 1992, but the eastern Washington seats are reliably Republican and several western seats are genuinely competitive.',
      },
    ],
    2002: [
      {
        title: 'Commission maintains maps after Washington retains 9 seats',
        detail: 'The Washington Redistricting Commission draws maps after Washington retains 9 seats. The WRC produces maps that are competitive and nonpartisan by most measures — frequently cited alongside Iowa and Arizona as models of independent redistricting. No major litigation follows.',
      },
      {
        title: 'Eastern Washington anchors Republican delegation; Seattle corridor trends Democratic',
        detail: 'The commission\'s 2002 maps reflect Washington\'s geographic partisan divide: the 4th and 5th Districts in eastern Washington (Yakima, Spokane) are safe Republican seats, while the Puget Sound metro districts (1st, 7th, 8th, 9th) range from safe Democratic to competitive. The 8th District in suburban eastern Seattle is among the most competitive districts in the country through the decade.',
      },
    ],
    2012: [
      {
        title: 'Washington gains a 10th seat after the 2010 census',
        detail: 'The 2010 census gives Washington a tenth congressional seat. The Redistricting Commission draws the new map.',
      },
      {
        title: 'New 10th District (Tacoma/South Puget Sound) is drawn as a competitive seat',
        detail: 'The WRC draws a new 10th District centered on Tacoma and the South Puget Sound corridor. Designed to be competitive, Democrats win it immediately in 2012. Washington\'s independent commission is widely praised for producing maps that reflect the political geography of the state without extreme partisan manipulation.',
      },
    ],
    2022: [
      {
        title: 'Washington retains 10 seats; commission draws maps',
        detail: 'Washington retains 10 seats after the 2020 census. The Redistricting Commission draws new maps through an extensive public process.',
      },
      {
        title: 'Staff makes unauthorized post-vote changes; WA Supreme Court strikes them',
        detail: 'A last-minute controversy erupts when commission staff make unauthorized alterations to the final maps after the commission\'s formal vote — changing district lines without commissioner approval. The Washington Supreme Court strikes the alterations and orders the original commission-approved maps to be used. The episode highlights procedural risks in redistricting commissions but ultimately affirms the commission\'s authority.',
      },
    ],
  },

  WV: {
    1992: [
      {
        title: 'Democrats draw maps in a still-blue West Virginia',
        detail: 'Governor Caperton (D) and a Democratic legislature draw maps after West Virginia retains 4 seats from the 1990 census. West Virginia is still reliably Democratic at the congressional level in the early 1990s — a relic of the New Deal coalition among coal mining communities that would gradually erode.',
      },
      {
        title: 'Three-seat Democratic delegation reflects the state\'s New Deal heritage',
        detail: 'West Virginia\'s congressional delegation goes 3-1 Democratic after the 1992 elections. The state\'s coal-country counties in the southern and central coalfields — Kanawha, Logan, McDowell, Wyoming — are among the most reliably Democratic communities in the country in this era, a heritage of the United Mine Workers\' role in building the Democratic Party in the region. This coalition begins its collapse over the following decade.',
      },
    ],
    2002: [
      {
        title: 'West Virginia loses 1 seat after the 2000 census',
        detail: 'The 2000 census reduces West Virginia\'s delegation from 4 to 3 — the first of two seat losses over the following two decades. Governor Wise (D) and a Democratic legislature draw the new 3-district map, maintaining a 2-1 Democratic delegation.',
      },
      {
        title: 'New 3-district map preserves Democratic incumbents',
        detail: 'The Democratic-drawn 3-district map is designed to protect all three Democratic incumbents. Nick Joe Rahall (WV-3, southern coalfields) and Alan Mollohan (WV-1, northern panhandle and Wheeling) are safe Democratic incumbents; the 2nd District (Charleston, Martinsburg, eastern panhandle) is the most competitive seat. Democrats maintain a 2-1 delegation through most of the decade.',
      },
    ],
    2012: [
      {
        title: 'Last Democratic maps in West Virginia',
        detail: 'Governor Tomblin (D) and a Democratic legislature draw maps for what would be the final time. West Virginia retains 3 seats after the 2010 census. Democrats still hold both chambers of the legislature for the 2011 redistricting — but Republicans sweep the legislature in the 2014 elections, ending over a century of unbroken Democratic legislative control.',
      },
      {
        title: 'State\'s congressional delegation flips to all-Republican during the cycle',
        detail: 'Under Democrat-drawn maps, every single congressional seat in West Virginia flips from Democratic to Republican between 2010 and 2014 — one of the most dramatic delegation reversals of the era, driven by the collapse of the coal industry and the realignment of white working-class voters.',
      },
    ],
    2022: [
      {
        title: 'West Virginia loses 1 more seat after the 2020 census',
        detail: 'The 2020 census reduces West Virginia\'s delegation from 3 to 2 — the state has now lost half its congressional representation since 1990, reflecting decades of population decline driven by the collapse of coal mining. Governor Justice (R) and a Republican supermajority legislature draw the new 2-district map.',
      },
      {
        title: 'Republican maps force two Democratic incumbents to compete',
        detail: 'Republicans draw a 2-district map that places the homes of Democratic Reps. Mooney and Miller in the same district, forcing them to run against each other in a primary. Mooney defeats Miller in the Republican-primary-equivalent race, leaving West Virginia with an all-Republican delegation for the first time in modern history.',
      },
    ],
  },
};
