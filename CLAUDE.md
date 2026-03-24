# districtdrift.org — CLAUDE.md

**Version:** 2026.3.22
**Created:** 2026-03-22
**Last Updated:** 2026-03-24 23:15 UTC

## Project overview
A public-interest website that documents the effects of gerrymandering in the
United States from the 1990s through the present. Viewers can explore changes
at every level: national, state, congressional district, and precinct.

Domain: districtdrift.org (.org signals nonprofit/public interest)
Status: 50 states fully implemented with per-district data. Nation view live.
Version: CalVer — `YYYY.M.D` format (e.g. `2026.3.22`). Set in `web/package.json` and `pyproject.toml`; injected into the frontend via `vite.config.ts` as `__APP_VERSION__`; displayed in the header tagline and stamped into `<meta name="version">` via `+layout.svelte`.

---

## What makes this different from existing sites
Existing tools (Districtr, PlanScore, DistrictBuilder, Princeton Gerrymandering
Project) are built FOR redistricting participants — lawyers, advocates,
commissions. They are forward-looking (draw better maps).

districtdrift.org is backward-looking: a historical narrative for the general
public showing how maps HAVE BEEN drawn over the past three decades and what
the partisan effects were. Side-by-side temporal comparison across redistricting
cycles (1992/2002/2012/2022) is the core feature no existing site offers.

---

## Agreed architecture

### Stack
- Frontend: SvelteKit (static site output)
- Map rendering: MapLibre GL JS + PMTiles plugin
- Charts: D3.js (via direct SVG — no D3 dependency in components)
- Hosting: Cloudflare Pages (frontend) + Cloudflare R2 (tile storage)
- Estimated cost: ~$5–8/month total, no servers

### Data pipeline (Python, run locally or via GitHub Actions)
- Input sources (all free/open):
  - Redistricting Data Hub: precinct shapefiles, all 50 states
  - NHGIS: congressional district boundaries back to 1980s
  - Princeton Gerrymandering Project: historical partisan scores
  - US Census TIGER: base geography
- Processing: Python + GeoPandas
- Tile generation: Tippecanoe → PMTiles format
- Output: PMTiles files (map tiles) + static JSON (partisan stats + credits)

### Zoom levels / user experience
1. Nation view — all 50 states colored by EG severity, seat-change overlays ✓
2. State view — congressional districts + cycle selector (1992/2002/2012/2022) ✓
3. District view — partisan stats panel, efficiency gap chart, seat/vote split ✓
4. Precinct view — raw vote data (available for most states from 2012 onward)

### Key metrics displayed
- Efficiency gap (wasted votes) ✓
- Seat/vote ratio per cycle ✓
- Mean-median difference ✓
- Party control of redistricting process per state/cycle ✓

---

## Current state — 50 states complete (all states)

### Pipeline (`pipeline/`)
| File | Purpose |
|------|---------|
| `config.py` | Shared constants: state FIPS, cycle years, paths |
| `download.py` | Downloads shapefiles from NHGIS + election results from RDH |
| `process.py` | Computes efficiency gap, seat/vote stats; writes `{state}_stats.json` |
| `tile.py` | Runs Tippecanoe to generate `{state}_districts.pmtiles` |
| `export_geo.py` | Exports simplified GeoJSON per cycle for boundary morph animation |
| `demographics.py` | Fetches NHGIS census data (race, income, education) per district per cycle |

Run order:
```
uv run python -m pipeline.download
uv run python -m pipeline.process
uv run python -m pipeline.tile
uv run python -m pipeline.export_geo
```

Outputs (gitignored except web/static files):
- `data/raw/` — downloaded shapefiles and CSVs
- `data/processed/` — intermediate GeoJSON per cycle
- `web/static/tiles/{state}_districts.pmtiles` — vector tiles (all cycles)
- `web/static/{state}_stats.json` — partisan stats + data credits
- `web/static/geo/{state}_{year}.geojson` — simplified rings for morph animation

