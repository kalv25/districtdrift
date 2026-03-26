<script lang="ts">
  import { onMount } from 'svelte';
  import Map from '$lib/Map.svelte';
  import NationView from '$lib/NationView.svelte';
  import EGChart from '$lib/EGChart.svelte';
  import SeatVoteChart from '$lib/SeatVoteChart.svelte';
  import TrendChart from '$lib/TrendChart.svelte';
  import { CYCLE_EVENTS } from '$lib/events';
  import CompetitivenessChart from '$lib/CompetitivenessChart.svelte';
  import Pill from '$lib/Pill.svelte';
  import Tooltip from '$lib/Tooltip.svelte';
  import FeedbackModal from '$lib/FeedbackModal.svelte';
  import { YEAR_COLORS } from '$lib/colors';

  function drawnByTooltip(controller: string): { title: string; text: string } {
    if (/commission/i.test(controller))
      return {
        title: 'Independent / bipartisan commission',
        text:  'These lines were drawn by a body insulated from direct party control. Commission-drawn maps tend to produce lower efficiency gaps and fewer legal challenges.',
      };
    if (/court/i.test(controller))
      return {
        title: 'Court-ordered map',
        text:  'A federal or state court intervened — typically after a legal challenge to a gerrymandered map — and imposed or approved these district lines.',
      };
    if (/republican/i.test(controller))
      return {
        title: 'Republican-controlled legislature',
        text:  'The party that controls redistricting can draw boundaries to maximize its seat advantage. Republican control here means the GOP had significant influence over where district lines were placed.',
      };
    if (/democrat/i.test(controller))
      return {
        title: 'Democratic-controlled legislature',
        text:  'The party that controls redistricting can draw boundaries to maximize its seat advantage. Democratic control here means the party had significant influence over where district lines were placed.',
      };
    return {
      title: controller,
      text:  'The body responsible for drawing congressional district lines for this cycle.',
    };
  }

  type Resource = { label: string; url: string; description: string; };
  const RESOURCES: { heading: string; links: Resource[] }[] = [
    {
      heading: 'Data sources',
      links: [
        { label: 'Redistricting Data Hub', url: 'https://redistrictingdatahub.org', description: 'Precinct-level election results and shapefiles used in this project.' },
        { label: 'NHGIS', url: 'https://www.nhgis.org', description: 'Congressional district boundaries back to the 1780s, from the University of Minnesota.' },
        { label: 'PlanScore', url: 'https://planscore.org', description: 'Partisan bias and efficiency gap scores for maps across all 50 states.' },
        { label: 'Princeton Gerrymandering Project', url: 'https://gerrymander.princeton.edu', description: 'Report cards and historical partisan scores for congressional and legislative maps.' },
      ],
    },
    {
      heading: 'Research & litigation',
      links: [
        { label: 'Brennan Center for Justice', url: 'https://www.brennancenter.org/our-work/research-reports/gerrymandering-explained', description: 'Policy analysis and litigation tracking on redistricting and gerrymandering.' },
        { label: 'All About Redistricting', url: 'https://redistricting.lls.edu', description: 'Loyola Law School\'s state-by-state legal database of redistricting cases.' },
        { label: 'Ballotpedia — Redistricting', url: 'https://ballotpedia.org/Redistricting', description: 'Cycle-by-cycle summaries of redistricting processes in every state.' },
      ],
    },
    {
      heading: 'Interactive tools',
      links: [
        { label: 'Dave\'s Redistricting App', url: 'https://davesredistricting.org', description: 'Explore and draw congressional and legislative maps for any state.' },
        { label: 'Districtr', url: 'https://districtr.org', description: 'Public map-drawing tool used in official redistricting processes.' },
      ],
    },
  ];

  const STATES: Record<string, { name: string; flag: string }> = {
    MI: { name: 'Michigan', flag: '◉' },
    CA: { name: 'California', flag: '◉' },
    GA: { name: 'Georgia', flag: '◉' },
    NC: { name: 'North Carolina', flag: '◉' },
    WI: { name: 'Wisconsin', flag: '◉' },
    MD: { name: 'Maryland', flag: '◉' },
    PA: { name: 'Pennsylvania', flag: '◉' },
    TX: { name: 'Texas', flag: '◉' },
    OH: { name: 'Ohio', flag: '◉' },
    VA: { name: 'Virginia', flag: '◉' },
    FL: { name: 'Florida', flag: '◉' },
    IL: { name: 'Illinois', flag: '◉' },
    NY: { name: 'New York', flag: '◉' },
    AZ: { name: 'Arizona', flag: '◉' },
    NJ: { name: 'New Jersey', flag: '◉' },
    CO: { name: 'Colorado', flag: '◉' },
    MN: { name: 'Minnesota', flag: '◉' },
    AL: { name: 'Alabama', flag: '◉' },
    IN: { name: 'Indiana', flag: '◉' },
    LA: { name: 'Louisiana', flag: '◉' },
    MA: { name: 'Massachusetts', flag: '◉' },
    MO: { name: 'Missouri', flag: '◉' },
    OR: { name: 'Oregon', flag: '◉' },
    SC: { name: 'South Carolina', flag: '◉' },
    TN: { name: 'Tennessee', flag: '◉' },
    WA: { name: 'Washington', flag: '◉' },
    AK: { name: 'Alaska', flag: '◉' },
    AR: { name: 'Arkansas', flag: '◉' },
    CT: { name: 'Connecticut', flag: '◉' },
    DE: { name: 'Delaware', flag: '◉' },
    HI: { name: 'Hawaii', flag: '◉' },
    IA: { name: 'Iowa', flag: '◉' },
    ID: { name: 'Idaho', flag: '◉' },
    KS: { name: 'Kansas', flag: '◉' },
    KY: { name: 'Kentucky', flag: '◉' },
    ME: { name: 'Maine', flag: '◉' },
    MS: { name: 'Mississippi', flag: '◉' },
    MT: { name: 'Montana', flag: '◉' },
    ND: { name: 'North Dakota', flag: '◉' },
    NE: { name: 'Nebraska', flag: '◉' },
    NH: { name: 'New Hampshire', flag: '◉' },
    NM: { name: 'New Mexico', flag: '◉' },
    NV: { name: 'Nevada', flag: '◉' },
    OK: { name: 'Oklahoma', flag: '◉' },
    RI: { name: 'Rhode Island', flag: '◉' },
    SD: { name: 'South Dakota', flag: '◉' },
    UT: { name: 'Utah', flag: '◉' },
    VT: { name: 'Vermont', flag: '◉' },
    WV: { name: 'West Virginia', flag: '◉' },
    WY: { name: 'Wyoming', flag: '◉' },
  };

  // 'nation' = 50-state overview; a postal code = state detail view
  let viewMode = $state<'nation' | string>('MI');
  let selectedState = $derived(viewMode === 'nation' ? 'MI' : viewMode);
  let statePickerOpen = $state(false);
  let hoveredPicker   = $state<string | null>(null);

  // Geographic tile-grid positions (col 1–12, row 1–7).
  // Layout mirrors the well-known US tile-cartogram used in news/dataviz.
  const STATE_GRID: Record<string, { col: number; row: number }> = {
    //                              row 1 — far northeast
    VT:{col:10,row:1}, ME:{col:11,row:1},
    //                              row 2 — northern tier
    WA:{col:1,row:2}, ID:{col:2,row:2}, MT:{col:3,row:2}, ND:{col:4,row:2},
    MN:{col:5,row:2}, WI:{col:6,row:2}, MI:{col:7,row:2},
    NY:{col:9,row:2}, NH:{col:10,row:2}, MA:{col:11,row:2},
    //                              row 3 — upper-mid
    OR:{col:1,row:3}, NV:{col:2,row:3}, WY:{col:3,row:3}, SD:{col:4,row:3},
    IA:{col:5,row:3}, IL:{col:6,row:3}, IN:{col:7,row:3}, OH:{col:8,row:3},
    PA:{col:9,row:3}, NJ:{col:10,row:3}, CT:{col:11,row:3}, RI:{col:12,row:3},
    //                              row 4 — mid
    CA:{col:1,row:4}, UT:{col:2,row:4}, CO:{col:3,row:4}, NE:{col:4,row:4},
    MO:{col:5,row:4}, KY:{col:6,row:4}, WV:{col:7,row:4}, VA:{col:8,row:4},
    MD:{col:9,row:4}, DE:{col:10,row:4},
    //                              row 5 — upper south
    AZ:{col:2,row:5}, NM:{col:3,row:5}, KS:{col:4,row:5}, AR:{col:5,row:5},
    TN:{col:6,row:5}, NC:{col:7,row:5}, SC:{col:8,row:5},
    //                              row 6 — deep south
    TX:{col:3,row:6}, OK:{col:4,row:6}, LA:{col:5,row:6}, MS:{col:6,row:6},
    AL:{col:7,row:6}, GA:{col:8,row:6}, FL:{col:9,row:6},
    //                              row 7 — non-contiguous
    AK:{col:1,row:7}, HI:{col:2,row:7},
  };

  function selectState(po: string) {
    statePickerOpen = false;
    if (viewMode === po) return;
    viewMode = po;
    manualYear = 2024;
    animTick = CYCLES.indexOf(2024);
    animating = false;
    hoveredYear = null;
    pinnedDistrict = 1;
  }

  function goNation() {
    viewMode = 'nation';
    statePickerOpen = false;
  }

  const CYCLES = [1992, 2002, 2012, 2022, 2024];
  const SPEED_SETTINGS = {
    fast:   { interval: 3500,  wipe: 1500 },
    normal: { interval: 8000,  wipe: 4500 },
    slow:   { interval: 16000, wipe: 9000 },
  } as const;
  let animSpeed = $state<'fast' | 'normal' | 'slow'>('normal');
  const animIntervalMs = $derived(SPEED_SETTINGS[animSpeed].interval);
  const animWipeMs     = $derived(SPEED_SETTINGS[animSpeed].wipe);
  const FADE_MS = 450;

  // manualYear: user's explicit selection; animTick: index cycled by animation
  let manualYear = $state(2024);
  let animTick = $state(CYCLES.indexOf(2024));
  let animating = $state(false);
  let showPrecincts = $state(false);
  let precinctLoading = $state(false);
  let showDeltas = $state(true);
  let panelOpen = $state(true);
  let isMobileState = $state(false);
  let mobileLayer = $state<'districts' | 'precincts' | 'none'>('districts');
  let mobileSectionIdx = $state<number | null>(null);
  const showDistrictsFills = $derived(!isMobileState || mobileLayer !== 'none');
  let mapComponent: { takeScreenshot: (state: string, year: number) => void; captureDataUrl: () => string | null } | undefined;
  let nationComponent: { takeScreenshot: (year: number) => void; captureDataUrl: () => Promise<string | null>; startReel: () => void } | undefined;
  let selectedYear = $derived(animating ? CYCLES[animTick] : manualYear);

  let hoveredYear = $state<number | null>(null);
  let pinnedDistrict = $state<number>(1);

  function computeDefaultDistrict(cycles: typeof stats): number {
    const sorted = [...cycles].sort((a, b) => a.cycle_year - b.cycle_year);
    const latest = sorted[sorted.length - 1];
    const prev = sorted[sorted.length - 2];
    if (!latest) return 1;
    if (!prev) return latest.districts[0]?.district ?? 1;
    const prevMap: globalThis.Map<number, any> = new globalThis.Map(prev.districts.map((d: any): [number, any] => [d.district, d]));
    let best = latest.districts[0]?.district ?? 1;
    let bestDelta = 0;
    for (const d of latest.districts) {
      const p = prevMap.get(d.district);
      if (!p || d.partisan_lean_d == null || p.partisan_lean_d == null) continue;
      const delta = Math.abs(d.partisan_lean_d - p.partisan_lean_d);
      if (delta > bestDelta) { bestDelta = delta; best = d.district; }
    }
    return best;
  }
  let districtTab = $state<'partisan' | 'race' | 'income'>('partisan');
  let displayYear = $derived(hoveredYear ?? selectedYear);
  const VIEW_KEY = 'districtdrift.viewMode';
  const PANEL_KEY = 'districtdrift.panelLayout';
  let panelLayout = $state<'vertical' | 'horizontal'>('horizontal');
  const PANEL_H_KEY = 'districtdrift.panelH';
  let panelH = $state(280);
  const MIN_PANEL_H = 160;
  const MAX_PANEL_H = 520;

  const PANEL_W_KEY = 'districtdrift.panelW';
  let panelW = $state(330);
  const MIN_PANEL_W = 300;
  const MAX_PANEL_W = 480;

  function makeDragResize(
    axis: 'x' | 'y',
    startVal: () => number,
    min: number,
    max: number,
    apply: (v: number) => void,
    storageKey: string,
    invert = false,
  ) {
    return (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const getPos = (ev: MouseEvent | TouchEvent) =>
        ev instanceof TouchEvent
          ? (axis === 'x' ? ev.touches[0].clientX : ev.touches[0].clientY)
          : (axis === 'x' ? ev.clientX : ev.clientY);
      const start = getPos(e);
      const startV = startVal();
      function onMove(ev: MouseEvent | TouchEvent) {
        const delta = getPos(ev) - start;
        apply(Math.max(min, Math.min(max, startV + (invert ? -delta : delta))));
      }
      function onUp() {
        window.removeEventListener('mousemove', onMove as EventListener);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchmove', onMove as EventListener);
        window.removeEventListener('touchend', onUp);
        localStorage.setItem(storageKey, String(startVal()));
      }
      window.addEventListener('mousemove', onMove as EventListener);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchmove', onMove as EventListener, { passive: false });
      window.addEventListener('touchend', onUp);
    };
  }

  const startPanelResize      = makeDragResize('y', () => panelH, MIN_PANEL_H, MAX_PANEL_H, v => { panelH = v; }, PANEL_H_KEY, true);
  const startPanelWidthResize = makeDragResize('x', () => panelW, MIN_PANEL_W, MAX_PANEL_W, v => { panelW = v; }, PANEL_W_KEY, true);

  const THEME_KEY = 'districtdrift.theme';
  let theme = $state<'light' | 'dark' | 'system'>('system');
  let systemDark = $state(false);
  const darkMode = $derived(theme === 'dark' || (theme === 'system' && systemDark));

  const HELP_KEY = 'districtdrift.helpSeen';
  let helpOpen = $state(false);
  let feedbackOpen = $state(false);
  let helpTab = $state<'nation' | 'state' | 'metrics' | 'data'>('nation');
  let statePickerGridEl = $state<HTMLElement | null>(null);

  $effect(() => {
    if (statePickerOpen && statePickerGridEl) {
      const first = statePickerGridEl.querySelector<HTMLButtonElement>('button.state-tile');
      first?.focus();
    }
  });

  const isMobile = () => isMobileState;

  // Mobile: auto-scroll panel to selected section (mobileLayer sync is in onclick handlers)

  // Mobile: auto-scroll panel to selected section
  $effect(() => {
    if (!isMobileState || mobileSectionIdx === null) return;
    jumpToCard(mobileLayer === 'precincts' ? distCardsEl : stateCardsEl, mobileSectionIdx);
  });

  // Lock body scroll when any modal is open (prevents background scroll on mobile)
  $effect(() => {
    document.body.style.overflow = (helpOpen || statePickerOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  });

  onMount(() => {
    const updateMobile = () => { isMobileState = window.innerWidth < 640; };
    updateMobile();
    window.addEventListener('resize', updateMobile);

    const savedPanel = localStorage.getItem(PANEL_KEY);
    if (savedPanel === 'vertical' || savedPanel === 'horizontal') {
      panelLayout = savedPanel as typeof panelLayout;
    } else if (isMobile()) {
      panelLayout = 'horizontal';
    }
    const savedH = Number(localStorage.getItem(PANEL_H_KEY));
    if (savedH >= MIN_PANEL_H && savedH <= MAX_PANEL_H) panelH = savedH;
    const savedW = Number(localStorage.getItem(PANEL_W_KEY));
    if (savedW >= MIN_PANEL_W && savedW <= MAX_PANEL_W) panelW = savedW;

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') theme = savedTheme;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark = mq.matches;
    mq.addEventListener('change', e => { systemDark = e.matches; });

    // URL params take priority over localStorage for view restoration
    const urlParams = new URLSearchParams(window.location.search);
    const pv = urlParams.get('v');
    const py = urlParams.get('y');
    const pd = urlParams.get('d');
    const pl = urlParams.get('layout');
    if (pv === 'nation') viewMode = 'nation';
    else if (pv && pv in STATES) viewMode = pv;
    else {
      const savedView = localStorage.getItem(VIEW_KEY);
      if (savedView === 'nation') viewMode = 'nation';
      else if (savedView && savedView in STATES) viewMode = savedView;
    }
    if (py && CYCLES.includes(Number(py))) manualYear = Number(py);
    if (pd && Number(pd) >= 1) pinnedDistrict = Number(pd);
    if (pl === 'v') panelLayout = 'vertical';
    else if (pl === 'h') panelLayout = 'horizontal';

    // Auto-show help on first visit
    if (!localStorage.getItem(HELP_KEY)) {
      helpOpen = true;
      localStorage.setItem(HELP_KEY, '1');
    }

    // Reset state-view idle timer on any pointer/keyboard activity
    let _activityDebounce: ReturnType<typeof setTimeout> | null = null;
    function onActivity() {
      _cancelStateIdle();
      if (_activityDebounce) clearTimeout(_activityDebounce);
      _activityDebounce = setTimeout(_scheduleStateIdle, 1000);
    }
    document.addEventListener('pointermove', onActivity, { passive: true });
    document.addEventListener('keydown', onActivity, { passive: true });

    return () => {
      window.removeEventListener('resize', updateMobile);
      document.removeEventListener('pointermove', onActivity);
      document.removeEventListener('keydown', onActivity);
      _cancelStateIdle();
    };
  });

  $effect(() => { localStorage.setItem(VIEW_KEY, viewMode); });
  $effect(() => { localStorage.setItem(PANEL_KEY, panelLayout); });

  // Keep URL in sync so the current view is always shareable
  $effect(() => {
    const p = new URLSearchParams();
    p.set('v', viewMode);
    p.set('y', String(selectedYear));
    if (viewMode !== 'nation') p.set('d', String(pinnedDistrict));
    p.set('layout', panelLayout === 'vertical' ? 'v' : 'h');
    history.replaceState({}, '', `${window.location.pathname}?${p}`);
  });

  async function captureScreenshot(): Promise<string | null> {
    if (viewMode === 'nation') return (await nationComponent?.captureDataUrl()) ?? null;
    return mapComponent?.captureDataUrl() ?? null;
  }

  let shareCopied = $state(false);
  async function copyShareLink() {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url }); return; }
      catch {} // user cancelled
    }
    navigator.clipboard.writeText(url).then(() => {
      shareCopied = true;
      setTimeout(() => { shareCopied = false; }, 2000);
    });
  }
  $effect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, theme);
  });


  type Competitiveness = {
    solid_d: number; lean_d: number; competitive: number;
    lean_r: number; solid_r: number;
  };
  type DistrictStats = {
    district: number;
    won_by: string | null;
    partisan_lean_d: number | null;
    polsby_popper: number | null;
    d_votes: number | null;
    r_votes: number | null;
    total_votes_cast: number | null;
    margin_pct: number | null;
    // demographics (present after pipeline.demographics run)
    population: number | null;
    pop_deviation_pct: number | null;
    pct_white: number | null;
    pct_black: number | null;
    pct_hispanic: number | null;
    pct_asian: number | null;
    pct_other: number | null;
    median_income: number | null;
    pct_bachelors_plus: number | null;
  };
  type CycleStats = {
    cycle_year: number; congress: number; total_seats: number;
    redistricting_controller: string; notes: string;
    efficiency_gap: number; mean_median_diff: number;
    seats_d: number; seats_r: number;
    votes_d: number; votes_r: number;
    seat_vote_ratio_d: number | null;
    avg_compactness: number | null;
    competitiveness: Competitiveness;
    districts: DistrictStats[];
    demographics?: {
      total_population: number | null;
      ideal_district_pop: number | null;
      income_source: string;
    };
  };
  type DataCredit = { label: string; url: string; note: string; };

  let stats = $state<CycleStats[]>([]);
  let credits = $state<DataCredit[]>([]);
  let displayStats = $derived(stats.find((s) => s.cycle_year === displayYear));
  const pinnedCycleData = $derived(stats.find(s => s.cycle_year === selectedYear) ?? null);
  const pinnedDistData = $derived(pinnedCycleData?.districts.find(d => d.district === pinnedDistrict) ?? null);
  const prevCycleIdx = $derived(CYCLES.indexOf(selectedYear) - 1);
  const prevCycleData = $derived(prevCycleIdx >= 0 ? stats.find(s => s.cycle_year === CYCLES[prevCycleIdx]) ?? null : null);
  const prevDistData = $derived(prevCycleData?.districts.find(d => d.district === pinnedDistrict) ?? null);
  let egCycles = $derived(stats.map((s) => ({
    cycle_year: s.cycle_year,
    efficiency_gap: s.efficiency_gap,
    redistricting_controller: s.redistricting_controller,
  })));

  let competCycles = $derived(stats
    .filter(s => s.competitiveness)
    .map(s => ({ cycle_year: s.cycle_year, competitiveness: s.competitiveness }))
  );

  // Snap card pagination
  let stateCardsEl = $state<HTMLElement | null>(null);
  let stateCardIdx  = $state(0);
  let distCardsEl  = $state<HTMLElement | null>(null);
  let distCardIdx   = $state(0);

  const stateCardLabels = $derived(
    displayStats ? [
      'Stats',
      'Seats',
      'Trend',
      'Eff. gap',
      ...(competCycles.length ? ['Compete.'] : []),
      ...(CYCLE_EVENTS[selectedState]?.[displayYear]?.length ? ['Events'] : []),
      ...(credits.length ? ['Credits'] : []),
    ] : []
  );
  const distCardLabels = ['Partisan', 'Race & pop', 'Income & edu'];
  const mobileCardLabels = $derived(mobileLayer === 'precincts' ? distCardLabels : stateCardLabels);

  $effect(() => {
    // Reset snap positions when state/year/layout changes
    selectedState; selectedYear; panelLayout;
    stateCardIdx = 0;
    distCardIdx  = 0;
  });

  function snapIdx(el: HTMLElement): number {
    return panelLayout === 'vertical'
      ? Math.round(el.scrollTop  / el.clientHeight)
      : Math.round(el.scrollLeft / el.clientWidth);
  }
  function onStateScroll(e: Event) { stateCardIdx = snapIdx(e.target as HTMLElement); }
  function onDistScroll(e: Event)  { distCardIdx  = snapIdx(e.target as HTMLElement); }
  // scrollend fires after snap animation settles — keeps pill in sync on touch
  function onStateScrollEnd(e: Event) { stateCardIdx = snapIdx(e.target as HTMLElement); }
  function onDistScrollEnd(e: Event)  { distCardIdx  = snapIdx(e.target as HTMLElement); }

  function snapKeydown(e: KeyboardEvent, el: HTMLElement | null, idx: number, count: number) {
    const fwd  = panelLayout === 'vertical' ? ['ArrowDown', 'ArrowRight'] : ['ArrowRight'];
    const back = panelLayout === 'vertical' ? ['ArrowUp',   'ArrowLeft']  : ['ArrowLeft'];
    if (fwd.includes(e.key) && idx < count - 1)  { e.preventDefault(); jumpToCard(el, idx + 1); }
    if (back.includes(e.key) && idx > 0)          { e.preventDefault(); jumpToCard(el, idx - 1); }
  }

  function centerNavBtn(btn: HTMLElement) {
    const row = btn.parentElement;
    if (!row) return;
    // getBoundingClientRect gives viewport-relative positions, so subtracting
    // rowRect.left and adding current scrollLeft gives position within scroll container
    const btnRect = btn.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    const btnLeftInRow = btnRect.left - rowRect.left + row.scrollLeft;
    row.scrollTo({ left: btnLeftInRow - row.clientWidth / 2 + btn.offsetWidth / 2, behavior: 'smooth' });
  }

  function jumpToCard(el: HTMLElement | null, idx: number) {
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(':scope > .snap-card'));
    const card = cards[idx];
    if (!card) return;
    const cr = el.getBoundingClientRect();
    const r  = card.getBoundingClientRect();
    el.scrollBy({ top: r.top - cr.top, left: r.left - cr.left, behavior: 'smooth' });
  }

  async function loadStats(po: string) {
    const res = await fetch(`/${po.toLowerCase()}_stats.json?v=${__APP_VERSION__}`);
    const data = await res.json();
    stats = data.cycles;
    credits = data.credits ?? [];
    pinnedDistrict = computeDefaultDistrict(stats);
    districtTab = 'partisan';
  }

  onMount(() => loadStats(selectedState));
  $effect(() => { loadStats(selectedState); });

  // animTick is the only thing that changes in the interval — avoids writing $state from async
  let _animId: number | null = null;
  $effect(() => {
    if (_animId) { clearInterval(_animId); _animId = null; }
    if (!animating) return;
    _animId = window.setInterval(() => {
      const next = animTick + 1;
      if (next >= CYCLES.length) {
        // Reached last cycle — auto-stop
        animating = false;
        manualYear = CYCLES[CYCLES.length - 1];
      } else {
        animTick = next;
      }
    }, animIntervalMs);
    return () => { if (_animId) { clearInterval(_animId); _animId = null; } };
  });

  function stopAnimation() { if (animating) { manualYear = selectedYear; animating = false; } }

  // ── State view idle: auto-play years after 15 s of inactivity (desktop only) ──
  let _stateIdleTimer: ReturnType<typeof setTimeout> | null = null;
  function _cancelStateIdle() {
    if (_stateIdleTimer) { clearTimeout(_stateIdleTimer); _stateIdleTimer = null; }
  }
  function _scheduleStateIdle() {
    _cancelStateIdle();
    if (viewMode === 'nation' || animating || window.innerWidth < 640) return;
    _stateIdleTimer = setTimeout(() => {
      if (viewMode !== 'nation' && !animating) toggleAnimation();
    }, 15000);
  }
  // Reschedule when animation finishes or view changes
  $effect(() => {
    const _v = viewMode, _a = animating; // track dependencies
    if (!_a && _v !== 'nation') _scheduleStateIdle();
    else _cancelStateIdle();
  });

  function toggleAnimation() {
    if (animating) { stopAnimation(); return; }
    // Always start from 1992→2002.
    // Step 1: snap selectedYear to 1992 so NationView records _prevYear=1992.
    manualYear = 1992;
    hoveredYear = null;
    // Step 2: after reactive flush, start animating from 2002 so the wipe fires immediately.
    requestAnimationFrame(() => {
      animTick = CYCLES.indexOf(2002);
      animating = true;
    });
  }

  function egLabel(eg: number): string {
    const pct = (Math.abs(eg) * 100).toFixed(1);
    if (Math.abs(eg) < 0.02) return '≈ 0% (neutral)';
    return eg > 0 ? `+${pct}% (favors R)` : `-${pct}% (favors D)`;
  }

  // Mean-median: negative = median above mean = D votes packed = favors R
  function mmLabel(mm: number): string {
    const pct = (Math.abs(mm) * 100).toFixed(1);
    if (Math.abs(mm) < 0.01) return '≈ 0% (neutral)';
    return mm > 0 ? `+${pct}% (favors D)` : `-${pct}% (favors R)`;
  }

  function voteShare(d: number, r: number): string {
    const total = d + r;
    return total > 0 ? ((d / total) * 100).toFixed(1) + '%' : '—';
  }

  function ordinal(n: number): string {
    const v = n % 100;
    if (v >= 11 && v <= 13) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  }

  function wikiUrl(state: string, district: number): string {
    const name = STATES[state]?.name ?? state;
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(`${name}'s ${ordinal(district)} congressional district`)}`;
  }

  function ballotpediaUrl(state: string, district: number): string {
    const name = STATES[state]?.name ?? state;
    return `https://ballotpedia.org/${encodeURIComponent(`${name}'s_${ordinal(district)}_Congressional_District`)}`;
  }
