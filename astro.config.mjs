import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output: every page is real HTML on disk, which is the whole point —
// GPTBot, ClaudeBot and PerplexityBot do not execute JavaScript.
export default defineConfig({
  site: 'https://daxrpm.dev',
  output: 'static',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
