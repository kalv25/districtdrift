/**
 * strings.ts — Single source of truth for all user-visible strings.
 *
 * Namespaces: UI · NATION · STATE · CHARTS · HELP · FEEDBACK
 *
 * Every static entry has a JSDoc comment with three parts:
 *   1. Where it appears in the UI
 *   2. Any constraints (length, formatting)
 *   3. Relationships to other strings
 *
 * Dynamic strings are factory functions (suffix: Fn) returning plain strings.
 * Sentence case throughout (brand names and proper nouns excepted).
 */

// ---------------------------------------------------------------------------
// UI — navigation, header, layout controls, shared actions
// ---------------------------------------------------------------------------

export const UI = {
  // Header brand
  /** Header h1 inner text. Brand name — do not change capitalisation. No length limit. Related: UI.TAGLINE. */
  SITE_NAME: 'DistrictDrift',

  /** Header tagline beneath the brand name. Should stay under ~50 chars to fit one line. Related: UI.SITE_NAME. */
  TAGLINE: 'Three decades of congressional redistricting',

  /** Brand hover popup heading. Short, no punctuation. Related: UI.BRAND_ITEMS. */
  BRAND_POPUP_HEADING: "What's inside",

  /** Brand popup bullet items. Each should be a single short line. Related: UI.BRAND_POPUP_HEADING. */
  BRAND_ITEMS: [
    '50 states · 5 redistricting cycles · 1992–2024',
    'Per-district election results & census demographics',
    'Precinct vote maps for all 50 states (2012 & 2022)',
    'Efficiency gap, mean-median difference & competitiveness',
  ] as const,

  // Header buttons
  /** ? button title attribute. Related: HELP namespace. */
  HELP_TITLE: 'How to use this site',

  /** Share button default label. Fits on a pill button — keep short. Related: UI.SHARE_COPIED. */
  SHARE_LABEL: '⤴ Share',

  /** Share button label after copy succeeds. Should clearly confirm action. Related: UI.SHARE_LABEL. */
  SHARE_COPIED: '✓ Copied',

  /** Share button title attribute. Related: UI.SHARE_LABEL. */
  SHARE_TITLE: 'Share this view',

  /** Feedback pill button label. Short, fits pill button. Related: FEEDBACK namespace. */
  FEEDBACK_LABEL: 'Feedback',

  /** Feedback button title attribute. Related: UI.FEEDBACK_LABEL. */
  FEEDBACK_TITLE: 'Leave feedback',

  // Theme buttons
  /** Light mode button title. Related: UI.THEME_SYSTEM, UI.THEME_DARK. */
  THEME_LIGHT: 'Light mode',
  /** System theme button title. Related: UI.THEME_LIGHT, UI.THEME_DARK. */
  THEME_SYSTEM: 'System theme',
  /** Dark mode button title. Related: UI.THEME_LIGHT, UI.THEME_SYSTEM. */
  THEME_DARK: 'Dark mode',

  // Navigation
  /** "All states" nav button — nation view. Short, fits nav bar. Related: UI.SELECT_STATE_PLACEHOLDER. */
  NAV_ALL_STATES: 'All states',

  /** State selector placeholder when in nation view. Short. Related: UI.NAV_ALL_STATES. */
  SELECT_STATE_PLACEHOLDER: 'Select state',

  // Map float controls (state view, bottom-left)
  /** Layout toggle label — desktop. Short, fits small button. Related: UI.FLOAT_STATS. */
  FLOAT_LAYOUT: 'Layout',

  /** Layout toggle label — mobile. Short, fits small button. Related: UI.FLOAT_LAYOUT. */
  FLOAT_STATS: 'Stats',

  /** Precinct toggle label — default state. Short. Related: UI.FLOAT_PRECINCT_LOADING. */
  FLOAT_PRECINCTS: 'Precincts',

  /** Precinct toggle label — while downloading. Short. Related: UI.FLOAT_PRECINCTS. */
  FLOAT_PRECINCT_LOADING: 'Loading…',

  /** Save/screenshot button label. Short. Related: UI.SAVE_TITLE. */
  FLOAT_SAVE: 'Save',

  /** Save/screenshot button title attribute. Related: UI.FLOAT_SAVE. */
  SAVE_TITLE: 'Save map as PNG',

  /** Title shown when precinct data is loading. Related: UI.FLOAT_PRECINCT_LOADING. */
  PRECINCT_LOADING_TITLE: 'Loading precinct data…',

  /** Title shown when precinct layer is visible. Related: UI.PRECINCT_HIDDEN_TITLE. */
  PRECINCT_VISIBLE_TITLE: 'Hide precinct vote map',

  /** Title shown when precinct layer is hidden. Related: UI.PRECINCT_VISIBLE_TITLE. */
  PRECINCT_HIDDEN_TITLE: 'Show precinct vote map',

  /** Map center toast shown while precinct file downloads. Related: UI.FLOAT_PRECINCT_LOADING. */
  PRECINCT_TOAST: 'Loading precinct data…',

  // Mobile layer toggle
  /** Mobile districts layer button. One word. Related: UI.MOBILE_PRECINCTS, UI.MOBILE_OFF. */
  MOBILE_DISTRICTS: 'Districts',

  /** Mobile precincts layer button. One word. Related: UI.MOBILE_DISTRICTS, UI.MOBILE_OFF. */
  MOBILE_PRECINCTS: 'Precincts',

  /** Mobile "off" layer button. One word. Related: UI.MOBILE_DISTRICTS, UI.MOBILE_PRECINCTS. */
  MOBILE_OFF: 'Off',

  // Panel toggle (mobile)
  /** Mobile panel toggle title when panel is open. Related: UI.PANEL_SHOW_TITLE. */
  PANEL_HIDE_TITLE: 'Hide stats panel',

  /** Mobile panel toggle title when panel is closed. Related: UI.PANEL_HIDE_TITLE. */
  PANEL_SHOW_TITLE: 'Show stats panel',

  /** Desktop panel toggle title when in vertical layout. Related: UI.PANEL_TO_SIDE_TITLE. */
  PANEL_TO_BOTTOM_TITLE: 'Switch to bottom panels',

  /** Desktop panel toggle title when in horizontal layout. Related: UI.PANEL_TO_BOTTOM_TITLE. */
  PANEL_TO_SIDE_TITLE: 'Switch to side panels',

  // Cycle animation button
  /** Animate button title when at the last cycle. Replaces UI.ANIMATE_TITLE. Related: UI.ANIMATE_TITLE. */
  ANIMATE_WRAP_TITLE: 'Animate from 1992 (2024 is the latest cycle)',

  /** Animate button title — default. Related: UI.ANIMATE_WRAP_TITLE. */
  ANIMATE_TITLE: 'Animate through cycles',

  /** Animate button title when animation is running. Related: UI.ANIMATE_TITLE. */
  PAUSE_TITLE: 'Pause animation',

  // Cycle bar — aria
  /** aria-label for the year selector group. Related: cycle buttons. */
  CYCLE_GROUP_LABEL: 'Select redistricting cycle',

  // Preview badge
  /** Small badge shown when hovering over a cycle button. One word, lowercase. Related: cycle buttons. */
  PREVIEW_BADGE: 'preview',

  // Ballotpedia link
  /** Link text to Ballotpedia district page. Short. Always followed by '→'. Related: STATE namespace. */
  BALLOTPEDIA_LINK: 'Ballotpedia →',

  // Data credits card
  /** © CARTO attribution. Legal — do not change. Related: credits card. */
  CREDITS_CARTO: '© CARTO',

  /** OpenStreetMap attribution. Legal — do not change. Related: CREDITS_CARTO. */
  CREDITS_OSM: '© OpenStreetMap',
} as const;

