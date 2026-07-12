/**
 * Renders the social-preview images with headless Chrome:
 *
 *   public/og.png      1200×630   link previews (X, LinkedIn, Slack, Discord, iMessage…)
 *   public/banner.png  1584×396   LinkedIn / X profile banner, same art, wider crop
 *
 * Generated rather than drawn, so the numbers on the card are always the current ones and
 * never disagree with the page.
 *
 * The art is a world map in ASCII with the servers lit where they physically are — Quito,
 * a Hetzner box in Germany, CERN in Switzerland — because "I operate infrastructure" is a
 * claim, and a map of it is evidence. The texture is the same character scatter the site's
 * background canvas is made of, so the card reads as a piece cut from the page.
 */
import { writeFile, unlink } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import figlet from 'figlet';
import { worldMap } from './lib/ascii-map.mjs';

const run = promisify(execFile);
const github = createRequire(import.meta.url)('../src/data/github.json');

const CHROME = process.env.CHROME_BIN ?? 'google-chrome-stable';
const { stats } = github;

/* ---------- the name ---------------------------------------------------------------- */

/**
 * The wordmark. ANSI Shadow is uppercase-only — the fonts that do carry a lowercase either
 * drew an `a` that still read as a shrunken capital, or gave up the extruded 3D block look
 * entirely. The look won, so the card says DAX.
 */
const NAME = figlet
  .textSync('DAX', { font: 'ANSI Shadow' })
  .split('\n')
  .filter((l) => l.trim())
  .join('\n');

/* ---------- the map ------------------------------------------------------------------ */

/**
 * Where the machines actually are. No place names on the card: a flag says "these are on
 * three continents" at a glance, which is the whole claim — the street address of each box
 * is nobody's business, and naming the host was needless detail.
 */
const SITES = [
  { at: [-78.5, -0.2], flag: '🇪🇨', dx: 1.8, dy: -0.7 }, // Quito
  { at: [11.1, 49.5], flag: '🇩🇪', dx: 1.8, dy: -1.5 }, // a rented box in Germany
  // Geneva sits four degrees from Nuremberg — a couple of characters apart at this scale —
  // so the flags are nudged clear of each other by hand rather than left in a pile.
  { at: [6.05, 46.23], flag: '🇨🇭', dx: -4.2, dy: 0.5 }, // CERN
];

const CHAR_W = 0.6; // JetBrains Mono advances exactly 0.6em per cell
const LINE_H = 1.32;

/**
 * Cropped to the Atlantic: the whole point of the picture is the distance the links cross,
 * and a full 360° map would spend half its width on an empty Pacific.
 */
const draw = (cols, bounds, fontSize) => {
  const map = worldMap({ bounds, cols });

  const [ec, de, ch] = SITES.map((s) => s.at);
  // Both links run from Quito, because that is where Dax operates them from. Drawing the
  // short Nuremberg–Geneva hop instead produced a stubby horizontal dash that read as a
  // stray line rather than a route. The two arcs are lifted differently so they separate
  // over the Atlantic instead of overlapping into one thick smear.
  map.connect(ec, ch, { lift: 0.3 });
  map.connect(ec, de, { lift: 0.46 });

  // Flags are positioned in pixels over the <pre>, not written into the grid: an emoji is
  // two cells wide in some fonts and one in others, and either way it would shear the
  // monospace alignment the whole drawing depends on.
  const flags = SITES.map((s) => {
    const cell = map.place(s.at);
    if (!cell) return '';
    const left = (cell.x + s.dx) * CHAR_W * fontSize;
    const top = (cell.y + s.dy) * LINE_H * fontSize;
    return `<span class="flag" style="left:${left.toFixed(1)}px;top:${top.toFixed(1)}px">${s.flag}</span>`;
  }).join('');

  return { art: map.render(), flags };
};

const paint = (art) =>
  art
    .replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c])
    .replace(/\*/g, '<b>●</b>')
    .replace(/~/g, '<s>·</s>');

/* ---------- the card ---------------------------------------------------------------- */

