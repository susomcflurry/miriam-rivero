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
  const values = { ...shared, ...copy, lang, credits: creditsHtml, mailto: attr(copy.mailto) };
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
console.log('wrote i18n.json');
