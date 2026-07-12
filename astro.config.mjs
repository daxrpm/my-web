import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output: every page is real HTML on disk, which is the whole point —
// GPTBot, ClaudeBot and PerplexityBot do not execute JavaScript.
export default defineConfig({
  site: 'https://daxrpm.dev',
  output: 'static',
  integrations: [
    // Teaching the sitemap about the locales makes it emit <xhtml:link rel="alternate">
    // per URL — the second half of the hreflang contract, after the <link> tags in <head>.
    // Without it Google sees two pages that merely look similar, rather than one page in
    // two languages, and picks a winner instead of serving each to the right audience.
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
