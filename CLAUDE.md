# CLAUDE.md — EBA Wiki (No-AI Edition)

This file gives Claude Code the ground rules for this repository. Read this before making any changes. Its purpose right now is specifically to support **enhancing Pagefind search to its best possible state** — that's the active goal, so the Pagefind and topic-taxonomy sections below are the most load-bearing parts of this file.

---

## ⚠️ Read this first: No-AI constraint (hard rule)

This project is a **deliberate fork** of the original full-featured wiki (`dreadnaughtasaurous/dreadnaughtasaurous.github.io`, local root `C:\Projects\EBAdb`), created by duplicating that codebase and **stripping out all AI functionality** while keeping Pagefind keyword search intact.

**Do not, under any circumstances:**
- Reintroduce `AskPanel.vue`, `AskThisPage.vue`, an "Ask AI" tab/mode, or any AI worker/model-chain integration.
- Suggest restoring AI functionality as a "fix" for something, even if it looks like a regression from the original wiki.
- Copy code from the original `EBAdb` project without first checking whether it touches AI functionality.

If a task or bug description seems to imply AI functionality should exist, **stop and flag it explicitly** rather than proceeding. This absence is intentional, not a bug.

The original wiki is a separate project with its own Claude Project. Changes here do not apply there and vice versa — do not conflate the two repos, and never copy a file from `C:\Projects\EBAdb\` into this repo without rewriting every hardcoded `EBAdb` path first (see "Hardcoded-path incidents" below — this has already bitten this project twice).

---

## Project identity

- **Name:** EBA Wiki (No-AI Edition)
- **Purpose:** Searchable reference for Enterprise Bargaining Agreements (EBAs) covering the Victorian public health sector, for employees, HR teams, and managers. Keyword search only (Pagefind) — no AI assistance.
- **Live URL:** https://dreadnaughtasaurous.github.io/eba-wiki/ (GitHub Pages **project page** — subpath deployment, not a root `username.github.io` domain)
- **Repository:** https://github.com/dreadnaughtasaurous/eba-wiki
- **Local root:** `C:\Projects\eba-wiki\`
- **Framework:** VitePress v1.6.4, Vue 3
- **Search:** Pagefind v1.5.2 with a custom post-build patch script (see "Pagefind architecture" below)
- **Node version (confirmed):** v24.15.0
- **Site title in config:** `EBAdb` — a holdover from the original project name in the VitePress `title` field. Do not "correct" it without asking; it may be intentional branding.

---

## Critical config fact: the `base` path

`docs/.vitepress/config.js` sets:
```js
base: '/eba-wiki/'
```
Confirmed: the config file is `config.js`, **not** `config.mts`.

Because this is a subpath deployment, **any hardcoded absolute path 404s in production** even though it works fine on `docs:dev`. This is the single most common bug class in this project. Always check for this first when diagnosing broken assets, broken Pagefind loading, or blank pages that only fail in production.

Two established gotchas already fixed once — do not reintroduce them:

1. **Custom Vue components do not get automatic `base` prefixing.** Only VitePress's own nav/sidebar rendering does. Any custom component with `href` or `img src` bindings must wrap them with VitePress's `withBase()` helper. Data arrays that feed those bindings should stay as plain root-relative strings (`/ebas/...`) — `withBase()` is applied at render time, not baked into the data. Already fixed once in `HomeCards.vue`.
2. **`route.path` includes the full `base` prefix in production builds**, but not in `docs:dev`. Any code doing key lookups or comparisons against `route.path` (e.g. `section-index-data.js` lookups in `SectionIndex.vue`) must strip `import.meta.env.BASE_URL` from `route.path` first, or production builds silently render blank/broken content that works fine locally. Already fixed once in `SectionIndex.vue`.

⚠️ **Unresolved as of last review:** a VS Code paste-corruption incident caused an SSR crash (`Cannot read properties of undefined (reading 'displayNumber')`) in `SectionIndex.vue` after that fix, requiring a clean repaste. Whether the repaste fully resolved the crash and production build is clean was **not confirmed** in either source conversation — verify before assuming this is closed:
```powershell
Set-Location C:\Projects\eba-wiki\docs
npm run docs:build
```
**Expected output if fixed:** build completes with no SSR errors and no `displayNumber` stack trace. If the crash reappears, run Format Document (`Shift+Alt+F`) on `SectionIndex.vue` as a structural sanity check — large `.vue` pastes can silently misplace attributes as bare text lines above tag openings.

---

## Hardcoded-path incidents (read before trusting any script's file paths)

Two separate scripts in this repo have been found with hardcoded `C:\Projects\EBAdb\...` paths left over from the fork, both silently breaking functionality for months before being caught:

- `Generate-TopicList.mjs` — wrote `topic-list.mjs` to `EBAdb`'s folder, meaning the live file powering the topic filter dropdown was a stale 14 May 2026 snapshot with exactly **one** topic value (`"workload"`). Fixed.
- `Generate-TopicsPage.ps1` — pointed `$docsRoot` at `C:\Projects\EBAdb\docs`, meaning the live `/topics/` browse page was built entirely from the *other* project's content (wrong URLs, wrong folder structure, a malformed `circular 870` topic value with a literal space). Fixed.

**Lesson for any future script work:** before trusting a script's output, grep it for `EBAdb` first:
```powershell
Select-String -Path C:\Projects\eba-wiki\docs\scripts\*.mjs, C:\Projects\eba-wiki\docs\scripts\*.ps1 -Pattern "EBAdb"
```
**Expected output if clean:** no matches. Any match is a live bug, not a comment — treat it the same way these two were treated.

---

## Directory structure (verified via PowerShell, 15 Aug 2026)

Run all `npm`/`node` commands from `docs/`, not the repo root.

```
C:\Projects\eba-wiki\
├── docs\
│   ├── .vitepress\
│   │   ├── config.js              ← base: '/eba-wiki/', site title, nav, GitChangelog plugin
│   │   ├── generated\
│   │   │   └── topic-list.mjs     ← consumed by SearchModal.vue; regenerated by Generate-TopicList.mjs
│   │   ├── theme\
│   │   │   ├── index.js           ← Theme entry point (NOT index.ts)
│   │   │   ├── eba-registry.js    ← ⭐ single source of truth for all EBA metadata
│   │   │   ├── style.css
│   │   │   └── components\        ← all Vue components (SearchModal.vue, SectionIndex.vue, etc.)
│   │   └── dist\                  ← build output — generated, gitignored, do not hand-edit
│   ├── ebas\
│   │   ├── allied-health\
│   │   ├── archive\
│   │   │   └── has-managers-admin-2021-2025\   ← superseded agreement content
│   │   ├── biomedical-engineers\
│   │   ├── childrens-services\
│   │   ├── doctors-in-training\
│   │   ├── has-managers-admin-2025-2027\       ← current HAS agreement
│   │   ├── medical-specialists\
│   │   ├── mental-health\
│   │   ├── mspp\                  ← Medical Scientists, Pharmacists & Psychologists
│   │   └── nurses-midwives\
│   ├── generated\                 ← auto-generated data files (related-clauses.json, section-index-data.js) — do not hand-edit
│   ├── scripts\
│   │   ├── link-clauses.mjs
│   │   ├── patch-pagefind.mjs
│   │   ├── Generate-TopicList.mjs
│   │   ├── Generate-TopicsPage.ps1
│   │   ├── topic-aliases.json     ← ⭐ shared normalization data, read by both Node and PowerShell
│   │   ├── topic-aliases.mjs      ← Node-consumable wrapper around topic-aliases.json
│   │   └── generate-section-index.mjs
│   ├── topics\index.md            ← the live /topics/ browse page, generated by Generate-TopicsPage.ps1
│   └── index.md
├── worker\
│   ├── eba-analytics-worker\      ← ⚠️ belongs to the ORIGINAL project's lineage — do not edit/deploy from here for this project
│   └── eba-analytics-worker-noai\ ← this project's actual isolated worker; URL matches theme/index.js
├── eba\                           ← ⚠️ see "Legacy `eba\` directory" below — do not delete without asking
├── .github\workflows\
│   └── deploy.yml
└── link-clauses-log.txt
```

### Legacy `eba\` directory — do not delete without asking first
A top-level `C:\Projects\eba-wiki\eba\` directory (sibling to `docs\`) exists with a `stylesheets\`/`javascripts\`/`assets\` shape that does not match VitePress output — it looks like a pre-VitePress (Material-for-MkDocs-style) build artifact. Confirmed via `git log --follow -- eba/`: it is **tracked in git**, not gitignored build output, and was swept in wholesale on the very first commit of this repo (`"Chore: initial commit of AI-stripped EBA wiki duplicate"`). Its `ebas\has-managers-admin\` subfolder is a single un-split folder, meaning its content predates the 2025-2027 registry split and is stale. It is a reasonable `Chore:` cleanup candidate, but **flag it to the user explicitly the first time it becomes relevant to a task rather than deleting it silently** — something might still reference it that hasn't been checked.

### Root-level `scripts\` folder
`C:\Projects\eba-wiki\scripts\` (distinct from `docs\scripts\`) was confirmed **empty** (`Get-ChildItem -Force` returned nothing). Safe to treat as inert; not worth further investigation.

### Duplicate `generated\` folders — resolved, not a bug
Both `docs\generated\` and `docs\.vitepress\generated\` exist and are both legitimate — they are not duplicates of each other:
- `docs\generated\` holds `related-clauses.json` (consumed by `RelatedClauses.vue`) and `section-index-data.js` (consumed by `SectionIndex.vue`).
- `docs\.vitepress\generated\` holds `topic-list.mjs` (consumed by `SearchModal.vue`).

Don't "consolidate" these into one folder — the import paths in each component are correct as written.

---

## Authoritative EBA registry

`docs/.vitepress/theme/eba-registry.js` is the **single source of truth** for all EBA metadata (name, slug, color, nominal expiry, archive status, PDF path). `SearchModal.vue`, `EBAStatusStrip.vue`, `EBAExplorer.vue`, and the browse grid all derive their data from this file via `EBA_REGISTRY`, `ebaColors`, `ebaList`, and `ebaSlugLabels`. **Never hardcode EBA names or colors in a component — import from this registry.**

| Slug | Name | Family | Archived | Color |
|---|---|---|---|---|
| `allied-health` | Allied Health Professionals 2021-2026 | allied-health | No | `#EA580C` |
| `biomedical-engineers` | Biomedical Engineers 2025-2028 | biomedical-engineers | No | `#4F46E5` |
| `childrens-services` | Children's Services Award 2010 (Modern Award, no expiry) | childrens-services | No | `#DB2777` |
| `doctors-in-training` | Doctors in Training 2022-2026 | doctors-in-training | No | `#D97706` |
| `has-managers-admin-2021-2025` | Health Allied & Managers Admin 2021-2025 | has-managers-admin | **Yes** | `#3B82F6` |
| `has-managers-admin` (folder: `has-managers-admin-2025-2027`) | Health Allied & Managers Admin 2025-2027 | has-managers-admin | No | `#3B82F6` |
| `medical-specialists` | Medical Specialists 2022-2026 | medical-specialists | No | `#0891B2` |
| `mental-health` | Mental Health Services 2024-2028 | mental-health | No | `#7C3AED` |
| `mspp` | Medical Scientists, Pharm & Psych 2021-2025 | mspp | No | `#059669` |
| `nurses-midwives` | Nurses and Midwives 2024-2028 | nurses-midwives | No | `#E11D48` |