// ---------------------------------------------------------------------------
// UI factory functions
// ---------------------------------------------------------------------------

/**
 * Mobile panel collapse handle aria-label.
 * Used: mobile panel handle button.
 * Constraints: should be a full sentence.
 * Related: UI.PANEL_HIDE_TITLE.
 */
export function mobileCollapseAriaLabel(): string {
  return 'Collapse panel, show full map';
}

/**
 * State path aria-label in NationView and state tile grid.
 * Used: SVG <path> elements for each state.
 * Constraints: keep short; appends "— click to explore" for fully-available states.
 * Related: NATION namespace.
 */
export function stateAriaLabel(stateName: string, full: boolean): string {
  return full ? `${stateName} — click to explore` : stateName;
}

/**
 * Cycle card title in the state panel.
 * Used: snap-card-title for the key stats card.
 * Constraints: short — rendered as a heading above the stats dl.
 * Related: STATE.SNAP_STATS_TITLE_FN.
 */
export function cycleTitleFn(year: number, totalSeats: number): string {
  return `${year} — ${totalSeats} seats`;
}

/**
 * Key events snap card title.
 * Used: snap-card-title for the events card in the state panel.
 * Constraints: short — includes year for context.
 * Related: STATE.SNAP_EVENTS_LABEL.
 */
export function keyEventsTitleFn(year: number): string {
  return `Key events — ${year}`;
}

/**
 * "Did not exist" message shown when a pinned district wasn't part of the selected cycle.
 * Used: dc-pending paragraph in district panel.
 * Constraints: two sentences; keep factual and neutral.
 * Related: STATE.DISTRICT_NO_DATA.
 */
export function districtNotExistFn(
  distNum: number,
  year: number,
  stateName: string,
  totalSeats: number,
): string {
  return `District ${distNum} did not exist in ${year}.\n${stateName} had ${totalSeats} seats that cycle.`;
}

/**
 * Tooltip explaining the election result pill in the district panel header.
 * Used: Tooltip wrapping the party Pill in panel-header.
 * Constraints: one sentence; neutral framing.
 * Related: STATE.DISTRICT_NO_RESULT.
 */
export function districtElectionResultFn(party: 'D' | 'R', year: number): string {
  const label = party === 'D' ? 'Democratic' : 'Republican';
  return `This district returned a ${label} representative in the ${year} election cycle.`;
}

/**
 * Fallback shown when election result is unavailable.
 * Used: same Tooltip as districtElectionResultFn when won_by is neither D nor R.
 * Constraints: one sentence.
 * Related: districtElectionResultFn.
 */
export function districtNoResultFn(): string {
  return 'Election result not available for this district and cycle.';
}

// ---------------------------------------------------------------------------
// NATION — NationView.svelte specific
// ---------------------------------------------------------------------------

