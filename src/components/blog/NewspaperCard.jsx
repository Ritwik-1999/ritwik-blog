export default function NewspaperCard({ post, lead = false }) {
  return <article className="newspaper-card">
    <div className="newspaper-masthead">{lead ? 'The featured essay' : post.category === 'Engineering' ? 'Engineering notes' : 'Reflections'}</div>
    <div className="newspaper-edition"><span>{post.category}</span><time dateTime={post.date}>{post.displayDate || post.date}</time></div>
    <h3><a href={post.path}>{post.title}</a></h3>
    {post.question || post.openingQuestion ? <p className="newspaper-deck">{post.question || post.openingQuestion}</p> : null}
    <p className="newspaper-excerpt">{post.description}</p>
    <div className="newspaper-byline">By Ritwik Reddy <span>{post.readTime}</span></div>
    <a className="newspaper-read" href={post.path}>Continue reading <span aria-hidden="true">↗</span><span className="sr-only">: {post.title}</span></a>
  </article>
}
