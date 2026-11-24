import OpeningBoard from '../components/chess/OpeningBoard'

export default function Chess({ posts = [] }) {
  return <main id="main-content" tabIndex={-1} className="chess-page">
    <aside className="chess-rail">
      <a className="chess-back" href="/blog">The reading room</a>
      <div className="chess-rail-intro"><img className="chess-rail-art" src="/images/chess-editorial-v3.webp" alt="A crimson hand suspending a pawn above a sweeping sculptural knight and slender queen" width="720" height="720" decoding="async" /><p className="chess-label">Ritwik Reddy / Chess</p><h1>Beyond <br />the board.</h1><p>The moves. The minds.<br />The moments that matter.</p></div>
      <nav aria-label="Chess page"><a href="#chess-writing">The writing</a><a href="/feed.xml">Follow via RSS</a></nav>
    </aside>
    <div className="chess-main">
      <section id="chess-writing" className="chess-writing" aria-labelledby="chess-writing-heading">
        <div className="chess-writing-heading"><h2 id="chess-writing-heading">From the chess desk</h2><span>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</span></div>
        {posts.length ? <div className="chess-posts">{posts.map(post => <article key={post.path}><p className="chess-label">{post.sample ? "Sample · " : ""}<time dateTime={post.date}>{post.displayDate}</time> · {post.readTime}</p><h3><a href={post.path}>{post.title}</a></h3><p>{post.description}</p></article>)}</div> : <div className="chess-empty"><p className="chess-label">The opening is still taking shape</p><h3>The first move is coming.</h3><p>Chess news, championship stories, and ideas from the board.</p><a className="chess-read" href="/blog">Explore my other writing</a></div>}
      </section>
      <section className="chess-opening" aria-labelledby="chess-intro">
        <div className="chess-opening-copy"><p className="chess-label">A different kind of thinking</p><h2 id="chess-intro">Explore an opening.</h2><p>Play a familiar opening to find its story.</p></div>
        <OpeningBoard posts={posts} />
      </section>
    </div>
  </main>
}
