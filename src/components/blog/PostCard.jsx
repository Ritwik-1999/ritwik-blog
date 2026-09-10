export default function PostCard({ post, featured = false }) {
  return <article className={featured ? "featured-post" : "writing-card"}>
    <p className="eyebrow">{featured ? "Featured essay" : post.category}</p>
    <h3><a href={post.path}>{post.title}</a></h3>
    <p>{post.description}</p>
    <div className="post-card-meta"><time dateTime={post.date}>{post.displayDate || post.date}</time><span>{post.readTime}</span></div>
    <a className="read-link" href={post.path}>Read article <span aria-hidden="true">→</span><span className="sr-only">: {post.title}</span></a>
  </article>
}
