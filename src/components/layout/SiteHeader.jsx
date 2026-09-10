import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Moon, Sun } from "lucide-react"

export default function SiteHeader() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark")
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    try { localStorage.setItem("theme", next) } catch { /* Preference still works without storage. */ }
    setTheme(next)
  }
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="site-brand" to="/">Ritwik<span> Reddy</span><span className="text-crimson">.</span></Link>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>Portfolio</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}