export const NATION = {
  // Loading
  /** Full-screen loading overlay. Short. Related: none. */
  LOADING: 'Loading map…',

  // Zoom controls
  /** Zoom in button title and aria-label. One or two words. Related: NATION.ZOOM_OUT. */
  ZOOM_IN: 'Zoom in',

  /** Zoom out button title and aria-label. One or two words. Related: NATION.ZOOM_IN. */
  ZOOM_OUT: 'Zoom out',

  /** Reset zoom button title and aria-label. Two words. Related: NATION.ZOOM_IN. */
  ZOOM_RESET: 'Reset zoom',

  /** NE shortcut button label. Two letters — abbreviation for Northeast. Related: NATION.NE_TITLE. */
  NE_LABEL: 'NE',

  /** NE shortcut button title — long description shown in tooltip. Related: NATION.NE_LABEL, NATION.NE_NOTE. */
  NE_TITLE: 'Northeast corridor — 12 small states pack ~90 congressional seats into a densely contested region',

  /** Info note that appears below the NE zoom area on map. Related: NATION.NE_TITLE. */
  NE_NOTE: 'Northeast corridor — 12 states, ~90 seats, the most geographically compressed congressional battleground in the US',

  // Tour (attract mode / demo reel)
  /** Tour button title when reel is inactive. Related: NATION.TOUR_STOP_TITLE. */
  TOUR_START_TITLE: 'Tour the most gerrymandered states',

  /** Tour button title when reel is active. Related: NATION.TOUR_START_TITLE. */
  TOUR_STOP_TITLE: 'Stop tour',

  /** Tour button aria-label when reel is inactive. Related: NATION.TOUR_START_ARIA. */
  TOUR_START_ARIA: 'Start tour',

  /** Tour button aria-label when reel is active. Related: NATION.TOUR_START_ARIA. */
  TOUR_STOP_ARIA: 'Stop tour',

  // Tooltip fields
  /** Efficiency gap label in hover tooltip. Short. Related: CHARTS.EG_TITLE. */
  TOOLTIP_EG: 'Efficiency gap',

  /** Seats label in hover tooltip. One word. Related: STATE.DT_SEATS. */
  TOOLTIP_SEATS: 'Seats',

  /** D vote share label in hover tooltip. Related: STATE.DT_D_VOTE_SHARE. */
  TOOLTIP_D_VOTE: 'D vote share',

  /** Mean–median label in hover tooltip. Related: CHARTS.MM_TITLE. */
  TOOLTIP_MM: 'Mean–median',

  /** Seat gap label in hover tooltip. Two words. Related: STATE.DT_SEAT_VOTE. */
  TOOLTIP_SEAT_GAP: 'Seat gap',

  /** Shown in tooltip when a state has no election data. Related: NATION.TOOLTIP_EXPLORE. */
  TOOLTIP_NO_DATA: 'No election data',

  /** CTA link at the bottom of the tooltip. Short, with arrow. Related: UI.NAV_ALL_STATES. */
  TOOLTIP_EXPLORE: 'Explore districts →',

  /** Shown in tooltip for states that don't yet have full district data. Related: NATION.TOOLTIP_EXPLORE. */
  TOOLTIP_COMING_SOON: 'District maps coming soon',

  // Legend
  /** Left label on the EG choropleth legend. Related: NATION.LEGEND_NEUTRAL, NATION.LEGEND_R. */
  LEGEND_D: 'D gerrymander',

  /** Centre label on the EG choropleth legend. Related: NATION.LEGEND_D, NATION.LEGEND_R. */
  LEGEND_NEUTRAL: 'Neutral',

  /** Right label on the EG choropleth legend. Related: NATION.LEGEND_D, NATION.LEGEND_NEUTRAL. */
  LEGEND_R: 'R gerrymander',

  // Rankings panel
  /** Rankings panel region aria-label. Full phrase. Related: NATION.RANKINGS_R_SECTION, NATION.RANKINGS_D_SECTION. */
  RANKINGS_ARIA: 'States ranked by efficiency gap',

  /** Section heading for the top R-favoring gerrymanders. Related: NATION.RANKINGS_D_SECTION. */
  RANKINGS_R_SECTION: 'Most R-favoring',

  /** Section heading for the top D-favoring gerrymanders. Related: NATION.RANKINGS_R_SECTION. */
  RANKINGS_D_SECTION: 'Most D-favoring',
} as const;

// ---------------------------------------------------------------------------
// NATION factory functions
// ---------------------------------------------------------------------------

/**
 * Rankings panel heading showing cycle year and national seat totals.
 * Used: rankings panel h3.
 * Constraints: short — rendered in a narrow sidebar.
 * Related: NATION.RANKINGS_ARIA.
 */
export function rankingsHeadingFn(year: number): string {
  return `National — ${year}`;
}

// ---------------------------------------------------------------------------
// STATE — state view panel strings
// ---------------------------------------------------------------------------

