import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { compileMarkdown, readPosts, pageData, validateLinks, jsonForHtml } from './content.mjs'
import { makeDocument } from './document.mjs'
import { rss, sitemap } from './publishing.mjs'

test('Markdown supports inline links, code, footnotes, captions and stable nested anchors', () => {
  const output = compileMarkdown('## Setup\n\nUse **care** and [docs](https://example.com).\n\n### Details\n\n## Setup\n\n```js\nconst value = "safe"\n```\n\n![An architecture diagram](/diagram.svg "Request flow")\n\nA claim.[^1]\n\n[^1]: A source.\n')
  assert.deepEqual(output.headings.map(h => h.id), ['heading-setup', 'heading-details', 'heading-setup-2'])
  assert.match(output.html, /hljs-keyword/)
  assert.match(output.html, /figure-caption/)
  assert.match(output.html, /footnote/)
  assert.match(output.html, /<strong>care<\/strong>/)
  assert.throws(() => compileMarkdown('# Second title'), /Use ##/)
  assert.throws(() => compileMarkdown('![](/image.png)'), /alt text/)
})
test('Markdown and embedded page data cannot introduce executable HTML', () => {
  const output = compileMarkdown('<script>alert(1)</script>\n\n[bad](javascript:alert(1))')
  assert.doesNotMatch(output.html, /<script>|href="javascript:/)
  assert.doesNotMatch(jsonForHtml({ title: '</script><script>alert(1)</script>' }), /</)
})
test('published archive, related posts and previews stay separated', () => {
  const posts = readPosts()
  validateLinks(posts)
  assert.deepEqual(pageData('/blog', posts).posts.map(p => p.slug), posts.filter(p => p.status === 'published').map(p => p.slug))
  assert(pageData('/blog/previews', posts).posts.every(p => p.status === 'preview'))
  assert(pageData('/blog/engineering', posts).posts.every(p => p.category === 'Engineering' && p.status === 'published'))
  assert.equal(pageData('/missing', posts).kind, 'notfound')
  const article = pageData('/reflections/invisible-systems', posts)
  assert(article.related.every(p => p.status === 'published' && p.path !== article.post.path))
  assert(pageData('/notes/manual-cloud-operations', posts).noindex)
  assert(pageData('/', posts).posts.every(p => !('html' in p)))
})
test('draft bodies are excluded and malformed dates and duplicate slugs block publication', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ritwik-content-test-'))
  const sample = fs.readFileSync('content/posts/terraform-drift.md', 'utf8')
  try {
    fs.writeFileSync(path.join(directory, 'draft.md'), sample.replace('status: "published"', 'status: "draft"').replace('featured: true', 'featured: false') + '\nPRIVATE_DRAFT_SENTINEL')
    assert.equal(readPosts(directory).length, 0)
    fs.writeFileSync(path.join(directory, 'draft.md'), sample.replace('2026-05', '2026-02-30'))
    assert.throws(() => readPosts(directory), /invalid date/)
    fs.writeFileSync(path.join(directory, 'draft.md'), sample)
    fs.writeFileSync(path.join(directory, 'duplicate.md'), sample)
    assert.throws(() => readPosts(directory), /duplicate slug/)
  } finally {
    for (const file of fs.readdirSync(directory)) fs.unlinkSync(path.join(directory, file))
    fs.rmdirSync(directory)
  }
})
test('broken internal paths and heading links fail validation', () => {
  const posts = readPosts()
  assert.throws(() => validateLinks([{ ...posts[0], links: ['/notes/does-not-exist'] }]), /broken internal link/)
  assert.throws(() => validateLinks([{ ...posts[0], links: ['#missing-section'] }]), /missing section/)
})
test('RSS and sitemap expose finished articles only and use the configured origin', () => {
  const posts = readPosts(), origin = 'https://example.com'
  const feed = rss(posts, origin), map = sitemap(posts, origin)
  assert.equal((feed.match(/<item>/g) || []).length, posts.filter(p => p.status === 'published').length)
  assert.match(feed, /https:\/\/example.com\/notes\/terraform-drift/)
  assert.doesNotMatch(feed + map, /manual-cloud-operations|platform-engineering-cognitive-load|blog\/previews/)
})
test('initial HTML contains article-specific canonical, social and structured metadata', () => {
  const data = pageData('/notes/terraform-drift', readPosts())
  const document = makeDocument('<!--page-head--><!--app-html--><!--page-data-->', '<main>Article body</main>', data, 'https://example.com')
  assert.match(document, /rel="canonical" href="https:\/\/example.com\/notes\/terraform-drift"/)
  assert.match(document, /og:title.*Terraform Drift/)
  assert.match(document, /BlogPosting/)
  assert.match(document, /<main>Article body<\/main>/)
  assert.doesNotMatch(document, /datePublished/)
})
