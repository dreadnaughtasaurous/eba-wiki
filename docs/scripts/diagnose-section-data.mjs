import data from '../generated/section-index-data.js'

   const target = process.argv[2] || 'allied-health/allowances'
   const entry  = data[target]

   if (!entry) {
     console.log(`No entry found for key: "${target}"`)
     process.exit(0)
   }

   console.log(`Entry type        : ${entry.type}`)
   console.log(`clauseCount field : ${entry.clauseCount ?? entry.childCount}`)

   const list = entry.clauses || entry.children || []
   console.log(`Actual list length: ${list.length}`)

   let holes = 0
   list.forEach((item, i) => {
     if (!item) {
       holes++
       console.log(`  ⚠ EMPTY/UNDEFINED entry at index ${i}`)
     }
   })

   console.log(holes === 0
     ? 'Result: no holes found — this entry is clean.'
     : `Result: ${holes} hole(s) found — this data is stale/corrupt.`)