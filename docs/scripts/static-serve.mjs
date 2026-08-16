import http from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const root = new URL('../.vitepress/dist/', import.meta.url)
const port = process.argv[2] || 5555

const types = { '.js': 'text/javascript', '.json': 'application/json', '.pf_meta': 'application/octet-stream', '.pf_index': 'application/octet-stream', '.pf_filter': 'application/octet-stream', '.pf_fragment': 'application/octet-stream', '.wasm': 'application/wasm', '.pagefind': 'application/octet-stream' }

http.createServer(async (req, res) => {
  try {
    const urlPath = req.url.replace(/^\/eba-wiki\//, '').split('?')[0]
    const filePath = new URL(urlPath, root)
    const data = await readFile(filePath)
    const ext = extname(urlPath)
    res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
    res.end(data)
  } catch (e) {
    res.statusCode = 404
    res.end('not found')
  }
}).listen(port, () => console.log(`static server on ${port}`))
