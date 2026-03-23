<script lang="ts">
  import { onMount } from 'svelte';
  import { geoAlbersUsa, geoPath, geoCentroid } from 'd3-geo';
  import * as topojson from 'topojson-client';
  import type { Topology } from 'topojson-specification';

  type CycleStat = {
    year: number;
    seats: number;
    seats_d: number;
    seats_r: number;
    votes_d: number;
    votes_r: number;
    efficiency_gap: number | null;
    mean_median_diff: number | null;
    seat_vote_ratio_d: number | null;
  };
  type StateData = { state_po: string; state_name: string; cycles: CycleStat[] };

  let {
    selectedYear,
    onStateClick,
    fullDataStates = [],
  }: {
    selectedYear: number;
    onStateClick: (po: string) => void;
    fullDataStates?: string[];
  } = $props();

  function hasFullData(po: string): boolean {
    return fullDataStates.includes(po);
  }

  let nationData = $state<StateData[]>([]);
  let topology = $state<Topology | null>(null);
  let loading = $state(true);

  onMount(async () => {
    const [statsRes, topoRes] = await Promise.all([
      fetch('/nation_stats.json'),
      import('us-atlas/states-10m.json'),
    ]);
    const stats = await statsRes.json();
    nationData = stats.states;
    topology = topoRes.default as unknown as Topology;
    loading = false;
  });

  // ── Map geometry ──────────────────────────────────────────────────────────────

  let container = $state<HTMLDivElement | null>(null);
  let svgW = $state(800);
  let svgH = $state(500);

  $effect(() => {
    if (!container) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      svgW = width;
      svgH = Math.max(300, height);
    });
    ro.observe(container);
    return () => ro.disconnect();
  });

  const projection = $derived(
    geoAlbersUsa()
      .scale(Math.min(svgW / 960, svgH / 600) * 1000)
      .translate([svgW / 2, svgH / 2])
  );
  const pathGen = $derived(geoPath(projection));

  type StatePath = { po: string; d: string | null; cx: number | null; cy: number | null; area: number };
  const statePaths: StatePath[] = $derived(
    topology
      ? (topojson.feature(topology, (topology as any).objects.states) as unknown as GeoJSON.FeatureCollection)
          .features.map(f => {
            const po = fipsToPostal(f.id as string | number);
            const d = pathGen(f);
            const c = projection(geoCentroid(f));
            const area = pathGen.area(f);
            return { po, d, cx: c ? c[0] : null, cy: c ? c[1] : null, area };
          })
      : []
  );

  // FIPS → postal
  const FIPS_TO_POSTAL: Record<string, string> = {
    '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT',
    '10':'DE','12':'FL','13':'GA','15':'HI','16':'ID','17':'IL','18':'IN',
    '19':'IA','20':'KS','21':'KY','22':'LA','23':'ME','24':'MD','25':'MA',
    '26':'MI','27':'MN','28':'MS','29':'MO','30':'MT','31':'NE','32':'NV',
    '33':'NH','34':'NJ','35':'NM','36':'NY','37':'NC','38':'ND','39':'OH',
    '40':'OK','41':'OR','42':'PA','44':'RI','45':'SC','46':'SD','47':'TN',
    '48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV','55':'WI',
    '56':'WY',
  };

  function fipsToPostal(id: string | number): string {
    const s = String(id).padStart(2, '0');
    return FIPS_TO_POSTAL[s] ?? '';
  }

  // ── EG color scale ────────────────────────────────────────────────────────────

  function egColor(eg: number | null | undefined, active = true): string {
    if (eg === null || eg === undefined) return active ? '#c8c8c8' : '#e0e0e0';
    const abs = Math.abs(eg);
    const t = Math.min(1, abs / 0.25);
    if (active) {
      if (eg > 0.02)  return interpolateRed(t);
      if (eg < -0.02) return interpolateBlue(t);
      return '#b0b8b0';
    } else {
      if (eg > 0.02)  return `rgba(220,90,90,${0.15 + t * 0.2})`;
      if (eg < -0.02) return `rgba(74,144,217,${0.15 + t * 0.2})`;
      return '#d8d8d8';
    }
  }

  function interpolateRed(t: number): string {
    const r = Math.round(220 + (180 - 220) * t);
    const g = Math.round(150 + (30  - 150) * t);
    const b = Math.round(150 + (30  - 150) * t);
    return `rgb(${r},${g},${b})`;
  }

  function interpolateBlue(t: number): string {
    const r = Math.round(150 + (25  - 150) * t);
    const g = Math.round(190 + (80  - 190) * t);
    const b = Math.round(220 + (180 - 220) * t);
    return `rgb(${r},${g},${b})`;
  }

  // ── State data lookup ─────────────────────────────────────────────────────────

  const byPo = $derived(Object.fromEntries(nationData.map(s => [s.state_po, s])));

  function getEg(po: string): number | null {
    return byPo[po]?.cycles.find(c => c.year === selectedYear)?.efficiency_gap ?? null;
  }

  function getStateName(po: string): string {
    return byPo[po]?.state_name ?? po;
  }

  function getCycle(po: string): CycleStat | null {
    return byPo[po]?.cycles.find(c => c.year === selectedYear) ?? null;
  }

  // ── National totals ───────────────────────────────────────────────────────────

  const nationalTotals = $derived((() => {
    let d = 0, r = 0, total = 0;
    for (const s of nationData) {
      const c = s.cycles.find(cy => cy.year === selectedYear);
      if (c) { d += c.seats_d; r += c.seats_r; total += c.seats; }
    }
    return { d, r, total };
  })());

  // ── Tooltip ───────────────────────────────────────────────────────────────────

  let hovered = $state<{ po: string; x: number; y: number } | null>(null);

  function handleMouseMove(e: MouseEvent, po: string) {
    hovered = { po, x: e.offsetX, y: e.offsetY };
  }

  // ── Rank list ─────────────────────────────────────────────────────────────────

  const ranked = $derived(
    nationData
      .map(s => ({ po: s.state_po, name: s.state_name, eg: getEg(s.state_po) }))
      .filter(s => s.eg !== null)
      .sort((a, b) => (b.eg ?? 0) - (a.eg ?? 0)) as { po: string; name: string; eg: number }[]
  );

  function egLabel(eg: number | null): string {
    if (eg === null) return '—';
    const pct = (Math.abs(eg) * 100).toFixed(1);
    if (Math.abs(eg) < 0.02) return '≈ neutral';
    return eg > 0 ? `+${pct}% R` : `−${pct}% D`;
  }

  function voteShareLabel(c: CycleStat): string {
    const total = c.votes_d + c.votes_r;
    if (!total) return '—';
    return ((c.votes_d / total) * 100).toFixed(1) + '% D';
  }

  function seatGapLabel(c: CycleStat): string {
    const total = c.votes_d + c.votes_r;
    if (!total || !c.seats) return '—';
    const voteShareD = c.votes_d / total;
    const seatShareD = c.seats_d / c.seats;
    const gap = (seatShareD - voteShareD) * 100;
    return (gap >= 0 ? '+' : '') + gap.toFixed(1) + '% seat gap';
  }