⚠️ **This supersedes any older EBA coverage table in `how-to-use.md`** — the HAS Managers & Admin transition (2021-2025 archived → 2025-2027 current) is already live in `eba-registry.js`. If `how-to-use.md` still shows a single un-archived `has-managers-admin` entry, it is out of date; correct it to match this table, not the reverse.

`getEBAStatus(entry)` computes status automatically (`current` / `expiring` / `renegotiation` / `superseded` / `modern-award`) — supersession is automatic based on matching `family` and a later `nominalExpiry`. **Never manually flag an entry as superseded.** To add a newly ratified agreement, add a new entry with the correct `family` and `nominalExpiry`, `archived: false` — don't edit the old entry. To archive one, set `archived: true` and update `indexPath` to `/ebas/archive/<slug>/`.

---

## Pagefind architecture (read fully before touching search — this is the goal)

Pagefind indexing quality is controlled by `docs/scripts/patch-pagefind.mjs`, which runs post-build and rewrites every HTML file in `dist/`. This is the primary file for search-quality work. It implements:

1. **Idempotent strip-then-reinject** of all previously injected divs — safe to re-run.
2. **`data-pagefind-body` / `data-pagefind-ignore`** on the `.vp-doc` div — scopes indexing to clause content only. Archived pages get `data-pagefind-ignore` on the body (title stays indexed, body text does not).
3. **Filter spans** for `eba` and `topics`, sourced from frontmatter and **normalized through `topic-aliases.mjs`** (see "Topic normalization" below) before injection. Archived agreements are excluded from filter spans entirely.
4. **A 5-tier relevance weighting model** (`computeWeight()`), calibrated against a diagnostic distribution of ~1,265 pages:
   - Tier 1 (weight 12): wage/appendix tables, matched via `WAGE_TABLE_PATTERNS`.
   - Tier 2 (weight 10): primary numbered clause whose slug specifically matches its topic (specificity ratio ≥ 0.30).
   - Tier 3 (weight 7): named section-index pages.
   - Tier 4 (weight 6): general tagged clause, no primary slug-topic match.
   - Tier 5 (weight 3): preliminary/definitions/procedural pages, matched via `PRELIMINARY_PATTERNS`.
   - Scale is **relative** — keep ceiling at 12, floor at 3, when tuning.
   - ⚠️ **`computeWeight()` deliberately uses the RAW, un-normalized `fm.topics` string**, not the alias-normalized version used for filter spans. Its slug-specificity matching is calibrated against exact frontmatter wording — normalizing before this call would silently shift weight-tier results. This is intentional and documented inline at the call site. Don't "fix" it into consistency without deliberately re-calibrating the specificity threshold.