### Frontend (`web/src/`)
| File | Purpose |
|------|---------|
| `routes/+page.svelte` | Main page: layout, state/year selection, URL sharing, help modal |
| `lib/Map.svelte` | MapLibre map with PMTiles + animated boundary morphing |
| `lib/NationView.svelte` | SVG national map: EG choropleth, seat-change pills, zoom/pan, rankings |
| `lib/Pill.svelte` | Reusable party pill component (`party`, `solid`, `size` props) |
| `lib/Tooltip.svelte` | CSS hover tooltip, `position:fixed` + JS coords to escape overflow clipping |
| `lib/events.ts` | Historical events + litigation per redistricting cycle |
| `lib/SeatVoteChart.svelte` | Animated bar chart: seat vs vote share |
| `lib/TrendChart.svelte` | Line chart: D vote/seat share across all cycles |
| `lib/EGChart.svelte` | Bar chart: efficiency gap across all cycles |
| `lib/CompetitivenessChart.svelte` | Stacked bars: district competitiveness |

### Key UI features implemented

#### Nation view (`NationView.svelte`)
- All 50 states shaded by efficiency gap magnitude (choropleth)
- Cycle selector + ▶ play animation (1992→2022); wipe transition left→right
- Seat-change pill overlays: `+2R` / `−1D` etc. fade in as wipe passes each state
  - Primary: seat delta; fallback: EG delta when seats didn't change
  - Greedy stagger algorithm pre-computes Y offsets to minimize overlap
  - States below area threshold (NE corridor tiny states) suppressed to reduce crowding
  - State abbreviation label hidden when pill overlay is active
- SVG zoom/pan: scroll-to-zoom toward cursor, drag to pan
- **NE** shortcut button zooms to Northeast corridor (12 states, ~90 seats)
- Rankings panel: all states ranked by EG magnitude with D/R pills
- `Pill.svelte` used inline in rankings panel

#### State view
- Cycle selector (1992/2002/2012/2022) with year-specific colors and animated dots
  - Buttons are `flex: 1` — always share available space, never overflow
  - D/R seat counts shown in side columns when container ≥ 400px; hidden when narrow (container query)
- ▶ / ⏹ play button: always starts 1992→2002, auto-advances, stops at 2022
- Boundary morph animation: district outlines move from previous→new positions
  - Ring alignment optimization (`alignRing`) prevents cross-side morphing artifacts
  - Unchanged districts skip animation; subtle glow on current year; previous year dashed
- Year stamp on map tweened through intermediate values
- Map legend (bottom-right): current year solid line + previous year dashed
- Two panel layouts: **vertical** (right sidebar, default 330px) and **horizontal** (bottom bar, default 280px)
  - Layout + dimensions persisted in localStorage
  - Drag resize handle on each layout's boundary; vertical min-width 300px
- Two always-visible panels: **cycle panel** (state stats) and **district panel**
  - Shadowed divider between panels
  - Each panel has a **labeled snap-nav** (pill buttons at top) to jump directly to any section — no swipe knowledge needed; scroll still works
  - Vertical layout: snap cards stack vertically, fill panel width
  - Horizontal layout: district panel cards centered
- Cycle panel snap cards: Stats · Seats · Trend · Eff. gap · Compete. · Events · Credits
  - All charts: `width="95%"` + `viewBox` for responsive scaling
- District panel snap cards: Partisan · Race & pop · Income & edu
  - Header: `D{n} {year}` + solid party `Pill` + Ballotpedia link + D/R gradient background
  - snap-dl tables: right-aligned values, alternating row shading, ellipsis on long values
  - "Drawn by" field wrapped in `Tooltip` (explains who controlled redistricting)
  - "Eff. gap" field wrapped in `Tooltip` (explains the metric)
  - Party pill (Democrat/Republican) wrapped in `Tooltip` (explains the election result for that cycle)
- `Tooltip.svelte`: uses `position:fixed` + `getBoundingClientRect()` to escape `overflow:hidden` panel clipping

#### Sharing + navigation
- URL state sync: `viewMode`, `year`, `pinnedDistrict`, `panelLayout` encoded in query params
  - Restored on load (takes priority over localStorage)