export const STATE = {
  // Snap nav labels (state panel)
  /** Snap nav label for key stats card. One word. Related: STATE.SNAP_SEATS_LABEL. */
  SNAP_STATS_LABEL: 'Stats',

  /** Snap nav label for seat vs vote card. One word. Related: STATE.SNAP_STATS_LABEL. */
  SNAP_SEATS_LABEL: 'Seats',

  /** Snap nav label for trend chart card. One word. Related: STATE.SNAP_STATS_LABEL. */
  SNAP_TREND_LABEL: 'Trend',

  /** Snap nav label for efficiency gap chart card. Two words abbreviated. Related: STATE.SNAP_STATS_LABEL. */
  SNAP_EG_LABEL: 'Eff. gap',

  /** Snap nav label for competitiveness chart card. One word. Related: STATE.SNAP_STATS_LABEL. */
  SNAP_COMPETE_LABEL: 'Compete.',

  /** Snap nav label for key events card. One word. Related: STATE.SNAP_STATS_LABEL. */
  SNAP_EVENTS_LABEL: 'Events',

  /** Snap nav label for data credits card. One word. Related: STATE.SNAP_STATS_LABEL. */
  SNAP_CREDITS_LABEL: 'Credits',

  // District panel snap nav
  /** District snap nav label for partisan card. One word. Related: STATE.DIST_RACE_LABEL. */
  DIST_PARTISAN_LABEL: 'Partisan',

  /** District snap nav label for race & pop card. Three words. Related: STATE.DIST_PARTISAN_LABEL. */
  DIST_RACE_LABEL: 'Race & pop',

  /** District snap nav label for income & edu card. Three words. Related: STATE.DIST_PARTISAN_LABEL. */
  DIST_INCOME_LABEL: 'Income & edu',

  // Stats panel — dl keys
  /** DT label for redistricting controller. Two words. Related: STATE.DRAWN_BY_TOOLTIP_*. */
  DT_DRAWN_BY: 'Drawn by',

  /** DT label for seat counts. One word. Related: NATION.TOOLTIP_SEATS. */
  DT_SEATS: 'Seats',

  /** DT label for Democratic two-party vote share. Related: STATE.DT_SEATS. */
  DT_D_VOTE_SHARE: 'D vote share',

  /** DT label for Republican two-party vote share. Related: STATE.DT_D_VOTE_SHARE. */
  DT_R_VOTE_SHARE: 'R vote share',

  /** DT label (abbreviated) for efficiency gap. Related: NATION.TOOLTIP_EG. */
  DT_EFF_GAP: 'Eff. gap',

  /** DT label for mean–median difference. Related: CHARTS.MM_TITLE. */
  DT_MEAN_MEDIAN: 'Mean–median',

  /** DT label (abbreviated) for seat / vote ratio. Related: CHARTS.SV_TITLE. */
  DT_SEAT_VOTE: 'Seat / vote',

  /** DT label (abbreviated) for compactness (Polsby-Popper). Related: STATE.DIST_DT_COMPACT. */
  DT_COMPACTNESS: 'Compactness',

  // Stats card legend
  /** Democrat swatch label in stats card. One word. Related: STATE.LEGEND_R. */
  LEGEND_D: 'Democrat',

  /** Republican swatch label in stats card. One word. Related: STATE.LEGEND_D. */
  LEGEND_R: 'Republican',

  // Stats card tooltips (inline in DT elements)
  /** Tooltip text for D vote share DT. Full sentence. Related: STATE.DT_D_VOTE_SHARE. */
  VOTE_SHARE_D_TIP: 'Democratic share of the two-party vote across all US House races in this state for this cycle. Only D and R votes are counted — third-party votes are excluded.',

  /** Tooltip text for R vote share DT. Full sentence. Related: STATE.VOTE_SHARE_D_TIP. */
  VOTE_SHARE_R_TIP: 'Republican share of the two-party vote across all US House races in this state for this cycle.',

  /** Efficiency gap tooltip title (in snap card Tooltip). One or two words. Related: STATE.EFF_GAP_TIP. */
  EFF_GAP_TITLE: 'Efficiency gap',

  /** Efficiency gap tooltip body (in snap card Tooltip). Related: STATE.EFF_GAP_TITLE. */
  EFF_GAP_TIP: 'Measures wasted votes — votes cast for the losing party, or surplus votes beyond what the winning party needed. A positive value means Republican votes were used more efficiently, indicating a potential R-favoring gerrymander. Values above ±8% are generally considered significant.',

  // Drawn-by tooltips
  /** Tooltip title for commission-drawn maps. Related: STATE.DRAWN_BY_COMMISSION_TEXT. */
  DRAWN_BY_COMMISSION_TITLE: 'Independent / bipartisan commission',

  /** Tooltip body for commission-drawn maps. Related: STATE.DRAWN_BY_COMMISSION_TITLE. */
  DRAWN_BY_COMMISSION_TEXT: 'These lines were drawn by a body insulated from direct party control. Commission-drawn maps tend to produce lower efficiency gaps and fewer legal challenges.',

  /** Tooltip title for court-ordered maps. Related: STATE.DRAWN_BY_COURT_TEXT. */
  DRAWN_BY_COURT_TITLE: 'Court-ordered map',

  /** Tooltip body for court-ordered maps. Related: STATE.DRAWN_BY_COURT_TITLE. */
  DRAWN_BY_COURT_TEXT: 'A federal or state court intervened — typically after a legal challenge to a gerrymandered map — and imposed or approved these district lines.',

  /** Tooltip title for Republican-controlled maps. Related: STATE.DRAWN_BY_R_TEXT. */
  DRAWN_BY_R_TITLE: 'Republican-controlled legislature',

  /** Tooltip body for Republican-controlled maps. Related: STATE.DRAWN_BY_R_TITLE. */
  DRAWN_BY_R_TEXT: 'The party that controls redistricting can draw boundaries to maximize its seat advantage. Republican control here means the GOP had significant influence over where district lines were placed.',

  /** Tooltip title for Democratic-controlled maps. Related: STATE.DRAWN_BY_D_TEXT. */
  DRAWN_BY_D_TITLE: 'Democratic-controlled legislature',

  /** Tooltip body for Democratic-controlled maps. Related: STATE.DRAWN_BY_D_TITLE. */
  DRAWN_BY_D_TEXT: 'The party that controls redistricting can draw boundaries to maximize its seat advantage. Democratic control here means the party had significant influence over where district lines were placed.',

  /** Fallback tooltip body for unknown controllers. Related: STATE.DRAWN_BY_COMMISSION_TEXT. */
  DRAWN_BY_DEFAULT_TEXT: 'The body responsible for drawing congressional district lines for this cycle.',

  // District panel — dl keys
  /** DT label for partisan lean. One word. Related: STATE.DIST_DT_MARGIN. */
  DIST_DT_LEAN: 'Lean',

  /** DT label for margin. One word. Related: STATE.DIST_DT_LEAN. */
  DIST_DT_MARGIN: 'Margin',

  /** DT label (abbreviated) for compactness. One word. Related: STATE.DT_COMPACTNESS. */
  DIST_DT_COMPACT: 'Compact.',

  /** DT label for total population. One word. Related: STATE.DIST_DT_DEVIATION. */
  DIST_DT_POPULATION: 'Population',

  /** DT label for population deviation. Two words. Related: STATE.DIST_DT_POPULATION. */
  DIST_DT_DEVIATION: 'Pop. deviation',

  /** DT label for non-Hispanic White share. Three words. Related: STATE.DIST_DT_BLACK. */
  DIST_DT_WHITE: 'NH White',

  /** DT label for Black share. One word. Related: STATE.DIST_DT_WHITE. */
  DIST_DT_BLACK: 'Black',

  /** DT label for Hispanic share. One word. Related: STATE.DIST_DT_WHITE. */
  DIST_DT_HISPANIC: 'Hispanic',

  /** DT label for Asian / PI share. Three words. Related: STATE.DIST_DT_WHITE. */
  DIST_DT_ASIAN: 'Asian / PI',

  /** DT label for other-race share. One word. Related: STATE.DIST_DT_WHITE. */
  DIST_DT_OTHER: 'Other',

  /** DT label for median income. Two words. Related: STATE.DIST_DT_BACHELORS. */
  DIST_DT_INCOME: 'Med. income',

  /** DT label for Bachelor's degree or higher. Two words with symbol. Related: STATE.DIST_DT_INCOME. */
  DIST_DT_BACHELORS: "Bachelor's+",

  // District panel empty states
  /** Shown in race/pop card when demographics aren't yet available. Related: STATE.DIST_INCOME_UNAVAIL. */
  DIST_DEMOG_UNAVAIL: 'Not yet available.',

  /** Shown in income/edu card when demographics aren't yet available. Related: STATE.DIST_DEMOG_UNAVAIL. */
  DIST_INCOME_UNAVAIL: 'Income & education data not yet available for this cycle.',

  /** DT label for won-by field. Two words. Related: STATE.DIST_DT_LEAN. */
  DIST_DT_WON_BY: 'Won by',

  /** Democrat label in won-by field. One word. Related: STATE.WON_BY_R. */
  WON_BY_D: 'Democrat',

  /** Republican label in won-by field. One word. Related: STATE.WON_BY_D. */
  WON_BY_R: 'Republican',

  // District snap card tooltip texts
  /** Tooltip text for the Partisan snap card info icon. Related: CHARTS.SEAT_VOTE_TIP. */
  PARTISAN_CARD_TIP: "Election results and partisan lean for this district. 'Lean' is the two-party Democratic vote share from US House elections in this cycle. 'Margin' is the winning candidate's margin of victory.",

  /** Tooltip text for the Race & pop snap card info icon. Related: STATE.DIST_DT_POPULATION. */
  RACE_CARD_TIP: 'Racial and ethnic composition and total population for this district, from the decennial census closest to this redistricting cycle. Arrows show change from the previous cycle.',

  /** Tooltip text for the Income & edu snap card info icon. Related: STATE.DIST_DT_INCOME. */
  INCOME_CARD_TIP: 'Median household income and educational attainment for this district, from the decennial census closest to this redistricting cycle. Arrows show change from the previous cycle.',

  // Data credits
  /** Snap card title for data credits. Two words. Related: STATE.SNAP_CREDITS_LABEL. */
  SNAP_CREDITS_TITLE: 'Data credits',

  // Precinct legend (Map.svelte overlay, visible when showPrecincts=true)
  /** Left end of precinct color bar: Republican-leaning. One letter. Related: STATE.PRECINCT_LEGEND_D. */
  PRECINCT_LEGEND_R: 'R',

  /** Center of precinct color bar: balanced precincts. One word. Related: STATE.PRECINCT_LEGEND_R. */
  PRECINCT_LEGEND_NEUTRAL: 'Neutral',

  /** Right end of precinct color bar: Democratic-leaning. One letter. Related: STATE.PRECINCT_LEGEND_R. */
  PRECINCT_LEGEND_D: 'D',

  /** Hint shown below map when precinct layer is on but zoom is too low. Short sentence. Related: precinctDataYearFn. */
  PRECINCT_ZOOM_HINT: 'Zoom in to see precinct data',
} as const;

