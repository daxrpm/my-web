/**
 * Fetches GitHub profile, repos and the contribution calendar at build time and
 * writes src/data/github.json. Running at build (not in the browser) keeps the
 * data in the server-rendered HTML, where AI crawlers can actually read it, and
 * keeps any token off the client.
 *
 * GITHUB_TOKEN is optional: without it we fall back to a public proxy for the
 * calendar, since the contribution graph is not exposed by the REST API.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const USER = 'daxrpm';
const ORG = 'CMS-EPN';
const TOKEN = process.env.GITHUB_TOKEN;
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/github.json');

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${USER}-portfolio-build`,
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status} ${res.statusText}`);
  return res.json();
}

async function allRepos(owner, kind = 'users') {
  const out = [];
  for (let page = 1; page <= 5; page++) {
    const batch = await gh(`/${kind}/${owner}/repos?per_page=100&page=${page}&sort=pushed`);
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

/**
 * The contribution calendar only exists in the GraphQL API. The public proxy is
 * the fallback so a missing token degrades the graph rather than failing the build.
 */
async function contributions() {
  if (TOKEN) {
    const query = `query($login:String!){
      user(login:$login){
        contributionsCollection{
          contributionCalendar{
            totalContributions
            weeks{ contributionDays{ date contributionCount contributionLevel } }
          }
        }
      }
    }`;
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { login: USER } }),
    });
    const body = await res.json();
    const cal = body?.data?.user?.contributionsCollection?.contributionCalendar;
    if (cal) {
      const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
      return {
        total: cal.totalContributions,
        source: 'graphql',
        days: cal.weeks.flatMap((w) =>
          w.contributionDays.map((d) => ({
            date: d.date,
            count: d.contributionCount,
            level: LEVELS[d.contributionLevel] ?? 0,
          })),
        ),
      };
    }
    console.warn('[github] GraphQL calendar failed, falling back to public proxy');
  }

  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`);
  if (!res.ok) throw new Error(`contributions fallback -> ${res.status}`);
  const data = await res.json();
  return {
    total: data.total.lastYear,
    source: 'proxy',
    days: data.contributions.map((d) => ({ date: d.date, count: d.count, level: d.level })),
  };
}

const repos = await allRepos(USER);
const orgRepos = await allRepos(ORG, 'orgs').catch(() => []);
const user = await gh(`/users/${USER}`);
const calendar = await contributions();

const own = repos.filter((r) => !r.fork && !r.archived && !r.private);

const shape = (r) => ({
  name: r.name,
  full_name: r.full_name,
  description: r.description,
  url: r.html_url,
  homepage: r.homepage || null,
  language: r.language,
  topics: r.topics ?? [],
  stars: r.stargazers_count,
  pushed_at: r.pushed_at,
});

/** Coursework repos crowd out real projects when sorting by recency. */
const NOISE = /^(nm-hw|workshop_|taller-|MN-|test\d|examen|Examen|proyecto_metodos)/;

const languages = {};
for (const r of own) if (r.language) languages[r.language] = (languages[r.language] ?? 0) + 1;

const data = {
  generated_at: new Date().toISOString(),
  user: {
    login: user.login,
    name: user.name,
    bio: user.bio,
    avatar: user.avatar_url,
    url: user.html_url,
    followers: user.followers,
    public_repos: user.public_repos,
    created_at: user.created_at,
  },
  stats: {
    public_repos: user.public_repos,
    stars: own.reduce((n, r) => n + r.stargazers_count, 0),
    contributions_last_year: calendar.total,
    coding_since: new Date(user.created_at).getFullYear(),
    languages: Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count })),
  },
  calendar,
  // Feeds the auto-updating "Recent activity" grid.
  recent: own
    .filter((r) => !NOISE.test(r.name))
    .slice(0, 12)
    .map(shape),
  // Every non-fork repo, so the curated list can enrich itself from live API data.
  all: own.map(shape),
  cms: orgRepos.filter((r) => !r.fork).map(shape),
};

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(data, null, 2) + '\n');

console.log(
  `[github] ${data.all.length} repos, ${data.cms.length} CMS-EPN repos, ` +
    `${calendar.total} contributions (${calendar.source}), ${data.stats.stars} stars`,
);