const card = (w, h, banner) => {
  // The banner is half the height of the OG card, so it gets a shallower slice of the
  // globe — otherwise the map is simply cropped through the middle of Europe.
  const cols = banner ? 84 : 96;
  const fontSize = banner ? 10 : 12;
  const { art, flags } = draw(cols, banner ? [-95, -20, 30, 55] : [-95, -25, 30, 62], fontSize);
  const map = paint(art);

  return `<!doctype html><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${w}px;height:${h}px;background:#06080b;color:#e6edf3;overflow:hidden;
       font-family:Inter,sans-serif;position:relative}
  pre{font-family:'JetBrains Mono',monospace;white-space:pre}

  /* The map is the backdrop, bled to the edges and pushed right, so the text sits over the
     ocean rather than over Brazil. */
  .mapwrap{position:absolute;top:50%;right:${banner ? 110 : 40}px;translate:0 -50%}
  .map{font-size:${fontSize}px;line-height:1.32;color:#2a3442}
  .map b{color:#56d364;text-shadow:0 0 10px rgba(63,185,80,.9)} /* a live server */
  .map s{color:#2ea043;text-decoration:none} /* the link between them */
  /* Flags, not place names — and dimmed, so they read as a hint rather than a label. */
  .flag{position:absolute;font-size:${banner ? 14 : 18}px;line-height:1;opacity:.62;
        filter:saturate(.7)}

  /* Legibility, not decoration: the scrim is what keeps the sentence readable over the map. */
  .scrim{position:absolute;inset:0;
         background:linear-gradient(100deg,#06080b 26%,rgba(6,8,11,.94) 42%,rgba(6,8,11,.55) 60%,rgba(6,8,11,.25) 100%)}
  .glow{position:absolute;top:50%;right:16%;translate:50% -50%;width:720px;height:720px;
        border-radius:50%;background:radial-gradient(circle,rgba(63,185,80,.10),transparent 62%)}

  .left{position:absolute;left:${banner ? 96 : 76}px;top:50%;translate:0 -50%;
        width:${banner ? 520 : 540}px}
  .name{font-size:${banner ? 20 : 24}px;font-weight:700;color:#e6edf3;line-height:1.16;
        text-shadow:0 0 26px rgba(63,185,80,.25)}
  .role{font-family:'JetBrains Mono',monospace;font-size:${banner ? 13 : 15}px;
        letter-spacing:.2em;text-transform:uppercase;color:#6e7681;margin-top:${banner ? 16 : 22}px}
  .line{font-size:${banner ? 20 : 26}px;color:#8b949e;margin-top:${banner ? 10 : 14}px;line-height:1.35}
  .line b{color:#e6edf3;font-weight:600}
  .stats{display:flex;gap:38px;margin-top:30px}
  .n{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:500;color:#3fb950}
  .lbl{font-size:13px;color:#6e7681;margin-top:3px}

  /* LinkedIn drops the avatar over the bottom-left corner of a banner, so the URL goes
     top-right there and bottom-left only on the OG card. */
  footer{position:absolute;font-family:'JetBrains Mono',monospace;color:#6e7681;
         ${banner ? 'left:96px;bottom:34px;font-size:14px' : 'left:76px;bottom:40px;font-size:17px'}}
  footer b{color:#3fb950;font-weight:500}
</style>

<div class="mapwrap"><pre class="map">${map}</pre>${flags}</div>
<div class="scrim"></div>
<div class="glow"></div>

<div class="left">
  <pre class="name">${NAME}</pre>
  <div class="role">Linux infra · scientific computing</div>
  <div class="line">I run real <b>Linux infrastructure</b> — and build <b>software for science</b>.</div>
  ${
    banner
      ? ''
      : `<div class="stats">
    <div><div class="n">7</div><div class="lbl">Linux servers operated</div></div>
    <div><div class="n">${stats.public_repos}</div><div class="lbl">open-source repos</div></div>
    <div><div class="n">CMS · CERN</div><div class="lbl">scientific computing</div></div>
  </div>`
  }
</div>

<footer>daxrpm<b>.</b>dev</footer>`;
};

/* ---------- render ------------------------------------------------------------------ */

const shoot = async (name, w, h, banner) => {
  const tmp = resolve(`${name}.tmp.html`);
  const out = resolve(`public/${name}.png`);
  await writeFile(tmp, card(w, h, banner));

  await run(CHROME, [
    // The new headless mode silently no-ops --screenshot for local files; old mode works.
    '--headless=old',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${w},${h}`,
    '--virtual-time-budget=5000', // let the webfont land before the shot
    `--screenshot=${out}`,
    pathToFileURL(tmp).href,
  ]);

  await unlink(tmp);
  console.log(`[og] wrote public/${name}.png (${w}×${h})`);
};

await shoot('og', 1200, 630, false);
await shoot('banner', 1584, 396, true);
