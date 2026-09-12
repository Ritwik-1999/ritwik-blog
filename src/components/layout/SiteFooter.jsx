import AnalyticsConsent from './AnalyticsConsent'
export default function SiteFooter() {
  return <footer className="site-footer"><div><a className="site-brand" href="/">Ritwik Reddy<span className="text-crimson">.</span></a><p>Cloud infrastructure. Thoughtful engineering.</p></div><nav aria-label="Footer navigation"><a href="/blog">All writing</a><a href="/feed.xml">RSS feed</a><a href="https://www.linkedin.com/in/ritwik23/">LinkedIn</a><a href="mailto:ritwikreddy615@gmail.com">Email</a></nav><AnalyticsConsent /></footer>
}
