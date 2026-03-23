<script lang="ts">
  import { onMount } from 'svelte';
  import { geoAlbersUsa, geoPath } from 'd3-geo';
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
  }: {
    selectedYear: number;
    onStateClick: (po: string) => void;
  } = $props();

  // Fetch nation stats and US TopoJSON in parallel on mount
  let nationData = $state<StateData[]>([]);
  let topology = $state<Topology | null>(null);
  let loading = $state(true);

  onMount(async () => {
    const [statsRes, topoRes] = await Promise.all([
      fetch('/nation_stats.json'),
      // us-atlas 10m TopoJSON served from node_modules via Vite
      import('us-atlas/states-10m.json'),
    ]);
    const stats = await statsRes.json();
    nationData = stats.states;
    topology = topoRes.default as unknown as Topology;
    loading = false;
  });

  // ── Map geometry ─────────────────────────────────────────────────────────────

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
    geoAlbersUsa().fitSize([svgW, svgH], {
      type: 'Sphere',
    } as GeoJSON.GeoJsonObject)
  );
  const pathGen = $derived(geoPath(projection));

  type StatePath = { po: string; d: string | null };
  const statePaths: StatePath[] = $derived(
    topology
      ? (topojson.feature(topology, (topology as any).objects.states) as GeoJSON.FeatureCollection)
          .features.map(f => ({
            po: fipsToPostal(f.id as string | number),
            d: pathGen(f),
          }))
      : []
  );

  // FIPS (numeric state id from us-atlas) → postal code
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

  // ── EG color scale ───────────────────────────────────────────────────────────
  // positive EG = R-favoring (red), negative EG = D-favoring (blue)

  function egColor(eg: number | null | undefined, active = true): string {
    if (eg === null || eg === undefined) return active ? '#c8c8c8' : '#e8e8e8';
    const abs = Math.abs(eg);
    const t = Math.min(1, abs / 0.25); // saturates at ±25%
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
    // light pink → deep red
    const r = Math.round(220 + (180 - 220) * t);
    const g = Math.round(150 + (30  - 150) * t);
    const b = Math.round(150 + (30  - 150) * t);
    return `rgb(${r},${g},${b})`;
  }

  function interpolateBlue(t: number): string {
    // light blue → deep blue
    const r = Math.round(150 + (25  - 150) * t);
    const g = Math.round(190 + (80  - 190) * t);
    const b = Math.round(220 + (180 - 220) * t);
    return `rgb(${r},${g},${b})`;
  }

  // ── State data lookup ─────────────────────────────────────────────────────────

  const byPo = $derived(
    Object.fromEntries(nationData.map(s => [s.state_po, s]))
  );

  function getEg(po: string): number | null {
    const cycle = byPo[po]?.cycles.find(c => c.year === selectedYear);
    return cycle?.efficiency_gap ?? null;
  }

  function getStateName(po: string): string {
    return byPo[po]?.state_name ?? po;
  }

  function getCycle(po: string): CycleStat | null {
    return byPo[po]?.cycles.find(c => c.year === selectedYear) ?? null;
  }

  // ── Tooltip ──────────────────────────────────────────────────────────────────

  let hovered = $state<{ po: string; x: number; y: number } | null>(null);

  function handleMouseMove(e: MouseEvent, po: string) {
    hovered = { po, x: e.offsetX, y: e.offsetY };
  }

  // ── Rank list ────────────────────────────────────────────────────────────────

  const ranked: { po: string; name: string; eg: number }[] = $derived(
    nationData
      .map(s => ({ po: s.state_po, name: s.state_name, eg: getEg(s.state_po) }))
      .filter(s => s.eg !== null)
      .sort((a, b) => b.eg! - a.eg!) as { po: string; name: string; eg: number }[]
  );

  function egLabel(eg: number | null): string {
    if (eg === null) return '—';
    const pct = (Math.abs(eg) * 100).toFixed(1);
    if (Math.abs(eg) < 0.02) return '≈ neutral';
    return eg > 0 ? `+${pct}% R` : `-${pct}% D`;
  }

  function voteShareLabel(c: CycleStat): string {
    const total = c.votes_d + c.votes_r;
    if (!total) return '—';
    return ((c.votes_d / total) * 100).toFixed(1) + '% D';
  }
