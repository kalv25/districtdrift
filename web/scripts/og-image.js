/**
 * Generate og-image.png for social sharing.
 *
 * Starts vite preview, navigates to the nation view at 2022, waits for the
 * choropleth map to finish rendering, then screenshots at 1200×630.
 *
 * Usage:
 *   npm run build && npm run og-image
 */

import { chromium } from 'playwright';
import { spawn } from 'child_process';

const PORT = 4174; // use a non-default port to avoid conflicts with running dev servers
const URL  = `http://localhost:${PORT}/?v=nation&y=2022`;
const OUT  = 'static/og-image.png';
const W    = 1200;
const H    = 630;

// ── Start preview server ───────────────────────────────────────────────────

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: process.cwd(),
    });

    const timeout = setTimeout(() => {
      proc.kill();
      reject(new Error('Timed out waiting for vite preview to start'));
    }, 15_000);

    const onData = (chunk) => {
      const line = chunk.toString();
      if (line.includes('localhost:')) {
        clearTimeout(timeout);
        proc.stdout.off('data', onData);
        proc.stderr.off('data', onData);
        resolve(proc);
      }
    };

    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('error', reject);
  });
}

// ── Main ──────────────────────────────────────────────────────────────────

let preview;
try {
  console.log('Building preview server…');
  preview = await startPreview();
  console.log(`Preview ready at ${URL}`);

  const browser = await chromium.launch();
  const page    = await browser.newPage();

  await page.setViewportSize({ width: W, height: H });

  // Clear localStorage so we always get the default nation view at 2022
  await page.addInitScript(() => localStorage.clear());

  console.log('Loading page…');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30_000 });

  // Dismiss the help modal (auto-opens on first visit) if present
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // Wait until the nation SVG has colored state paths
  await page.waitForFunction(() => {
    const paths = document.querySelectorAll('.nation-svg .state-path');
    return paths.length >= 40;
  }, { timeout: 20_000 });

  // Extra settle time for EG colors to compute and render
  await page.waitForTimeout(800);

  // Brief extra pause for the wipe animation to settle
  await page.waitForTimeout(600);

  console.log(`Screenshotting → ${OUT}`);
  await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: W, height: H } });

  await browser.close();
  console.log('Done.');
} finally {
  if (preview) preview.kill();
}