</script>

<div class="nation-wrap" bind:this={container}>
  {#if loading}
    <div class="loading">Loading map…</div>
  {:else}
    <svg width={svgW} height={svgH} class="nation-svg">
      <!-- State fills -->
      {#each statePaths as { po, d, cx, cy, area }}
        {#if d && po}
          {@const eg = getEg(po)}
          {@const full = hasFullData(po)}
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <path
            {d}
            fill={egColor(eg)}
            stroke="var(--nation-stroke)"
            stroke-width="0.6"
            class="state-path"
            class:has-full-data={full}
            onmousemove={(e) => handleMouseMove(e, po)}
            onmouseleave={() => hovered = null}
            onclick={() => full && onStateClick(po)}
            role={full ? 'button' : 'img'}
            tabindex={full ? 0 : undefined}
            aria-label="{getStateName(po)}{full ? ' — click to explore' : ''}"
            onkeydown={(e) => full && e.key === 'Enter' && onStateClick(po)}
          />
        {/if}
      {/each}

      <!-- State abbreviation labels (only for states large enough) -->
      {#each statePaths as { po, cx, cy, area }}
        {#if po && cx !== null && cy !== null && area > 400}
          <text
            x={cx}
            y={cy}
            text-anchor="middle"
            dominant-baseline="middle"
            font-size={area > 2000 ? '9' : '7.5'}
            font-weight="600"
            fill="rgba(0,0,0,0.55)"
            pointer-events="none"
            class="state-label"
          >{po}</text>
        {/if}
      {/each}
    </svg>

    <!-- Tooltip -->
    {#if hovered}
      {@const c = getCycle(hovered.po)}
      {@const full = hasFullData(hovered.po)}
      {@const tooltipRight = hovered.x > svgW * 0.65}
      <div
        class="map-tooltip"
        class:flip-left={tooltipRight}
        style="left:{hovered.x + (tooltipRight ? -14 : 14)}px; top:{hovered.y}px"
      >
        <strong>{getStateName(hovered.po)}</strong>
        {#if c}
          <span class="tt-row">
            <span class="tt-label">Efficiency gap</span>
            <span class="tt-val">{egLabel(c.efficiency_gap)}</span>
          </span>
          <span class="tt-row">
            <span class="tt-label">Seats</span>
            <span class="tt-val">{c.seats_d}D / {c.seats_r}R of {c.seats}</span>
          </span>
          <span class="tt-row">
            <span class="tt-label">D vote share</span>
            <span class="tt-val">{voteShareLabel(c)}</span>
          </span>
          {#if c.mean_median_diff !== null}
            <span class="tt-row">
              <span class="tt-label">Mean–median</span>
              <span class="tt-val">{c.mean_median_diff > 0 ? '+' : ''}{(c.mean_median_diff * 100).toFixed(1)}%</span>
            </span>
          {/if}
          <span class="tt-row">
            <span class="tt-label">Seat gap</span>
            <span class="tt-val">{seatGapLabel(c)}</span>
          </span>
        {:else}
          <span>No election data</span>
        {/if}
        {#if full}
          <span class="tooltip-cta">Click to explore districts →</span>
        {:else}
          <span class="tooltip-soon">District maps coming soon</span>
        {/if}
      </div>
    {/if}

    <!-- Color legend -->
    <div class="eg-legend">
      <div class="legend-gradient"></div>
      <div class="legend-labels">
        <span>D gerrymander</span>
        <span>Neutral</span>
        <span>R gerrymander</span>
      </div>
    </div>

    <!-- Rank panel -->
    <div class="rank-panel">
      <p class="rank-heading">National — {selectedYear}</p>
      <div class="national-totals">
        <span class="nt-d">{nationalTotals.d}D</span>
        <span class="nt-sep">/</span>
        <span class="nt-r">{nationalTotals.r}R</span>
        <span class="nt-of">of {nationalTotals.total}</span>
      </div>

      <div class="rank-section-label r-label">Most R-favoring</div>
      <div class="rank-list">
        {#each ranked.slice(0, 7) as s}
          {@const full = hasFullData(s.po)}
          <button class="rank-row" class:rank-clickable={full} onclick={() => full && onStateClick(s.po)} disabled={!full}>
            <span class="rank-state">{s.po}</span>
            <span class="rank-name">{s.name}</span>
            <span class="rank-eg rank-eg-r">{egLabel(s.eg)}</span>
          </button>
        {/each}
      </div>

      <div class="rank-divider"></div>

      <div class="rank-section-label d-label">Most D-favoring</div>
      <div class="rank-list">
        {#each [...ranked].reverse().slice(0, 7) as s}
          {@const full = hasFullData(s.po)}
          <button class="rank-row" class:rank-clickable={full} onclick={() => full && onStateClick(s.po)} disabled={!full}>
            <span class="rank-state">{s.po}</span>
            <span class="rank-name">{s.name}</span>
            <span class="rank-eg rank-eg-d">{egLabel(s.eg)}</span>
          </button>
        {/each}
      </div>

    </div>
  {/if}
</div>

<style>
  .nation-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .nation-svg { display: block; }

  :global(:root) { --nation-stroke: rgba(255,255,255,0.6); }
  :global([data-theme=dark]) { --nation-stroke: rgba(0,0,0,0.4); }

  .state-path {
    cursor: default;
    transition: opacity 0.15s;
    stroke-width: 0.6;
  }
  .state-path.has-full-data {
    cursor: pointer;
    stroke-width: 1;
  }
  .state-path.has-full-data:hover { opacity: 0.75; }

  .state-label {
    font-family: inherit;
    letter-spacing: 0.02em;
    user-select: none;
  }

  /* Tooltip */
  .map-tooltip {
    position: absolute;
    transform: translateY(calc(-100% - 8px));
    background: rgba(12, 12, 22, 0.93);
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .map-tooltip.flip-left { transform: translateX(-100%) translateY(calc(-100% - 8px)); }
  .map-tooltip strong { font-size: 0.82rem; margin-bottom: 0.2rem; }
  .tt-row { display: flex; gap: 0.5rem; justify-content: space-between; }
  .tt-label { opacity: 0.6; }
  .tt-val { font-weight: 600; }
  .tooltip-cta { color: #80c8ff; font-weight: 600; margin-top: 0.25rem; }
  .tooltip-soon { opacity: 0.45; font-style: italic; margin-top: 0.2rem; }

  /* Legend */
  .eg-legend {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    pointer-events: none;
  }
  .legend-gradient {
    width: 200px;
    height: 10px;
    border-radius: 5px;
    background: linear-gradient(to right, #1960b4, #96c4e8, #b0b8b0, #dc9696, #b41e1e);
  }
  .legend-labels {
    display: flex;
    justify-content: space-between;
    width: 200px;
    font-size: 0.63rem;
    color: var(--text-muted);
  }

  /* Rank panel */
  .rank-panel {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.65rem 0.7rem;
    width: 210px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    box-shadow: 0 2px 12px var(--shadow-sm);
  }

  .rank-heading {
    margin: 0;
    font-size: 0.63rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-label);
  }

  .national-totals {
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.1rem;
  }
  .nt-d { color: #4a90d9; }
  .nt-r { color: #e05c5c; }
  .nt-sep, .nt-of { color: var(--text-muted); font-weight: 400; font-size: 0.72rem; }

  .rank-section-label {
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    margin-top: 0.1rem;
  }
  .r-label { color: #b91c1c; background: rgba(220,90,90,0.1); }
  .d-label { color: #1d4ed8; background: rgba(74,144,217,0.1); }

  .rank-list { display: flex; flex-direction: column; gap: 0.05rem; }

  .rank-row {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background: none;
    border: none;
    padding: 0.2rem 0.3rem;
    border-radius: 4px;
    font-family: inherit;
    width: 100%;
    cursor: default;
    opacity: 0.55;
  }
  .rank-row.rank-clickable { cursor: pointer; opacity: 1; }
  .rank-row.rank-clickable:hover { background: var(--btn-hover); }

  .rank-state { font-size: 0.72rem; font-weight: 700; color: var(--text); width: 1.8em; flex-shrink: 0; }
  .rank-name { font-size: 0.68rem; color: var(--text-muted); flex: 1; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rank-eg { font-size: 0.68rem; font-weight: 600; flex-shrink: 0; }
  .rank-eg-r { color: #b91c1c; }
  .rank-eg-d { color: #1d4ed8; }

  .rank-divider {
    height: 1px;
    background: var(--border);
    margin: 0.2rem 0;
  }

  .rank-play {
    margin-top: 0.3rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.3rem;
    font-family: inherit;
    font-size: 0.7rem;
    color: var(--text-muted);
    cursor: pointer;
    width: 100%;
    transition: background 0.12s, color 0.12s;
  }
  .rank-play:hover { background: var(--btn-hover); color: var(--text); }
  .rank-play.playing { color: #f0a500; border-color: #f0a500; }

  @media (max-width: 639px) {
    .rank-panel { display: none; }
    .eg-legend { bottom: 3.5rem; }
  }
</style>