// ---------------------------------------------------------------------------
// STATE factory functions
// ---------------------------------------------------------------------------

/**
 * Precinct data year note shown in the precinct legend when displayed year differs from selected year.
 * Used: Map.svelte .precinct-legend-note div.
 * Constraints: short; the year is the fallback year actually shown, not the selected cycle.
 * Related: STATE.PRECINCT_LEGEND_R, STATE.PRECINCT_ZOOM_HINT.
 */
export function precinctDataYearFn(year: number): string {
  return `Precinct data: ${year}`;
}

// ---------------------------------------------------------------------------
// CHARTS — chart titles, axis labels, legends, hint text
// ---------------------------------------------------------------------------

export const CHARTS = {
  // Seat vs vote share
  /** Snap card title for SeatVoteChart. Three words. Related: CHARTS.SEAT_VOTE_TIP, STATE.SNAP_SEATS_LABEL. */
  SEAT_VOTE_TITLE: 'Seat vs. vote share',

  /** ⓘ tooltip text for the SeatVoteChart snap card. Full sentence. Related: CHARTS.SEAT_VOTE_TITLE. */
  SEAT_VOTE_TIP: 'Compares seats won vs. votes cast for each party. If one party wins 60% of seats with only 50% of votes, the map may be structurally tilted.',

  // Vote vs seat share (trend)
  /** Snap card title for TrendChart. Four words. Related: CHARTS.TREND_TIP, STATE.SNAP_TREND_LABEL. */
  TREND_TITLE: 'Vote vs. seat share',

  /** ⓘ tooltip text for TrendChart snap card. Two sentences. Related: CHARTS.TREND_TITLE. */
  TREND_TIP: 'Tracks Democratic vote share (solid line) and seat share (dashed line) across all cycles. A persistent gap between the two lines suggests a structural partisan advantage built into the map.',

  /** Legend note below TrendChart title. Short, uses em dashes. Related: CHARTS.TREND_TITLE. */
  TREND_NOTE: '— votes \u00a0·\u00a0 – – seats',

  // Efficiency gap
  /** Snap card title for EGChart. Two words. Related: CHARTS.EG_TIP, STATE.SNAP_EG_LABEL. */
  EG_TITLE: 'Efficiency gap',

  /** ⓘ tooltip text for EGChart snap card. Two sentences. Related: CHARTS.EG_TITLE. */
  EG_TIP: "Measures partisan bias by counting 'wasted votes' — votes cast for a losing candidate, or surplus votes beyond what a winner needed. A positive value means Republican votes were used more efficiently. Values above ±8% are generally considered significant.",

  /** Axis direction note below EGChart title. Short. Related: CHARTS.EG_TITLE. */
  EG_NOTE: '+ favors R \u00a0·\u00a0 − favors D',

  // Competitiveness
  /** Snap card title for CompetitivenessChart. Two words. Related: CHARTS.COMPETE_TIP, STATE.SNAP_COMPETE_LABEL. */
  COMPETE_TITLE: 'District competitiveness',

  /** ⓘ tooltip text for CompetitivenessChart snap card. Two sentences. Related: CHARTS.COMPETE_TITLE. */
  COMPETE_TIP: "Shows how many districts were safe (won by >10%), leaning, or competitive for each party. Heavy clustering of safe districts is a hallmark of packing — concentrating one party's voters to waste their votes.",

  // Mean–median (used as a label in tooltips and help)
  /** Short label for mean–median difference metric. Two words with em dash. Related: HELP.METRIC_MM. */
  MM_TITLE: 'Mean–median',

  // Seat / vote ratio (label)
  /** Short label for seat/vote ratio metric. Three words. Related: HELP.METRIC_SV. */
  SV_TITLE: 'Seat / vote',

  // SeatVoteChart row labels
  /** All-caps row label above the votes bar in SeatVoteChart. One word, displayed uppercase via style attr. Related: CHARTS.SEAT_VOTE_SEATS. */
  SEAT_VOTE_VOTES: 'VOTES',

  /** All-caps row label above the seats bar in SeatVoteChart. One word. Related: CHARTS.SEAT_VOTE_VOTES. */
  SEAT_VOTE_SEATS: 'SEATS',

  // TrendChart legend labels
  /** Legend label for the Democratic vote-share line in TrendChart. Short. Related: CHARTS.TREND_LEGEND_SEATS. */
  TREND_LEGEND_VOTES: 'Votes D',

  /** Legend label for the Democratic seat-share line in TrendChart. Short. Related: CHARTS.TREND_LEGEND_VOTES. */
  TREND_LEGEND_SEATS: 'Seats D',

  // CompetitivenessChart bucket labels (appear in legend)
  /** Competitiveness legend label: safe Democratic seat. Related: CHARTS.COMPETE_LEAN_D. */
  COMPETE_SOLID_D: 'Solid D',

  /** Competitiveness legend label: leaning Democratic. Related: CHARTS.COMPETE_SOLID_D. */
  COMPETE_LEAN_D: 'Lean D',

  /** Competitiveness legend label: competitive seat. Abbreviated to fit the bar. Related: CHARTS.COMPETE_LEAN_D. */
  COMPETE_COMPETITIVE: 'Comp.',

  /** Competitiveness legend label: leaning Republican. Related: CHARTS.COMPETE_SOLID_R. */
  COMPETE_LEAN_R: 'Lean R',

  /** Competitiveness legend label: safe Republican seat. Related: CHARTS.COMPETE_LEAN_R. */
  COMPETE_SOLID_R: 'Solid R',
} as const;

