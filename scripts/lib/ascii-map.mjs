/**
 * A world map in ASCII, rasterized from real coastline data (Natural Earth, via
 * world-atlas) rather than drawn by hand — so the continents are actually the right
 * shape, and the servers land where they really are.
 *
 * The texture is the same one the site's background canvas uses: a scatter of
 * `. · + = * # % @` picked per cell, so the map reads as the same object as the page.
 */
import { createRequire } from 'node:module';
import * as topojson from 'topojson-client';
import { geoContains } from 'd3-geo';

const require = createRequire(import.meta.url);
const land = topojson.feature(
  require('world-atlas/land-110m.json'),
  require('world-atlas/land-110m.json').objects.land,
);

/** Deterministic per-cell noise: same map every build, no Math.random in a build artifact. */
const hash = (x, y) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

/** Terrain only. `*` (a server) and `~` (a link) are reserved, or they could not be told apart. */
const GLYPHS = ['.', ':', '-', '+', '=', '#', '%', '@'];

/**
 * @param bounds  [west, south, east, north] — the crop, in degrees
 * @param cols    width of the drawing, in characters
 * @param aspect  how much taller than wide a character cell is on screen; keeps the
 *                continents from being squashed into a letterbox
 */
export function worldMap({ bounds, cols, aspect = 2.1 }) {
  const [w, s, e, n] = bounds;
  const dLon = (e - w) / cols;
  const dLat = dLon * aspect;
  const rows = Math.round((n - s) / dLat);

  const grid = Array.from({ length: rows }, () => Array(cols).fill(' '));

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Sample the centre of the cell.
      const lon = w + (x + 0.5) * dLon;
      const lat = n - (y + 0.5) * dLat;
      if (!geoContains(land, [lon, lat])) continue;

      // Denser glyphs inland, sparser near the coast, so the outline stays readable.
      const neighbours = [
        [lon + dLon, lat],
        [lon - dLon, lat],
        [lon, lat + dLat],
        [lon, lat - dLat],
      ].filter((p) => geoContains(land, p)).length;

      const weight = hash(x, y) * 0.55 + neighbours / 4 * 0.45;
      grid[y][x] = GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(weight * GLYPHS.length))];
    }
  }

  /** Where a lon/lat lands on the grid. */
  const project = ([lon, lat]) => ({
    x: Math.round((lon - w) / dLon - 0.5),
    y: Math.round((n - lat) / dLat - 0.5),
  });

  /**
   * The link between two sites, arced rather than ruled: a straight line across a flat map
   * is the one path a packet never takes, and the curve is what makes the picture read as a
   * network instead of as a diagram. Quadratic Bézier with the control point lifted above
   * the midpoint — `lift` is how high, as a fraction of the span.
   */
  const connect = (a, b, { lift = 0.28, ch = '~' } = {}) => {
    const p = project(a);
    const q = project(b);

    const mx = (p.x + q.x) / 2;
    const my = (p.y + q.y) / 2;
    const span = Math.hypot(q.x - p.x, (q.y - p.y) * aspect);
    // Up is a smaller row index, hence the minus.
    const cy = my - (span * lift) / aspect;

    const steps = Math.round(span * 1.4);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const u = 1 - t;
      const x = Math.round(u * u * p.x + 2 * u * t * mx + t * t * q.x);
      const y = Math.round(u * u * p.y + 2 * u * t * cy + t * t * q.y);
      // Never overwrite a server with a wire.
      if (grid[y]?.[x] !== undefined && grid[y][x] !== '*') grid[y][x] = ch;
    }
  };

  /** A lit server. Returns its cell, so a caller can hang a flag off it. */
  const place = ([lon, lat]) => {
    const { x, y } = project([lon, lat]);
    if (grid[y]?.[x] === undefined) return null;
    grid[y][x] = '*';
    return { x, y };
  };

  return {
    rows,
    cols,
    connect,
    place,
    render: () => grid.map((r) => r.join('').replace(/\s+$/, '')).join('\n'),
  };
}
