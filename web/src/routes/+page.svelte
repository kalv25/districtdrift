<script lang="ts">
  import { onMount } from 'svelte';
  import Map from '$lib/Map.svelte';
  import NationView from '$lib/NationView.svelte';
  import EGChart from '$lib/EGChart.svelte';
  import SeatVoteChart from '$lib/SeatVoteChart.svelte';
  import TrendChart from '$lib/TrendChart.svelte';
  import { CYCLE_EVENTS } from '$lib/events';
  import CompetitivenessChart from '$lib/CompetitivenessChart.svelte';

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
        { label: 'Brennan Center for Justice', url: 'https://www.brennancenter.org/issues/gerrymandering', description: 'Policy analysis and litigation tracking on redistricting and gerrymandering.' },
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
  };

  // 'nation' = 50-state overview; a postal code = state detail view
  let viewMode = $state<'nation' | string>('MI');
  let selectedState = $derived(viewMode === 'nation' ? 'MI' : viewMode);
  let stateMenuOpen = $state(false);

  function selectState(po: string) {
    stateMenuOpen = false;
    if (viewMode === po) return;
    viewMode = po;
    manualYear = 2022;
    animTick = CYCLES.indexOf(2022);
    animating = false;
    hoveredYear = null;
    pinnedDistrict = 1;
  }

  function goNation() {
    viewMode = 'nation';
    stateMenuOpen = false;
  }

  const CYCLES = [1992, 2002, 2012, 2022];
  const YEAR_COLOR: Record<number, string> = {
    1992: '#CA8A04', 2002: '#0D9488', 2012: '#9333EA', 2022: '#DB2777',
  };
  const ANIM_INTERVAL_MS = 2400;
  const FADE_MS = 450;

  // manualYear: user's explicit selection; animTick: index cycled by animation
  let manualYear = $state(2022);
  let animTick = $state(CYCLES.indexOf(2022));
  let animating = $state(false);
  let selectedYear = $derived(animating ? CYCLES[animTick] : manualYear);

  let hoveredYear = $state<number | null>(null);
  let pinnedDistrict = $state<number>(1);

  function computeDefaultDistrict(cycles: typeof stats): number {
    const sorted = [...cycles].sort((a, b) => a.cycle_year - b.cycle_year);
    const latest = sorted[sorted.length - 1];
    const prev = sorted[sorted.length - 2];
    if (!latest) return 1;
    if (!prev) return latest.districts[0]?.district ?? 1;
    const prevMap = new Map(prev.districts.map((d: any) => [d.district, d]));
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

  function startPanelResize(e: MouseEvent) {
    e.preventDefault();
    const startY = e.clientY;
    const startH = panelH;
    function onMove(ev: MouseEvent) {
      panelH = Math.max(MIN_PANEL_H, Math.min(MAX_PANEL_H, startH - (ev.clientY - startY)));
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      localStorage.setItem(PANEL_H_KEY, String(panelH));
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function startPanelWidthResize(e: MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startW = panelW;
    function onMove(ev: MouseEvent) {
      panelW = Math.max(MIN_PANEL_W, Math.min(MAX_PANEL_W, startW - (ev.clientX - startX)));
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      localStorage.setItem(PANEL_W_KEY, String(panelW));
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  const THEME_KEY = 'districtdrift.theme';
  let theme = $state<'light' | 'dark' | 'system'>('system');
  let systemDark = $state(false);
  const darkMode = $derived(theme === 'dark' || (theme === 'system' && systemDark));

  const HELP_KEY = 'districtdrift.helpSeen';
  let helpOpen = $state(false);

  const isMobile = () => window.innerWidth < 640;

  onMount(() => {
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

    // Auto-show help on first visit
    if (!localStorage.getItem(HELP_KEY)) {
      helpOpen = true;
      localStorage.setItem(HELP_KEY, '1');
    }
  });

  $effect(() => { localStorage.setItem(PANEL_KEY, panelLayout); });
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
  let _animId: ReturnType<typeof setInterval> | null = null;
  $effect(() => {
    if (_animId) { clearInterval(_animId); _animId = null; }
    if (!animating) return;
    _animId = window.setInterval(() => { animTick = (animTick + 1) % CYCLES.length; }, ANIM_INTERVAL_MS);
    return () => { if (_animId) { clearInterval(_animId); _animId = null; } };
  });

  function stopAnimation() { if (animating) { manualYear = selectedYear; animating = false; } }
  function toggleAnimation() {
    if (animating) { stopAnimation(); }
    else { animTick = CYCLES.indexOf(manualYear); animating = true; hoveredYear = null; }
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
    if (stateMenuOpen && !(e.target as Element)?.closest?.('.state-selector-wrap')) {
      stateMenuOpen = false;
    }
  }}
  onkeydown={(e) => { if (e.key === 'Escape') helpOpen = false; }}
/>

<svelte:head>
  <title>{viewMode === 'nation'
    ? 'District Drift — US Congressional Gerrymandering'
    : `District Drift — ${STATES[selectedState]?.name ?? selectedState} Congressional Gerrymandering`}</title>
</svelte:head>

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
        <span class="btn-year">{year}</span>
        <span class="btn-r-delta">{seatsR != null ? `${seatsR}R` : ''}</span>
      </button>
    {/each}
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
      <dt>D votes</dt>
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
      ? pinnedDistData!.partisan_lean_d - prevDistData!.partisan_lean_d : null}
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
    </div>

    <button
      class="help-btn"
      onclick={() => helpOpen = true}
      title="How to use this site"
      aria-label="Help"
    >?</button>

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

      <div class="state-selector-wrap">
        <button
          class="state-selector"
          class:open={stateMenuOpen}
          class:active={viewMode !== 'nation'}
          onclick={() => stateMenuOpen = !stateMenuOpen}
          aria-haspopup="listbox"
          aria-expanded={stateMenuOpen}
        >
          {#if viewMode !== 'nation'}
            <span class="state-name">{STATES[selectedState]?.name ?? selectedState}</span>
          {:else}
            <span class="state-name" style="opacity:0.55">Select state</span>
          {/if}
          <span class="state-chevron">▾</span>
        </button>
        {#if stateMenuOpen}
          <ul class="state-menu" role="listbox">
            {#each Object.entries(STATES) as [po, info]}
              <li role="option" aria-selected={po === selectedState}>
                <button
                  class:active={viewMode === po}
                  onclick={() => selectState(po)}
                >{info.name}</button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </nav>

  </header>

  <main class:ph={panelLayout === 'horizontal'}>
    <div class="map-wrap">
      {#if viewMode === 'nation'}
        <NationView selectedYear={selectedYear} onStateClick={selectState} fullDataStates={Object.keys(STATES)} />
        <!-- Floating cycle bar for nation view -->
        <div class="nation-cycle-bar">
          {@render cycleControls()}
        </div>
      {:else}
        {#key viewMode}
          <Map selectedYear={displayYear} fadeDuration={FADE_MS} panelBottom={0} panelLeft={0} statePo={selectedState} cycleYears={CYCLES} {darkMode} onDistrictClick={(d) => {
              const dn = Number(d.district);
              if (dn !== pinnedDistrict) districtTab = 'partisan';
              pinnedDistrict = dn;
            }} onMapClick={() => { pinnedDistrict = computeDefaultDistrict(stats); districtTab = 'partisan'; }} />
        {/key}
      {/if}

      <!-- Floating map controls: play + layout toggle -->
      {#if viewMode !== 'nation'}
        <div class="map-float-controls">
          <button
            class="map-float-btn anim-btn"
            class:playing={animating}
            onclick={toggleAnimation}
            title={animating ? 'Pause animation' : 'Animate through cycles'}
          >{animating ? '⏸' : '▶'}</button>
          <button
            class="map-float-btn"
            title={panelLayout === 'vertical' ? 'Switch to bottom panels' : 'Switch to side panels'}
            onclick={() => panelLayout = panelLayout === 'vertical' ? 'horizontal' : 'vertical'}
          >{panelLayout === 'vertical' ? '⬇' : '➡'}</button>
        </div>
      {/if}
    </div>

    {#if viewMode !== 'nation'}
      <div
        class="panel-group"
        class:vertical={panelLayout === 'vertical'}
        class:horizontal={panelLayout === 'horizontal'}
        style={panelLayout === 'horizontal' ? `height: ${panelH}px` : `width: ${panelW}px`}
      >
        {#if panelLayout === 'horizontal'}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="panel-resize-handle panel-resize-h" onmousedown={startPanelResize}></div>
        {:else}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="panel-resize-handle panel-resize-v" onmousedown={startPanelWidthResize}></div>
        {/if}

        <!-- Panel 1: State -->
        <aside class="panel panel-state">
          <div class="panel-header">
            {@render cycleControls()}
          </div>

          {#if displayStats}
            <div class="snap-cards snap-cards-state">
              <!-- Card: Key stats -->
              <div class="snap-card">
                <p class="snap-card-title">
                  {displayStats.cycle_year} — {displayStats.total_seats} seats
                  {#if hoveredYear}<span class="preview-badge">preview</span>{/if}
                </p>
                <dl class="snap-dl">
                  <dt>Drawn by</dt><dd class="drawn-by">{displayStats.redistricting_controller}</dd>
                  <dt>Seats</dt>
                  <dd><span class="d">{displayStats.seats_d}D</span> / <span class="r">{displayStats.seats_r}R</span> <span class="muted">of {displayStats.total_seats}</span></dd>
                  <dt>D votes</dt><dd>{(displayStats.votes_d * 100).toFixed(1)}%</dd>
                  <dt>R votes</dt><dd>{(displayStats.votes_r * 100).toFixed(1)}%</dd>
                  {#if displayStats.efficiency_gap !== null}
                    <dt>Eff. gap</dt>
                    <dd class={displayStats.efficiency_gap > 0 ? 'favor-r' : 'favor-d'}>
                      {displayStats.efficiency_gap > 0 ? '+' : ''}{(displayStats.efficiency_gap * 100).toFixed(1)}% {displayStats.efficiency_gap > 0 ? '→ R' : '→ D'}
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
                <p class="snap-card-title">Seat vs. vote share</p>
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
                <p class="snap-card-title">Vote vs. seat share</p>
                <p class="snap-card-note">— votes &nbsp;·&nbsp; – – seats</p>
                <TrendChart cycles={stats} selectedYear={displayYear} />
              </div>

              <!-- Card: Efficiency gap -->
              <div class="snap-card">
                <p class="snap-card-title">Efficiency gap</p>
                <p class="snap-card-note">+ favors R &nbsp;·&nbsp; − favors D</p>
                <EGChart cycles={egCycles} selectedYear={displayYear} />
              </div>

              {#if competCycles.length}
                <!-- Card: Competitiveness -->
                <div class="snap-card">
                  <p class="snap-card-title">District competitiveness</p>
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
                <span class="dp-won-by {won_by === 'D' ? 'd' : won_by === 'R' ? 'r' : ''}">{won_by === 'D' ? 'Democrat' : won_by === 'R' ? 'Republican' : '—'}</span>
              {/if}
              <a href={ballotpediaUrl(selectedState, pinnedDistrict)} target="_blank" rel="noopener" class="district-card-wiki">Ballotpedia →</a>
            </div>

            {#if pinnedDistData == null}
              <p class="dc-pending" style="padding: 0.5rem 0.75rem">D{pinnedDistrict} did not exist in {selectedYear}.</p>
            {:else}
              <div class="snap-cards snap-cards-district">
                <!-- Card: Partisan -->
                <div class="snap-card">
                  <p class="snap-card-title">Partisan</p>
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
                  <p class="snap-card-title">Race &amp; pop</p>
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
                  <p class="snap-card-title">Income &amp; edu</p>
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
      <a href="https://github.com/kalv25/districtdrift/discussions/1" target="_blank" rel="noopener">Leave feedback</a>
    </p>
  </footer>
</div>

{#if helpOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="help-backdrop" onclick={() => helpOpen = false}>
    <div class="help-modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Help">
      <div class="help-header">
        <h2>About District Drift</h2>
        <button class="help-close" onclick={() => helpOpen = false} aria-label="Close">✕</button>
      </div>
      <div class="help-body">

        <section>
          <h3>What is this?</h3>
          <p>District Drift is a historical record of congressional gerrymandering in the United States from 1992 to 2022. Every decade after the Census, states redraw their congressional district maps — a process that is often used to give one party a structural advantage. This site lets you explore how those maps changed across four redistricting cycles and what effect they had on election outcomes.</p>
          <p>Unlike forward-looking redistricting tools, this site is purely retrospective: it asks <em>how have maps been drawn</em>, and <em>who benefited</em>?</p>
        </section>

        <section>
          <h3>How to use it</h3>
          <ul>
            <li><strong>Select a state</strong> from the dropdown in the header.</li>
            <li><strong>Choose a cycle</strong> (1992, 2002, 2012, 2022) using the buttons above the map, or press <strong>▶</strong> to animate through all four.</li>
            <li>When switching cycles, district boundaries <strong>morph</strong> to their new positions. A <strong>swing overlay</strong> shows which districts shifted toward Democrats (blue) or Republicans (red).</li>
            <li>The <strong>dashed lines</strong> on the map show the previous cycle's boundaries for reference.</li>
            <li><strong>Click any district</strong> to pin a detail card. The card stays pinned as you change cycles — use it to track how a district's partisan lean, racial composition, income, and education changed across redistricting cycles. Each value shows the previous cycle's figure for comparison.</li>
          </ul>
        </section>

        <section>
          <h3>Understanding the metrics</h3>
          <dl class="help-metrics">
            <dt>Efficiency gap</dt>
            <dd>Measures "wasted votes" — votes cast for a losing candidate, or surplus votes for a winner beyond what was needed. If one party's votes are systematically wasted at a higher rate through packing and cracking, the map favors the other. A value of <span class="r">+5%</span> means Democrats wasted 5 percentage points more of the total vote than Republicans (maps favor Republicans); <span class="d">−5%</span> means the reverse.</dd>

            <dt>Mean–median difference</dt>
            <dd>Compares the mean Democratic vote share across all districts to the median. When Democratic votes are concentrated into a few lopsided districts (packing), the median falls below the mean — a negative value that indicates Republican-favoring maps. Values near zero suggest a more even distribution.</dd>

            <dt>Seat / vote ratio</dt>
            <dd>How many seats a party wins relative to its statewide vote share. A ratio of <strong>1.0×</strong> means seats are proportional to votes. Above 1× means the party wins more seats than its vote share would predict; below 1× means fewer. Extreme values in either direction suggest structural bias in the map.</dd>

            <dt>Compactness (Polsby-Popper)</dt>
            <dd>Measures how compact a district's shape is, from 0 to 1 (a perfect circle = 1). Strangely shaped, elongated districts are sometimes a sign of partisan manipulation — though geography and communities of interest also legitimately produce non-compact shapes.</dd>
          </dl>
          <p class="help-note">These metrics can behave counterintuitively when one party wins by very large margins, as landslide victories also waste many votes. Always read them alongside the seat and vote totals.</p>
        </section>

        <section>
          <h3>About the data</h3>
          <ul>
            <li>District boundaries: <strong>NHGIS</strong> (University of Minnesota), congressional shapefiles from the 103rd–118th Congress.</li>
            <li>Election results: <strong>MIT Election Lab</strong> US House returns 1976–2024.</li>
            <li>Demographics (population, race, income, education): <strong>US Census Bureau</strong> via NHGIS — 1990 STF1/STF3, 2000 SF1/SF3, and ACS 5-year estimates (2008–2012 and 2018–2022).</li>
            <li>The 1992 cycle (103rd Congress) has known gaps in the NHGIS shapefile for some states — a handful of district boundaries are missing from the source data.</li>
            <li>Currently covers Michigan. More states are added regularly.</li>
          </ul>
        </section>

      </div>
    </div>
  </div>
{/if}

<style>
  :global(:root) {
    color-scheme: light;
    --bg: #f5f5f3;
    --surface: #fff;
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

  .brand { display: flex; flex-direction: column; gap: 0.05rem; }
  h1 { margin: 0; font-size: 1.3rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
  .accent { color: #e05c5c; }
  .tagline { margin: 0; font-size: 0.72rem; opacity: 0.45; letter-spacing: 0.01em; }
  .version { opacity: 0.45; font-size: 0.65rem; margin-left: 0.4rem; }

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

  .state-selector-wrap { position: relative; }

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
  .state-selector:hover, .state-selector.open { background: rgba(255,255,255,0.14); }
.state-name { font-weight: 600; }
  .state-chevron { font-size: 0.6rem; opacity: 0.4; }

  .state-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 10px;
    list-style: none;
    margin: 0;
    padding: 0.3rem 0;
    min-width: 100%;
    z-index: 100;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    overflow: hidden;
  }
  .state-menu li { list-style: none; }
  .state-menu li button {
    display: block;
    width: 100%;
    padding: 0.45rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.1s, color 0.1s;
  }
  .state-menu li button:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .state-menu li button.active { color: #fff; font-weight: 700; }

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
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-muted);
    font-size: 0.8rem;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  }
  .map-float-btn:hover { background: var(--surface-2); color: var(--text); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
  .map-float-btn.playing { color: var(--accent, #4a90d9); }

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
    top: -4px; left: 0; right: 0;
    height: 8px;
    cursor: ns-resize;
  }
  .panel-resize-v {
    left: -4px; top: 0; bottom: 0;
    width: 8px;
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
  .panel-header .cycle-buttons { flex: 1; }

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
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-muted);
    margin: 0;
    flex-shrink: 0;
    line-height: 1.3;
  }
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
    font-size: 0.6rem;
    font-weight: 800;
    color: #1d4ed8;
    text-align: left;
    line-height: 1;
    overflow: hidden;
    text-shadow: 0 0 6px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.3);
  }
  .btn-r-delta {
    font-size: 0.6rem;
    font-weight: 800;
    color: #b91c1c;
    text-align: right;
    line-height: 1;
    overflow: hidden;
    text-shadow: 0 0 6px rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.3);
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
    background: #4a90d9;
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
  dd { margin: 0; font-weight: 500; }
  dd.drawn-by { min-height: 2.4em; }

  .d { color: #4a90d9; font-weight: 700; }
  .r { color: #e05c5c; font-weight: 700; }
  .favor-r { color: #e05c5c; }
  .favor-d { color: #4a90d9; }

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
  .swatch.d { background: #4a90d9; }
  .swatch.r { background: #e05c5c; }

  .chart-section { display: flex; flex-direction: column; gap: 0.2rem; }
  .chart-note { margin: 0; font-size: 0.7rem; color: var(--text-faint); }

  footer {
    padding: 0.45rem 1.25rem;
    background: #1a1a2e;
    color: rgba(255,255,255,0.45);
    font-size: 0.72rem;
  }
  footer a { color: rgba(255,255,255,0.65); }

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
    border-radius: 10px;
    width: 100%;
    max-width: 620px;
    max-height: 88vh;
    display: flex; flex-direction: column;
    box-shadow: 0 8px 40px rgba(0,0,0,0.35);
  }
  .help-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1.25rem 0.75rem;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .help-header h2 {
    margin: 0; font-size: 1.05rem; font-weight: 700; color: var(--text);
  }
  .help-close {
    background: none; border: none; cursor: pointer;
    color: var(--text-muted); font-size: 1rem; padding: 0.25rem 0.4rem;
    border-radius: 4px; transition: background 0.1s;
  }
  .help-close:hover { background: var(--surface-2); }
  .help-body {
    overflow-y: auto;
    padding: 1.1rem 1.25rem 1.25rem;
    display: flex; flex-direction: column; gap: 1.25rem;
  }
  .help-body section h3 {
    margin: 0 0 0.5rem;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .help-body p, .help-body li {
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text);
    margin: 0 0 0.4rem;
  }
  .help-body ul {
    margin: 0; padding-left: 1.2rem;
    display: flex; flex-direction: column; gap: 0.3rem;
  }
  .help-metrics {
    display: grid; grid-template-columns: auto 1fr;
    gap: 0.5rem 0.9rem; margin: 0;
  }
  .help-metrics dt {
    font-size: 0.83rem; font-weight: 600; color: var(--text);
    padding-top: 0.05rem; white-space: nowrap;
  }
  .help-metrics dd {
    font-size: 0.83rem; line-height: 1.55; color: var(--text-muted); margin: 0;
  }
  .help-metrics .d { color: #4a90d9; font-weight: 600; }
  .help-metrics .r { color: #e05c5c; font-weight: 600; }
  .help-note {
    font-size: 0.8rem !important;
    color: var(--text-muted) !important;
    font-style: italic;
    margin-top: 0.5rem !important;
  }

  /* District detail card */
  .nation-cycle-bar {
    position: absolute;
    bottom: 2rem;
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
  .district-card.d { border-top-color: #4a90d9; }
  .district-card.r { border-top-color: #e05c5c; }


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
    font-size: 0.6rem;
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
  @media (max-width: 639px) {
    header {
      padding: 0.45rem 0.75rem;
      gap: 0.6rem;
      flex-wrap: wrap;
    }
    .tagline { display: none; }
    h1 { font-size: 1.1rem; }

    /* Nation cycle bar sits higher to clear the panel */
    .nation-cycle-bar { bottom: auto; top: 0.5rem; }

    /* Rank panel on nation view: hide on small screens (map is primary) */
    /* NationView handles this via its own media query in the component */
  }

  @media (max-width: 640px) {
    main { flex-direction: column !important; }
    .panel-group { flex-direction: column !important; width: 100% !important; height: auto !important; border-left-width: 0 !important; border-top-width: 1px !important; }
    .panel-group .panel-divider { height: 1px !important; width: 100% !important; }
    .panel { flex: none !important; max-height: 300px; }
  }
</style>
