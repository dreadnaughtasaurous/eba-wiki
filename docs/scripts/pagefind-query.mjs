// pagefind-query.mjs
// Minimal Node harness that loads the built Pagefind index directly (no
// browser/live server needed) and runs a single query, printing ranked
// results with filters. Used by run-corpus.mjs for the accuracy test loop.
//
// Pagefind's pagefind.js bundle supports being imported directly under
// Node.js (detects non-browser environment automatically) since v1.1.

import * as pagefind from '../.vitepress/dist/pagefind/pagefind.js'

const [, , queryArg] = process.argv
if (!queryArg) {
  console.error('Usage: node pagefind-query.mjs "<query>"')
  process.exit(1)
}

await pagefind.options({
  basePath: 'http://localhost:5555/eba-wiki/pagefind/',
  ranking: { pageLength: 0.72, termFrequency: 1.0, termSimilarity: 0.9, termSaturation: 1.3 },
})

const search = await pagefind.search(queryArg)
const results = await Promise.all(search.results.slice(0, 5).map(r => r.data()))

console.log(JSON.stringify({
  query: queryArg,
  total: search.results.length,
  results: results.map(r => ({ url: r.url, title: r.meta?.title, excerpt: r.excerpt })),
}, null, 2))
