import { Link } from "react-router-dom"
import Container from "../layout/Container"
import Section from "../layout/Section"
import TelemetryLabel from "../ui/TelemetryLabel"
import { notes } from "../../data/notes"

export default function EngineeringNotes() {
  return (
    <Section id="notes">
      <Container>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <div className="space-y-8">
            <TelemetryLabel>ENGINEERING NOTES</TelemetryLabel>

            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none">
              Notes from the
              <span className="text-crimson"> operating layer.</span>
            </h2>

            <p className="text-mutedWhite max-w-xl leading-relaxed">
              Technical writing on infrastructure, automation, cloud reliability,
              and the hidden forces that shape production systems.
            </p>
          </div>

          <div className="space-y-4">
            {notes.map((note, index) => (
              <Link
                key={note.title}
                to={`/notes/${note.slug}`}
                className="
                  group relative block overflow-hidden
                  border border-white/10 bg-white/[0.025]
                  p-7 transition-all duration-700
                  hover:border-crimson/50 hover:bg-crimson/[0.035]
                "
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_left,rgba(193,18,31,0.16),transparent_58%)]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-xs tracking-[0.35em] text-crimson">
                      NOTE 0{index + 1}
                    </p>

                    <p className="text-xs uppercase tracking-[0.25em] text-mutedWhite">
                      {note.tag}
                    </p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-5">
                    {note.title}
                  </h3>

                  <p className="text-mutedWhite leading-relaxed">
                    {note.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}