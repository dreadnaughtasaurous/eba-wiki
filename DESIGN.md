---
name: EBA Wiki
description: A precision reference tool for Victorian public health sector Enterprise Agreements, brought into Austin Health brand compliance.
colors:
  brand-purple: "#4b2a72"
  brand-purple-deep: "#433c63"
  brand-purple-mid: "#6c5389"
  brand-navy: "#191347"
  accent-crimson: "#df1f51"
  neutral-bg: "#ffffff"
  neutral-bg-soft: "#f6f6f7"
  neutral-text-1: "#213547"
  neutral-text-2: "#476582"
  neutral-text-3: "#90a4b7"
  neutral-divider: "#e2e2e3"
  status-success: "#059669"
  status-warning: "#d97706"
  status-danger: "#df1f51"
  status-info: "#4b2a72"
typography:
  display:
    fontFamily: "'Work Sans', Arial, sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "'Work Sans', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.022em"
  title:
    fontFamily: "'Work Sans', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "'Karla', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Karla', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  pill: "9999px"
spacing:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.brand-purple}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.5rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.brand-purple-deep}"
  button-secondary:
    backgroundColor: "{colors.neutral-bg-soft}"
    textColor: "{colors.neutral-text-1}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1.25rem"
  card:
    backgroundColor: "{colors.neutral-bg-soft}"
    rounded: "{rounded.xl}"
    padding: "1.125rem 1.25rem"
  pill:
    backgroundColor: "{colors.neutral-bg-soft}"
    textColor: "{colors.neutral-text-2}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
---

# Design System: EBA Wiki

## Overview

**Creative North Star: "The Case File"**

This is an advisor's reference binder made digital: a confident, structured directory of ten Enterprise Agreements that a person opens mid-conversation and needs to close in under thirty seconds, holding the right clause. Every screen behaves like a well-organised case file — colour-coded tabs per agreement, sober typographic hierarchy, small decisive accents that never compete with the text they sit beside. Nothing here performs; it locates.

**Brand authority:** this design system is brought into compliance with Austin Health's canonical brand guide (`austin-health-brand-reference.md`). Purple `#4b2a72` leads as the primary UI colour — replacing the unbranded VitePress default green currently shipped — while Work Sans/Karla typography, sentence-case text, and left-aligned copy were already correctly in place and are carried forward unchanged. The system deliberately keeps two colour tiers distinct and never lets them blur: brand purple governs interactive chrome (links, buttons, focus rings), while each EBA family's own registry colour is reserved strictly for that agreement's identity accents (icon fills, status pills, sidebar glow) — never for site-wide UI.

**Key Characteristics:**
- Flat-by-default surfaces; depth appears only as a response to hover/focus, never at rest.
- A five-step type scale (xs–xl) enforced everywhere; no one-off font sizes.
- One consistent radius scale (4/6/8/12px, plus full-pill) — nothing sharper, nothing rounder.
- Ten fixed EBA family colours are the *only* place saturated colour appears outside brand purple and semantic status.
- Every interactive surface carries an explicit focus-visible ring in brand purple — accessibility is structural, not decorative.

## Colors

The palette is deliberately narrow: one brand colour that leads everywhere, a small semantic set for status, and a fixed ten-colour identity set scoped only to EBA agreements.

### Primary
- **Ledger Purple** (`#4b2a72`): the single brand colour — every link, primary button, active tab, focus ring, and section-label pip across the entire site resolves through this one value (`--vp-c-brand-1`). Its rarity outside interactive elements is the point.
- **Ledger Purple Deep** (`#433c63`): hover/active state for Ledger Purple — buttons, links, and tab underlines darken to this on press or hover.
- **Ledger Purple Mid** (`#6c5389`): a lighter interactive tint for subtler emphasis (e.g. secondary hover backgrounds, disabled-adjacent affordances) where full-strength purple would be too heavy.

### Secondary
- **Case Navy** (`#191347`): the deepest brand tone, reserved for maximum-contrast moments — dark-mode surfaces, print-safe headings, or anywhere Ledger Purple itself would not carry enough weight.

