---
title: Changelog
description: A full history of all updates made to the Austin Health EBA Wiki.
nolebase:
  gitChangelog: false
---

# Changelog

A complete record of all changes made to the Austin Health EBA Wiki, updated automatically on every deployment. Most recent changes appear first.

## August 2026

- **2026-08-20** — Fix: restore DocToolbar to below-title placement without reintroducing the unmount crash [1f7c1de](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/1f7c1de)
- **2026-08-20** — Fix: DocToolbar anchor corrupted Vue's static-vnode unmount, blanking the page on navigation away [3ebde73](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/3ebde73)
- **2026-08-20** — Fix: blank homepage after navigating from a clause page via nav-bar link [742d6d4](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/742d6d4)
- **2026-08-20** — Fix: strip /eba-wiki/ base prefix from route.path in clause-page guards [c7645e5](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/c7645e5)
- **2026-08-19** — Content update: cross-link MSPP clause and schedule references [63f71f2](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/63f71f2)
- **2026-08-19** — Script: fix stale EBAdb path references in link-clauses.mjs [a51c0eb](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/a51c0eb)
- **2026-08-19** — Content update: rewrite MSPP Schedule 3 and add allowance tables to Schedule 2 [b78464a](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/b78464a)
- **2026-08-18** — Style (search): match SearchModal box size/rounding to fmhy.net's VPLocalSearchBox [6acacfe](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/6acacfe)
- **2026-08-18** — Fix: MobileNav's bottom-bar navigation and active-tab state ignore the base [b7a9791](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/b7a9791)
- **2026-08-18** — Fix: SidebarFilter matched zero clauses in production due to base-prefixed hrefs [3a75786](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/3a75786)
- **2026-08-18** — Fix: derive eba/section from path instead of trusting blank historical fields [ab36d41](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/ab36d41)
- **2026-08-18** — Fix: strip /eba-wiki/ base prefix from pageview paths in trending/top-pages [a23c205](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/a23c205)
- **2026-08-18** — Fix: strip base prefix before path checks in router.onAfterRouteChanged [adb6ddd](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/adb6ddd)
- **2026-08-18** — Fix: point DocToolbar's View-as-Markdown fetch at this repo, not the fork source [f1d1857](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/f1d1857)
- **2026-08-18** — Fix: apply withBase() to remaining hardcoded internal links and fetches [4fcd076](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/4fcd076)
- **2026-08-18** — Fix: apply withBase() to SearchModal's recently-viewed and bookmark links [31e55b0](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/31e55b0)
- **2026-08-18** — Docs: generalize project reference doc into standing base instructions [4aab38a](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/4aab38a)
- **2026-08-17** — Fix: apply withBase() to GlossaryTooltip's glossary fetch and definitions link [7153342](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/7153342)
- **2026-08-17** — Feature (glossary): cap tooltip frequency for high-traffic terms [b16d18a](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/b16d18a)
- **2026-08-17** — Script: add glossary term frequency analysis [6075c21](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/6075c21)
- **2026-08-16** — Fix: improve fuzzy-search stem confidence and exclude tooling docs from Pagefind index [6876519](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/6876519)
- **2026-08-16** — Script: add Pagefind accuracy test harness and 78-query corpus [1200ea8](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/1200ea8)
- **2026-08-16** — Chore: strip stale static pagefind-weight/pagefind-synonyms divs from source [16a4b98](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/16a4b98)
- **2026-08-16** — Fix: repair stale SLUG_SYNONYMS entries and add missing coverage [71682ca](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/71682ca)
- **2026-08-16** — Script: merge 13 verified duplicate topic-tag pairs, expand needsReview [e13ab9d](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/e13ab9d)
- **2026-08-16** — Script: add reproducible weight-tier distribution audit tool [d001431](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/d001431)
- **2026-08-16** — Fix: repair blank EBA headers on the /topics/ browse page [2c7cead](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/2c7cead)
- **2026-08-16** — Script: regenerate topic-list and page-catalog after typo fix [aba79b4](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/aba79b4)
- **2026-08-16** — Fix: promote section-index pages to Tier 3 regardless of slug [c36effe](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/c36effe)
- **2026-08-16** — Content update: hyphenate malformed circular-number topic tags [43d8263](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/43d8263)
- **2026-08-16** — Fix: stop excerpt fallback from returning synonym boilerplate [4df4ad9](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/4df4ad9)
- **2026-08-15** — Chore: finalize CLAUDE.md with completed topic-normalization architecture [958c3e7](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/958c3e7)
- **2026-08-15** — Content update: correct topic tag typo in HAS Managers & Admin Part B index [6913cad](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/6913cad)
- **2026-08-15** — Script: align Pagefind filters and topics page with shared alias data [0134faa](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/0134faa)
- **2026-08-15** — Script: normalize and correctly scope topic list generation [3c30f30](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/3c30f30)
- **2026-08-15** — Script: add shared topic-aliases module [2c83b08](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/2c83b08)
- **2026-08-10** — Fix: guard SectionIndex.vue against malformed data entries and refresh generated data [c787033](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/c787033)
- **2026-08-10** — Fix: guard SectionIndex.vue against malformed data entries and refresh generated data [5ae2080](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/5ae2080)
- **2026-08-09** — Fix: prefix HomeCards.vue links with VitePress base path [404bb8d](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/404bb8d)
- **2026-08-09** — Chore: isolate analytics worker from AI wiki [6b3af27](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/6b3af27)
- **2026-08-09** — Docs: remove Ask AI references and correct how-to-use.md [f578e4e](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/f578e4e)
- **2026-08-09** — Fix: remove dead Ask AI KPI tile and pill branching from Analytics Dashboard [8e1b518](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/8e1b518)
- **2026-08-09** — Chore: regenerate page catalog [fb4aedf](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/fb4aedf)
- **2026-08-08** — Chore: remove dead Ask AI CSS and update stale AskThisPage comments [a540f4f](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/a540f4f)
- **2026-08-08** — Fix: remove broken Ask AI tour steps and shortcut help entries [16d308b](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/16d308b)
- **2026-08-08** — Chore: initial commit of AI-stripped EBA wiki duplicate [9402805](https://github.com/dreadnaughtasaurous/dreadnaughtasaurous.github.io/commit/9402805)

