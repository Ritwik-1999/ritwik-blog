import SelectedSystems from "../components/sections/SelectedSystems"
import OperationalScale from "../components/sections/OperationalScale"
import CurrentWork from "../components/sections/CurrentWork"
import Contact from "../components/sections/Contact"
import PostCard from "../components/blog/PostCard"


export default function Home({ posts = [] }) {
  const published = posts.filter(post => !post.status || post.status === "published")
  const featured = published.find(post => post.featured) || published[0]
  const recent = published.filter(post => post.path !== featured?.path).slice(0, 2)
  return <main id="main-content" tabIndex={-1} className="home-page">
    <section className="home-intro">
      <p className="eyebrow">Sai Ritwik Reddy · Cloud & platform engineering</p>
      <h1>Reliable systems.<br /><span className="text-crimson">Considered decisions.</span></h1>
      <p>I build infrastructure across AWS and Azure, and write about automation, reliability, and the ideas behind the work.</p>
      <div className="intro-links"><a className="read-link" href="/blog">Explore the blog →</a><a className="read-link" href="#systems">View my work ↓</a></div>
    </section>
    <section id="notes" className="latest-writing" aria-labelledby="latest-heading">
      <div className="section-heading"><h2 id="latest-heading">Latest writing</h2><a href="/blog">All articles →</a></div>
      <div className="writing-grid">{featured && <PostCard post={featured} featured />}<div className="recent-writing">{recent.map(post => <PostCard key={post.path} post={post} />)}</div></div>
    </section>
    <div className="portfolio-sections"><SelectedSystems /><OperationalScale /><CurrentWork /></div>
    <section id="about" className="about-section"><p className="eyebrow">About the author</p><h2>Engineering for operational calm.</h2><p>I’m Sai Ritwik Reddy. My work spans cloud infrastructure, platform engineering, and automation—building repeatable systems that reduce operational chaos.</p><p>Here I share engineering notes and reflections on the decisions that make systems easier to operate.</p><a className="read-link" href="/Sai_Ritwik_reddy_resume.pdf">View résumé ↗</a></section>
    <Contact />
  </main>
}
