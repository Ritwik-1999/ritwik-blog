import { Link, useParams } from "react-router-dom"
import { reflections } from "../data/reflections"

export default function ReflectionDetail() {
  const { slug } = useParams()
  const reflection = reflections.find((item) => item.slug === slug)

  if (!reflection) {
    return (
      <main className="min-h-screen px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-crimson uppercase tracking-[0.35em] text-xs mb-8">
            Signal Lost
          </p>

          <h1 className="text-5xl font-semibold mb-8">
            Reflection not found.
          </h1>

          <Link to="/" className="text-mutedWhite hover:text-crimson">
            Return home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen px-8 py-20">
      <article className="relative z-10 max-w-4xl mx-auto">
        <Link
          to="/"
          className="
            text-xs uppercase tracking-[0.3em]
            text-mutedWhite
            hover:text-crimson
            transition-colors
          "
        >
          ← Return Home
        </Link>

        <header className="mt-24 mb-24">
          <div className="flex items-center gap-6 mb-10">
            <p className="text-xs tracking-[0.35em] uppercase text-crimson">
              {reflection.tag}
            </p>

            <div className="w-px h-4 bg-white/10" />

            <p className="text-xs tracking-[0.25em] uppercase text-mutedWhite">
              {reflection.readTime}
            </p>

            <div className="w-px h-4 bg-white/10" />

            <p className="text-xs tracking-[0.25em] uppercase text-mutedWhite">
              {reflection.date}
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95] mb-10">
            {reflection.title}
          </h1>

          <p className="text-xl md:text-2xl text-mutedWhite leading-relaxed max-w-3xl">
            {reflection.text}
          </p>
        </header>

        <div className="space-y-12">
          {reflection.content.map((block, index) => {
            if (block.type === "quote") {
              return (
                <blockquote
                  key={index}
                  className="
                    border-l border-crimson
                    pl-8 text-2xl leading-relaxed
                    text-softWhite italic
                  "
                >
                  {block.text}
                </blockquote>
              )
            }

            return (
              <p
                key={index}
                className="text-lg md:text-xl leading-[1.9] text-mutedWhite"
              >
                {block.text}
              </p>
            )
          })}
        </div>
      </article>
    </main>
  )
}