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
        url: 'https://www.aclu.org/cases/league-women-voters-ohio-v-ohio-redistricting-commission',
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
        url: 'https://www.justice.gov/crt/about/vot/redistricting.php',
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
        url: 'https://pubintlaw.org/cases-and-projects/pennsylvania-redistricting/',
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
        url: 'https://redistricting.lls.edu/case/carter-v-chapman/',
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
        url: 'https://www.oyez.org/cases/2014/13-1314',
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
        title: 'Clinton signs congressional maps before leaving for the White House',
        detail: 'Governor Bill Clinton (D) signs Act 1220 — the congressional redistricting plan — on April 10, 1991, months before his presidential campaign gains momentum. Arkansas retains 4 seats after the 1990 census. Democrats hold overwhelming legislative majorities and draw maps designed to protect incumbents across a state that remains politically competitive at the congressional level despite shifting rightward in presidential races.',
      },
      {
        title: '⚖ Turner v. Arkansas: VRA challenge rejected; no majority-Black district drawn',
        detail: 'The NAACP argues the maps violate the Voting Rights Act by failing to create a majority-Black congressional district despite Arkansas\'s large Black population concentrated in the Delta region. The U.S. District Court upholds the plan in Turner v. Arkansas (784 F. Supp. 553), and the Supreme Court affirms (504 U.S. 952, 1992). No majority-minority congressional district is created — a pattern that persists through every subsequent cycle.',
      },
      {
        title: 'Republicans flip two seats; delegation splits 2-2',
        detail: 'The 1992 elections produce a 2D–2R Arkansas delegation, not the clean Democratic sweep the maps were meant to protect. Jay Dickey (R) defeats scandal-weakened Democrat Bill McCuen to win AR-4, and Tim Hutchinson (R) wins the open AR-3 after GOP stalwart John Paul Hammerschmidt retires. Democrats retain AR-1 (Blanche Lambert Lincoln) and AR-2 (Ray Thornton). The competitive equilibrium will not last — Republicans continue gaining ground through the decade.',
      },
    ],
    2002: [
      {
        title: 'Democratic legislature draws maps; Huckabee lets bill pass without signature',
        detail: 'Democrats still control both chambers of the Arkansas General Assembly in 2001. Governor Mike Huckabee (R) neither signs nor vetoes the congressional map — Senate Bill 552 becomes law on April 20, 2001 by operation of law. With no seat to eliminate, Democrats draw a plan aimed at protecting the existing delegation. The NAACP again presses for a majority-Black district in the Delta; legislators decline.',
      },
      {
        title: 'Democrats hold 3-1 delegation — for now',
        detail: 'The 2002 elections produce a 3D–1R Arkansas delegation. Democrats retain AR-1 (Marion Berry), AR-2 (Vic Snyder), and AR-4 (Mike Ross), while John Boozman (R) holds AR-3 unopposed after winning a 2001 special election. The map works as intended — but only briefly. Rural realignment accelerates: by 2010, Republicans hold all four seats.',
      },
      {
        title: 'Blue Dog era: Democrats hold seats through incumbency, not partisanship',
        detail: 'Arkansas\'s three Democratic incumbents — Berry, Snyder, and Ross — survive the decade as self-styled fiscal conservatives ("Blue Dogs") who carefully distance themselves from national Democratic leadership. Their survival reflects incumbency advantage more than Democratic strength: the underlying districts are already voting Republican in presidential races. When they retire or lose in 2010–2012, Republicans sweep immediately.',
      },
    ],
    2012: [
      {
        title: 'Democrats draw the "Fayetteville Finger" map — then lose everything',
        detail: 'Governor Mike Beebe (D) signs HB 1836 on April 14, 2011. Democrats still control both chambers in 2011 and design a map with a narrow geographic extension — nicknamed the "Fayetteville Finger" by critics — intended to move the liberal University of Arkansas city into a friendlier district. Republicans cry partisan gerrymander; the final enacted map pulls back from the most egregious version. The legislature passes it 64–28 largely along party lines.',
      },
      {
        title: 'Democrats swept out; 4-0 Republican delegation for the first time since Reconstruction',
        detail: 'The Democratic redistricting strategy backfires completely. In 2012 and 2014, Republicans win all four Arkansas congressional seats — the first time since Reconstruction that Democrats hold zero seats. Mike Ross retires rather than face the new map\'s headwinds. Tom Cotton (R) wins the open AR-4. Republicans also sweep the Arkansas legislature in November 2012, ending over 130 years of Democratic legislative control.',
      },
      {
        title: 'Arkansas\'s congressional realignment is complete',
        detail: 'By 2014 Arkansas is fully Republican at the federal level: 4-0 House delegation, two Republican senators, Republican governor. The transformation from a state that sent a 3-1 Democratic delegation as recently as 2003 to a 4-0 Republican one took just a decade. The pattern — rural and small-town white voters completing a shift that began in the Reagan era — mirrors Tennessee, Kentucky, and West Virginia.',
      },
    ],
    2022: [
      {
        title: 'First full Republican redistricting; Hutchinson lets map take effect without signature',
        detail: 'Governor Asa Hutchinson (R) and a Republican supermajority legislature draw Arkansas\'s first entirely Republican-controlled congressional map. The legislature approves the map on October 7, 2021; Hutchinson announces he will not sign it, allowing it to take effect automatically on January 14, 2022. Arkansas retains 4 seats after the 2020 census.',
      },
      {
        title: 'Pulaski County (Little Rock) cracked across three districts',
        detail: 'The map splits Pulaski County — home to Little Rock and roughly 35–40% Black, the state\'s strongest Democratic bloc — among three congressional districts (AR-1, AR-2, and AR-4). Approximately 23,000 predominantly Black voters are moved out of AR-2. Critics call it deliberate racial cracking to dilute Black political power; Republicans say the maps comply with the VRA. The 4R–0D delegation is unchanged.',
      },
      {
        title: '⚖ Section 2 challenges dismissed; racial gerrymander suit fails',
        detail: 'Two federal lawsuits allege VRA Section 2 violations. Simpson v. Thurston is dismissed — the 8th Circuit rules on November 20, 2023 that private parties cannot sue under Section 2 (only the U.S. Attorney General can). A separate NAACP Legal Defense Fund case brought by the Christian Ministerial Alliance on 14th and 15th Amendment grounds survives longer, but a three-judge federal panel grants the state summary judgment in June 2025. The 2021 map remains in effect.',
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
        title: 'Split government forces compromise; Indiana retains 10 seats',
        detail: 'Governor Evan Bayh (D) and a split Indiana General Assembly — Democratic House, Republican Senate — draw maps after Indiana retains 10 seats from the 1990 census. Neither party can pass a partisan plan alone; the result is a bipartisan incumbent-protection map. The backup redistricting commission (a legislative fallback for deadlocks) is not needed — the legislature passes the plan directly.',
      },
      {
        title: 'Democrats win 7 of 10 seats in a genuinely competitive Indiana',
        detail: 'The 1992 elections produce a 7D–3R delegation — a striking reminder of how competitive Indiana was before its rightward shift. Democrats hold Gary/Northwest Indiana (IN-1), Indianapolis (IN-7), and five additional districts. Republicans hold only three seats. The competitive equilibrium erodes quickly: by 1994, Republicans win the House majority nationally and begin flipping Indiana districts.',
      },
      {
        title: 'The last Democratic majority in Indiana\'s delegation',
        detail: 'The 7D–3R outcome is the last time Democrats hold a majority of Indiana\'s congressional seats. By 1995, the 1994 wave has already flipped the delegation to 6R–4D. Indiana\'s congressional delegation continues shifting right through the 1990s and 2000s, mirroring the state\'s presidential transformation from competitive to reliably Republican.',
      },
    ],
    2002: [
      {
        title: 'Indiana loses 1 seat; backup commission draws congressional map',
        detail: 'The 2000 census reduces Indiana from 10 to 9 congressional seats. Governor Frank O\'Bannon (D) and a split legislature (D House, R Senate) again face divided government. This time the legislature deadlocks on congressional lines and the backup redistricting commission — five members drawn from legislative leaders plus a gubernatorial appointee — enacts the congressional map on May 10, 2001.',
      },
      {
        title: 'Democrats lose the 2nd District; delegation shifts 6R-3D',
        detail: 'The 2002 elections produce a 6R–3D result after Tim Roemer (D) retires from IN-2 and Republican Chris Chocola wins the open seat. Democrats retain IN-1 (Visclosky, Gary), IN-7 (Julia Carson, Indianapolis), and one additional district. The 6–3 ratio holds for a decade until Republicans use their 2010 trifecta to push to 7–2.',
      },
      {
        title: 'Mike Pence enters Congress; Indiana\'s partisan shift accelerates',
        detail: 'Mike Pence (R), first elected to IN-6 in 2000 under the 2001 map, becomes a leading conservative voice in the House. Indiana\'s rural and suburban districts continue shifting Republican through the decade as the state\'s presidential vote stabilizes firmly in the Republican column. By 2010, Republicans hold 6 of 9 Indiana seats even before the upcoming redistricting.',
      },
    ],
    2012: [
      {
        title: 'Republicans draw maps in secret; 7-2 gerrymander signed',
        detail: 'Governor Mitch Daniels (R) signs HB 1602 on May 10, 2011. Republicans control both chambers with supermajorities after the 2010 wave and draw the maps entirely behind closed doors as part of the national Project REDMAP strategy. Thomas Hofeller, the chief Republican redistricting strategist, consults on the Indiana maps. A decade later, participants still refused to discuss publicly how the lines were drawn (Indiana Citizen, 2021: "The Room Where It Happened").',
      },
      {
        title: '7-2 Republican delegation locked in',
        detail: 'The Republican maps convert a 6R–3D delegation into a 7R–2D delegation designed to be durable for the decade. Democrats are consolidated into IN-1 (Gary/Northwest Indiana, Visclosky) and IN-7 (Indianapolis, André Carson, who succeeded his grandmother Julia Carson). Republicans win 7 seats in 2012 despite the state voting for Obama in 2008. No court challenges are filed.',
      },
      {
        title: 'Joe Donnelly exits for the Senate; IN-2 becomes safe Republican',
        detail: 'The new maps redraw IN-2 to make it safely Republican, pushing Donnelly toward a Senate run (he defeats Richard Mourdock in 2012). IN-9 is also redrawn to strengthen Republican Todd Young. The 7–2 split holds unchanged through the 2020 elections, making Indiana one of the most durable partisan gerrymanders in the Midwest.',
      },
    ],
    2022: [
      {
        title: 'Republican supermajority passes HB 1581; Holcomb signs',
        detail: 'Governor Eric Holcomb (R) signs HB 1581 on October 4, 2021. Republicans hold supermajorities in both chambers and draw maps preserving the 7R–2D structure. The key change: IN-5 (suburban Indianapolis) has northern Marion County precincts shifted into the adjacent Democratic IN-7, making IN-5 safer for Republican incumbent Victoria Spartz (first elected 2020 in a competitive race). No court challenges are filed.',
      },
      {
        title: '7-2 map preserved; Indianapolis cracking continues',
        detail: 'The maps divide Marion County (Indianapolis) across multiple districts, preventing the growing Democratic city from consolidating into an additional seat. Democrats retain only IN-1 (Frank Mrvan, Gary) and IN-7 (André Carson, Indianapolis). Republicans win all seven other seats in 2022, including two new open-seat winners: Rudy Yakym (IN-2, replacing Jackie Walorski who died in a car crash) and Erin Houchin (IN-9, replacing retiring Trey Hollingsworth).',
      },
      {
        title: '2025: Mid-decade redistricting attempt blocked by state Senate',
        detail: 'Under pressure from the Trump White House in late 2025, Indiana House Republicans pass a new mid-decade congressional map designed to crack Indianapolis and achieve a 9R–0D sweep. In a rare break with national Republican pressure, the Indiana Senate rejects the bill — blocking the mid-decade remap. The 2021 maps remain in force for the 2026 elections, preserving IN-1 and IN-7 as the state\'s two Democratic seats.',
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
        title: 'Kentucky loses 1 seat; the Perkins dynasty ends',
        detail: 'The 1990 census reduces Kentucky from 7 to 6 congressional seats. The eliminated district is the 7th — the eastern Appalachian coal-country seat held by Carl D. Perkins from 1949 until his death in 1984 and then by his son Chris Perkins through 1993. Chris Perkins declines to seek election in the redrawn 5th district; the seat that anchored New Deal Democratic politics in Appalachian Kentucky disappears. Governor Brereton Jones (D) and a full Democratic trifecta draw the maps.',
      },
      {
        title: 'Democrats win 4 of 6 seats; 6th District flips',
        detail: 'The Democratic-drawn maps produce a 4D–2R result in 1992. Democrats pick up the newly redrawn 6th district (Lexington) when Scotty Baesler wins the open seat left by retiring Republican Larry Hopkins. Hal Rogers (R) retains the 5th (eastern Kentucky, now incorporating former 7th district territory). Carroll Hubbard (D-1st) is defeated in his own primary over the House banking scandal — Tom Barlow wins the seat instead.',
      },
      {
        title: 'The last genuinely Democratic Kentucky delegation',
        detail: 'The 4D–2R outcome of 1992 is the high-water mark of modern Democratic congressional strength in Kentucky. By 1994, Democrats have already lost seats as rural white voters accelerate their shift toward Republicans. The coal-country and farm-belt districts that once formed the backbone of New Deal Democratic politics in the South begin voting Republican in federal races even as they continue electing conservative Democrats at the state level — a split that will fully collapse by 2010.',
      },
    ],
    2002: [
      {
        title: 'Split legislature produces bipartisan incumbent-protection map',
        detail: 'Governor Paul Patton (D) and a split legislature — Democratic House, Republican Senate (Republicans flipped the Senate in 1999 when two Democratic senators switched parties) — enact HB 1 on January 31, 2002. With no seat to eliminate and split control, all six incumbents are protected. The map passes without controversy and is not challenged in court.',
      },
      {
        title: 'Delegation already 5-1 Republican despite Democratic maps',
        detail: 'The 2002 elections produce a 5R–1D result as Democratic incumbents fall through the 1994 and 1996 waves before redistricting can help. Only Ken Lucas (D) survives in KY-4 (Northern Kentucky), winning 51%–49% over Geoff Davis. Ernie Fletcher (R) wins KY-6 (Lexington), then runs for governor in 2003 — becoming the first Republican governor of Kentucky in over three decades.',
      },
      {
        title: 'Ken Lucas holds the last Democratic seat — then retires',
        detail: 'Ken Lucas (D, KY-4) honored a self-imposed three-term pledge and did not seek re-election in 2004. Nick Clooney (father of actor George Clooney) loses the open seat to Republican Geoff Davis 55%–45%. Kentucky briefly has a 6-0 Republican congressional delegation. John Yarmuth (D) then flips KY-3 (Louisville) in 2006, restoring a single Democratic seat that holds through the next two redistricting cycles.',
      },
    ],
    2012: [
      {
        title: 'Beshear vetoes bipartisan incumbent map; Democrats join override',
        detail: 'Governor Steve Beshear (D) vetoes HB 302, the Republican-drawn congressional map, on February 10, 2012. In a striking move, both the Republican Senate and the Democratic-controlled House override the veto — because the map is essentially a bipartisan incumbent-protection plan that strengthens all six incumbents regardless of party. The state legislative maps, drawn separately, are struck down by the Kentucky Supreme Court in Fischer v. Grimes (Feb. 24, 2012) for violating equal population rules; the congressional map is unaffected.',
      },
      {
        title: 'Map\'s "protection" fails; Ben Chandler loses',
        detail: 'The redistricting was designed to bolster all incumbents, including Democrat Ben Chandler (KY-6, Lexington). It was not enough: Republican Andy Barr defeats Chandler 50.6%–46.7% in 2012, in a presidential year that swings heavily Republican in Kentucky. The loss leaves John Yarmuth (D-3rd, Louisville) as the sole Democratic House member from Kentucky — a ratio of 5R/1D that holds unchanged through the 2024 elections.',
      },
      {
        title: 'Louisville is the only Democratic anchor',
        detail: 'The 3rd District (Louisville / Jefferson County) becomes the only reliable Democratic seat in Kentucky, held by John Yarmuth from 2006 until his retirement in 2022. Louisville\'s political isolation — a blue urban island in a state that votes Republican by 25+ points at the presidential level — means the city\'s congressional representation depends entirely on holding the one district drawn around its core.',
      },
    ],
    2022: [
      {
        title: 'Republican supermajority draws map; veto overridden the same day',
        detail: 'Republicans, who won the Kentucky House in 2016 to complete a supermajority trifecta, pass Senate Bill 3. Governor Andy Beshear (D) vetoes it on January 19, 2022, calling it an unconstitutional partisan gerrymander drawn "behind closed doors." The legislature overrides the veto the very next day, January 20. The map moves Frankfort (the state capital, a Democratic-leaning city) from the competitive KY-6 into the safely Republican KY-1, further entrenching Andy Barr (R) in the Lexington-based 6th.',
      },
      {
        title: 'Louisville preserved; 5-1 map locked in by design',
        detail: 'Republicans chose not to crack Louisville\'s Jefferson County — preserving KY-3 as a safe Democratic seat. The calculus: cracking Louisville would create competitive districts that could be won by Democrats in wave years, while a 5R/1D map is essentially permanent. Morgan McGarvey (D) wins the 3rd after Yarmuth retires in 2022. Andy Barr wins KY-6 with 63% under the safer new lines.',
      },
      {
        title: '⚖ Graham v. Adams: Kentucky Supreme Court upholds maps',
        detail: 'The Kentucky Democratic Party files Graham v. Adams in Franklin Circuit Court the same day as the veto override, arguing the maps violate the Kentucky Constitution\'s guarantee against unconstitutional partisan gerrymandering. A notable first: the Kentucky Supreme Court rules on December 14, 2023 that state courts can hear partisan gerrymandering claims under Kentucky\'s constitution — unlike the federal courts after Rucho v. Common Cause (2019). However, the court upholds these specific maps, finding the gerrymandering insufficient to cross the constitutional threshold.',
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
        title: 'Split government: Republican governor, Democratic legislature',
        detail: 'Governor John Ashcroft (R) and a Democratic-controlled General Assembly share redistricting authority after Missouri retains 9 seats from the 1990 census. Democrats hold the pen in the legislature, producing maps that protect incumbents of both parties rather than maximizing partisan advantage.',
      },
      {
        title: 'VRA preserves majority-Black MO-1 in St. Louis',
        detail: 'The Voting Rights Act requires Missouri to maintain a majority-Black congressional district anchored in St. Louis city and northern St. Louis County. MO-1 elects William Lacy Clay Sr. (D), who has held the seat since 1969. This district configuration — a Black-majority St. Louis seat — is preserved unchanged in every subsequent redistricting cycle.',
      },
      {
        title: 'Democrats win 6 of 9 seats in competitive cycle',
        detail: 'Missouri\'s maps produce a 6D–3R delegation in 1992 in a state that voted for Bill Clinton — its last Democratic presidential vote until 2024. Several seats are genuinely competitive. Jim Talent (R) flips a suburban St. Louis seat by defeating Democratic incumbent Joan Kelly Horn. Missouri\'s competitive congressional balance erodes rapidly over the following decade as rural voters shift toward Republicans.',
      },
    ],
    2002: [
      {
        title: 'Republican legislature, Democratic governor; Missouri retains 9 seats',
        detail: 'Governor Bob Holden (D), who narrowly won the 2000 election, faces a Republican-controlled General Assembly during redistricting. Missouri retains 9 seats after the 2000 census. With no seat to eliminate, the map largely protects incumbents of both parties. Holden signs HB 1000 on June 1, 2001.',
      },
      {
        title: 'Delegation shifts 5-4 Republican as rural Missouri completes its realignment',
        detail: 'Despite maps drawn without a strong partisan gerrymander, Missouri\'s 2002 elections produce a 5D–4R delegation as rural white voters complete a rapid shift toward Republicans. Democrats retain St. Louis (Clay Jr., who succeeded his father in 2001), Kansas City (Karen McCarthy), and a handful of rural seats held by Blue Dog Democrats including Ike Skelton (MO-4). House Minority Leader Dick Gephardt (MO-3) represents St. Louis County.',
      },
      {
        title: 'Missouri\'s competitive window closes',
        detail: 'Missouri\'s congressional maps for 2002–2010 reflect a state in political transition. The Democratic delegation depends increasingly on incumbency advantage as the underlying partisan lean of rural districts shifts right. By 2010 Republicans hold 6 of 9 seats even before the post-census redistricting — making Missouri\'s 2010 remap a formality rather than a cause of Republican dominance.',
      },
    ],
    2012: [
      {
        title: 'Missouri loses 1 seat; Nixon veto overridden in four days',
        detail: 'The 2010 census reduces Missouri from 9 to 8 congressional seats. Republicans control both chambers with veto-override majorities after their 2010 wave. Governor Jay Nixon (D) vetoes the Republican congressional map on April 30, 2011. The legislature overrides his veto on May 4, 2011 — just four days later — enacting the map without his consent.',
      },
      {
        title: 'Republicans eliminate MO-9 and force out Rep. Carnahan',
        detail: 'The map eliminates the 9th district (northeast and central Missouri, including Columbia), absorbing its territory into the 6th and redrawn 3rd districts. More significantly, Republicans redraw MO-3 in St. Louis to push Democratic Rep. Russ Carnahan into a primary against William Lacy Clay Jr. in the majority-Black MO-1 — a race Carnahan could not win. Carnahan declines to run; a Democratic seat disappears without a single vote cast against him.',
      },
      {
        title: '⚖ Partisan challenge fails; 6-2 Republican map stands',
        detail: 'Opponents file suit in Missouri\'s 19th Judicial Circuit Court on September 23, 2011, alleging partisan gerrymandering and violations of the Missouri Constitution\'s compactness requirements. The challenge fails and the map stands. Missouri produces a 6R–2D delegation from 2012 onward — St. Louis (Clay Jr.) and Kansas City (Emanuel Cleaver) are the only Democratic seats — a ratio that holds unchanged through 2024.',
      },
    ],
    2022: [
      {
        title: 'Republican supermajority deadlocked for months over 7-1 vs. 6-2 map',
        detail: 'Missouri is the last state in the nation to enact its 2022 congressional map. A bloc of hard-line Senate Republicans (the "Conservative Caucus") pushes to crack Kansas City\'s MO-5 and create a 7R–1D map. Moderate Republicans, concerned about VRA exposure and incumbent safety, defend the existing 6R–2D framework. Democrats are unified in opposition to any urban cracking. The House passes a 6R–2D map twice before the Senate finally agrees.',
      },
      {
        title: 'HB 2909 signed; 6-2 map preserved; St. Louis and KC packed',
        detail: 'Governor Mike Parson (R) signs HB 2909 on May 18, 2022 — months after every other state. Republicans preserve the 6R–2D delegation by packing Democrats into MO-1 (St. Louis, majority-Black VRA district) and MO-5 (Kansas City). Cori Bush (D) wins MO-1, having defeated longtime incumbent William Lacy Clay Jr. in the 2020 Democratic primary. Emanuel Cleaver (D) retains MO-5.',
      },
      {
        title: '⚖ 2025: Republicans redraw maps mid-decade to target Kansas City',
        detail: 'In August 2025, under pressure from national Republican allies, Governor Mike Kehoe calls a special session. The legislature passes HB 1 (the "Missouri First Map"), signed September 28, 2025, dismantling MO-5 and splitting Jackson County among three districts. Critics note the new boundary runs along Troost Avenue — a century-old racial dividing line in Kansas City. A state constitutional challenge is rejected by the Missouri Supreme Court on March 24, 2026. A referendum effort to overturn the map qualifies for the November 2026 ballot.',
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
        title: 'Nevada gains a second seat; split legislature negotiates bipartisan map',
        detail: 'The 1990 census gives Nevada a second congressional seat, reflecting explosive Las Vegas growth. Governor Miller (D) and a split legislature — Democratic Assembly, Republican Senate — negotiate a bipartisan 2-district map. NV-1 covers urban Las Vegas (held by Democrat James Bilbray); NV-2 covers rural Nevada and Reno (held by Republican Barbara Vucanovich).',
      },
      {
        title: 'Nevada begins rapid transition from Republican to swing state',
        detail: 'Nevada voted Republican in every presidential election from 1952 through 1992 except 1964. The influx of union workers in the Las Vegas casino and hospitality industries — organized by UNITE HERE Local 226, the Culinary Workers — begins a demographic shift toward Democrats. NV-1 trends increasingly Democratic; in 1994 Republican John Ensign defeats Bilbray by just 1,436 votes, reflecting the district\'s competitiveness throughout the decade.',
      },
    ],
    2002: [
      {
        title: 'Nevada gains a third seat; split government draws bipartisan incumbent-protection map',
        detail: 'Nevada gains a third congressional seat after the 2000 census. Governor Guinn (R) and a split legislature (Republican Senate, Democratic Assembly) enact maps through a June 2001 special session. The new NV-3 covers suburban Henderson and southern Clark County. Scholars describe the map as a bipartisan incumbent gerrymander — each party\'s existing members are protected, and NV-3 is deliberately drawn as a competitive swing district.',
      },
      {
        title: 'NV-3 (suburban Las Vegas) becomes one of the nation\'s most contested seats',
        detail: 'The new suburban 3rd District swings between parties throughout the decade. Republican Jon Porter wins in 2002 and holds it through 2008, when Democrat Dina Titus defeats him. Republican Joe Heck wins it back in 2010. The seat reflects Las Vegas\'s rapidly growing, ethnically diverse suburban belt — competitive in ways that Nevada\'s older urban-rural split was not.',
      },
    ],
    2012: [
      {
        title: 'Nevada gains a fourth seat; Sandoval vetoes Democratic maps — court draws lines',
        detail: 'Nevada gains its fourth congressional seat after the 2010 census. Democrats control the legislature and pass congressional and legislative maps, but Republican Governor Sandoval vetoes both, accusing Democrats of violating the VRA. With no agreed plan, a state court appoints three Special Masters to draw the congressional map. The court-drawn map produces a 2-2 delegation — NV-4 (north Clark County) leans Democratic, while NV-3 (suburban Las Vegas) remains fiercely competitive.',
      },
      {
        title: 'Steven Horsford (D) wins NV-4 — Nevada\'s first Black congressman',
        detail: 'The new court-drawn NV-4 stretches across northern Clark County\'s working-class neighborhoods and rural central Nevada. Democrat Steven Horsford wins in 2012, becoming Nevada\'s first Black member of Congress. NV-4 quickly establishes itself as a genuine swing seat: Republican Cresent Hardy defeats Horsford in 2014, Democrat Ruben Kihuen flips it back in 2016, and Horsford returns in 2018 and holds it through the decade.',
      },
    ],
    2022: [
      {
        title: 'First Democratic trifecta: aggressive map shifts all three Clark County seats toward Democrats',
        detail: 'Nevada retains 4 seats. Governor Sisolak (D) and a Democratic legislature draw the first aggressively partisan map in Nevada\'s modern history. Democrats move Democratic-leaning voters out of the safe NV-1 (Las Vegas core) into competitive NV-3 and NV-4, flipping NV-3\'s presidential lean from Biden+0.2 to Biden+6.6 and NV-4 from Biden+3.9 to Biden+8.3. Republicans file Koenig v. Nevada challenging the maps; a judge dismisses the suit with prejudice in June 2022.',
      },
      {
        title: 'Latino community split: cohesion in NV-1 sacrificed for suburban Democratic margins',
        detail: 'The maps draw criticism from Las Vegas\'s Latino community: predominantly Hispanic, working-class precincts in north and east Las Vegas are redistricted out of NV-1 and into NV-3 and NV-4 to shore up suburban Democratic margins. Critics argue the strategy dilutes Latino political cohesion for partisan gain — a tension between VRA community-of-interest principles and Democratic incumbent protection that echoes similar controversies in Texas and California.',
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
        title: 'Split legislature deadlocks; Secretary of State draws the map',
        detail: 'Oregon retains 5 seats after the 1990 census. Governor Roberts (D) and a split legislature (Republican Senate, Democratic House) cannot agree. Under a constitutional fallback, Secretary of State Phil Keisling (D) draws congressional maps from scratch, appointing a politically balanced citizen advisory committee. It is the first time Oregon\'s congressional lines are drawn by an executive officer rather than the legislature.',
      },
      {
        title: '4-1 Democratic delegation; OR-5 (Salem) emerges as the perennial swing seat',
        detail: 'Oregon goes 4-1 Democratic in 1992 on the Clinton wave. The 5th District (Salem/mid-Willamette Valley) — a mix of the state capital, agricultural communities, and suburban growth — becomes a perennial battleground that changes party control multiple times over the following two decades.',
      },
    ],
    2002: [
      {
        title: 'Kitzhaber vetoes Republican maps; Multnomah County court draws second consecutive cycle',
        detail: 'Oregon retains 5 seats after the 2000 census. Republicans control both chambers and pass SB 500, but Governor Kitzhaber (D) vetoes it. With no agreed plan, a Multnomah County Circuit Court draws the congressional maps — the second consecutive redistricting cycle with court-drawn lines, one of only a handful of such streaks in modern U.S. history.',
      },
      {
        title: 'OR-5 is one of the nation\'s most contested districts for a decade',
        detail: 'The court-drawn 5th District changes party hands repeatedly: Democrat Les AuCoin loses in 1994, Republican Jim Bunn is unseated in 1996 by Democrat Darlene Hooley, who holds it until 2009. Democrat Kurt Schrader wins in 2008. The seat\'s extreme competitiveness reflects the Willamette Valley\'s blend of Salem suburbanites, agricultural workers, and small-city Democrats.',
      },
    ],
    2012: [
      {
        title: 'Rare bipartisan outcome: tied House forces genuine compromise',
        detail: 'Oregon retains 5 seats. The House is tied 30-30 between parties after the 2010 elections. Governor Kitzhaber (D) signals he will veto any partisan plan, creating strong incentive for agreement. The result is a genuine bipartisan compromise — passed 47-10 in the House and 27-3 in the Senate — and the first Oregon redistricting in modern history with no subsequent court challenge.',
      },
      {
        title: 'Eastern Oregon\'s 2nd District — largest by area in the contiguous US',
        detail: 'The 2nd District spanning eastern Oregon covers more than 69,000 square miles — larger than Washington state — of high desert, ranching country, and Cascade foothills. Reliably Republican since 1994, it anchors the GOP\'s one House seat in Oregon. Greg Walden (R) holds it from 1999 through 2021; Cliff Bentz (R) succeeds him.',
      },
    ],
    2022: [
      {
        title: 'Oregon gains 6th seat; Republicans walk out, then return; maps pass',
        detail: 'Oregon gains its first new congressional seat since the 1980s. Governor Brown (D) and a Democratic trifecta target a 5-1 map. On September 25, 2021, all but one House Republican boycott the special session, denying the two-thirds quorum required by the Oregon Constitution. After two days, 16 of 23 House Republicans return; the congressional map (SB 881) passes 33-16 in the House and 18-6 in the Senate. Brown signs it the same day.',
      },
      {
        title: '⚖ Clarno v. Fagan — court upholds maps; OR-5 flips Republican',
        detail: 'Former Republican Secretary of State Bev Clarno and former House Speaker Larry Campbell challenge the maps as an unconstitutional partisan gerrymander. A five-judge Special Judicial Panel upholds them in November 2021, finding the maps were drawn on neutral criteria, not partisan purpose. The new OR-6 (Willamette Valley/Salem corridor) is won narrowly by Democrat Andrea Salinas. Meanwhile OR-5 is substantially redrawn — incumbent Kurt Schrader loses the Democratic primary to a progressive, and Republican Lori Chavez-DeRemer wins the general, producing a 4D-2R delegation.',
        url: 'https://www.democracydocket.com/cases/oregon-congressional-redistricting-challenge-gop/',
      },
      {
        title: 'Ballot Measure 113: walkout penalty, not redistricting reform',
        detail: 'In response to repeated Republican quorum-denial walkouts, Oregon voters pass Ballot Measure 113 in 2022, barring any legislator who accumulates 10 or more unexcused absences in a session from running for re-election in the following election. It is an anti-walkout measure, not an independent redistricting commission — Oregon remains legislatively controlled for future cycles.',
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
        detail: 'Governor Campbell (R) and a Democratic legislature draw maps after South Carolina retains 6 seats. Under VRA Section 5 preclearance, the DOJ requires a majority-Black congressional district. SC-6 is drawn linking Black communities in Columbia, Florence, and the Low Country — a sprawling configuration spanning parts of 16 counties. South Carolina had been without Black congressional representation for 90 years.',
      },
      {
        title: 'Jim Clyburn wins SC-6; delegation splits 3-3',
        detail: 'James Clyburn wins the newly drawn 6th District in 1992 with 65% of the vote — South Carolina\'s first Black congressman since 1897. The 1992 elections produce a 3R-3D delegation. By concentrating Black Democratic voters into SC-6, the new map bleaches adjacent districts and accelerates Republican gains: the surrounding seats trend increasingly Republican through the decade.',
      },
    ],
    2002: [
      {
        title: '⚖ Hodges vetoes Republican maps; federal court draws SC\'s congressional lines',
        detail: 'South Carolina retains 6 seats. The Republican-controlled legislature passes a redistricting plan, but Governor Hodges (D) vetoes it, creating a deadlock. Unable to override the veto, the legislature fails to enact a map. A three-judge federal panel in Colleton County Council v. McConnell (201 F.Supp.2d 618) steps in and draws the congressional map in March 2002 — binding it to VRA compliance and noting that voting in South Carolina remains "racially polarized to a very high degree."',
        url: 'https://redistricting.lls.edu/state/south-carolina/',
      },
      {
        title: 'Court-drawn maps consolidate a 4-2 Republican delegation',
        detail: 'The court-drawn 2002 map produces a 4R-2D delegation as South Carolina\'s Republican realignment accelerates. Democrats retain SC-5 (John Spratt) and the majority-Black SC-6 (Jim Clyburn). Republicans hold all four other seats as the state increasingly mirrors other Deep South states in its partisan alignment. Republicans win both chambers of the General Assembly in 1994 and never lose them again.',
      },
    ],
    2012: [
      {
        title: 'SC gains 7th seat; Republican supermajority draws the map',
        detail: 'South Carolina gains a 7th congressional seat after the 2010 census, reflecting rapid population growth. Governor Haley (R) and a Republican supermajority legislature draw the new map, signed August 1, 2011. The new SC-7 covers the Myrtle Beach/Grand Strand coast and Horry County. Republicans immediately win it, producing a 6-1 delegation — Jim Clyburn\'s majority-Black SC-6 as the lone Democratic seat.',
      },
      {
        title: '⚖ Backus v. South Carolina — Republican maps upheld',
        detail: 'Democratic voters challenge the 2012 congressional and state legislative maps as an unlawful racial gerrymander under the Equal Protection Clause and VRA. The federal district court upholds the maps, finding the legislature adhered to race-neutral principles. The U.S. Supreme Court summarily affirms without oral argument in October 2012 (133 S.Ct. 156). Plaintiffs later argue the decision should be reconsidered after Shelby County v. Holder (2013) invalidated Section 5, but no relief is granted.',
        url: 'https://redistricting.lls.edu/state/south-carolina/',
      },
    ],
    2022: [
      {
        title: 'Republicans crack 30,000+ Black Charlestonians out of SC-1',
        detail: 'Governor McMaster (R) and a Republican supermajority legislature draw maps retaining 7 seats. In SC-1 (Charleston), Republicans remove over 30,000 Black residents — 62% of voters transferred out of the district are Black — packing them into Clyburn\'s SC-6 and replacing them with Republican-leaning Midlands territory nearly 100 miles away. The legislature sets an explicit target of 17% Black Voting Age Population for SC-1, a detail documented in court filings.',
      },
      {
        title: '⚖ Alexander v. South Carolina NAACP — district court strikes SC-1; SCOTUS reverses 6-3',
        detail: 'The NAACP LDF and ACLU challenge SC-1 as an unconstitutional racial gerrymander. In January 2023 a three-judge federal panel unanimously strikes down SC-1, ordering a redraw. The Supreme Court stays the order and reverses 6-3 in May 2024: writing for the majority, Justice Alito holds plaintiffs failed to show race (rather than partisan intent) predominated. Because partisan gerrymandering is non-justiciable under Rucho v. Common Cause, states can invoke partisan motive as a near-complete defense to racial gerrymandering claims. Justice Sotomayor\'s dissent calls the decision a roadmap for laundering racial gerrymandering as partisan politics.',
        url: 'https://www.oyez.org/cases/2023/21-1406',
      },
    ],
  },

  TN: {
    1992: [
      {
        title: 'Democrats draw maps in a competitive Tennessee; 6-3 delegation',
        detail: 'Governor McWherter (D) and a Democratic trifecta draw maps after Tennessee retains 9 seats. Tennessee is still genuinely competitive federally — Al Gore sits in the Senate, and Democrats hold a 6-3 House delegation after 1992. TN-9 (Memphis) is a majority-Black district held by Harold Ford Sr. since 1975. VRA compliance shapes the West Tennessee lines, following a 1980s federal court ruling that earlier maps diluted Black voting strength.',
      },
      {
        title: 'Rural realignment begins eroding Democratic maps',
        detail: 'Despite a 6-3 Democratic delegation in 1992, the maps cannot hold back Tennessee\'s rural realignment. Democratic incumbents in conservative-leaning districts face mounting pressure as rural white voters shift toward Republicans in federal races through the decade. Al Gore loses his home state in the 2000 presidential election — the first Democrat since the Civil War era to lose Tennessee — signaling how complete the realignment has become.',
      },
    ],
    2002: [
      {
        title: 'Democratic legislature draws maps under Republican governor Sundquist',
        detail: 'Tennessee retains 9 seats. Governor Sundquist (R) and a Democratic-controlled legislature share control — Democrats hold both chambers and drive the process. The resulting maps are designed to protect Democratic incumbents, packing heavy Republican suburbs of Nashville and Memphis into single safe Republican districts. Democrat Lincoln Davis flips TN-4 in 2002, producing a 5D-4R delegation.',
      },
      {
        title: 'Democratic maps cannot stop the realignment — delegation flips 7-2 Republican by 2008',
        detail: 'Despite drawing maps to protect their incumbents, Tennessee Democrats are overwhelmed by rural realignment. By 2008, Republicans have won 7 of 9 seats as rural and small-town voters complete their shift. Harold Ford Jr. (TN-9/Memphis) holds the majority-Black seat; Jim Cooper (TN-5/Nashville) holds the urban seat — the last two Democratic strongholds as the rest of the state turns solidly Republican.',
      },
    ],
    2012: [
      {
        title: 'Republicans claim first trifecta; 7-2 map drawn in 9 days',
        detail: 'Governor Haslam (R) and a Republican supermajority — winning both chambers in 2010 for the first time — draw maps after Tennessee retains 9 seats. Maps were unveiled January 4–6, 2012, passed January 13, and signed January 26. The speed left essentially no public input window; PolitiFact rated the Senate speaker\'s claim of "the most transparent redistricting in Tennessee history" as false. Republicans draw a 7-2 map, packing Democrats into Memphis (TN-9, Steve Cohen) and Nashville (TN-5, Jim Cooper).',
      },
      {
        title: 'Nashville and Memphis isolated as urban islands in a Republican sea',
        detail: 'The 2012 maps concentrate Nashville\'s 600,000+ residents into a single district (TN-5) and Memphis\'s Black community into TN-9 — both represented by Democrats, both surrounded on all sides by safe Republican districts. Every other district is drawn to lean Republican by 20+ points. Cooper and Cohen win comfortably for a decade under maps that offer no competitive seat outside the two urban cores.',
      },
    ],
    2022: [
      {
        title: 'Nashville cracked three ways: Davidson County split across TN-5, TN-6, and TN-7',
        detail: 'Governor Lee (R) and a Republican supermajority pass maps on January 24, 2022. The defining act: Nashville\'s Davidson County (715,000 residents, historically one district) is split across three congressional districts. Black voting-age population in Nashville falls to 11.8%, 8.6%, and 15.5% across the three districts — none large enough to constitute a meaningful voting bloc. Jim Cooper announces his retirement the day after the map passes, saying he had "explored every possible way, including lawsuits" to stop it. Republican Andy Ogles wins the new TN-5; the 2022 elections produce an 8R-1D delegation.',
      },
      {
        title: '⚖ Tennessee NAACP v. Lee — racial gerrymander claims dismissed',
        detail: 'The Tennessee NAACP, Equity Alliance, and allied groups sue in August 2023 alleging Nashville\'s cracking and a Shelby County state Senate map constitute unconstitutional racial gerrymanders. A three-judge federal panel dismisses the congressional claim in August 2024 — holding that while the facts are "consistent with a racial gerrymander," they are equally consistent with a partisan one. Under Alexander v. SC NAACP (2024), plaintiffs must affirmatively prove racial rather than partisan predominance; they cannot meet the burden and the case is dismissed with prejudice in September 2024. The expulsion of Black state legislators Justin Jones (Nashville) and Justin Pearson (Memphis) in April 2023 — made possible by the Republicans\' redistricting-secured supermajority — drew national attention to the structural consequences of Tennessee\'s maps.',
        url: 'https://www.democracydocket.com/cases/tennessee-congressional-and-state-senate-redistricting-challenge/',
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
        title: 'Bipartisan Redistricting Commission draws first map after Washington gains 9th seat',
        detail: 'Washington\'s bipartisan Redistricting Commission — created by constitutional amendment in 1983, first used in 1991 — draws maps after the 1990 census gives Washington a 9th seat. Four members are appointed by the majority and minority caucus leaders of each legislative chamber; three of four must agree on a final plan. A fifth nonvoting chair facilitates but does not cast a deciding vote. The first cycle goes smoothly — plans filed January 1, 1992, with no court challenges.',
      },
      {
        title: 'Clinton wave produces an 8-1 Democratic delegation; eastern WA anchors Republican minority',
        detail: 'Washington goes 8D-1R in the 1992 Clinton wave — only Jennifer Dunn (R-8, Eastside King County) holds a Republican seat. The commission\'s bipartisan maps provide no protection against wave elections; Jay Inslee (D-4) and Maria Cantwell (D-1) both lose in the 1994 Republican wave. Eastern Washington (4th and 5th Districts) anchors the Republican delegation and remains safe Republican through all subsequent cycles.',
      },
    ],
    2002: [
      {
        title: 'Commission misses statutory deadline; governor grants retroactive extension',
        detail: 'Washington retains 9 seats. The commission faces internal disagreements and misses its statutory filing deadline, but ultimately adopts maps in late 2001 and early 2002. Governor Locke signs legislation retroactively extending the deadline at the request of the Attorney General. The legislature makes minor amendments with a two-thirds vote. No court challenges follow, and the maps produce a 6D-3R delegation.',
      },
      {
        title: 'WA-8 (Eastside suburbs) becomes one of the most competitive districts in the country',
        detail: 'The commission\'s 2002 maps preserve WA-8 (suburban east Seattle — Bellevue, Kirkland, Sammamish) as the state\'s premier swing seat. Republican Dave Reichert (King County Sheriff) wins it narrowly in 2004 and holds it by thin margins through 2012. The district reflects the political evolution of Seattle\'s Eastside: historically Republican, trending competitive as educated suburban voters shift toward Democrats through the 2000s.',
      },
    ],
    2012: [
      {
        title: 'Washington gains a 10th seat; WA-8 redistricting makes it safer for Reichert',
        detail: 'The 2010 census gives Washington a 10th congressional seat. The commission adopts maps two hours before its January 1, 2012 deadline. The new WA-10 centers on Thurston County (Olympia) and south Pierce County — Democrat Denny Heck wins it immediately. The 2012 remapping also reshapes WA-8, adding conservative Chelan and Kittitas counties east of the Cascades; Reichert\'s average winning margin rises from 52% to 61%, shielding him from competitive pressure until he retires in 2018.',
      },
      {
        title: 'Bipartisan commission — not independent — limits but doesn\'t eliminate partisan outcomes',
        detail: 'Washington\'s commission is frequently cited alongside Iowa and Arizona as a model for redistricting reform, but scholars note a key distinction: it is bipartisan (party-aligned appointees who negotiate), not independent (neutral commissioners). FiveThirtyEight analysis finds Washington\'s maps less fair than those drawn by truly independent commissions (Arizona, California, Colorado, Michigan). A 6D-4R delegation results from the new 10-seat map.',
      },
    ],
    2022: [
      {
        title: 'Commission votes 32 seconds before midnight; misses transmission deadline; Supreme Court accepts maps',
        detail: 'Washington retains 10 seats. After months of closed-door negotiations criticized for lack of transparency, the commission votes on final maps at 11:59:28 p.m. on November 15, 2021 — 32 seconds before the constitutional deadline — using maps the public had no chance to review. The commission then misses the statutory transmission deadline, sending the maps to the Washington Supreme Court. On December 3, 2021, the court rules the commission "substantially complied" with its mandate and accepts the maps. The legislature approves a final amended version 88-7 in the House on February 8, 2022.',
      },
      {
        title: 'WA-3 produces one of 2022\'s biggest upsets; delegation reaches 8-2',
        detail: 'The commission\'s maps preserve WA-3 (southwest Washington/Clark County) as a swing district. When Trump endorses Joe Kent over six-term Republican Jaime Herrera Beutler (who voted to impeach Trump), Kent defeats her in the primary. Democrat Marie Gluesenkamp Perez — a small-business auto-shop owner — then defeats Kent by ~2,600 votes (~50.1%), one of the closest races in the country and a result FiveThirtyEight had given a 2-in-100 chance. Washington\'s 2022 delegation reaches 8D-2R; Republicans retain only WA-4 (Dan Newhouse) and WA-5 (Cathy McMorris Rodgers).',
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
