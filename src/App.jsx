import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NoteDetail from "./pages/NoteDetail"
import ReflectionDetail from "./pages/ReflectionDetail"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:slug" element={<NoteDetail />} />
        <Route path="/reflections/:slug" element={<ReflectionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}