import FollowWriting from '../components/blog/FollowWriting'
export default function Blog({ posts, category, previews, previewCount }) {
  const tabs = [['All articles', '/blog', !category && !previews], ['Engineering', '/blog/engineering', category === 'Engineering'], ['Reflections', '/blog/reflections', category === 'Reflections']]
  return <main id="main-content" tabIndex={-1} className="blog-page editorial-archive">
    <header className="archive-masthead"><div className="archive-imprint"><span>Ritwik Reddy · Independent writing</span><a href="/feed.xml">Follow via RSS ↗</a></div><h1>{previews ? 'The notebook.' : 'The reading room.'}</h1><p>{previews ? 'Early ideas and unfinished articles, shared as they develop.' : 'Essays on AI, engineering, and the assumptions worth examining.'}</p></header>
    <nav className="category-nav" aria-label="Writing categories">{tabs.map(([label, href, active]) => <a key={href} href={href} aria-current={active ? 'page' : undefined}>{label}</a>)}</nav>
    <div className="blog-list-heading"><h2>{previews ? 'Works in progress' : category || 'The collected articles'}</h2><span>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</span></div>
    <div className="archive-stories">{posts.map((post, index) => <article className={`archive-story${index === 0 && !previews ? ' archive-lead' : ''}`} key={post.path}>
      <div className="archive-story-heading"><div className="archive-story-meta"><span>{previews ? 'Preview' : index === 0 ? 'Latest in this edition' : post.category}</span><time dateTime={post.date}>{post.displayDate}</time></div><h2><a href={post.path}>{post.title}</a></h2><p className="archive-topics">{post.topics.join(' / ')}</p></div>
      <div className="archive-story-body"><p>{post.description}</p><a className="read-link" href={post.path}>Read {previews ? 'preview' : 'article'} <span aria-hidden="true">↗</span><span className="sr-only">: {post.title}</span><span className="read-time">{post.readTime}</span></a></div>
    </article>)}</div>
    {!posts.length && <p className="empty-writing">No articles in this section yet. <a href="/blog">Browse all writing.</a></p>}
    {!previews && previewCount > 0 && <p className="preview-link"><a href="/blog/previews">Inside the notebook: works in progress ({previewCount}) ↗</a></p>}
    <FollowWriting />
  </main>
}