</script>

<svelte:window
  onclick={(e) => {
  }}
  onkeydown={(e) => { if (e.key === 'Escape') { helpOpen = false; statePickerOpen = false; } }}
/>

<svelte:head>
  {#if viewMode === 'nation'}
    {@const nationDesc = `How did redistricting shape US House seats in ${selectedYear}? Explore all 50 states ranked by efficiency gap, seat share, and partisan lean.`}
    {@const nationUrl = `https://districtdrift.org/?v=nation&y=${selectedYear}`}
    <title>District Drift — All States, {selectedYear}</title>
    <link rel="canonical" href={nationUrl} />
    <meta name="description" content={nationDesc} />
    <meta property="og:title" content="District Drift — All States, {selectedYear}" />
    <meta property="og:description" content={nationDesc} />
    <meta property="og:url" content={nationUrl} />
    <meta name="twitter:title" content="District Drift — All States, {selectedYear}" />
    <meta name="twitter:description" content={nationDesc} />
  {:else}
    {@const stateName = STATES[selectedState]?.name ?? selectedState}
    {@const stateDesc = `How did ${selectedYear} redistricting shape ${stateName}'s congressional districts? Explore efficiency gap, seat/vote splits, precinct maps, and district demographics.`}
    {@const stateUrl = `https://districtdrift.org/?v=${selectedState.toLowerCase()}&y=${selectedYear}`}
    <title>District Drift — {stateName}, {selectedYear}</title>
    <link rel="canonical" href={stateUrl} />
    <meta name="description" content={stateDesc} />
    <meta property="og:title" content="District Drift — {stateName} {selectedYear} Congressional Districts" />
    <meta property="og:description" content={stateDesc} />
    <meta property="og:url" content={stateUrl} />
    <meta name="twitter:title" content="District Drift — {stateName} {selectedYear}" />
    <meta name="twitter:description" content={stateDesc} />
  {/if}
</svelte:head>

{#snippet nationCycleControls()}
  <div class="nation-btns" role="group" aria-label="Select redistricting cycle">
    {#each CYCLES as year}
      <button
        class="nation-yr-btn"
        class:active={selectedYear === year}
        onclick={() => { manualYear = year; stopAnimation(); }}
      >{year}{year === Math.max(...CYCLES) ? ' ★' : ''}</button>
    {/each}
    <button
      class="nation-yr-btn anim-btn"
      class:playing={animating}
      onclick={toggleAnimation}
      title={animating ? 'Pause' : selectedYear === Math.max(...CYCLES) ? 'Animate from 1992 (2024 is the latest cycle)' : 'Animate through cycles'}
    >{animating ? '⏹' : '▶'}</button>
    <div class="nation-speed-group" role="group" aria-label="Animation speed">
      {#each (['fast', 'normal', 'slow'] as const) as s}
        <button
          class="nation-speed-btn"
          class:active={animSpeed === s}
          onclick={() => animSpeed = s}
        >{s === 'fast' ? 'Fast' : s === 'normal' ? 'Med' : 'Slow'}</button>
      {/each}
    </div>
    <button
      class="nation-yr-btn nation-delta-btn"
      class:active={showDeltas}
      title={showDeltas ? 'Hide seat-change deltas' : 'Show seat-change deltas vs previous cycle'}
      onclick={() => showDeltas = !showDeltas}
    >Δ</button>
    <button
      class="nation-yr-btn nation-screenshot-btn"
      title="Save map as PNG"
      onclick={() => nationComponent?.takeScreenshot(selectedYear)}
    >💾</button>
  </div>
{/snippet}

{#snippet cycleControls()}
  <div
    class="cycle-buttons"
    role="group"
    aria-label="Select redistricting cycle"
    onmouseleave={() => hoveredYear = null}
  >
    {#each CYCLES as year}
      {@const cycleIdx = CYCLES.indexOf(year)}
      {@const eg = stats.find(s => s.cycle_year === year)?.efficiency_gap ?? null}
      {@const prevEg = cycleIdx > 0 ? (stats.find(s => s.cycle_year === CYCLES[cycleIdx - 1])?.efficiency_gap ?? null) : null}
      {@const delta = eg != null && prevEg != null ? eg - prevEg : null}
      {@const rGrad = delta != null ? Math.max(delta, 0) : (eg != null ? Math.max(eg * 0.5, 0) : 0)}
      {@const dGrad = delta != null ? Math.max(-delta, 0) : (eg != null ? Math.max(-eg * 0.5, 0) : 0)}
      {@const alphaR = Math.min(rGrad * 2.2, 0.62)}
      {@const alphaD = Math.min(dGrad * 2.2, 0.62)}
      {@const cycleStats = stats.find(s => s.cycle_year === year)}
      {@const seatsD = cycleStats?.seats_d ?? null}
      {@const seatsR = cycleStats?.seats_r ?? null}
      <button
        class:active={selectedYear === year}
        class:previewing={hoveredYear === year && selectedYear !== year}
        style={`background: linear-gradient(to right, rgba(74,144,217,${alphaD}), rgba(224,92,92,${alphaR}))`}
        onmouseenter={() => hoveredYear = year}
        onclick={() => { manualYear = year; stopAnimation(); }}
      >
        <span class="btn-d-delta">{seatsD != null ? `${seatsD}D` : ''}</span>
        <span class="btn-year">{year}{year === Math.max(...CYCLES) ? ' ★' : ''}</span>
        <span class="btn-r-delta">{seatsR != null ? `${seatsR}R` : ''}</span>
      </button>
    {/each}
    <button
      class="anim-btn"
      class:playing={animating}
      onclick={toggleAnimation}
      title={animating ? 'Pause animation' : selectedYear === Math.max(...CYCLES) ? 'Animate from 1992 (2024 is the latest cycle)' : 'Animate through cycles'}
    >{animating ? '⏹' : '▶'}</button>
  </div>
{/snippet}

{#snippet statsContent()}
  {#if displayStats}
    <dl>
      <dt>Drawn by</dt>
      <dd class="drawn-by">{displayStats.redistricting_controller}</dd>
      <dt>Seats</dt>
      <dd>
        <span class="d">{displayStats.seats_d}D</span> /
        <span class="r">{displayStats.seats_r}R</span>
        of {displayStats.total_seats}
      </dd>
      <dt><Tooltip text="Democratic share of the two-party vote across all US House races in this state for this cycle. Only D and R votes are counted — third-party votes are excluded." placement="right"><span class="has-tip">D vote share</span></Tooltip></dt>
      <dd>{voteShare(displayStats.votes_d, displayStats.votes_r)}</dd>
      <dt>Eff. gap</dt>
      <dd class:favor-r={displayStats.efficiency_gap > 0.02}
          class:favor-d={displayStats.efficiency_gap < -0.02}>
        {egLabel(displayStats.efficiency_gap)}
      </dd>
      <dt>Mean–median</dt>
      <dd class:favor-r={displayStats.mean_median_diff < -0.02}
          class:favor-d={displayStats.mean_median_diff > 0.02}>
        {mmLabel(displayStats.mean_median_diff)}
      </dd>
      <dt>Seat / vote</dt>
      <dd>{displayStats.seat_vote_ratio_d !== null ? displayStats.seat_vote_ratio_d.toFixed(2) + '×' : '—'}</dd>
      <dt>Compactness</dt>
      <dd>{displayStats.avg_compactness !== null ? (displayStats.avg_compactness * 100).toFixed(1) + '%' : '—'}</dd>
    </dl>
  {/if}
{/snippet}

{#snippet districtCard()}
  {#if stats.length > 0}
    {@const won_by = pinnedDistData?.won_by ?? ''}
    {@const hasDemog = pinnedDistData?.population != null}
    {@const leanDelta = (pinnedDistData?.partisan_lean_d ?? null) != null && (prevDistData?.partisan_lean_d ?? null) != null
      ? pinnedDistData!.partisan_lean_d! - prevDistData!.partisan_lean_d! : null}
    {@const cardAlphaD = leanDelta != null && leanDelta > 0 ? Math.min(leanDelta * 3.0, 0.32) : 0.04}
    {@const cardAlphaR = leanDelta != null && leanDelta < 0 ? Math.min(-leanDelta * 3.0, 0.32) : 0.04}
    <div class="district-card" class:d={won_by === 'D'} class:r={won_by === 'R'}
      style={`background: linear-gradient(to right, rgba(74,144,217,${cardAlphaD}), rgba(224,92,92,${cardAlphaR})), var(--surface)`}>
      <div class="dc-tabs" role="tablist">
        <span class="dc-district-label">D{pinnedDistrict}</span>
        {#if pinnedDistData != null}
          <button role="tab" class="dc-tab" class:active={districtTab === 'partisan'} onclick={() => districtTab = 'partisan'}>Partisan</button>
          <button role="tab" class="dc-tab" class:active={districtTab === 'race'} onclick={() => districtTab = 'race'}>Race &amp; pop</button>
          <button role="tab" class="dc-tab" class:active={districtTab === 'income'} onclick={() => districtTab = 'income'}>Income &amp; edu</button>
        {/if}
      </div>

      <div class="dc-body">
      {#if pinnedDistData == null}
        <p class="dc-pending">District {pinnedDistrict} did not exist in {selectedYear}.<br>{STATES[selectedState]?.name ?? selectedState} had {pinnedCycleData?.total_seats ?? '?'} seats that cycle.</p>
      {:else}

        {#if districtTab === 'partisan'}
          <dl>
            <dt>Won by</dt>
            <dd class={won_by === 'D' ? 'd' : 'r'}>
              {won_by === 'D' ? 'Democrat' : won_by === 'R' ? 'Republican' : '—'}
            </dd>
            {#if pinnedDistData.partisan_lean_d !== null}
              {@const prev = prevDistData?.partisan_lean_d}
              <dt>Partisan lean</dt>
              <dd>{Math.round(pinnedDistData.partisan_lean_d * 100)}% D
                {#if prev != null}<span class="dc-prev">{pinnedDistData.partisan_lean_d >= prev ? '↑' : '↓'} {Math.round(prev * 100)}%</span>{/if}
              </dd>
            {/if}
            {#if pinnedDistData.margin_pct != null}
              {@const prev = prevDistData?.margin_pct}
              <dt>Margin</dt>
              <dd>{(pinnedDistData.margin_pct * 100).toFixed(1)}%
                {#if prev != null}<span class="dc-prev">{pinnedDistData.margin_pct >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
              </dd>
            {/if}
            {#if pinnedDistData.polsby_popper != null}
              {@const prev = prevDistData?.polsby_popper}
              <dt>Compactness</dt>
              <dd>{(pinnedDistData.polsby_popper * 100).toFixed(1)}%
                {#if prev != null}<span class="dc-prev">{pinnedDistData.polsby_popper >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
              </dd>
            {/if}
          </dl>
          <div class="district-card-links">
            <a href={ballotpediaUrl(selectedState, pinnedDistrict)} target="_blank" rel="noopener" class="district-card-wiki">Ballotpedia →</a>
          </div>

        {:else if districtTab === 'race'}
          {#if hasDemog}
            <dl>
              {#if pinnedDistData.population != null}
                {@const prev = prevDistData?.population}
                <dt>Population</dt>
                <dd>{pinnedDistData.population.toLocaleString()}
                  {#if prev != null}<span class="dc-prev">{pinnedDistData.population >= prev ? '↑' : '↓'} {prev.toLocaleString()}</span>{/if}
                </dd>
              {/if}
              {#if pinnedDistData.pop_deviation_pct != null}
                <dt>Pop. deviation</dt>
                <dd>{pinnedDistData.pop_deviation_pct >= 0 ? '+' : ''}{(pinnedDistData.pop_deviation_pct * 100).toFixed(1)}%</dd>
              {/if}
              {#if pinnedDistData.pct_white != null}
                {@const prev = prevDistData?.pct_white}
                <dt>Non-Hisp. White</dt>
                <dd>{(pinnedDistData.pct_white * 100).toFixed(1)}%
                  {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_white >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                </dd>
              {/if}
              {#if pinnedDistData.pct_black != null}
                {@const prev = prevDistData?.pct_black}
                <dt>Black</dt>
                <dd>{(pinnedDistData.pct_black * 100).toFixed(1)}%
                  {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_black >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                </dd>
              {/if}
              {#if pinnedDistData.pct_hispanic != null}
                {@const prev = prevDistData?.pct_hispanic}
                <dt>Hispanic</dt>
                <dd>{(pinnedDistData.pct_hispanic * 100).toFixed(1)}%
                  {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_hispanic >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                </dd>
              {/if}
              {#if pinnedDistData.pct_asian != null}
                {@const prev = prevDistData?.pct_asian}
                <dt>Asian / PI</dt>
                <dd>{(pinnedDistData.pct_asian * 100).toFixed(1)}%
                  {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_asian >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                </dd>
              {/if}
              {#if pinnedDistData.pct_other != null}
                {@const prev = prevDistData?.pct_other}
                <dt>Other</dt>
                <dd>{(pinnedDistData.pct_other * 100).toFixed(1)}%
                  {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_other >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                </dd>
              {/if}
            </dl>
          {:else}
            <p class="dc-pending">Demographics data not yet available for this cycle.</p>
          {/if}

        {:else}
          {#if hasDemog && (pinnedDistData.median_income != null || pinnedDistData.pct_bachelors_plus != null)}
            <dl>
              {#if pinnedDistData.median_income != null}
                {@const prev = prevDistData?.median_income}
                <dt>Median income</dt>
                <dd>${pinnedDistData.median_income.toLocaleString()}
                  {#if prev != null}<span class="dc-prev">{pinnedDistData.median_income >= prev ? '↑' : '↓'} ${prev.toLocaleString()}</span>{/if}
                </dd>
              {/if}
              {#if pinnedDistData.pct_bachelors_plus != null}
                {@const prev = prevDistData?.pct_bachelors_plus}
                <dt>Bachelor's+</dt>
                <dd>{(pinnedDistData.pct_bachelors_plus * 100).toFixed(1)}%
                  {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_bachelors_plus >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                </dd>
              {/if}
            </dl>
            {#if pinnedCycleData?.demographics?.income_source}
              <p class="dc-source">Source: {pinnedCycleData.demographics.income_source}</p>
            {/if}
          {:else}
            <p class="dc-pending">Income &amp; education data not yet available for this cycle.</p>
          {/if}
        {/if}
      {/if}
      </div>
    </div>
  {/if}
{/snippet}


<div class="layout">
  <header>
    <div class="brand">
      <h1>District<span class="accent">Drift</span></h1>
      <p class="tagline">Three decades of congressional redistricting <span class="version">v{__APP_VERSION__}</span></p>
      <div class="brand-popup" role="tooltip">
        <strong>What's inside</strong>
        <ul>
          <li>50 states · 5 redistricting cycles · 1992–2024</li>
          <li>Per-district election results &amp; census demographics</li>
          <li>Precinct vote maps for all 50 states (2012 &amp; 2022)</li>
          <li>Efficiency gap, mean-median difference &amp; competitiveness</li>
        </ul>
      </div>
    </div>

    <button
      class="help-btn"
      onclick={() => { helpOpen = true; helpTab = 'nation'; }}
      title="How to use this site"
      aria-label="Help"
    >?</button>

    <button
      class="share-btn"
      class:copied={shareCopied}
      onclick={copyShareLink}
      title="Share this view"
      aria-label="Share"
    >{shareCopied ? '✓ Copied' : '⤴ Share'}</button>

    <button
      class="feedback-btn"
      onclick={() => feedbackOpen = true}
      title="Leave feedback"
      aria-label="Feedback"
    >Feedback</button>

    <div class="theme-toggle" role="group" aria-label="Color theme">
      <button class:active={theme === 'light'} onclick={() => theme = 'light'} title="Light mode" aria-label="Light mode">☀</button>
      <button class:active={theme === 'system'} onclick={() => theme = 'system'} title="System theme" aria-label="System theme">◐</button>
      <button class:active={theme === 'dark'} onclick={() => theme = 'dark'} title="Dark mode" aria-label="Dark mode">☽</button>
    </div>

    <nav class="view-nav">
      <button
        class="view-btn"
        class:active={viewMode === 'nation'}
        onclick={goNation}
      >All states</button>

      <button
        class="state-selector"
        class:active={viewMode !== 'nation'}
        onclick={() => statePickerOpen = true}
        aria-haspopup="dialog"
      >
        {#if viewMode !== 'nation'}
          <span class="state-name">{STATES[selectedState]?.name ?? selectedState}</span>
        {:else}
          <span class="state-name" style="opacity:0.55">Select state</span>
        {/if}
        <span class="state-chevron">▾</span>
      </button>
    </nav>

  </header>

  {#if isMobileState && viewMode !== 'nation'}
    <div class="mobile-chrome">
      <div class="mobile-year-bar">
        {@render cycleControls()}
      </div>
      <div class="mobile-nav-row">
        <div class="mobile-layer-toggle" role="group" aria-label="Map layer">
          <button class:active={mobileLayer === 'districts'} onclick={() => { mobileLayer = 'districts'; showPrecincts = false; mobileSectionIdx = null; }}>Districts</button>
          <button class:active={mobileLayer === 'precincts'} onclick={() => { mobileLayer = 'precincts'; showPrecincts = true; mobileSectionIdx = null; }}>Precincts</button>
          <button class:active={mobileLayer === 'none'} onclick={() => { mobileLayer = 'none'; showPrecincts = false; mobileSectionIdx = null; }}>Off</button>
        </div>
        {#if mobileLayer !== 'none'}
          <div class="mobile-section-scroll" role="group" aria-label="View section">
            {#each mobileCardLabels as label, i}
              <button
                class="mobile-sec-btn"
                class:active={mobileSectionIdx === i}
                onclick={(e) => { mobileSectionIdx = mobileSectionIdx === i ? null : i; centerNavBtn(e.currentTarget); }}
              >{label}</button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <main class:ph={panelLayout === 'horizontal'}>
    <div class="map-wrap">
      {#if viewMode === 'nation'}
        <NationView
          bind:this={nationComponent}
          selectedYear={selectedYear}
          onStateClick={selectState}
          fullDataStates={Object.keys(STATES)}
          wipeDuration={animWipeMs}
          showEgLabels={true}
          bind:showDeltas
        />
        <!-- Floating cycle bar for nation view -->
        <div class="nation-cycle-bar">
          {@render nationCycleControls()}
        </div>
      {:else}
        {#key viewMode}
          <Map bind:this={mapComponent} selectedYear={displayYear} fadeDuration={FADE_MS} panelBottom={0} panelLeft={0} statePo={selectedState} cycleYears={CYCLES} {darkMode} {showPrecincts} showDistricts={showDistrictsFills} onPrecinctLoadingChange={(v) => precinctLoading = v} onDistrictClick={(d) => {
              const dn = Number(d.district);
              if (dn !== pinnedDistrict) districtTab = 'partisan';
              pinnedDistrict = dn;
            }} onMapClick={() => { pinnedDistrict = computeDefaultDistrict(stats); districtTab = 'partisan'; }} />
        {/key}

        <!-- Floating cycle bar for state view -->
        <div class="state-cycle-bar">
          {@render cycleControls()}
        </div>
      {/if}

      <!-- Precinct loading toast -->
      {#if precinctLoading}
        <div class="precinct-toast">
          <span class="precinct-toast-spinner"></span>
          Loading precinct data…
        </div>
      {/if}

      <!-- Floating map controls: layout toggle + precinct toggle -->
      {#if viewMode !== 'nation'}
        <div class="map-float-controls">
          <button
            class="map-float-btn"
            title={isMobileState
              ? (panelOpen ? 'Hide stats panel' : 'Show stats panel')
              : (panelLayout === 'vertical' ? 'Switch to bottom panels' : 'Switch to side panels')}
            onclick={() => {
              if (isMobileState) panelOpen = !panelOpen;
              else panelLayout = panelLayout === 'vertical' ? 'horizontal' : 'vertical';
            }}
          >
            <span class="float-icon">
              {#if isMobileState}{panelOpen ? '▾' : '▴'}{:else}{panelLayout === 'vertical' ? '⬇' : '➡'}{/if}
            </span>
            <span class="float-label">{isMobileState ? 'Stats' : 'Layout'}</span>
          </button>
          <button
            class="map-float-btn"
            class:active={showPrecincts && !precinctLoading}
            class:loading={precinctLoading}
            disabled={precinctLoading}
            title={precinctLoading ? 'Loading precinct data…' : showPrecincts ? 'Hide precinct vote map' : 'Show precinct vote map'}
            onclick={() => { if (!precinctLoading) showPrecincts = !showPrecincts; }}
          >
            <span class="float-icon precinct-icon" class:spinning={precinctLoading}>P</span>
            <span class="float-label">{precinctLoading ? 'Loading…' : 'Precincts'}</span>
            {#if precinctLoading}<span class="precinct-load-bar"></span>{/if}
          </button>
          <button
            class="map-float-btn"
            title="Save map as PNG"
            onclick={() => mapComponent?.takeScreenshot(selectedState, displayYear)}
          >
            <span class="float-icon">💾</span>
            <span class="float-label">Save</span>
          </button>
        </div>
      {/if}
    </div>

    {#if viewMode !== 'nation'}
      <div
        class="panel-group"
        class:vertical={panelLayout === 'vertical'}
        class:horizontal={panelLayout === 'horizontal'}
        class:panel-closed={isMobileState && mobileSectionIdx === null}
        class:panel-demo={isMobileState && mobileLayer === 'precincts'}
        style={isMobileState ? '' : (panelLayout === 'horizontal' ? `height: ${panelH}px` : `width: ${panelW}px`)}
      >
        {#if isMobileState}
          <button class="mobile-panel-handle" onclick={() => mobileSectionIdx = null}
            aria-label="Collapse panel, show full map"></button>
        {/if}
        {#if panelLayout === 'horizontal'}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="panel-resize-handle panel-resize-h" onmousedown={startPanelResize} ontouchstart={startPanelResize}></div>
        {:else}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="panel-resize-handle panel-resize-v" onmousedown={startPanelWidthResize} ontouchstart={startPanelWidthResize}></div>
        {/if}

        <!-- Panel 1: State -->
        <aside class="panel panel-state">
          {#if displayStats}
            {#if stateCardLabels.length > 1}
              <nav class="snap-nav" aria-label="Panel sections">
                {#each stateCardLabels as label, i}
                  <button class="snap-nav-btn" class:active={i === stateCardIdx}
                    onclick={() => jumpToCard(stateCardsEl, i)}>{label}</button>
                {/each}
              </nav>
            {/if}
            <div class="snap-cards snap-cards-state" bind:this={stateCardsEl} onscroll={onStateScroll} onscrollend={onStateScrollEnd}
              tabindex="0" role="region" aria-label="State statistics"
              onkeydown={(e) => snapKeydown(e, stateCardsEl, stateCardIdx, stateCardLabels.length)}>
              <!-- Card: Key stats -->
              <div class="snap-card">
                <p class="snap-card-title">
                  {displayStats.cycle_year} — {displayStats.total_seats} seats
                  {#if hoveredYear}<span class="preview-badge">preview</span>{/if}
                </p>
                <dl class="snap-dl">
                  <dt>Drawn by</dt>
                  <dd>
                    {#if displayStats.redistricting_controller}
                      {@const dbt = drawnByTooltip(displayStats.redistricting_controller)}
                      <Tooltip title={dbt.title} text={dbt.text} placement="left">
                        <Pill
                          party={/rep|republican/i.test(displayStats.redistricting_controller) ? 'R' : /dem|democrat/i.test(displayStats.redistricting_controller) ? 'D' : null}
                          solid={/rep|republican|dem|democrat/i.test(displayStats.redistricting_controller)}
                        >{displayStats.redistricting_controller}</Pill>
                      </Tooltip>
                    {/if}
                  </dd>
                  <dt>Seats</dt>
                  <dd><span class="d">{displayStats.seats_d}D</span> / <span class="r">{displayStats.seats_r}R</span> <span class="muted">of {displayStats.total_seats}</span></dd>
                  <dt><Tooltip text="Democratic share of the two-party vote across all US House races in this state for this cycle. Only D and R votes are counted — third-party votes are excluded." placement="right"><span class="has-tip">D vote share</span></Tooltip></dt>
                  <dd>{voteShare(displayStats.votes_d, displayStats.votes_r)}</dd>
                  <dt><Tooltip text="Republican share of the two-party vote across all US House races in this state for this cycle." placement="right"><span class="has-tip">R vote share</span></Tooltip></dt>
                  <dd>{voteShare(displayStats.votes_r, displayStats.votes_d)}</dd>
                  {#if displayStats.efficiency_gap !== null}
                    <dt>Eff. gap</dt>
                    <dd>
                      <Tooltip
                        title="Efficiency gap"
                        text="Measures wasted votes — votes cast for the losing party, or surplus votes beyond what the winning party needed. A positive value means Republican votes were used more efficiently, indicating a potential R-favoring gerrymander. Values above ±8% are generally considered significant."
                        placement="left"
                      >
                        <Pill party={displayStats.efficiency_gap > 0.02 ? 'R' : displayStats.efficiency_gap < -0.02 ? 'D' : null}>
                          {displayStats.efficiency_gap > 0 ? '+' : ''}{(displayStats.efficiency_gap * 100).toFixed(1)}% {displayStats.efficiency_gap > 0.02 ? '→R' : displayStats.efficiency_gap < -0.02 ? '→D' : '≈0'}
                        </Pill>
                      </Tooltip>
                    </dd>
                  {/if}
                  {#if displayStats.avg_compactness !== null}
                    <dt>Compact.</dt><dd>{(displayStats.avg_compactness * 100).toFixed(1)}%</dd>
                  {/if}
                </dl>
                <div class="snap-legend">
                  <span class="swatch d"></span><span class="muted">Democrat</span>
                  &ensp;<span class="swatch r"></span><span class="muted">Republican</span>
                </div>
                {#if displayStats.notes}<p class="note">ⓘ {displayStats.notes}</p>{/if}
              </div>

              <!-- Card: Seat vs. vote -->
              <div class="snap-card">
                <p class="snap-card-title">Seat vs. vote share <Tooltip text="Compares seats won vs. votes cast for each party. If one party wins 60% of seats with only 50% of votes, the map may be structurally tilted." placement="left"><span class="info-icon">ⓘ</span></Tooltip></p>
                <SeatVoteChart
                  seatsD={displayStats.seats_d}
                  seatsR={displayStats.seats_r}
                  votesD={displayStats.votes_d}
                  votesR={displayStats.votes_r}
                  totalSeats={displayStats.total_seats}
                />
              </div>

              <!-- Card: Trend -->
              <div class="snap-card">
                <p class="snap-card-title">Vote vs. seat share <Tooltip text="Tracks Democratic vote share (solid line) and seat share (dashed line) across all cycles. A persistent gap between the two lines suggests a structural partisan advantage built into the map." placement="left"><span class="info-icon">ⓘ</span></Tooltip></p>
                <p class="snap-card-note">— votes &nbsp;·&nbsp; – – seats</p>
                <TrendChart cycles={stats} selectedYear={displayYear} />
              </div>

              <!-- Card: Efficiency gap -->
              <div class="snap-card">
                <p class="snap-card-title">Efficiency gap <Tooltip text="Measures partisan bias by counting 'wasted votes' — votes cast for a losing candidate, or surplus votes beyond what a winner needed. A positive value means Republican votes were used more efficiently. Values above ±8% are generally considered significant." placement="left"><span class="info-icon">ⓘ</span></Tooltip></p>
                <p class="snap-card-note">+ favors R &nbsp;·&nbsp; − favors D</p>
                <EGChart cycles={egCycles} selectedYear={displayYear} />
              </div>

              {#if competCycles.length}
                <!-- Card: Competitiveness -->
                <div class="snap-card">
                  <p class="snap-card-title">District competitiveness <Tooltip text="Shows how many districts were safe (won by >10%), leaning, or competitive for each party. Heavy clustering of safe districts is a hallmark of packing — concentrating one party's voters to waste their votes." placement="left"><span class="info-icon">ⓘ</span></Tooltip></p>
                  <CompetitivenessChart cycles={competCycles} selectedYear={displayYear} />
                </div>
              {/if}

              {#if CYCLE_EVENTS[selectedState]?.[displayYear]?.length}
                <!-- Card: Key events -->
                <div class="snap-card">
                  <p class="snap-card-title">Key events — {displayYear}</p>
                  <ul class="events snap-events">
                    {#each [...CYCLE_EVENTS[selectedState]?.[displayYear]].reverse() as ev}
                      <li>
                        <strong>{#if ev.url}<a href={ev.url} target="_blank" rel="noopener">{ev.title}</a>{:else}{ev.title}{/if}</strong>
                        <span>{ev.detail}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}

              {#if credits.length}
                <!-- Card: Credits -->
                <div class="snap-card">
                  <p class="snap-card-title">Data credits</p>
                  <ul class="snap-credits">
                    {#each credits as c}
                      <li><a href={c.url} target="_blank" rel="noopener">{c.label}</a> — {c.note}</li>
                    {/each}
                    <li><a href="https://carto.com" target="_blank" rel="noopener">© CARTO</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a></li>
                  </ul>
                </div>
              {/if}
            </div>
          {/if}
        </aside>

        <div class="panel-divider"></div>

        <!-- Panel 2: District -->
        <aside class="panel panel-district">
          {#if stats.length > 0}
            {@const won_by = pinnedDistData?.won_by ?? ''}
            {@const hasDemog = pinnedDistData?.population != null}
            {@const leanDelta = pinnedDistData?.partisan_lean_d != null && prevDistData?.partisan_lean_d != null
              ? pinnedDistData.partisan_lean_d - prevDistData.partisan_lean_d : null}
            {@const alphaD = leanDelta != null && leanDelta > 0 ? Math.min(leanDelta * 3.0, 0.28) : 0.03}
            {@const alphaR = leanDelta != null && leanDelta < 0 ? Math.min(-leanDelta * 3.0, 0.28) : 0.03}
            <div class="panel-header" style={`background: linear-gradient(to right, rgba(74,144,217,${alphaD}), rgba(224,92,92,${alphaR})), var(--surface)`}>
              <span class="dc-district-label">D{pinnedDistrict} <span class="dc-district-year">{selectedYear}</span></span>
              {#if pinnedDistData != null}
                <Tooltip
                  text={won_by === 'D'
                    ? `This district returned a Democratic representative in the ${selectedYear} election cycle.`
                    : won_by === 'R'
                    ? `This district returned a Republican representative in the ${selectedYear} election cycle.`
                    : `Election result not available for this district and cycle.`}
                  placement="center"
                >
                  <Pill party={won_by === 'D' ? 'D' : won_by === 'R' ? 'R' : null} solid size="md">
                    {won_by === 'D' ? 'Democrat' : won_by === 'R' ? 'Republican' : '—'}
                  </Pill>
                </Tooltip>
              {/if}
              <a href={ballotpediaUrl(selectedState, pinnedDistrict)} target="_blank" rel="noopener" class="district-card-wiki">Ballotpedia →</a>
            </div>

            {#if pinnedDistData == null}
              <p class="dc-pending" style="padding: 0.5rem 0.75rem">D{pinnedDistrict} did not exist in {selectedYear}.</p>
            {:else}
              <nav class="snap-nav" aria-label="District sections">
                {#each ['Partisan', 'Race & pop', 'Income & edu'] as label, i}
                  <button class="snap-nav-btn" class:active={i === distCardIdx}
                    onclick={() => jumpToCard(distCardsEl, i)}>{label}</button>
                {/each}
              </nav>
              <div class="snap-cards snap-cards-district" bind:this={distCardsEl} onscroll={onDistScroll} onscrollend={onDistScrollEnd}
                tabindex="0" role="region" aria-label="District details"
                onkeydown={(e) => snapKeydown(e, distCardsEl, distCardIdx, 3)}>
                <!-- Card: Partisan -->
                <div class="snap-card">
                  <p class="snap-card-title">Partisan <Tooltip text="Election results and partisan lean for this district. 'Lean' is the two-party Democratic vote share from US House elections in this cycle. 'Margin' is the winning candidate's margin of victory." placement="left"><span class="info-icon">ⓘ</span></Tooltip></p>
                  <dl class="snap-dl">
                    {#if pinnedDistData.partisan_lean_d !== null}
                      {@const prev = prevDistData?.partisan_lean_d}
                      <dt>Lean</dt>
                      <dd>{Math.round(pinnedDistData.partisan_lean_d * 100)}% D
                        {#if prev != null}<span class="dc-prev">{pinnedDistData.partisan_lean_d >= prev ? '↑' : '↓'} {Math.round(prev * 100)}%</span>{/if}
                      </dd>
                    {/if}
                    {#if pinnedDistData.margin_pct != null}
                      {@const prev = prevDistData?.margin_pct}
                      <dt>Margin</dt>
                      <dd>{(pinnedDistData.margin_pct * 100).toFixed(1)}%
                        {#if prev != null}<span class="dc-prev">{pinnedDistData.margin_pct >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                      </dd>
                    {/if}
                    {#if pinnedDistData.polsby_popper != null}
                      {@const prev = prevDistData?.polsby_popper}
                      <dt>Compact.</dt>
                      <dd>{(pinnedDistData.polsby_popper * 100).toFixed(1)}%
                        {#if prev != null}<span class="dc-prev">{pinnedDistData.polsby_popper >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                      </dd>
                    {/if}
                  </dl>
                </div>

                <!-- Card: Race & pop -->
                <div class="snap-card">
                  <p class="snap-card-title">Race &amp; pop <Tooltip text="Racial and ethnic composition and total population for this district, from the decennial census closest to this redistricting cycle. Arrows show change from the previous cycle." placement="left"><span class="info-icon">ⓘ</span></Tooltip></p>
                  {#if hasDemog}
                    <dl class="snap-dl">
                      {#if pinnedDistData.population != null}
                        {@const prev = prevDistData?.population}
                        <dt>Population</dt>
                        <dd>{pinnedDistData.population.toLocaleString()}
                          {#if prev != null}<span class="dc-prev">{pinnedDistData.population >= prev ? '↑' : '↓'} {prev.toLocaleString()}</span>{/if}
                        </dd>
                      {/if}
                      {#if pinnedDistData.pct_white != null}
                        {@const prev = prevDistData?.pct_white}
                        <dt>NH White</dt>
                        <dd>{(pinnedDistData.pct_white * 100).toFixed(1)}%
                          {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_white >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                        </dd>
                      {/if}
                      {#if pinnedDistData.pct_black != null}
                        {@const prev = prevDistData?.pct_black}
                        <dt>Black</dt>
                        <dd>{(pinnedDistData.pct_black * 100).toFixed(1)}%
                          {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_black >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                        </dd>
                      {/if}
                      {#if pinnedDistData.pct_hispanic != null}
                        {@const prev = prevDistData?.pct_hispanic}
                        <dt>Hispanic</dt>
                        <dd>{(pinnedDistData.pct_hispanic * 100).toFixed(1)}%
                          {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_hispanic >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                        </dd>
                      {/if}
                      {#if pinnedDistData.pct_asian != null}
                        {@const prev = prevDistData?.pct_asian}
                        <dt>Asian / PI</dt>
                        <dd>{(pinnedDistData.pct_asian * 100).toFixed(1)}%
                          {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_asian >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                        </dd>
                      {/if}
                    </dl>
                  {:else}
                    <p class="dc-pending">Not yet available.</p>
                  {/if}
                </div>

                <!-- Card: Income & edu -->
                <div class="snap-card">
                  <p class="snap-card-title">Income &amp; edu <Tooltip text="Median household income and educational attainment for this district, from the decennial census closest to this redistricting cycle. Arrows show change from the previous cycle." placement="left"><span class="info-icon">ⓘ</span></Tooltip></p>
                  {#if hasDemog && (pinnedDistData.median_income != null || pinnedDistData.pct_bachelors_plus != null)}
                    <dl class="snap-dl">
                      {#if pinnedDistData.median_income != null}
                        {@const prev = prevDistData?.median_income}
                        <dt>Med. income</dt>
                        <dd>${pinnedDistData.median_income.toLocaleString()}
                          {#if prev != null}<span class="dc-prev">{pinnedDistData.median_income >= prev ? '↑' : '↓'} ${prev.toLocaleString()}</span>{/if}
                        </dd>
                      {/if}
                      {#if pinnedDistData.pct_bachelors_plus != null}
                        {@const prev = prevDistData?.pct_bachelors_plus}
                        <dt>Bachelor's+</dt>
                        <dd>{(pinnedDistData.pct_bachelors_plus * 100).toFixed(1)}%
                          {#if prev != null}<span class="dc-prev">{pinnedDistData.pct_bachelors_plus >= prev ? '↑' : '↓'} {(prev * 100).toFixed(1)}%</span>{/if}
                        </dd>
                      {/if}
                    </dl>
                  {:else}
                    <p class="dc-pending">Not yet available.</p>
                  {/if}
                </div>
              </div>
            {/if}
          {/if}
        </aside>

      </div>
    {/if}
  </main>

  <footer>
    <p>
      Sources:
      <a href="https://www.nhgis.org/" target="_blank" rel="noopener">NHGIS</a> ·
      <a href="https://electionlab.mit.edu/" target="_blank" rel="noopener">MIT Election Lab</a> ·
      <a href="https://redistrictingdatahub.org/" target="_blank" rel="noopener">Redistricting Data Hub</a> ·
      <a href="https://github.com/kalv25/districtdrift" target="_blank" rel="noopener">GitHub</a> ·
      <a href="/feedback{viewMode !== 'nation' ? `?state=${encodeURIComponent(STATES[selectedState]?.name ?? selectedState)}&year=${selectedYear}` : ''}">Leave feedback</a>
    </p>
    <span class="footer-updated">
      Updated {new Date(__BUILD_DATE__).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
    </span>
  </footer>
</div>

<FeedbackModal
  open={feedbackOpen}
  onclose={() => feedbackOpen = false}
  {captureScreenshot}
  prefillState={viewMode !== 'nation' ? (STATES[selectedState]?.name ?? selectedState) : ''}
  prefillYear={viewMode !== 'nation' ? String(selectedYear) : ''}
  viewType={typeof window !== 'undefined' ? (window.innerWidth < 640 ? 'Mobile' : 'Desktop') : ''}
/>

{#if statePickerOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="help-backdrop" onclick={() => statePickerOpen = false}
    role="button" tabindex="-1" aria-label="Close"
    onkeydown={(e) => e.key === 'Enter' && (statePickerOpen = false)}>
    <div class="state-picker-modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Select a state">
      <div class="state-picker-header">
        <span class="state-picker-title">Select a state</span>
        <button class="help-close" onclick={() => statePickerOpen = false} aria-label="Close">✕</button>
      </div>
      <div class="state-tile-grid" bind:this={statePickerGridEl}>
        {#each Object.entries(STATES) as [po]}
          {@const pos = STATE_GRID[po]}
          {#if pos}
            <button
              class="state-tile"
              class:active={viewMode === po}
              style="grid-column:{pos.col}; grid-row:{pos.row}"
              onclick={() => selectState(po)}
              onmouseenter={() => hoveredPicker = po}
              onmouseleave={() => hoveredPicker = null}
              onfocus={() => hoveredPicker = po}
              onblur={() => hoveredPicker = null}
              ontouchstart={() => hoveredPicker = po}
            >{po}</button>
          {/if}
        {/each}
      </div>
      <div class="state-picker-label">{hoveredPicker ? STATES[hoveredPicker]?.name : '\u00A0'}</div>
    </div>
  </div>
{/if}

{#if helpOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="help-backdrop" onclick={() => helpOpen = false}
    role="button" tabindex="-1" aria-label="Close"
    onkeydown={(e) => e.key === 'Enter' && (helpOpen = false)}>
    <div class="help-modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Help">
      <div class="help-header">
        <h2>About District Drift</h2>
        <button class="help-close" onclick={() => helpOpen = false} aria-label="Close">✕</button>
      </div>
      <div class="help-hook">
        <p>Every ten years, after the Census, state legislatures redraw the lines of congressional districts — one of the most consequential and least scrutinized acts in American democracy. Occasionally states redraw mid-decade too: Texas famously did so in 2003 under Tom DeLay to lock in a Republican majority.</p>
        <p>District Drift is a retrospective: <em>how have those lines been drawn since 1992, and who benefited?</em> Both parties have gerrymandered. This site shows all of it.</p>
        <p class="help-feedback-nudge">Spotted a data error or have a question? Use the <strong>Feedback</strong> button in the header — all reports are read and appreciated.</p>
      </div>

      <nav class="help-tabs" role="tablist">
        <button role="tab" aria-selected={helpTab === 'nation'} class:active={helpTab === 'nation'} onclick={() => helpTab = 'nation'}>
          <span class="tab-icon">🗺</span> Nation view
        </button>
        <button role="tab" aria-selected={helpTab === 'state'} class:active={helpTab === 'state'} onclick={() => helpTab = 'state'}>
          <span class="tab-icon">🏛</span> State view
        </button>
        <button role="tab" aria-selected={helpTab === 'metrics'} class:active={helpTab === 'metrics'} onclick={() => helpTab = 'metrics'}>
          <span class="tab-icon">📊</span> Metrics
        </button>
        <button role="tab" aria-selected={helpTab === 'data'} class:active={helpTab === 'data'} onclick={() => helpTab = 'data'}>
          <span class="tab-icon">🗃</span> Data
        </button>
      </nav>

      <div class="help-body">

        {#if helpTab === 'nation'}
        <section>
          <div class="help-steps">
            <div class="help-step">
              <span class="step-num">1</span>
              <div>The <strong>opening map</strong> shows all 50 states shaded by their efficiency gap — how structurally biased each state's map was in the selected cycle.</div>
            </div>
            <div class="help-step">
              <span class="step-num">2</span>
              <div>Step through cycles using the year buttons, or press <strong>▶</strong> to animate 1992 → 2024. Pill overlays show how congressional seats shifted vs. the previous cycle — <Pill party="R">+2R</Pill> means two new Republican seats, <Pill party="D">−1D</Pill> means one fewer Democratic seat. Pills are always visible at rest; use the <strong>Δ</strong> button to toggle them off.</div>
            </div>
            <div class="help-step">
              <span class="step-num">3</span>
              <div>The <strong>NE</strong> button zooms into the Northeast corridor — 12 densely packed states holding ~90 seats, the most compressed congressional battleground in the US.</div>
            </div>
            <div class="help-step">
              <span class="step-num">4</span>
              <div>The <strong>Rankings</strong> panel lists every state by efficiency gap magnitude. On desktop it's always visible on the right. On mobile, <strong>swipe up</strong> from the handle bar at the bottom of the screen to open it.</div>
            </div>
            <div class="help-step">
              <span class="step-num">5</span>
              <div>Press <strong>▶ Tour</strong> (bottom-right, desktop) to launch an auto-tour of the most gerrymandered states. Each state gets a brief spotlight — click the card or tap the state to jump straight to it. Press <strong>■</strong> to stop at any time.</div>
            </div>
          </div>
        </section>
        {/if}

        {#if helpTab === 'state'}
        <section>
          <div class="help-steps">
            <div class="help-step">
              <span class="step-num">1</span>
              <div><strong>Select a state</strong> from the dropdown in the header to dive into its district map. All 50 states are available across five cycles: 1992, 2002, 2012, 2022, and 2024.</div>
            </div>
            <div class="help-step">
              <span class="step-num">2</span>
              <div>Switch cycles to watch district boundaries <strong>morph</strong> to their new positions. A brief <strong>swing overlay</strong> shows which districts shifted toward <span class="help-d">Democrats</span> or <span class="help-r">Republicans</span>. Dashed lines remain as a ghost of the previous map.</div>
            </div>
            <div class="help-step">
              <span class="step-num">3</span>
              <div><strong>Click any district</strong> to pin a detail card. It stays locked as you step through cycles — compare partisan lean, racial composition, income, and education across every map redraw for that district.</div>
            </div>
            <div class="help-step">
              <span class="step-num">4</span>
              <div>Use <strong>⤴ Share</strong> in the header to share the current view — opens your device's share options (email, messages, etc.) or copies the link directly. State, year, district, and panel layout are all encoded in the URL.</div>
            </div>
          </div>
        </section>
        {/if}

        {#if helpTab === 'metrics'}
        <section>
          <dl class="help-metrics">
            <div class="help-metric-row">
              <dt>Efficiency gap</dt>
              <dd>Counts "wasted votes" — votes for a losing candidate, or surplus votes beyond what a winner needed. When one party's votes are systematically wasted through <em>packing</em> (concentrating opponents into a few safe seats) and <em>cracking</em> (diluting them across many losing ones), the map structurally favors the other. <span class="help-r-val">+5%</span> means Democrats wasted 5 pp more (map favors Republicans); <span class="help-d-val">−5%</span> means the reverse.</dd>
            </div>
            <div class="help-metric-row">
              <dt>Mean–median difference</dt>
              <dd>Compares the average Democratic district vote share to the median. Packing concentrates Democratic votes into a few blowout districts, pushing the median below the mean — a negative value signals a Republican-favoring map. Near zero suggests more even distribution.</dd>
            </div>
            <div class="help-metric-row">
              <dt>Seat / vote ratio</dt>
              <dd>Seats won relative to statewide vote share. <strong>1.0×</strong> is proportional. Above 1× means a party wins more seats than its votes would predict; below 1× means fewer. Both parties can exceed 1× — one state's gerrymander doesn't cancel another's.</dd>
            </div>
            <div class="help-metric-row">
              <dt>Compactness (Polsby-Popper)</dt>
              <dd>Shape regularity on a 0–1 scale (circle = 1). Bizarrely shaped districts can signal packing and cracking — though geography and communities of interest also produce non-compact shapes legitimately.</dd>
            </div>
          </dl>

          <figure class="help-diagram-wrap">
            <svg viewBox="0 0 540 190" class="help-diagram" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing packing and cracking gerrymandering techniques">
              <defs>
                <clipPath id="lc1"><rect x="30" y="46" width="150" height="16" rx="3"/></clipPath>
                <clipPath id="lc2"><rect x="30" y="70" width="150" height="16" rx="3"/></clipPath>
                <clipPath id="lc3"><rect x="30" y="94" width="150" height="16" rx="3"/></clipPath>
                <clipPath id="lc4"><rect x="30" y="118" width="150" height="16" rx="3"/></clipPath>
                <clipPath id="rc1"><rect x="315" y="46" width="150" height="16" rx="3"/></clipPath>
                <clipPath id="rc2"><rect x="315" y="70" width="150" height="16" rx="3"/></clipPath>
                <clipPath id="rc3"><rect x="315" y="94" width="150" height="16" rx="3"/></clipPath>
                <clipPath id="rc4"><rect x="315" y="118" width="150" height="16" rx="3"/></clipPath>
              </defs>

              <!-- ── PACKING ─────────────────────────────────── -->
              <rect x="1" y="1" width="253" height="185" rx="7" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
              <text x="127" y="19" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-strong)" letter-spacing=".06em">PACKING</text>
              <text x="127" y="31" text-anchor="middle" font-size="8.5" fill="var(--text-dim)">D voters crammed into one seat</text>

              <!-- 50% marker -->
              <line x1="105" y1="42" x2="105" y2="137" stroke="var(--text-faint)" stroke-width="1" stroke-dasharray="2,2"/>
              <text x="105" y="142" text-anchor="middle" font-size="7" fill="var(--text-faint)">50%</text>

              <!-- D1: 90% D -->
              <text x="27" y="58" text-anchor="end" font-size="8.5" fill="var(--text-dim)">D1</text>
              <rect x="30" y="46" width="150" height="16" rx="3" fill="rgba(192,57,43,0.1)"/>
              <rect x="30" y="46" width="135" height="16" clip-path="url(#lc1)" fill="rgba(36,113,163,0.55)"/>
              <text x="185" y="58" font-size="8" fill="var(--text-muted)">90%</text>
              <text x="212" y="58" font-size="9" font-weight="700" fill="#2471a3">D ✓</text>

              <!-- D2: 37% D -->
              <text x="27" y="82" text-anchor="end" font-size="8.5" fill="var(--text-dim)">D2</text>
              <rect x="30" y="70" width="150" height="16" rx="3" fill="rgba(192,57,43,0.1)"/>
              <rect x="30" y="70" width="56" height="16" clip-path="url(#lc2)" fill="rgba(36,113,163,0.35)"/>
              <text x="185" y="82" font-size="8" fill="var(--text-muted)">37%</text>
              <text x="212" y="82" font-size="9" font-weight="700" fill="#c0392b">R ✓</text>

              <!-- D3: 37% D -->
              <text x="27" y="106" text-anchor="end" font-size="8.5" fill="var(--text-dim)">D3</text>
              <rect x="30" y="94" width="150" height="16" rx="3" fill="rgba(192,57,43,0.1)"/>
              <rect x="30" y="94" width="56" height="16" clip-path="url(#lc3)" fill="rgba(36,113,163,0.35)"/>
              <text x="185" y="106" font-size="8" fill="var(--text-muted)">37%</text>
              <text x="212" y="106" font-size="9" font-weight="700" fill="#c0392b">R ✓</text>

              <!-- D4: 37% D -->
              <text x="27" y="130" text-anchor="end" font-size="8.5" fill="var(--text-dim)">D4</text>
              <rect x="30" y="118" width="150" height="16" rx="3" fill="rgba(192,57,43,0.1)"/>
              <rect x="30" y="118" width="56" height="16" clip-path="url(#lc4)" fill="rgba(36,113,163,0.35)"/>
              <text x="185" y="130" font-size="8" fill="var(--text-muted)">37%</text>
              <text x="212" y="130" font-size="9" font-weight="700" fill="#c0392b">R ✓</text>

              <!-- Summary -->
              <text x="127" y="161" text-anchor="middle" font-size="8.5" fill="var(--text-muted)">~50% D votes</text>
              <text x="127" y="176" text-anchor="middle" font-size="10" font-weight="700" fill="#c0392b">1 of 4 seats (25%)</text>

              <!-- ── CRACKING ─────────────────────────────────── -->
              <rect x="287" y="1" width="253" height="185" rx="7" fill="var(--surface-2)" stroke="var(--border)" stroke-width="1"/>
              <text x="413" y="19" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-strong)" letter-spacing=".06em">CRACKING</text>
              <text x="413" y="31" text-anchor="middle" font-size="8.5" fill="var(--text-dim)">D voters diluted — never a majority</text>

              <!-- 50% marker -->
              <line x1="390" y1="42" x2="390" y2="137" stroke="var(--text-faint)" stroke-width="1" stroke-dasharray="2,2"/>
              <text x="390" y="142" text-anchor="middle" font-size="7" fill="var(--text-faint)">50%</text>

              <!-- D1: 49% D -->
              <text x="312" y="58" text-anchor="end" font-size="8.5" fill="var(--text-dim)">D1</text>
              <rect x="315" y="46" width="150" height="16" rx="3" fill="rgba(192,57,43,0.1)"/>
              <rect x="315" y="46" width="73" height="16" clip-path="url(#rc1)" fill="rgba(36,113,163,0.45)"/>
              <text x="470" y="58" font-size="8" fill="var(--text-muted)">49%</text>
              <text x="497" y="58" font-size="9" font-weight="700" fill="#c0392b">R ✓</text>

              <!-- D2: 49% D -->
              <text x="312" y="82" text-anchor="end" font-size="8.5" fill="var(--text-dim)">D2</text>
              <rect x="315" y="70" width="150" height="16" rx="3" fill="rgba(192,57,43,0.1)"/>
              <rect x="315" y="70" width="73" height="16" clip-path="url(#rc2)" fill="rgba(36,113,163,0.45)"/>
              <text x="470" y="82" font-size="8" fill="var(--text-muted)">49%</text>
              <text x="497" y="82" font-size="9" font-weight="700" fill="#c0392b">R ✓</text>

              <!-- D3: 49% D -->
              <text x="312" y="106" text-anchor="end" font-size="8.5" fill="var(--text-dim)">D3</text>
              <rect x="315" y="94" width="150" height="16" rx="3" fill="rgba(192,57,43,0.1)"/>
              <rect x="315" y="94" width="73" height="16" clip-path="url(#rc3)" fill="rgba(36,113,163,0.45)"/>
              <text x="470" y="106" font-size="8" fill="var(--text-muted)">49%</text>
              <text x="497" y="106" font-size="9" font-weight="700" fill="#c0392b">R ✓</text>

              <!-- D4: 49% D -->
              <text x="312" y="130" text-anchor="end" font-size="8.5" fill="var(--text-dim)">D4</text>
              <rect x="315" y="118" width="150" height="16" rx="3" fill="rgba(192,57,43,0.1)"/>
              <rect x="315" y="118" width="73" height="16" clip-path="url(#rc4)" fill="rgba(36,113,163,0.45)"/>
              <text x="470" y="130" font-size="8" fill="var(--text-muted)">49%</text>
              <text x="497" y="130" font-size="9" font-weight="700" fill="#c0392b">R ✓</text>

              <!-- Summary -->
              <text x="413" y="161" text-anchor="middle" font-size="8.5" fill="var(--text-muted)">49% D votes</text>
              <text x="413" y="176" text-anchor="middle" font-size="10" font-weight="700" fill="#c0392b">0 of 4 seats (0%)</text>
            </svg>
            <figcaption class="help-diagram-caption">Hypothetical 4-district state. Both methods give R most seats despite near-even vote share — through opposite techniques.</figcaption>
          </figure>

          <p class="help-note">These metrics can behave counterintuitively in landslide states, where dominant parties also "waste" many votes. Always read them alongside seat and vote totals.</p>
        </section>
        {/if}

        {#if helpTab === 'data'}
        <section>
          <div class="help-sources">
            <div class="help-source-row"><span class="source-label">Boundaries</span><span>NHGIS (U of Minnesota) — 103rd–118th Congress shapefiles</span></div>
            <div class="help-source-row"><span class="source-label">Elections</span><span>MIT Election Lab — US House returns 1976–2024</span></div>
            <div class="help-source-row"><span class="source-label">Demographics</span><span>US Census via NHGIS — 1990 STF1/3, 2000 SF1/3, ACS 2008–12 and 2018–22</span></div>
            <div class="help-source-row help-note-row"><span>The 1992 cycle has known boundary gaps in the NHGIS source data for some states.</span></div>
            <div class="help-source-row help-note-row help-note-2024">
              <span><strong>About the 2024 cycle:</strong> The 2024 elections used the same 118th Congress district maps as 2022 — no new redistricting occurred between cycles. Election results are actual 2024 House race outcomes. District demographics (race, income, education) reflect the 2020 Census, identical to the 2022 data. Four states (AL, GA, LA, NC) used court-ordered remedial maps in 2024 due to VRA litigation; their cycle notes describe the changes.</span>
            </div>
          </div>
        </section>
        {/if}

      </div>
    </div>
  </div>
{/if}

<style>
  :global(:root) {
    color-scheme: light;
    --color-d: #4a90d9;
    --color-r: #e05c5c;
    --color-d-dark: #2471a3;
    --color-r-dark: #c0392b;
    --color-2024: #EA580C;
    --bg: #f5f5f3;
    --surface: #fff;
    --surface-tl: rgba(255, 255, 255, 0.86);
    --surface-2: #f7f7f7;
    --border: #e0e0e0;
    --border-dim: #eee;
    --text: #222;
    --text-muted: #666;
    --text-dim: #999;
    --text-faint: #bbb;
    --text-label: #888;
    --text-soft: #aaa;
    --text-strong: #333;
    --text-med: #777;
    --link: #1a5c9e;
    --btn-bg: #f5f5f5;
    --btn-border: #ddd;
    --btn-color: #333;
    --btn-hover: #e8e8e8;
    --shadow-sm: rgba(0,0,0,0.08);
    --toggle-border: #ddd;
    --toggle-color: #999;
    --toggle-hover-bg: #f0f0f0;
    --toggle-hover-color: #555;
  }

  :global([data-theme=dark]) {
    color-scheme: dark;
    --bg: #0e0e1c;
    --surface: #181828;
    --surface-tl: rgba(24, 24, 40, 0.86);
    --surface-2: #141428;
    --border: #2e2e48;
    --border-dim: #242440;
    --text: #e4e4f0;
    --text-muted: #8888b0;
    --text-dim: #6666a0;
    --text-faint: #505070;
    --text-label: #7070a0;
    --text-soft: #6060a0;
    --text-strong: #c8c8e4;
    --text-med: #8888b0;
    --link: #80b8ff;
    --btn-bg: #1e1e32;
    --btn-border: #38385a;
    --btn-color: #c8c8e4;
    --btn-hover: #282840;
    --shadow-sm: rgba(0,0,0,0.3);
    --toggle-border: rgba(255,255,255,0.15);
    --toggle-color: rgba(255,255,255,0.45);
    --toggle-hover-bg: rgba(255,255,255,0.08);
    --toggle-hover-color: rgba(255,255,255,0.85);
  }

  :global(body) { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }

  .layout { display: flex; flex-direction: column; height: 100vh; }

  header {
    padding: 0.55rem 1.25rem;
    background: #1a1a2e;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .brand { display: flex; flex-direction: column; gap: 0.05rem; position: relative; cursor: default; }
  h1 { margin: 0; font-size: 1.3rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
  .accent { color: var(--color-r); }
  .tagline { margin: 0; font-size: 0.72rem; opacity: 0.45; letter-spacing: 0.01em; }
  .version { opacity: 0.45; font-size: 0.65rem; margin-left: 0.4rem; }

  .brand-popup {
    display: none;
    position: absolute;
    top: calc(100% + 0.6rem);
    left: 0;
    z-index: 200;
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    min-width: 260px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    color: rgba(255,255,255,0.85);
    font-size: 0.78rem;
    pointer-events: none;
  }
  .brand-popup strong { display: block; margin-bottom: 0.4rem; font-size: 0.8rem; color: #fff; }
  .brand-popup ul { margin: 0; padding: 0 0 0 1.1rem; display: flex; flex-direction: column; gap: 0.25rem; }
  .brand-popup li { opacity: 0.8; line-height: 1.35; }
  .brand:hover .brand-popup { display: block; }

  .view-nav {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .view-btn {
    padding: 0.28rem 0.7rem;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    color: rgba(255,255,255,0.7);
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
    font-family: inherit;
  }
  .view-btn:hover { background: rgba(255,255,255,0.14); color: #fff; }
  .view-btn.active { background: rgba(255,255,255,0.18); color: #fff; border-color: rgba(255,255,255,0.3); font-weight: 700; }

  .state-selector {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.7rem;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.15s;
    color: #fff;
    font-size: 0.85rem;
    font-family: inherit;
  }
  .state-selector:hover { background: rgba(255,255,255,0.14); }
  .state-name { font-weight: 600; }
  .state-chevron { font-size: 0.65rem; opacity: 0.4; }

  /* ── State tile-grid picker modal ── */
  .state-picker-modal {
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 16px;
    padding: 1.25rem 1.5rem 1rem;
    width: min(96vw, 540px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }
  .state-picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .state-picker-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    letter-spacing: 0.02em;
  }
  .state-tile-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: 3px;
    aspect-ratio: 12 / 7;
  }
  .state-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    color: rgba(255,255,255,0.65);
    font-size: clamp(0.45rem, 1.5vw, 0.72rem);
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.1s, color 0.1s, border-color 0.1s;
    padding: 0;
    line-height: 1;
  }
  .state-tile:hover {
    background: rgba(255,255,255,0.18);
    color: #fff;
    border-color: rgba(255,255,255,0.35);
  }
  .state-tile.active {
    background: rgba(99,179,237,0.25);
    border-color: rgba(99,179,237,0.7);
    color: #63b3ed;
  }
  .state-picker-label {
    text-align: center;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255,255,255,0.55);
    margin-top: 0.65rem;
    min-height: 1.2em;
    letter-spacing: 0.01em;
  }

  .sticky-controls-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.35rem;
  }
  .sticky-controls-header h2 { margin: 0; }

  .map-float-controls {
    position: absolute;
    bottom: 2rem;
    left: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    z-index: 10;
  }
  .map-float-btn {
    position: relative;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-muted);
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    transition: background 0.15s, color 0.15s, box-shadow 0.15s;
    padding: 0 6px;
  }
  .float-icon { font-size: 0.85rem; line-height: 1; }
  .float-label { font-size: 0.6rem; letter-spacing: 0.02em; opacity: 0.7; text-transform: uppercase; }
  .map-float-btn:hover { background: var(--surface-2); color: var(--text); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
  .map-float-btn.playing { color: var(--color-d); }
  .map-float-btn.active { color: var(--color-d); background: var(--surface-2); }
  .map-float-btn.loading { opacity: 0.75; cursor: wait; overflow: hidden; }
  .precinct-load-bar {
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: rgba(74,144,217,0.25);
    overflow: hidden;
  }
  .precinct-load-bar::after {
    content: ''; position: absolute; top: 0; bottom: 0;
    width: 45%; background: var(--color-d);
    animation: precinct-slide 1.1s ease-in-out infinite;
  }
  @keyframes precinct-slide {
    0% { left: -45%; } 100% { left: 100%; }
  }
  @keyframes precinct-pulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
  }
  .precinct-icon.spinning { animation: precinct-pulse 1.1s ease-in-out infinite; }

  .precinct-toast {
    position: absolute;
    top: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(12, 12, 22, 0.88);
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 500;
    padding: 0.4rem 0.85rem;
    border-radius: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.35);
    white-space: nowrap;
    pointer-events: none;
  }
  .precinct-toast-spinner {
    width: 12px; height: 12px;
    border: 2px solid rgba(255,255,255,0.25);
    border-top-color: var(--color-d);
    border-radius: 50%;
    animation: precinct-spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes precinct-spin { to { transform: rotate(360deg); } }

  main { flex: 1; display: flex; flex-direction: row; min-height: 0; }
  main.ph { flex-direction: column; }
  .map-wrap { flex: 1; min-width: 0; min-height: 0; position: relative; }

  /* Panel group — two panels adjacent */
  .panel-group {
    display: flex;
    flex-shrink: 0;
    background: var(--surface);
    border-color: var(--border);
    border-style: solid;
    position: relative;
  }
  .panel-group.vertical {
    flex-direction: column;
    width: 330px;
    min-width: 300px;
    height: 100%;
    border-left-width: 1px;
    border-top-width: 0;
  }
  .panel-group.horizontal {
    flex-direction: row;
    width: 100%;
    border-top-width: 1px;
    border-left-width: 0;
  }

  /* Resize handles */
  .panel-resize-handle {
    position: absolute;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .panel-resize-h {
    top: -22px; left: 0; right: 0;
    height: 44px;
    cursor: ns-resize;
  }
  .panel-resize-v {
    left: -22px; top: 0; bottom: 0;
    width: 44px;
    cursor: ew-resize;
  }
  .panel-resize-handle::before {
    content: '';
    border-radius: 2px;
    background: var(--border);
    transition: background 0.15s;
  }
  .panel-resize-h::before { width: 40px; height: 3px; }
  .panel-resize-v::before { width: 3px; height: 40px; }
  .panel-resize-handle:hover::before { background: var(--text-muted); }

  .panel-divider {
    flex-shrink: 0;
    background: transparent;
    position: relative;
  }
  .panel-group.vertical .panel-divider {
    height: 1px;
    width: 100%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
    border-top: 1px solid var(--border);
    margin: 4px 0;
  }
  .panel-group.horizontal .panel-divider {
    width: 1px;
    height: 100%;
    box-shadow: 2px 0 6px rgba(0,0,0,0.18);
    border-left: 1px solid var(--border);
    margin: 0 4px;
  }

  .panel { overflow: hidden; padding: 0; display: flex; flex-direction: column; gap: 0; min-height: 0; }
  .panel-group.vertical .panel-state { flex: 3; }
  .panel-group.vertical .panel-district { flex: 2; }
  .panel-group.horizontal .panel-state { flex: 48; }
  .panel-group.horizontal .panel-district { flex: 52; }

  /* Shared panel header — same look in both panels */
  .panel-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    min-height: 44px;
    box-sizing: border-box;
    background: var(--surface);
  }

  /* Shared snap card scroll container */
  .snap-cards {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    min-height: 0;
    scrollbar-width: none;
    padding: 0.5rem 0.6rem;
    gap: 0.5rem;
  }
  .snap-cards::-webkit-scrollbar { display: none; }

  /* State panel: each card wide enough for charts */
  .snap-cards-state .snap-card { width: 240px; }

  /* District panel: narrower cards so 3 fit at once */
  .snap-cards-district .snap-card { width: 192px; }
  .panel-group.horizontal .snap-cards-district { justify-content: safe center; }

  /* Vertical layout: stack cards top-to-bottom, fill full width */
  .panel-group.vertical .snap-cards {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
  }
  .panel-group.vertical .snap-cards .snap-card {
    width: auto;
    flex-shrink: 0;
  }

  /* Shared snap card */
  .snap-card {
    flex-shrink: 0;
    scroll-snap-align: start;
    background: var(--surface-2);
    border: 1px solid var(--border-dim);
    border-radius: 8px;
    padding: 0.55rem 0.65rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    overflow: hidden;
  }
  .snap-card-title {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-muted);
    margin: 0;
    flex-shrink: 0;
    line-height: 1.3;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .info-icon {
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    opacity: 0.4;
    cursor: help;
    flex-shrink: 0;
    transition: opacity 0.15s;
  }
  .info-icon:hover { opacity: 0.85; }
  .snap-card-note {
    font-size: 0.68rem;
    color: var(--text-dim);
    margin: 0;
  }

  /* Shared compact dl inside snap cards */
  .snap-dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.08rem 0.5rem;
    margin: 0;
  }
  .snap-dl dt { font-size: 0.7rem; color: var(--text-muted); line-height: 1.65; white-space: nowrap; }
  .snap-dl dd { font-size: 0.78rem; font-weight: 600; line-height: 1.65; margin: 0; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
  .snap-dl dt:nth-child(4n+1),
  .snap-dl dd:nth-child(4n+2) { background: rgba(128,128,128,0.06); border-radius: 2px; }

  .snap-legend { font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap; margin-top: 0.1rem; }
  .snap-credits { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.3rem; }

  .snap-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3px 4px;
    padding: 5px 0.5rem 4px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--border-dim);
  }
  .snap-nav-btn {
    font-size: 0.72rem;
    padding: 5px 10px;
    border-radius: 99px;
    border: 1px solid var(--border);
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.12s, color 0.12s, border-color 0.12s;
    white-space: nowrap;
    line-height: 1.6;
  }
  .snap-nav-btn:hover {
    background: var(--surface-2);
    color: var(--text);
    border-color: var(--text-dim);
  }
  .snap-nav-btn.active {
    background: var(--text-muted);
    color: var(--surface);
    border-color: var(--text-muted);
  }
  .snap-credits li { font-size: 0.68rem; color: var(--text-muted); line-height: 1.4; }
  .snap-credits a { color: var(--link); text-decoration: none; }
  .snap-events { padding-left: 0; list-style: none; margin: 0; }

  .sticky-controls {
    position: sticky;
    top: 0;
    background: var(--surface);
    z-index: 1;
    padding-bottom: 0.5rem;
    margin-bottom: -0.5rem;
    box-shadow: 0 4px 8px -4px var(--shadow-sm);
  }

  h2 {
    margin: 0 0 0.4rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-label);
  }

  .cycle-buttons { display: flex; gap: 0.3rem; align-items: center; container-type: inline-size; }

  button {
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--btn-border);
    background: var(--btn-bg);
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 500;
    transition: border-color 0.15s, box-shadow 0.15s;
    white-space: nowrap;
    color: var(--btn-color);
  }
  button:hover { background: var(--btn-hover); }
  button:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  /* Cycle buttons keep their inline gradient on hover — don't override */
  .cycle-buttons button:not(.anim-btn):hover { background: unset; }

  /* Cycle year buttons: flex:1 so they always share available space */
  .cycle-buttons button:not(.anim-btn) {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 0.1rem;
    padding: 0.6rem 0.5rem;
    border-radius: 6px;
    border: 1px solid rgba(128,128,128,0.18);
    font-weight: 600;
    position: relative;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  /* Hover overlay via pseudo-element — avoids filter repaints */
  .cycle-buttons button:not(.anim-btn)::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 5px;
    background: transparent;
    pointer-events: none;
    transition: background 0.15s;
  }
  .cycle-buttons button:not(.anim-btn):hover::after { background: rgba(128,128,128,0.1); }
  .cycle-buttons button:not(.anim-btn).active {
    border-color: rgba(80,80,80,0.5);
    box-shadow: 0 0 0 1.5px rgba(80,80,80,0.3), 0 2px 8px rgba(0,0,0,0.1);
  }
  .cycle-buttons button:not(.anim-btn).previewing { border-color: rgba(100,100,100,0.45); }

  .btn-d-delta {
    font-size: 0.65rem;
    font-weight: 800;
    color: #1d4ed8;
    text-align: left;
    line-height: 1;
    overflow: hidden;
    text-shadow: 0 0 6px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.3);
  }
  .btn-r-delta {
    font-size: 0.65rem;
    font-weight: 800;
    color: #b91c1c;
    text-align: right;
    line-height: 1;
    overflow: hidden;
    text-shadow: 0 0 6px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.3);
  }
  :global([data-theme=dark]) .btn-d-delta {
    color: #93c5fd;
    text-shadow: 0 0 8px rgba(0,0,0,0.8);
  }
  :global([data-theme=dark]) .btn-r-delta {
    color: #fca5a5;
    text-shadow: 0 0 8px rgba(0,0,0,0.8);
  }
  .btn-year {
    text-align: center;
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1;
  }

  /* D/R counts hidden by default; shown only when each button has enough room */
  /* 4 buttons × ~88px + anim ~26px + gaps ~20px ≈ 398px threshold */
  .btn-d-delta, .btn-r-delta { display: none; }
  @container (min-width: 400px) {
    .btn-d-delta, .btn-r-delta { display: block; }
    .cycle-buttons button:not(.anim-btn) { grid-template-columns: 1.4rem 1fr 1.4rem; }
  }

  .anim-btn { color: var(--text-muted); border-color: var(--btn-border); background: transparent; }
  .anim-btn.playing { background: #fff8e1; border-color: #f0a500; color: #a06000; }

  :global([data-theme=dark]) .anim-btn.playing { background: rgba(255,200,50,0.12); color: #ffd060; }

  .preview-badge {
    font-size: 0.65rem;
    background: var(--color-d);
    color: #fff;
    padding: 0.1rem 0.4rem;
    border-radius: 99px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    vertical-align: middle;
    margin-left: 0.4rem;
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.28rem 0.6rem;
    margin: 0;
    font-size: 0.82rem;
    transition: opacity 0.35s ease;
  }

  dt { color: var(--text-muted); white-space: nowrap; font-size: 0.76rem; }
  dt .has-tip { cursor: help; border-bottom: 1px dotted currentColor; }
  dd { margin: 0; font-weight: 500; }
  dd.drawn-by { min-height: 2.4em; }

  .d { color: var(--color-d); font-weight: 700; }
  .r { color: var(--color-r); font-weight: 700; }
  .favor-r { color: var(--color-r); }
  .favor-d { color: var(--color-d); }

  .note { margin: 0.5rem 0 0; font-size: 0.72rem; color: var(--text-dim); line-height: 1.4; min-height: 2.8em; }

  .events-section { border: none; }
  .events-section summary {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-label);
    margin-bottom: 0.4rem;
    user-select: none;
  }
  .events-section summary::-webkit-details-marker { display: none; }
  .events-section summary::before {
    content: '▶';
    font-size: 0.55rem;
    transition: transform 0.15s;
    color: var(--text-soft);
  }
  .events-section[open] summary::before { transform: rotate(90deg); }

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    max-height: 9.5rem;
    overflow-y: auto;
    padding-right: 0.25rem;
  }
  .events li {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding-left: 0.7rem;
    border-left: 2px solid var(--border);
  }
  .events li strong { font-size: 0.78rem; color: var(--text-strong); font-weight: 600; }
  .events li strong a { color: var(--link); text-decoration: none; }
  .events li strong a:hover { text-decoration: underline; }
  .events li span { font-size: 0.72rem; color: var(--text-med); line-height: 1.4; }

  .data-credits {
    margin-top: 1rem;
    padding: 0.75rem;
    background: var(--surface-2);
    border-radius: 6px;
    border-top: 2px solid var(--border-dim);
  }
  .credits-heading {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-soft);
    margin: 0 0 0.4rem;
  }
  .data-credits ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .data-credits li { font-size: 0.7rem; color: var(--text-label); line-height: 1.4; }
  .data-credits a { color: var(--text-muted); text-decoration: none; border-bottom: 1px dotted var(--text-faint); }
  .data-credits a:hover { color: var(--text-strong); border-bottom-color: var(--text-muted); }

  .about-section { margin-top: 0.5rem; }
  .about-body {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
  .about-body p {
    margin: 0;
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.55;
  }
  .about-body strong { color: var(--text-strong); font-weight: 600; }
  .about-body a { color: var(--link); text-decoration: none; }
  .about-body a:hover { text-decoration: underline; }
  .resources-section { margin-top: 0.5rem; }
  .resource-heading {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-soft);
    margin: 0.75rem 0 0.3rem;
  }
  .resource-heading:first-of-type { margin-top: 0.1rem; }
  .resource-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }
  .resource-list li {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding-left: 0.7rem;
    border-left: 2px solid var(--border);
  }
  .resource-list a {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--link);
    text-decoration: none;
  }
  .resource-list a:hover { text-decoration: underline; }
  .resource-list span { font-size: 0.72rem; color: var(--text-med); line-height: 1.4; }

  .legend-items { display: flex; align-items: center; font-size: 0.82rem; }
  .swatch { display: inline-block; width: 13px; height: 13px; border-radius: 2px; margin-right: 4px; }
  .swatch.d { background: var(--color-d); }
  .swatch.r { background: var(--color-r); }

  .chart-section { display: flex; flex-direction: column; gap: 0.2rem; }
  .chart-note { margin: 0; font-size: 0.7rem; color: var(--text-faint); }

  footer {
    position: relative;
    padding: 0.45rem 1.25rem;
    background: #1a1a2e;
    color: rgba(255,255,255,0.6);
    font-size: 0.72rem;
  }
  footer a { color: rgba(255,255,255,0.65); }
  .footer-updated {
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
    font-size: 0.65rem;
    white-space: nowrap;
  }
  @media (max-width: 640px) {
    .footer-updated { position: static; transform: none; display: block; text-align: right; margin-top: 0.25rem; }
  }

  .share-btn {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7);
    border-radius: 99px;
    padding: 0 0.65rem;
    height: 1.75rem;
    cursor: pointer;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    display: flex; align-items: center; gap: 0.25rem;
    white-space: nowrap;
  }
  .share-btn:hover { background: rgba(255,255,255,0.14); color: #fff; }
  .share-btn.copied { background: rgba(60,180,100,0.25); border-color: rgba(60,180,100,0.5); color: #7effa0; }

  .feedback-btn {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7);
    border-radius: 99px;
    padding: 0 0.65rem;
    height: 1.75rem;
    cursor: pointer;
    font-size: 0.72rem;
    font-weight: 600;
    font-family: inherit;
    letter-spacing: 0.02em;
    transition: background 0.15s, color 0.15s;
    display: flex; align-items: center;
    white-space: nowrap;
  }
  .feedback-btn:hover { background: rgba(255,255,255,0.14); color: #fff; }

  .help-btn {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7);
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1;
    transition: background 0.15s, color 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .help-btn:hover { background: rgba(255,255,255,0.14); color: #fff; }

  .theme-toggle {
    margin-left: auto;
    display: flex;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    overflow: hidden;
  }
  .theme-toggle button {
    background: rgba(255,255,255,0.07);
    border: none;
    color: rgba(255,255,255,0.5);
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1;
    transition: background 0.15s, color 0.15s;
  }
  .theme-toggle button:hover { background: rgba(255,255,255,0.14); color: rgba(255,255,255,0.9); }
  .theme-toggle button.active { background: rgba(255,255,255,0.18); color: #fff; }

  /* Help modal */
  .help-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.55);
    z-index: 200;
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
  }
  .help-modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    display: flex; flex-direction: column;
    box-shadow: 0 12px 48px rgba(0,0,0,0.35);
  }
  .help-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.9rem 1.25rem 0.85rem;
    background: #1a1a2e;
    border-radius: 12px 12px 0 0;
    flex-shrink: 0;
  }
  .help-header h2 {
    margin: 0; font-size: 1.05rem; font-weight: 700; color: #fff;
  }
  .help-close {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.55); font-size: 1rem; padding: 0.25rem 0.4rem;
    border-radius: 4px; transition: background 0.1s, color 0.1s;
  }
  .help-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
  /* Hook intro */
  .help-hook {
    background: var(--surface-2);
    border-bottom: 1px solid var(--border);
    padding: 0.85rem 1.4rem;
    display: flex; flex-direction: column; gap: 0.4rem;
    flex-shrink: 0;
  }
  .help-hook p {
    margin: 0;
    font-size: 0.87rem;
    line-height: 1.6;
    color: var(--text);
  }
  .help-hook em { font-style: italic; color: var(--text-strong); }
  .help-feedback-nudge { opacity: 0.6; font-size: 0.8rem !important; }

  /* Tab nav */
  .help-tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    padding: 0 0.75rem;
    gap: 0;
  }
  .help-tabs button {
    background: none; border: none; cursor: pointer;
    padding: 0.6rem 0.85rem;
    font-size: 0.8rem; font-weight: 500;
    color: var(--text-muted);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color 0.12s, border-color 0.12s;
    display: flex; align-items: center; gap: 0.35rem;
    white-space: nowrap;
  }
  .help-tabs button:hover { color: var(--text); }
  .help-tabs button.active {
    color: var(--text-strong);
    border-bottom-color: var(--text-strong);
    font-weight: 600;
  }
  .tab-icon { font-size: 0.9rem; }

  .help-body {
    overflow-y: auto;
    padding: 1.25rem 1.4rem 1.5rem;
    display: flex; flex-direction: column; gap: 1.5rem;
  }

  .help-body section { display: contents; }

  /* Numbered steps */
  .help-steps {
    display: flex; flex-direction: column; gap: 0.65rem;
  }
  .help-step {
    display: flex; gap: 0.7rem; align-items: flex-start;
  }
  .step-num {
    flex-shrink: 0;
    width: 1.35rem; height: 1.35rem;
    border-radius: 50%;
    background: var(--surface-2);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 700;
    color: var(--text-muted);
    margin-top: 0.1rem;
  }
  .help-step div {
    font-size: 0.87rem;
    line-height: 1.58;
    color: var(--text);
  }
  .help-step div strong { color: var(--text-strong); }
  .help-d { color: var(--color-d-dark); font-weight: 600; }
  .help-r { color: var(--color-r-dark); font-weight: 600; }

  /* Metrics */
  .help-metrics {
    display: flex; flex-direction: column; gap: 0.75rem; margin: 0;
  }
  .help-metric-row { display: flex; flex-direction: column; gap: 0.15rem; }
  .help-metrics dt {
    font-size: 0.84rem; font-weight: 700; color: var(--text-strong);
  }
  .help-metrics dd {
    font-size: 0.83rem; line-height: 1.55; color: var(--text-muted); margin: 0;
    padding-left: 0.75rem;
    border-left: 2px solid var(--border);
  }
  .help-r-val { color: var(--color-r-dark); font-weight: 600; }
  .help-d-val { color: var(--color-d-dark); font-weight: 600; }
  .help-note {
    font-size: 0.79rem;
    color: var(--text-dim);
    font-style: italic;
    margin-top: 0.25rem;
  }

  /* Packing/cracking diagram */
  .help-diagram-wrap {
    margin: 0;
    display: flex; flex-direction: column; gap: 0.4rem;
  }
  .help-diagram {
    width: 100%; height: auto;
    display: block;
  }
  .help-diagram-caption {
    font-size: 0.77rem;
    color: var(--text-dim);
    font-style: italic;
    text-align: center;
  }

  /* Data sources */
  .help-sources {
    display: flex; flex-direction: column; gap: 0.4rem;
  }
  .help-source-row {
    display: flex; gap: 0.6rem;
    font-size: 0.83rem; line-height: 1.5; color: var(--text);
  }
  .source-label {
    flex-shrink: 0;
    min-width: 6rem;
    font-weight: 600;
    color: var(--text-strong);
  }
  .help-note-row {
    color: var(--text-dim);
    font-size: 0.79rem;
    font-style: italic;
    padding-top: 0.1rem;
  }
  .help-note-2024 {
    font-style: normal;
    margin-top: 0.4rem;
    padding: 0.6rem 0.75rem;
    background: rgba(234, 88, 12, 0.08);
    border-left: 3px solid var(--color-2024);
    border-radius: 0 6px 6px 0;
    color: var(--text);
  }
  :global([data-theme=dark]) .help-note-2024 {
    background: rgba(234, 88, 12, 0.12);
  }

  /* District detail card */
  .nation-cycle-bar {
    position: absolute;
    bottom: 3.75rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 99px;
    padding: 0.35rem 0.75rem;
    box-shadow: 0 2px 12px var(--shadow-sm);
    z-index: 10;
    display: flex;
    align-items: center;
  }
  .state-cycle-bar {
    position: absolute;
    bottom: 3.75rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 99px;
    padding: 0.35rem 0.75rem;
    box-shadow: 0 2px 12px var(--shadow-sm);
    z-index: 10;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  /* Nation cycle bar — standalone simple buttons */
  .nation-btns {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .nation-yr-btn {
    flex: none;
    width: 3.6rem;
    padding: 0.45rem 0.3rem;
    border-radius: 6px;
    border: 1px solid rgba(128,128,128,0.2);
    background: transparent;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--btn-color);
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    text-align: center;
  }
  .nation-yr-btn:hover { background: var(--btn-hover); }
  .nation-yr-btn.active {
    border-color: rgba(80,80,80,0.5);
    box-shadow: 0 0 0 1.5px rgba(80,80,80,0.3), 0 2px 8px rgba(0,0,0,0.1);
  }
  .nation-yr-btn.anim-btn {
    width: auto;
    padding: 0.45rem 0.5rem;
    color: var(--text-muted);
    border-color: var(--btn-border);
  }
  .nation-yr-btn.anim-btn.playing { background: #fff8e1; border-color: #f0a500; color: #a06000; }
  .nation-delta-btn { width: auto; padding: 0.45rem 0.55rem; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
  .nation-delta-btn.active { color: var(--color-d); border-color: rgba(74,144,217,0.4); background: rgba(74,144,217,0.08); }
  :global([data-theme=dark]) .nation-delta-btn.active { color: #60a5fa; border-color: rgba(96,165,250,0.35); background: rgba(96,165,250,0.1); }
  .nation-screenshot-btn { width: auto; padding: 0.45rem 0.5rem; color: var(--text-muted); }

  .nation-speed-group {
    display: flex;
    gap: 2px;
    margin-left: 0.2rem;
    padding-left: 0.35rem;
    border-left: 1px solid var(--border);
  }
  .nation-speed-btn {
    flex: none;
    padding: 0.3rem 0.45rem;
    border-radius: 4px;
    border: 1px solid transparent;
    background: transparent;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.12s, color 0.12s, border-color 0.12s;
  }
  .nation-speed-btn:hover { background: var(--btn-hover); color: var(--text); }
  .nation-speed-btn.active {
    background: var(--btn-hover);
    border-color: var(--border);
    color: var(--text);
  }

  .district-card {
    border: 1px solid var(--border);
    border-top: 3px solid var(--border);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .district-card.d { border-top-color: var(--color-d); }
  .district-card.r { border-top-color: var(--color-r); }


  .dc-body {
    flex: 1;
    overflow-y: auto;
    padding: 0.6rem 0.85rem 0.5rem;
    min-height: 0;
  }
  .district-card dl {
    gap: 0.18rem 0.5rem;
    font-size: 0.78rem;
  }
  .district-card dl dd {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .dc-prev {
    font-size: 0.64rem;
    color: var(--text-muted);
    font-weight: 400;
    line-height: 1.2;
  }

  .district-card-links { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.25rem; }
  .district-card-wiki {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--link);
    text-decoration: none;
    padding: 0.2rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    transition: background 0.15s;
  }
  .district-card-wiki:hover { background: var(--btn-hover); }

  /* District panel */
  .panel-district { gap: 0; padding: 0; overflow: hidden; }
  .dp-won-by { font-size: 0.75rem; font-weight: 700; flex: 1; }
  .dp-won-by.d { color: #1d4ed8; }
  .dp-won-by.r { color: #b91c1c; }
  :global([data-theme=dark]) .dp-won-by.d { color: #93c5fd; }
  :global([data-theme=dark]) .dp-won-by.r { color: #fca5a5; }

  .dc-tabs {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border);
    padding: 0 0.4rem;
    gap: 0;
    flex-shrink: 0;
  }
  .dc-district-year {
    font-size: 0.65rem;
    font-weight: 400;
    opacity: 0.7;
    margin-left: 0.2em;
  }
  .dc-district-label {
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--text-muted);
    padding: 0.35rem 0.4rem 0.35rem 0.3rem;
    letter-spacing: 0.02em;
    flex-shrink: 0;
    min-width: 2.2em;
    text-align: center;
    border-right: 1px solid var(--border);
    margin-right: 0.1rem;
  }
  .dc-tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 0.35rem 0.45rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--text-dim);
    cursor: pointer;
    margin-bottom: -1px;
    transition: color 0.1s, border-color 0.1s;
    white-space: nowrap;
  }
  .dc-tab.active {
    color: var(--text);
    border-bottom-color: var(--text);
  }
  .dc-tab:hover:not(.active) { color: var(--text); }
  .dc-pending {
    margin: 0.25rem 0;
    font-size: 0.7rem;
    color: var(--text-dim);
    font-style: italic;
  }
  .dc-source {
    margin: 0.4rem 0 0;
    font-size: 0.65rem;
    color: var(--text-dim);
    font-style: italic;
  }

  /* ── Mobile ────────────────────────────────────────────────────────────────── */
  @media (max-width: 640px) {
    /* Header: wrap to two rows — brand top, nav bottom */
    header { padding: 0.45rem 0.75rem; gap: 0.5rem; flex-wrap: wrap; }
    .tagline { display: none; }
    h1 { font-size: 1.1rem; }
    /* Nav fills second row so All States + state selector are always reachable */
    .view-nav { order: 10; width: 100%; gap: 0.4rem; }
    .view-btn { flex: none; }
    .state-selector { flex: 1; justify-content: center; }

    /* Mobile chrome: year bar + nav row — solid dark bar matching panel palette */
    .mobile-chrome {
      background: rgb(26, 30, 52);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      flex-shrink: 0;
      --text: rgba(255,255,255,0.88);
      --text-muted: rgba(255,255,255,0.55);
      --text-dim: rgba(255,255,255,0.40);
      --border: rgba(255,255,255,0.11);
      --border-dim: rgba(255,255,255,0.07);
      --btn-bg: rgba(255,255,255,0.09);
      --btn-border: rgba(255,255,255,0.14);
      --btn-color: rgba(255,255,255,0.82);
    }
    .mobile-year-bar {
      padding: 0.35rem 0.6rem 0.2rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .mobile-nav-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.3rem 0.6rem;
    }

    /* Layer toggle: compact 3-button segmented control */
    .mobile-layer-toggle {
      display: flex;
      flex-shrink: 0;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 7px;
      overflow: hidden;
    }
    .mobile-layer-toggle button {
      flex: 1;
      background: transparent;
      border: none;
      border-right: 1px solid rgba(255,255,255,0.10);
      color: rgba(255,255,255,0.70);
      font-size: 0.68rem;
      font-weight: 500;
      padding: 0.3rem 0.5rem;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.15s, color 0.15s;
    }
    .mobile-layer-toggle button:last-child { border-right: none; }
    .mobile-layer-toggle button.active {
      background: rgba(255,255,255,0.92);
      color: rgb(26,30,52);
    }

    /* Section scroll: horizontally scrollable pill nav */
    .mobile-section-scroll {
      display: flex;
      gap: 0.3rem;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      flex: 1;
      min-width: 0;
      padding: 0 0.125rem;
    }
    .mobile-section-scroll::-webkit-scrollbar { display: none; }
    .mobile-sec-btn {
      flex-shrink: 0;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.13);
      border-radius: 12px;
      color: rgba(255,255,255,0.65);
      font-size: 0.68rem;
      font-weight: 500;
      padding: 0.25rem 0.58rem;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .mobile-sec-btn.active {
      background: rgba(255,255,255,0.92);
      border-color: transparent;
      color: rgb(26,30,52);
      font-weight: 600;
    }

    /* Map fills the full main area */
    main { flex-direction: row; }
    .map-wrap { flex: 1; }

    /* Hide all floating map controls on mobile (replaced by chrome + layer toggle) */
    .map-float-controls { display: none !important; }

    /* Nation cycle bar: top of map on mobile, allow scroll if wider than screen */
    .nation-cycle-bar {
      bottom: auto;
      top: 0.5rem;
      left: 0.5rem;
      right: 0.5rem;
      transform: none;
      overflow-x: auto;
      scrollbar-width: none;
      justify-content: flex-start;
    }
    .nation-cycle-bar::-webkit-scrollbar { display: none; }
    /* State floating cycle bar: hidden on mobile (shown in chrome above) */
    .state-cycle-bar { display: none; }

    /* Panel: Weather app-style frosted glass card */
    .panel-group {
      position: fixed !important;
      bottom: 3.75rem !important;
      left: 0.875rem !important;
      right: 0.875rem !important;
      width: auto !important;
      height: auto !important;
      max-height: 42vh !important;
      overflow: hidden !important;
      flex-direction: column !important;
      border: 1px solid rgba(255,255,255,0.13) !important;
      background: rgba(26, 30, 52, 0.76) !important;
      backdrop-filter: blur(24px) saturate(1.6) !important;
      -webkit-backdrop-filter: blur(24px) saturate(1.6) !important;
      box-shadow: 0 8px 40px rgba(0,0,0,0.32), 0 1px 0 rgba(255,255,255,0.07) inset !important;
      z-index: 25 !important;
      border-radius: 18px !important;
      transform: translateY(0);
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      /* CSS variable overrides — white-on-dark for glass context */
      --text: rgba(255,255,255,0.90);
      --text-muted: rgba(255,255,255,0.58);
      --text-dim: rgba(255,255,255,0.42);
      --text-strong: #fff;
      --text-label: rgba(255,255,255,0.52);
      --text-soft: rgba(255,255,255,0.35);
      --text-med: rgba(255,255,255,0.62);
      --text-faint: rgba(255,255,255,0.26);
      --border: rgba(255,255,255,0.11);
      --border-dim: rgba(255,255,255,0.07);
      --surface: rgba(255,255,255,0.06);
      --surface-2: rgba(255,255,255,0.04);
      --btn-bg: rgba(255,255,255,0.09);
      --btn-border: rgba(255,255,255,0.14);
      --btn-color: rgba(255,255,255,0.82);
      --btn-hover: rgba(255,255,255,0.15);
      --link: rgba(120,180,255,0.90);
    }
    .panel-group.panel-closed {
      transform: translateY(calc(100% + 4.5rem));
      pointer-events: none;
    }
    /* Hide divider between state and district panels on mobile */
    .panel-group .panel-divider { display: none !important; }
    /* Default: state panel visible, district panel hidden */
    .panel-district { display: none !important; }
    .panel-state.panel { flex: 1 !important; min-height: 0 !important; max-height: none !important; overflow: hidden !important; }
    /* Demo mode: swap — show district panel, hide state panel */
    .panel-group.panel-demo .panel-district { display: flex !important; flex: 1 !important; min-height: 0 !important; max-height: none !important; overflow: hidden !important; }
    .panel-group.panel-demo .panel-state { display: none !important; }
    /* District snap cards: same treatment as state cards on mobile */
    .panel-group.panel-demo .snap-cards-district {
      padding: 0.25rem 0;
      overflow-x: auto;
      overflow-y: hidden;
      height: 100%;
      scrollbar-width: none;
    }
    .panel-group.panel-demo .snap-cards-district .snap-card {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      overflow-y: auto;
      border: none !important;
      background: transparent !important;
      border-radius: 0 !important;
      padding: 0.55rem 1.25rem 0.55rem 0.75rem;
    }
    .panel-resize-handle { display: none !important; }
    /* Header right padding must clear 18px border-radius to avoid corner clipping */
    .panel-header { padding-right: 1.25rem; }

    /* iOS-style drag handle — tap to collapse panel to full-map mode */
    .mobile-panel-handle {
      display: block;
      width: 36px;
      height: 4px;
      background: rgba(255,255,255,0.30);
      border: none;
      border-radius: 99px;
      margin: 0.5rem auto 0.15rem;
      flex-shrink: 0;
      cursor: pointer;
      padding: 0;
      transition: background 0.15s;
    }
    .mobile-panel-handle:hover { background: rgba(255,255,255,0.55); }

    /* Hide in-panel snap nav — external section nav row serves this role */
    .snap-nav { display: none !important; }

    /* Snap cards: horizontal snap, fill panel height so card content can scroll */
    .snap-cards-state {
      padding: 0.25rem 0;
      overflow-x: auto;
      overflow-y: hidden;
      height: 100%;
    }
    .snap-cards-state .snap-card {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      overflow-y: auto;
      max-height: none;
      /* Remove card chrome — glass panel IS the card */
      border: none !important;
      background: transparent !important;
      border-radius: 0 !important;
      padding: 0.55rem 1.25rem 0.55rem 0.75rem;
    }

    /* Pills on dark glass: ensure legibility */
    .panel-group .pill {
      background: rgba(255,255,255,0.18) !important;
      color: rgba(255,255,255,0.92) !important;
      border-color: rgba(255,255,255,0.30) !important;
    }
    /* Drawn-by dd: allow pill to show fully rather than being clipped */
    .panel-group dd.drawn-by {
      white-space: normal !important;
      text-align: left !important;
      overflow: visible !important;
    }

    /* Cycle buttons: hide seat counts */
    .btn-d-delta, .btn-r-delta { display: none !important; }
    .cycle-buttons button:not(.anim-btn) { grid-template-columns: 1fr !important; }
  }
</style>
