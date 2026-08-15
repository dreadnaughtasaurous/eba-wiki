// topic-aliases.mjs
//
// Loads topic normalization data from topic-aliases.json — the single
// source of truth shared with Generate-TopicsPage.ps1 (PowerShell can't
// import an ES module, so JSON is the common format both languages read).
//
// DO NOT hardcode alias entries directly in this file anymore — edit
// topic-aliases.json instead, so both this module and the PowerShell script
// stay in sync automatically. This file only adds the JS-side helper
// functions on top of that shared data.
//
// Consumed by BOTH:
//   - Generate-TopicList.mjs   (builds the topic filter dropdown options)
//   - patch-pagefind.mjs       (injects the actual data-pagefind-filter="topics"
//                                spans that Pagefind facets against)
// Both MUST import this same module. If only the dropdown is normalized but
// the actual filter spans aren't, selecting a canonical topic from the
// dropdown will silently miss pages still tagged with the un-normalized
// variant — the filter would look fixed but return incomplete results.
//
// Generate-TopicsPage.ps1 (the /topics/ browse page generator) reads
// topic-aliases.json directly rather than importing this file, since it's
// PowerShell — but applies the exact same alias/needsReview data.
//
// ── Known limitation ────────────────────────────────────────────────────
// TOPIC_ALIASES below contains only HIGH-CONFIDENCE spelling/pluralization
// duplicates, built from partial visibility into the real topic universe
// (see project history — the generator scripts had wrong-repo hardcoded
// paths for months, so no one had seen the full, correct topic list until
// recently). Re-run the full audit with `npm run docs:index` and check the
// console warning after every content change, don't assume this list is
// complete.
//
// ── Adding a new alias ────────────────────────────────────────────────────
// 1. Confirm both tags genuinely mean the same thing by checking which
//    clause pages use each one (Select-String across docs/ebas/**/*.md
//    frontmatter is the fastest way).
// 2. Add an entry to the "aliases" object in topic-aliases.json:
//    "variant-spelling": "canonical-spelling"
// 3. Re-run Generate-TopicList.mjs, patch-pagefind.mjs (via npm run
//    docs:index), AND Generate-TopicsPage.ps1, then diff each output before
//    committing — same verification loop used to catch the original bug.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, 'topic-aliases.json')

const raw = JSON.parse(readFileSync(DATA_PATH, 'utf8'))

export const TOPIC_ALIASES = raw.aliases
export const NEEDS_REVIEW = raw.needsReview.map(cluster => ({
  tags: cluster.tags,
  note: cluster.note,
}))
export const DATA_QUALITY_FLAGS = raw.dataQualityFlags.map(flag => ({
  tags: flag.tags,
  note: flag.note,
}))

/**
 * normalizeTopic — returns the canonical form of a topic tag, or the tag
 * unchanged if no alias is defined. Never drops a topic — an unmapped tag
 * passes through as-is rather than being silently discarded, so a novel
 * topic added to frontmatter always makes it into the filter even before
 * anyone reviews it for possible consolidation.
 */
export function normalizeTopic(tag) {
  if (!tag) return tag
  const trimmed = tag.trim()
  return TOPIC_ALIASES[trimmed] ?? trimmed
}

/**
 * auditNeedsReview — given the full set of topics actually present in the
 * content right now, returns only the NEEDS_REVIEW clusters that have more
 * than one of their listed tags actually in use. Lets you ignore clusters
 * that turned out to be non-issues (e.g. only one variant is actually used
 * anywhere) and focus on ones that are live sprawl today.
 */
export function auditNeedsReview(allTopicsInUse) {
  const inUse = new Set(allTopicsInUse.map(t => t.trim()))
  return NEEDS_REVIEW
    .map(cluster => ({
      ...cluster,
      present: cluster.tags.filter(t => inUse.has(t)),
    }))
    .filter(cluster => cluster.present.length > 1)
}

/**
 * auditDataQualityFlags — like auditNeedsReview, but for tags flagged as
 * likely mistakes/malformed data (e.g. a topic value with a stray space, or
 * a tag that looks like an internal reference rather than a real topic)
 * rather than plausible duplicates. Returns only flags where at least one
 * of the listed tags is actually present — no ">1 tags present" threshold,
 * since a single instance of a malformed tag is still worth flagging.
 */
export function auditDataQualityFlags(allTopicsInUse) {
  const inUse = new Set(allTopicsInUse.map(t => t.trim()))
  return DATA_QUALITY_FLAGS
    .map(flag => ({
      ...flag,
      present: flag.tags.filter(t => inUse.has(t)),
    }))
    .filter(flag => flag.present.length > 0)
}
