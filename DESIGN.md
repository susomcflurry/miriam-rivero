---
name: Miriam Rivero
description: Split stage between two rivers; night field, sodium amber and Madrid granite for a German-native conference interpreter in Madrid.
colors:
  night: "#11151c"
  night-ink: "#e8e8e5"
  night-muted: "#b5b4b0"
  amber: "#d0832f"
  amber-press: "#b9722a"
  amber-hover: "#dc9244"
  amber-ink: "#0e0e0e"
  stone: "#bdbab3"
  stone-2: "#cdcac3"
  paper: "#e3e3e0"
  ink: "#0e0e0e"
  muted: "#3a3a3c"
typography:
  display:
    fontFamily: "'Young Serif', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(3rem, 8.2vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Young Serif', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 1.2rem + 2.6vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Young Serif', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: "0px"
spacing:
  margin: "clamp(20px, 2.2vw, 32px)"
  col-pad: "clamp(24px, 5vw, 88px)"
  section: "clamp(96px, 11vw, 176px)"
  gutter: "24px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.amber-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#dc9244"
    textColor: "{colors.amber-ink}"
  button-primary-active:
    backgroundColor: "{colors.amber-press}"
    textColor: "{colors.amber-ink}"
  button-small:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.amber-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "40px"
  channel:
    textColor: "{colors.night-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 8px"
    height: "40px"
    width: "44px"
  channel-active:
    backgroundColor: "{colors.night-ink}"
    textColor: "{colors.night}"
  visit-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "32px 32px 0"
    width: "420px"
---

# Design System: Miriam Rivero

## Overview

**Creative North Star: "Between Two Rivers"**

Rivero means "of the riverbank", and the system is built from two banks: the Rhine at Cologne, where she trained, and the Manzanares in Madrid, where she works. The page is a night field lit by sodium amber, the colour of bridge lights and Zollverein steel, which gives way to the warm granite greys of Madrid as the story moves south. Real, credited photographs of both cities carry the atmosphere; type and flat colour planes do everything else.

Density is low and deliberate. A sticky photographic stage holds one half of the screen while a narrow reading column moves past it, then the page opens into full-width colour bands (amber, stone, pale stone, a paper card on a photograph, night again). Every plane is flat, every corner square, and nothing is outlined. The serif pairing reads as a printed programme or a visit card, not as a software UI.

Motion is quiet and physical: content rises 24px into place once, the stage crossfades from Rhine to Manzanares, and the wordmark settles slightly as the first screen leaves. The signature interaction is the channel switch, which changes the language of the whole page in place, like tuning a receiver.

**Key Characteristics:**
- Two-river palette: night and amber (Cologne), stone and paper (Madrid).
- Young Serif display over Source Serif 4 text; exactly five type sizes.
- Square corners, no shadows, no outlines; depth comes from photographs and colour planes.
- Full-bleed, credited city photography; one translucent scrim, under the stage caption only.
- The name "Miriam Rivero" is always set with capitals, including the wordmark.

## Colors

A dark, warm-lit night field with one sodium accent, resolving into pale granite planes.

### Primary
- **Sodium Amber** (amber): the one action colour. Every primary button ("Escríbeme", the visit-card button), the services band background, the sticky services heading on phones, the skip link and text selection. Text on it is always ink (amber-ink), never white.
- **Pressed Amber** (amber-press): the pressed state of amber buttons only.

### Neutral
- **Rhine Night** (night): the page ground for the stage, the reading column and the footer. Also the browser theme colour.
- **Bridge-Light White** (night-ink): primary text and the wordmark on night; the fill of the active language channel.
- **River Haze** (night-muted): secondary text on night (intro paragraphs after the lead, notes, legal lines, inactive channels).
- **Madrid Granite** (stone): the experience band.
- **Pale Granite** (stone-2): the about letter band, and the contact section ground on phones.
- **Card Paper** (paper): the visit card that sits on the contact photograph.
- **Ink** (ink): all text on amber, stone, stone-2 and paper.
- **Graphite** (muted): secondary text on the light planes (inactive experience names, meta lines, card labels, the role under the signature).

### Named Rules
**The Two Banks Rule.** Night surfaces belong to Cologne and carry night-ink text; stone and paper surfaces belong to Madrid and carry ink text. A surface never mixes the two text sets.

