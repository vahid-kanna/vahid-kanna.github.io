---
name: vahidbasha-editorial-atelier
colors:
  background: "#F8F7F4"
  on-background: "#141413"
  surface: "#FFFFFF"
  on-surface: "#141413"
  surface-subtle: "#F1EFEA"
  on-surface-subtle: "#4A4945"
  ink-secondary: "#4A4945"
  ink-muted: "#68665F"
  border: "#E3E0D8"
  border-strong: "#CBC6BA"
  primary: "#164E3F"
  on-primary: "#F8F7F4"
  primary-hover: "#103D31"
  primary-tint: "#E7F0EC"
  on-primary-tint: "#124034"
  ring: "#164E3F"
  status-live-bg: "#E6F3EC"
  status-live-fg: "#14532D"
  status-proto-bg: "#F6EFE0"
  status-proto-fg: "#713F12"
typography:
  font-display: "'Newsreader', Georgia, 'Times New Roman', serif"
  font-sans: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  font-mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
  hero: "clamp(2.35rem, 4.8vw, 3.75rem) / 1.08"
  h2: "clamp(1.7rem, 2.8vw, 2.25rem) / 1.16"
  h3: "clamp(1.2rem, 1.7vw, 1.45rem) / 1.25"
  body-lg: "1.125rem / 1.65"
  body: "1rem / 1.68"
  body-sm: "0.9375rem / 1.55"
  meta: "0.8125rem / 1.4"
spacing:
  base: "4px"
  container-max: "1080px"
  prose-max: "720px"
  section-y: "clamp(64px, 8vw, 108px)"
  gutter: "24px"
rounded:
  base: "6px"
  sm: "4px"
  md: "6px"
  lg: "10px"
components:
  button-primary: "{colors.primary} / {colors.on-primary}"
  button-primary-hover: "{colors.primary-hover} / {colors.on-primary}"
  button-secondary: "{colors.surface} / {colors.on-surface}"
  button-secondary-hover: "{colors.surface-subtle} / {colors.on-surface}"
  badge-live: "{colors.status-live-bg} / {colors.status-live-fg}"
  badge-proto: "{colors.status-proto-bg} / {colors.status-proto-fg}"
  plate-frame: "{colors.surface} / {colors.border}"
---

## Overview

Personal portfolio for **Shaik Vahid Basha** (`vahidbasha.me`), IIT Madras '27 — positioned cleanly as a **product & business builder** serving product management, product strategy, analytics, and founder/engineering recruiters.

- **Three adjectives:** Grounded, Precise, Unhurried.
- **Primary taste direction:** Minimalist / editorial architectural atelier — generous whitespace, strict typographic hierarchy, hairline rules, single structural pine accent, and authentic product artifacts doing the heavy lifting.
- **Deliberately borrowed element:** Subtle technical indexing (monospace years, stage tags, tabular figures) borrowed from engineering specification sheets to signal hands-on analytical and systems rigor without turning the page into a fake terminal.
- **Editorial exclusion boundary:** Zero mention of Civil Engineering (or academic branch) and zero mention of UPSC or civil-services exam preparation across all visible copy, tags, metadata, structured data, and public files.

## Signature Element

**Framed Real Product Plates in an Asymmetric Editorial Dossier.** Instead of decorative particle canvases, floating lanyard physics, or identical boxed cards, each flagship case study pairs calm architectural copy with a crisp 1px-framed capture of the real built software (`syncpro.org` / Shadow Schedule concept, `railraksha.tech`, `zamp.vahidbasha.me`) and an honest provenance caption below. Secondary engineering work shifts rhythm entirely into a compact, scannable typographic index table.

## Colors

Warm-neutral architectural paper (`#F8F7F4`) paired with carbon ink (`#141413`) and a single structural deep pine accent (`#164E3F`), following a strict 90/8/2 visual budget (90% paper and neutral hairlines, 8% ink typography and authentic product imagery, 2% pine accent for primary actions and active links).

- Carbon ink `#141413` on `#F8F7F4`: **17.4:1** (WCAG AAA)
- Graphite `#4A4945` on `#F8F7F4`: **8.3:1** (WCAG AAA)
- Stone muted `#68665F` on `#F8F7F4`: **5.4:1** (WCAG AA)
- Structural pine `#164E3F` on `#F8F7F4`: **9.0:1** (WCAG AAA)
- Focus ring (`ring`): `#164E3F`, 2px solid, 3px offset on all interactive controls.

## Typography

Two primary families plus restrained monospace metadata:
- **Display:** `Newsreader` (optical serif) for the hero `<h1>`, section headings, and case study headlines — subtle italic emphasis on at most one short phrase in the hero.
- **Body & UI:** `Instrument Sans` (clean humanist-geometric sans) at 16px default body, 18px lead copy, max reading line width 62–66 characters.
- **Monospace:** `IBM Plex Mono` strictly for years, project numbers (`01`–`04`), stage tags, and tabular metrics — never long paragraphs or decorative console prefixes.

