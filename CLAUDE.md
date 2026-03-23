# districtdrift.org — CLAUDE.md

## Project overview
A public-interest website that documents the effects of gerrymandering in the
United States from the 1990s through the present. Viewers can explore changes
at every level: national, state, congressional district, and precinct.

Domain: districtdrift.org (.org signals nonprofit/public interest)
Status: Michigan fully implemented; ready to expand to additional states.
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
1. Nation view — all 50 states colored by gerrymandering severity (not yet built)
2. State view — congressional districts + cycle selector (1992/2002/2012/2022) ✓
3. District view — partisan stats panel, efficiency gap chart, seat/vote split ✓
4. Precinct view — raw vote data (available for most states from 2012 onward)

### Key metrics displayed
- Efficiency gap (wasted votes) ✓
- Seat/vote ratio per cycle ✓
- Mean-median difference ✓
- Party control of redistricting process per state/cycle ✓

---

## Current state — Michigan complete

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
- `web/static/tiles/mi_districts.pmtiles` — vector tiles (all cycles)
- `web/static/mi_stats.json` — partisan stats + data credits
- `web/static/geo/mi_{year}.geojson` — simplified rings for morph animation

### Frontend (`web/src/`)
| File | Purpose |
|------|---------|
| `routes/+page.svelte` | Main page: layout, state, year selection, panel switching |
| `lib/Map.svelte` | MapLibre map with PMTiles + animated boundary morphing |
| `lib/events.ts` | Historical events + litigation per redistricting cycle |
| `lib/SeatVoteChart.svelte` | Animated bar chart: seat vs vote share |
| `lib/TrendChart.svelte` | Line chart: D vote/seat share across all cycles |
| `lib/EGChart.svelte` | Bar chart: efficiency gap across all cycles |

### Key UI features implemented
- Cycle selector (1992/2002/2012/2022) with year-specific colors and animated dots
  - Buttons are `flex: 1` — always share available space, never overflow
  - D/R seat counts shown in side columns when container ≥ 400px; hidden when narrow (container query)
  - Year font 0.72rem; D/R font 0.6rem; side grid columns 1.4rem
- Play + layout-toggle buttons float on the map (bottom-left), always reachable regardless of layout
- Boundary morph animation: district outlines move from previous→new positions
  - Ring alignment optimization (`alignRing`) prevents cross-side morphing artifacts
  - Unchanged districts (e.g. Upper Peninsula) skip animation
  - Subtle glow on current year boundaries
  - Previous year shown as faded dashed reference lines
- Year stamp on map morphs through intermediate values (tweened store)
- Map legend (bottom-right): current year solid line + previous year dashed
- Two panel layouts: **vertical** (right sidebar, default 330px) and **horizontal** (bottom bar, default 280px)
  - Layout + dimensions persisted in localStorage
  - Drag resize handle on each layout's boundary
  - Vertical min-width: 300px (fits all 4 year buttons)
- Two always-visible panels: **cycle panel** (state stats) and **district panel**
  - Shadowed divider between panels
  - Each panel has horizontal snap cards (iOS-style swipe)
  - Vertical layout: snap cards stack vertically, fill panel width; charts use `width="95%" viewBox` → responsive
  - Horizontal layout: district panel cards centered with `justify-content: safe center`
- Cycle panel snap cards: key stats, seat vs. vote chart, trend chart, EG chart, competitiveness, key events, resources, credits
  - `SeatVoteChart`: labels above bars, full-width bars
  - `CompetitivenessChart`: legend moved to HTML flexbox (no SVG text overlap)
  - All charts: `width="95%"` + `viewBox` for responsive scaling
- District panel: header shows `D{n} {year}` + party + Ballotpedia link with D/R gradient background
  - 3 snap cards: Partisan / Race & pop / Income & edu
  - snap-dl tables: right-aligned values, alternating row shading, ellipsis on long values
- Key events panel with verified historical events and litigation cases (⚖ prefix)
- Resources section: further reading links grouped by category
- Data credits footer: sourced from `{state}_stats.json` (data-driven, varies per state)
- State selector in header (currently Michigan only; designed for expansion)

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
- Cite all data sources prominently (data credits in `mi_stats.json`)
- Target audience: general public, journalists, educators
- Accessibility: works on mobile, readable without JS for basic content

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
│   │       ├── events.ts                ← historical events data
│   │       ├── SeatVoteChart.svelte     ← animated bars: seat vs vote share
│   │       ├── TrendChart.svelte        ← line chart: D vote/seat share
│   │       ├── EGChart.svelte           ← bar chart: efficiency gap
│   │       └── CompetitivenessChart.svelte ← stacked bars: district competitiveness
│   └── static/
│       ├── mi_stats.json         ← partisan stats + credits
│       ├── tiles/                ← PMTiles (gitignored)
│       └── geo/                  ← simplified GeoJSON for morphing (gitignored)
├── data/                      ← gitignored raw + processed data
├── pyproject.toml
└── .gitignore
```

---

## Next steps (in priority order)
1. **Add a second state** — establishes the multi-state pattern end-to-end
2. **Nation view** — 50-state overview colored by gerrymandering severity
3. **Precinct layer** — raw vote data overlaid on district view (most data-intensive)
4. **Deploy to Cloudflare** — Pages + R2 for tile hosting
