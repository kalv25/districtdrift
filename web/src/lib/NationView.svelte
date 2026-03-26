<script lang="ts">
  import { onMount } from 'svelte';
  import { geoAlbersUsa, geoPath, geoCentroid } from 'd3-geo';
  import * as topojson from 'topojson-client';
  import type { Topology } from 'topojson-specification';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';
  import Pill from './Pill.svelte';
  import { egColor, egBarColor } from './colors';

  // Total duration for the wipe to sweep across the full map width
  // Each state blends over ±BLEND px of wipe travel (wider = softer per-state fade)
  const BLEND = 120;

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
    wipeDuration = 4500,
    showEgLabels = false,
    showDeltas = $bindable(true),
  }: {
    selectedYear: number;
    onStateClick: (po: string) => void;
    fullDataStates?: string[];
    wipeDuration?: number;
    showEgLabels?: boolean;
    showDeltas?: boolean;
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

  // ── EG overlay ────────────────────────────────────────────────────────────────
  const EG_RANGE = 0.25; // ±25% = max font size + max arrow size

  function parseRgb(s: string): [number, number, number] {
    const m = s.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (m) return [+m[1], +m[2], +m[3]];
    const h = s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (h) return [parseInt(h[1],16), parseInt(h[2],16), parseInt(h[3],16)];
    return [200, 200, 200];
  }

  function lerpColor(a: string, b: string, t: number): string {
    if (t <= 0) return a;
    if (t >= 1) return b;
    const [r1,g1,b1] = parseRgb(a);
    const [r2,g2,b2] = parseRgb(b);
    return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
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

  const CYCLE_YEARS = [1992, 2002, 2012, 2022, 2024];

  // ── National totals ───────────────────────────────────────────────────────────

  const nationalTotals = $derived((() => {
    let d = 0, r = 0, total = 0;
    for (const s of nationData) {
      const c = s.cycles.find(cy => cy.year === selectedYear);
      if (c) { d += c.seats_d; r += c.seats_r; total += c.seats; }
    }
    return { d, r, total };
  })());

  // ── Static delta display (at-rest, no animation) ─────────────────────────

  const staticPrevYear = $derived((() => {
    const idx = CYCLE_YEARS.indexOf(selectedYear);
    return idx > 0 ? CYCLE_YEARS[idx - 1] : null;
  })());

  const staticPrevData = $derived((() => {
    const result: Record<string, { d: number; r: number; eg: number | null } | null> = {};
    if (!showDeltas || staticPrevYear === null) return result;
    for (const s of nationData) {
      const c = s.cycles.find(cy => cy.year === staticPrevYear);
      result[s.state_po] = c ? { d: c.seats_d, r: c.seats_r, eg: c.efficiency_gap ?? null } : null;
    }
    return result;
  })());

  // ── Wipe animation ────────────────────────────────────────────────────────

  // Starts "complete" so initial load shows current year instantly (no wipe).
  const wipeX = tweened(99999, { duration: 0 });
  let _prevYear = selectedYear; // plain var — not $state, avoids tracking loop
  let prevEgMap    = $state<Record<string, number | null>>({});
  let prevSeatsMap = $state<Record<string, { d: number; r: number } | null>>({});
  let wipeFromYear = $state<number | null>(null);

  $effect(() => {
    if (selectedYear !== _prevYear && nationData.length > 0) {
      const snap: Record<string, number | null> = {};
      const snapSeats: Record<string, { d: number; r: number } | null> = {};
      for (const s of nationData) {
        const c = s.cycles.find(c => c.year === _prevYear);
        snap[s.state_po]      = c?.efficiency_gap ?? null;
        snapSeats[s.state_po] = c ? { d: c.seats_d, r: c.seats_r } : null;
      }
      prevEgMap    = snap;
      prevSeatsMap = snapSeats;
      const goingBackward = selectedYear < _prevYear;
      const fromYear = _prevYear;
      _prevYear = selectedYear;

      if (goingBackward) {
        // Wrap-around or manual back-jump: instant update, no wipe
        wipeFromYear = null;
        wipeX.set(99999, { duration: 0 });
      } else {
        wipeFromYear = fromYear; // badge shows "fromYear → selectedYear"
        // Start exactly at the leftmost state centroid, end at the rightmost
        const cxVals = statePaths.map(p => p.cx).filter((v): v is number => v !== null);
        const start = (cxVals.length ? Math.min(...cxVals) : 0) - BLEND;
        const end   = (cxVals.length ? Math.max(...cxVals) : svgW) + BLEND;
        wipeX.set(start, { duration: 0 });
        requestAnimationFrame(() => wipeX.set(end, { duration: wipeDuration, easing: linear }));
      }
    }
  });

  // ── Pill stagger offsets (greedy left-to-right collision avoidance) ──────────
  // Pre-computes per-state Y offsets using actual pill widths + edge-to-edge X comparison.
  const pillYOffsets = $derived((() => {
    const result: Record<string, number> = {};
    const pillsActive = showEgLabels && (wipeFromYear !== null || (showDeltas && staticPrevYear !== null));
    if (!pillsActive) return result;
    const EST_H = 22;
    const STEP  = EST_H * 1.3;
    const GAP   = 5; // min horizontal gap between pills

    // Estimate pill pixel width for a state given its area and cycle data
    function approxPillW(po: string, area: number): number {
      const arFS  = area > 2000 ? 22 : area > 800 ? 16 : 12;
      const lblFS = area > 2000 ? 9  : area > 800 ? 7  : 6;
      const egFS  = lblFS * 0.85;
      const pH    = 5;
      const currEg   = getEg(po);
      const prevEg   = wipeFromYear !== null ? (prevEgMap[po] ?? null) : (staticPrevData[po]?.eg ?? null);
      if (currEg === null || prevEg === null) return 0;
      const currCycle  = nationData.find(s => s.state_po === po)?.cycles.find(c => c.year === selectedYear);
      const prevSeatsE = wipeFromYear !== null
        ? (prevSeatsMap[po] ?? null)
        : (staticPrevData[po] ? { d: staticPrevData[po]!.d, r: staticPrevData[po]!.r } : null);
      let useSeat = false;
      let deltaStr = '';
      if (currCycle && prevSeatsE) {
        const seatNet = (currCycle.seats_r - prevSeatsE.r) - (currCycle.seats_d - prevSeatsE.d);
        if (seatNet !== 0) { useSeat = true; deltaStr = seatNet > 0 ? `+${seatNet}R` : `${seatNet}D`; }
      }
      if (!useSeat) {
        const egChange = currEg - prevEg;
        deltaStr = (egChange >= 0 ? '+' : '') + (egChange * 100).toFixed(1) + '%';
      }
      const egChange   = currEg - prevEg;
      const egStr      = (egChange >= 0 ? '+' : '') + (egChange * 100).toFixed(1) + '%';
      const arCharW    = arFS * 0.72;
      const lblW       = (`${po} ${deltaStr}`).length * lblFS * 0.64;
      const egSuffixW  = useSeat ? (egStr.length * egFS * 0.62 + 4) : 0;
      return pH + arCharW + 3 + lblW + egSuffixW + pH;
    }

    const placed: Array<{ lx: number; rx: number; cy: number }> = [];
    const eligible = [...statePaths]
      .filter(p => p.po && p.cx !== null && p.cy !== null && p.area > 900)
      .sort((a, b) => (a.cx ?? 0) - (b.cx ?? 0));
    for (const s of eligible) {
      const scx = s.cx!;
      const scy = s.cy!;
      const pw  = approxPillW(s.po!, s.area);
      if (pw === 0) continue;
      const halfW = pw / 2 + GAP;
      let chosen = 0;
      for (const off of [0, -STEP, STEP, -STEP * 2, STEP * 2, -STEP * 3, STEP * 3]) {
        const pillCy = scy + off;
        const overlaps = placed.some(p =>
          (scx - halfW) < p.rx && (scx + halfW) > p.lx && Math.abs(p.cy - pillCy) < EST_H
        );
        if (!overlaps) { chosen = off; break; }
      }
      placed.push({ lx: scx - halfW, rx: scx + halfW, cy: scy + chosen });
      result[s.po!] = chosen;
    }
    return result;
  })());

  // ── Zoom / pan ────────────────────────────────────────────────────────────
  let zoomK  = $state(1);
  let zoomTx = $state(0);
  let zoomTy = $state(0);

  // ── Mobile: initial zoom + idle animation ─────────────────────────────────
  let _mobileZoomApplied = false;

  // Apply a slightly zoomed-in default view the first time the container is sized on mobile
  $effect(() => {
    if (_mobileZoomApplied || svgW <= 0 || svgH <= 0 || svgW >= 640) return;
    _mobileZoomApplied = true;
    const k = 1.38;
    // cy is the world-space point that appears at the screen centre after zoom.
    // CONUS centre sits at ~46% of svgH in world space; to make it appear at
    // ~38% down the *screen* (leaving breathing room above for the chrome),
    // solve: k*(world_conus_y - cy) + svgH/2 = 0.38*svgH → cy ≈ svgH*0.55
    const cx = svgW * 0.45;
    const cy = svgH * 0.55;
    zoomK  = k;
    zoomTx = svgW / 2 - k * cx;
    zoomTy = svgH / 2 - k * cy;
    _scheduleIdle();
  });

  // Idle animation: gentle zoom-in + rightward drift when no interaction
  // Mobile: fires after 3 s; Desktop: fires after 20 s (subtler params)
  let _idleTimer: ReturnType<typeof setTimeout> | null = null;
  let _idleRaf: number | null = null;
  let _idleActive = false;
  let _wheelDebounce: ReturnType<typeof setTimeout> | null = null;

  function _cancelIdle() {
    _idleActive = false;
    flipCard = null; flipCardExiting = false; flipCardFading = false;
    flipExitX = 0; flipExitY = 0; flipExitScale = 1;
    _reelFadeDeltas = false;
    if (_idleTimer)    { clearTimeout(_idleTimer); _idleTimer = null; }
    if (_idleRaf)      { cancelAnimationFrame(_idleRaf); _idleRaf = null; }
    if (_wheelDebounce){ clearTimeout(_wheelDebounce); _wheelDebounce = null; }
  }

  // Mobile-only: gentle zoom-in + rightward drift
  function _runIdle() {
    if (zoomK > 1.5) return;
    _idleActive = true;
    const startK  = zoomK;
    const targetK = zoomK * 1.18;
    const cx = (svgW / 2 - zoomTx) / zoomK;
    const cy = (svgH / 2 - zoomTy) / zoomK;
    const pan      = svgW * 0.04;
    const duration = 11000;
    const t0 = performance.now();
    function tick(now: number) {
      if (!_idleActive) return;
      const p  = Math.min((now - t0) / duration, 1);
      const ep = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const k  = startK + (targetK - startK) * ep;
      zoomK  = k;
      zoomTx = svgW / 2 - cx * k + pan * ep;
      zoomTy = svgH / 2 - cy * k;
      if (p < 1) {
        _idleRaf = requestAnimationFrame(tick);
      } else {
        _idleActive = false;
      }
    }
    _idleRaf = requestAnimationFrame(tick);
  }

  function _scheduleIdle() {
    _cancelIdle();
    if (svgW >= 640) {
      // Desktop: launch attract mode (demo reel) after 12 s of inactivity
      _idleTimer = setTimeout(_runDemoReel, 12000);
    } else {
      // Mobile: gentle zoom drift after 3 s
      _idleTimer = setTimeout(_runIdle, 3000);
    }
  }

  // Initial idle schedule for desktop (mobile handled by _mobileZoomApplied effect)
  let _desktopIdleScheduled = false;
  $effect(() => {
    if (_desktopIdleScheduled || svgW < 640 || svgH <= 0) return;
    _desktopIdleScheduled = true;
    _scheduleIdle();
  });

  // ── Demo reel: cycles through the most gerrymandered states (desktop only) ──
  type FlipCard = { po: string; name: string; eg: number; party: 'D' | 'R' | 'N'; tagline: string };
  let flipCard = $state<FlipCard | null>(null);
  let flipCardExiting = $state(false);
  let flipCardFading = $state(false);
  let flipExitX = $state(0);
  let flipExitY = $state(0);
  let flipExitScale = $state(1);
  let _reelFadeDeltas = $state(false);

  function _pickReelStates(): string[] {
    const valid = ranked.filter(s => hasFullData(s.po) && Math.abs(s.eg) > 0.04);
    if (valid.length < 2) return [];
    const topR = valid.slice(0, 3).map(s => s.po);
    const topD = [...valid].reverse().slice(0, 3).map(s => s.po);
    const result: string[] = [];
    const n = Math.min(topR.length, topD.length);
    for (let i = 0; i < n; i++) { result.push(topR[i], topD[i]); }
    return result;
  }

  function _buildFlipCard(po: string): FlipCard {
    const cycle = getCycle(po);
    const eg = cycle?.efficiency_gap ?? 0;
    const party: 'D' | 'R' | 'N' = eg > 0.02 ? 'R' : eg < -0.02 ? 'D' : 'N';
    const total = (cycle?.votes_d ?? 0) + (cycle?.votes_r ?? 0);
    const voteD = total ? Math.round((cycle!.votes_d / total) * 100) : 0;
    const voteR = 100 - voteD;
    const seatsD = cycle?.seats_d ?? 0;
    const seatsR = cycle?.seats_r ?? 0;
    const seats  = cycle?.seats   ?? 0;
    let tagline = '';
    if (party === 'R' && seats > 0)
      tagline = `Republicans won ${seatsR} of ${seats} seats with ${voteR}% of votes`;
    else if (party === 'D' && seats > 0)
      tagline = `Democrats won ${seatsD} of ${seats} seats with ${voteD}% of votes`;
    else
      tagline = 'Seats closely matched votes';
    return { po, name: getStateName(po), eg, party, tagline };
  }

  function _reelZoomTo(cx: number, cy: number, k: number, ms: number, done: () => void, onTick?: (ep: number) => void) {
    const sk = zoomK, stx = zoomTx, sty = zoomTy;
    const etx = svgW / 2 - cx * k;
    const ety = svgH / 2 - cy * k;
    const t0 = performance.now();
    function tick(now: number) {
      if (!_idleActive) return;
      const p  = Math.min((now - t0) / ms, 1);
      const ep = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2;
      zoomK  = sk  + (k   - sk)  * ep;
      zoomTx = stx + (etx - stx) * ep;
      zoomTy = sty + (ety - sty) * ep;
      onTick?.(ep);
      if (p < 1) _idleRaf = requestAnimationFrame(tick); else done();
    }
    _idleRaf = requestAnimationFrame(tick);
  }

  function _reelReset(ms: number, done: () => void) {
    const sk = zoomK, stx = zoomTx, sty = zoomTy;
    const t0 = performance.now();
    function tick(now: number) {
      if (!_idleActive) return;
      const p  = Math.min((now - t0) / ms, 1);
      const ep = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2;
      zoomK  = sk  * (1 - ep);
      zoomTx = stx * (1 - ep);
      zoomTy = sty * (1 - ep);
      if (zoomK < 1) zoomK = 1;
      if (p < 1) _idleRaf = requestAnimationFrame(tick); else done();
    }
    _idleRaf = requestAnimationFrame(tick);
  }

  function _runDemoReel() {
    if (svgW < 640) return; // desktop only
    _idleActive = true;
    let states: string[] = [];
    let i = 0;

    function beat() {
      if (!_idleActive) return;
      // Re-pick states at the start of each loop
      if (i === 0) {
        states = _pickReelStates();
        if (!states.length) { _idleActive = false; return; }
      }
      if (i >= states.length) {
        i = 0;
        beat(); // next loop immediately
        return;
      }

      const po = states[i++];
      const path = statePaths.find(p => p.po === po);
      if (!path?.cx || !path?.cy) { beat(); return; }
      const pcx = path.cx, pcy = path.cy, parea = path.area;

      // Zoom-out to full national view (the "beat")
      _reelReset(2200, () => {
        if (!_idleActive) return;
        // Brief pause at national view — show flip card teaser at screen center
        _idleTimer = setTimeout(() => {
          if (!_idleActive) return;
          flipExitX = 0; flipExitY = 0; flipExitScale = 1;
          flipCard = _buildFlipCard(po);
          _idleTimer = setTimeout(() => {
            if (!_idleActive) return;
            const relArea = parea / (svgW * svgH);
            const k = relArea < 0.003 ? 5.2 : relArea < 0.015 ? 3.6 : 2.4;
            // Release animation fill-mode so per-frame transform updates take effect
            flipCardExiting = true;
            _reelFadeDeltas = true;
            _reelZoomTo(pcx, pcy, k, 3200, () => {
              if (!_idleActive) return;
              // Zoom done — card is at state center (screen center); hold then fade
              _idleTimer = setTimeout(() => {
                if (!_idleActive) return;
                flipCardFading = true;
                setTimeout(() => {
                  flipCard = null; flipCardExiting = false; flipCardFading = false; flipExitScale = 1;
                  _reelFadeDeltas = false;
                  _idleTimer = setTimeout(beat, 500);
                }, 700);
              }, 3200);
            }, (ep) => {
              // Per frame: card tracks the state's screen position
              // Weight ramps from 0→1 in first ~33% of zoom so card smoothly
              // "catches up" to the state before locking on and riding it to center
              const w = Math.min(ep * 3, 1);
              flipExitX = (pcx * zoomK + zoomTx - svgW / 2) * w;
              flipExitY = (pcy * zoomK + zoomTy - svgH / 2) * w;
              flipExitScale = 1 - ep * 0.18; // 1.0 → 0.82
            });
          }, 1400); // hold flip card at center before zoom starts
        }, 400); // pause before flip card appears
      });
    }
    beat();
  }

  /** Start the demo reel on demand (e.g. from Tour button or parent component). */
  export function startReel() {
    _cancelIdle();
    _runDemoReel();
  }

  let _wasInReel  = false; // true when a tap interrupted an active reel
  let _dragActive = false;
  let _dragMoved  = false;
  let _dragStartX = 0, _dragStartY = 0;
  let _dragStartTx = 0, _dragStartTy = 0;

  // Pinch-to-zoom: track active pointers
  const _activePointers = new Map<number, { x: number; y: number }>();
  let _pinchDist = 0;

  function _pointerDist(): number {
    const pts = [..._activePointers.values()];
    if (pts.length < 2) return 0;
    const dx = pts[0].x - pts[1].x, dy = pts[0].y - pts[1].y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    _cancelIdle();
    // Reschedule idle after wheel activity settles
    _wheelDebounce = setTimeout(_scheduleIdle, 1500);
    neZoomed = false;
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.3 : 1 / 1.3;
    const newK = Math.max(1, Math.min(8, zoomK * factor));
    zoomTx = mx - (newK / zoomK) * (mx - zoomTx);
    zoomTy = my - (newK / zoomK) * (my - zoomTy);
    zoomK  = newK;
  }

  function handlePointerDown(e: PointerEvent) {
    _wasInReel = _idleActive; // capture before cancelling
    _cancelIdle();
    _activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (_activePointers.size === 2) {
      // Starting a pinch — capture distance and stop drag
      _pinchDist = _pointerDist();
      _dragActive = false;
      return;
    }
    if ((e.target as Element).closest('.state-path') && zoomK === 1) return;
    _dragActive  = true;
    _dragMoved   = false;
    _dragStartX  = e.clientX;
    _dragStartY  = e.clientY;
    _dragStartTx = zoomTx;
    _dragStartTy = zoomTy;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent) {
    _activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (_activePointers.size === 2 && _pinchDist > 0) {
      // Pinch zoom
      const newDist = _pointerDist();
      const factor  = newDist / _pinchDist;
      const pts = [..._activePointers.values()];
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;
      const rect  = (e.currentTarget as Element).getBoundingClientRect();
      const mx = midX - rect.left, my = midY - rect.top;
      const newK = Math.max(1, Math.min(8, zoomK * factor));
      zoomTx = mx - (newK / zoomK) * (mx - zoomTx);
      zoomTy = my - (newK / zoomK) * (my - zoomTy);
      zoomK  = newK;
      _pinchDist = newDist;
      neZoomed = false;
      return;
    }
    if (!_dragActive) return;
    const dx = e.clientX - _dragStartX;
    const dy = e.clientY - _dragStartY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) _dragMoved = true;
    if (_dragMoved) { zoomTx = _dragStartTx + dx; zoomTy = _dragStartTy + dy; }
  }

  function handlePointerUp(e: PointerEvent) {
    _activePointers.delete(e.pointerId);
    if (_activePointers.size < 2) _pinchDist = 0;
    _dragActive = false;
    _scheduleIdle();
  }

  function zoomStep(factor: number) {
    const cx = svgW / 2, cy = svgH / 2;
    const newK = Math.max(1, Math.min(8, zoomK * factor));
    if (newK === 1) { zoomK = 1; zoomTx = 0; zoomTy = 0; return; }
    zoomTx = cx - (newK / zoomK) * (cx - zoomTx);
    zoomTy = cy - (newK / zoomK) * (cy - zoomTy);
    zoomK  = newK;
  }

  function resetZoom() { zoomK = 1; zoomTx = 0; zoomTy = 0; neZoomed = false; }

  // NE corridor zoom — computes bounding box of NE state centroids at runtime
  // so it adapts to any SVG size.
  let neZoomed = $state(false);
  const NE_STATES = ['ME','NH','VT','MA','RI','CT','NY','NJ','DE','MD','PA','DC'];

  function zoomToNE() {
    if (neZoomed) { resetZoom(); return; }
    const pts = statePaths.filter(p => p.po && NE_STATES.includes(p.po) && p.cx !== null && p.cy !== null);
    if (pts.length === 0) return;
    const xs = pts.map(p => p.cx!);
    const ys = pts.map(p => p.cy!);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const pad  = 40;
    const regionW = maxX - minX + pad * 2;
    const regionH = maxY - minY + pad * 2;
    const k = Math.min(6, Math.max(2.5, Math.min(svgW / regionW, svgH / regionH) * 0.82));
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    zoomK  = k;
    zoomTx = svgW / 2 - k * cx;
    zoomTy = svgH / 2 - k * cy;
    neZoomed = true;
  }

  // ── Tooltip ───────────────────────────────────────────────────────────────────

  let hovered = $state<{ po: string; x: number; y: number } | null>(null);
  let showRankings = $state(false);

  // ── Bottom-sheet drag for rank panel (mobile) ─────────────────────────────
  let _sheetTouchY = 0;
  let _sheetDragged = false;

  function sheetTouchStart(e: TouchEvent) {
    _sheetTouchY = e.touches[0].clientY;
    _sheetDragged = false;
  }
  function sheetTouchMove(e: TouchEvent) {
    if (Math.abs(e.touches[0].clientY - _sheetTouchY) > 6) {
      _sheetDragged = true;
      e.stopPropagation();
    }
  }
  function sheetTouchEnd(e: TouchEvent) {
    const dy = e.changedTouches[0].clientY - _sheetTouchY;
    e.stopPropagation();
    if (!_sheetDragged) {
      showRankings = !showRankings;
    } else {
      if (dy < -40) showRankings = true;
      if (dy >  40) showRankings = false;
    }
  }

  function handleMouseMove(e: MouseEvent, po: string) {
    hovered = { po, x: e.offsetX, y: e.offsetY };
  }

  // On touch devices, first tap shows the tooltip; the CTA button (or a second tap) navigates.
  // During the reel, a single tap navigates directly (clear intent, no need for two-tap pattern).
  function handleTap(e: MouseEvent, po: string, full: boolean) {
    if (!full) return;
    if (_wasInReel) {
      _wasInReel = false;
      hovered = null;
      onStateClick(po);
      return;
    }
    // If tooltip already open for this state, navigate
    if (hovered?.po === po) {
      hovered = null;
      onStateClick(po);
      return;
    }
    // Otherwise show the tooltip at the tap position
    const rect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
    hovered = { po, x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) };
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

  function getCycleHistory(po: string): Array<{ year: number; eg: number | null }> {
    const s = byPo[po];
    if (!s) return [];
    return CYCLE_YEARS.map(year => ({
      year,
      eg: s.cycles.find(c => c.year === year)?.efficiency_gap ?? null,
    }));
  }

  function egDeltaVsPrev(po: string): number | null {
    const s = byPo[po];
    if (!s) return null;
    const years = CYCLE_YEARS.filter(y => s.cycles.some(c => c.year === y));
    const idx = years.indexOf(selectedYear);
    if (idx <= 0) return null;
    const curr = s.cycles.find(c => c.year === selectedYear)?.efficiency_gap ?? null;
    const prev = s.cycles.find(c => c.year === years[idx - 1])?.efficiency_gap ?? null;
    if (curr === null || prev === null) return null;
    return curr - prev;
  }

  // Hovering a rank-panel row highlights that state's tooltip on the map
  function hoverRankState(po: string) {
    const sp = statePaths.find(p => p.po === po);
    if (sp && sp.cx !== null && sp.cy !== null) {
      hovered = { po, x: sp.cx * zoomK + zoomTx, y: sp.cy * zoomK + zoomTy };
    }
  }

  let svgEl = $state<SVGSVGElement | null>(null);

  export function takeScreenshot(year: number) {
    if (!svgEl) return;
    const w = svgEl.clientWidth  || svgW;
    const h = svgEl.clientHeight || svgH;
    const dpr = window.devicePixelRatio || 1;
    const xml = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const img  = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);

      // Watermark
      const fSize = 13 * dpr;
      ctx.font = `600 ${fSize}px system-ui, sans-serif`;
      ctx.textBaseline = 'bottom';
      ctx.textAlign    = 'right';
      const label = `US ${year} · districtdrift.org`;
      const tw    = ctx.measureText(label).width;
      const pad   = 12 * dpr, bpad = 6 * dpr;
      const x = canvas.width - pad, y = canvas.height - pad;
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.beginPath();
      ctx.roundRect(x - tw - bpad, y - fSize - bpad, tw + bpad * 2, fSize + bpad * 2, 4 * dpr);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillText(label, x, y);

      canvas.toBlob(b => {
        if (!b) return;
        const a = document.createElement('a');
        a.href     = URL.createObjectURL(b);
        a.download = `districtdrift-us-${year}.png`;
        a.click();
      }, 'image/png');
    };
    img.src = url;
  }

  /** Returns a small JPEG data URL for attaching to feedback. No watermark. */
  export function captureDataUrl(): Promise<string | null> {
    return new Promise((resolve) => {
      if (!svgEl) { resolve(null); return; }
      const w = Math.min(svgEl.clientWidth || svgW, 600);
      const h = Math.round((svgEl.clientHeight || svgH) * (w / (svgEl.clientWidth || svgW)));
      const xml  = new XMLSerializer().serializeToString(svgEl);
      const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const img  = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }
</script>

<div class="nation-wrap" bind:this={container}>
  {#if loading}
    <div class="loading">Loading map…</div>
  {:else}
    <svg width={svgW} height={svgH} class="nation-svg" bind:this={svgEl}
      onwheel={handleWheel}
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
      style:cursor={_dragActive && _dragMoved ? 'grabbing' : zoomK > 1 ? 'grab' : 'default'}
    >
      <defs>
        <linearGradient id="nv-line-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stop-color="white" stop-opacity="0"/>
          <stop offset="10%"  stop-color="white" stop-opacity="0.6"/>
          <stop offset="90%"  stop-color="white" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </linearGradient>
        <!-- Clip the wipe line to land masses only -->
        <clipPath id="nv-states-clip">
          {#each statePaths as { d }}
            {#if d}<path {d}/>{/if}
          {/each}
        </clipPath>
      </defs>

      <g transform="translate({zoomTx} {zoomTy}) scale({zoomK})">
      <!-- Single layer: fill lerped per-state based on wipe position vs centroid x -->
      {#each statePaths as { po, d, cx, cy, area }}
        {#if d && po}
          {@const eg = getEg(po)}
          {@const full = hasFullData(po)}
          {@const localT = Math.max(0, Math.min(1, ($wipeX - (cx ?? 0) + BLEND) / (2 * BLEND)))}
          {@const fill = lerpColor(egColor(prevEgMap[po] ?? null), egColor(eg), localT)}
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <path
            {d}
            style="fill:{fill}"
            stroke="var(--nation-stroke)"
            stroke-width="0.6"
            class="state-path"
            class:has-full-data={full}
            onmousemove={(e) => handleMouseMove(e, po)}
            onmouseleave={() => hovered = null}
            onclick={(e) => { if (_dragMoved) { _dragMoved = false; return; } handleTap(e, po, full); }}
            role={full ? 'button' : 'img'}
            tabindex={full ? 0 : undefined}
            aria-label="{getStateName(po)}{full ? ' — click to explore' : ''}"
            onkeydown={(e) => full && e.key === 'Enter' && onStateClick(po)}
          />
        {/if}
      {/each}

      <!-- State abbreviation labels (only for states large enough; hidden when delta overlay is active) -->
      {#each statePaths as { po, cx, cy, area }}
        {@const hasStaticPill = showEgLabels && showDeltas && wipeFromYear === null && staticPrevYear !== null && getEg(po) !== null && (staticPrevData[po] ?? null) !== null}
        {#if po && cx !== null && cy !== null && area > 400 && !(showEgLabels && wipeFromYear !== null && getEg(po) !== null && (prevEgMap[po] ?? null) !== null) && !hasStaticPill}
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

      <!-- EG prev→current size contrast + arrow overlay — animated and static -->
      {#if showEgLabels && (wipeFromYear !== null || (showDeltas && staticPrevYear !== null))}
        <g class="delta-overlay" class:delta-fading={_reelFadeDeltas}>
        {#each statePaths as { po, cx, cy, area }}
          {#if po && cx !== null && cy !== null && area > 900}
            {@const currEg    = getEg(po)}
            {@const isAnimating = wipeFromYear !== null}
            {@const prevEg    = isAnimating ? (prevEgMap[po] ?? null) : (staticPrevData[po]?.eg ?? null)}
            {#if currEg !== null && prevEg !== null}
              {@const localT    = isAnimating
                ? Math.max(0, Math.min(1, ($wipeX - cx + BLEND) / (2 * BLEND)))
                : 0.82}
              {@const egChange  = currEg - prevEg}
              <!-- Seat change (primary): compare curr cycle seats to prev cycle seats -->
              {@const currCycle = nationData.find(s => s.state_po === po)?.cycles.find(c => c.year === selectedYear)}
              {@const prevSeats = isAnimating
                ? (prevSeatsMap[po] ?? null)
                : (staticPrevData[po] ? { d: staticPrevData[po]!.d, r: staticPrevData[po]!.r } : null)}
              {@const seatDeltaD = (currCycle && prevSeats) ? currCycle.seats_d - prevSeats.d : null}
              {@const seatDeltaR = (currCycle && prevSeats) ? currCycle.seats_r - prevSeats.r : null}
              <!-- Net partisan seat swing: +N means R gained, -N means D gained -->
              {@const seatNet   = (seatDeltaD !== null && seatDeltaR !== null) ? seatDeltaR - seatDeltaD : null}
              <!-- Primary label: seat change if non-zero; fallback to EG delta -->
              {@const useSeat   = seatNet !== null && seatNet !== 0}
              {@const deltaStr  = useSeat
                ? (seatNet! > 0 ? `+${seatNet}R` : `${seatNet}D`)
                : (egChange >= 0 ? '+' : '') + (egChange * 100).toFixed(1) + '%'}
              <!-- Direction and color based on source: seat swing or EG -->
              {@const netUp     = useSeat ? seatNet! > 0 : egChange > 0.02}
              {@const netDown   = useSeat ? seatNet! < 0 : egChange < -0.02}
              {@const arChar    = netUp ? '↑' : netDown ? '↓' : '→'}
              {@const color     = netUp ? '#ff8a8a' : netDown ? '#7ec8f5' : '#ccc'}
              {@const arFS      = area > 2000 ? 22 : area > 800 ? 16 : 12}
              {@const lblFS     = area > 2000 ? 9 : area > 800 ? 7 : 6}
              {@const egFS      = lblFS * 0.85}
              {@const labelTxt  = `${po} ${deltaStr}`}
              {@const egStr     = (egChange >= 0 ? '+' : '') + (egChange * 100).toFixed(1) + '%'}
              <!-- Pill dimensions — widen to fit subtle EG suffix when seat change is primary -->
              {@const pH        = 5}
              {@const pV        = 3}
              {@const arCharW   = arFS * 0.72}
              {@const lblW      = labelTxt.length * lblFS * 0.64}
              {@const egSuffixW = useSeat ? (egStr.length * egFS * 0.62 + 4) : 0}
              {@const pillW     = pH + arCharW + 3 + lblW + egSuffixW + pH}
              {@const pillH     = Math.max(arFS, lblFS) + pV * 2}
              <!-- Placement: base offset from stagger pass + nudge toward map interior for edge states -->
              {@const staggerOff = pillYOffsets[po] ?? 0}
              {@const edgeNudge  = cy < svgH * 0.35 ? pillH * 0.5
                                 : cy > svgH * 0.65 ? -pillH * 0.5 : 0}
              {@const pillCy    = cy + staggerOff + edgeNudge}
              {@const pillX     = cx - pillW / 2}
              {@const pillY     = pillCy - pillH / 2}
              {@const arCharX   = pillX + pH + arCharW / 2}
              {@const labelX    = pillX + pH + arCharW + 3}
              {@const egX       = labelX + lblW + 4}

              <g opacity={localT} pointer-events="none">
                <!-- Pill background -->
                <rect
                  x={pillX} y={pillY} width={pillW} height={pillH}
                  fill="rgba(12,16,36,0.91)" rx={pillH / 2}
                  stroke="rgba(255,255,255,0.1)" stroke-width="0.5"
                />
                <!-- Arrow character -->
                <text x={arCharX} y={pillCy}
                  text-anchor="middle" dominant-baseline="middle"
                  font-size={arFS} font-weight="900"
                  fill={color}
                >{arChar}</text>
                <!-- Primary: state abbrev + seat/EG delta -->
                <text x={labelX} y={pillCy}
                  text-anchor="start" dominant-baseline="middle"
                  font-size={lblFS} font-weight="700"
                  fill={color}
                >{labelTxt}</text>
                <!-- Subtle EG delta suffix — only when seat change is primary -->
                {#if useSeat}
                  <text x={egX} y={pillCy}
                    text-anchor="start" dominant-baseline="middle"
                    font-size={egFS} font-weight="400"
                    fill={color} opacity="0.65"
                  >{egStr}</text>
                {/if}
              </g>
            {/if}
          {/if}
        {/each}
        </g>
      {/if}

      <!-- Wipe line clipped to state land masses only -->
      {#if wipeFromYear !== null && $wipeX > 5 && $wipeX < svgW - 5}
        <rect x={$wipeX - 1} y={0} width={2} height={svgH}
          fill="url(#nv-line-fade)"
          clip-path="url(#nv-states-clip)"
          pointer-events="none"/>
      {/if}
      </g>
    </svg>

    <!-- Zoom controls -->
    <div class="zoom-controls">
      <button class="zoom-btn" onclick={() => zoomStep(1.5)} title="Zoom in" aria-label="Zoom in">+</button>
      <button class="zoom-btn" onclick={() => zoomStep(1/1.5)} title="Zoom out" aria-label="Zoom out">−</button>
      <button
        class="zoom-btn zoom-ne"
        class:active={neZoomed}
        onclick={zoomToNE}
        title="Northeast corridor — 12 small states pack ~90 congressional seats into a densely contested region"
        aria-label="Zoom to Northeast"
      >NE</button>
      {#if zoomK > 1}
        <button class="zoom-btn zoom-reset" onclick={resetZoom} title="Reset zoom" aria-label="Reset zoom">⊡</button>
      {/if}
      <button
        class="zoom-btn zoom-tour"
        class:active={_idleActive}
        onclick={() => { if (_idleActive) { _cancelIdle(); resetZoom(); _scheduleIdle(); } else startReel(); }}
        title={_idleActive ? 'Stop tour' : 'Tour the most gerrymandered states'}
        aria-label={_idleActive ? 'Stop tour' : 'Start tour'}
      >{_idleActive ? '■' : '▶'}</button>
    </div>

    {#if neZoomed}
      <div class="ne-note">
        Northeast corridor — 12 states, ~90 seats, the most geographically compressed congressional battleground in the US
      </div>
    {/if}

    <!-- Year transition badge: shown while wipe is crossing the map -->
    {#if wipeFromYear !== null && $wipeX > 5 && $wipeX < svgW - 5}
      <div class="wipe-year-badge">
        <span class="wby-from">{wipeFromYear}</span>
        <span class="wby-arrow">→</span>
        <span class="wby-to">{selectedYear}</span>
      </div>
    {/if}

    <!-- Tooltip -->
    {#if hovered}
      {@const c = getCycle(hovered.po)}
      {@const full = hasFullData(hovered.po)}
      {@const tooltipRight = hovered.x > svgW * 0.65}
      {@const history = getCycleHistory(hovered.po)}
      <div
        class="map-tooltip"
        class:flip-left={tooltipRight}
        style="left:{hovered.x + (tooltipRight ? -14 : 14)}px; top:{hovered.y}px"
      >
        <div class="tt-header">
          <strong>{getStateName(hovered.po)}</strong>
          <button class="tt-close" onclick={() => hovered = null} aria-label="Close">✕</button>
        </div>
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
        {#if history.some(h => h.eg !== null)}
          <div class="tt-trend">
            {#each history as h}
              {@const active = h.year === selectedYear}
              <div class="tt-trend-col" class:active>
                <div class="tt-trend-bar-wrap">
                  {#if h.eg !== null}
                    <div
                      class="tt-trend-bar"
                      style="height:{Math.min(28, Math.max(3, Math.abs(h.eg) * 112))}px; background:{egBarColor(h.eg)}"
                    ></div>
                  {:else}
                    <div class="tt-trend-bar tt-trend-bar-none"></div>
                  {/if}
                </div>
                <span class="tt-trend-year">{String(h.year).slice(2)}</span>
              </div>
            {/each}
          </div>
        {/if}
        {#if full}
          {@const po = hovered.po}
          <button class="tooltip-cta" onclick={() => { hovered = null; onStateClick(po); }}>Explore districts →</button>
        {:else}
          <span class="tooltip-soon">District maps coming soon</span>
        {/if}
      </div>
    {/if}

    <!-- Flip card: teaser shown during zoom into a state -->
    {#if flipCard}
      <div class="flip-card" class:flip-card-r={flipCard.party === 'R'} class:flip-card-d={flipCard.party === 'D'}
           class:exiting={flipCardExiting}
           class:fading={flipCardFading}
           style="--ex:{flipExitX}px;--ey:{flipExitY}px;--fcs:{flipExitScale}">
        <div class="flip-state">{flipCard.name}</div>
        <div class="flip-year">{selectedYear}</div>
        <div class="flip-tagline">{flipCard.tagline}</div>
        <div class="flip-eg" class:flip-eg-r={flipCard.party === 'R'} class:flip-eg-d={flipCard.party === 'D'}>
          {egLabel(flipCard.eg)} efficiency gap
        </div>
      </div>
    {/if}

    <!-- Color legend -->
    <div class="eg-legend">
      <div class="legend-gradient"></div>
      <div class="legend-ticks">
        <span>−25%</span><span>−15%</span><span>−5%</span><span>0</span><span>+5%</span><span>+15%</span><span>+25%</span>
      </div>
      <div class="legend-labels">
        <span>D gerrymander</span>
        <span>Neutral</span>
        <span>R gerrymander</span>
      </div>
    </div>

    <!-- Rank panel with toggle button embedded at top -->
    <div id="rank-panel" class="rank-panel" class:rank-panel-open={showRankings} class:reel-mode={_idleActive}
      role="region" aria-label="States ranked by efficiency gap">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- Drag handle: tap or swipe to open/close on mobile -->
      <div class="sheet-handle"
        ontouchstart={sheetTouchStart}
        ontouchmove={sheetTouchMove}
        ontouchend={sheetTouchEnd}
        onclick={() => showRankings = !showRankings}
        role="button" tabindex="0" aria-label={showRankings ? 'Close rankings' : 'Open rankings'}
        onkeydown={(e) => e.key === 'Enter' && (showRankings = !showRankings)}>
        <span class="sheet-handle-bar"></span>
      </div>
      <div class="rank-content">
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
            {@const delta = egDeltaVsPrev(s.po)}
            <button class="rank-row" class:rank-clickable={full} onclick={() => full && onStateClick(s.po)} disabled={!full}
              onmouseenter={() => hoverRankState(s.po)} onmouseleave={() => hovered = null}>
              <span class="rank-state">{s.po}</span>
              <span class="rank-name">{s.name}</span>
              {#if delta !== null && Math.abs(delta) >= 0.01}
                <span class="rank-delta" class:rank-delta-r={delta > 0} class:rank-delta-d={delta < 0}>{delta > 0 ? '↑' : '↓'}</span>
              {/if}
              <Pill party="R">{egLabel(s.eg)}</Pill>
            </button>
          {/each}
        </div>

        <div class="rank-divider"></div>

        <div class="rank-section-label d-label">Most D-favoring</div>
        <div class="rank-list">
          {#each [...ranked].reverse().slice(0, 7) as s}
            {@const full = hasFullData(s.po)}
            {@const delta = egDeltaVsPrev(s.po)}
            <button class="rank-row" class:rank-clickable={full} onclick={() => full && onStateClick(s.po)} disabled={!full}
              onmouseenter={() => hoverRankState(s.po)} onmouseleave={() => hovered = null}>
              <span class="rank-state">{s.po}</span>
              <span class="rank-name">{s.name}</span>
              {#if delta !== null && Math.abs(delta) >= 0.01}
                <span class="rank-delta" class:rank-delta-r={delta > 0} class:rank-delta-d={delta < 0}>{delta > 0 ? '↑' : '↓'}</span>
              {/if}
              <Pill party="D">{egLabel(s.eg)}</Pill>
            </button>
          {/each}
        </div>
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
    touch-action: none;
  }

  /* Theme-aware stroke colors for the year badge */
  :global(:root) {
    --wby-from-stroke: rgba(0,0,0,0.28);
    --wby-to-stroke:   rgba(0,0,0,0.82);
    --wby-arrow-color: rgba(0,0,0,0.28);
  }
  :global([data-theme=dark]) {
    --wby-from-stroke: rgba(255,255,255,0.28);
    --wby-to-stroke:   rgba(255,255,255,0.88);
    --wby-arrow-color: rgba(255,255,255,0.28);
  }

  .wipe-year-badge {
    position: absolute;
    top: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    pointer-events: none;
    white-space: nowrap;
    font-family: system-ui, -apple-system, sans-serif;
    letter-spacing: 0.03em;
  }
  .wby-from {
    font-size: 3.6rem;
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--wby-from-stroke);
  }
  .wby-arrow {
    font-size: 1.3rem;
    font-weight: 300;
    color: var(--wby-arrow-color);
    align-self: center;
  }
  .wby-to {
    font-size: 3.6rem;
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 2px var(--wby-to-stroke);
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

  :global(:root)            { --nation-stroke: rgba(255,255,255,0.6); }
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
  .state-path.has-full-data:focus-visible { outline: none; filter: drop-shadow(0 0 3px #80b8ff); }

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
  .tt-header { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.2rem; }
  .tt-header strong { font-size: 0.82rem; }
  .tt-close {
    background: none; border: none; color: rgba(255,255,255,0.75); cursor: pointer;
    font-size: 0.7rem; padding: 0 0 0 4px; line-height: 1; flex-shrink: 0;
  }
  .tt-close:hover { color: #fff; }
  .tt-row { display: flex; gap: 0.5rem; justify-content: space-between; }
  .tt-label { opacity: 0.6; }
  .tt-val { font-weight: 600; }
  .tooltip-cta {
    display: block; width: 100%; margin-top: 0.35rem;
    background: rgba(128,200,255,0.12); border: 1px solid rgba(128,200,255,0.3);
    border-radius: 4px; padding: 0.3rem 0.5rem;
    color: #80c8ff; font-weight: 600; font-size: 0.7rem; text-align: center;
    cursor: pointer;
  }
  .tooltip-cta:hover { background: rgba(128,200,255,0.22); }
  .tooltip-soon { opacity: 0.45; font-style: italic; margin-top: 0.2rem; }

  .tt-trend {
    display: flex;
    gap: 4px;
    margin-top: 0.35rem;
    padding-top: 0.3rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    align-items: flex-end;
  }
  .tt-trend-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    flex: 1;
    opacity: 0.55;
  }
  .tt-trend-col.active { opacity: 1; }
  .tt-trend-bar-wrap {
    height: 32px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
  }
  .tt-trend-bar {
    width: 8px;
    border-radius: 2px 2px 0 0;
    min-height: 3px;
  }
  .tt-trend-bar-none { background: rgba(255,255,255,0.15); height: 2px; width: 8px; }
  .tt-trend-year { font-size: 0.56rem; color: rgba(255,255,255,0.5); }

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
  .legend-ticks {
    display: flex;
    justify-content: space-between;
    width: 200px;
    font-size: 0.55rem;
    color: rgba(255,255,255,0.45);
    margin-top: 2px;
  }
  .legend-labels {
    display: flex;
    justify-content: space-between;
    width: 200px;
    font-size: 0.63rem;
    color: var(--text-muted);
  }

  /* Rank panel */
  .sheet-handle { display: none; }

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
  .nt-d { color: var(--color-d); }
  .nt-r { color: var(--color-r); }
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
    opacity: 0.7;
  }
  .rank-row.rank-clickable { cursor: pointer; opacity: 1; }
  .rank-row.rank-clickable:hover { background: var(--btn-hover); }

  .rank-state { font-size: 0.72rem; font-weight: 700; color: var(--text); width: 1.8em; flex-shrink: 0; }
  .rank-name { font-size: 0.68rem; color: var(--text-muted); flex: 1; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rank-delta { font-size: 0.68rem; font-weight: 700; flex-shrink: 0; }
  .rank-delta-r { color: #b91c1c; }
  .rank-delta-d { color: #1d4ed8; }
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

  /* Rankings toggle: desktop hidden, mobile shown */
  .mobile-rank-btn { display: none; }

  .zoom-controls {
    position: absolute;
    bottom: 2.5rem;
    right: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 3px;
    z-index: 10;
  }
  .zoom-btn {
    width: 26px;
    height: 26px;
    border: 1px solid rgba(0,0,0,0.18);
    border-radius: 5px;
    background: rgba(255,255,255,0.92);
    color: #333;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  }
  .zoom-btn:hover { background: #fff; border-color: rgba(0,0,0,0.3); }
  .zoom-reset { font-size: 12px; }
  .zoom-ne { font-size: 10px; font-weight: 700; letter-spacing: 0.02em; }
  .zoom-ne.active { background: var(--color-d-dark); color: #fff; border-color: #1a5276; }
  .zoom-ne.active:hover { background: #1a5276; }
  .zoom-tour { font-size: 10px; }
  .zoom-tour.active { background: #1a1a2e; color: #fff; border-color: #000; }
  .zoom-tour.active:hover { background: #2c2c4a; }

  .ne-note {
    position: absolute;
    bottom: 2.4rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.92);
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 99px;
    padding: 3px 12px;
    font-size: 0.7rem;
    color: #444;
    white-space: nowrap;
    pointer-events: none;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }

  @media (max-width: 639px) {
    /* Rank panel: glass card anchored to bottom-centre; button tab at top */
    .rank-panel {
      display: flex !important;
      position: fixed !important;
      bottom: 3.5rem !important;
      left: 0.875rem !important;
      right: 0.875rem !important;
      top: auto !important;
      width: auto !important;
      max-height: 55vh;
      overflow-y: auto;
      flex-direction: column;
      align-items: stretch;
      background: rgba(26, 30, 52, 0.82) !important;
      backdrop-filter: blur(24px) saturate(1.6) !important;
      -webkit-backdrop-filter: blur(24px) saturate(1.6) !important;
      border: 1px solid rgba(255,255,255,0.13) !important;
      border-radius: 18px !important;
      box-shadow: 0 8px 40px rgba(0,0,0,0.32) !important;
      z-index: 25;
      /* closed: only button tab peeks above bottom */
      transform: translateY(calc(100% - 2.4rem));
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      /* white-on-dark text overrides */
      --text: rgba(255,255,255,0.90);
      --text-muted: rgba(255,255,255,0.55);
      --text-label: rgba(255,255,255,0.50);
      --border: rgba(255,255,255,0.10);
    }
    .rank-panel.rank-panel-open {
      transform: translateY(0);
    }

    /* Drag handle at top of sheet */
    .sheet-handle {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.55rem 0 0.4rem;
      flex-shrink: 0;
      cursor: grab;
      touch-action: none;
      border-bottom: 1px solid rgba(255,255,255,0.10);
    }
    .sheet-handle-bar {
      width: 36px;
      height: 4px;
      border-radius: 2px;
      background: rgba(255,255,255,0.35);
    }

    /* Prevent accidental taps on content while panel is swiped closed */
    .rank-panel:not(.rank-panel-open) .rank-content {
      pointer-events: none;
    }

    .rank-heading { color: var(--text-label) !important; }
    .rank-state, .rank-name { color: rgba(255,255,255,0.88) !important; }
    .r-label { color: #f87171 !important; background: rgba(220,90,90,0.18) !important; }
    .d-label { color: #93c5fd !important; background: rgba(74,144,217,0.18) !important; }
    .rank-row { border-radius: 6px !important; }
    .rank-row:hover { background: rgba(255,255,255,0.08) !important; }
    .rank-divider { background: rgba(255,255,255,0.10) !important; }

    .eg-legend { bottom: 3.5rem; }
    .zoom-controls { display: none; }
  }

  /* ── Delta overlay fade during reel ─────────────────────────────────────── */
  .delta-overlay { transition: opacity 1.0s ease; }
  .delta-overlay.delta-fading { opacity: 0; }

  /* ── Flip card: cinematic teaser shown during reel zoom ─────────────────── */
  .flip-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(10, 12, 28, 0.92);
    backdrop-filter: blur(24px) saturate(1.5);
    -webkit-backdrop-filter: blur(24px) saturate(1.5);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 1.6rem 2.2rem 1.4rem;
    pointer-events: none;
    z-index: 25;
    text-align: center;
    min-width: 260px;
    max-width: 380px;
    animation: flip-in 0.45s cubic-bezier(0.22,1,0.36,1) both;
    transition: opacity 0.7s ease; /* transform is per-frame — no transition needed */
  }
  /* Tracking: release animation fill-mode so per-frame transform updates take effect */
  .flip-card.exiting {
    animation: none;
    transform: translate(calc(-50% + var(--ex, 0px)), calc(-50% + var(--ey, 0px))) scale(var(--fcs, 1));
  }
  /* Fade out at end of hold */
  .flip-card.fading { opacity: 0; }
  .flip-card-r { border-top: 3px solid var(--color-r); }
  .flip-card-d { border-top: 3px solid var(--color-d); }

  .flip-state {
    font-size: 1.65rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.01em;
    line-height: 1;
    margin-bottom: 0.15rem;
  }
  .flip-year {
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .flip-tagline {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.72);
    line-height: 1.45;
    margin-bottom: 0.7rem;
  }
  .flip-eg {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .flip-eg-r { color: #f87171; }
  .flip-eg-d { color: #60a5fa; }

  @keyframes flip-in {
    from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
    to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }

  @media (max-width: 639px) { .flip-card { display: none; } }

  /* ── Hide rankings panel during attract mode (desktop only) ─────────────── */
  @media (min-width: 640px) {
    .rank-panel {
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .rank-panel.reel-mode {
      opacity: 0;
      transform: translateX(0.6rem);
      pointer-events: none;
    }
  }
</style>
