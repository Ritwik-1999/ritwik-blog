import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import footnote from 'markdown-it-footnote'
import hljs from 'highlight.js'

export const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
export const jsonForHtml = value => JSON.stringify(value).replace(/</g, '\\u003c')
export function compileMarkdown(source) {
  const headings = [], links = [], images = [], ids = new Map()
  const md = new MarkdownIt({ html: false, typographer: true, highlight(code, language) {
    return language && hljs.getLanguage(language) ? hljs.highlight(code, { language }).value : escapeHtml(code)
  } }).use(footnote)
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => fence(...args).replace('<pre>', '<pre tabindex="0" role="region" aria-label="Code example">')
  const headingOpen = md.renderer.rules.heading_open || ((tokens, index, options, env, self) => self.renderToken(tokens, index, options))
  md.renderer.rules.heading_open = (tokens, index, options, env, self) => {
    const text = tokens[index + 1].children.filter(t => t.type === 'text' || t.type === 'code_inline').map(t => t.content).join('')
    const base = text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
    const count = (ids.get(base) || 0) + 1
    ids.set(base, count)
    const id = `heading-${base}${count > 1 ? `-${count}` : ''}`
    tokens[index].attrSet('id', id)
    headings.push({ id, text, level: Number(tokens[index].tag.slice(1)) })
    if (tokens[index].tag === 'h1') throw new Error('Use ## or deeper for article headings; the title supplies the h1.')
    return headingOpen(tokens, index, options, env, self)
  }
  const linkOpen = md.renderer.rules.link_open || ((tokens, index, options, env, self) => self.renderToken(tokens, index, options))
  md.renderer.rules.link_open = (tokens, index, options, env, self) => {
    links.push(tokens[index].attrGet('href'))
    return linkOpen(tokens, index, options, env, self)
  }
  md.renderer.rules.image = (tokens, index) => {
    const token = tokens[index], src = token.attrGet('src'), caption = token.attrGet('title')
    const alt = token.content.trim()
    if (!alt) throw new Error('Every image needs descriptive alt text.')
    if (!/^(https:\/\/|\/[^/])/.test(src)) throw new Error('Images must use an HTTPS URL or a /public-path.')
    images.push(src)
    return `<span class="article-figure"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">${caption ? `<span class="figure-caption">${escapeHtml(caption)}</span>` : ''}</span>`
  }
  const html = md.render(source)
  const words = source.replace(/```[\s\S]*?```/g, '').replace(/[#>*_`[\]()]/g, ' ').trim().split(/\s+/).filter(Boolean).length
  return { html, headings, links, images, readTime: `${Math.max(1, Math.ceil(words / 200))} min read` }
}
export function readPosts(directory = path.resolve('content/posts')) {
  const slugs = new Set()
  return fs.readdirSync(directory).filter(file => file.endsWith('.md')).map(file => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), 'utf8'))
    for (const key of ['title', 'slug', 'description', 'date', 'category', 'status']) {
      if (typeof data[key] !== 'string' || !data[key].trim()) throw new Error(`${file}: missing or invalid ${key}`)
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) || slugs.has(data.slug)) throw new Error(`${file}: invalid or duplicate slug`)
    slugs.add(data.slug)
    if (!['Engineering', 'Reflections'].includes(data.category)) throw new Error(`${file}: invalid category`)
    if (!['draft', 'preview', 'published'].includes(data.status)) throw new Error(`${file}: invalid status`)
    if (!Array.isArray(data.topics) || !data.topics.length || data.topics.some(t => typeof t !== 'string' || !t.trim())) throw new Error(`${file}: topics must be a non-empty list`)
    for (const key of ['date', 'updated']) {
      if (!data[key] && key === 'updated') continue
      const date = data[key], full = date.length === 7 ? `${date}-01` : date
      if (!/^\d{4}-\d{2}(-\d{2})?$/.test(date) || !Number.isFinite(Date.parse(full)) || new Date(full).toISOString().slice(0, 10) !== full) throw new Error(`${file}: invalid ${key}; quote ISO dates`)
    }
    if (data.updated && data.updated < data.date) throw new Error(`${file}: updated date precedes publication`)
    if (data.featured && data.status !== 'published') throw new Error(`${file}: only published articles may be featured`)
    if (data.image && !/^\/[^/]/.test(data.image)) throw new Error(`${file}: social image must be a local /public-path`)
    return { ...data, ...compileMarkdown(content), path: `/${data.category === 'Engineering' ? 'notes' : 'reflections'}/${data.slug}`, displayDate: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', ...(data.date.length === 10 ? { day: 'numeric' } : {}), timeZone: 'UTC' }).format(new Date(data.date.length === 7 ? `${data.date}-01` : data.date)) }
  }).filter(post => post.status !== 'draft').sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}
