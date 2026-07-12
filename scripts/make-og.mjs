/**
 * Renders public/og.png (1200×630) with headless Chrome.
 *
 * Generated rather than drawn, so the social preview always shows the *current*
 * contribution count and repo count — and so it never disagrees with the page.
 */
import { writeFile, unlink } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createRequire, } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const run = promisify(execFile);
const github = createRequire(import.meta.url)('../src/data/github.json');

const CHROME =
  process.env.CHROME_BIN ??
  ['google-chrome', 'chromium', 'chromium-browser'].find(Boolean);

const { stats, calendar } = github;

// A single strip of the real calendar — recognisable, and it says "active" without a word.
const cells = calendar.days
  .slice(-364)
  .map((d) => `<i class="l${d.level}"></i>`)
  .join('');

const html = `<!doctype html><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0d1117;color:#e6edf3;
       font-family:Inter,sans-serif;padding:72px 80px;display:flex;
       flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
  .glow{position:absolute;top:-320px;right:-220px;width:720px;height:720px;border-radius:50%;
        background:radial-gradient(circle,rgba(63,185,80,.16),transparent 65%)}
  .eyebrow{font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:.22em;
           text-transform:uppercase;color:#6e7681}
  h1{font-size:76px;font-weight:700;letter-spacing:-.025em;margin-top:22px;line-height:1}
  p{font-size:32px;color:#8b949e;margin-top:22px;max-width:900px;line-height:1.35}
  p b{color:#e6edf3;font-weight:600}
  .stats{display:flex;gap:56px;margin-top:8px}
  .n{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:500;color:#3fb950}
  .lbl{font-size:15px;color:#6e7681;margin-top:4px}
  .cal{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,7px);gap:3px;margin-top:30px}
  .cal i{width:7px;height:7px;border-radius:1.5px;display:block}
  .l0{background:#161b22}.l1{background:#0e4429}.l2{background:#006d32}
  .l3{background:#26a641}.l4{background:#39d353}
  footer{display:flex;justify-content:space-between;align-items:flex-end;
         font-family:'JetBrains Mono',monospace;font-size:19px;color:#6e7681}
  footer b{color:#3fb950;font-weight:500}
</style>
<div class="glow"></div>
<div>
  <div class="eyebrow">Quito, Ecuador</div>
  <h1>Dax Navarrete</h1>
  <p>I build <b>systems software</b> and <b>machine learning for particle physics</b>.</p>
  <div class="cal">${cells}</div>
</div>
<div>
  <div class="stats">
    <div><div class="n">${stats.public_repos}</div><div class="lbl">public repos</div></div>
    <div><div class="n">${stats.contributions_last_year.toLocaleString('en-US')}</div><div class="lbl">contributions, past year</div></div>
    <div><div class="n">CMS · CERN</div><div class="lbl">research collaborator</div></div>
  </div>
  <footer style="margin-top:34px">
    <span>daxrpm<b>.</b>dev</span><span>github.com/daxrpm</span>
  </footer>
</div>`;

const tmp = resolve('og.tmp.html');
const out = resolve('public/og.png');
await writeFile(tmp, html);

await run(CHROME, [
  // The new headless mode silently no-ops --screenshot for local files; old mode works.
  '--headless=old',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  '--virtual-time-budget=5000', // let the webfont land before the shot
  `--screenshot=${out}`,
  pathToFileURL(tmp).href,
]);

await unlink(tmp);
console.log('[og] wrote public/og.png (1200×630)');
