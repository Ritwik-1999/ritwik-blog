import { escapeHtml, jsonForHtml } from './content.mjs'
export function makeDocument(template, markup, data, origin) {
  const url = origin ? `${origin}${data.pathname}` : null
  const head = [`<title>${escapeHtml(data.title)}</title>`, `<meta name="description" content="${escapeHtml(data.description)}">`, '<meta property="og:site_name" content="Ritwik Reddy">', `<meta property="og:title" content="${escapeHtml(data.title)}">`, `<meta property="og:description" content="${escapeHtml(data.description)}">`, `<meta property="og:type" content="${data.kind === 'article' ? 'article' : 'website'}">`, '<meta name="twitter:card" content="summary">', `<meta name="twitter:title" content="${escapeHtml(data.title)}">`, `<meta name="twitter:description" content="${escapeHtml(data.description)}">`]
  if (data.noindex) head.push('<meta name="robots" content="noindex,follow">')
  if (url) head.push(`<link rel="canonical" href="${escapeHtml(url)}">`, `<meta property="og:url" content="${escapeHtml(url)}">`)
  if (origin && data.kind === 'home') {
    const schema = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'Ritwik Reddy', alternateName: 'Sai Ritwik Reddy', inLanguage: 'en', author: { '@id': `${origin}/#person` } },
      { '@type': 'Person', '@id': `${origin}/#person`, name: 'Sai Ritwik Reddy', alternateName: 'Ritwik Reddy', url: `${origin}/#about`, jobTitle: 'Cloud and platform engineer', sameAs: ['https://www.linkedin.com/in/ritwik23/', 'https://github.com/Ritwik-1999'] },
    ] }
    head.push(`<script type="application/ld+json">${jsonForHtml(schema)}</script>`)
  }
  if (data.post && origin) {
    const post = data.post
    const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, mainEntityOfPage: url, author: { '@type': 'Person', name: 'Sai Ritwik Reddy', url: `${origin}/#about` }, ...(post.date.length === 10 ? { datePublished: post.date } : {}), ...(post.updated?.length === 10 ? { dateModified: post.updated } : {}) }
    if (post.image) { schema.image = `${origin}${post.image}`; head.push(`<meta property="og:image" content="${escapeHtml(schema.image)}">`, `<meta name="twitter:image" content="${escapeHtml(schema.image)}">`) }
    head.push(`<script type="application/ld+json">${jsonForHtml(schema)}</script>`)
  }
  return template.replace('<!--page-head-->', head.join('\n')).replace('<!--app-html-->', markup).replace('<!--page-data-->', `<script type="application/json" id="page-data">${jsonForHtml(data)}</script>`)
}
