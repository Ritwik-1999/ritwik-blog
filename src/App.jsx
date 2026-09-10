import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NoteDetail from "./pages/NoteDetail"
import ReflectionDetail from "./pages/ReflectionDetail"
import NotFound from "./pages/NotFound"
import Blog from "./pages/Blog"
import SiteHeader from "./components/layout/SiteHeader"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/notes/:slug" element={<NoteDetail />} />
        <Route path="/reflections/:slug" element={<ReflectionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