### Neutral
- **Paper** (`#ffffff` / dark: near-black): page background.
- **Folder Grey** (`#f6f6f7` / dark: `#161618`-class soft surface): card and panel backgrounds — every `.eba-entry`, `.pay-card`, and table header sits on this, never on Paper directly.
- **Ink Primary / Secondary / Tertiary** (`#213547` / `#476582` / `#90a4b7`, VitePress `--vp-c-text-1/2/3`): body text, metadata, and disabled/placeholder text respectively.
- **Tab Divider** (`#e2e2e3`, `--vp-c-divider`): all card borders, table rules, and section-label underlines.

### Named Rules
**The One Ledger Rule.** Brand purple is the only saturated colour permitted on global UI chrome (nav, buttons, links, focus rings, tabs). EBA family colours never leak into chrome — they are identity paint for their own agreement's icon, pill, and sidebar glow only.

**The Status-Not-Brand Rule.** Success (`#059669`), warning (`#d97706`), and danger (`#df1f51`, aligned to Austin Crimson) are reserved exclusively for EBA lifecycle status (current / expiring / renegotiation / superseded) and system feedback — never used as decorative accents.

## Typography

**Display Font:** Work Sans (with Arial fallback)
**Body Font:** Karla (with Arial fallback)

**Character:** Work Sans Bold gives every heading a confident, slightly condensed authority; Karla's warmer, more humanist body letterforms keep dense clause text readable over long sessions. The pairing is already correct per brand guide — nothing changes here.

### Hierarchy
- **Display** (700, `clamp(1.8rem, 4vw, 2.8rem)`, 1.2 line-height, −0.028em tracking): the homepage hero title only.
- **Headline** (700, 1.25rem, 1.3): `h1`/`h2` on clause and index pages, tracked at −0.022em to match the tighter premium feel of larger type.
- **Title** (700, 1.0625rem, 1.35): card titles (`eba-entry-title`), section headers.
- **Body** (400, 0.9375rem, 1.7): all clause prose, table cells, standard UI text. Reading-mode column caps this at 72ch.
- **Label** (500, 0.8125rem, 1.4): pills, chips, metadata, section-label eyebrow text (uppercase, 0.08em tracking).

### Named Rules
**The Sentence-Case Rule.** Per brand guide: sentence case throughout, never title case or all-caps, except deliberate uppercase micro-labels (section eyebrows) which are a UI-label exception, not body/heading text.

## Layout

Content sits in a `max-width: 1152px` centred column (`.home-wrapper`) with generous horizontal breathing room (1.5rem minimum gutter). The homepage hero is a two-column flex layout (text left, image right) that collapses to a single centred column under 768px. The EBA directory grid runs 4 columns on desktop, 2 on tablet (≤768px), 1 on mobile (≤480px) — `.eba-grid`. Clause pages use VitePress's standard doc-with-sidebar layout; Reading Mode strips the sidebar and toolbar entirely, reflowing content to a 72ch centred column. Density is compact-to-comfortable: card internal padding sits around 1.125rem, list/pill gaps around 0.3–0.75rem — enough air to scan quickly without feeling sparse.

## Elevation & Depth

Flat-by-default. Surfaces (cards, buttons, pills) carry no resting shadow — depth is purely a hover/focus response, reinforcing that the interface should feel calm and legible at rest and only "lift" when the advisor's cursor engages it.

### Shadow Vocabulary
- **Card** (`0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(74,42,114,0.04)`): the lightest touch, used sparingly (tooltip resting state).
- **Lift** (`0 4px 12px rgba(0,0,0,0.09), 0 2px 4px rgba(74,42,114,0.06)`): the standard hover shadow for cards, buttons, and reference-bar items.
- **Elevated** (`0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(74,42,114,0.07)`): reserved for floating overlays (search modal, glossary tooltip, clause panel).

Every shadow's second layer carries a faint warmth blended toward Ledger Purple rather than neutral grey — the depth system is quietly brand-tinted rather than generic. (This replaces the previous unbranded violet-grey tint with the same technique now keyed to the actual brand purple.)

### Named Rules
**The Rest-Flat Rule.** No card, button, or panel shows a shadow in its default state. Shadows exist only as `:hover` / `:focus-visible` feedback.

## Shapes