5. **Synonym injection** — merges frontmatter `synonyms`, extracted body synonyms, and a global `SLUG_SYNONYMS` map into a hidden `data-pagefind-ignore` div, so informal search terms map to formal EBA language.
6. **Custom excerpt meta** (`data-pagefind-meta="excerpt"`) — frontmatter `title` + first meaningful prose sentence, used by `SearchModal.vue`'s `getExcerpt()` as a fallback when Pagefind's auto-excerpt has no `<mark>` highlights (match came from a title or table cell rather than prose).

`SearchModal.vue` sets Pagefind ranking options in `onMounted()`:
```js
await pagefind.options({
  ranking: { pageLength: 0.4, termFrequency: 0.8, termSimilarity: 1.2, termSaturation: 1.6 }
})
```

**Base-path note for Pagefind specifically:** Pagefind's runtime import must resolve under `/eba-wiki/`, not a bare `/pagefind/pagefind.js` absolute path — `config.js` handles this via `modulepreload`/`prefetch` head entries and a Vite `external` rollup option. If search silently fails to initialise only in production, check this wiring first.

**`SearchModal.vue` and `SearchPage.vue` must stay structurally identical** — any feature added to one must be ported to the other. The only permitted difference is the modal overlay wrapper.

**Analytics beacon:** every search and pageview fires a POST to `https://eba-analytics-worker-noai.irresistibl.workers.dev` (confirmed live in `theme/index.js`) — the isolated No-AI-project worker, separate from the original wiki's worker/KV. Never repoint this at the original wiki's worker URL.

