// When to run: after adding new glossary terms, new EBA content pages, or a
// new EBA. Regenerates docs/generated/term-frequency-caps.json, which
// GlossaryTooltip.vue imports to cap how many occurrences of a
// high-frequency glossary term get wrapped in an interactive tooltip span
// on a single page.
//
// ⚠ EBA_META duplication: GlossaryTooltip.vue owns the authoritative
// mapping of EBA key -> glossary file. That file is a Vue SFC, not an ES
// module this script can safely `import`, so the eba->glossary-file map
// below is a hand-reconstructed duplicate of GlossaryTooltip.vue's
// EBA_META. If you add/rename/remove an EBA entry in GlossaryTooltip.vue,
// update EBA_GLOSSARY_MAP below to match, or this script's results will
// silently drift from what the component actually serves.
import fs from 'node:fs'
import path from 'node:path'

const DOCS_ROOT = 'C:\\Projects\\eba-wiki\\docs'
const EBAS_ROOT = path.join(DOCS_ROOT, 'ebas')
const GLOSSARY_ROOT = path.join(DOCS_ROOT, 'public', 'glossary')
const OUTPUT_FILE = path.join(DOCS_ROOT, 'generated', 'term-frequency-caps.json')

// A term qualifies as "high-frequency" if it appears this many times or
// more on at least one single page anywhere in the repo.
const HIGH_FREQUENCY_THRESHOLD = 8

// Wrapped-occurrence cap applied to every term that qualifies above.
const DEFAULT_CAP = 3

// Mirrors GlossaryTooltip.vue's EBA_META (file + folder key only — this
// script doesn't need name/defsPage/caseInsensitive).
const EBA_GLOSSARY_MAP = {
  'allied-health':                 'allied-health.json',
  'biomedical-engineers':          'biomedical-engineers.json',
  'childrens-services':            'childrens-services.json',
  'doctors-in-training':           'doctors-in-training.json',
  'has-managers-admin-2021-2025':  'has-managers-admin.json',
  'has-managers-admin-2025-2027':  'has-managers-admin-2025-2027.json',
  'mspp':                          'mspp.json',
  'medical-specialists':           'medical-specialists.json',
  'mental-health':                 'mental-health.json',
  'nurses-midwives':               'nurses-midwives.json',
}

// Same pattern GlossaryTooltip.vue's isDefsPage() uses.
const DEFS_PAGE_PATTERN = /\d+-definitions(-and-interpretation)?\.md$/i

function resolveContentFolder(ebaKey) {
  const direct = path.join(EBAS_ROOT, ebaKey)
  if (fs.existsSync(direct)) return direct

  const archived = path.join(EBAS_ROOT, 'archive', ebaKey)
  if (fs.existsSync(archived)) return archived

  return null
}

function getAllMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath))
      continue
    }

    if (entry.isFile() && fullPath.toLowerCase().endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function stripFrontMatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

function stripCodeBlocksAndSpans(content) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]*`/g, ' ')
}

function stripHeadings(content) {
  return content
    .split(/\r?\n/)
    .filter(line => !/^\s*#/.test(line))
    .join('\n')
}

function extractBodyText(raw) {
  return stripHeadings(stripCodeBlocksAndSpans(stripFrontMatter(raw)))
}

// Reuses the same escaping/word-boundary approach as buildPattern() in
// GlossaryTooltip.vue, but always case-insensitive here — we're counting
// worst-case occurrences per term across all EBAs, and the runtime cap is
// applied case-insensitively regardless of an individual EBA's
// caseInsensitive flag.
function buildTermPattern(term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${escaped}\\b`, 'gi')
}

function countOccurrences(text, term) {
  const pattern = buildTermPattern(term)
  const matches = text.match(pattern)
  return matches ? matches.length : 0
}

function main() {
  if (!fs.existsSync(EBAS_ROOT)) {
    throw new Error(`EBA content root not found: ${EBAS_ROOT}`)
  }

  // termLower -> { maxCount, ebas: Set<string> }
  const termStats = new Map()
  const missingGlossaries = []
  const missingContentFolders = []

  for (const [ebaKey, glossaryFile] of Object.entries(EBA_GLOSSARY_MAP)) {
    const glossaryPath = path.join(GLOSSARY_ROOT, glossaryFile)
    if (!fs.existsSync(glossaryPath)) {
      missingGlossaries.push(glossaryPath)
      continue
    }

    const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'))
    const terms = Object.keys(glossary)
    if (!terms.length) continue

    const contentFolder = resolveContentFolder(ebaKey)
    if (!contentFolder) {
      missingContentFolders.push(ebaKey)
      continue
    }

    const files = getAllMarkdownFiles(contentFolder).filter(
      f => !DEFS_PAGE_PATTERN.test(f)
    )

    for (const file of files) {
      const raw = fs.readFileSync(file, 'utf8')
      const bodyText = extractBodyText(raw)

      for (const term of terms) {
        const count = countOccurrences(bodyText, term)
        if (count === 0) continue

        const key = term.toLowerCase()
        const existing = termStats.get(key)
        if (existing) {
          existing.ebas.add(ebaKey)
          if (count > existing.maxCount) existing.maxCount = count
        } else {
          termStats.set(key, { maxCount: count, ebas: new Set([ebaKey]) })
        }
      }
    }
  }

  const qualifying = [...termStats.entries()]
    .filter(([, stats]) => stats.maxCount >= HIGH_FREQUENCY_THRESHOLD)
    .sort((a, b) => b[1].maxCount - a[1].maxCount)

  console.log(`⚠ HIGH_FREQUENCY_THRESHOLD=${HIGH_FREQUENCY_THRESHOLD}, DEFAULT_CAP=${DEFAULT_CAP} — these are assumptions, adjust at the top of this script if they don't match what "too cluttered" looks like on real pages.\n`)

  if (missingGlossaries.length) {
    console.log('🚩 Missing glossary files (skipped):')
    missingGlossaries.forEach(p => console.log(`   - ${p}`))
  }
  if (missingContentFolders.length) {
    console.log('🚩 EBA keys with no resolvable content folder (skipped):')
    missingContentFolders.forEach(k => console.log(`   - ${k}`))
  }

  console.log(`\nHigh-frequency terms (>= ${HIGH_FREQUENCY_THRESHOLD} occurrences on at least one page), sorted by max per-page count:\n`)
  if (!qualifying.length) {
    console.log('   (none found)')
  }
  for (const [term, stats] of qualifying) {
    console.log(`   ${term.padEnd(24)} max=${stats.maxCount}  ebas=[${[...stats.ebas].join(', ')}]`)
  }

  const output = {}
  for (const [term] of qualifying) {
    output[term] = DEFAULT_CAP
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n', 'utf8')

  console.log(`\nWrote ${qualifying.length} qualifying term(s) to:`)
  console.log(OUTPUT_FILE)
}

main()
