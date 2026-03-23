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
    { key: 'competitive',label: 'Competitive', fill: '#9ca3af', dimFill: '#d1d5db' },
    { key: 'lean_r',     label: 'Lean R',     fill: '#f87171', dimFill: '#fecaca' },
    { key: 'solid_r',    label: 'Solid R',    fill: '#dc2626', dimFill: '#fca5a5' },
  ];

  const ROW_H = 20;
  const ROW_GAP = 6;
  const LABEL_W = 36;
  const BAR_W = 200;
  const SEG_W = BAR_W / BUCKETS.length;
  const W = LABEL_W + BAR_W + 4;
  const H = $derived(cycles.length * (ROW_H + ROW_GAP) - ROW_GAP + 22); // +22 for legend
  const legendY = $derived(cycles.length * (ROW_H + ROW_GAP) + 4);

  // Total seats per cycle (sum of all buckets)
  function total(c: CycleStat): number {
    const v = c.competitiveness;
    return v.solid_d + v.lean_d + v.competitive + v.lean_r + v.solid_r;
  }

  // Build stacked segments for one cycle row
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

<svg width={W} height={H} role="img" aria-label="District competitiveness by cycle">
  {#each cycles as c, i}
    {@const y = i * (ROW_H + ROW_GAP)}
    {@const active = c.cycle_year === selectedYear}
    <!-- Year label -->
    <text
      x={LABEL_W - 4}
      y={y + ROW_H / 2}
      dy="0.35em"
      text-anchor="end"
      font-size="10"
      fill={active ? 'var(--text)' : 'var(--text-dim)'}
      font-weight={active ? '700' : '400'}
    >{c.cycle_year}</text>

    <!-- Stacked bar segments -->
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
        <!-- Seat count label inside segment if wide enough -->
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

    <!-- Active year ring -->
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

  <!-- Legend -->
  {#each BUCKETS as b, i}
    <rect x={LABEL_W + i * SEG_W} y={legendY} width={10} height={10} fill={b.fill} rx="2" />
    <text
      x={LABEL_W + i * SEG_W + 13}
      y={legendY + 5}
      dy="0.35em"
      font-size="8.5"
      fill="var(--text-muted)"
    >{b.label}</text>
  {/each}
</svg>