⚠️ **Not yet build-verified:** the topic-normalization change to `patch-pagefind.mjs`'s filter-span injection was made and committed, but has **not** been confirmed end-to-end via an actual `npm run docs:build` + `npm run docs:index` run in either source conversation. Run this before your next deploy and spot-check a patched HTML file's filter spans:
```powershell
Set-Location C:\Projects\eba-wiki\docs
npm run docs:build
npm run docs:index
```
**Expected output:** build completes, then `docs:index` prints its usual patched/skipped/excerpt count summary with no errors. Then confirm normalized values landed correctly:
```powershell
Select-String -Path C:\Projects\eba-wiki\docs\.vitepress\dist\ebas\**\*.html -Pattern 'data-pagefind-filter="topics"' | Select-Object -First 5
```
If any span still shows a raw variant (e.g. `casual` instead of `casual-employment`), the normalization isn't taking effect and needs debugging before you rely on the topic filter.

---

## Topic normalization (completed 15 Aug 2026 — all changes committed)

**The problem this solved:** the topic filter dropdown in `SearchModal.vue` was effectively broken (one selectable value, `"workload"`) due to a hardcoded-path bug in `Generate-TopicList.mjs` (see "Hardcoded-path incidents" above). Fixing that path bug initially surfaced 232 raw, uncontrolled free-text topic values against a documented 13-value canonical taxonomy — near-duplicate sprawl like `casual` vs `casual-employment`, `reimbursement` vs `reimbursements`, etc. — which would have made the filter dropdown worse, not better, if shipped as-is.

