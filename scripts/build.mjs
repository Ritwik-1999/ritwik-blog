import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build, loadEnv } from 'vite'
import { readPosts, validateLinks, pageData, archiveRoutes } from './content.mjs'
import { makeDocument } from './document.mjs'
import { siteOrigin, rss, sitemap } from './publishing.mjs'

const posts = readPosts()
validateLinks(posts)
const origin = siteOrigin({ ...loadEnv('production', process.cwd(), ''), ...process.env })
if (!origin) throw new Error('Set your public URL in site.config.json or SITE_URL before building. For a local-only check, use SITE_URL=http://localhost:5174.')
await build()
await build({ build: { ssr: 'src/entry-server.jsx', outDir: '.render', emptyOutDir: true } })
const { render } = await import(pathToFileURL(path.resolve('.render/entry-server.js')).href)
const template = await fs.readFile('dist/index.html', 'utf8')
for (const route of [...archiveRoutes, ...posts.map(p => p.path), '/404']) {
  const data = { ...pageData(route, posts), url: origin + route }
  const destination = route === '/404' ? 'dist/404.html' : route === '/' ? 'dist/index.html' : `dist${route}/index.html`
  await fs.mkdir(path.dirname(destination), { recursive: true })
  await fs.writeFile(destination, makeDocument(template, render(data), data, origin))
}
await fs.writeFile('dist/feed.xml', rss(posts, origin))
await fs.writeFile('dist/sitemap.xml', sitemap(posts, origin))
await fs.writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
console.log(`Generated ${posts.filter(p => p.status === 'published').length} articles, ${posts.filter(p => p.status === 'preview').length} previews, category pages, RSS, sitemap, and 404 page.`)
