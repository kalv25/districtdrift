/**
 * Generate mobile-preview.png for the README.
 *
 * Captures the nation view at iPhone 14 dimensions (390×844),
 * then the state view (Michigan 2024) with the glass panel visible.
 *
 * Usage:
 *   npm run build && npm run mobile-preview
 */

import { chromium } from 'playwright';
import { spawn } from 'child_process';

const PORT = 4175;
const BASE = `http://localhost:${PORT}`;
const OUT  = 'static/mobile-preview.png';
const W    = 390;
const H    = 844;

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: process.cwd(),
    });
    const timeout = setTimeout(() => { proc.kill(); reject(new Error('Timed out')); }, 15_000);
    const onData = (chunk) => {
      if (chunk.toString().includes('localhost:')) {
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

let preview;
try {
  preview = await startPreview();
  console.log('Preview ready');

  const browser = await chromium.launch();

  // ── Nation view (mobile) ──────────────────────────────────────────────────
  const nationPage = await browser.newPage();
  await nationPage.setViewportSize({ width: W, height: H });
  await nationPage.addInitScript(() => localStorage.clear());

  await nationPage.goto(`${BASE}/?v=nation&y=2024`, { waitUntil: 'networkidle', timeout: 30_000 });
  await nationPage.keyboard.press('Escape');
  await nationPage.waitForTimeout(300);

  await nationPage.waitForFunction(() =>
    document.querySelectorAll('.nation-svg .state-path').length >= 40,
    { timeout: 20_000 }
  );
  await nationPage.waitForTimeout(1200);

  console.log(`Screenshotting nation view → ${OUT}`);
  await nationPage.screenshot({ path: OUT });

  await browser.close();
  console.log('Done.');
} finally {
  if (preview) preview.kill();
}
