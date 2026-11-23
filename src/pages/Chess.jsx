const backRank = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']

function Chessboard() {
  return <figure className="chess-board-figure">
    <div className="chess-board" role="img" aria-label="A wooden chessboard in the starting position, with White at the bottom">
      {Array.from({ length: 64 }, (_, index) => {
        const rank = Math.floor(index / 8), file = index % 8
        const piece = rank === 0 || rank === 7 ? backRank[file] : rank === 1 || rank === 6 ? '♟' : ''
        return <span aria-hidden="true" key={index} className={`chess-square ${(rank + file) % 2 ? 'wood-dark' : 'wood-light'} ${rank > 5 ? 'white-piece' : 'black-piece'}`}>{piece}</span>
      })}
    </div>
    <figcaption>Sixty-four squares. A world of possibilities.</figcaption>
  </figure>
}

export default function Chess({ posts = [] }) {
  return <main id="main-content" tabIndex={-1} className="chess-page">
    <aside className="chess-rail">
      <a className="chess-back" href="/blog">The reading room</a>
      <div><p className="chess-label">Ritwik Reddy / Chess</p><h1>Beyond <br />the board.</h1><p>The moves. The minds.<br />The moments that matter.</p></div>
      <nav aria-label="Chess page"><a href="#chess-writing">The writing</a><a href="/feed.xml">Follow via RSS</a></nav>
    </aside>
    <div className="chess-main">
      <section className="chess-opening" aria-labelledby="chess-intro">
        <div className="chess-opening-copy"><p className="chess-label">A different kind of thinking</p><h2 id="chess-intro">Every move<br />asks a question.</h2><p>Notes on chess news, world championships, and the ideas that make us look at the board again.</p></div>
        <Chessboard />
      </section>
      <section id="chess-writing" className="chess-writing" aria-labelledby="chess-writing-heading">
        <div className="chess-writing-heading"><h2 id="chess-writing-heading">From the chess desk</h2><span>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</span></div>
        {posts.length ? <div className="chess-posts">{posts.map(post => <article key={post.path}><p className="chess-label"><time dateTime={post.date}>{post.displayDate}</time> · {post.readTime}</p><h3><a href={post.path}>{post.title}</a></h3><p>{post.description}</p><a className="chess-read" href={post.path}>Read article<span className="sr-only">: {post.title}</span></a></article>)}</div> : <div className="chess-empty"><p className="chess-label">The opening is still taking shape</p><h3>The first move is coming.</h3><p>This is where my chess writing will live. News, championship stories, and a closer look at the game—one article at a time.</p><a className="chess-read" href="/blog">Explore my other writing</a></div>}
      </section>
    </div>
  </main>
}
