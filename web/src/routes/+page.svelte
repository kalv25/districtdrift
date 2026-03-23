<script lang="ts">
  import { onMount } from 'svelte';
  import Map from '$lib/Map.svelte';
  import EGChart from '$lib/EGChart.svelte';
  import SeatVoteChart from '$lib/SeatVoteChart.svelte';
  import TrendChart from '$lib/TrendChart.svelte';
  import { CYCLE_EVENTS } from '$lib/events';

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
    NC: { name: 'North Carolina', flag: '◉' },
  };

  let selectedState = $state('MI');
  let stateMenuOpen = $state(false);

  function selectState(po: string) {
    if (po === selectedState) { stateMenuOpen = false; return; }
    selectedState = po;
    stateMenuOpen = false;
    manualYear = 2022;
    animTick = CYCLES.indexOf(2022);
    animating = false;
    hoveredYear = null;
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
  let displayYear = $derived(hoveredYear ?? selectedYear);
  const PANEL_KEY = 'districtdrift.panelPosition';
  let panelPosition = $state<'side' | 'bottom'>('side');
  onMount(() => {
    const saved = localStorage.getItem(PANEL_KEY);
    if (saved === 'bottom' || saved === 'side') panelPosition = saved;
  });
  $effect(() => { localStorage.setItem(PANEL_KEY, panelPosition); });
  let bottomPanelEl = $state<HTMLDivElement | null>(null);
  let bottomPanelH = $state(0);
  // 1.5rem bottom offset of the panel + its height
  const BOTTOM_OFFSET_PX = 24;
  let mapPanelBottom = $derived(
    panelPosition === 'bottom' ? bottomPanelH + BOTTOM_OFFSET_PX : 0
  );

  type CycleStats = {
    cycle_year: number; congress: number; total_seats: number;
    redistricting_controller: string; notes: string;
    efficiency_gap: number; mean_median_diff: number;
    seats_d: number; seats_r: number;
    votes_d: number; votes_r: number;
    seat_vote_ratio_d: number | null;
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

  function voteShare(d: number, r: number): string {
    const total = d + r;
    return total > 0 ? ((d / total) * 100).toFixed(1) + '%' : '—';
  }
</script>

<svelte:window onclick={(e) => {
  if (stateMenuOpen && !(e.target as Element)?.closest?.('.state-selector-wrap')) {
    stateMenuOpen = false;
  }
}} />

<svelte:head>
  <title>District Drift — {STATES[selectedState].name} Congressional Gerrymandering</title>
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
    </dl>
  {/if}
{/snippet}

<div class="layout">
  <header>
    <div class="brand">
      <h1>District<span class="accent">Drift</span></h1>
      <p class="tagline">Three decades of congressional redistricting <span class="version">v{__APP_VERSION__}</span></p>
    </div>

    <div class="state-selector-wrap">
      <button
        class="state-selector"
        class:open={stateMenuOpen}
        onclick={() => stateMenuOpen = !stateMenuOpen}
        aria-haspopup="listbox"
        aria-expanded={stateMenuOpen}
      >
        <span class="state-icon">{STATES[selectedState].flag}</span>
        <span class="state-name">{STATES[selectedState].name}</span>
        <span class="state-chevron">▾</span>
      </button>
      {#if stateMenuOpen}
        <ul class="state-menu" role="listbox">
          {#each Object.entries(STATES) as [po, info]}
            <li
              role="option"
              aria-selected={po === selectedState}
              class:active={po === selectedState}
              onclick={() => selectState(po)}
            >{info.name}</li>
          {/each}
        </ul>
      {/if}
    </div>

  </header>

  <main>
    <div class="map-wrap" style:margin-bottom="{mapPanelBottom}px">
      {#key selectedState}
        <Map selectedYear={displayYear} fadeDuration={FADE_MS} panelBottom={mapPanelBottom} statePo={selectedState} cycleYears={CYCLES} />
      {/key}
    </div>

    {#if panelPosition === 'side'}
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

    {#if panelPosition === 'bottom'}
      <div class="panel bottom" bind:this={bottomPanelEl} bind:clientHeight={bottomPanelH}>

        <!-- Year controls row -->
        <div class="bottom-header">
          {@render cycleControls()}
          {#if hoveredYear}
            <span class="preview-badge">preview {hoveredYear}</span>
          {:else}
            <span class="bottom-year">{selectedYear}</span>
          {/if}
          <button
            class="panel-toggle-btn"
            title="Switch to side panel"
            onclick={() => panelPosition = 'side'}
          >➡</button>
        </div>

        <div class="bottom-hr"></div>

        <!-- Two-pane content row -->
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

          </div>
        {/if}

      </div>
    {/if}
  </main>

  <footer>
    <p>
      Sources:
      <a href="https://www.nhgis.org/" target="_blank" rel="noopener">NHGIS</a> (boundaries) ·
      <a href="https://electionlab.mit.edu/" target="_blank" rel="noopener">MIT Election Lab</a> (returns) ·
      <a href="https://redistrictingdatahub.org/" target="_blank" rel="noopener">Redistricting Data Hub</a>
    </p>
  </footer>
</div>

<style>
  :global(body) { margin: 0; font-family: system-ui, sans-serif; background: #f5f5f3; color: #222; }

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
  .state-icon { font-size: 0.7rem; opacity: 0.6; }
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
  .state-menu li {
    padding: 0.45rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.1s, color 0.1s;
  }
  .state-menu li:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .state-menu li.active { color: #fff; font-weight: 700; }

  .sticky-controls-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.35rem;
  }
  .sticky-controls-header h2 { margin: 0; }

  .panel-toggle-btn {
    background: transparent;
    border: 1px solid #ddd;
    color: #999;
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    line-height: 1;
    transition: background 0.15s, color 0.15s;
  }
  .panel-toggle-btn:hover { background: #f0f0f0; color: #555; }
  .panel.bottom .panel-toggle-btn {
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.5);
  }
  .panel.bottom .panel-toggle-btn:hover {
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.9);
  }

  main { flex: 1; display: flex; min-height: 0; position: relative; }
  .map-wrap { flex: 1; min-width: 0; transition: margin-bottom 0.4s ease; }

  /* Side panel */
  aside.panel.side {
    width: 360px;
    flex-shrink: 0;
    background: #fff;
    border-left: 1px solid #e0e0e0;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .sticky-controls {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1;
    padding-bottom: 0.5rem;
    margin-bottom: -0.5rem;
    box-shadow: 0 4px 8px -4px rgba(0,0,0,0.08);
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
    color: #888;
  }

  .cycle-buttons { display: flex; gap: 0.35rem; align-items: center; }

  button {
    padding: 0.4rem 0.6rem;
    border: 1px solid #ddd;
    background: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 500;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    white-space: nowrap;
    color: #333;
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
  button:hover { background: #e8e8e8; }
  button.previewing { background: #f5f5f5; border-color: var(--yc); color: #333; }
  button.previewing .year-dot { opacity: 1; }
  button.active { background: #1a1a2e; color: #fff; border-color: var(--yc); }
  button.active .year-dot { opacity: 1; }

  .anim-btn { color: #666; border-color: #ccc; background: transparent; }
  .anim-btn.playing { background: #fff8e1; border-color: #f0a500; color: #a06000; }

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

  dt { color: #666; white-space: nowrap; font-size: 0.76rem; }
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

  .note { margin: 0.5rem 0 0; font-size: 0.72rem; color: #999; line-height: 1.4; min-height: 2.8em; }

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
    color: #888;
    margin-bottom: 0.4rem;
    user-select: none;
  }
  .events-section summary::-webkit-details-marker { display: none; }
  .events-section summary::before {
    content: '▶';
    font-size: 0.55rem;
    transition: transform 0.15s;
    color: #aaa;
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
    border-left: 2px solid #e0e0e0;
  }
  .events li strong { font-size: 0.78rem; color: #333; font-weight: 600; }
  .events li strong a { color: #1a5c9e; text-decoration: none; }
  .events li strong a:hover { text-decoration: underline; }
  .events li span { font-size: 0.72rem; color: #777; line-height: 1.4; }

  .data-credits {
    margin-top: 1rem;
    padding: 0.75rem;
    background: #f7f7f7;
    border-radius: 6px;
    border-top: 2px solid #eee;
  }
  .credits-heading {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #aaa;
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
  .data-credits li { font-size: 0.7rem; color: #888; line-height: 1.4; }
  .data-credits a { color: #666; text-decoration: none; border-bottom: 1px dotted #bbb; }
  .data-credits a:hover { color: #333; border-bottom-color: #666; }

  .resources-section { margin-top: 0.5rem; }
  .resource-heading {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #aaa;
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
    border-left: 2px solid #e0e0e0;
  }
  .resource-list a {
    font-size: 0.78rem;
    font-weight: 600;
    color: #1a5c9e;
    text-decoration: none;
  }
  .resource-list a:hover { text-decoration: underline; }
  .resource-list span { font-size: 0.72rem; color: #777; line-height: 1.4; }

  .legend-items { display: flex; align-items: center; font-size: 0.82rem; }
  .swatch { display: inline-block; width: 13px; height: 13px; border-radius: 2px; margin-right: 4px; }
  .swatch.d { background: #4a90d9; }
  .swatch.r { background: #e05c5c; }

  .chart-section { display: flex; flex-direction: column; gap: 0.2rem; }
  .chart-note { margin: 0; font-size: 0.7rem; color: #bbb; }

  footer {
    padding: 0.45rem 1.25rem;
    background: #1a1a2e;
    color: rgba(255,255,255,0.45);
    font-size: 0.72rem;
  }
  footer a { color: rgba(255,255,255,0.65); }
</style>
