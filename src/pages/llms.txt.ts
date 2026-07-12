/**
 * llms.txt — the file GPTBot, ClaudeBot and PerplexityBot read to understand who this is.
 *
 * It used to be a hand-written file in public/, which meant it drifted the moment the site's
 * positioning changed (and it had: it still described Dax as a particle-physics ML person
 * long after the work had moved to infrastructure). Generating it from profile.ts is the
 * only way it stays true, so this is an endpoint rather than a static asset.
 *
 * English only, on purpose: the crawlers that read this are indexing an entity, not serving
 * a locale, and one canonical description resolves the entity more cleanly than two.
 */
import type { APIRoute } from 'astro';
import {
  site,
  about,
  featured,
  affiliation,
  experience,
  research,
  education,
  skills,
  seo,
} from '../data/profile';
import github from '../data/github.json';

const strip = (s: string) => s.replace(/<\/?em>/g, '');

/** Feed the model the same facts the page states, in the order a reader would need them. */
const build = () => {
  const repoUrl = (repo: string, owner = site.handle) => `https://github.com/${owner}/${repo}`;
  const descriptions = new Map(
    [...github.all, ...github.cms].map((r: { name: string; description: string | null }) => [
      r.name,
      r.description,
    ]),
  );

  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${strip(site.summary.en)}`,
    '',
    `Also known as: ${seo.alternateNames.join(', ')}.`,
    `Contact: ${site.emails.map((e) => e.address).join(' · ')}`,
    `Location: ${site.location.en}. Writing software since ${site.codingSince}.`,
    '',
    '## About',
    '',
    ...about.body.en.map((p) => `${p}\n`),
    '## Selected work',
    '',
    ...featured.map((p) => {
      const where = p.repo ? `](${repoUrl(p.repo, p.owner)})` : ']';
      const head = p.repo ? `- [${p.title}${where}` : `- **${p.title}**`;
      const status = p.status ? ` (${p.status.en})` : '';
      return `${head}${status}: ${strip(p.blurb.en)} Stack: ${p.stack.join(', ')}.`;
    }),
    '',
    `## ${affiliation.org}`,
    '',
    `${affiliation.role.en} (${affiliation.period}).`,
    '',
    strip(affiliation.body.en),
    '',
    ...affiliation.links.map((l) => `- [${l.label.en}](${l.url})`),
    '',
    '## Experience',
    '',
    ...experience.map(
      (e) =>
        `- **${e.role.en} — ${e.org}** (${e.period}). ${e.note.en} ${e.points.en.join(' ')}`,
    ),
    '',
    '## Research',
    '',
    ...research.map(
      (r) => `- **${r.title}**. ${r.authors}. ${r.venue}. ${r.status.en}. ${r.summary.en} ${r.contribution.en}`,
    ),
    '',
    '## Education',
    '',
    ...education.map(
      (e) => `- **${e.title.en} — ${e.institution}** (${e.period}). ${e.note.en}${e.href ? ` ${e.href}` : ''}`,
    ),
    '',
    '## Skills',
    '',
    ...skills.map((g) => `- **${g.group.en}**: ${g.items.join(', ')}`),
    '',
    '## FAQ',
    '',
    ...about.faqs.en.map((f) => `### ${f.q}\n\n${f.a}\n`),
    '## Also on GitHub',
    '',
    ...(github.recent as { name: string }[])
      .slice(0, 10)
      .filter((r) => !featured.some((p) => p.repo === r.name))
      .map((r) => {
        const d = descriptions.get(r.name);
        return `- [${r.name}](${repoUrl(r.name)})${d ? `: ${d}` : ''}`;
      }),
    '',
    '## Links',
    '',
    `- [Website](${site.url}) · [Spanish](${site.url}/es/)`,
    ...site.socials.map((s) => `- [${s.name}](${s.url})`),
    `- [All ${github.stats.public_repos} repositories](https://github.com/${site.handle}?tab=repositories)`,
    '',
  ];

  return lines.join('\n');
};

export const GET: APIRoute = () =>
  new Response(build(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
