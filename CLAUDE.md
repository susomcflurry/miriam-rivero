# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is the professional landing page of Miriam Rivero, a conference interpreter and translator (DE, EN, ES). It is built with Next.js 16 and React 19 and exported as fully static HTML, one prerendered page per language. PRODUCT.md holds the product facts and what must not be invented. `.impeccable/surfaces/index-html.md` holds the visual direction contract, and DESIGN.md the design system.

## Commands

```bash
npm run dev                      # dev server at http://localhost:3000
npm run build                    # static export to out/
docker compose up -d --build     # builds the export inside Docker and serves it with nginx at http://localhost:8080/

# design gates (tasteskill v2; need Chrome). Run inspect against a served URL, not out/index.html
# (its own file server can't resolve /_next and /assets):
(cd out && python3 -m http.server 8765) &
node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs http://127.0.0.1:8765/
node ~/.claude/skills/design-taste-frontend/scripts/lint.mjs app/styles.css src
```

There are no tests.

## Architecture

- **Three root layouts, one per language.** The route groups `app/(es)`, `app/(en)/en` and `app/(de)/de` each have their own `layout.jsx`, so every page ships the correct `<html lang>`. All three render `src/components/Shell.jsx`, which sets up the fonts through `next/font/google` and the inline script that adds `html.js`, and `src/components/Page.jsx`, which adds the JSON-LD and preloads the first stage photo.
- **Copy lives in `src/content.js`**, with one object per language. It also holds `stage1`, `stage2` and `plate`: ES opens on Madrid, while EN and DE open on Cologne. `src/site.js` derives the metadata (canonical, hreflang, og/twitter), the JSON-LD and the photo credit line from it. `app/sitemap.js` and `app/robots.js` use the same source.
- **`src/components/Site.jsx` is the only client component.** It holds the language in state:
  - The ES/EN/DE channel links are real `<a href>`, but a click fades every `[data-t]` node with WAAPI, swaps the language in place with `flushSync`, and calls `history.pushState`.
  - A `popstate` listener keeps back and forward in sync with the URL.
  - New visible text must carry `data-t` so it fades with the switch.
- **Imperative effects** live in the same component: the IntersectionObserver reveals (they add `is-in`), the stage crossfade, the dock visibility and the work preview. Reveals only hide content when `html.js` is set.
- **Styles** are one global sheet, `app/styles.css`, with the "split stage" layout and exactly five type steps (`--step-*`). Font families come from the `--font-display` and `--font-text` variables that `next/font` sets.
- **URLs**: `trailingSlash: true` gives `/en/` and `/de/`. `shared.siteUrl` is temporarily `https://www.miriamrivero.com/`; the apex `miriamrivero.com` 308-redirects to `www` in Vercel.

## Images and credits

- `public/assets/img/*.webp` are the crops the page uses, and `assets/originals/` holds the downloaded sources.
- `assets/credits.json` records the source and licence of each photograph and feeds the footer credit line. Several photos are CC BY-SA, so their crops stay under the same licence.
- `public/og-image.jpg` (1200×630) is a static render.
- The portrait `public/assets/img/miriam.webp` (480×600) is a retouched upscale of a 289px LinkedIn avatar. Replace it when a real photo is available.

## Design rules in force

The tasteskill house rules apply: no eyebrows, no monospace, no gradients (except the caption scrim, marked `taste-skill-ignore`), no shadows, no thin rules, no card grids, no 01/02/03 numbering, and headlines of at most two lines. Hover styles go inside `@media (hover: hover) and (pointer: fine)`.
