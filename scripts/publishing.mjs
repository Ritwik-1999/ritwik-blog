import fs from 'node:fs'
import { escapeHtml, archiveRoutes } from './content.mjs'
export function siteOrigin(env = process.env) {
  const config = JSON.parse(fs.readFileSync('site.config.json', 'utf8').replace(/^\uFEFF/, ''))
  const value = env.SITE_URL || config.url || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  if (!value) return ''
  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) throw new Error('SITE_URL must be a site origin, e.g. https://your-domain.com')
  return url.origin
}
export function rss(posts, origin) {
  const entries = posts.filter(p => p.status === 'published').map(post => `<item><title>${escapeHtml(post.title)}</title><link>${escapeHtml(origin + post.path)}</link><guid isPermaLink="true">${escapeHtml(origin + post.path)}</guid><description>${escapeHtml(post.description)}</description>${post.date.length === 10 ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''}<content:encoded><![CDATA[${post.html.replace(/(href|src)="\/(?!\/)/g, `$1="${origin}/`).replace(/]]>/g, ']]]]><![CDATA[>')}]]></content:encoded></item>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel><title>Ritwik Reddy · Notes &amp; reflections</title><link>${escapeHtml(origin + '/blog')}</link><description>Engineering notes on infrastructure, automation, and reliable systems.</description><language>en-us</language><atom:link href="${escapeHtml(origin + '/feed.xml')}" rel="self" type="application/rss+xml"/>${entries}</channel></rss>`
}
export function sitemap(posts, origin) {
  const entries = [...archiveRoutes.filter(p => p !== '/blog/previews').map(path => ({ path })), ...posts.filter(p => p.status === 'published')]
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(p => `<url><loc>${escapeHtml(origin + p.path)}</loc>${(p.updated || p.date)?.length === 10 ? `<lastmod>${p.updated || p.date}</lastmod>` : ''}</url>`).join('')}</urlset>`
}
