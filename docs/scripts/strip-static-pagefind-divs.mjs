// One-off cleanup: removes leftover static pagefind-weight / pagefind-synonyms
// divs from source .md files (pre-computeWeight() Add-ContentWeights.ps1
// pipeline). patch-pagefind.mjs already strips and regenerates these at
// build time, so they are dead content in the source files — this script
// deletes them from the .md source directly. Run with --dry-run first.
import { readFileSync, writeFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot  = path.resolve(__dirname, '..')
const dryRun    = process.argv.includes('--dry-run')

const WEIGHT_DIV_RE   = /[ \t]*<div class="pagefind-weight"[^>]*>[\s\S]*?<\/div>\n?/g
const SYNONYMS_DIV_RE = /[ \t]*<div class="pagefind-synonyms"[^>]*>[\s\S]*?<\/div>\n?/g

// Use git ls-files to enumerate tracked markdown under ebas/ (avoids relying on shell glob quoting)
const output = execSync('git ls-files -- "docs/ebas/**/*.md"', { cwd: path.resolve(docsRoot, '..'), encoding: 'utf-8' })
const files = output.trim().split('\n').filter(Boolean).map(f => path.resolve(docsRoot, '..', f))

let changedCount = 0
let weightRemoved = 0
let synonymsRemoved = 0
let multiWarnings = []

for (const file of files) {
  const original = readFileSync(file, 'utf-8')

  const weightHits   = (original.match(WEIGHT_DIV_RE) || []).length
  const synonymsHits = (original.match(SYNONYMS_DIV_RE) || []).length
  if (weightHits > 1 || synonymsHits > 1) {
    multiWarnings.push(`${path.relative(docsRoot, file)} (weight x${weightHits}, synonyms x${synonymsHits})`)
  }

  let updated = original
    .replace(WEIGHT_DIV_RE, '')
    .replace(SYNONYMS_DIV_RE, '')

  // Collapse any run of 3+ blank lines left behind by the removal down to 2 (one blank line).
  updated = updated.replace(/\n{3,}/g, '\n\n')

  if (updated !== original) {
    changedCount++
    weightRemoved   += weightHits
    synonymsRemoved += synonymsHits
    if (!dryRun) {
      writeFileSync(file, updated, 'utf-8')
    }
  }
}

console.log(`${dryRun ? '[DRY RUN] ' : ''}Scanned ${files.length} files.`)
console.log(`Changed: ${changedCount} files`)
console.log(`Removed: ${weightRemoved} pagefind-weight divs, ${synonymsRemoved} pagefind-synonyms divs`)
if (multiWarnings.length > 0) {
  console.log(`\n⚠️  Files with MULTIPLE divs of the same class (verify these manually):`)
  multiWarnings.forEach(w => console.log('  ' + w))
}
