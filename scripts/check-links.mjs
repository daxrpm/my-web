/**
 * Fails the build if any outbound link in dist/ is dead.
 *
 * The previous site shipped a featured project pointing at a 404 repo and three demo
 * links on a domain that no longer had DNS. Nothing caught it because nothing looked.
 * This looks.
 */
import { readFile } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');

// Only <a> targets: preconnect/dns-prefetch hints and schema.org @context URLs are
// references, not destinations, and are not expected to answer a GET.
const urls = [
  ...new Set([...html.matchAll(/<a\b[^>]*\bhref="(https?:\/\/[^"]+)"/g)].map((m) => m[1])),
].sort();

const check = async (url) => {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; daxrpm.dev link checker)' },
        signal: AbortSignal.timeout(15_000),
      });
      // LinkedIn answers bot traffic with 999. The page is fine; the crawler is not welcome.
      if (res.status === 999) return { url, status: '999 (bot-blocked)', ok: true };
      // Some hosts reject HEAD outright; retry as GET before believing the failure.
      if (res.status === 405 && method === 'HEAD') continue;
      return { url, status: res.status, ok: res.ok };
    } catch (err) {
      if (method === 'GET') return { url, status: err.name === 'TimeoutError' ? 'timeout' : 'unreachable', ok: false };
    }
  }
  return { url, status: 'unknown', ok: false };
};

const results = await Promise.all(urls.map(check));
const dead = results.filter((r) => !r.ok);

for (const r of results) {
  console.log(`${r.ok ? '  ok ' : ' DEAD'}  ${String(r.status).padEnd(11)} ${r.url}`);
}

console.log(`\n${results.length - dead.length}/${results.length} links OK`);

if (dead.length) {
  console.error(`\n${dead.length} dead link(s) — refusing to deploy.`);
  process.exit(1);
}