// ---------------------------------------------------------------------------
// HELP — help modal copy
// ---------------------------------------------------------------------------

export const HELP = {
  /** Help modal h2 heading. Three words — brand name included. Related: UI.SITE_NAME. */
  MODAL_TITLE: 'About District Drift',

  /** First hook paragraph beneath the modal heading. No length limit — displayed as a paragraph. Related: HELP.HOOK_P2. */
  HOOK_P1: 'Every ten years, after the Census, state legislatures redraw the lines of congressional districts — one of the most consequential and least scrutinized acts in American democracy. Occasionally states redraw mid-decade too: Texas famously did so in 2003 under Tom DeLay to lock in a Republican majority.',

  /** Second hook paragraph (the italicised question). The <em> fragment is rendered inline in the component. Related: HELP.HOOK_P1. */
  HOOK_P2_PREFIX: 'District Drift is a retrospective: ',

  /** Italicised fragment within HOOK_P2. Should be a rhetorical question. Related: HELP.HOOK_P2_PREFIX. */
  HOOK_P2_ITALIC: 'how have those lines been drawn since 1992, and who benefited?',

  /** Sentence appended to HOOK_P2. Related: HELP.HOOK_P2_ITALIC. */
  HOOK_P2_SUFFIX: ' Both parties have gerrymandered. This site shows all of it.',

  /** Feedback nudge beneath the hook paragraphs. One or two sentences. Related: UI.FEEDBACK_LABEL. */
  FEEDBACK_NUDGE: 'Spotted a data error or have a question? Use the Feedback button in the header — all reports are read and appreciated.',

  // Tab labels
  /** Nation view tab label. Includes emoji prefix. Related: HELP.TAB_STATE. */
  TAB_NATION: '🗺 Nation view',

  /** State view tab label. Includes emoji prefix. Related: HELP.TAB_NATION. */
  TAB_STATE: '🏛 State view',

  /** Metrics tab label. Includes emoji prefix. Related: HELP.TAB_NATION. */
  TAB_METRICS: '📊 Metrics',

  /** Data tab label. Includes emoji prefix. Related: HELP.TAB_NATION. */
  TAB_DATA: '🗃 Data',

  // Nation view steps
  /** Nation view step 1. One sentence. Related: HELP.NATION_STEP_2. */
  NATION_STEP_1: 'The <strong>opening map</strong> shows all 50 states shaded by their efficiency gap — how structurally biased each state\'s map was in the selected cycle.',

  /** Nation view step 2. Two sentences. Related: HELP.NATION_STEP_1. */
  NATION_STEP_2: 'Step through cycles using the year buttons, or press <strong>▶</strong> to animate 1992 → 2024. Pill overlays show how congressional seats shifted vs. the previous cycle — <strong>+2R</strong> means two new Republican seats, <strong>−1D</strong> means one fewer Democratic seat. Pills are always visible at rest; use the <strong>Δ</strong> button to toggle them off.',

  /** Nation view step 3. One sentence. Related: HELP.NATION_STEP_2. */
  NATION_STEP_3: 'The <strong>NE</strong> button zooms into the Northeast corridor — 12 densely packed states holding ~90 seats, the most compressed congressional battleground in the US.',

  /** Nation view step 4. Two sentences. Related: HELP.NATION_STEP_3. */
  NATION_STEP_4: 'The <strong>Rankings</strong> panel lists every state by efficiency gap magnitude. On desktop it\'s always visible on the right. On mobile, <strong>swipe up</strong> from the handle bar at the bottom of the screen to open it.',

  /** Nation view step 5. Two sentences. Related: HELP.NATION_STEP_4. */
  NATION_STEP_5: 'Press <strong>▶ Tour</strong> (bottom-right, desktop) to launch an auto-tour of the most gerrymandered states. Each state gets a brief spotlight — click the card or tap the state to jump straight to it. Press <strong>■</strong> to stop at any time.',

  // State view steps
  /** State view step 1. One sentence. Related: HELP.STATE_STEP_2. */
  STATE_STEP_1: '<strong>Select a state</strong> from the dropdown in the header to dive into its district map. All 50 states are available across five cycles: 1992, 2002, 2012, 2022, and 2024.',

  /** State view step 2. Two sentences. Related: HELP.STATE_STEP_1. */
  STATE_STEP_2: 'Switch cycles to watch district boundaries <strong>morph</strong> to their new positions. A brief <strong>swing overlay</strong> shows which districts shifted toward Democrats or Republicans. Dashed lines remain as a ghost of the previous map.',

  /** State view step 3. Two sentences. Related: HELP.STATE_STEP_2. */
  STATE_STEP_3: '<strong>Click any district</strong> to pin a detail card. It stays locked as you step through cycles — compare partisan lean, racial composition, income, and education across every map redraw for that district.',

  /** State view step 4. Two sentences. Related: HELP.STATE_STEP_3. */
  STATE_STEP_4: 'Use <strong>⤴ Share</strong> in the header to share the current view — opens your device\'s share options (email, messages, etc.) or copies the link directly. State, year, district, and panel layout are all encoded in the URL.',

  // Metrics tab
  /** Efficiency gap metric name. Two words. Related: CHARTS.EG_TITLE. */
  METRIC_EG: 'Efficiency gap',

  /** Efficiency gap definition. Long — rendered in a <dd>. Related: HELP.METRIC_EG. */
  METRIC_EG_TEXT: 'Counts "wasted votes" — votes for a losing candidate, or surplus votes beyond what a winner needed. When one party\'s votes are systematically wasted through <em>packing</em> (concentrating opponents into a few safe seats) and <em>cracking</em> (diluting them across many losing ones), the map structurally favors the other. <strong>+5%</strong> means Democrats wasted 5 pp more (map favors Republicans); <strong>−5%</strong> means the reverse.',

  /** Mean–median metric name. Three words with em dash. Related: CHARTS.MM_TITLE. */
  METRIC_MM: 'Mean–median difference',

  /** Mean–median definition. Long. Related: HELP.METRIC_MM. */
  METRIC_MM_TEXT: 'Compares the average Democratic district vote share to the median. Packing concentrates Democratic votes into a few blowout districts, pushing the median below the mean — a negative value signals a Republican-favoring map. Near zero suggests more even distribution.',

  /** Seat/vote ratio metric name. Three words. Related: CHARTS.SV_TITLE. */
  METRIC_SV: 'Seat / vote ratio',

  /** Seat/vote ratio definition. Long. Related: HELP.METRIC_SV. */
  METRIC_SV_TEXT: 'Seats won relative to statewide vote share. <strong>1.0×</strong> is proportional. Above 1× means a party wins more seats than its votes would predict; below 1× means fewer. Both parties can exceed 1× — one state\'s gerrymander doesn\'t cancel another\'s.',

  /** Compactness metric name. Three words. Related: CHARTS.COMPETE_TITLE. */
  METRIC_COMPACT: 'Compactness (Polsby-Popper)',

  /** Compactness definition. Long. Related: HELP.METRIC_COMPACT. */
  METRIC_COMPACT_TEXT: 'Shape regularity on a 0–1 scale (circle = 1). Bizarrely shaped districts can signal packing and cracking — though geography and communities of interest also produce non-compact shapes legitimately.',

  // Packing/cracking diagram
  /** PACKING panel label in the diagram. All-caps intentional — visual design element. Related: HELP.DIAGRAM_CRACKING. */
  DIAGRAM_PACKING: 'PACKING',

  /** PACKING subtitle in the diagram. Short. Related: HELP.DIAGRAM_PACKING. */
  DIAGRAM_PACKING_SUB: 'D voters crammed into one seat',

  /** CRACKING panel label in the diagram. All-caps intentional — visual design element. Related: HELP.DIAGRAM_PACKING. */
  DIAGRAM_CRACKING: 'CRACKING',

  /** CRACKING subtitle in the diagram. Short. Related: HELP.DIAGRAM_CRACKING. */
  DIAGRAM_CRACKING_SUB: 'D voters diluted — never a majority',

  /** Figcaption below the packing/cracking diagram. One sentence. Related: HELP.DIAGRAM_PACKING. */
  DIAGRAM_CAPTION: 'Hypothetical 4-district state. Both methods give R most seats despite near-even vote share — through opposite techniques.',

  /** Aria-label for the packing/cracking SVG diagram. Full sentence. Related: HELP.DIAGRAM_CAPTION. */
  DIAGRAM_ARIA: 'Diagram showing packing and cracking gerrymandering techniques',

  /** Caveat note below the metrics definitions. One sentence. Related: HELP.METRIC_EG_TEXT. */
  METRICS_NOTE: 'These metrics can behave counterintuitively in landslide states, where dominant parties also "waste" many votes. Always read them alongside seat and vote totals.',

  // Data tab
  /** Source label for boundary data. One word. Related: HELP.DATA_ELECTIONS. */
  DATA_BOUNDARIES: 'Boundaries',

  /** Data source description for boundary data. One sentence. Related: HELP.DATA_BOUNDARIES. */
  DATA_BOUNDARIES_TEXT: 'NHGIS (U of Minnesota) — 103rd–118th Congress shapefiles',

  /** Source label for election data. One word. Related: HELP.DATA_BOUNDARIES. */
  DATA_ELECTIONS: 'Elections',

  /** Data source description for election data. One sentence. Related: HELP.DATA_ELECTIONS. */
  DATA_ELECTIONS_TEXT: 'MIT Election Lab — US House returns 1976–2024',

  /** Source label for demographics data. One word. Related: HELP.DATA_ELECTIONS. */
  DATA_DEMOGRAPHICS: 'Demographics',

  /** Data source description for demographics data. One sentence. Related: HELP.DATA_DEMOGRAPHICS. */
  DATA_DEMOGRAPHICS_TEXT: 'US Census via NHGIS — 1990 STF1/3, 2000 SF1/3, ACS 2008–12 and 2018–22',

  /** Footnote about 1992 boundary gaps. One sentence. Related: HELP.DATA_BOUNDARIES. */
  DATA_1992_NOTE: 'The 1992 cycle has known boundary gaps in the NHGIS source data for some states.',

  /** Footnote about the 2024 cycle. One paragraph. Related: HELP.DATA_ELECTIONS. */
  DATA_2024_NOTE: 'The 2024 elections used the same 118th Congress district maps as 2022 — no new redistricting occurred between cycles. Election results are actual 2024 House race outcomes. District demographics (race, income, education) reflect the 2020 Census, identical to the 2022 data. Four states (AL, GA, LA, NC) used court-ordered remedial maps in 2024 due to VRA litigation; their cycle notes describe the changes.',
} as const;