**Solution: `docs/scripts/topic-aliases.json`** is now the single shared source of truth for topic normalization, with `topic-aliases.mjs` as its Node-consumable wrapper (exports `normalizeTopic()`, `auditNeedsReview()`, `auditDataQualityFlags()`). JSON was chosen specifically so `Generate-TopicsPage.ps1` — a PowerShell script that cannot import an ES module — can also read the exact same alias data.

**All three topic-consuming surfaces now import from this one shared source and agree exactly at 220 topics:**
1. `Generate-TopicList.mjs` → the Pagefind topic filter dropdown data (`topic-list.mjs`)
2. `patch-pagefind.mjs` → the actual `data-pagefind-filter="topics"` spans Pagefind facets against
3. `Generate-TopicsPage.ps1` → the live `/topics/` browse page (`docs/topics/index.md`)

If you ever see these three disagree on topic count again, that's a regression — one of them has drifted from `topic-aliases.json`, or `docs/ebas/archive/` scoping broke in one but not the others.

**High-confidence merges currently active** (verified against existing `link-clauses.mjs` filename conventions before merging):
- `casual` → `casual-employment`
- `reimbursements` → `reimbursement`
- `managers-administrative-workers` → `managers-and-administrative-workers`
- `health-and-allied-services` → `health-allied-services`

**Deliberately NOT auto-merged** (`NEEDS_REVIEW` in `topic-aliases.json` — merging these wrong would blur genuinely distinct concepts, which is worse than the sprawl): `flexibility`/`flexible-working`/`flexible-working-arrangements`, `workload`/`workload-management`/`staffing-flexibility`, `employment-support`/`employment-support-officers`/`employee-support`, `leave`/`paid-leave`, `part-time`/`part-time-employment`. `Generate-TopicList.mjs` prints an audit warning listing which of these clusters are actually live in content every time it runs — check that output after each run.

**Archive scoping fix, applied to all three surfaces:** `docs/ebas/archive/` (the superseded HAS 2021-2025 content) is now excluded from topic collection everywhere, matching the scope `patch-pagefind.mjs` already used for search indexing. This closed a real discrepancy — `Generate-TopicList.mjs` had been silently including archived-only topics while `Generate-TopicsPage.ps1` excluded them, causing the two surfaces to disagree by count until this was fixed.

