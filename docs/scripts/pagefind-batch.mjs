// pagefind-batch.mjs
// Runs the full pagefind-test-corpus.json against the built index via a
// faithful port of SearchModal.vue's actual doSearch() ranking pipeline —
// raw query, exact-phrase boost, title-match re-ranking, EBA diversification
// — not just a bare pagefind.search() call, so results match what a real
// user sees. Loop A: queries docs/.vitepress/dist/pagefind directly via
// pagefind's Node-capable pagefind.js bundle (served over a plain static
// HTTP server — no browser needed).

import { readFileSync, writeFileSync } from 'node:fs'
import * as pagefind from '../.vitepress/dist/pagefind/pagefind.js'

const BASE = 'http://localhost:5555/eba-wiki/pagefind/'
const corpus = JSON.parse(readFileSync(new URL('./pagefind-test-corpus.json', import.meta.url), 'utf8'))

await pagefind.options({
  basePath: BASE,
  ranking: { pageLength: 0.72, termFrequency: 1.0, termSimilarity: 0.9, termSaturation: 1.3 },
})

// ── Port of computeTitleScore() from SearchModal.vue ──────────────────────
function computeTitleScore(result, queryWords) {
  if (!queryWords.length) return 0
  const rawTitle = result.meta?.title || ''
  if (!rawTitle) return 0
  const title = rawTitle.toLowerCase()
  const titleContent = title.replace(/^\d+[a-z]*[.\s]+/i, '')
  const titleWords = titleContent.split(/[\s/\-,().]+/).filter(w => w.length >= 3)
  if (titleWords.length === 0) return 0
  const matchCount = queryWords.filter(qw => {
    const escaped = qw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`\\b${escaped}`, 'i').test(title)
  }).length
  if (matchCount === 0) return 0
  const specificity = matchCount / titleWords.length
  const allPresent = (matchCount === queryWords.length) ? 1 : 0
  return (specificity * 2) + allPresent
}

// ── Port of runFuzzyFallback() from SearchModal.vue ────────────────────────
async function runFuzzyFallback(originalQuery, filters) {
  const words = originalQuery.split(' ')
  const lastWord = words[words.length - 1]
  for (let len = lastWord.length - 1; len >= 3; len--) {
    const stem = lastWord.slice(0, len)
    const candidate = [...words.slice(0, -1), stem].join(' ')
    try {
      const search = await pagefind.search(candidate, { filters, excerptLength: 45 })
      if (search.results.length > 0) {
        const data = await Promise.all(search.results.slice(0, 8).map(r => r.data()))
        return { candidate, data }
      }
    } catch { break }
  }
  return null
}

// ── Port of doSearch()'s core ranking pipeline from SearchModal.vue ────────
async function doSearch(cleanQuery, filters) {
  const pfQuery = cleanQuery || null
  const search = await pagefind.search(pfQuery, { filters, excerptLength: 45 })
  const stubSlice = search.results.slice(0, 12)

  let exactIds = new Set()
  const phraseQueries = cleanQuery.trim().includes(' ') ? [`"${cleanQuery.trim()}"`] : []
  if (phraseQueries.length > 0) {
    const phraseResults = await Promise.allSettled(phraseQueries.map(pq => pagefind.search(pq, { filters })))
    for (const outcome of phraseResults) {
      if (outcome.status !== 'fulfilled') continue
      const data = await Promise.all(outcome.value.results.slice(0, 5).map(r => r.data()))
      data.forEach(r => exactIds.add(r.url))
    }
  }

  const allResults = await Promise.all(stubSlice.map(r => r.data()))
  let filtered = allResults

  const queryWords = cleanQuery.toLowerCase().split(/\s+/).filter(w => w.length >= 3)
  if (queryWords.length > 0) {
    filtered.sort((a, b) => {
      const aExact = exactIds.has(a.url) ? 1 : 0
      const bExact = exactIds.has(b.url) ? 1 : 0
      if (aExact !== bExact) return bExact - aExact
      return computeTitleScore(b, queryWords) - computeTitleScore(a, queryWords)
    })
  }

  const MAX_PER_EBA = 2
  const DIVERSITY_WINDOW = 8
  if (Object.keys(filters).length === 0 && filtered.length > MAX_PER_EBA) {
    const ebaCounts = {}
    const topSlice = []
    const spillover = []
    for (const r of filtered) {
      const eba = r.filters?.eba?.[0] || '__unknown__'
      const count = ebaCounts[eba] || 0
      if (topSlice.length < DIVERSITY_WINDOW && count < MAX_PER_EBA) {
        topSlice.push(r)
        ebaCounts[eba] = count + 1
      } else {
        spillover.push(r)
      }
    }
    filtered = [...topSlice, ...spillover]
  }

  return { total: search.results.length, results: filtered }
}

