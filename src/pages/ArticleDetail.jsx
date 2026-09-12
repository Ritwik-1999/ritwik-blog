import { useState } from 'react'
import FollowWriting from '../components/blog/FollowWriting'
import PostCard from '../components/blog/PostCard'
import { trackEvent } from '../lib/analytics'
export default function ArticleDetail({ post, related = [], url }) {
  const [copyStatus, setCopyStatus] = useState('')
  const [fallback, setFallback] = useState(false)
  async function copyLink() {
    try { await navigator.clipboard.writeText(url || `${location.origin}${post.path}`); setCopyStatus('Link copied.'); setFallback(false); trackEvent('article_share') }
    catch { setCopyStatus('Select and copy the link below.'); setFallback(true) }
  }
  const showContents = post.headings.length >= 3
  return <main id="main-content" tabIndex={-1} className="article-page">
    <a className="read-link" href="/blog">← All writing</a>
    <article><header className="article-header"><p className="eyebrow">{post.category} / {post.topics.join(' · ')}</p><h1>{post.title}</h1><p className="article-deck">{post.description}</p><div className="article-byline"><a href="/#about">Ritwik Reddy</a><time dateTime={post.date}>{post.displayDate}</time><span>{post.readTime}</span>{post.updated && <span>Updated <time dateTime={post.updated}>{post.updated}</time></span>}</div></header>
      {post.status === 'preview' && <p className="article-notice">This is a work in progress. The full article is coming soon.</p>}
      {showContents && <details className="article-contents"><summary>In this article</summary><nav aria-label="Article sections">{post.headings.map(h => <a key={h.id} className={h.level > 2 ? 'nested-heading' : undefined} href={`#${h.id}`}>{h.text}</a>)}</nav></details>}
      <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
    <div className="article-sharing"><button className="copy-link js-only" onClick={copyLink}>Copy article link</button><a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url || post.path)}`}>Share by email</a><span role="status">{copyStatus}</span>{fallback && <label className="copy-fallback">Article URL<input readOnly value={url || `${location.origin}${post.path}`} onFocus={event => event.target.select()} /></label>}</div>
    <aside className="author-card" aria-labelledby="author-heading"><p className="eyebrow">Written by</p><h2 id="author-heading">Sai Ritwik Reddy</h2><p>Cloud infrastructure and platform engineer working across AWS, Azure, and automation. I write about reliable systems and the thinking behind them.</p><div><a href="/#about">About my work →</a><a href={`mailto:ritwikreddy615@gmail.com?subject=${encodeURIComponent(`About: ${post.title}`)}`}>Discuss this article ↗</a></div></aside>
    {related.length > 0 && <section className="related-writing" aria-labelledby="related-heading"><h2 id="related-heading">Continue reading</h2>{related.map(item => <PostCard key={item.path} post={item} />)}</section>}
    <FollowWriting />
  </main>
}