- **⤴ Share** button: uses Web Share API on mobile (native share sheet — email, messages, etc.); falls back to clipboard copy on desktop with "✓ Copied" confirmation
- Dynamic `<title>`: `District Drift — Michigan, 2022, District 3` (descriptive for shared links)
- State selector opens a **geographic tile-grid modal** (US tile cartogram, 12×7 grid) instead of a long dropdown; hover shows full state name; active state highlighted in blue; ESC or click-outside to close

#### Help modal
- Dark navy header (`#1a1a2e`) for visual weight
- Hook intro (always visible, above tabs): punchy 2-sentence "why this exists"
- **4 tabs**: 🗺 Nation view · 🏛 State view · 📊 Metrics · 🗃 Data
  - Resets to Nation view tab on open
- Metrics tab includes inline **packing/cracking SVG diagram**: two side-by-side panels showing
  hypothetical 4-district state, with proportional D/R bars, 50% dashed marker, and seat outcome summary
  - Uses `<clipPath>` for clean bar rendering; CSS vars for dark mode compatibility
- `Pill.svelte` used inline in Nation view tab to demonstrate seat-change notation

### Year-specific boundary colors
- 1992: `#CA8A04` (yellow-gold)
- 2002: `#0D9488` (teal)
- 2012: `#9333EA` (purple)
- 2022: `#DB2777` (pink)

All avoid the blue (`#4a90d9`) and red (`#e05c5c`) used for D/R party fills.

---

## Design principles
- Politically neutral framing — present data, not advocacy
- Both parties have gerrymandered; show all cases equally
- No patriotic imagery (flags, monuments) — risks partisan connotation; the map shapes ARE the brand
- No decorative imagery — data visualization is the content; exception: explanatory diagrams in help modal
- Cite all data sources prominently (data credits in `{state}_stats.json`)
- Target audience: general public, journalists, educators (including less tech-savvy users)
- Accessibility: labeled navigation (not just swipe dots), works on mobile, readable without JS for basic content

---

## Repository structure
```
districtdrift/
├── CLAUDE.md                  ← this file
├── pipeline/
│   ├── config.py              ← shared constants
│   ├── download.py            ← fetch raw data
│   ├── process.py             ← compute stats, write {state}_stats.json
│   ├── tile.py                ← generate PMTiles
│   ├── export_geo.py          ← export simplified GeoJSON for morph animation
│   └── demographics.py        ← fetch NHGIS census demographics per district
├── web/
│   ├── src/
│   │   ├── routes/+page.svelte  ← main page
│   │   └── lib/
│   │       ├── Map.svelte               ← map + animation
│   │       ├── NationView.svelte        ← SVG national map
│   │       ├── Pill.svelte              ← reusable party pill component
│   │       ├── Tooltip.svelte           ← hover tooltip (position:fixed)
│   │       ├── events.ts                ← historical events data
│   │       ├── SeatVoteChart.svelte     ← animated bars: seat vs vote share
│   │       ├── TrendChart.svelte        ← line chart: D vote/seat share
│   │       ├── EGChart.svelte           ← bar chart: efficiency gap
│   │       └── CompetitivenessChart.svelte ← stacked bars: district competitiveness
│   └── static/
│       ├── {state}_stats.json    ← partisan stats + credits (all 50 states)
│       ├── tiles/                ← PMTiles (gitignored)
│       └── geo/                  ← simplified GeoJSON for morphing (gitignored)
├── data/                      ← gitignored raw + processed data
├── pyproject.toml
└── .gitignore
```

---

## Next steps (in priority order)
1. ~~**Add a second state**~~ ✓ — 50 states fully implemented with per-district data
2. ~~**Nation view**~~ ✓ — NationView.svelte renders all 50 states colored by EG with rankings panel
3. ~~**Deploy to Cloudflare**~~ ✓ — live at districtdrift.org via Cloudflare Pages (auto-deploys from git)
4. ~~**Expand to remaining 24 states**~~ ✓ — all 50 states complete
5. **More states' events data** — events.ts currently covers MI + GA well; expand to remaining 15
6. **Improve nation view** — better color scale, cycle comparison tooltip on hover
7. **Precinct layer** *(next major version)* — raw precinct vote data overlaid on district view; requires RDH shapefiles, join to election results, tippecanoe tiling (~175k precincts nationally)
