<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import { Protocol, PMTiles } from 'pmtiles';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let { selectedYear = 2024, fadeDuration = 450, panelBottom = 0, panelLeft = 0, statePo = 'MI', cycleYears = [1992, 2002, 2012, 2022, 2024], darkMode = false, showPrecincts = false, showDistricts = true, onDistrictClick, onMapClick, onPrecinctLoadingChange }: {
    selectedYear?: number;
    fadeDuration?: number;
    panelBottom?: number;
    panelLeft?: number;
    statePo?: string;
    cycleYears?: number[];
    darkMode?: boolean;
    showPrecincts?: boolean;
    showDistricts?: boolean;
    onDistrictClick?: (d: { district: number; won_by: string; partisan_lean_d: number | null; cycle_year: number; x: number; y: number }) => void;
    onMapClick?: () => void;
    onPrecinctLoadingChange?: (loading: boolean) => void;
  } = $props();

  // Year immediately before `year` in the cycle sequence, or null if it's the first.
  function chronoPrevYear(year: number): number | null {
    const idx = cycleYears.indexOf(year);
    return idx > 0 ? cycleYears[idx - 1] : null;
  }

  const stateL = $derived(statePo.toLowerCase());

  const STATE_VIEW: Record<string, { bounds: maplibregl.LngLatBoundsLike; center: [number, number]; zoom: number }> = {
    MI: { bounds: [[-90.5, 41.7], [-82.1, 48.3]], center: [-84.5, 44.5], zoom: 5.5 },
    CA: { bounds: [[-124.5, 32.5], [-114.1, 42.0]], center: [-119.5, 37.3], zoom: 5.5 },
    GA: { bounds: [[-85.6, 30.4], [-80.8, 35.0]], center: [-83.2, 32.7], zoom: 6.0 },
    NC: { bounds: [[-84.3, 33.8], [-75.5, 36.6]], center: [-79.9, 35.2], zoom: 6.2 },
    WI: { bounds: [[-92.9, 42.5], [-86.8, 47.1]], center: [-89.8, 44.8], zoom: 5.8 },
    MD: { bounds: [[-79.5, 37.9], [-74.9, 39.8]], center: [-76.8, 38.9], zoom: 6.5 },
    PA: { bounds: [[-80.5, 39.7], [-74.7, 42.3]], center: [-77.7, 41.0], zoom: 6.0 },
    TX: { bounds: [[-106.7, 25.8], [-93.5, 36.5]], center: [-99.3, 31.4], zoom: 5.0 },
    OH: { bounds: [[-84.8, 38.4], [-80.5, 42.3]], center: [-82.7, 40.4], zoom: 6.3 },
    VA: { bounds: [[-83.7, 36.5], [-75.2, 39.5]], center: [-79.4, 37.9], zoom: 6.0 },
    FL: { bounds: [[-87.6, 24.4], [-80.0, 31.0]], center: [-83.5, 27.8], zoom: 5.5 },
    IL: { bounds: [[-91.5, 36.9], [-87.0, 42.5]], center: [-89.2, 40.0], zoom: 5.9 },
    NY: { bounds: [[-79.8, 40.5], [-71.8, 45.0]], center: [-75.5, 42.9], zoom: 6.0 },
    AZ: { bounds: [[-114.8, 31.3], [-109.0, 37.0]], center: [-111.7, 34.3], zoom: 6.0 },
    NJ: { bounds: [[-75.6, 38.9], [-74.0, 41.4]], center: [-74.6, 40.1], zoom: 7.5 },
    CO: { bounds: [[-109.1, 37.0], [-102.0, 41.0]], center: [-105.5, 39.0], zoom: 6.3 },
    MN: { bounds: [[-97.2, 43.5], [-89.5, 49.4]], center: [-93.9, 46.4], zoom: 5.8 },
  };
  const stateView = $derived(STATE_VIEW[statePo] ?? STATE_VIEW['MI']);

  const FILL_COLOR = [
    'case',
    ['==', ['get', 'won_by'], 'D'], '#4a90d9',
    ['==', ['get', 'won_by'], 'R'], '#e05c5c',
    '#ccc',
  ] as maplibregl.ExpressionSpecification;

  // Year boundary colors — avoids blue/red (used for party fills)
  // ~40° apart on the wheel: Yellow | Teal | Purple | Pink
  // Per-district boundary colors — 20 visually distinct hues, cycle with modulo.
  // Avoids the blue (#4a90d9) and red (#e05c5c) used for party fills.
  const DISTRICT_PALETTE = [
    '#fb923c','#fbbf24','#4ade80','#34d399','#22d3ee',
    '#38bdf8','#818cf8','#a78bfa','#e879f9','#f472b6',
    '#fdba74','#86efac','#6ee7b7','#67e8f9','#7dd3fc',
    '#c4b5fd','#f9a8d4','#fde68a','#d9f99d','#bbf7d0',
  ];
  // MapLibre match expression: district % palette_size → color
  const DISTRICT_COLOR_EXPR: maplibregl.ExpressionSpecification = (() => {
    const expr: any[] = ['match', ['%', ['to-number', ['get', 'district'], 0], DISTRICT_PALETTE.length]];
    DISTRICT_PALETTE.forEach((c, i) => expr.push(i, c));
    expr.push('#aaaaaa'); // fallback
    return expr as maplibregl.ExpressionSpecification;
  })();

  // Animation config
  const MORPH_MS       = 900;  // morph duration
  const MORPH_N        = 80;   // resampled vertices per ring
  const MAX_MATCH_DIST = 1.5;  // degrees; skip anim for bad centroid matches
  const MIN_DISP       = 0.025; // degrees; skip anim if district barely moved

  type Ring = [number, number][];

  type MatchedPair = {
    fromRing: Ring;
    toRing:   Ring;
    animate:  boolean;
    district: number;
  };

  // Swing overlay config
  const SWING_HOLD_MS = 900;  // extra hold after morph completes before fading out

  let container: HTMLDivElement;
  let map: maplibregl.Map;
  let protocol: Protocol;
  let prevYear: number | null = null;

  let morphRafId: number | null = null;
  let fitDebounceId: ReturnType<typeof setTimeout> | null = null;
  let resizeObserver: ResizeObserver;
  let morphTargetYear: number | null = null;
  let currBoundary: Array<[Ring, number]> | null = null; // [ring, districtNum] pairs currently drawn
  let swingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let swingVisible = false;                   // plain — must NOT be $state (read inside $effect via clearSwingOverlay)
  let swingMarkers: maplibregl.Marker[] = [];
  let swingLegendVisible = $state(false);    // $state only for the legend template

  let hoveredDistrict = $state<{ district: number | string; won_by: string; x: number; y: number } | null>(null);
  let hoveredPrecinct = $state<{ pct_d: number | null; d_votes: number; r_votes: number; x: number; y: number } | null>(null);

  // Precinct layer state — plain vars (not $state) to avoid tracking loops
  let precinctSourceLoaded = false;
  let precinctSourceState = stateL; // track which state's precincts are loaded

  // Precinct tiles exist from this zoom level (Tippecanoe min-zoom=5)
  const PRECINCT_MIN_ZOOM = 5;

  // Precinct data is only available for these cycle years
  const PRECINCT_CYCLE_YEARS = [2012, 2022];
  // Map selected year to the nearest available precinct cycle year (≤ selected)
  function precinctYear(year: number): number {
    const available = PRECINCT_CYCLE_YEARS.filter(y => y <= year);
    return available.length > 0 ? Math.max(...available) : PRECINCT_CYCLE_YEARS[0];
  }
  let precinctDisplayYear = $state(precinctYear(selectedYear));
  let mapZoom = $state(5); // updated on map zoom events; used to show "zoom in" hint

  // Legend state (reactive so the overlay updates)

  const geoCache = new Map<number, GeoJSON.FeatureCollection>();
  let computedBounds = $state<maplibregl.LngLatBoundsLike | null>(null);

  // ── Geometry helpers ────────────────────────────────────────────────────────

  function geoToBounds(fc: GeoJSON.FeatureCollection): maplibregl.LngLatBoundsLike {
    let w = Infinity, s = Infinity, e = -Infinity, n = -Infinity;
    function scan(c: unknown): void {
      if (!Array.isArray(c)) return;
      if (typeof c[0] === 'number') {
        w = Math.min(w, c[0] as number); e = Math.max(e, c[0] as number);
        s = Math.min(s, c[1] as number); n = Math.max(n, c[1] as number);
      } else { c.forEach(scan); }
    }
    fc.features.forEach(f => scan((f.geometry as GeoJSON.Polygon).coordinates));
    return [[w, s], [e, n]];
  }

  async function loadGeo(year: number): Promise<GeoJSON.FeatureCollection> {
    if (geoCache.has(year)) return geoCache.get(year)!;
    const res = await fetch(`/geo/${stateL}_${year}.geojson`);
    if (!res.ok) throw new Error(`geo load failed: ${res.status}`);
    const fc = await res.json() as GeoJSON.FeatureCollection;
    geoCache.set(year, fc);
    if (!computedBounds) computedBounds = geoToBounds(fc); // compute once per state mount
    return fc;
  }

  function primaryRing(geom: GeoJSON.Geometry): Ring {
    if (geom.type === 'Polygon') return geom.coordinates[0] as Ring;
    // MultiPolygon: largest bounding box
    let best: Ring = (geom as GeoJSON.MultiPolygon).coordinates[0][0] as Ring;
    let bestArea = 0;
    for (const poly of (geom as GeoJSON.MultiPolygon).coordinates) {
      const r = poly[0] as Ring;
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const [x, y] of r) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      const a = (x1 - x0) * (y1 - y0);
      if (a > bestArea) { bestArea = a; best = r; }
    }
    return best;
  }

  function allRings(fc: GeoJSON.FeatureCollection): Array<[Ring, number]> {
    const result: Array<[Ring, number]> = [];
    for (const feat of fc.features) {
      const d = typeof feat.properties?.district === 'number' ? feat.properties.district : 0;
      const g = feat.geometry as GeoJSON.Geometry;
      if (g.type === 'Polygon') result.push([g.coordinates[0] as Ring, d]);
      else if (g.type === 'MultiPolygon')
        for (const poly of (g as GeoJSON.MultiPolygon).coordinates) result.push([poly[0] as Ring, d]);
    }
    return result;
  }

  function centroid(ring: Ring): [number, number] {
    let x = 0, y = 0;
    for (const [px, py] of ring) { x += px; y += py; }
    return [x / ring.length, y / ring.length];
  }

  function resample(ring: Ring, n: number): Ring {
    const pts = (ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1])
      ? ring.slice(0, -1) : ring;
    const m = pts.length;
    const cum: number[] = [0];
    for (let i = 1; i < m; i++) {
      const dx = pts[i][0] - pts[i-1][0], dy = pts[i][1] - pts[i-1][1];
      cum.push(cum[i-1] + Math.sqrt(dx*dx + dy*dy));
    }
    const dx0 = pts[0][0] - pts[m-1][0], dy0 = pts[0][1] - pts[m-1][1];
    const total = cum[m-1] + Math.sqrt(dx0*dx0 + dy0*dy0);
    const result: Ring = [];
    for (let i = 0; i < n; i++) {
      const tgt = (i / n) * total;
      let lo = 0, hi = m - 1;
      while (lo < hi - 1) { const mid = (lo + hi) >> 1; if (cum[mid] <= tgt) lo = mid; else hi = mid; }
      const next = (lo + 1) % m;
      const segLen = next === 0 ? total - cum[lo] : cum[lo+1] - cum[lo];
      const t = segLen === 0 ? 0 : (tgt - cum[lo]) / segLen;
      result.push([pts[lo][0] + t*(pts[next][0]-pts[lo][0]), pts[lo][1] + t*(pts[next][1]-pts[lo][1])]);
    }
    result.push(result[0]);
    return result;
  }

  function easeInOut(t: number) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }

  // ── Swing coloring ──────────────────────────────────────────────────────────

  function computeSwingFeatures(
    fromFC: GeoJSON.FeatureCollection,
    toFC: GeoJSON.FeatureCollection,
  ): GeoJSON.Feature[] {
    const fromFeats = fromFC.features;
    const fromCents = fromFeats.map(f => centroid(primaryRing(f.geometry as GeoJSON.Geometry)));

    return toFC.features.map(toFeat => {
      const toGeom = toFeat.geometry as GeoJSON.Geometry;
      const tc = centroid(primaryRing(toGeom));

      let bestDist = Infinity, bestFi = -1;
      for (let fi = 0; fi < fromCents.length; fi++) {
        const d = Math.hypot(fromCents[fi][0] - tc[0], fromCents[fi][1] - tc[1]);
        if (d < bestDist) { bestDist = d; bestFi = fi; }
      }

      const toProp  = toFeat.properties ?? {};
      const fromProp = bestFi >= 0 && bestDist < MAX_MATCH_DIST
        ? (fromFeats[bestFi].properties ?? {}) : null;

      const toLean: number | null   = typeof toProp.partisan_lean_d  === 'number' ? toProp.partisan_lean_d  : null;
      const fromLean: number | null = fromProp && typeof fromProp.partisan_lean_d === 'number' ? fromProp.partisan_lean_d : null;
      const swing = toLean !== null && fromLean !== null ? toLean - fromLean : 0;

      const toWon   = (toProp.won_by   ?? '') as string;
      const fromWon = (fromProp?.won_by ?? '') as string;
      const flipped = fromProp !== null && toWon && fromWon && toWon !== fromWon ? 1 : 0;

      const abs = Math.abs(swing);
      // swing_dir: 1=D gained, -1=R gained, 0=negligible
      const swing_dir = abs < 0.02 ? 0 : swing > 0 ? 1 : -1;

      const fromPct = fromLean !== null ? Math.round(fromLean * 100) : null;
      const toPct   = toLean   !== null ? Math.round(toLean   * 100) : null;
      const swing_label = fromPct !== null && toPct !== null
        ? `${fromPct}% D → ${toPct}% D` : '';

      return {
        type: 'Feature' as const,
        properties: {
          swing_dir,
          swing_mag: abs,
          swing_label,
          flipped,
          flip_color: flipped
            ? (toWon === 'R' ? '#ef4444' : '#3b82f6')
            : '#00000000',
        },
        geometry: toGeom,
      };
    });
  }

  function clearSwingOverlay() {
    if (swingTimeoutId !== null) { clearTimeout(swingTimeoutId); swingTimeoutId = null; }
    if (!map?.getLayer('swing-fill')) return;
    map.setLayoutProperty('swing-fill', 'visibility', 'none');
    map.setPaintProperty('swing-fill', 'fill-opacity', 0.65); // reset for next show
    map.setLayoutProperty('flip-lines', 'visibility', 'none');
    map.setPaintProperty('flip-lines', 'line-opacity', 1);    // reset for next show
    for (const m of swingMarkers) m.remove(); // Marker.remove() unregisters from map
    swingMarkers = [];
    swingVisible = false;
    swingLegendVisible = false;
  }

  function showSwingOverlay(fromFC: GeoJSON.FeatureCollection, toFC: GeoJSON.FeatureCollection) {
    clearSwingOverlay();
    const features = computeSwingFeatures(fromFC, toFC);
    (map.getSource('swing') as maplibregl.GeoJSONSource).setData({
      type: 'FeatureCollection', features,
    });

    map.setLayoutProperty('swing-fill', 'visibility', 'visible');
    const hasFlips = features.some(f => f.properties?.flipped);
    if (hasFlips) map.setLayoutProperty('flip-lines', 'visibility', 'visible');

    // Show labels only for the most informative districts:
    // all flipped + top swingers by magnitude, capped at 6 total to avoid crowding.
    const flipped = features.filter(f => f.properties?.flipped === 1);
    const bigSwing = features
      .filter(f => f.properties?.flipped !== 1)
      .sort((a, b) => (b.properties?.swing_mag ?? 0) - (a.properties?.swing_mag ?? 0))
      .slice(0, Math.max(0, 6 - flipped.length));

    for (const feat of [...flipped, ...bigSwing]) {
      const label = feat.properties?.swing_label as string | undefined;
      if (!label) continue;
      const ring = primaryRing(feat.geometry as GeoJSON.Geometry);
      const [lng, lat] = centroid(ring);
      const el = document.createElement('div');
      el.className = 'swing-label';
      el.textContent = label;
      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([lng, lat])
        .addTo(map);
      swingMarkers.push(marker);
    }

    swingVisible = true;
    swingLegendVisible = true;
    // Overlay persists until the next year transition (clearSwingOverlay is called by cancelMorph)
  }

  // Rotate `from` so its starting vertex best aligns with `to` (minimises total
  // vertex-to-vertex distance). Eliminates cross-side morphing artifacts.
  function alignRing(from: Ring, to: Ring): Ring {
    const n = from.length - 1; // open length (closing vertex excluded)
    let bestK = 0, bestCost = Infinity;
    for (let k = 0; k < n; k++) {
      let cost = 0;
      for (let i = 0; i < n; i++) {
        const fi = (i + k) % n;
        const dx = from[fi][0] - to[i][0];
        const dy = from[fi][1] - to[i][1];
        cost += dx * dx + dy * dy;
        if (cost >= bestCost) break; // early exit
      }
      if (cost < bestCost) { bestCost = cost; bestK = k; }
    }
    if (bestK === 0) return from;
    const open = from.slice(0, n);
    const rotated = [...open.slice(bestK), ...open.slice(0, bestK)] as Ring;
    rotated.push(rotated[0]);
    return rotated;
  }

  // ── District matching ───────────────────────────────────────────────────────

  function matchDistricts(fromFC: GeoJSON.FeatureCollection, toFC: GeoJSON.FeatureCollection): MatchedPair[] {
    const fromRings = fromFC.features.map(f => resample(primaryRing(f.geometry as GeoJSON.Geometry), MORPH_N));
    const toRings   = toFC.features.map(f  => resample(primaryRing(f.geometry as GeoJSON.Geometry), MORPH_N));
    const fromCents = fromRings.map(centroid);
    const toCents   = toRings.map(centroid);

    return toFC.features.map((toFeat, ti) => {
      const tc = toCents[ti];
      let bestDist = Infinity, bestFi = -1;
      for (let fi = 0; fi < fromCents.length; fi++) {
        const d = Math.hypot(fromCents[fi][0] - tc[0], fromCents[fi][1] - tc[1]);
        if (d < bestDist) { bestDist = d; bestFi = fi; }
      }

      const toRing     = toRings[ti];
      const rawFrom    = bestFi >= 0 && bestDist < MAX_MATCH_DIST ? fromRings[bestFi] : toRing;
      // Rotate fromRing so nearest vertices correspond, preventing cross-side morphing
      const fromRing   = bestFi >= 0 && bestDist < MAX_MATCH_DIST ? alignRing(rawFrom, toRing) : toRing;
      const maxDisp    = fromRing.reduce((mx, p, i) =>
        Math.max(mx, Math.hypot(toRing[i][0] - p[0], toRing[i][1] - p[1])), 0);
      const district   = typeof toFeat.properties?.district === 'number' ? toFeat.properties.district : ti + 1;

      return { fromRing, toRing, animate: bestFi >= 0 && bestDist < MAX_MATCH_DIST && maxDisp >= MIN_DISP, district };
    });
  }

  // ── Morph animation ─────────────────────────────────────────────────────────

  function cancelMorphRaf() {
    if (morphRafId !== null) { cancelAnimationFrame(morphRafId); morphRafId = null; }
  }

  function cancelMorph() {
    cancelMorphRaf();
    clearSwingOverlay();
  }

  function startMorph(pairs: MatchedPair[], onDone: () => void) {
    cancelMorphRaf(); // cancel RAF only — don't clear swing overlay
    const source = map.getSource('draw') as maplibregl.GeoJSONSource;
    const start  = performance.now();

    function frame(now: number) {
      const raw = Math.min(1, (now - start) / MORPH_MS);
      const t   = easeInOut(raw);

      source.setData({
        type: 'FeatureCollection',
        features: pairs.map(({ fromRing, toRing, animate, district }) => {
          const ring: Ring = animate
            ? fromRing.map((p, i) => [p[0] + (toRing[i][0] - p[0]) * t, p[1] + (toRing[i][1] - p[1]) * t])
            : toRing;
          return { type: 'Feature', properties: { district }, geometry: { type: 'LineString', coordinates: ring } };
        }),
      });

      if (raw < 1) {
        morphRafId = requestAnimationFrame(frame);
      } else {
        morphRafId = null;
        onDone();
      }
    }
    morphRafId = requestAnimationFrame(frame);
  }

  // ── Year transition ─────────────────────────────────────────────────────────

  function ringsToFC(entries: Array<[Ring, number]>): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: entries.map(([ring, district]) => ({
        type: 'Feature', properties: { district },
        geometry: { type: 'LineString', coordinates: ring },
      })),
    };
  }

  async function transitionBoundary(fromYear: number, toYear: number) {
    morphTargetYear = toYear;
    let fromFC: GeoJSON.FeatureCollection, toFC: GeoJSON.FeatureCollection;
    try {
      [fromFC, toFC] = await Promise.all([loadGeo(fromYear), loadGeo(toYear)]);
    } catch (e) {
      console.warn('geo load failed:', e);
      return;
    }
    if (morphTargetYear !== toYear) return;

    // Show chrono-previous boundaries as dashed reference (always from GeoJSON, not nav history)
    const fromEntries = allRings(fromFC).map(([r, d]) => [resample(r, MORPH_N), d] as [Ring, number]);
    (map.getSource('prev') as maplibregl.GeoJSONSource).setData(ringsToFC(fromEntries));
    map.setLayoutProperty('prev-lines', 'visibility', 'visible');

    const pairs = matchDistricts(fromFC, toFC);

    showSwingOverlay(fromFC, toFC);

    startMorph(pairs, () => {
      if (morphTargetYear !== toYear) return;
      currBoundary = allRings(toFC).map(([r, d]) => [resample(r, MORPH_N), d] as [Ring, number]);
    });
  }

  function setYearFilter(year: number) {
    if (!map?.isStyleLoaded() || !map.getLayer('districts-fill-front')) return;

    cancelMorph();
    const fromYear = chronoPrevYear(year);

    // Ghost fill → always the chrono-prior year (or hidden if none)
    if (map.getLayer('districts-fill-back')) {
      if (fromYear !== null) {
        map.setFilter('districts-fill-back', ['==', ['get', 'cycle_year'], fromYear]);
        map.setPaintProperty('districts-fill-back', 'fill-opacity', 0.14);
      } else {
        map.setPaintProperty('districts-fill-back', 'fill-opacity', 0);
      }
    }

    // Main fill — instant switch, no crossfade
    map.setFilter('districts-fill-front', ['==', ['get', 'cycle_year'], year]);
    map.setPaintProperty('districts-fill-front', 'fill-opacity', 0.65);

    if (map.getLayer('districts-hover'))
      map.setFilter('districts-hover', ['==', ['get', 'cycle_year'], year]);

    if (prevYear !== year) {
      if (prevYear !== null && fromYear !== null) {
        // User changed year: animate the transition and show the swing overlay
        transitionBoundary(fromYear, year);
      } else {
        // Initial render (prevYear === null) or first cycle year (fromYear === null):
        // draw boundaries statically — no swing overlay, so party fill is visible immediately
        map.setLayoutProperty('prev-lines', 'visibility', 'none');
        loadGeo(year).then(fc => {
          if (morphTargetYear !== null && morphTargetYear !== year) return;
          const entries = allRings(fc).map(([r, d]) => [resample(r, MORPH_N), d] as [Ring, number]);
          (map.getSource('draw') as maplibregl.GeoJSONSource).setData(ringsToFC(entries));
          currBoundary = entries;
        });
      }
    }

    prevYear = year;
  }

  // ── Fit map to state bounds ─────────────────────────────────────────────────

  function fitToState(duration = 700) {
    if (fitDebounceId !== null) clearTimeout(fitDebounceId);
    fitDebounceId = setTimeout(() => {
      fitDebounceId = null;
      if (!map?.loaded()) return;
      map.resize();
      map.fitBounds(computedBounds ?? stateView.bounds, {
        // Canvas always fills the full viewport; use bottom padding to keep
        // the state's lower edge clear of the floating bottom panel.
        padding: { top: 30, right: 30, bottom: panelBottom > 0 ? panelBottom + 20 : 30, left: panelLeft > 0 ? panelLeft + 20 : 30 },
        duration,
        essential: true,
      });
    }, 20);
  }

  // Refit once with accurate bounds as soon as the first GeoJSON loads.
  $effect(() => {
    const bounds = computedBounds;
    if (!bounds || !map?.loaded()) return;
    fitToState(400);
  });

  // Refit when the panel height changes (canvas size unchanged, padding changes).
  $effect(() => {
    const _pb = panelBottom;
    if (!map?.loaded()) return;
    fitToState();
  });

  // ── Basemap theme switching ──────────────────────────────────────────────────

  $effect(() => {
    const dark = darkMode;
    if (!map?.isStyleLoaded()) return;
    const src = map.getSource('carto-light') as maplibregl.RasterTileSource | undefined;
    if (!src) return;
    src.setTiles([dark
      ? 'https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
      : 'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    ]);
  });

  $effect(() => { setYearFilter(selectedYear); });

  // ── Precinct layer ──────────────────────────────────────────────────────────

  const PRECINCT_FILL_COLOR: maplibregl.ExpressionSpecification = [
    'interpolate', ['linear'],
    ['coalesce', ['get', 'pct_d'], 0.5],
    0.0,  '#b91c1c',  // strong R — deep red
    0.40, '#f87171',  // lean R
    0.50, '#d1d5db',  // toss-up — neutral gray
    0.60, '#93c5fd',  // lean D
    1.0,  '#1d4ed8',  // strong D — deep blue
  ] as maplibregl.ExpressionSpecification;

  async function loadPrecinctSource(): Promise<void> {
    if (!map?.isStyleLoaded()) return;
    const tilesPath = `/tiles/${stateL}_precincts.pmtiles`;

    // Preload as ArrayBuffer — Cloudflare Pages doesn't serve range requests
    // with proper Content-Length, so pmtiles:// URL alone won't work.
    // Fetch the full file on first toggle and serve it from memory.
    onPrecinctLoadingChange?.(true);
    try {
      const resp = await fetch(tilesPath);
      if (!resp.ok) {
        console.info(`Precinct tiles not found for ${stateL} — skipping.`);
        return;
      }
      const buf = await resp.arrayBuffer();
      const bufferSource = {
        getKey: () => tilesPath,
        getBytes: async (offset: number, length: number) => ({
          data: buf.slice(offset, offset + length) as ArrayBuffer,
        }),
      };
      protocol.add(new PMTiles(bufferSource as any));

      if (!map.getSource('state-precincts')) {
        map.addSource('state-precincts', {
          type: 'vector',
          url: `pmtiles://${tilesPath}`,
        });

        const layerName = `${stateL}_precincts`;
        const initYear = precinctYear(selectedYear);

        // Precinct fill — sits between district fill and boundary layers
        map.addLayer({
          id: 'precincts-fill',
          type: 'fill',
          source: 'state-precincts',
          'source-layer': layerName,
          filter: ['==', ['get', 'cycle_year'], initYear],
          layout: { visibility: 'none' },
          paint: {
            'fill-color': PRECINCT_FILL_COLOR,
            'fill-opacity': 0.82,
          },
        }, 'swing-fill'); // insert below swing overlay

        // Thin precinct boundary lines for context
        map.addLayer({
          id: 'precincts-lines',
          type: 'line',
          source: 'state-precincts',
          'source-layer': layerName,
          filter: ['==', ['get', 'cycle_year'], initYear],
          layout: { visibility: 'none' },
          paint: {
            'line-color': 'rgba(0,0,0,0.12)',
            'line-width': 0.4,
          },
        }, 'swing-fill');

        // Precinct hover
        map.on('mousemove', 'precincts-fill', (e) => {
          if (!e.features?.length) return;
          const p = e.features[0].properties;
          map.getCanvas().style.cursor = 'crosshair';
          hoveredPrecinct = {
            pct_d: typeof p?.pct_d === 'number' ? p.pct_d : null,
            d_votes: p?.d_votes ?? 0,
            r_votes: p?.r_votes ?? 0,
            x: e.point.x,
            y: e.point.y,
          };
        });
        map.on('mouseleave', 'precincts-fill', () => {
          map.getCanvas().style.cursor = '';
          hoveredPrecinct = null;
        });
      }

      precinctSourceLoaded = true;
      precinctSourceState = stateL;

      // The $effect that called us already returned early (async gap), so it
      // won't re-run to apply visibility. Do it directly here instead.
      if (showPrecincts && map.getLayer('precincts-fill')) {
        const pYear = precinctYear(selectedYear);
        precinctDisplayYear = pYear;
        map.setLayoutProperty('precincts-fill', 'visibility', 'visible');
        map.setLayoutProperty('precincts-lines', 'visibility', 'visible');
        map.setFilter('precincts-fill', ['==', ['get', 'cycle_year'], pYear]);
        map.setFilter('precincts-lines', ['==', ['get', 'cycle_year'], pYear]);
        map.setPaintProperty('districts-fill-front', 'fill-opacity', 0);
        map.setPaintProperty('districts-fill-back', 'fill-opacity', 0);
        if (map.getZoom() < PRECINCT_MIN_ZOOM)
          map.easeTo({ zoom: PRECINCT_MIN_ZOOM, duration: 900, essential: true });
      }
    } finally {
      onPrecinctLoadingChange?.(false);
    }
  }

  // Show/hide precinct layer and dim district fill when active
  $effect(() => {
    const show = showPrecincts;
    const showD = showDistricts;
    if (!map?.isStyleLoaded()) return;

    // Reset if state changed since precincts were loaded
    if (precinctSourceLoaded && precinctSourceState !== stateL) {
      precinctSourceLoaded = false;
    }

    if (show) {
      if (!precinctSourceLoaded) {
        loadPrecinctSource();
        return;
      }
      if (map.getLayer('precincts-fill')) {
        const pYear = precinctYear(selectedYear);
        precinctDisplayYear = pYear;
        map.setLayoutProperty('precincts-fill', 'visibility', 'visible');
        map.setLayoutProperty('precincts-lines', 'visibility', 'visible');
        map.setFilter('precincts-fill', ['==', ['get', 'cycle_year'], pYear]);
        map.setFilter('precincts-lines', ['==', ['get', 'cycle_year'], pYear]);
        // Dim district fill so precinct coloring reads clearly
        map.setPaintProperty('districts-fill-front', 'fill-opacity', 0);
        map.setPaintProperty('districts-fill-back', 'fill-opacity', 0);
        if (map.getZoom() < PRECINCT_MIN_ZOOM)
          map.easeTo({ zoom: PRECINCT_MIN_ZOOM, duration: 900, essential: true });
      }
    } else {
      if (map.getLayer('precincts-fill')) {
        map.setLayoutProperty('precincts-fill', 'visibility', 'none');
        map.setLayoutProperty('precincts-lines', 'visibility', 'none');
      }
      hoveredPrecinct = null;
      // Restore district fill opacity (respect showDistricts)
      map.setPaintProperty('districts-fill-front', 'fill-opacity', showD ? 0.65 : 0);
      const fromYear = chronoPrevYear(selectedYear);
      if (fromYear !== null)
        map.setPaintProperty('districts-fill-back', 'fill-opacity', showD ? 0.14 : 0);
    }
    // Hide boundary lines when districts are toggled off
    for (const id of ['draw-glow', 'draw-lines']) {
      if (map.getLayer(id))
        map.setLayoutProperty(id, 'visibility', showD ? 'visible' : 'none');
    }
  });

  // ── Map init ─────────────────────────────────────────────────────────────────

  onMount(async () => {
    protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile.bind(protocol));

    // Pre-load the PMTiles file as a single full fetch to avoid HTTP range
    // requests, which Cloudflare Pages doesn't serve with proper Content-Length.
    // The PMTiles library is then served from an in-memory ArrayBuffer.
    const tilesPath = `/tiles/${stateL}_districts.pmtiles`;
    try {
      const resp = await fetch(tilesPath);
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        // Implement the PMTiles Source interface backed by the in-memory buffer
        const bufferSource = {
          getKey: () => tilesPath,
          getBytes: async (offset: number, length: number) => ({
            data: buf.slice(offset, offset + length) as ArrayBuffer,
          }),
        };
        protocol.add(new PMTiles(bufferSource as any));
      }
    } catch (e) {
      console.warn('PMTiles preload failed; range requests will be used as fallback:', e);
    }

    map = new maplibregl.Map({
      container,
      style: {
        version: 8,
        sources: {
          'carto-light': {
            type: 'raster',
            tiles: [darkMode
                ? 'https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
                : 'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors © CARTO',
          },
        },
        layers: [{ id: 'basemap', type: 'raster', source: 'carto-light' }],
      },
      bounds: stateView.bounds,
      fitBoundsOptions: {
        padding: { top: 30, right: 30, bottom: panelBottom > 0 ? panelBottom + 20 : 30, left: panelLeft > 0 ? panelLeft + 20 : 30 },
      },
      preserveDrawingBuffer: true,
    } as maplibregl.MapOptions & { preserveDrawingBuffer: boolean });

    // Refit whenever the canvas changes size (panel toggle, window resize).
    resizeObserver = new ResizeObserver(() => fitToState());
    resizeObserver.observe(container);

    if (!window.matchMedia('(max-width: 640px)').matches)
      map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('zoom', () => { mapZoom = map.getZoom(); });

    map.on('load', () => {
      map.addSource('state-districts', {
        type: 'vector',
        url: `pmtiles:///tiles/${stateL}_districts.pmtiles`,
      });

      const emptyFC: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: [] };
      map.addSource('prev', { type: 'geojson', data: emptyFC });
      map.addSource('draw', { type: 'geojson', data: emptyFC });
      map.addSource('swing', { type: 'geojson', data: emptyFC });

      // 1. Ghost fill (previous year, very faint)
      map.addLayer({
        id: 'districts-fill-back',
        type: 'fill',
        source: 'state-districts',
        'source-layer': `${stateL}_districts`,
        filter: ['==', ['get', 'cycle_year'], selectedYear],
        paint: {
          'fill-color': FILL_COLOR,
          'fill-opacity': 0,
        },
      });

      // 2. Main fill (current year)
      map.addLayer({
        id: 'districts-fill-front',
        type: 'fill',
        source: 'state-districts',
        'source-layer': `${stateL}_districts`,
        filter: ['==', ['get', 'cycle_year'], selectedYear],
        paint: {
          'fill-color': FILL_COLOR,
          'fill-opacity': 0.65,
        },
      });

      // 3. Swing overlay fill — colored by partisan swing, shown during transition.
      // Visibility is toggled via layout property (setLayoutProperty) rather than fill-opacity,
      // because MapLibre skips opacity transitions when the map is in idle state.
      map.addLayer({
        id: 'swing-fill',
        type: 'fill',
        source: 'swing',
        layout: { visibility: 'none' },
        paint: {
          'fill-color': ['case',
            ['==', ['get', 'swing_dir'],  1], '#4a90d9',
            ['==', ['get', 'swing_dir'], -1], '#e05c5c',
            '#808080',
          ] as maplibregl.ExpressionSpecification,
          'fill-opacity': 0.65,
        },
      });

      // 3b. Flip indicators — thick colored outline on districts that changed party
      map.addLayer({
        id: 'flip-lines',
        type: 'line',
        source: 'swing',
        filter: ['==', ['get', 'flipped'], 1],
        layout: { visibility: 'none', 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': ['get', 'flip_color'],
          'line-width': 3.5,
          'line-opacity': 1,
        },
      });

      // 4. Previous year boundaries — dashed, same district colors at lower opacity
      map.addLayer({
        id: 'prev-lines',
        type: 'line',
        source: 'prev',
        layout: { visibility: 'none', 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': DISTRICT_COLOR_EXPR,
          'line-width': 1.5,
          'line-opacity': 0.5,
          'line-dasharray': [4, 3],
        },
      });

      // 4a. Glow halo — wide blurred version of the current boundary
      map.addLayer({
        id: 'draw-glow',
        type: 'line',
        source: 'draw',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': DISTRICT_COLOR_EXPR,
          'line-width': 12,
          'line-blur': 8,
          'line-opacity': 0.28,
        },
      });

      // 4b. Current year boundaries — solid, slightly thicker
      map.addLayer({
        id: 'draw-lines',
        type: 'line',
        source: 'draw',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': DISTRICT_COLOR_EXPR,
          'line-width': 2.5,
          'line-opacity': 1,
        },
      });

      // 5. Hover highlight
      let hoveredId: string | number | undefined;
      map.addLayer({
        id: 'districts-hover',
        type: 'fill',
        source: 'state-districts',
        'source-layer': `${stateL}_districts`,
        filter: ['==', ['get', 'cycle_year'], selectedYear],
        paint: {
          'fill-color': '#000',
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.15, 0],
        },
      });

      map.on('mousemove', 'districts-fill-front', (e) => {
        if (!e.features?.length) return;
        if (hoveredId !== undefined)
          map.setFeatureState({ source: 'state-districts', sourceLayer: `${stateL}_districts`, id: hoveredId }, { hover: false });
        hoveredId = e.features[0].id;
        map.setFeatureState({ source: 'state-districts', sourceLayer: `${stateL}_districts`, id: hoveredId }, { hover: true });
        map.getCanvas().style.cursor = 'pointer';
        const p = e.features[0].properties;
        hoveredDistrict = { district: p?.district ?? '?', won_by: p?.won_by ?? '', x: e.point.x, y: e.point.y };
      });

      map.on('mouseleave', 'districts-fill-front', () => {
        if (hoveredId !== undefined)
          map.setFeatureState({ source: 'state-districts', sourceLayer: `${stateL}_districts`, id: hoveredId }, { hover: false });
        hoveredId = undefined;
        map.getCanvas().style.cursor = '';
        hoveredDistrict = null;
      });

      let clickedDistrict = false;

      map.on('click', 'districts-fill-front', (e) => {
        if (!e.features?.length) return;
        clickedDistrict = true;
        const p = e.features[0].properties ?? {};
        onDistrictClick?.({
          district: p.district,
          won_by: p.won_by ?? '',
          partisan_lean_d: typeof p.partisan_lean_d === 'number' ? p.partisan_lean_d : null,
          cycle_year: p.cycle_year ?? selectedYear,
          x: e.point.x,
          y: e.point.y,
        });
      });

      map.on('click', () => {
        if (clickedDistrict) { clickedDistrict = false; return; }
        onMapClick?.();
      });

      map.once('idle', () => setYearFilter(selectedYear));
    });
  });

  onDestroy(() => {
    resizeObserver?.disconnect();
    cancelMorph();
    map?.remove();
    if (protocol) maplibregl.removeProtocol('pmtiles');
  });

  export function takeScreenshot(statePo: string, year: number) {
    if (!map) return;
    // MapLibre preserveDrawingBuffer must be true for canvas capture — it is set in onMount.
    // Use an offscreen canvas to composite the map with a watermark.
    const src = map.getCanvas();
    const out = document.createElement('canvas');
    out.width  = src.width;
    out.height = src.height;
    const ctx = out.getContext('2d')!;

    ctx.drawImage(src, 0, 0);

    // Watermark — bottom-right, semi-transparent
    const dpr    = window.devicePixelRatio || 1;
    const pad    = 12 * dpr;
    const fSize  = 13 * dpr;
    ctx.font         = `600 ${fSize}px system-ui, sans-serif`;
    ctx.textBaseline = 'bottom';
    ctx.textAlign    = 'right';

    const label = `${statePo} · ${year} · districtdrift.org`;
    const tw    = ctx.measureText(label).width;
    const x     = out.width  - pad;
    const y     = out.height - pad;

    // Pill background
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    const bpad = 6 * dpr;
    ctx.beginPath();
    ctx.roundRect(x - tw - bpad, y - fSize - bpad, tw + bpad * 2, fSize + bpad * 2, 4 * dpr);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillText(label, x, y);

    out.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href     = url;
      a.download = `districtdrift-${statePo.toLowerCase()}-${year}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  /** Returns a small JPEG data URL for attaching to feedback. No watermark. */
  export function captureDataUrl(): string | null {
    if (!map) return null;
    const src = map.getCanvas();
    const maxW = 600;
    const scale = Math.min(1, maxW / src.width);
    const out = document.createElement('canvas');
    out.width  = Math.round(src.width  * scale);
    out.height = Math.round(src.height * scale);
    out.getContext('2d')!.drawImage(src, 0, 0, out.width, out.height);
    return out.toDataURL('image/jpeg', 0.75);
  }
</script>

<div class="map-wrap">
  <div bind:this={container} class="map-canvas"></div>

  {#if hoveredDistrict && !showPrecincts}
    <div
      class="district-tooltip"
      class:d={hoveredDistrict.won_by === 'D'}
      class:r={hoveredDistrict.won_by === 'R'}
      style="left:{hoveredDistrict.x + 14}px; top:{hoveredDistrict.y}px"
    >District {hoveredDistrict.district}</div>
  {/if}

  {#if hoveredPrecinct && showPrecincts}
    {@const pct = hoveredPrecinct.pct_d}
    {@const tooltipRight = hoveredPrecinct.x > 500}
    <div
      class="precinct-tooltip"
      style="left:{hoveredPrecinct.x + (tooltipRight ? -10 : 14)}px; top:{hoveredPrecinct.y}px; {tooltipRight ? 'transform:translateX(-100%) translateY(calc(-100% - 8px))' : 'transform:translateY(calc(-100% - 8px))'}"
    >
      {#if pct !== null}
        <span class="pt-pct" class:pt-d={pct > 0.5} class:pt-r={pct <= 0.5}>
          {pct > 0.5 ? 'D' : 'R'} +{Math.round(Math.abs(pct - 0.5) * 200)}%
        </span>
      {/if}
      <span class="pt-votes">{hoveredPrecinct.d_votes.toLocaleString()}D / {hoveredPrecinct.r_votes.toLocaleString()}R</span>
    </div>
  {/if}

  {#if showPrecincts}
    <div class="precinct-legend">
      <div class="precinct-legend-bar"></div>
      <div class="precinct-legend-labels">
        <span>R</span><span>Neutral</span><span>D</span>
      </div>
      {#if precinctDisplayYear !== selectedYear}
        <div class="precinct-legend-note">Precinct data: {precinctDisplayYear}</div>
      {/if}
    </div>
    {#if mapZoom < PRECINCT_MIN_ZOOM}
      <div class="precinct-zoom-hint">Zoom in to see precinct data</div>
    {/if}
  {/if}

</div>

<style>
  .map-wrap   { position: relative; width: 100%; height: 100%; touch-action: none; }
  .map-canvas { width: 100%; height: 100%; }

  .district-tooltip {
    position: absolute;
    transform: translateY(calc(-100% - 8px));
    background: rgba(12, 12, 22, 0.9);
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 0.3rem 0.75rem;
    border-radius: 6px;
    pointer-events: none;
    white-space: nowrap;
    border-left: 3px solid rgba(255,255,255,0.25);
    box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    z-index: 20;
  }
  .district-tooltip.d { border-left-color: #4a90d9; }
  .district-tooltip.r { border-left-color: #e05c5c; }

  .precinct-tooltip {
    position: absolute;
    background: rgba(12, 12, 22, 0.92);
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
  .pt-pct { font-weight: 700; font-size: 0.8rem; }
  .pt-pct.pt-d { color: #93c5fd; }
  .pt-pct.pt-r { color: #fca5a5; }
  .pt-votes { opacity: 0.65; font-size: 0.68rem; }

  .precinct-legend {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    pointer-events: none;
  }
  .precinct-legend-bar {
    width: 180px;
    height: 9px;
    border-radius: 4px;
    background: linear-gradient(to right, #b91c1c, #f87171, #d1d5db, #93c5fd, #1d4ed8);
  }
  .precinct-legend-labels {
    display: flex;
    justify-content: space-between;
    width: 180px;
    font-size: 0.62rem;
    color: var(--text-muted);
  }
  .precinct-legend-note {
    font-size: 0.6rem;
    color: var(--text-muted);
    opacity: 0.7;
    text-align: center;
    margin-top: 0.2rem;
  }
  .precinct-zoom-hint {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(12, 14, 28, 0.82);
    backdrop-filter: blur(10px);
    color: rgba(255,255,255,0.82);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.12);
    pointer-events: none;
    white-space: nowrap;
  }


  :global(.swing-label) {
    background: none;
    color: #111;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    white-space: nowrap;
    pointer-events: none;
    line-height: 1.3;
    text-shadow:
      -1px -1px 0 #fff,  1px -1px 0 #fff,
      -1px  1px 0 #fff,  1px  1px 0 #fff,
      0 0 6px rgba(255,255,255,0.8);
  }

  :global([data-theme=dark] .swing-label) {
    color: #f0f0f0;
    text-shadow:
      -1px -1px 0 #000,  1px -1px 0 #000,
      -1px  1px 0 #000,  1px  1px 0 #000,
      0 0 6px rgba(0,0,0,0.9);
  }


  .legend-swing-bar {
    display: block;
    width: 32px;
    height: 5px;
    border-radius: 3px;
    flex-shrink: 0;
    background: linear-gradient(
      to right,
      rgba(74,144,217,0.7),
      rgba(128,128,128,0.15),
      rgba(224,92,92,0.7)
    );
  }
</style>
