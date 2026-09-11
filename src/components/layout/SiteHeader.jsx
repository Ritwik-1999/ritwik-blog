import { useState } from 'react'
export default function SiteHeader({ pathname = '/' }) {
  const [announcement, setAnnouncement] = useState('')
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch { /* The current visit still works without storage. */ }
    setAnnouncement(`${next === 'light' ? 'Light' : 'Dark'} theme enabled`)
  }
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><div className="site-header-inner">
      <a className="site-brand" href="/">Ritwik<span> Reddy</span><span className="text-crimson" aria-hidden="true">.</span></a>
      <nav aria-label="Main navigation">
        <a href="/" aria-current={pathname === '/' ? 'page' : undefined}>Home</a>
        <a href="/blog" aria-current={pathname.startsWith('/blog') || pathname.startsWith('/notes/') || pathname.startsWith('/reflections/') ? 'page' : undefined}>Blog</a>
        <a href="/work" aria-current={pathname === '/work' ? 'page' : undefined}>Work</a><a href="/#contact">Contact</a>
      </nav>
      <button className="theme-toggle js-only" onClick={toggleTheme} aria-label="Switch between light and dark theme" title="Switch color theme"><span className="theme-light" aria-hidden="true">☀</span><span className="theme-dark" aria-hidden="true">☾</span><span className="theme-word">Theme</span></button>
      <span role="status" className="sr-only">{announcement}</span>
    </div></header>
  </>
}
