---
name: Brian Huang Portfolio
description: A transit-signage system in ink-blue dark, where a blue Software line and an orange Hardware line meet at interchange stations.
colors:
  void: "#0e1218"
  coal: "#121821"
  ash: "#18202b"
  graphite: "#222b38"
  slate: "#3a4555"
  steel: "#8793a5"
  fog: "#aab4c2"
  mist: "#d3dae4"
  snow: "#f4f6f8"
  software-line: "#2f7de1"
  software-light: "#7db2f5"
  hardware-line: "#f28c28"
  hardware-light: "#f7b36a"
  service-ok: "#3fb97a"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "font-stretch 90%"
  headline:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "font-stretch 90%"
  title:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  station-label:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
  caption:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
  mono:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.void}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "#ffffff"
  button-outline:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "{colors.snow}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 20px"
  chip:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.mist}"
    rounded: "{rounded.sm}"
    height: "28px"
    padding: "0 10px"
  panel:
    backgroundColor: "{colors.coal}"
    textColor: "{colors.snow}"
    rounded: "{rounded.lg}"
    padding: "20px"
  panel-strong:
    backgroundColor: "{colors.ash}"
    textColor: "{colors.snow}"
    rounded: "{rounded.sm}"
    height: "56px"
---

# Design System: Brian Huang Portfolio

## Overview

**Creative North Star: "The Line Diagram"**

The homepage is one transit system map. A Software line (blue) and a Hardware line (orange) run in from the left, share a trunk through the interchange stations (JetHexa, Setup) where both disciplines are needed, and part again. Everything else is built from the grammar of signage: an ink-blue-black ground, signage-white type in a slightly condensed grotesque (Archivo at 90% width), flat enamel panels on 1px hairlines, tight 6px corners. Two line colors carry meaning everywhere; neither is used as decoration.

Density is calm and skimmable: a left-aligned headline, the map directly below, then About (clubs and stack as hairline-divided lists) and a contact section ending on the terminal. On phones and tablets the map becomes the same lines as vertical rails.

The restored animated background (parallax shapes, drafting grid, grain) was a user-approved adaptation, retinted blue and white. It sits behind the flat panels and does not change the panel rules below.

**Key Characteristics:**
- Two line colors with fixed meaning: blue is Software, orange is Hardware.
- Flat panels: one fill, one 1px white-alpha hairline, no blur.
- Line strokes are thick (9 units on a 1000 x 300 plane), round-joined, with 45-degree bends only.
- Stations are white-ringed dots; interchanges are double rings.
- One green dot, reserved for "Open to internships".

## Colors

A cold ink-blue neutral ladder with signage white, plus two saturated line colors used only for meaning.

### Primary
- **Software Line Blue** (`software-line`): the Software route stroke and text selection background. **Software Light** (`software-light`) is the text-safe tint for "software" in the headline and the Software line label.

### Secondary
- **Hardware Line Orange** (`hardware-line`): the Hardware route stroke, the word "hardware" in the headline, the Hardware line label, and the text-input caret. **Hardware Light** (`hardware-light`) is defined but not used in the shipped homepage.

### Neutral
- **Void Ink** (`void`): page ground, station dot fill, text on the light button.
- **Coal** (`coal`) and **Ash** (`ash`): panel fills (`panel`, `panel-strong`); Ash is also the nav bar fill.
- **Graphite**, **Slate**: avatar fallback gradient and scrollbar thumb.
- **Steel** (`steel`): placeholders, footer, quiet icons. **Fog** (`fog`): secondary text, dates, labels. **Mist** (`mist`): body paragraphs and chip text. **Signage White** (`snow`): headings, station titles, focus ring, station rings.
- **Service Green** (`service-ok`): only the "Open to internships" dot and the copied-email check.

### Named Rules
**The Two Lines Rule.** Blue means Software, orange means Hardware, white means both or neither. Never use either line color for decoration, hover accents, or generic emphasis.

**The One Green Rule.** Green appears only as a status or confirmation signal.

## Typography

**Display and Body Font:** Archivo Variable (with Archivo, ui-sans-serif, system-ui)
**Mono Font:** JetBrains Mono Variable (with JetBrains Mono, ui-monospace) for the terminal, email address and tags.

**Character:** A width-narrowed, tightly tracked grotesque for signage-style headings, set against plain readable Archivo body copy; mono is reserved for machine-flavored content.

