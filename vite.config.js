import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs/promises'
import path from 'node:path'
import { readPosts, pageData, validateLinks } from './scripts/content.mjs'
import { makeDocument } from './scripts/document.mjs'
import { siteOrigin, rss, sitemap } from './scripts/publishing.mjs'

function staticPublishing() {
  return {
    name: 'static-publishing',
    configurePreviewServer(server) {
      return () => server.middlewares.use(async (req, res, next) => {
        try {
          const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
          const root = path.resolve('dist'), file = path.resolve(root, `.${pathname}`, 'index.html')
          if (!file.startsWith(root + path.sep)) return next()
          let html
          try { html = await fs.readFile(file, 'utf8') }
          catch { res.statusCode = 404; html = await fs.readFile('dist/404.html', 'utf8') }
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(html)
        } catch (error) { next(error) }
      })
    },
    configureServer(server) {
      server.watcher.add('content/posts')
      server.watcher.on('all', (event, file) => { if (['add', 'change', 'unlink'].includes(event) && file.endsWith('.md')) server.ws.send({ type: 'full-reload' }) })
      return () => server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname
        if (!['/feed.xml', '/sitemap.xml'].includes(pathname) && /\.[a-z0-9]+$/i.test(pathname)) return next()
        try {
          const posts = readPosts()
          validateLinks(posts)
          const origin = siteOrigin() || server.resolvedUrls.local[0].replace(/\/$/, '')
          if (pathname === '/feed.xml' || pathname === '/sitemap.xml') {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8')
            return res.end(pathname === '/feed.xml' ? rss(posts, origin) : sitemap(posts, origin))
          }
          const data = { ...pageData(req.url, posts), url: origin + pathname }
          const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
          const template = await server.transformIndexHtml(req.url, await fs.readFile('index.html', 'utf8'))
          res.statusCode = data.kind === 'notfound' ? 404 : 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(makeDocument(template, render(data), data, origin))
        } catch (error) { next(error) }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  appType: 'custom',
  plugins: [react(), staticPublishing()],
})