A single four-step radius scale plus a full pill, used consistently by role, never picked ad hoc:
- **sm (4px):** chips, badges, code/kbd tags, small inline pills.
- **md (6px):** buttons, icon containers, small controls, tab-top corners.
- **lg (8px):** cards, panels, tooltips, table wrappers.
- **xl (12px):** the EBA directory entry cards and modals — the largest, most prominent containers.
- **pill (9999px):** status pills and topic/EBA tag chips.

Borders are uniformly 1px solid Tab Divider; EBA-family colour appears as a left-border accent or icon fill only, never as a full card border at rest (only on hover, tinted to that agreement's colour).

## Components

### Buttons
- **Shape:** 6px radius (md).
- **Primary:** Ledger Purple background, white text, `0.5rem 1.25rem` padding. Hover: darkens to Purple Deep, gains the Lift shadow, and translates up 1px.
- **Secondary:** Folder Grey background, Ink Primary text, 1px Tab Divider border. Hover: darkens background slightly, gains the Lift shadow, same 1px lift.
- **Focus:** 2px Ledger Purple ring, 2px offset, on every interactive element site-wide — no exceptions.

### Chips / Pills
- **Style:** Folder Grey background, Ink Secondary text, full pill radius, `0.2rem 0.6rem` padding, 0.8125rem label type.
- **EBA variant (`.pill-eba`):** background/text swap to Ledger Purple's soft tint — the one place a "brand pill" exists; per-agreement pills elsewhere use that agreement's own registry colour instead, never brand purple.

### Cards / Containers
- **Corner Style:** 12px (EBA directory entries) or 8px (pay cards, panels).
- **Background:** Folder Grey on Paper.
- **Shadow Strategy:** flat at rest, Lift shadow + 1px translate-up on hover; the card's border also shifts from Tab Divider to that entry's EBA accent colour on hover (`--entry-accent`), giving each family a distinct hover identity without any resting colour.
- **Border:** 1px Tab Divider at rest.
- **Internal Padding:** ~1.125rem top/sides, 1rem bottom.

### Inputs / Fields
- **Style:** 1px Tab Divider stroke, Folder Grey or Paper background, 6px radius.
- **Focus:** Ledger Purple 2px ring, 2px offset — same global focus treatment as buttons.

### Navigation
- Top nav uses Work Sans for the site title; the brand switch/GitHub icon/accessibility controls sit in a fixed flex order. Sidebar items use Body type at Label size; the active/hovered clause item underlines or tints toward Ledger Purple. Mobile collapses to a bottom nav bar (56px, safe-area aware) plus hamburger menu for dark-mode and secondary actions.

### EBA Identity Accent (signature component)
Each of the ten agreements carries one fixed registry colour used *only* for that agreement's own identity surfaces: its directory-card icon fill, its sidebar ambient glow (a `drop-shadow` derived from the colour at low opacity), its search-result EBA pill, and its status chip tinting. This is the one deliberate exception to the One Ledger Rule — and it is bounded precisely: never nav chrome, never buttons, never body links.

## Do's and Don'ts

### Do:
- **Do** run every link, button, focus ring, and section-label pip through Ledger Purple (`#4b2a72`) — the single brand accent for all interactive UI chrome.
- **Do** keep cards and buttons flat at rest; only introduce the Lift shadow as a hover/focus response.
- **Do** use Work Sans Bold for all headings and Karla Regular for all body text, in sentence case, left-aligned.
- **Do** scope each EBA's registry colour strictly to that agreement's own identity surfaces (icon, pill, glow, status chip) — never to global chrome.
- **Do** apply the same 2px Ledger Purple focus-visible ring to every interactive element, with no exceptions, to hold the accessibility floor.

### Don't:
- **Don't** reintroduce the unbranded VitePress default green as an accent anywhere — it has been fully superseded by Ledger Purple.
- **Don't** let an EBA family colour appear on nav bars, primary buttons, or body links — that collision breaks the One Ledger Rule and muddies which colour means "brand" versus "this specific agreement."
- **Don't** give a card or button a resting shadow — depth is earned only through interaction, never shown by default.
- **Don't** introduce a radius outside the 4/6/8/12px + pill scale, or a font size outside the five-step type scale.
- **Don't** use secondary Austin palette colours (Yellow, Sage, Teal, Sky, Ocean, Slate) without Corporate Communications approval, per the brand guide — they are not part of this system's working palette.