**The One Fill Rule.** Amber is the only filled, saturated colour. If something is amber, it is either the primary action or the services band; nothing decorative is amber.

## Typography

**Display Font:** Young Serif (with Georgia, Times New Roman)
**Body Font:** Source Serif 4, optical sizing on (with Georgia, Times New Roman)

**Character:** A sturdy, slightly old-fashioned display serif with a sharp, bookish text serif. Together they read as printed matter: a conference programme, a letter, a visit card.

### Hierarchy
- **Display** (Young Serif 400, step-display, 0.95): the wordmark (tracked tighter, -0.04em, single line), and the big section titles of the services and experience bands. On phones the step becomes 12.4vw so the wordmark fills the width.
- **Headline** (Young Serif 400, step-head, 1.05): the language-pair list, the experience names (line-height 1), the footer name.
- **Title** (Young Serif 400, step-lead, 1.15): service titles and the visit-card title.
- **Lead** (Source Serif 4 400, step-lead, 1.35): the hero statement; in italic, the letter signature.
- **Body** (Source Serif 4 400, step-body, 1.55): reading text, service lists (line-height 1.35), the footer menu. Semibold 600 for the intro lead paragraph and for buttons. Reading measure 34 to 36ch in the column; the letter is held to 520px.
- **Label** (Source Serif 4 400, step-small): the top bar, language channels, small button, captions, meta lines, legal and credits.

### Named Rules
**The Five Steps Rule.** Every font-size is one of the five `--step-*` values. A new role reuses an existing step with a different face, weight or style; it never adds a sixth size.

**The Capital Name Rule.** "Miriam Rivero" is always written with capitals, everywhere, in every face and size. No lowercase or uppercase transforms are applied to the name.

## Layout

**The split stage.** Above the fold and through the intro, the screen is a two-part grid (47 / 53). The left part is a sticky, full-height photo inset by 20px from the top, bottom and left edges; the right part is the reading column, padded by col-pad on the left and margin on the right. The hero statement sits at 44% of the viewport height and the wordmark runs along the bottom, right-aligned, crossing from the column onto the photograph.

**Bands after the stage.** Services and experience use a 12-column grid with a 24px gutter: services pins its display title in columns 1 to 6 while the service blocks (120px apart) pass in columns 7 to 12; experience lists names in columns 1 to 8 with a sticky 4:5 preview in columns 9 to 12. The letter is a single centred column. Contact is a full-height photograph with the paper card pinned 60px from its top-right corner. The footer is half photograph, half menu.

**Rhythm.** Bands are separated by colour, never by lines, and padded vertically by the section step. Horizontal edges use the margin step; the reading column's inner edge uses col-pad.

**Responsive.** At 1100px and below, the top-bar links hide and services stacks (title above, blocks capped at 640px). At 820px and below the phone gets its own composition: the stage becomes a 58svh photo at the top with the channel switch and button floating on it, the wordmark is pulled up to overlap the photo's lower edge, a 4:3 plate of the Manzanares appears after the intro, the services heading becomes a sticky amber strip, experience shows each name with its own 16:10 photo, the visit card overlaps its photo by 80px with a full-width button, and the footer stacks photo over menu.

## Elevation & Depth

The system is flat. There are no shadows of any kind. Depth comes from three things only: photographs, flat colour planes stacked edge to edge, and overlap (the wordmark crossing onto the stage photo, the visit card sitting on its photograph, the phone wordmark overlapping the top photo). The single translucent layer is the black scrim (55% to 0%) under the stage caption, which exists to keep a small caption legible on a photograph.

### Named Rules
**The Flat Plane Rule.** Surfaces never lift. If something needs to stand forward, place it on a photograph or a contrasting colour plane; do not add a shadow or a glow.

**The Caption Scrim Exception.** The caption scrim is the only gradient. Text that sits on a photograph either sits on that scrim or on a solid plane.

## Shapes

Every corner is square (0px): buttons, channels, the visit card, photographs, the portrait. Nothing is outlined and no divider lines separate content; separation is by colour plane and space. Photographs are cropped to fixed ratios per role (stage full-height, service images 3:4, experience preview 4:5, phone experience photos 16:10, phone plate 4:3) and fill their frames with object-fit cover. Lines that do appear belong to native affordances, not decoration: link underlines (1px, offset 0.2em), the keyboard focus outline (2px, current colour, offset 4px), and the stroke of the pair arrows.

