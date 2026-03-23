<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import maplibregl from 'maplibre-gl';
  import { Protocol } from 'pmtiles';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let { selectedYear = 2022, fadeDuration = 450, panelBottom = 0, statePo = 'MI', cycleYears = [1992, 2002, 2012, 2022], darkMode = false, onDistrictClick }: {
    selectedYear?: number;
    fadeDuration?: number;
    panelBottom?: number;
    statePo?: string;
    cycleYears?: number[];
    darkMode?: boolean;
    onDistrictClick?: (d: { district: number; won_by: string; partisan_lean_d: number | null; cycle_year: number }) => void;
  } = $props();

  // Year immediately before `year` in the cycle sequence, or null if it's the first.
  function chronoPrevYear(year: number): number | null {
    const idx = cycleYears.indexOf(year);
    return idx > 0 ? cycleYears[idx - 1] : null;
  }

  const stateL = $derived(statePo.toLowerCase());

  const STATE_VIEW: Record<string, { bounds: maplibregl.LngLatBoundsLike; center: [number, number]; zoom: number }> = {
    MI: { bounds: [[-90.5, 41.7], [-82.1, 48.3]], center: [-84.5, 44.5], zoom: 5.5 },
    NC: { bounds: [[-84.3, 33.8], [-75.5, 36.6]], center: [-79.9, 35.2], zoom: 6.2 },
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
  let fitDebounceId: ReturnType<typeof setTimeout> | null = null;
  let resizeObserver: ResizeObserver;
  let morphTargetYear: number | null = null;
  let currBoundary: Ring[] | null = null; // rings currently drawn on screen
  let swingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let swingVisible = false;                   // plain — must NOT be $state (read inside $effect via clearSwingOverlay)
  let swingMarkers: maplibregl.Marker[] = [];
  let swingLegendVisible = $state(false);    // $state only for the legend template

  let hoveredDistrict = $state<{ district: number | string; won_by: string; x: number; y: number } | null>(null);

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
    if (swingVisible && map.getLayer('districts-fill-front'))
      map.setPaintProperty('districts-fill-front', 'fill-opacity', 0.65);
    swingVisible = false;
    swingLegendVisible = false;
  }

  function showSwingOverlay(fromFC: GeoJSON.FeatureCollection, toFC: GeoJSON.FeatureCollection) {
    clearSwingOverlay();
    const features = computeSwingFeatures(fromFC, toFC);
    (map.getSource('swing') as maplibregl.GeoJSONSource).setData({
      type: 'FeatureCollection', features,
    });

    // Dim the party fill so swing colors are visible on top
    if (map.getLayer('districts-fill-front'))
      map.setPaintProperty('districts-fill-front', 'fill-opacity', 0.25);
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

    swingTimeoutId = setTimeout(() => {
      ghostSwingOverlay();
    }, MORPH_MS + SWING_HOLD_MS);
  }

  // Fade the swing overlay to a faint ghost — fills and labels dimmed,
  // district fill restored. Stays visible until the next year switch.
  function ghostSwingOverlay() {
    swingTimeoutId = null;
    // Fade swing fill to ghost
    if (map.getLayer('swing-fill'))
      map.setPaintProperty('swing-fill', 'fill-opacity', 0.13);
    // Dim flip outlines
    if (map.getLayer('flip-lines'))
      map.setPaintProperty('flip-lines', 'line-opacity', 0.25);
    // Dim labels
    for (const m of swingMarkers)
      m.getElement().style.opacity = '0.45';
    // Restore district fill
    if (map.getLayer('districts-fill-front'))
      map.setPaintProperty('districts-fill-front', 'fill-opacity', 0.65);
    swingLegendVisible = false;
    // swingVisible stays true so clearSwingOverlay knows to restore opacity on next switch
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
    (map.getSource('prev') as maplibregl.GeoJSONSource).setData(ringsToFC(fromRings));
    map.setPaintProperty('prev-lines', 'line-color', lineColor(fromYear));
    map.setLayoutProperty('prev-lines', 'visibility', 'visible');

    map.setPaintProperty('draw-lines', 'line-color', lineColor(toYear));
    map.setPaintProperty('draw-glow',  'line-color', lineColor(toYear));
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
    const fromYear = chronoPrevYear(year);

    legendCurrYear = year;
    legendPrevYear = fromYear;

    // Ghost fill → always the chrono-prior year (or hidden if none)
    if (map.getLayer('districts-fill-back')) {
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
        map.setPaintProperty('districts-fill-front', 'fill-opacity', swingVisible ? 0.25 : 0.65);
    });

    if (map.getLayer('districts-hover'))
      map.setFilter('districts-hover', ['==', ['get', 'cycle_year'], year]);

    // prevYear starts null, so prevYear !== year is true on initial load too —
    // no special-casing needed; initial load with a chrono-prev gets full context.
    if (prevYear !== year) {
      if (fromYear !== null) {
        transitionBoundary(fromYear, year);
      } else {
        // First cycle year (e.g. 1992): no previous context to show
        map.setLayoutProperty('prev-lines', 'visibility', 'none');
        map.setPaintProperty('draw-lines', 'line-color', lineColor(year));
        map.setPaintProperty('draw-glow',  'line-color', lineColor(year));
        loadGeo(year).then(fc => {
          if (morphTargetYear !== null && morphTargetYear !== year) return;
          const rings = allRings(fc).map(r => resample(r, MORPH_N));
          (map.getSource('draw') as maplibregl.GeoJSONSource).setData(ringsToFC(rings));
          currBoundary = rings;
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
        padding: { top: 30, right: 30, bottom: panelBottom > 0 ? panelBottom + 20 : 30, left: 30 },
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
        padding: { top: 30, right: 30, bottom: panelBottom > 0 ? panelBottom + 20 : 30, left: 30 },
      },
    });

    // Refit whenever the canvas changes size (panel toggle, window resize).
    resizeObserver = new ResizeObserver(() => fitToState());
    resizeObserver.observe(container);

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

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
          'fill-opacity-transition': { duration: 600, delay: 0 },
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

      // 4. Previous year boundaries — faded dashed reference
      map.addLayer({
        id: 'prev-lines',
        type: 'line',
        source: 'prev',
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
        id: 'draw-glow',
        type: 'line',
        source: 'draw',
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
        id: 'draw-lines',
        type: 'line',
        source: 'draw',
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

      map.on('click', 'districts-fill-front', (e) => {
        if (!e.features?.length) return;
        const p = e.features[0].properties ?? {};
        onDistrictClick?.({
          district: p.district,
          won_by: p.won_by ?? '',
          partisan_lean_d: typeof p.partisan_lean_d === 'number' ? p.partisan_lean_d : null,
          cycle_year: p.cycle_year ?? selectedYear,
        });
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
</script>

<div class="map-wrap">
  <div bind:this={container} class="map-canvas"></div>

  {#if hoveredDistrict}
    <div
      class="district-tooltip"
      class:d={hoveredDistrict.won_by === 'D'}
      class:r={hoveredDistrict.won_by === 'R'}
      style="left:{hoveredDistrict.x + 14}px; top:{hoveredDistrict.y}px"
    >District {hoveredDistrict.district}</div>
  {/if}

  <div class="map-year-stamp" style="color: {lineColor(legendCurrYear)}">
    {$yearDisplay ? Math.round($yearDisplay) : ''}
  </div>

  <div class="map-legend" class:top-left={panelBottom > 0}>
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
    {#if swingLegendVisible}
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
  .map-legend.top-left {
    bottom: auto;
    right: auto;
    top: 1rem;
    left: 1rem;
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
