// ── Party colors ──────────────────────────────────────────────────────────────
// Light fills: vote-share bars, map district fills, CSS class accents
export const D_PRIMARY   = '#4a90d9';
export const R_PRIMARY   = '#e05c5c';
// Dark fills: seat-share bars, pill solid backgrounds, chart seat lines
export const D_SECONDARY = '#2471a3';
export const R_SECONDARY = '#c0392b';

// ── Cycle year boundary colors ─────────────────────────────────────────────────
// Chosen to avoid D_PRIMARY / R_PRIMARY (blue/red reserved for party fills)
export const YEAR_COLORS: Record<number, string> = {
  1992: '#CA8A04',
  2002: '#0D9488',
  2012: '#9333EA',
  2022: '#DB2777',
  2024: '#EA580C',
};

// ── Pill component color schemes ───────────────────────────────────────────────
export const PILL_COLORS = {
  D: {
    subtle: { bg: 'rgba(36,113,163,0.1)',   text: '#1a5276', border: 'rgba(36,113,163,0.28)' },
    solid:  { bg: D_SECONDARY,              text: '#fff',    border: '#1a5276' },
  },
  R: {
    subtle: { bg: 'rgba(192,57,43,0.1)',    text: '#922b21', border: 'rgba(192,57,43,0.28)' },
    solid:  { bg: R_SECONDARY,              text: '#fff',    border: '#922b21' },
  },
  neutral: {
    subtle: { bg: 'rgba(100,100,100,0.08)', text: '#555',    border: 'rgba(0,0,0,0.15)' },
    solid:  { bg: '#666',                   text: '#fff',    border: '#555' },
  },
};

// ── EG choropleth color (NationView SVG fills) ────────────────────────────────
// active=true → saturated fill; active=false → ghost fill for wipe transition
export function egColor(eg: number | null | undefined, active = true): string {
  if (eg === null || eg === undefined) return active ? '#c8c8c8' : '#e0e0e0';
  const t = Math.min(1, Math.abs(eg) / 0.25);
  if (active) {
    if (eg >  0.02) return _interpolateRgb([220, 150, 150], [180, 30, 30], t);
    if (eg < -0.02) return _interpolateRgb([150, 190, 220], [25, 80, 180], t);
    return '#b0b8b0';
  } else {
    if (eg >  0.02) return `rgba(220,90,90,${0.15 + t * 0.2})`;
    if (eg < -0.02) return `rgba(74,144,217,${0.15 + t * 0.2})`;
    return '#d8d8d8';
  }
}

// ── EG bar color (EGChart bars, NationView tooltip sparkline) ─────────────────
// active=true → saturated; active=false → muted (inactive cycle bars)
export function egBarColor(eg: number | null, active = true): string {
  if (eg === null) return active ? '#999' : '#bbb';
  if (eg >  0.02) return active ? R_SECONDARY : '#e8a09a';
  if (eg < -0.02) return active ? D_SECONDARY : '#8db8d8';
  return active ? '#888' : '#bbb';
}

// ── Internal helpers ───────────────────────────────────────────────────────────
function _interpolateRgb(
  start: [number, number, number],
  end:   [number, number, number],
  t: number,
): string {
  const r = Math.round(start[0] + (end[0] - start[0]) * t);
  const g = Math.round(start[1] + (end[1] - start[1]) * t);
  const b = Math.round(start[2] + (end[2] - start[2]) * t);
  return `rgb(${r},${g},${b})`;
}
