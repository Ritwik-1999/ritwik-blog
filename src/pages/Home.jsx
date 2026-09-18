import Contact from '../components/sections/Contact'
import NewspaperCard from '../components/blog/NewspaperCard'

export default function Home({ posts = [] }) {
  const published = posts.filter(post => !post.status || post.status === 'published')
  const featured = published.find(post => post.featured) || published[0]
  const recent = published.filter(post => post.path !== featured?.path)
    .sort((a, b) => Number(Boolean(b.homepage)) - Number(Boolean(a.homepage))).slice(0, 2)
  return <main id="main-content" tabIndex={-1} className="home-page editorial-home">
    <section className="editorial-opening" aria-labelledby="opening-question">
      <div><p className="edition-label">Essays & field notes · Ritwik Reddy</p><h1 id="opening-question">It works.<br /><em>But why?</em></h1></div>
      <div className="editorial-welcome"><p>I’m Ritwik Reddy, a cloud and platform engineer. I write about AI agents, reliable systems, and the decisions behind them.</p><p className="editorial-aside">A perfectly reasonable place to overthink.</p><a className="essay-link" href="/blog">Explore the writing <span aria-hidden="true">↗</span></a></div>
    </section>
    <section id="notes" className="latest-writing" aria-labelledby="latest-heading">
      <div className="section-heading"><h2 id="latest-heading">The reading room.</h2><a href="/blog">All articles ↗</a></div>
      <div className="newspaper-grid">{[featured, ...recent].filter(Boolean).map(post => <NewspaperCard key={post.path} post={post} lead={post.path === featured?.path} />)}</div>
    </section>
    <section id="about" className="engineering-brief" aria-labelledby="engineering-heading"><div id="systems"><p className="eyebrow">Behind the writing</p><h2 id="engineering-heading">Ideas meet production.</h2></div><div><p>My work spans cloud infrastructure, automation, and platform reliability across AWS and Azure. That practice shapes the questions I explore here.</p><div className="brief-links"><a className="read-link" href="/work">Explore my engineering work ↗</a><a className="read-link" href="/Sai_Ritwik_reddy_resume.pdf">View résumé ↗</a></div></div></section>
    <Contact />
  </main>
}
