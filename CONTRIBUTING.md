# Contributing to District Drift

## Project overview

[districtdrift.org](https://districtdrift.org) is a free, nonpartisan website documenting the history of congressional gerrymandering in the United States from 1992 to 2022. It is built for the general public, journalists, and educators.

## Stack

- **Frontend:** SvelteKit (static output) + MapLibre GL JS + D3.js
- **Tiles:** PMTiles via Cloudflare R2
- **Pipeline:** Python + GeoPandas + Tippecanoe
- **Hosting:** Cloudflare Pages

## Repository structure

```
districtdrift/
├── pipeline/          Python data pipeline (download → process → tile)
│   ├── config.py      State configuration and shared constants
│   ├── download.py    Fetch shapefiles from NHGIS
│   ├── process.py     Compute efficiency gap, seat/vote stats
│   ├── tile.py        Generate PMTiles via Tippecanoe
│   ├── export_geo.py  Export simplified GeoJSON for boundary animation
│   ├── demographics.py Fetch census demographics per district
│   └── precinct.py    Generate precinct-level vote tiles from RDH VEST data
├── web/
│   ├── src/
│   │   ├── routes/    SvelteKit pages
│   │   └── lib/       Map, charts, and data components
│   └── static/        Built assets and tile files
└── pyproject.toml
```

## Running the pipeline

Requires Python 3.12+, [uv](https://github.com/astral-sh/uv), and [Tippecanoe](https://github.com/felt/tippecanoe).

```bash
cp .env.example .env        # add your NHGIS API key
uv run python -m pipeline.download
uv run python -m pipeline.process
uv run python -m pipeline.tile
uv run python -m pipeline.export_geo
uv run python -m pipeline.demographics --state MI
```

For precinct tiles (requires free RDH VEST download):
```bash
# Place RDH VEST ZIP at data/raw/precincts/mi/2022.zip
uv run python -m pipeline.precinct --state MI
```

## Running the frontend

```bash
cd web
npm install
npm run dev
```

## Key UI features

- **State view**: cycle selector (1992/2002/2012/2022), boundary morph animation, panel layouts (sidebar / bottom bar)
- **Nation view**: all 50 states colored by efficiency gap, seat-change overlays, rankings panel
- **Floating map controls** (bottom-left): layout toggle · precinct overlay toggle · screenshot download
- **Screenshot**: the ⬇ button saves the current map as `districtdrift-{state}-{year}.png` with a watermark
- **Share button**: Web Share API on mobile; clipboard copy on desktop

## Data sources

- [NHGIS](https://www.nhgis.org/) — congressional district boundaries and census demographics
- [Redistricting Data Hub](https://redistrictingdatahub.org/) — VEST precinct shapefiles
- [Princeton Gerrymandering Project](https://gerrymander.princeton.edu/) — historical partisan scores

## License

[CC BY-NC-SA 4.0](LICENSE) — free to use and adapt with attribution, non-commercial only.