## Layout

- Base spacing unit: 4px (`0.25rem` Tailwind scale).
- Outer layout container: `1080px` max width, responsive horizontal padding `20px` (mobile) / `32px` (desktop).
- Long-form case studies & field notes: `720px` max measure for effortless reading.
- Document owns scroll natively (`overflow-y: auto` on `html/body`); zero scroll hijacking, zero full-screen sticky traps, zero horizontal overflow from 320px to 1440px.
- Distinct visual rhythm per section:
  1. Asymmetric 12-col editorial masthead + margin ledger (Hero)
  2. Full-width hairline-ruled asymmetric dossiers with real screenshots (Selected Work)
  3. Compact hairline-ruled typographic index rows (Engineering Lab)
  4. Chronological 2-column ledger (Experience & Leadership)
  5. Editorial reading list with computed reading times (Field Notes)
  6. Plain-spoken first-person About & direct Contact footer.

## Elevation & Depth

Intentionally flat architectural aesthetic. Hierarchy comes from scale, whitespace, and 1px hairline rules (`#E3E0D8`) rather than box shadows or floating cards. Only product screenshot frames carry a barely perceptible `0 1px 3px rgba(20,20,19,0.06)` plate separation. Zero glassmorphism, zero neon glow, zero blurred background blobs.

## Shapes

Single radius knob `--radius: 6px` (`4px` tags/badges, `6px` buttons/inputs, `10px` media frames). No oversized `rounded-2xl` pill-card uniformity.

## Components

- **TopNav:** Sticky hairline header (`#F8F7F4/95`), wordmark left, 4 concise links + Email CTA right; accessible mobile disclosure drawer with Escape close, focus restoration, and 44px touch targets.
- **Primary / Secondary / Ghost Buttons:** Minimum 44px height on touch devices; explicit default, hover, active, focus-visible, and disabled treatments.
- **Product Plate:** Crisp `16:10` aspect-ratio container (`#FFFFFF` matte border + 1px `#E3E0D8` rule) preventing CLS, with real `<figcaption>` stating exactly what the image depicts and its stage.
- **Stage Badge:** Neutral/subtle semantic tint with plain text (`Incubated · Pilot`, `Live PWA`, `Live Prototype`, `Internship · 2026`) — never pulsing fake "LIVE" dots.
- **Copy Email Control:** Copies `vahidbashaunique@gmail.com`, verifies clipboard promise, shows truthful `Copied` confirmation or accessible selectable fallback on error.

## Motion & Interaction

- Fast, restrained state feedback only: `150ms cubic-bezier(0.22, 1, 0.36, 1)` on color, opacity, and subtle `2px` link arrow nudges.
- Zero preloader, zero continuous canvas/WebGL loops, zero default sound effects, zero tilt-card gimmicks, zero scroll-triggered staggered reveals that hide content.
- Full `@media (prefers-reduced-motion: reduce)` support disabling all transitions and smooth scrolling.

## Do's and Don'ts

- **Do:** Show real product screenshots with honest captions; separate observed pilot facts from modeled scenarios; make every route deep-linkable and refresh-safe; keep every interactive target >= 44px on mobile.
- **Don't:** No purple/cyan/indigo AI palettes; no glowing gradients; no particle canvases; no floating ID badges hiding primary actions; no fake star counts; no pseudo-booking modals; no fake console headers (`SYS.PORTFOLIO //`); no cards nested inside cards; no 3-column icon-top bento grids; no Civil Engineering or UPSC references anywhere.

## Accessibility Constraints & Accepted Debt

- WCAG 2.2 AA target: >= 4.5:1 body text contrast, >= 44px primary touch targets, single `<h1>` per route, sequential heading levels, skip-to-content link, semantic `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`, zero nested interactive controls, visible focus rings on every focusable element.
- Accepted scope: External links point to live third-party/project deployments whose own internal accessibility is managed in their respective repositories; resume PDF download stays a truthful "Request resume" email draft until a branch-redacted PDF is supplied.

## Research Log

- **AI-Slop Anti-Pattern Audit (2026):** Reviewed industry analyses of vibe-coded UI defaults (purple/cyan dark themes, stacked uppercase monospace eyebrows on every heading, uniform rounded-2xl cards, fake pulsing status dots, cards-inside-cards, buzzword copy, decorative icons). Directly mapped against the existing `vahidbasha.me` source (`LanyardBadgeHero`, `StippleCanvas`, `TopNotchNav` mascot notch, `ShippedWorkSection` horizontal accordion + fake star counters, `BookingModal` fake confirmation).
- **Human-Crafted Portfolio Benchmarks:** Studied Paco Coursey (`paco.me` — typographic restraint, Newsreader italic emphasis, clean link lists), Rauno Freiberg (`rauno.me` — near-monochrome hierarchy, crisp hover feedback, craft without ornament), and Vahid's own live Zamp workbench (`zamp.vahidbasha.me` — warm paper `#F7F6F2` + deep forest-pine structural accent + explicit prototype disclosures).
