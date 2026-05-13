import { Link } from "react-router-dom"
import Container from "../layout/Container"
import Section from "../layout/Section"
import TelemetryLabel from "../ui/TelemetryLabel"
import { reflections } from "../../data/reflections"

export default function Reflections() {
  return (
    <Section id="reflections">
      <Container>
        <div className="max-w-5xl">
          <div className="space-y-8 mb-10 sm:mb-20">
            <TelemetryLabel>REFLECTIONS</TelemetryLabel>

            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none">
              Thought beyond
              <span className="text-crimson"> implementation.</span>
            </h2>

            <p className="text-mutedWhite leading-relaxed max-w-2xl">
              Essays and observations on systems, discipline, creativity,
              and the invisible forces behind reliable engineering.
            </p>
          </div>

          <div className="space-y-10">
            {reflections.map((item, index) => (
              <Link
                key={item.slug}
                to={`/reflections/${item.slug}`}
                className="
                  group block border-l border-white/10
                  pl-4 sm:pl-8 relative
                "
              >
                <div
                  className="
                    absolute left-0 top-0
                    h-full w-px
                    bg-transparent
                    group-hover:bg-crimson
                    transition-colors duration-700
                  "
                />

                <p className="text-xs tracking-[0.35em] text-crimson mb-5">
                  REFLECTION 0{index + 1}
                </p>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
                  <h3 className="text-2xl md:text-4xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-xs uppercase tracking-[0.25em] text-mutedWhite">
                    {item.tag} / {item.readTime}
                  </p>
                </div>

                <p className="text-mutedWhite text-lg leading-relaxed max-w-3xl">
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}