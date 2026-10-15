// Writes the smaller responsive variants listed in src/images.js next to each crop.
// Needs cwebp (brew install webp). Usage: node scripts/resize-images.mjs
import { execFileSync } from 'node:child_process';
import { IMAGES } from '../src/images.js';

const dir = new URL('../public/assets/img/', import.meta.url).pathname;

for (const [name, { variants }] of Object.entries(IMAGES)) {
  for (const width of variants) {
    const out = `${dir}${name}-${width}.webp`;
    execFileSync('cwebp', ['-quiet', '-q', '78', '-m', '6', '-sharp_yuv', '-resize', String(width), '0', `${dir}${name}.webp`, '-o', out]);
    console.log(out.slice(dir.length));
  }
}
