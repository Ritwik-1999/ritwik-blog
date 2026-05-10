import Container from "../layout/Container"
import Section from "../layout/Section"
import TelemetryLabel from "../ui/TelemetryLabel"
import SystemCard from "../ui/SystemCard"
import { systems } from "../../data/systems"

export default function SelectedSystems() {
  return (
    <Section id="systems">
      <Container>
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-start">

          <div className="lg:sticky lg:top-24 space-y-8">
            <TelemetryLabel>SELECTED SYSTEMS</TelemetryLabel>

            <div>
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none">
                Systems built for
                <span className="text-crimson"> scale.</span>
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-mutedWhite max-w-xl">
                A collection of infrastructure, automation, and platform systems
                designed to reduce operational fragility and make complex
                environments more predictable.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {systems.map((system) => (
              <SystemCard
                key={system.index}
                index={system.index}
                title={system.title}
                philosophy={system.philosophy}
                description={system.description}
                stack={system.stack}
              />
            ))}
          </div>

        </div>
      </Container>
    </Section>
  )
}