# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: HR and employee-relations advisors mid-query — looking up a specific clause while answering an employee question or handling a case, where speed and precision to the exact clause matter most. Secondary, non-dominant: employees checking their own entitlements, and managers checking entitlements/process before approving something (leave, overtime, rosters). The product should not be tuned around any one of the secondary roles at the expense of the primary advisor workflow.

## Product Purpose

A searchable reference for Enterprise Bargaining Agreements (EBAs) covering the Victorian public health sector, letting HR teams, managers, and employees find and cite specific clause text quickly. Success is landing on the correct, current clause fast, with confidence it's the right (non-superseded) version.

## Positioning

Fast, structured keyword search with cross-linking that a raw PDF cannot offer: filtered/operator search (`eba:`, `topic:`, `clause:`), automatic clause cross-references, a related-clauses panel, and legislation links out to the Fair Work Act / NES. This is deliberately keyword search only — see Capabilities and Constraints — the value is search/navigation structure, not AI interpretation.

## Operating Context

Covers 10 Enterprise Agreements across Victorian public health sector job families (allied health, biomedical engineers, children's services, doctors in training, HAS managers/admin, medical specialists, mental health, MSPP, nurses & midwives). Includes an Archive for superseded agreements, kept separate from default search so historical lookups don't pollute current-entitlement search. Deployed as a GitHub Pages project page (subpath `/eba-wiki/`), not a root domain.

## Capabilities and Constraints

- **No-AI constraint (hard, non-negotiable):** this is a deliberate fork of a sibling project (`EBAdb`) with all AI functionality (Ask AI panel, AI worker/model chain) stripped out. Never reintroduce it, never treat its absence as a bug. Keyword search (Pagefind) only.
- EBA content is legally binding: clause text is reproduced verbatim from official PDFs, never paraphrased or invented (wage rates, dates, clause numbers).
- `eba-registry.js` is the single source of truth for EBA metadata (name, family, color, expiry, archive status); supersession is computed automatically from family + nominal expiry.
- Confirmed durable constraints are limited to the two above (No-AI, verbatim-content-accuracy) — no additional accessibility standard or device/environment constraint has been specified beyond what's already built (see Accessibility & Inclusion).

## Brand Commitments

- Site title in VitePress config is `EBAdb`, a holdover from the original project name — intentional, not to be "corrected" without asking.
- Each EBA family has a fixed registry color (see `eba-registry.js`), used consistently for pills/badges across search results, filters, and status displays.

## Evidence on Hand

Real EBA clause content already exists under `docs/ebas/` for all 10 agreements, sourced from official agreement PDFs. No testimonials, case studies, or usage metrics are on hand — do not fabricate any.

## Product Principles

1. Precision over breadth: surface the exact clause fast, don't make the advisor read around it.
2. Structure is the differentiator: cross-references, related clauses, legislation links, and filters are the product's edge over a PDF — invest there, not in content generation.
3. Currency and correctness are non-negotiable: superseded content must never be confused with current entitlements; verbatim accuracy is a legal-content requirement, not a style preference.
4. No AI, ever, in this fork: keyword search is the whole search surface.

## Accessibility & Inclusion

Built-in accessibility panel already covers: adjustable text size, line spacing, letter spacing, OpenDyslexic font option, link highlighting, high-contrast mode, reduced motion, and a distraction-free reading mode. No additional standard (e.g. WCAG conformance level) has been specified as a requirement beyond maintaining this existing feature set.