function buildFilters(item) {
  const filters = {}
  if (item.filterEba) filters.eba = item.filterEba
  if (item.filterTopic) filters.topics = item.filterTopic
  return filters
}

async function runQuery(item) {
  const filters = buildFilters(item)
  let r = await doSearch(item.query, filters)
  let fuzzyUsed = null
  if (r.results.length === 0 && item.query.trim().length > 3 && item.category !== 'known-negative') {
    const fb = await runFuzzyFallback(item.query.trim(), filters)
    if (fb) { fuzzyUsed = fb.candidate; r = { total: fb.data.length, results: fb.data } }
  }
  return { ...r, fuzzyUsed, top: r.results.slice(0, 3) }
}

function evaluate(item, result) {
  const { category } = item
  if (category === 'known-negative') {
    return { pass: result.total === 0 || result.total <= 2, reason: `total=${result.total}` }
  }
  const haystacks = result.top.map(r => (r.url || '').toLowerCase())
  let pass = false
  let reason = ''
  if (item.expectedSlugContains) {
    const want = item.expectedSlugContains.toLowerCase()
    pass = haystacks.some(u => u.includes(want))
    reason = pass ? `matched slug "${want}" in top3` : `slug "${want}" not in top3 (${haystacks.join(' | ')})`
  } else if (item.expectedEba) {
    const want = item.expectedEba.toLowerCase()
    pass = haystacks.some(u => u.includes(want))
    reason = pass ? `matched eba "${want}" in top3` : `eba "${want}" not in top3 (${haystacks.join(' | ')})`
  } else if (item.expectedTopic) {
    pass = result.total > 0
    reason = pass ? `${result.total} results` : 'zero results'
  } else {
    pass = result.total > 0
    reason = pass ? `${result.total} results` : 'zero results'
  }
  if (category === 'eba-filter-scope' && item.filterEbaSlug) {
    const leaked = haystacks.some(u => !u.includes(`/ebas/${item.filterEbaSlug}`))
    if (leaked) { pass = false; reason += ' — CROSS-EBA LEAKAGE DETECTED' }
  }
  if (result.fuzzyUsed) reason += ` [fuzzy: "${result.fuzzyUsed}"]`
  return { pass, reason }
}

const results = []
for (const item of corpus) {
  try {
    const r = await runQuery(item)
    const ev = evaluate(item, r)
    results.push({ ...item, ...ev, total: r.total })
  } catch (e) {
    results.push({ ...item, pass: false, reason: `ERROR: ${e.message}`, total: -1 })
  }
}

const byCategory = {}
for (const r of results) {
  byCategory[r.category] ??= { pass: 0, total: 0 }
  byCategory[r.category].total++
  if (r.pass) byCategory[r.category].pass++
}

const overallPass = results.filter(r => r.pass).length
const overallTotal = results.length
const passRate = (overallPass / overallTotal * 100).toFixed(1)

console.log(`\n=== Pagefind Corpus Run ===`)
console.log(`Overall: ${overallPass}/${overallTotal} (${passRate}%)\n`)
for (const [cat, s] of Object.entries(byCategory)) {
  console.log(`  ${cat.padEnd(24)} ${s.pass}/${s.total} (${(s.pass / s.total * 100).toFixed(0)}%)`)
}
console.log('\nFailures:')
for (const r of results.filter(r => !r.pass)) {
  console.log(`  [${r.category}] "${r.query}" -> ${r.reason}`)
}

writeFileSync(new URL('./pagefind-last-run.json', import.meta.url), JSON.stringify({ passRate: Number(passRate), overallPass, overallTotal, byCategory, results }, null, 2))
