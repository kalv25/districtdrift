# District Drift — web frontend

SvelteKit static site for [districtdrift.org](https://districtdrift.org).

## Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build       # outputs to build/
npm run preview     # preview the production build locally
```

## Type checking

```bash
npm run check       # svelte-check (0 errors target; ~65 intentional warnings)
```

## Regenerating the OG social preview image

```bash
npm run og-image    # requires: npm run build first; Playwright/Chromium installed
```

This screenshots the nation view at 2022 and saves `static/og-image.png` (1200×630).

## Deployment

Cloudflare Pages — auto-deploys from `main` branch. No manual step needed.
Tile files (`static/tiles/*.pmtiles`) are committed to the repo and served directly.

## Key files

| File | Purpose |
|------|---------|
| `src/routes/+page.svelte` | Main page — state/year/view state, URL sync |
| `src/routes/+layout.svelte` | Global head: SEO meta, OG tags, JSON-LD |
| `src/lib/Map.svelte` | MapLibre map + boundary morph animation |
| `src/lib/NationView.svelte` | SVG national map + choropleth + rankings |
| `src/lib/events.ts` | Historical redistricting events (44 states) |
| `static/tiles/` | PMTiles for districts (all cycles) + precincts |
| `static/*_stats.json` | Partisan stats + demographics per state |