### Hierarchy
- **Display** (700, clamp(2.25rem, 4.6vw, 4rem), 0.98, -0.03em, font-stretch 90%): the homepage h1 only.
- **Headline** (700, 2.25rem rising to 3rem at sm, -0.03em, font-stretch 90%): section h2s (About, Get in touch).
- **Title** (600, 1.5rem, tracking-tight): sub-section headings (Clubs & activities, Tech stack).
- **Body** (400, 17px, 1.625, max 48ch to 62ch): paragraphs in mist. Smaller supporting text is 14px (`text-sm`) in fog.
- **Station label** (600, 15px, 1.2) over a 12px fog date: map stations and rail items.
- **Mono** (400, 13px, 1.625; 16px for the input on phones): terminal and email.

### Named Rules
**The Signage Weight Rule.** Hierarchy comes from weight (700 / 600 / 400) and size, not from letter-spaced caps or color.

## Layout

A centered `shell` container, max 76rem, with 1rem side padding (1.5rem from 40rem). The hero is a 12-column grid at lg: copy and actions in 7 columns, the profile card in 5; below lg the profile card drops under the map. The system map keeps a fixed 1000:300 aspect ratio and only appears at lg and above; stations are real links placed over the SVG by percentage. Below lg, `RailMap` shows the Software and Hardware groups side by side from sm, with the interchange group full width. Vertical rhythm is generous between sections (mt-20, mt-28 from sm) and tight inside lists (py-3.5 to py-4 rows divided by white 10% hairlines). Touch targets are at least 44px (btn height, nav links, station hit area 2.75rem).

## Elevation & Depth

Flat. Depth comes from tonal steps (void, coal, ash) and 1px white-alpha borders (10% for panels, 12% for strong panels). There are no drop shadows on panels. The only box-shadows are the interchange double ring (void gap, then white ring) and the transient green copy-confirmation ring.

### Named Rules
**The Flat Enamel Rule.** A panel is one fill and one hairline. No blur, no glow, no gradient on panels or controls.

## Shapes

Small, enamel-sign corners: 6px (`rounded-xl` remapped) for buttons, chips, the nav bar, logo tiles and club tiles; 8px for the avatar; 10px for the profile card and terminal panels. Circles (9999px) for station dots, rails and social icon buttons. Stations are rings: a 22px dot with a 4px signage-white border; interchanges are 28px with an extra outer ring. Rails are 8px wide capsules; the interchange rail splits blue and orange with a gap.

## Components

### Buttons
- **Shape:** 6px corners, 44px tall, 20px horizontal padding, 15px / 500 text.
- **Primary (`button-primary`):** signage-white fill, void text. One filled primary per view region (Resume in the hero, copy-email in Contact). Hover goes to pure white; press scales to 0.97.
- **Outline (`button-outline`):** 6% white fill, 10% white hairline, snow text; hover lifts fill to 11%.
- **Text link:** `link-line`, an underline that draws in from the left on hover.
- **Touch:** hover effects also play on `:active`, so phones get them.

### Chips
- 28px tall (`chip-sm` on the homepage stack), 6px corners, 4% white fill, 10% hairline, mist text; brand icon tinted per skill.

### Cards / Containers
- **Panel** (`glass`): coal fill, 10% white hairline. **Panel strong** (`glass-strong`): ash fill, 12% hairline, used for the nav bar. Profile card: panel with avatar, name, copy-email, social icon circles. Lists in About are hairline-divided rows, not cards.

### Navigation
- Fixed, inset pill bar (ash, 56px, max 4xl) with logo mark and name, centered links, and Resume / Contact outline buttons. A sliding pill under the current link: white with void text on Home, section color on other pages. Fog text, snow on hover. Resume collapses to an icon below lg.

### System Map (signature)
- Two thick round-joined route strokes with 45-degree bends; stations are links with titles (15px / 600) and dates above or below; line names at the left termini; an "Interchange: work that needs both" caption. Routes draw in over 1.6s and stations pop in staggered. Reduced motion disables both.

### Terminal
- Mono panel with a title line `brian@portfolio ~`, intro commands that print up front, and a live prompt. Fixed height; new output scrolls inside.

### Footer
- Hairline top border, steel 14px text, copyright and a mono credit line.

## Do's and Don'ts

### Do:
- **Do** keep blue for Software and orange for Hardware, using the `-light` tint for text on dark.
- **Do** build panels from one fill and one white-alpha hairline at 6 to 10px radius.
- **Do** bend lines at 45 degrees with round joins and rings for stations.
- **Do** keep a visible 2px signage-white focus ring with 3px offset.
- **Do** honor `prefers-reduced-motion`: drop slides, draws, typing and spins; keep fades.
- **Do** use the ease-out-expo curve (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances and hover motion.

### Don't:
- **Don't** use blur, glow or gradient fills on panels and controls.
- **Don't** spend orange or blue on generic emphasis, and don't add orange shapes to the background.
- **Don't** use hero + card-grid + glass SaaS patterns on the homepage.