## Components

### Buttons
Square, one fill, confident.
- **Shape:** square corners (0px).
- **Primary:** amber fill, ink text, Source Serif 4 semibold at the body step, 48px tall, 24px side padding. The visit-card button runs the full card width at 52px (56px on phones).
- **Small:** the top-bar "Escríbeme", 40px tall, 18px padding, label step.
- **Hover / Active:** on fine pointers only, the fill lightens to amber-hover (#dc9244); on press it scales to 0.97 and darkens to amber-press (transform 140ms, colour 160ms).
- **Focus:** 2px outline in the current colour, offset 4px.

### Language channels
The signature control. Three square cells, ES / EN / DE, 44 by 40px, 4px apart, label step.
- **Inactive:** river-haze text on night, no fill. On phones each cell sits on a 72% night fill so it reads over the photo.
- **Active:** inverted, night-ink fill with night text (`aria-current`).
- **Behaviour:** plain links without script; with script the whole page's text fades out (140ms), the language is swapped in place, the URL is pushed, and the text fades back (220ms), staggered 6ms per element.

### Language pairs
Headline-step lines in Young Serif ("Alemán ⇄ Inglés"), with a custom two-way SVG arrow (two square-capped strokes) sized to the type at 0.72em by 0.44em in the current colour. Never a font glyph.

### Service rows
A title-step heading over a row of one 3:4 photograph (160 to 220px wide; 96px on phones) and a plain list. Rows alternate the photo side on desktop. No cards, no icons, no numbering.

### Experience list
Large headline-step names as buttons, graphite until active, ink when active or hovered, with a small meta line beneath. On desktop the active name shows its photograph in a sticky 4:5 frame (crossfade 200ms, scale 1.03 to 1 over 600ms). On phones each item carries its own photo and the frame is hidden.

### Letter
A centred 520px column on pale granite: a small square portrait (44px; 40px on phones), body paragraphs, and an italic lead-step signature "Miriam Rivero" with the role in graphite at the label step.

### Visit card
Paper plane, ink text, square, 420px wide with 32px padding, pinned over a full-height photograph. Title-step heading, a short location line, label/value rows (labels graphite, values right-aligned, tabular figures), and a full-bleed amber button closing the card.

### Navigation
- **Top bar:** label step, channels on the left, three in-page links and the small button on the right (links hidden at 1100px and below). Links have no underline at rest and underline on hover.
- **Footer menu:** body step, no underline at rest; hovering the menu dims its siblings to river haze while the hovered link stays bright and underlines.

### Motion
- **Reveals:** with script only, elements rise 24px and fade in once (opacity 700ms, transform 800ms, both on the ease-out curve), grouped children staggered 75ms in reading order.
- **Stage:** the two city photos crossfade over 900ms when the intro crosses 55% of the viewport; each photo drifts slowly (28s, scale to 1.06, alternating).
- **Wordmark settle:** where scroll timelines exist, the wordmark scales from 1 to 0.93 as the first screen exits.
- **Reduced motion:** travel, drift and settle are removed; content still fades in (300ms).

## Do's and Don'ts

### Do:
- **Do** keep every size on the five steps (small, body, lead, head, display).
- **Do** use amber for the action and the services band only, always with ink text.
- **Do** separate sections with full-width colour planes (night, amber, stone, pale granite, paper on photograph) and the section step, not lines.
- **Do** use real, credited photographs of Cologne and Madrid, cropped to the role's fixed ratio, and add each one to the credits record.
- **Do** put hover styles behind a fine-pointer hover query; touch gets press feedback (scale 0.97) instead.
- **Do** write "Miriam Rivero" with capitals in every face and context.
- **Do** keep link underlines (1px) and the 2px focus outline; they are affordances, not decoration.

### Don't:
- **Don't** round any corner.
- **Don't** add shadows, glows or gradients; the caption scrim is the one exception.
- **Don't** draw divider lines, borders or outlined boxes around content.
- **Don't** add small labels above headings (eyebrows or kickers), numbered markers (01/02/03), icon cards or card grids.
- **Don't** use a monospace face; tabular figures in Source Serif 4 cover aligned numbers.
- **Don't** use font glyphs or icon fonts for arrows or icons; draw them as square-capped SVG strokes in the current colour.
- **Don't** set the name in lowercase or uppercase transforms.
