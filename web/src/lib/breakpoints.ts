/**
 * breakpoints.ts — Shared viewport breakpoints for the 3-tier layout system.
 *
 * Phone:   0–640px
 * Tablet:  641–1024px  (iPad Mini, iPad Air)
 * Desktop: 1025px+
 *
 * CSS media queries cannot consume JS constants, so the corresponding
 * CSS custom properties live in app.css (--bp-mobile, --bp-tablet).
 * These constants are for JS-side checks (e.g. window.innerWidth).
 */

export const BP_MOBILE = 640;
export const BP_TABLET = 1024;
