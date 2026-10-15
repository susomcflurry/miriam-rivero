// Generates index.html, en/index.html, de/index.html and i18n.json from src/.
// Run: node src/build.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages, shared } from './content.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const template = await readFile(join(root, 'src/template.html'), 'utf8');

const credits = JSON.parse(await readFile(join(root, 'assets/credits.json'), 'utf8'));
const creditsHtml = (Array.isArray(credits) ? credits : Object.values(credits))
  .map((c) => `<a href="${c.page}">${c.title}</a>, ${(c.creator ?? '').replace(/\(\s*/g, '(').replace(/\s*\)/g, ')')} (<a href="${c.licenceUrl ?? c.licenseUrl}">${c.licence ?? c.license}</a>)`)
  .join('; ');

const attr = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const list = (items) => items.map((item) => `<li>${item}</li>`).join('');

for (const [lang, copy] of Object.entries(languages)) {
  const pageUrl = shared.siteUrl + copy.path;
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${shared.siteUrl}#miriam-rivero`,
        name: 'Miriam Rivero',
        givenName: 'Miriam',
        familyName: 'Rivero',
        jobTitle: copy.jobTitle,
        description: copy.description,
        url: shared.siteUrl,
        email: `mailto:${shared.email}`,
        sameAs: [shared.linkedin],
        knowsLanguage: ['de', 'en', 'es'],
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'TH Köln', alternateName: 'Technische Hochschule Köln' },
        address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
      },
      {
        '@type': 'WebSite',
        '@id': `${shared.siteUrl}#website`,
        url: shared.siteUrl,
        name: 'Miriam Rivero',
        inLanguage: ['es', 'en', 'de'],
        publisher: { '@id': `${shared.siteUrl}#miriam-rivero` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: copy.title,
        inLanguage: lang,
        isPartOf: { '@id': `${shared.siteUrl}#website` },
        mainEntity: { '@id': `${shared.siteUrl}#miriam-rivero` },
      },
    ],
  }).replaceAll('<', '\\u003c');
  const values = { ...shared, ...copy, lang, jsonld, credits: creditsHtml, mailto: attr(copy.mailto) };
  const html = template
    .replace(/\{\{list:(\w+)\}\}/g, (_, key) => list(copy[key]))
    .replace(/\{\{(\w+)\}\}/g, (match, key) => {
      if (!(key in values)) throw new Error(`Missing key "${key}" for ${lang}`);
      return values[key];
    });
  const out = join(root, copy.path, 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`wrote ${copy.path || './'}index.html`);
}

await writeFile(join(root, 'i18n.json'), JSON.stringify(languages));

// Sitemap with hreflang alternates, and robots.txt pointing at it
const alternates = Object.entries(languages)
  .map(([l, c]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${shared.siteUrl}${c.path}"/>`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${shared.siteUrl}"/>`)
  .join('\n');
const today = new Date().toISOString().slice(0, 10);
const urls = Object.values(languages)
  .map((c) => `  <url>\n    <loc>${shared.siteUrl}${c.path}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`)
  .join('\n');
await writeFile(
  join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
);
await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${shared.siteUrl}sitemap.xml\n`);
console.log('wrote sitemap.xml, robots.txt');
console.log('wrote i18n.json');
