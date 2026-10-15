# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is the professional landing page of Miriam Rivero, a conference interpreter and translator (DE, EN, ES). It is a static site with no framework and no dependencies, available in three languages. PRODUCT.md holds the product facts and what must not be invented. `.impeccable/surfaces/index-html.md` holds the visual direction contract.

## Commands

```bash
node src/build.mjs                       # regenerate index.html, en/index.html, de/index.html and i18n.json
python3 -m http.server 8765              # preview at http://127.0.0.1:8765/ (the language switch needs http, not file://)
docker compose up -d --build             # nginx container at http://localhost:8080/ (run the build first: it copies the generated HTML)

# design gates (tasteskill v2; need Node 22+ and Chrome)
node ~/.claude/skills/design-taste-frontend/scripts/lint.mjs index.html styles.css main.js
node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs index.html   # screenshots in .taste-skill/inspect/
```

There are no tests. Run the build after every change to `src/`, and commit the generated files, because the host serves them as they are.

## Architecture

- **Single source, three outputs.** `src/content.mjs` holds every string per language (`es` at the root, `en/`, `de/`) and the `path` and `root` of each one. `src/template.html` uses `{{key}}` and `{{list:key}}` placeholders. `src/build.mjs` fills them in and writes one HTML page per language, plus `i18n.json` with the whole dictionary. The generated `index.html`, `en/index.html` and `de/index.html` are build output, so never edit them by hand.
- **In-place language switch** (`main.js`):
  - The ES/EN/DE links work as plain links without JS.
  - With JS, they fetch `i18n.json` and rewrite every element marked with `data-i18n` (text), `data-i18n-html`, `data-i18n-list`, `data-i18n-attr="attr:key"` or `data-i18n-href`. Then they `pushState` to that language's URL.
  - Before the URL changes, all `img` `src` values are pinned to absolute URLs, because relative paths would otherwise break once the URL's directory changes.
  - **Any new translatable element needs both the `{{key}}` placeholder and the matching `data-i18n*` attribute**, and the key must exist in all three languages. The build throws if a key is missing.
- **Relative paths everywhere** (`{{root}}`) so the site works from a domain root or a subpath (for example GitHub Pages). `shared.siteUrl` in `content.mjs` (https://miriamrivero.com/, hosted on Vercel, DNS at IONOS) feeds the canonical, hreflang and og tags.
- **Layout ("split stage")**: a sticky photo stage on the left crossfades from Cologne to Madrid when `[data-stage-trigger]` scrolls up. Reveal animations only hide content when `html.js` is set. The type scale is exactly five steps (`--step-*` in `styles.css`), and the inspector fails pages that add more sizes.

## Images and credits

- `assets/*.jpg` are the downloaded originals. `assets/img/*.webp` are the crops the page uses, made with `sips` and `cwebp`.
- `assets/credits.json` records the source and licence of each photograph. The build turns it into the footer credit line, so remove an entry there if its photo stops being used.
- Several photos are CC BY-SA, so their crops stay under the same licence.
- The portrait `assets/img/miriam.webp` is a provisional 150px crop of a LinkedIn avatar and is pending a real photo.

## Design rules in force

The tasteskill house rules apply: no eyebrows, no monospace, no gradients (except the caption scrim, marked `taste-skill-ignore`), no shadows, no thin rules, no card grids, no 01/02/03 numbering, and headlines of at most two lines. Hover styles go inside `@media (hover: hover) and (pointer: fine)`.
