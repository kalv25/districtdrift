<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let {
    seatsD, seatsR, votesD, votesR, totalSeats
  }: {
    seatsD: number; seatsR: number;
    votesD: number; votesR: number;
    totalSeats: number;
  } = $props();

  const W = 248;
  const barH = 22;
  const gap = 10;
  const labelW = 56;
  const H = (barH + gap) * 2 + gap;
  const bw = W - labelW;

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
</script>

<svg width={W} height={H} role="img" aria-label="Seat and vote share comparison">
  <!-- Vote share row -->
  <text x={0} y={gap + barH / 2} dominant-baseline="middle" font-size="10" fill="#666">Votes</text>
  <rect x={labelW} y={gap} width={bw * $vShare} height={barH} fill="#4a90d9" rx="2" />
  <rect x={labelW + bw * $vShare} y={gap} width={bw * (1 - $vShare)} height={barH} fill="#e05c5c" rx="2" />
  <text x={labelW + bw * $vShare / 2} y={gap + barH / 2} dominant-baseline="middle"
    text-anchor="middle" font-size="9" fill="#fff" font-weight="600">
    {pct($vShare)}
  </text>
  <text x={labelW + bw * $vShare + bw * (1 - $vShare) / 2} y={gap + barH / 2}
    dominant-baseline="middle" text-anchor="middle" font-size="9" fill="#fff" font-weight="600">
    {pct(1 - $vShare)}
  </text>

  <!-- Seat share row -->
  <text x={0} y={gap * 2 + barH + barH / 2} dominant-baseline="middle" font-size="10" fill="#666">Seats</text>
  <rect x={labelW} y={gap * 2 + barH} width={bw * $sShare} height={barH} fill="#2471a3" rx="2" />
  <rect x={labelW + bw * $sShare} y={gap * 2 + barH} width={bw * (1 - $sShare)} height={barH} fill="#c0392b" rx="2" />
  <text x={labelW + bw * $sShare / 2} y={gap * 2 + barH + barH / 2} dominant-baseline="middle"
    text-anchor="middle" font-size="9" fill="#fff" font-weight="600">
    {seatsD}D ({pct($sShare)})
  </text>
  <text x={labelW + bw * $sShare + bw * (1 - $sShare) / 2} y={gap * 2 + barH + barH / 2}
    dominant-baseline="middle" text-anchor="middle" font-size="9" fill="#fff" font-weight="600">
    {seatsR}R ({pct(1 - $sShare)})
  </text>
</svg>
