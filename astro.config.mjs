// @ts-check
import { defineConfig } from 'astro/config';

// Astro configuration.
// `site` is used to build absolute URLs for SEO tags (Open Graph, canonical,
// sitemap). Update it to the real domain once the site is deployed.
export default defineConfig({
  site: 'https://www.kalee-bride.rs', // TODO: change to the final domain
  compressHTML: true,
});
