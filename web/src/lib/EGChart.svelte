<script lang="ts">
  import { scaleLinear, scaleBand, max, min } from 'd3';

  type CycleStat = { cycle_year: number; efficiency_gap: number; redistricting_controller: string };

  let { cycles, selectedYear }: { cycles: CycleStat[]; selectedYear: number } = $props();

  const W = 248;
  const H = 130;
  const margin = { top: 12, right: 8, bottom: 24, left: 36 };
  const innerW = W - margin.left - margin.right;
  const innerH = H - margin.top - margin.bottom;

  const xScale = $derived(
    scaleBand()
      .domain(cycles.map((c) => String(c.cycle_year)))
      .range([0, innerW])
      .padding(0.25)
  );

  const extent = $derived(() => {
    const vals = cycles.map((c) => c.efficiency_gap);
    const absMax = Math.max(0.25, Math.abs(min(vals) ?? 0), Math.abs(max(vals) ?? 0));
    return absMax;
  });

  const yScale = $derived(
    scaleLinear()
      .domain([-extent(), extent()])
      .range([innerH, 0])
      .nice()
  );

  const yTicks = $derived(yScale.ticks(4).map((t) => ({ v: t, y: yScale(t) })));

  function barColor(eg: number, year: number): string {
    const active = year === selectedYear;
    if (eg > 0.02) return active ? '#c0392b' : '#e8a09a';
    if (eg < -0.02) return active ? '#2471a3' : '#8db8d8';
    return active ? '#888' : '#bbb';
  }
</script>

<svg width="95%" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Efficiency gap by cycle">
  <title>Efficiency gap by cycle</title>
  <g transform="translate({margin.left},{margin.top})">
    <!-- Y axis ticks -->
    {#each yTicks as tick}
      <line x1={0} x2={innerW} y1={tick.y} y2={tick.y} stroke="#e0e0e0" stroke-width="1" />
      <text x={-4} y={tick.y} dy="0.32em" text-anchor="end" font-size="9" fill="#999">
        {(tick.v * 100).toFixed(0)}%
      </text>
    {/each}

    <!-- Zero line -->
    <line
      x1={0} x2={innerW}
      y1={yScale(0)} y2={yScale(0)}
      stroke="#666" stroke-width="1.5"
    />

    <!-- Bars -->
    {#each cycles as c}
      {@const x = xScale(String(c.cycle_year)) ?? 0}
      {@const y0 = yScale(0)}
      {@const y1 = yScale(c.efficiency_gap)}
      {@const barH = Math.abs(y1 - y0)}
      <rect
        x={x}
        y={c.efficiency_gap >= 0 ? y1 : y0}
        width={xScale.bandwidth()}
        height={barH || 1}
        fill={barColor(c.efficiency_gap, c.cycle_year)}
        rx="2"
      />
      <!-- Cycle label -->
      <text
        x={x + xScale.bandwidth() / 2}
        y={innerH + 14}
        text-anchor="middle"
        font-size="10"
        fill={c.cycle_year === selectedYear ? '#222' : '#999'}
        font-weight={c.cycle_year === selectedYear ? '600' : '400'}
      >
        {c.cycle_year}
      </text>
    {/each}
  </g>
</svg>