**Data-quality fix folded in:** a genuine content typo was found and corrected — `docs/ebas/has-managers-admin-2025-2027/common-terms/consultation-disputes/index.md` used the singular `dispute` as a topic tag (the only occurrence in the corpus vs. the established plural `disputes` convention). Fixed in frontmatter directly, not via an alias — a one-off typo doesn't belong in the alias map.

⚠️ **Known limitation, not yet closed:** the alias map above was built from partial visibility into the original 232-topic list (only ~139 of 232 were visible in the terminal output that first revealed the bug). There are likely more duplicate pairs among topics not yet reviewed. Before considering the alias map "done," get the full current list and re-audit:
```powershell
Get-Content C:\Projects\eba-wiki\docs\.vitepress\generated\topic-list.mjs
```

**To add a new alias:**
1. Confirm both tags genuinely mean the same thing — check which clause pages use each one via `Select-String` across `docs/ebas/**/*.md` frontmatter.
2. Add an entry to `topic-aliases.json` (not `.mjs` — that's the wrapper, not the data).
3. Re-run all three generators and diff output before committing:
```powershell
Set-Location C:\Projects\eba-wiki\docs
node scripts/Generate-TopicList.mjs
powershell -File scripts/Generate-TopicsPage.ps1
npm run docs:index
```

---

## Build & verification commands (run from `docs/`)

Confirmed exact `package.json` scripts:
```json
"docs:dev":         "vitepress dev .",
"docs:build":       "vitepress build .",
"docs:preview":     "vitepress preview .",
"docs:related":     "node scripts/generate-related-clauses.mjs",
"docs:legislation": "node scripts/link-legislation.mjs",
"docs:index":       "vitepress build . && node scripts/generate-page-catalog.mjs && node scripts/patch-pagefind.mjs && pagefind --site .vitepress/dist --output-path .vitepress/dist/pagefind"
```

⚠️ **`docs:index` is a full four-step chain**, not just "runs patch-pagefind.mjs": (1) `vitepress build .` again — redundant if you already ran `docs:build`, harmless but wastes time — (2) `generate-page-catalog.mjs`, (3) `patch-pagefind.mjs` (injects `data-pagefind-*` attributes), (4) the actual `pagefind` CLI indexer, which reads those injected attributes to build the search index. **Never split these into separate calls or reorder them** — the CLI must run after `patch-pagefind.mjs` writes its attributes, or the index won't reflect weights/filters/synonyms at all.

**For a full rebuild-and-reindex, run just:**
```powershell
Set-Location C:\Projects\eba-wiki\docs
node scripts/generate-section-index.mjs   # only if section-index-data.js needs regenerating
npm run docs:index                        # builds, catalogs, patches, AND indexes — one command
npm run docs:preview                      # serves at http://localhost:4173/eba-wiki/ (note the base path)
```
Use `npm run docs:build` / `npm run docs:dev` on their own only when you specifically want a build or dev server without touching the search index.

**Inspect the built output directly rather than trusting the console log alone** — `patch-pagefind.mjs` prints a patched/skipped/excerpt count, but a plausible count doesn't guarantee correct values landed on the right pages:
```powershell
Select-String -Path C:\Projects\eba-wiki\docs\.vitepress\dist\**\*.html -Pattern "data-pagefind-weight", "data-pagefind-filter", "pagefind-synonyms" | Select-Object -First 10
```

Other useful commands:
```powershell
node scripts/link-clauses.mjs --dry-run     # preview clause cross-link changes — always run before the real pass
node scripts/link-clauses.mjs               # apply — all EBAs
node scripts/link-clauses.mjs --eba <slug>  # single EBA only
node scripts/Generate-TopicList.mjs         # regenerate topic-list.mjs after adding/aliasing topic values
powershell -File scripts/Generate-TopicsPage.ps1   # regenerate the /topics/ browse page
npm run docs:related                        # regenerate related-clause suggestions
npm run docs:legislation                    # re-link legislation references
```
Run `docs:related` and `docs:legislation` after any change that could affect clause relationships or legislation citations.

**Beginner note:** `docs:preview` serves the site at whatever `base` is set in `config.js` (`/eba-wiki/`), so the local preview URL looks like `http://localhost:4173/eba-wiki/`, not `http://localhost:4173/`. A blank page or 404 at the bare root is expected — navigate to the `/eba-wiki/` subpath.

---

## Commit conventions

Prefixes: `Content update:`, `Feature (search):`, `Feature (<name>):`, `Fix:`, `Chore:`, `Style:`, `Docs:`, `Script:`, `Refactor:`.

Multi-line PowerShell commit format:
```powershell
git add <full-absolute-path>
git commit -m "Fix: <subject>" `
           -m "<one paragraph of context>" `
           -m "- <bullet 1>`n- <bullet 2>`n- <bullet 3>"
git push origin main
```

**Stage related changes into separate, correctly-scoped commits rather than one giant commit** — e.g. the topic-normalization work landed as four commits: (1) the new shared alias module, (2) `Generate-TopicList.mjs` wiring + regenerated output, (3) `patch-pagefind.mjs` + `Generate-TopicsPage.ps1` + the topics page together (all three converging on the same alias data), (4) the one-line content typo fix, kept separate since it's `Content update:` not `Script:`.

**Before running `git add`, check for diagnostic/backup files that shouldn't be committed** — e.g. ad hoc `.txt` diff output from `Compare-Object` checks, or manual `*-OLD-backup.mjs` safety copies. These accumulate during iterative debugging and are easy to sweep in accidentally with a broad `git add .` (which this project avoids for exactly that reason — always `git add` explicit full paths).

Never use `git commit --amend` on existing history — the changelog generation (`@nolebase/vitepress-plugin-git-changelog`, configured in `config.js`) reads real commit timestamps and authorship per file; rewriting history breaks it.

---

## Accuracy rules for EBA content (non-negotiable)

EBA content is legally binding.
- Never paraphrase clause text — reproduce verbatim from the official PDF.
- Never invent wage rates, allowance amounts, effective dates, or clause numbers. If uncertain, say so explicitly rather than guessing.
- Clause cross-references are hyperlinked by `link-clauses.mjs` — do not hand-hyperlink clause numbers in markdown.
- When correcting existing content, state what the original said and what the correction is.
- Topic tag corrections (like the `dispute`/`disputes` typo fix above) are content-accuracy fixes, not aliasing — fix the frontmatter directly rather than adding a one-off alias for a genuine typo.

---

## Known open items at time of writing

1. `SectionIndex.vue` SSR crash — repaste applied, **resolution not confirmed**. Run `npm run docs:build` and check for the `displayNumber` stack trace before assuming this is closed.
2. `patch-pagefind.mjs` topic-normalization change — committed but **not build-verified end-to-end**. Run `npm run docs:index` and spot-check filter spans in the built HTML before the next deploy.
3. `SearchModal.vue` has two residual AI-related code comments flagged for cosmetic cleanup — safe to remove, not functional.
4. `how-to-use.md` EBA coverage table may not reflect the current registry — treat `eba-registry.js` as authoritative, not the markdown.
5. Legacy `eba\` directory at repo root — stale, tracked, a reasonable cleanup candidate, but do not delete without asking first (see above).
6. Topic alias map was built from partial visibility (~139 of 232 original raw topics) — get the full current list and re-audit for missed duplicate pairs.
7. GitHub Pages "Source: GitHub Actions" is a per-repo setting not inherited when a repo is duplicated — if deploys stop appearing, check repo Settings → Pages before debugging the workflow itself.