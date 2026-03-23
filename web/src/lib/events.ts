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
    ],
    2002: [
      {
        title: 'Democrats maintain 7-1 grip',
        detail: 'Governor Parris Glendening (D) and the Democratic legislature redraw the map after the 2000 census. Maryland\'s seat count stays at 8. The maps preserve the 7-1 Democratic advantage with minimal changes from the prior decade.',
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
};
