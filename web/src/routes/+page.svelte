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
  };

  // 'nation' = 50-state overview; a postal code = state detail view
  let viewMode = $state<'nation' | string>('nation');
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
    selectedDistrict = null;
  }

  function goNation() {
    viewMode = 'nation';
    stateMenuOpen = false;
    selectedDistrict = null;
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
  type DistrictDetail = { district: number; won_by: string; partisan_lean_d: number | null; cycle_year: number; x: number; y: number };
  let selectedDistrict = $state<DistrictDetail | null>(null);
  let displayYear = $derived(hoveredYear ?? selectedYear);
  const PANEL_KEY = 'districtdrift.panelPosition';
  let panelPosition = $state<'side' | 'bottom' | 'bottom-wide'>('side');

  const THEME_KEY = 'districtdrift.theme';
  let darkMode = $state(false);

  const isMobile = () => window.innerWidth < 640;

  onMount(() => {
    const savedPanel = localStorage.getItem(PANEL_KEY);
    if (savedPanel === 'bottom' || savedPanel === 'side' || savedPanel === 'bottom-wide') {
      panelPosition = savedPanel as typeof panelPosition;
    } else if (isMobile()) {
      panelPosition = 'bottom'; // default to bottom panel on small screens
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') darkMode = savedTheme === 'dark';
    else darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  $effect(() => { localStorage.setItem(PANEL_KEY, panelPosition); });
  $effect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
  });
  let bottomPanelEl = $state<HTMLDivElement | null>(null);
  let bottomPanelH = $state(0);
  // 1.5rem bottom offset of the panel + its height
  const BOTTOM_OFFSET_PX = 24;
  const isBottomPanel = $derived(panelPosition === 'bottom' || panelPosition === 'bottom-wide');
  let mapPanelBottom = $derived(isBottomPanel ? bottomPanelH + BOTTOM_OFFSET_PX : 0);

  let mapWrapW = $state(0);
  const CARD_W = 240;
  const cardLeft = $derived(
    selectedDistrict
      ? (mapWrapW > 0 && selectedDistrict.x + CARD_W + 20 > mapWrapW
        ? selectedDistrict.x - CARD_W - 8
        : selectedDistrict.x + 12)
      : 0
  );
  const cardTop = $derived(selectedDistrict ? Math.max(8, selectedDistrict.y - 20) : 0);

  type Competitiveness = {
    solid_d: number; lean_d: number; competitive: number;
    lean_r: number; solid_r: number;
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
  };
  type DataCredit = { label: string; url: string; note: string; };

  let stats = $state<CycleStats[]>([]);
  let credits = $state<DataCredit[]>([]);
  let displayStats = $derived(stats.find((s) => s.cycle_year === displayYear));
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
    const res = await fetch(`/${po.toLowerCase()}_stats.json`);
    const data = await res.json();
    stats = data.cycles;
    credits = data.credits ?? [];
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
</script>

<svelte:window onclick={(e) => {
  if (stateMenuOpen && !(e.target as Element)?.closest?.('.state-selector-wrap')) {
    stateMenuOpen = false;
  }
}} />

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
      <button
        class:active={selectedYear === year && hoveredYear === null}
        class:previewing={hoveredYear === year}
        style="--yc: {YEAR_COLOR[year]}"
        onmouseenter={() => hoveredYear = year}
        onclick={() => { manualYear = year; stopAnimation(); }}
      >
        <span class="year-dot"></span>{year}
      </button>
    {/each}
    <button
      class="anim-btn"
      class:playing={animating}
      onclick={toggleAnimation}
      title={animating ? 'Pause animation' : 'Animate through cycles'}
    >
      {animating ? '⏸' : '▶'}
    </button>
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
  {#if selectedDistrict}
    <div class="district-card" class:d={selectedDistrict.won_by === 'D'} class:r={selectedDistrict.won_by === 'R'}>
      <div class="district-card-header">
        <span class="district-card-title">District {selectedDistrict.district}</span>
        <button class="district-card-close" onclick={() => selectedDistrict = null} aria-label="Close">✕</button>
      </div>
      <dl>
        <dt>Won by</dt>
        <dd class={selectedDistrict.won_by === 'D' ? 'd' : 'r'}>
          {selectedDistrict.won_by === 'D' ? 'Democrat' : selectedDistrict.won_by === 'R' ? 'Republican' : '—'}
        </dd>
        {#if selectedDistrict.partisan_lean_d !== null}
          <dt>Partisan lean</dt>
          <dd>{Math.round(selectedDistrict.partisan_lean_d * 100)}% D</dd>
        {/if}
        <dt>Cycle</dt>
        <dd>{selectedDistrict.cycle_year}</dd>
      </dl>
      <div class="district-card-links">
        <a
          href={wikiUrl(selectedState, selectedDistrict.district)}
          target="_blank"
          rel="noopener"
          class="district-card-wiki"
        >Wikipedia →</a>
      </div>
      <p class="district-card-note">
        Precinct-level results coming in a future update.
      </p>
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
      class="theme-toggle"
      onclick={() => darkMode = !darkMode}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >{darkMode ? '☀' : '☽'}</button>

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

  <main>
    <div class="map-wrap" bind:clientWidth={mapWrapW}>
      {#if viewMode === 'nation'}
        <NationView selectedYear={selectedYear} onStateClick={selectState} fullDataStates={Object.keys(STATES)} />
        <!-- Floating cycle bar for nation view -->
        <div class="nation-cycle-bar">
          {@render cycleControls()}
        </div>
      {:else}
        {#key viewMode}
          <Map selectedYear={displayYear} fadeDuration={FADE_MS} panelBottom={mapPanelBottom} statePo={selectedState} cycleYears={CYCLES} {darkMode} onDistrictClick={(d) => selectedDistrict = d} onMapClick={() => selectedDistrict = null} />
        {/key}
        {#if selectedDistrict}
          <div class="district-popup" style="left:{cardLeft}px; top:{cardTop}px">
            {@render districtCard()}
          </div>
        {/if}
      {/if}
    </div>

    {#if viewMode !== 'nation' && panelPosition === 'side'}
      <aside class="panel side">
        <section class="sticky-controls">
          <div class="sticky-controls-header">
            <h2>Redistricting cycle</h2>
            <button
              class="panel-toggle-btn"
              title="Switch to bottom panel"
              onclick={() => panelPosition = 'bottom'}
            >⬇</button>
          </div>
          {@render cycleControls()}
        </section>

        {#if displayStats}
          <section>
            <h2>
              {displayStats.cycle_year} cycle — {displayStats.total_seats} seats
              {#if hoveredYear}<span class="preview-badge">preview</span>{/if}
            </h2>
            {@render statsContent()}
            <p class="note">{displayStats.notes ? `ⓘ ${displayStats.notes}` : ''}</p>
          </section>

          {#if CYCLE_EVENTS[selectedState]?.[displayYear]?.length}
            <details class="events-section" open>
              <summary>Key events</summary>
              <ul class="events">
                {#each [...CYCLE_EVENTS[selectedState]?.[displayYear]].reverse() as ev}
                  <li>
                    <strong>
                      {#if ev.url}
                        <a href={ev.url} target="_blank" rel="noopener">{ev.title}</a>
                      {:else}
                        {ev.title}
                      {/if}
                    </strong>
                    <span>{ev.detail}</span>
                  </li>
                {/each}
              </ul>
            </details>
          {/if}

          <section>
            <h2>District won by</h2>
            <div class="legend-items">
              <span class="swatch d"></span> Democrat &nbsp;
              <span class="swatch r"></span> Republican
            </div>
          </section>

          <section class="chart-section">
            <h2>Seat vs. vote share</h2>
            <SeatVoteChart
              seatsD={displayStats.seats_d}
              seatsR={displayStats.seats_r}
              votesD={displayStats.votes_d}
              votesR={displayStats.votes_r}
              totalSeats={displayStats.total_seats}
            />
          </section>

          <section class="chart-section">
            <h2>Vote vs. seat share — all cycles</h2>
            <p class="chart-note">— votes &nbsp;·&nbsp; – – seats</p>
            <TrendChart cycles={stats} selectedYear={displayYear} />
          </section>

          <section class="chart-section">
            <h2>Efficiency gap — all cycles</h2>
            <p class="chart-note">+ favors R &nbsp;·&nbsp; − favors D</p>
            <EGChart cycles={egCycles} selectedYear={displayYear} />
          </section>

          {#if competCycles.length}
            <section class="chart-section">
              <h2>District competitiveness — all cycles</h2>
              <CompetitivenessChart cycles={competCycles} selectedYear={displayYear} />
            </section>
          {/if}
        {/if}

        {#if credits.length}
          <footer class="data-credits">
            <p class="credits-heading">Data credits</p>
            <ul>
              {#each credits as c}
                <li><a href={c.url} target="_blank" rel="noopener">{c.label}</a> — {c.note}</li>
              {/each}
              <li><a href="https://carto.com" target="_blank" rel="noopener">© CARTO</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap contributors</a> — basemap</li>
            </ul>
          </footer>
        {/if}

        <details class="events-section about-section">
          <summary>About this project</summary>
          <div class="about-body">
            <p>District Drift is an independent project by <a href="https://github.com/kalv25" target="_blank" rel="noopener">Kana Nadarajan</a> documenting how congressional district maps have shaped election outcomes across four redistricting cycles — 1992, 2002, 2012, and 2022.</p>
            <p>The core metric is the <strong>efficiency gap</strong>: the difference in "wasted" votes between the two parties, expressed as a share of total votes. Wasted votes are all losing-party votes plus any winning-party votes beyond what was needed to win. A large positive gap means Republican maps packed and cracked Democratic voters; a large negative gap means the reverse.</p>
            <p>The 2% threshold is a commonly cited benchmark — gaps below it are considered within the normal range of electoral variation.</p>
            <p>Boundary data comes from <a href="https://www.nhgis.org" target="_blank" rel="noopener">NHGIS</a>; election returns from the <a href="https://electionlab.mit.edu/data" target="_blank" rel="noopener">MIT Election Lab</a>.</p>
          </div>
        </details>

        <details class="events-section resources-section">
          <summary>Resources</summary>
          {#each RESOURCES as group}
            <p class="resource-heading">{group.heading}</p>
            <ul class="resource-list">
              {#each group.links as link}
                <li>
                  <a href={link.url} target="_blank" rel="noopener">{link.label}</a>
                  <span>{link.description}</span>
                </li>
              {/each}
            </ul>
          {/each}
        </details>
      </aside>
    {/if}

    {#if viewMode !== 'nation' && isBottomPanel}
      <div class="panel bottom" class:wide={panelPosition === 'bottom-wide'} bind:this={bottomPanelEl} bind:clientHeight={bottomPanelH}>

        <!-- Year controls row -->
        <div class="bottom-header">
          {@render cycleControls()}
          {#if hoveredYear}
            <span class="preview-badge">preview {hoveredYear}</span>
          {:else}
            <span class="bottom-year">{selectedYear}</span>
          {/if}
          <div class="bottom-header-actions">
            <button
              class="panel-toggle-btn"
              title={panelPosition === 'bottom' ? 'Expand panel' : 'Compact panel'}
              onclick={() => panelPosition = panelPosition === 'bottom' ? 'bottom-wide' : 'bottom'}
            >{panelPosition === 'bottom' ? '⬌' : '⬍'}</button>
            <button
              class="panel-toggle-btn"
              title="Switch to side panel"
              onclick={() => panelPosition = 'side'}
            >➡</button>
          </div>
        </div>

        <div class="bottom-hr"></div>

        <!-- Content panes -->
        {#if displayStats}
          <div class="bottom-panes">

            <div class="bottom-pane">
              <p class="bottom-pane-label">Stats &amp; chart</p>
              {@render statsContent()}
              <div class="bottom-seat-chart">
                <SeatVoteChart
                  seatsD={displayStats.seats_d}
                  seatsR={displayStats.seats_r}
                  votesD={displayStats.votes_d}
                  votesR={displayStats.votes_r}
                  totalSeats={displayStats.total_seats}
                />
              </div>
            </div>

            <div class="bottom-pane-divider"></div>

            <div class="bottom-pane">
              <p class="bottom-pane-label">Key events</p>
              {#if CYCLE_EVENTS[selectedState]?.[displayYear]?.length}
                <ul class="events">
                  {#each [...CYCLE_EVENTS[selectedState]?.[displayYear]].reverse() as ev}
                    <li>
                      <strong>
                        {#if ev.url}
                          <a href={ev.url} target="_blank" rel="noopener">{ev.title}</a>
                        {:else}
                          {ev.title}
                        {/if}
                      </strong>
                      <span>{ev.detail}</span>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>

            {#if panelPosition === 'bottom-wide'}
              <div class="bottom-pane-divider"></div>
              <div class="bottom-pane">
                <p class="bottom-pane-label">Vote vs. seat share</p>
                <TrendChart cycles={stats} selectedYear={displayYear} />
              </div>
              <div class="bottom-pane-divider"></div>
              <div class="bottom-pane">
                <p class="bottom-pane-label">Efficiency gap</p>
                <p class="chart-note">+ favors R &nbsp;·&nbsp; − favors D</p>
                <EGChart cycles={egCycles} selectedYear={displayYear} />
              </div>
              {#if competCycles.length}
                <div class="bottom-pane-divider"></div>
                <div class="bottom-pane">
                  <p class="bottom-pane-label">District competitiveness</p>
                  <CompetitivenessChart cycles={competCycles} selectedYear={displayYear} />
                </div>
              {/if}
            {/if}

          </div>
        {/if}

      </div>
    {/if}
  </main>

  <footer>
    <p>
      Built by <a href="https://github.com/kalv25" target="_blank" rel="noopener">Kana Nadarajan</a> ·
      Sources:
      <a href="https://www.nhgis.org/" target="_blank" rel="noopener">NHGIS</a> ·
      <a href="https://electionlab.mit.edu/" target="_blank" rel="noopener">MIT Election Lab</a> ·
      <a href="https://redistrictingdatahub.org/" target="_blank" rel="noopener">Redistricting Data Hub</a> ·
      <a href="https://github.com/kalv25/districtdrift/discussions/1" target="_blank" rel="noopener">Leave feedback</a>
    </p>
  </footer>
</div>

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

  .panel-toggle-btn {
    background: transparent;
    border: 1px solid var(--toggle-border);
    color: var(--toggle-color);
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    line-height: 1;
    transition: background 0.15s, color 0.15s;
  }
  .panel-toggle-btn:hover { background: var(--toggle-hover-bg); color: var(--toggle-hover-color); }
  .panel.bottom .panel-toggle-btn {
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.5);
  }
  .panel.bottom .panel-toggle-btn:hover {
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.9);
  }

  main { flex: 1; display: flex; min-height: 0; position: relative; }
  .map-wrap { flex: 1; min-width: 0; position: relative; }

  /* Side panel */
  aside.panel.side {
    width: 360px;
    flex-shrink: 0;
    background: var(--surface);
    border-left: 1px solid var(--border);
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .sticky-controls {
    position: sticky;
    top: 0;
    background: var(--surface);
    z-index: 1;
    padding-bottom: 0.5rem;
    margin-bottom: -0.5rem;
    box-shadow: 0 4px 8px -4px var(--shadow-sm);
  }

  /* Bottom HUD */
  .panel.bottom {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(20, 20, 40, 0.88);
    backdrop-filter: blur(8px);
    color: #fff;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: min(780px, calc(100vw - 2rem));
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
    z-index: 10;
    transition: width 0.3s ease;
  }
  .panel.bottom.wide {
    width: min(1300px, calc(100vw - 2rem));
  }

  .bottom-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem 1.25rem;
    gap: 1rem;
    flex-shrink: 0;
  }

  .bottom-hr {
    height: 1px;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
  }

  .bottom-panes {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .bottom-pane {
    flex: 1;
    padding: 0.7rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    max-height: 180px;
    min-width: 0;
  }
  .panel.bottom.wide .bottom-pane { max-height: 130px; }

  .bottom-header-actions { display: flex; gap: 0.4rem; align-items: center; }

  .bottom-pane-divider {
    width: 1px;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
    align-self: stretch;
  }

  .bottom-pane-label {
    margin: 0;
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: rgba(255,255,255,0.35);
  }

  .bottom-seat-chart { margin-top: 0.25rem; }

  .bottom-year { font-size: 1.1rem; font-weight: 700; color: #fff; }

  h2 {
    margin: 0 0 0.4rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-label);
  }

  .cycle-buttons { display: flex; gap: 0.35rem; align-items: center; }

  button {
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--btn-border);
    background: var(--btn-bg);
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 500;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    white-space: nowrap;
    color: var(--btn-color);
  }

  .year-dot {
    display: inline-block;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--yc);
    margin-right: 5px;
    vertical-align: middle;
    opacity: 0.6;
    flex-shrink: 0;
  }
  button:hover { background: var(--btn-hover); }
  button.previewing { background: var(--btn-bg); border-color: var(--yc); color: var(--btn-color); }
  button.previewing .year-dot { opacity: 1; }
  button.active { background: #1a1a2e; color: #fff; border-color: var(--yc); }
  button.active .year-dot { opacity: 1; }

  .anim-btn { color: var(--text-muted); border-color: var(--btn-border); background: transparent; }
  .anim-btn.playing { background: #fff8e1; border-color: #f0a500; color: #a06000; }

  :global([data-theme=dark]) .anim-btn.playing { background: rgba(255,200,50,0.12); color: #ffd060; }

  /* Bottom panel button overrides (cycle + anim buttons, not tab buttons) */
  .panel.bottom .cycle-buttons button {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.85);
  }
  .panel.bottom .cycle-buttons button:hover { background: rgba(255,255,255,0.2); }
  .panel.bottom .cycle-buttons button.previewing { background: rgba(255,255,255,0.15); border-color: var(--yc); color: rgba(255,255,255,0.9); }
  .panel.bottom .cycle-buttons button.active { background: rgba(255,255,255,0.2); border-color: var(--yc); color: #fff; }
  .panel.bottom .anim-btn { background: transparent; border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); }
  .panel.bottom .anim-btn.playing { background: rgba(255,200,50,0.15); border-color: #f0a500; color: #ffd060; }

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

  /* Compact dl for bottom panel left pane */
  .panel.bottom dl {
    gap: 0.2rem 0.6rem;
    font-size: 0.78rem;
  }

  dt { color: var(--text-muted); white-space: nowrap; font-size: 0.76rem; }
  dd { margin: 0; font-weight: 500; }
  dd.drawn-by { min-height: 2.4em; }

  .panel.bottom dt { color: rgba(255,255,255,0.5); }
  .panel.bottom dd { color: #fff; }
  .panel.bottom dd.drawn-by { min-height: unset; }

  .panel.bottom .events li { border-left-color: rgba(255,255,255,0.2); }
  .panel.bottom .events li strong { color: #fff; }
  .panel.bottom .events li strong a { color: #80b8ff; }
  .panel.bottom .events li span { color: rgba(255,255,255,0.6); }

  .d { color: #4a90d9; font-weight: 700; }
  .r { color: #e05c5c; font-weight: 700; }
  .favor-r { color: #e05c5c; }
  .favor-d { color: #4a90d9; }

  .panel.bottom .d { color: #80b8ff; }
  .panel.bottom .r { color: #ff8888; }
  .panel.bottom .favor-r { color: #ff8888; }
  .panel.bottom .favor-d { color: #80b8ff; }

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

  .theme-toggle {
    margin-left: auto;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7);
    border-radius: 20px;
    padding: 0.25rem 0.65rem;
    cursor: pointer;
    font-size: 0.95rem;
    line-height: 1;
    transition: background 0.15s, color 0.15s;
  }
  .theme-toggle:hover { background: rgba(255,255,255,0.14); color: #fff; }

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

  .district-popup {
    position: absolute;
    z-index: 12;
    pointer-events: auto;
  }

  .district-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-top: 3px solid var(--border);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    width: 240px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .district-card.d { border-top-color: #4a90d9; }
  .district-card.r { border-top-color: #e05c5c; }

  .district-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .district-card-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text);
  }
  .district-card-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 0.75rem;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    line-height: 1;
  }
  .district-card-close:hover { background: var(--btn-hover); color: var(--text); }

  .district-card dl {
    gap: 0.2rem 0.5rem;
    font-size: 0.78rem;
  }

  .district-card-links { display: flex; gap: 0.5rem; flex-wrap: wrap; }
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

  .district-card-note {
    margin: 0;
    font-size: 0.68rem;
    color: var(--text-dim);
    line-height: 1.4;
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

    /* Side panel never shown on mobile — handled by JS default, but guard here */
    aside.panel.side { display: none; }

    /* Bottom panel: full-width, no border-radius on sides */
    .panel.bottom {
      left: 0;
      right: 0;
      bottom: 0;
      transform: none;
      border-radius: 12px 12px 0 0;
      width: 100% !important;
    }

    /* Tighten bottom pane max-height on mobile */
    .bottom-pane { max-height: 140px; }

    /* Nation cycle bar sits higher to clear the panel */
    .nation-cycle-bar { bottom: auto; top: 0.5rem; }

    /* Rank panel on nation view: hide on small screens (map is primary) */
    /* NationView handles this via its own media query in the component */
  }
</style>
