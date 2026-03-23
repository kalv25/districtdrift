<script lang="ts">
  import { scaleLinear } from 'd3';

  type CycleStat = {
    cycle_year: number;
    votes_d: number; votes_r: number;
    seats_d: number; seats_r: number;
    total_seats: number;
  };

  let { cycles, selectedYear }: { cycles: CycleStat[]; selectedYear: number } = $props();

  const W = 248;
  const H = 110;
  const margin = { top: 14, right: 8, bottom: 20, left: 30 };
  const innerW = W - margin.left - margin.right;
  const innerH = H - margin.top - margin.bottom;

  const pts = $derived(cycles.map(c => ({
    year: c.cycle_year,
    vote: c.votes_d / (c.votes_d + c.votes_r),
    seat: c.seats_d / c.total_seats,
  })));

  const xScale = $derived(
    scaleLinear()
      .domain([cycles[0]?.cycle_year ?? 1992, cycles[cycles.length - 1]?.cycle_year ?? 2022])
      .range([0, innerW])
  );

  const yScale = $derived(
    scaleLinear().domain([0.25, 0.75]).range([innerH, 0]).clamp(true)
  );

  function line(key: 'vote' | 'seat'): string {
    return pts.map(p => `${xScale(p.year)},${yScale(p[key])}`).join(' ');
  }
</script>

<svg width="95%" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Vote and seat share trend over cycles">
  <g transform="translate({margin.left},{margin.top})">
    <!-- Reference lines -->
    {#each [0.4, 0.5, 0.6] as tick}
      <line x1={0} x2={innerW} y1={yScale(tick)} y2={yScale(tick)}
        stroke={tick === 0.5 ? '#bbb' : '#eee'} stroke-width={tick === 0.5 ? 1.5 : 1}
        stroke-dasharray={tick === 0.5 ? '4,3' : undefined} />
      <text x={-4} y={yScale(tick)} dy="0.32em" text-anchor="end" font-size="8" fill="#bbb">
        {tick * 100 | 0}%
      </text>
    {/each}

    <!-- Vote share line (solid, lighter blue) -->
    {#if pts.length > 1}
      <polyline points={line('vote')}
        fill="none" stroke="#4a90d9" stroke-width="2"
        stroke-linejoin="round" stroke-linecap="round" />
      <!-- Seat share line (dashed, darker blue) -->
      <polyline points={line('seat')}
        fill="none" stroke="#2471a3" stroke-width="2" stroke-dasharray="5,3"
        stroke-linejoin="round" stroke-linecap="round" />
    {/if}

    <!-- Dots per cycle -->
    {#each pts as p}
      {@const x = xScale(p.year)}
      {@const sel = p.year === selectedYear}
      <circle cx={x} cy={yScale(p.vote)} r={sel ? 4 : 2.5} fill="#4a90d9" />
      <circle cx={x} cy={yScale(p.seat)} r={sel ? 4 : 2.5} fill="#2471a3" />
      <text x={x} y={innerH + 14} text-anchor="middle" font-size="9"
        fill={sel ? '#222' : '#aaa'} font-weight={sel ? '600' : '400'}>
        {p.year}
      </text>
    {/each}

    <!-- Legend -->
    <line x1={0} x2={14} y1={-6} y2={-6} stroke="#4a90d9" stroke-width="2" />
    <text x={17} y={-6} dy="0.32em" font-size="8" fill="#666">Votes D</text>
    <line x1={60} x2={74} y1={-6} y2={-6} stroke="#2471a3" stroke-width="2" stroke-dasharray="4,2" />
    <text x={77} y={-6} dy="0.32em" font-size="8" fill="#666">Seats D</text>
  </g>
</svg>
