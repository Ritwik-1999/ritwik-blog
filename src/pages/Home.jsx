import SelectedSystems from "../components/sections/SelectedSystems"
import OperationalScale from "../components/sections/OperationalScale"
import CurrentWork from "../components/sections/CurrentWork"
import Contact from "../components/sections/Contact"
import PostCard from "../components/blog/PostCard"


export default function Home({ posts = [] }) {
  const published = posts.filter(post => !post.status || post.status === "published")
  const featured = published.find(post => post.featured) || published[0]
  const recent = published.filter(post => post.question && post.path !== featured?.path).slice(0, 2)
  return <main id="main-content" tabIndex={-1} className="home-page">
    <section className="curiosity-opening" aria-labelledby="opening-question">
      <div className="curiosity-masthead"><span>For the incurably curious.</span></div>
      <div className="curiosity-stage">
        <div className="curiosity-title"><p className="margin-note">A perfectly reasonable place to overthink.</p><h1 id="opening-question">It works.<br /><em>But why?</em></h1></div>
        <div className="curiosity-mark" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="giant-question">?</span><span className="mark-note">keep pulling<br />at the thread ↗</span></div>
      </div>
      <div className="curiosity-intro"><p className="curiosity-invitation">A home for people who<br />inspect the <span>“obvious.”</span></p><div><p>I’m Ritwik. I build cloud systems and ask more questions than strictly necessary. Here you’ll find essays on AI and technology, field notes from engineering, and reflections on how we think.</p><p className="curiosity-aside">Bring a little curiosity. Leave with a better question.</p><a className="essay-link" href="/blog">Find your next rabbit hole <span aria-hidden="true">↗</span><span className="sr-only"> — browse all writing</span></a></div></div>
    </section>
    {featured && <section className="desk-essay" aria-labelledby="desk-heading"><div className="desk-label"><span className="desk-number" aria-hidden="true">↳</span><p>Currently on the desk</p><span>{featured.readTime}</span></div><div><h2 id="desk-heading"><a href={featured.path}>{featured.openingQuestion || featured.title}</a></h2><p>{featured.description}</p><a className="read-link" href={featured.path}>Read: {featured.title} <span aria-hidden="true">→</span></a></div></section>}
    <section id="notes" className="latest-writing" aria-labelledby="latest-heading">
      <div className="section-heading"><h2 id="latest-heading">Follow another question.</h2><a href="/blog">All articles →</a></div>
      <div className="question-grid">{recent.map(post => <PostCard key={post.path} post={post} questionLead />)}</div>
    </section>
    <section id="about" className="about-section inquiry-about"><p className="eyebrow">A note from Ritwik</p><h2>Understanding is a work in progress.</h2><p>I write to understand the systems we build, the decisions we repeat, and the assumptions we stop noticing.</p><p>My work in cloud infrastructure and platform engineering gives these questions a place to meet practice. These essays and field notes are an invitation to look closer.</p><a className="read-link" href="/Sai_Ritwik_reddy_resume.pdf">View résumé ↗</a></section>
    <div className="portfolio-sections"><SelectedSystems /><OperationalScale /><CurrentWork /></div>
    <Contact />
  </main>
}
