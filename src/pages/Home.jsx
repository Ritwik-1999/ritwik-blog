import SelectedSystems from "../components/sections/SelectedSystems"
import OperationalScale from "../components/sections/OperationalScale"
import CurrentWork from "../components/sections/CurrentWork"
import Contact from "../components/sections/Contact"
import NewspaperCard from "../components/blog/NewspaperCard"
import QuestionWorkshop from "../components/ui/QuestionWorkshop"


export default function Home({ posts = [] }) {
  const published = posts.filter(post => !post.status || post.status === "published")
  const featured = published.find(post => post.featured) || published[0]
  const recent = published.filter(post => post.question && post.path !== featured?.path).slice(0, 2)
  return <main id="main-content" tabIndex={-1} className="home-page">
    <section className="curiosity-opening" aria-labelledby="opening-question">
      <div className="curiosity-masthead"><span>For the incurably curious.</span></div>
      <div className="curiosity-stage">
        <div className="curiosity-title"><p className="margin-note">A perfectly reasonable place to overthink.</p><h1 id="opening-question">It works.<br /><em>But why?</em></h1></div>
        <QuestionWorkshop />
      </div>
      <div className="curiosity-intro"><p className="curiosity-invitation">A home for people who<br />inspect the <span>“obvious.”</span></p><div><p>I’m Ritwik. I build cloud systems and ask more questions than strictly necessary. Here you’ll find essays on AI and technology, field notes from engineering, and reflections on how we think.</p><p className="curiosity-aside">Bring a little curiosity. Leave with a better question.</p><a className="essay-link" href="/blog">Find your next rabbit hole <span aria-hidden="true">↗</span><span className="sr-only"> — browse all writing</span></a></div></div>
    </section>
    <section id="notes" className="latest-writing" aria-labelledby="latest-heading">
      <div className="section-heading"><div><p className="edition-label">Essays / engineering / reflections</p><h2 id="latest-heading">The reading room.</h2></div><a href="/blog">All articles ↗</a></div>
      <div className="newspaper-grid">{[featured, ...recent].filter(Boolean).map(post => <NewspaperCard key={post.path} post={post} lead={post.path === featured?.path} />)}</div>
    </section>
    <section id="about" className="about-section inquiry-about"><p className="eyebrow">A note from Ritwik</p><h2>Understanding is a work in progress.</h2><p>I write to understand the systems we build, the decisions we repeat, and the assumptions we stop noticing.</p><p>My work in cloud infrastructure and platform engineering gives these questions a place to meet practice. These essays and field notes are an invitation to look closer.</p><a className="read-link" href="/Sai_Ritwik_reddy_resume.pdf">View résumé ↗</a></section>
    <div className="portfolio-sections"><SelectedSystems /><OperationalScale /><CurrentWork /></div>
    <Contact />
  </main>
}
