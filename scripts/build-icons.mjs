/**
 * Bakes the icon set into src/data/icons.ts, so the site ships inline SVG with no
 * runtime dependency and no network request. Run `npm run icons` after adding a
 * technology to profile.ts — the build fails loudly if a label has no icon.
 *
 *   si:<slug>  a brand mark from simple-icons (filled, single path)
 *   lu:<name>  a glyph from lucide (stroked, for things with no brand: PAM, sockets…)
 */
import { writeFileSync, readFileSync } from 'node:fs';
import * as si from 'simple-icons';

/**
 * Every technology label used anywhere in profile.ts (skills, project stacks) plus the
 * language names GitHub reports. Keys are matched case-insensitively.
 */
const MANIFEST = {
  // Languages
  Python: 'si:python',
  Rust: 'si:rust',
  C: 'si:c',
  'C++': 'si:cplusplus',
  Java: 'si:openjdk',
  TypeScript: 'si:typescript',
  JavaScript: 'si:javascript',
  Bash: 'si:gnubash',
  Shell: 'si:gnubash',
  SQL: 'lu:database',
  HTML: 'si:html5',
  'Jupyter Notebook': 'si:jupyter',
  Go: 'si:go',

  // Infrastructure & DevOps
  Linux: 'si:linux',
  Docker: 'si:docker',
  Nginx: 'si:nginx',
  Kubernetes: 'si:kubernetes',
  Coolify: 'si:coolify',
  'Apache Airflow': 'si:apacheairflow',
  Proxmox: 'si:proxmox',
  Nextcloud: 'si:nextcloud',
  Immich: 'si:immich',
  // Headscale is the open control server for the Tailscale protocol, not Tailscale itself,
  // so it gets a mesh glyph rather than someone else's brand mark.
  Headscale: 'lu:route',

  // Systems
  PAM: 'lu:key-round',
  Syscalls: 'lu:cpu',
  Sockets: 'lu:cable',
  SSH: 'lu:terminal',

  // Networks & security
  'TCP/IP': 'lu:network',
  'Network Engineering': 'lu:waypoints',
  Wireshark: 'si:wireshark',
  Keycloak: 'si:keycloak',
  OAuth2: 'lu:shield-check',
  RBAC: 'lu:users',
  'Access Control': 'lu:fingerprint',

  // Architecture (Nexalink)
  'Hexagonal Architecture': 'lu:layers',
  'Real-time Systems': 'lu:activity',

  // ML & data
  PyTorch: 'si:pytorch',
  TensorFlow: 'si:tensorflow',
  'scikit-learn': 'si:scikitlearn',
  ONNX: 'si:onnx',
  'ONNX Runtime': 'si:onnx',
  OpenCV: 'si:opencv',
  NumPy: 'si:numpy',
  Pandas: 'si:pandas',
  'Machine Learning': 'lu:brain',
  'Computer Vision': 'lu:eye',
  YOLO11: 'si:ultralytics',
  OpenVINO: 'si:intel',
  Ollama: 'si:ollama',
  MCP: 'si:modelcontextprotocol',

  // Backend
  FastAPI: 'si:fastapi',
  Django: 'si:django',
  'Spring Boot': 'si:springboot',
  PostgreSQL: 'si:postgresql',
  Redis: 'si:redis',
  REST: 'lu:plug',
  React: 'si:react',
  'Three.js': 'si:threedotjs',

  // Physics & numerics
  ROOT: 'si:root',
  NanoAOD: 'lu:binary',
  'Numerical Methods': 'lu:sigma',
  SciPy: 'si:scipy',
  Manim: 'lu:atom',

  // Social / chrome
  GitHub: 'si:github',
  LinkedIn: 'lu:linkedin',
};

/* ---------- colour tone-mapping ---------------------------------------------------- */

const hexToRgb = (h) => [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

function rgbToHsl([r, g, b]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    max === r ? ((g - b) / d + (g < b ? 6 : 0)) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}

const hslCss = ([h, s, l]) =>
  `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;

/**
 * Brand palettes are tuned for a white page in a slide deck, not for a near-black canvas:
 * Rust, Three.js and Ollama are pure black, NumPy is near-black navy. Rather than drop the
 * colour (every icon grey) or ship it raw (invisible marks), each hue is clamped into a
 * lightness band that reads on the theme it is being drawn on. Achromatic marks lose their
 * (meaningless) hue and become a neutral tint, which is what a designer would hand-pick.
 */
function toneMap(hex) {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  const achromatic = s < 0.08;
  return {
    // On the dark canvas: keep it bright enough to read.
    dark: hslCss([h, achromatic ? 0 : Math.max(s, 0.45), Math.min(Math.max(l, 0.62), 0.78)]),
    // On the light canvas: keep it dark enough to read.
    light: hslCss([h, achromatic ? 0 : Math.max(s, 0.4), Math.min(Math.max(l, 0.3), 0.46)]),
  };
}

/* ---------- icon sources ------------------------------------------------------------ */

function brand(slug) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icon = si[key];
  if (!icon) throw new Error(`simple-icons has no "${slug}"`);
  return {
    kind: 'brand',
    body: `<path d="${icon.path}"/>`,
    color: toneMap(icon.hex),
  };
}

/** Lucide ships brand marks no more, so the two we need are inlined at their source geometry. */
const LUCIDE_EXTRA = {
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
};

function glyph(name) {
  if (LUCIDE_EXTRA[name]) return { kind: 'glyph', body: LUCIDE_EXTRA[name] };
  const svg = readFileSync(`node_modules/lucide-static/icons/${name}.svg`, 'utf8');
  const body = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '').trim();
  if (!body) throw new Error(`lucide has no "${name}"`);
  return { kind: 'glyph', body: body.replace(/\s+/g, ' ') };
}

/* ---------- emit -------------------------------------------------------------------- */

const icons = {};
for (const [label, source] of Object.entries(MANIFEST)) {
  const [kind, slug] = source.split(':');
  icons[label.toLowerCase()] = kind === 'si' ? brand(slug) : glyph(slug);
}

const out = `/**
 * GENERATED by scripts/build-icons.mjs — do not edit. Run \`npm run icons\` to rebuild.
 *
 * Brand marks come from simple-icons (filled paths, 24x24) and are tone-mapped so they
 * stay legible on both themes; everything without a brand (PAM, sockets, REST…) gets a
 * stroked lucide glyph that inherits currentColor.
 */

export type Icon =
  | { kind: 'brand'; body: string; color: { dark: string; light: string } }
  | { kind: 'glyph'; body: string };

const icons: Record<string, Icon> = ${JSON.stringify(icons, null, 2)};

/** Case-insensitive: 'Three.js', 'three.js' and 'THREE.JS' all resolve. */
export const iconFor = (label: string): Icon | undefined => icons[label.toLowerCase()];
`;

writeFileSync('src/data/icons.ts', out);
console.log(`icons: wrote ${Object.keys(icons).length} to src/data/icons.ts`);
