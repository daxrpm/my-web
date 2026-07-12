# daxrpm.dev

Personal site. Astro, static output, **zero client-side JavaScript** apart from the
analytics tracker.

## Why static matters here

GPTBot, ClaudeBot and PerplexityBot do not execute JavaScript. The previous build was a
client-rendered Vite SPA, so every AI crawler saw exactly this:

```html
<body><div id="root"></div></body>
```

Everything now ships as real HTML in the initial response. Verify it any time with:

```bash
curl -s -A GPTBot https://daxrpm.dev | grep -c "Dax"
```

## Commands

| Command               | Does                                                             |
| --------------------- | ---------------------------------------------------------------- |
| `npm run dev`         | Dev server                                                        |
| `npm run sync:github` | Pull repos + contribution calendar → `src/data/github.json`       |
| `npm run build`       | Sync GitHub data, typecheck, build to `dist/`                     |
| `npm run check:links` | Fail on any dead outbound link in `dist/`                         |
| `npm run og`          | Regenerate `public/og.png` from live stats (needs Chrome)         |

## Content

- **`src/data/profile.ts`** — everything hand-written: featured projects, education, FAQ.
  Edit this.
- **`src/data/github.json`** — generated. Never edit; it is overwritten on every build.

Featured projects key off the GitHub repo name, so stars, language and last-pushed date
merge in automatically from the API. Screenshots are optional — a project renders fine
without one and picks it up the moment you drop a file at the `image` path.

## Environment

Copy `.env.example` to `.env`.

- `PUBLIC_UMAMI_HOST` + `PUBLIC_UMAMI_ID` — if either is missing, the tracker is omitted
  from the build entirely, so local and preview builds never pollute stats.
- `GITHUB_TOKEN` — optional, `read:user` scope. The contribution calendar is not in the
  REST API; without a token the fetch script falls back to a public proxy.

## Analytics

Umami, cookieless. Events are declared as `data-umami-event` attributes on the elements
themselves, so they cost no JavaScript beyond the tracker.

| Event              | Properties                    | Answers                                       |
| ------------------ | ----------------------------- | --------------------------------------------- |
| `project-click`    | `project`, `tag`, `target`    | Which work gets clicked, and from where        |
| `repo-click`       | `repo`                        | Which secondary repos pull interest            |
| `email-click`      | `inbox`                       | Who actually makes contact, and via which inbox |
| `social-click`     | `network`                     | GitHub vs LinkedIn                             |
| `credential-click` | `credential`                  | Someone verifying a certificate                |
| `cta-click`        | `cta`                         | Which hero button works                        |
| `nav-click`        | `section`                     | What people jump to first                      |
| `github-profile`   | `source`                      | Which entry point sends people to GitHub       |
| `section-view`     | `section`                     | How far down the page people actually get      |

`section-view` is the only one needing JS — a small IntersectionObserver in
`src/components/Analytics.astro`.

## Deploy

`.github/workflows/deploy.yml` runs on push to `main` and daily at 06:17 UTC — the
schedule is what keeps the contribution graph and repo list current without a commit.

Required repository secrets:

| Secret                                   | For                                       |
| ---------------------------------------- | ----------------------------------------- |
| `GH_PAT`                                 | Contribution calendar (`read:user`)        |
| `PUBLIC_UMAMI_HOST`, `PUBLIC_UMAMI_ID`   | Analytics                                  |
| `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_SSH_KEY` | rsync to the VPS       |

The build fails if any outbound link is dead. That is deliberate: the previous site
shipped a featured project pointing at a 404 and three demo links on a domain that had
lost its DNS, and nothing caught it because nothing was looking.
