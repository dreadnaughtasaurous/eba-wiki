// audit-weight-distribution.mjs
//
// Reproducible calibration/regression check for computeWeight()'s 5-tier
// model in patch-pagefind.mjs. Walks docs/ebas/**/*.md directly (source, not
// built dist/ HTML) and computes each page's weight using the SAME functions
// patch-pagefind.mjs uses at build time — imported, not reimplemented, so
// this can't silently drift out of sync with the real logic.
//
// Exists because patch-pagefind.mjs's header comment asserts a "diagnostic
// distribution across 1,265 pages" and a set of slug-specificity calibration
// examples with no way to reproduce either claim (see CLAUDE.md's open items
// and the 15 Aug 2026 Pagefind audit). Run this after any change to
// computeWeight(), WAGE_TABLE_PATTERNS, PRELIMINARY_PATTERNS, or
// SECTION_INDEX_PATTERNS to see the real effect on the whole corpus before
// trusting hand-picked examples.
//
// Usage: node scripts/audit-weight-distribution.mjs

import { readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import {
  computeWeight,
  hasSectionIndexComponent,
  getFrontMatter,
} from './patch-pagefind.mjs'

const docsDir = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const ebasDir = join(docsDir, 'ebas')

const TIER_NAME = {
  12: 'Tier 1 — wage/appendix tables',
  10: 'Tier 2 — primary numbered clause (specificity ≥ 0.30)',
  7:  'Tier 3 — named section-index',
  6:  'Tier 4 — general numbered clause',
  5:  'Tier 3b (undocumented) — non-numbered, no section-index match',
  3:  'Tier 5 — preliminary/definitions/procedural',
}

function walkMdFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      out.push(...walkMdFiles(full))
    } else if (entry.endsWith('.md')) {
      out.push(full)
    }
  }
  return out
}

function slugFor(mdPath) {
  return relative(ebasDir, mdPath)
    .replace(/\.md$/, '')
    .split(/[/\\]/)
    .pop() || ''
}

const allFiles = walkMdFiles(ebasDir)

const rows = allFiles.map(mdPath => {
  const relPath = relative(ebasDir, mdPath).replace(/\\/g, '/')
  const isArchived = relPath.startsWith('archive/')
  const slug = slugFor(mdPath)
  const fm = getFrontMatter(mdPath)
  const isSectionIndexBody = hasSectionIndexComponent(mdPath)
  const weight = computeWeight(slug, fm.topics || '', isSectionIndexBody)
  return { relPath, isArchived, slug, weight }
})

function printDistribution(label, subset) {
  console.log(`\n${label} — ${subset.length} pages`)
  const counts = {}
  for (const r of subset) counts[r.weight] = (counts[r.weight] || 0) + 1
  for (const w of Object.keys(counts).sort((a, b) => b - a)) {
    const n = counts[w]
    const pct = ((n / subset.length) * 100).toFixed(1)
    console.log(`  weight ${String(w).padStart(2)}  ${String(n).padStart(4)} pages (${pct}%)  ${TIER_NAME[w] || '(unknown tier)'}`)
  }
}

printDistribution('ALL PAGES (including archived)', rows)
printDistribution('LIVE PAGES (excluding docs/ebas/archive/)', rows.filter(r => !r.isArchived))

console.log(`\nFor comparison, patch-pagefind.mjs's header comment claims a "diagnostic distribution across 1,265 pages": 1,107 numbered clauses / 144 section-index pages / 14 preliminary pages.`)
console.log(`Actual total .md pages under docs/ebas/ today: ${rows.length} (${rows.filter(r => !r.isArchived).length} live, ${rows.filter(r => r.isArchived).length} archived).`)
console.log(`That comment's category definitions (numbered/section-index/preliminary) don't map 1:1 onto computeWeight()'s 6 actual weight values above, so treat the distribution above — not the old comment — as the current source of truth.`)

// ── Reproduce the specificity-ratio calibration examples cited in
// computeWeight()'s comment block, against whatever EBA(s) actually contain
// each slug today, so drift is caught rather than assumed away.
const CALIBRATION_EXAMPLES = [
  { slug: '52-overtime', expectWeight: 10, note: '1/1 = 1.00 → primary' },
  { slug: '55-rest-period-after-overtime-recall-ten-hour-break', expectWeight: 3, note: 'intercepted by PRELIMINARY_PATTERNS before specificity check' },
  { slug: '57-annual-leave', expectWeight: 10, note: '1/2 = 0.50 → primary' },
  { slug: '59-cashing-out-of-annual-leave', expectWeight: 3, note: 'intercepted by PRELIMINARY_PATTERNS before specificity check' },
  { slug: '54-personal-carer-s-leave', expectWeight: 10, note: '1/3 = 0.33 → primary' },
  { slug: '33-allowances-related-to-overtime', expectWeight: 10, note: '1/3 = 0.33 → primary allowance' },
]

console.log(`\nCalibration example check (from computeWeight()'s comment block):`)
for (const ex of CALIBRATION_EXAMPLES) {
  const matches = rows.filter(r => r.slug === ex.slug)
  if (matches.length === 0) {
    console.log(`  ${ex.slug} — NOT FOUND in current corpus (slug renamed/removed since comment was written?)`)
    continue
  }
  for (const m of matches) {
    const status = m.weight === ex.expectWeight ? 'OK' : 'MISMATCH'
    console.log(`  [${status}] ${ex.slug} (${m.relPath}) → weight ${m.weight}, expected ${ex.expectWeight} (${ex.note})`)
  }
}

// ── Regression guard for the section-index weight-5 fix: list any remaining
// weight-5 pages so it's obvious at a glance whether they're legitimate
// content pages (expected) or a missed <SectionIndex/> page (regression).
const weight5 = rows.filter(r => r.weight === 5)
console.log(`\nWeight-5 pages (${weight5.length}) — verify each is a real content page, not a missed section-index page:`)
for (const r of weight5) console.log(`  ${r.relPath}`)
