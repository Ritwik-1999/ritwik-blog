import FollowWriting from '../components/blog/FollowWriting'
export default function Blog({ posts, category, previews, previewCount }) {
  const tabs = [['All articles', '/blog', !category && !previews], ['Engineering', '/blog/engineering', category === 'Engineering'], ['Reflections', '/blog/reflections', category === 'Reflections']]
  return <main id="main-content" tabIndex={-1} className="blog-page">
    <header className="blog-intro"><p className="eyebrow">Notes & reflections</p><h1>{previews ? 'Works in progress.' : 'Writing on systems.'}</h1><p>{previews ? 'Early ideas and unfinished articles. These previews will evolve as the work develops.' : 'Infrastructure, automation, and the decisions that make systems more reliable.'}</p></header>
    <nav className="category-nav" aria-label="Writing categories">{tabs.map(([label, href, active]) => <a key={href} href={href} aria-current={active ? 'page' : undefined}>{label}</a>)}</nav>
    <div className="blog-list-heading"><h2>{previews ? 'Previews' : category || 'All articles'}</h2><span>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span></div>
    <div className="post-list">{posts.map(post => <article className="post-row" key={post.path}>
      <div className="post-meta"><span>{post.category}</span><time dateTime={post.date}>{post.displayDate}</time></div>
      <div><div className="post-labels"><span>{post.topics.join(' · ')}</span>{previews && <span>Preview</span>}</div><h2><a href={post.path}>{post.title}</a></h2><p>{post.description}</p><a className="read-link" href={post.path}>Read {previews ? 'preview' : 'article'} <span aria-hidden="true">→</span><span className="sr-only">: {post.title}</span><span className="read-time">{post.readTime}</span></a></div>
    </article>)}</div>
    {!posts.length && <p className="empty-writing">No articles in this section yet. <a href="/blog">Browse all writing.</a></p>}
    {!previews && previewCount > 0 && <p className="preview-link"><a href="/blog/previews">Explore works in progress ({previewCount}) →</a></p>}
    <FollowWriting />
  </main>
}
