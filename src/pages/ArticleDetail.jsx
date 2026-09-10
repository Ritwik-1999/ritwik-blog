import { Link, useParams } from "react-router-dom"
import { posts } from "../data/posts"
import NotFound from "./NotFound"

export default function ArticleDetail({ category }) {
  const { slug } = useParams()
  const post = posts.find(item => item.slug === slug && item.category === category)
  if (!post) return <NotFound />
  const headings = post.content.flatMap((block, index) => block.type === "heading" ? [{ text: block.text, id: `section-${index}` }] : [])
  return (
    <main id="main-content" className="article-page">
      <title>{post.title} · Ritwik Reddy</title>
      <meta name="description" content={post.description} />
      <Link className="read-link" to="/blog">← All writing</Link>
      <article>
        <header className="article-header">
          <p className="eyebrow">{post.category} / {post.tag}</p>
          <h1>{post.title}</h1>
          <p className="article-deck">{post.description}</p>
          <div className="article-byline"><span>Ritwik Reddy</span><span>{post.date}</span><span>{post.readTime}</span></div>
        </header>
        {post.status === "preview" && <p className="article-notice">This is a preview of a work in progress. The full article is coming soon.</p>}
        {headings.length > 0 && <nav className="article-contents" aria-label="In this post"><p>In this post</p>{headings.map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.text}</a>)}</nav>}
        <div className="article-body">
          {post.content.map((block, index) => {
            if (block.type === "heading") return <h2 id={`section-${index}`} key={index}>{block.text}</h2>
            if (block.type === "quote") return <blockquote key={index}>{block.text}</blockquote>
            if (block.type === "code") return <pre key={index}><code>{block.text}</code></pre>
            if (block.type === "list") return <ul key={index}>{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
            if (block.type === "link") return <p key={index}><a href={/^(https?:\/\/|\/[^/]|#)/.test(block.url) ? block.url : undefined}>{block.text}</a></p>
            return <p key={index}>{block.text}</p>
          })}
        </div>
      </article>
      <footer className="article-footer"><Link to="/blog">← Explore all writing</Link><Link to="/">About the author ↗</Link></footer>
    </main>
  )
}
