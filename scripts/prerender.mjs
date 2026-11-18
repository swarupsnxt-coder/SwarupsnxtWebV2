// Injects the server-rendered page and JSON-LD into dist/index.html after `vite build`, writes
// one dist/<path>/index.html per route (entry-server.tsx `routes`) with its own title, description
// and canonical URL, and generates dist/sitemap.xml from the same list.
// Run via `npm run build` (see package.json). Fails the build if anything is missing.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(root, 'dist');
const ssrDir = resolve(root, '.ssr');

const { render, jsonLd, routes, SITE } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-jsonld-->')) {
  throw new Error('prerender: placeholders not found in dist/index.html');
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replaces exactly one match in the template, so a renamed tag in index.html fails the build.
const replaceOnce = (html, pattern, replacement) => {
  const matches = html.match(new RegExp(pattern.source, 'g')) ?? [];
  if (matches.length !== 1) throw new Error(`prerender: expected one match for ${pattern}, found ${matches.length}`);
  return html.replace(pattern, replacement);
};

const withMeta = (html, { title, description, url }) => {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`);
  html = replaceOnce(html, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${d}"`);
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${t}"`);
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${d}"`);
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${t}"`);
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${d}"`);
  return html;
};

for (const { path, meta } of routes) {
  const appHtml = render(path);
  let html = template
    .replace('<!--app-html-->', appHtml)
    .replace('<!--app-jsonld-->', `<script type="application/ld+json">${jsonLd(path)}</script>`);
  if (meta) html = withMeta(html, meta);

  // Sanity checks: key content must be in the static HTML.
  const pageMusts = ['<h1', 'Frequently Asked Questions', 'id="contact"', '"@type":"FAQPage"', '"@type":"BreadcrumbList"'];
  const musts = path === '/'
    ? ['"sameAs":[', 'Swarups NXT on LinkedIn', '<h1','Scale Customer Engagement', 'Bulk WhatsApp &amp; RCS Engine', 'Voice Blast', 'What do you', 'Frequently Asked Questions', '"@type":"FAQPage"']
    : path === '/guides/'
      ? ['<h1', 'id="contact"', '"@type":"CollectionPage"', '"@type":"BreadcrumbList"', `<link rel="canonical" href="${meta.url}"`]
      : path.startsWith('/guides/')
        ? [...pageMusts, 'Last updated', '"@type":"Article"', `<link rel="canonical" href="${meta.url}"`]
        : path.startsWith('/industries/')
          ? [...pageMusts, 'Use cases', `<link rel="canonical" href="${meta.url}"`]
          : [...pageMusts, 'What you get', 'How it works', `<link rel="canonical" href="${meta.url}"`];
  for (const must of musts) {
    if (!html.includes(must)) throw new Error(`prerender: expected "${must}" in ${path}`);
  }

  const outDir = resolve(distDir, `.${path}`);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), html);
  console.log(`prerender: wrote ${path}index.html (${(html.length / 1024).toFixed(1)} kB)`);
}

// Sitemap = every pre-rendered route, so new pages can't be left out.
const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(({ path }) => `  <url>
    <loc>${SITE}${path.slice(1)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap);
console.log(`prerender: wrote sitemap.xml (${routes.length} URLs)`);

rmSync(ssrDir, { recursive: true, force: true });
