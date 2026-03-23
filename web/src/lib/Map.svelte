<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import maplibregl from 'maplibre-gl';
  import { Protocol } from 'pmtiles';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let { selectedYear = 2022, fadeDuration = 450, panelBottom = 0, statePo = 'MI', cycleYears = [1992, 2002, 2012, 2022] }: {
    selectedYear?: number;
    fadeDuration?: number;
    panelBottom?: number;
    statePo?: string;
    cycleYears?: number[];
  } = $props();

  // Year immediately before `year` in the cycle sequence, or null if it's the first.
  function chronoPrevYear(year: number): number | null {
    const idx = cycleYears.indexOf(year);
    return idx > 0 ? cycleYears[idx - 1] : null;
  }

  const stateL = statePo.toLowerCase();

  const STATE_VIEW: Record<string, { bounds: maplibregl.LngLatBoundsLike; center: [number, number]; zoom: number }> = {
    MI: { bounds: [[-90.5, 41.7], [-82.1, 48.3]], center: [-84.5, 44.5], zoom: 5.5 },
    NC: { bounds: [[-84.3, 33.8], [-75.5, 36.6]], center: [-79.9, 35.2], zoom: 6.2 },
  };
  const stateView = STATE_VIEW[statePo] ?? STATE_VIEW['MI'];

  const FILL_COLOR = [
    'case',
    ['==', ['get', 'won_by'], 'D'], '#4a90d9',
    ['==', ['get', 'won_by'], 'R'], '#e05c5c',
    '#ccc',
  ] as maplibregl.ExpressionSpecification;

  // Year boundary colors — avoids blue/red (used for party fills)
  // ~40° apart on the wheel: Yellow | Teal | Purple | Pink
  const YEAR_LINE_COLOR: Record<number, string> = {
    1992: '#CA8A04',  // yellow-gold  (~43°)
    2002: '#0D9488',  // teal         (~177°)
    2012: '#9333EA',  // purple       (~272°)
    2022: '#DB2777',  // pink         (~328°)
  };
  const lineColor = (y: number) => YEAR_LINE_COLOR[y] ?? '#e2e8f0';

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
  };

  // Swing overlay config
  const SWING_HOLD_MS = 900;  // extra hold after morph completes before fading out

  let container: HTMLDivElement;
  let map: maplibregl.Map;
  let protocol: Protocol;
  let prevYear: number | null = null;

  let morphRafId: number | null = null;
  let morphTargetYear: number | null = null;
  let currBoundary: Ring[] | null = null; // rings currently drawn on screen
  let swingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let swingVisible = $state(false);

  // Legend state (reactive so the overlay updates)
  let legendCurrYear = $state(0);
  let legendPrevYear = $state<number | null>(null);

  const yearDisplay = tweened(0, { duration: MORPH_MS, easing: cubicInOut });
  let yearDisplayReady = false;
  $effect(() => {
    const y = legendCurrYear;
    yearDisplay.set(y, yearDisplayReady ? undefined : { duration: 0 });
    yearDisplayReady = true;
  });

  const geoCache = new Map<number, GeoJSON.FeatureCollection>();

  // ── Geometry helpers ────────────────────────────────────────────────────────

  async function loadGeo(year: number): Promise<GeoJSON.FeatureCollection> {
    if (geoCache.has(year)) return geoCache.get(year)!;
    const res = await fetch(`/geo/${stateL}_${year}.geojson`);
    if (!res.ok) throw new Error(`geo load failed: ${res.status}`);
    const fc = await res.json() as GeoJSON.FeatureCollection;
    geoCache.set(year, fc);
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

  function allRings(fc: GeoJSON.FeatureCollection): Ring[] {
    const rings: Ring[] = [];
    for (const feat of fc.features) {
      const g = feat.geometry as GeoJSON.Geometry;
      if (g.type === 'Polygon') rings.push(g.coordinates[0] as Ring);
      else if (g.type === 'MultiPolygon')
        for (const poly of (g as GeoJSON.MultiPolygon).coordinates) rings.push(poly[0] as Ring);
    }
    return rings;
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

  // swing > 0: D gained share; swing < 0: R gained share
  function swingFillColor(swing: number): string {
    const abs = Math.abs(swing);
    if (abs < 0.02) return 'rgba(128,128,128,0.04)';
    const intensity = Math.min(1, abs / 0.15);        // saturates at ±15%
    const opacity = (0.12 + intensity * 0.48).toFixed(2);
    return swing > 0
      ? `rgba(74,144,217,${opacity})`   // D gained: blue
      : `rgba(224,92,92,${opacity})`;   // R gained: red
  }

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

      return {
        type: 'Feature' as const,
        properties: {
          swing_color: swingFillColor(swing),
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
    if (!map?.getLayer('mi-swing-fill')) return;
    map.setPaintProperty('mi-swing-fill', 'fill-opacity', 0);
    map.setPaintProperty('mi-flip-lines', 'line-opacity', 0);
    swingVisible = false;
  }

  function showSwingOverlay(fromFC: GeoJSON.FeatureCollection, toFC: GeoJSON.FeatureCollection) {
    clearSwingOverlay();
    const features = computeSwingFeatures(fromFC, toFC);
    (map.getSource('mi-swing') as maplibregl.GeoJSONSource).setData({
      type: 'FeatureCollection', features,
    });
    map.setPaintProperty('mi-swing-fill', 'fill-opacity', 1);
    const hasFlips = features.some(f => f.properties?.flipped);
    if (hasFlips) map.setPaintProperty('mi-flip-lines', 'line-opacity', 0.9);
    swingVisible = true;

    swingTimeoutId = setTimeout(() => {
      if (!map?.getLayer('mi-swing-fill')) return;
      map.setPaintProperty('mi-swing-fill', 'fill-opacity', 0);
      map.setPaintProperty('mi-flip-lines', 'line-opacity', 0);
      swingVisible = false;
      swingTimeoutId = null;
    }, MORPH_MS + SWING_HOLD_MS);
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

    return toFC.features.map((_, ti) => {
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

      return { fromRing, toRing, animate: bestFi >= 0 && bestDist < MAX_MATCH_DIST && maxDisp >= MIN_DISP };
    });
  }

  // ── Morph animation ─────────────────────────────────────────────────────────

  function cancelMorph() {
    if (morphRafId !== null) { cancelAnimationFrame(morphRafId); morphRafId = null; }
    clearSwingOverlay();
  }

  function startMorph(pairs: MatchedPair[], onDone: () => void) {
    cancelMorph();
    const source = map.getSource('mi-draw') as maplibregl.GeoJSONSource;
    const start  = performance.now();

    function frame(now: number) {
      const raw = Math.min(1, (now - start) / MORPH_MS);
      const t   = easeInOut(raw);

      source.setData({
        type: 'FeatureCollection',
        features: pairs.map(({ fromRing, toRing, animate }) => {
          const ring: Ring = animate
            ? fromRing.map((p, i) => [p[0] + (toRing[i][0] - p[0]) * t, p[1] + (toRing[i][1] - p[1]) * t])
            : toRing;
          return { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: ring } };
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

  function ringsToFC(rings: Ring[]): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: rings.map(ring => ({
        type: 'Feature', properties: {},
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
    const fromRings = allRings(fromFC).map(r => resample(r, MORPH_N));
    (map.getSource('mi-prev') as maplibregl.GeoJSONSource).setData(ringsToFC(fromRings));
    map.setPaintProperty('mi-prev-lines', 'line-color', lineColor(fromYear));
    map.setLayoutProperty('mi-prev-lines', 'visibility', 'visible');

    map.setPaintProperty('mi-draw-lines', 'line-color', lineColor(toYear));
    map.setPaintProperty('mi-draw-glow',  'line-color', lineColor(toYear));
    const pairs = matchDistricts(fromFC, toFC);

    showSwingOverlay(fromFC, toFC);

    startMorph(pairs, () => {
      if (morphTargetYear !== toYear) return;
      currBoundary = allRings(toFC).map(r => resample(r, MORPH_N));
    });
  }

  function setYearFilter(year: number) {
    if (!map?.isStyleLoaded() || !map.getLayer('districts-fill-front')) return;

    cancelMorph();
    const isInitial = prevYear === null;
    const fromYear = chronoPrevYear(year); // always the cycle-prior year, not nav history

    legendCurrYear = year;
    legendPrevYear = fromYear;  // legend reflects chrono prev, not nav history

    // Ghost fill → always the cycle-prior year (or hidden if none)
    if (!isInitial && map.getLayer('districts-fill-back')) {
      if (fromYear !== null) {
        map.setFilter('districts-fill-back', ['==', ['get', 'cycle_year'], fromYear]);
        map.setPaintProperty('districts-fill-back', 'fill-opacity', 0.14);
      } else {
        map.setPaintProperty('districts-fill-back', 'fill-opacity', 0);
      }
    }

    // Main fill crossfade
    map.setPaintProperty('districts-fill-front', 'fill-opacity', 0);
    map.setFilter('districts-fill-front', ['==', ['get', 'cycle_year'], year]);
    requestAnimationFrame(() => {
      if (map.getLayer('districts-fill-front'))
        map.setPaintProperty('districts-fill-front', 'fill-opacity', 0.65);
    });

    if (map.getLayer('districts-hover'))
      map.setFilter('districts-hover', ['==', ['get', 'cycle_year'], year]);

    if (isInitial) {
      // First load: show boundaries immediately, no animation
      map.setPaintProperty('mi-draw-lines', 'line-color', lineColor(year));
      map.setPaintProperty('mi-draw-glow',  'line-color', lineColor(year));
      loadGeo(year).then(fc => {
        if (morphTargetYear !== null && morphTargetYear !== year) return;
        const rings = allRings(fc).map(r => resample(r, MORPH_N));
        (map.getSource('mi-draw') as maplibregl.GeoJSONSource).setData(ringsToFC(rings));
        currBoundary = rings;
      });
    } else if (prevYear !== year) {
      if (fromYear !== null) {
        // Animate from chrono-previous cycle — mi-prev-lines set inside transitionBoundary
        transitionBoundary(fromYear, year);
      } else {
        // First cycle year selected (e.g. 1992): no prev, just show directly
        map.setLayoutProperty('mi-prev-lines', 'visibility', 'none');
        map.setPaintProperty('mi-draw-lines', 'line-color', lineColor(year));
        map.setPaintProperty('mi-draw-glow',  'line-color', lineColor(year));
        loadGeo(year).then(fc => {
          if (morphTargetYear !== null && morphTargetYear !== year) return;
          const rings = allRings(fc).map(r => resample(r, MORPH_N));
          (map.getSource('mi-draw') as maplibregl.GeoJSONSource).setData(ringsToFC(rings));
          currBoundary = rings;
        });
      }
    }

    prevYear = year;
  }

  // ── Panel resize ─────────────────────────────────────────────────────────────

  $effect(() => {
    const pb = panelBottom;
    if (!map?.loaded()) return;
    requestAnimationFrame(() => {
      map.resize();
      if (pb > 0) {
        map.fitBounds(stateView.bounds, { padding: 40, duration: 700, essential: true });
      } else {
        map.flyTo({ center: stateView.center, zoom: stateView.zoom, duration: 700, essential: true });
      }
    });
  });

  $effect(() => { setYearFilter(selectedYear); });

  // ── Map init ─────────────────────────────────────────────────────────────────

  onMount(() => {
    protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile.bind(protocol));

    map = new maplibregl.Map({
      container,
      style: {
        version: 8,
        sources: {
          'carto-light': {
            type: 'raster',
            tiles: ['https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors © CARTO',
          },
        },
        layers: [{ id: 'basemap', type: 'raster', source: 'carto-light' }],
      },
      center: stateView.center,
      zoom: stateView.zoom,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', () => {
      map.addSource('state-districts', {
        type: 'vector',
        url: `pmtiles:///tiles/${stateL}_districts.pmtiles`,
      });

      const emptyFC: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: [] };
      map.addSource('mi-prev', { type: 'geojson', data: emptyFC });
      map.addSource('mi-draw', { type: 'geojson', data: emptyFC });
      map.addSource('mi-swing', { type: 'geojson', data: emptyFC });

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
          'fill-opacity-transition': { duration: fadeDuration, delay: 0 },
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
          'fill-opacity-transition': { duration: fadeDuration, delay: 0 },
        },
      });

      // 3. Swing overlay fill — colored by partisan swing, shown during transition
      map.addLayer({
        id: 'mi-swing-fill',
        type: 'fill',
        source: 'mi-swing',
        paint: {
          'fill-color': ['get', 'swing_color'],
          'fill-opacity': 0,
          'fill-opacity-transition': { duration: 400, delay: 0 },
        },
      });

      // 3b. Flip indicators — thick colored outline on districts that changed party
      map.addLayer({
        id: 'mi-flip-lines',
        type: 'line',
        source: 'mi-swing',
        filter: ['==', ['get', 'flipped'], 1],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': ['get', 'flip_color'],
          'line-width': 3.5,
          'line-opacity': 0,
          'line-opacity-transition': { duration: 400, delay: 0 },
        },
      });

      // 4. Previous year boundaries — faded dashed reference
      map.addLayer({
        id: 'mi-prev-lines',
        type: 'line',
        source: 'mi-prev',
        layout: { visibility: 'none', 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#888',
          'line-width': 1.5,
          'line-opacity': 0.4,
          'line-dasharray': [4, 3],
        },
      });

      // 4a. Glow halo — wide blurred version of the current boundary
      map.addLayer({
        id: 'mi-draw-glow',
        type: 'line',
        source: 'mi-draw',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': lineColor(selectedYear),
          'line-width': 10,
          'line-blur': 6,
          'line-opacity': 0.25,
        },
      });

      // 4b. Current year boundaries — solid, animated during transition
      map.addLayer({
        id: 'mi-draw-lines',
        type: 'line',
        source: 'mi-draw',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': lineColor(selectedYear),
          'line-width': 2,
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
      });

      map.on('mouseleave', 'districts-fill-front', () => {
        if (hoveredId !== undefined)
          map.setFeatureState({ source: 'state-districts', sourceLayer: `${stateL}_districts`, id: hoveredId }, { hover: false });
        hoveredId = undefined;
        map.getCanvas().style.cursor = '';
      });

      map.once('idle', () => setYearFilter(selectedYear));
    });
  });

  onDestroy(() => {
    cancelMorph();
    map?.remove();
    if (protocol) maplibregl.removeProtocol('pmtiles');
  });
</script>

<div class="map-wrap">
  <div bind:this={container} class="map-canvas"></div>

  <div class="map-year-stamp" style="color: {lineColor(legendCurrYear)}">
    {$yearDisplay ? Math.round($yearDisplay) : ''}
  </div>

  <div class="map-legend">
    <div class="legend-title">District boundaries</div>
    {#if legendPrevYear !== null}
      <div class="legend-row">
        <span class="legend-line dashed" style="--c: {lineColor(legendPrevYear)}"></span>
        <span class="legend-label dim">{legendPrevYear}</span>
      </div>
    {/if}
    <div class="legend-row">
      <span class="legend-line solid" style="--c: {lineColor(legendCurrYear)}"></span>
      <span class="legend-label">{legendCurrYear}</span>
    </div>
    {#if swingVisible}
      <div class="legend-divider"></div>
      <div class="legend-row">
        <span class="legend-swing-bar"></span>
        <span class="legend-label dim" style="font-size:0.68rem">D ← swing → R</span>
      </div>
    {/if}
  </div>
</div>

<style>
  .map-wrap   { position: relative; width: 100%; height: 100%; }
  .map-canvas { width: 100%; height: 100%; }

  .map-year-stamp {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3.5rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    opacity: 0.55;
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }

  .map-legend {
    position: absolute;
    bottom: 2rem;
    right: 1rem;
    background: rgba(20, 20, 30, 0.82);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    pointer-events: none;
  }

  .legend-title {
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.4);
    margin-bottom: 0.1rem;
  }

  .legend-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .legend-line {
    display: block;
    width: 32px;
    height: 0;
    flex-shrink: 0;
  }
  .legend-line.solid {
    border-top: 2.5px solid var(--c);
    box-shadow: 0 0 6px 1px color-mix(in srgb, var(--c) 60%, transparent);
  }
  .legend-line.dashed {
    border-top: 1.5px dashed color-mix(in srgb, var(--c) 45%, transparent);
  }

  .legend-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    line-height: 1;
  }
  .legend-label.dim { color: rgba(255,255,255,0.4); font-weight: 400; }

  .legend-divider {
    height: 1px;
    background: rgba(255,255,255,0.1);
    margin: 0.15rem 0;
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
