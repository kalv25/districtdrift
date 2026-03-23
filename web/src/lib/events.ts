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
};
