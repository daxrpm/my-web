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
import { writeFile, unlink, readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import figlet from 'figlet';
import sharp from 'sharp';
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

/* ---------- the /github bridge card -------------------------------------------------- */

/**
 * The GitHub avatar, fetched once and inlined as a data URI so the shot never depends on a
 * network round-trip landing inside the virtual-time budget. Squared off and downscaled;
 * the circle is done in CSS.
 */
const avatarDataUri = async () => {
  const res = await fetch(github.user.avatar);
  if (!res.ok) throw new Error(`avatar fetch failed: ${res.status}`);
  const png = await sharp(Buffer.from(await res.arrayBuffer())).resize(256, 256).png().toBuffer();
  return `data:image/png;base64,${png.toString('base64')}`;
};

/**
 * The preview for /github — the share bridge. Same dark card and ASCII-map backdrop as the
 * OG image, so it reads as the same site, but the identity is carried by the real GitHub
 * avatar and handle rather than the wordmark, and the three numbers are the GitHub ones.
 */
const githubCard = async (w, h) => {
  const fontSize = 12;
  const { art, flags } = draw(96, [-95, -25, 30, 62], fontSize);
  const map = paint(art);
  const avatar = await avatarDataUri();
  const nf = new Intl.NumberFormat('en-US');
  const { user, stats } = github;

  return `<!doctype html><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${w}px;height:${h}px;background:#06080b;color:#e6edf3;overflow:hidden;
       font-family:Inter,sans-serif;position:relative}
  pre{font-family:'JetBrains Mono',monospace;white-space:pre}

  .mapwrap{position:absolute;top:50%;right:40px;translate:0 -50%}
  .map{font-size:${fontSize}px;line-height:1.32;color:#2a3442}
  .map b{color:#56d364;text-shadow:0 0 10px rgba(63,185,80,.9)}
  .map s{color:#2ea043;text-decoration:none}
  .flag{position:absolute;font-size:18px;line-height:1;opacity:.62;filter:saturate(.7)}

  .scrim{position:absolute;inset:0;
         background:linear-gradient(100deg,#06080b 26%,rgba(6,8,11,.94) 42%,rgba(6,8,11,.55) 60%,rgba(6,8,11,.25) 100%)}
  .glow{position:absolute;top:50%;right:16%;translate:50% -50%;width:720px;height:720px;
        border-radius:50%;background:radial-gradient(circle,rgba(63,185,80,.10),transparent 62%)}

  .left{position:absolute;left:76px;top:50%;translate:0 -50%;width:600px}
  .head{display:flex;align-items:center;gap:30px}
  .avatar{width:132px;height:132px;border-radius:50%;object-fit:cover;
          border:3px solid rgba(63,185,80,.55);box-shadow:0 0 40px rgba(63,185,80,.22)}
  /* The DAX wordmark, same extruded ANSI-Shadow blocks as the main OG card. */
  .wordmark{font-size:22px;font-weight:700;color:#e6edf3;line-height:1.16;
            text-shadow:0 0 26px rgba(63,185,80,.28)}
  .handle{display:flex;align-items:center;gap:9px;margin-top:22px;
          font-family:'JetBrains Mono',monospace;font-size:24px;color:#8b949e}
  .handle svg{width:24px;height:24px;fill:#8b949e}
  .line{font-size:23px;color:#8b949e;margin-top:16px;line-height:1.35}
  .line b{color:#e6edf3;font-weight:600}
  .stats{display:flex;gap:44px;margin-top:28px}
  .n{font-family:'JetBrains Mono',monospace;font-size:30px;font-weight:500;color:#3fb950}
  .lbl{font-size:14px;color:#6e7681;margin-top:3px}

  footer{position:absolute;left:76px;bottom:40px;font-size:17px;
         font-family:'JetBrains Mono',monospace;color:#6e7681}
  footer b{color:#3fb950;font-weight:500}
</style>

<div class="mapwrap"><pre class="map">${map}</pre>${flags}</div>
<div class="scrim"></div>
<div class="glow"></div>

<div class="left">
  <div class="head">
    <img class="avatar" src="${avatar}" alt="">
    <pre class="wordmark">${NAME}</pre>
  </div>
  <div class="handle">
    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
    @${user.login}
  </div>
  <div class="line">Open source across <b>Linux infrastructure</b>, security and <b>scientific computing</b>.</div>
  <div class="stats">
    <div><div class="n">${stats.public_repos}</div><div class="lbl">repos</div></div>
    <div><div class="n">${nf.format(stats.contributions_last_year)}</div><div class="lbl">contributions</div></div>
    <div><div class="n">${nf.format(user.followers)}</div><div class="lbl">followers</div></div>
  </div>
</div>

<footer>daxrpm<b>.</b>dev/github</footer>`;
};

/* ---------- render ------------------------------------------------------------------ */

const shoot = async (name, w, h, html) => {
  const tmp = resolve(`${name}.tmp.html`);
  const out = resolve(`public/${name}.png`);
  await writeFile(tmp, html);

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

  /**
   * Chrome's PNG encoder is lazy: it wrote 287 KB for a picture that squeezes to 112 KB with
   * no loss at all. That mattered — WhatsApp silently drops a link preview whose image is
   * anywhere near 300 KB, which is exactly how this card ended up rendering as a bare URL.
   *
   * Lossless on purpose: a palette gets it to 56 KB, but quantising the flags to 128 colours
   * turns them into grey smudges.
   */
  const raw = await readFile(out);
  const squeezed = await sharp(raw).png({ compressionLevel: 9, effort: 10 }).toBuffer();
  await writeFile(out, squeezed);

  const kb = (n) => `${Math.round(n / 1024)} KB`;
  console.log(`[og] wrote public/${name}.png (${w}×${h}, ${kb(raw.length)} → ${kb(squeezed.length)})`);
};

await shoot('og', 1200, 630, card(1200, 630, false));
await shoot('banner', 1584, 396, card(1584, 396, true));
await shoot('og-github', 1200, 630, await githubCard(1200, 630));
