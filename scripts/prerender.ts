// Remplace la landing vide de dist/ par son HTML rendu, et écrit robots.txt et sitemap.xml.
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const siteUrl = process.env.VITE_SITE_URL

if (!siteUrl) {
  throw new Error(
    'VITE_SITE_URL manquant : définis-le (voir .env.example) avant le build.',
  )
}

const ssrEntry = path.join(root, 'dist-ssr/entry-server.js')
const { render } = (await import(pathToFileURL(ssrEntry).href)) as {
  render: () => string
}

const indexPath = path.join(root, 'dist/index.html')
const template = await readFile(indexPath, 'utf8')
const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) {
  throw new Error(`${placeholder} introuvable dans dist/index.html`)
}
await writeFile(
  indexPath,
  template.replace(placeholder, `<div id="root">${render()}</div>`),
)

const today = new Date().toISOString().slice(0, 10)
await writeFile(
  path.join(root, 'dist/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
)
await writeFile(
  path.join(root, 'dist/robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
)

await rm(path.join(root, 'dist-ssr'), { recursive: true })
console.log('Landing pré-rendue, sitemap.xml et robots.txt écrits.')
