export type CycleEvent = {
  title: string;
  detail: string;
  url?: string;
};

export const CYCLE_EVENTS: Record<number, CycleEvent[]> = {
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
};
