<script lang="ts">
  type Competitiveness = {
    solid_d: number; lean_d: number; competitive: number;
    lean_r: number; solid_r: number;
  };
  type CycleStat = { cycle_year: number; competitiveness: Competitiveness };

  let { cycles, selectedYear }: { cycles: CycleStat[]; selectedYear: number } = $props();

  const BUCKETS: { key: keyof Competitiveness; label: string; fill: string; dimFill: string }[] = [
    { key: 'solid_d',    label: 'Solid D',    fill: '#2563eb', dimFill: '#93c5fd' },
    { key: 'lean_d',     label: 'Lean D',     fill: '#60a5fa', dimFill: '#bfdbfe' },
    { key: 'competitive',label: 'Comp.',      fill: '#9ca3af', dimFill: '#d1d5db' },
    { key: 'lean_r',     label: 'Lean R',     fill: '#f87171', dimFill: '#fecaca' },
    { key: 'solid_r',    label: 'Solid R',    fill: '#dc2626', dimFill: '#fca5a5' },
  ];

  const ROW_H = 20;
  const ROW_GAP = 6;
  const LABEL_W = 36;
  const BAR_W = 200;
  const W = LABEL_W + BAR_W + 4;
  const H = $derived(cycles.length * (ROW_H + ROW_GAP) - ROW_GAP);

  function total(c: CycleStat): number {
    const v = c.competitiveness;
    return v.solid_d + v.lean_d + v.competitive + v.lean_r + v.solid_r;
  }

  function segments(c: CycleStat) {
    const t = total(c) || 1;
    let x = 0;
    return BUCKETS.map(b => {
      const count = c.competitiveness[b.key];
      const w = (count / t) * BAR_W;
      const seg = { ...b, count, x, w };
      x += w;
      return seg;
    });
  }
</script>

<svg width="95%" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="District competitiveness by cycle">
  <title>District competitiveness by cycle</title>
  {#each cycles as c, i}
    {@const y = i * (ROW_H + ROW_GAP)}
    {@const active = c.cycle_year === selectedYear}
    <text
      x={LABEL_W - 4}
      y={y + ROW_H / 2}
      dy="0.35em"
      text-anchor="end"
      font-size="10"
      fill={active ? 'var(--text)' : 'var(--text-dim)'}
      font-weight={active ? '700' : '400'}
    >{c.cycle_year}</text>

    {#each segments(c) as seg}
      {#if seg.w > 0}
        <rect
          x={LABEL_W + seg.x}
          y={y}
          width={seg.w}
          height={ROW_H}
          fill={active ? seg.fill : seg.dimFill}
          rx="0"
        />
        {#if seg.w >= 18}
          <text
            x={LABEL_W + seg.x + seg.w / 2}
            y={y + ROW_H / 2}
            dy="0.35em"
            text-anchor="middle"
            font-size="9"
            font-weight="600"
            fill={active ? '#fff' : 'rgba(0,0,0,0.35)'}
            pointer-events="none"
          >{seg.count}</text>
        {/if}
      {/if}
    {/each}

    {#if active}
      <rect
        x={LABEL_W} y={y}
        width={BAR_W} height={ROW_H}
        fill="none"
        stroke="var(--text)"
        stroke-width="1.5"
        rx="0"
      />
    {/if}
  {/each}
</svg>

<div class="comp-legend">
  {#each BUCKETS as b}
    <span class="comp-legend-item">
      <span class="comp-swatch" style="background:{b.fill}"></span>
      {b.label}
    </span>
  {/each}
</div>

<style>
  .comp-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.6rem;
    margin-top: 0.3rem;
  }
  .comp-legend-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.65rem;
    color: var(--text-muted);
    white-space: nowrap;
  }
  .comp-swatch {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }
</style>
