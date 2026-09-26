// Injects the server-rendered page and JSON-LD into dist/index.html after `vite build`.
// Run via `npm run build` (see package.json). Fails the build if anything is missing.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = resolve(root, 'dist/index.html');
const ssrDir = resolve(root, '.ssr');

const { render, jsonLd } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

const template = readFileSync(htmlPath, 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-jsonld-->')) {
  throw new Error('prerender: placeholders not found in dist/index.html');
}

const appHtml = render();
const html = template
  .replace('<!--app-html-->', appHtml)
  .replace('<!--app-jsonld-->', `<script type="application/ld+json">${jsonLd()}</script>`);

// Sanity checks: key content must be in the static HTML.
for (const must of ['<h1', 'Every call answered.', 'WhatsApp Campaigns', 'Voice Blast', 'Frequently Asked Questions', '"@type":"FAQPage"']) {
  if (!html.includes(must)) throw new Error(`prerender: expected "${must}" in output`);
}

writeFileSync(htmlPath, html);
rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote dist/index.html (${(html.length / 1024).toFixed(1)} kB, app HTML ${(appHtml.length / 1024).toFixed(1)} kB)`);
