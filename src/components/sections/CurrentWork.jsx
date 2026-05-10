import Container from "../layout/Container"
import Section from "../layout/Section"
import TelemetryLabel from "../ui/TelemetryLabel"
import { currentWork } from "../../data/currentWork"

export default function CurrentWork() {
  return (
    <Section id="current-work">
      <Container>
        <div className="border-y border-white/10 py-20">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-start">
            <div className="space-y-8">
              <TelemetryLabel>CURRENT WORK</TelemetryLabel>

              <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none">
                Active systems,
                <span className="text-crimson"> evolving ideas.</span>
              </h2>
            </div>

            <div className="space-y-4">
              {currentWork.map((item, index) => (
                <div
                  key={item.title}
                  className="
                    group relative overflow-hidden
                    border border-white/10 bg-white/[0.025]
                    p-7 transition-all duration-700
                    hover:border-crimson/50 hover:bg-crimson/[0.035]
                  "
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_left,rgba(193,18,31,0.16),transparent_58%)]" />

                  <div className="relative z-10">
                    <p className="text-xs tracking-[0.35em] text-crimson mb-6">
                      ACTIVE 0{index + 1}
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">
                      {item.title}
                    </h3>

                    <p className="text-mutedWhite leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}