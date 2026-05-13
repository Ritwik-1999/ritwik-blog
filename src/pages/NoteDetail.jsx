import { Link, useParams } from "react-router-dom"
import { notes } from "../data/notes"

export default function NoteDetail() {

  const { slug } = useParams()

  const note = notes.find(
    (item) => item.slug === slug
  )

  if (!note) {
    return (
      <main className="min-h-screen px-8 py-20">

        <div className="max-w-4xl mx-auto">

          <p className="text-crimson uppercase tracking-[0.35em] text-xs mb-8">
            Signal Lost
          </p>

          <h1 className="text-5xl font-semibold mb-8">
            Engineering note not found.
          </h1>

          <Link
            to="/"
            className="text-mutedWhite hover:text-crimson"
          >
            Return home
          </Link>

        </div>

      </main>
    )
  }

  return (
    <main className="relative min-h-screen px-4 sm:px-8 py-12 sm:py-20">

      {/* atmosphere */}

      <div
        className="
        pointer-events-none
        absolute inset-0 overflow-hidden
        opacity-[0.05]
        "
      >

        <div
          className="
          absolute top-0 left-1/2
          -translate-x-1/2
          w-[300px] h-[300px] sm:w-[900px] sm:h-[900px]
          rounded-full
          bg-crimson blur-[120px] sm:blur-[180px]
          "
        />

      </div>

      <article className="relative z-10 max-w-4xl mx-auto">

        {/* back */}

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

        {/* header */}

        <header className="mt-12 sm:mt-24 mb-12 sm:mb-24">

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-10">

            <p className="text-xs tracking-[0.35em] uppercase text-crimson">
              {note.tag}
            </p>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            <p className="text-xs tracking-[0.25em] uppercase text-mutedWhite">
              {note.readTime}
            </p>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            <p className="text-xs tracking-[0.25em] uppercase text-mutedWhite">
              {note.date}
            </p>

          </div>

          <h1
            className="
            text-4xl sm:text-5xl md:text-7xl
            font-semibold
            tracking-tight
            leading-[0.95]
            mb-10
            "
          >
            {note.title}
          </h1>

          <p
            className="
            text-xl md:text-2xl
            text-mutedWhite
            leading-relaxed
            max-w-3xl
            "
          >
            {note.description}
          </p>

        </header>

        {/* body */}

        <div className="space-y-12">

          {(note.content ?? []).map((block, index) => {

            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="
                  text-2xl md:text-4xl
                  font-semibold
                  tracking-tight
                  "
                >
                  {block.text}
                </h2>
              )
            }

            if (block.type === "quote") {
              return (
                <blockquote
                  key={index}
                  className="
                  border-l border-crimson
                  pl-4 sm:pl-8
                  text-lg sm:text-2xl
                  leading-relaxed
                  text-softWhite
                  italic
                  "
                >
                  {block.text}
                </blockquote>
              )
            }

            return (
              <p
                key={index}
                className="
                text-lg md:text-xl
                leading-[1.9]
                text-mutedWhite
                "
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