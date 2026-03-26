<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { D_PRIMARY, R_PRIMARY, D_SECONDARY, R_SECONDARY } from './colors';
  import { cubicOut } from 'svelte/easing';
  import { CHARTS } from '$lib/strings';

  let {
    seatsD, seatsR, votesD, votesR, totalSeats
  }: {
    seatsD: number; seatsR: number;
    votesD: number; votesR: number;
    totalSeats: number;
  } = $props();

  const W = 220;
  const barH = 20;
  const labelH = 18;
  const gap = 8;
  const H = labelH + barH + gap + labelH + barH;

  const vShare = tweened(0, { duration: 400, easing: cubicOut });
  const sShare = tweened(0, { duration: 400, easing: cubicOut });

  let ready = false;
  $effect(() => {
    const v = votesD / (votesD + votesR);
    const s = seatsD / totalSeats;
    vShare.set(v, ready ? undefined : { duration: 0 });
    sShare.set(s, ready ? undefined : { duration: 0 });
    ready = true;
  });

  function pct(v: number) { return (v * 100).toFixed(1) + '%'; }

  // Row y offsets
  const row1Label = labelH - 2;
  const row1Bar = labelH;
  const row2Label = labelH + barH + gap + labelH - 2;
  const row2Bar = labelH + barH + gap + labelH;
</script>

<svg width="95%" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Seat and vote share comparison">
  <title>Seat and vote share comparison</title>
  <!-- Vote share row -->
  <text x={0} y={row1Label} font-size="9" fill="#888" font-weight="600" style="text-transform: uppercase" letter-spacing="0.5">{CHARTS.SEAT_VOTE_VOTES}</text>
  <rect x={0} y={row1Bar} width={W * $vShare} height={barH} fill={D_PRIMARY} rx="2" />
  <rect x={W * $vShare} y={row1Bar} width={W * (1 - $vShare)} height={barH} fill={R_PRIMARY} rx="2" />
  <text x={W * $vShare / 2} y={row1Bar + barH / 2} dominant-baseline="middle"
    text-anchor="middle" font-size="9" fill="#fff" font-weight="600">
    {pct($vShare)}
  </text>
  <text x={W * $vShare + W * (1 - $vShare) / 2} y={row1Bar + barH / 2}
    dominant-baseline="middle" text-anchor="middle" font-size="9" fill="#fff" font-weight="600">
    {pct(1 - $vShare)}
  </text>

  <!-- Seat share row -->
  <text x={0} y={row2Label} font-size="9" fill="#888" font-weight="600" letter-spacing="0.5">{CHARTS.SEAT_VOTE_SEATS}</text>
  <rect x={0} y={row2Bar} width={W * $sShare} height={barH} fill={D_SECONDARY} rx="2" />
  <rect x={W * $sShare} y={row2Bar} width={W * (1 - $sShare)} height={barH} fill={R_SECONDARY} rx="2" />
  <text x={W * $sShare / 2} y={row2Bar + barH / 2} dominant-baseline="middle"
    text-anchor="middle" font-size="9" fill="#fff" font-weight="600">
    {seatsD}D ({pct($sShare)})
  </text>
  <text x={W * $sShare + W * (1 - $sShare) / 2} y={row2Bar + barH / 2}
    dominant-baseline="middle" text-anchor="middle" font-size="9" fill="#fff" font-weight="600">
    {seatsR}R ({pct(1 - $sShare)})
  </text>
</svg>