</script>

<div class="nation-wrap" bind:this={container}>
  {#if loading}
    <div class="loading">Loading map…</div>
  {:else}
    <svg width={svgW} height={svgH} class="nation-svg">
      {#each statePaths as { po, d }}
        {#if d && po}
          {@const eg = getEg(po)}
          <path
            {d}
            fill={egColor(eg)}
            stroke="var(--nation-stroke)"
            stroke-width="0.6"
            class="state-path"
            class:has-data={byPo[po] !== undefined}
            onmousemove={(e) => handleMouseMove(e, po)}
            onmouseleave={() => hovered = null}
            onclick={() => po && onStateClick(po)}
            role="button"
            tabindex="0"
            aria-label="{getStateName(po)}"
            onkeydown={(e) => e.key === 'Enter' && onStateClick(po)}
          />
        {/if}
      {/each}
    </svg>

    <!-- Tooltip -->
    {#if hovered}
      {@const c = getCycle(hovered.po)}
      <div
        class="map-tooltip"
        style="left:{hovered.x + 14}px; top:{hovered.y}px"
      >
        <strong>{getStateName(hovered.po)}</strong>
        {#if c}
          <span>EG: {egLabel(c.efficiency_gap)}</span>
          <span>{c.seats_d}D / {c.seats_r}R of {c.seats}</span>
          <span>D votes: {voteShareLabel(c)}</span>
        {:else}
          <span>No data</span>
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

    <!-- Side panel: ranked list -->
    <div class="rank-panel">
      <p class="rank-heading">Most gerrymandered — {selectedYear}</p>
      <div class="rank-list">
        {#each ranked.slice(0, 5) as s}
          <button class="rank-row r-row" onclick={() => onStateClick(s.po)}>
            <span class="rank-state">{s.po}</span>
            <span class="rank-eg" style="color: {egColor(s.eg)}">{egLabel(s.eg)}</span>
          </button>
        {/each}
        <div class="rank-divider"></div>
        {#each [...ranked].reverse().slice(0, 5) as s}
          <button class="rank-row d-row" onclick={() => onStateClick(s.po)}>
            <span class="rank-state">{s.po}</span>
            <span class="rank-eg" style="color: {egColor(s.eg)}">{egLabel(s.eg)}</span>
          </button>
        {/each}
      </div>
      <p class="rank-note">Click any state to explore</p>
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
  }
  .state-path.has-data {
    cursor: pointer;
  }
  .state-path.has-data:hover { opacity: 0.8; }

  .map-tooltip {
    position: absolute;
    transform: translateY(calc(-100% - 8px));
    background: rgba(12, 12, 22, 0.92);
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 0.78rem;
    padding: 0.45rem 0.8rem;
    border-radius: 7px;
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
  .map-tooltip strong { font-size: 0.85rem; margin-bottom: 0.1rem; }
  .map-tooltip span { opacity: 0.8; }

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
    font-size: 0.65rem;
    color: var(--text-muted);
  }

  .rank-panel {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.75rem;
    width: 180px;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    box-shadow: 0 2px 12px var(--shadow-sm);
  }

  .rank-heading {
    margin: 0;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-label);
  }

  .rank-list {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .rank-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    padding: 0.25rem 0.4rem;
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.12s;
    width: 100%;
  }
  .rank-row:hover { background: var(--btn-hover); }

  .rank-state { font-size: 0.78rem; font-weight: 700; color: var(--text); }
  .rank-eg { font-size: 0.72rem; font-weight: 600; }

  .rank-divider {
    height: 1px;
    background: var(--border);
    margin: 0.2rem 0;
  }

  .rank-note {
    margin: 0;
    font-size: 0.63rem;
    color: var(--text-dim);
    text-align: center;
  }
</style>
