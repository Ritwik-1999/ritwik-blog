import { Link } from "react-router-dom"
import { posts } from "../data/posts"

export default function Blog() {
  return (
    <main id="main-content" className="blog-page">
      <title>Blog · Ritwik Reddy</title>
      <meta name="description" content="Engineering notes and reflections by Ritwik Reddy on cloud infrastructure, automation, and reliable systems." />
      <header className="blog-intro">
        <p className="eyebrow">Notes & reflections</p>
        <h1>Writing on systems.<br /><span className="text-mutedWhite">And what shapes them.</span></h1>
        <p>Engineering notes on infrastructure, automation, and reliability. Reflections on the ideas behind the work.</p>
      </header>
      <div className="blog-list-heading"><h2>All writing</h2><span>{posts.length} posts</span></div>
      <div className="post-list">
        {posts.map(post => (
          <article className="post-row" key={post.path}>
            <div className="post-meta"><span>{post.category}</span><span>{post.date}</span></div>
            <div>
              <div className="post-labels"><span>{post.tag}</span>{post.status === "preview" && <span className="preview-badge">Preview · in progress</span>}</div>
              <h2><Link to={post.path}>{post.title}</Link></h2>
              <p>{post.description}</p>
              <Link className="read-link" to={post.path}>Read {post.status === "preview" ? "preview" : "post"} <span aria-hidden="true">↗</span><span className="read-time">{post.readTime}</span></Link>
            </div>
          </article>
        ))}
      </div>
      <footer className="blog-footer">By Ritwik Reddy <span>Cloud infrastructure & platform engineering</span></footer>
    </main>
  )
}
