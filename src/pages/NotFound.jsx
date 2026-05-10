import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="min-h-screen px-8 py-20 flex items-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-crimson uppercase tracking-[0.35em] text-xs mb-8">
          404
        </p>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none mb-8">
          Signal lost.
        </h1>

        <Link
          to="/"
          className="text-sm uppercase tracking-[0.25em] text-mutedWhite hover:text-crimson transition-colors"
        >
          Return home
        </Link>
      </div>
    </main>
  )
}