// ---------------------------------------------------------------------------
// FEEDBACK — feedback form labels, placeholders, success/error messages
// ---------------------------------------------------------------------------

export const FEEDBACK = {
  // Modal
  /** Feedback modal h2. Two words. Related: UI.FEEDBACK_LABEL. */
  MODAL_TITLE: 'Leave feedback',

  /** Close button aria-label in modal. One word. Related: UI.FEEDBACK_TITLE. */
  CLOSE_ARIA: 'Close',

  // Standalone page (feedback/+page.svelte)
  /** H1 on the standalone feedback page. Two words. Related: FEEDBACK.MODAL_TITLE. */
  PAGE_TITLE: 'Leave feedback',

  /** Subtitle beneath the h1 on the feedback page. One sentence. Related: FEEDBACK.PAGE_TITLE. */
  PAGE_SUBTITLE: 'Questions, suggestions, corrections — all welcome.',

  /** Back link text on the feedback page. Related: UI.SITE_NAME. */
  BACK_LINK: '← District Drift',

  // Screenshot
  /** Status text while screenshot is being captured. Short. Related: FEEDBACK.SCREENSHOT_LABEL. */
  SCREENSHOT_CAPTURING: 'Capturing screenshot…',

  /** Checkbox label for screenshot opt-in. Two words. Related: FEEDBACK.SCREENSHOT_CAPTURING. */
  SCREENSHOT_LABEL: 'Include screenshot',

  /** Alt text for the screenshot thumbnail. Related: FEEDBACK.SCREENSHOT_LABEL. */
  SCREENSHOT_ALT: 'Current view screenshot',

  // Form labels
  /** Label for the state selector. Two words. Has "optional" span. Related: FEEDBACK.ROLE_LABEL. */
  STATE_LABEL: 'State visited',

  /** Placeholder option in state selector. Related: FEEDBACK.STATE_LABEL. */
  STATE_PLACEHOLDER: '— select a state —',

  /** Label for the role selector. Two words. Has "optional" span. Related: FEEDBACK.STATE_LABEL. */
  ROLE_LABEL: 'Your role',

  /** Placeholder option in role selector. Related: FEEDBACK.ROLE_LABEL. */
  ROLE_PLACEHOLDER: '— select —',

  /** Label for the message textarea. One word. Has required asterisk. Related: FEEDBACK.MESSAGE_PLACEHOLDER. */
  MESSAGE_LABEL: 'Message',

  /** Placeholder text in the message textarea. Two-line prompt. Related: FEEDBACK.MESSAGE_LABEL. */
  MESSAGE_PLACEHOLDER: 'What I noticed:\n\nMy feedback or question:',

  /** Label for the optional email field. One word. Has optional hint. Related: FEEDBACK.MESSAGE_LABEL. */
  EMAIL_LABEL: 'Email',

  /** Optional hint next to the email label. Short phrase. Related: FEEDBACK.EMAIL_LABEL. */
  EMAIL_OPTIONAL_HINT: "optional — if you'd like a reply",

  /** Placeholder in the email input. Related: FEEDBACK.EMAIL_LABEL. */
  EMAIL_PLACEHOLDER: 'you@example.com',

  // Role options
  /** Role dropdown options. Order matters — matches the rendered select. Related: FEEDBACK.ROLE_LABEL. */
  ROLES: ['General public', 'Journalist', 'Educator', 'Researcher', 'Other'] as const,

  // Success / error
  /** Success heading after send. One or two words. Related: FEEDBACK.SUCCESS_BODY. */
  SUCCESS_HEADING: 'Thank you!',

  /** Success body after send. One sentence. Related: FEEDBACK.SUCCESS_HEADING. */
  SUCCESS_BODY: 'Your feedback has been sent.',

  /** Generic server error message. One sentence. Related: FEEDBACK.NETWORK_ERROR. */
  GENERIC_ERROR: 'Something went wrong.',

  /** Network error message when server is unreachable. One sentence. Related: FEEDBACK.GENERIC_ERROR. */
  NETWORK_ERROR: 'Could not reach the server. Please try again.',

  // Submit button
  /** Submit button label — default. Two words. Related: FEEDBACK.SUBMIT_SENDING. */
  SUBMIT_LABEL: 'Send feedback',

  /** Submit button label while sending. One word. Related: FEEDBACK.SUBMIT_LABEL. */
  SUBMIT_SENDING: 'Sending…',
} as const;