export function summarize(post) {
  const { html: _html, headings: _headings, links: _links, images: _images, ...summary } = post
  return summary
}
export const archiveRoutes = ['/', '/work', '/blog', '/blog/engineering', '/blog/reflections', '/blog/previews']
export function pageData(url, posts) {
  const pathname = new URL(url, 'http://localhost').pathname.replace(/\/$/, '') || '/'
  const published = posts.filter(p => p.status === 'published')
  if (pathname === '/work') return { kind: 'work', pathname, title: 'Engineering work · Ritwik Reddy', description: 'Selected cloud infrastructure, automation, and platform reliability work by Sai Ritwik Reddy.' }
  if (pathname === '/') return { kind: 'home', pathname, posts: published.map(summarize), title: 'Ritwik Reddy · Engineering & writing', description: 'Engineering notes, reflections, and selected work by Sai Ritwik Reddy. Cloud infrastructure, automation, and reliable systems.' }
  if (archiveRoutes.includes(pathname)) {
    const category = pathname.endsWith('/engineering') ? 'Engineering' : pathname.endsWith('/reflections') ? 'Reflections' : null
    const previews = pathname.endsWith('/previews')
    return { kind: 'blog', pathname, category, previews, previewCount: posts.filter(p => p.status === 'preview').length, posts: posts.filter(p => previews ? p.status === 'preview' : p.status === 'published' && (!category || p.category === category)).map(summarize), title: `${previews ? 'Works in progress' : category || 'Blog'} · Ritwik Reddy`, description: 'Engineering notes and reflections on infrastructure, automation, and the decisions behind reliable systems.', noindex: previews }
  }
  const post = posts.find(p => p.path === pathname)
  if (post) {
    const related = published.filter(p => p.path !== post.path).map(p => ({ post: p, score: (p.category === post.category ? 2 : 0) + p.topics.filter(t => post.topics.includes(t)).length })).filter(p => p.score > 0).sort((a, b) => b.score - a.score).slice(0, 2).map(p => summarize(p.post))
    const { links: _links, images: _images, ...article } = post
    return { kind: 'article', pathname, post: article, related, title: `${post.title} · Ritwik Reddy`, description: post.description, noindex: post.status === 'preview' }
  }
  return { kind: 'notfound', pathname, title: 'Page not found · Ritwik Reddy', description: 'This page could not be found. Explore the blog or return home.', noindex: true }
}
export function validateLinks(posts) {
  const routes = new Set([...archiveRoutes, ...posts.map(p => p.path)])
  for (const post of posts) {
    for (const href of [...post.links, ...post.images, ...(post.image ? [post.image] : [])]) {
      if (/^(https?:|mailto:)/.test(href)) continue
      if (!href.startsWith('/') && !href.startsWith('#')) throw new Error(`${post.slug}: use an absolute site path for ${href}`)
      const target = new URL(href, `https://local.test${post.path}`)
      const pathname = decodeURIComponent(target.pathname).replace(/\/$/, '') || '/'
      if (!routes.has(pathname) && !fs.existsSync(path.join('public', pathname.slice(1)))) throw new Error(`${post.slug}: broken internal link ${href}`)
      const targetPost = posts.find(p => p.path === pathname)
      if (target.hash && targetPost && !targetPost.html.includes(`id="${escapeHtml(decodeURIComponent(target.hash.slice(1)))}"`)) throw new Error(`${post.slug}: missing section ${href}`)
    }
  }
}
