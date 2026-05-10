import Container from "../layout/Container"
import Section from "../layout/Section"
import TelemetryLabel from "../ui/TelemetryLabel"

const metrics = [
  {
    value: "700+",
    label: "Production servers provisioned",
    detail: "Terraform, Ansible, and repeatable deployment workflows.",
  },
  {
    value: "150M+",
    label: "Files secured and transferred",
    detail: "Validated movement through secure cloud transfer architecture.",
  },
  {
    value: "80%+",
    label: "Manual validation reduced",
    detail: "Governance checks converted into automated workflows.",
  },
  {
    value: "Multi-cloud",
    label: "AWS and Azure systems",
    detail: "Infrastructure, automation, monitoring, and platform operations.",
  },
]

export default function OperationalScale() {
  return (
    <Section id="scale" className="pt-12">
      <Container>
        <div className="border-y border-white/10 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14">
            <div className="space-y-6">
              <TelemetryLabel>OPERATIONAL SCALE</TelemetryLabel>

              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-none">
                Built in production,
                <br />
                measured by impact.
              </h2>
            </div>

            <p className="text-mutedWhite max-w-xl leading-relaxed">
              Cloud provisioning, automation workflows, secure transfer
              architecture, governance validation, and platform operations
              across enterprise environments.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="
                  group relative overflow-hidden
                  border border-white/10
                  bg-white/[0.025]
                  p-6 min-h-56
                  transition-all duration-700
                  hover:border-crimson/50
                  hover:bg-crimson/[0.035]
                "
              >
                <div
                  className="
                    absolute inset-0 opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-700
                    bg-[radial-gradient(circle_at_top_left,rgba(193,18,31,0.18),transparent_58%)]
                  "
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <p className="text-xs tracking-[0.35em] text-crimson">
                      0{index + 1}
                    </p>

                    <div className="h-px w-10 bg-white/10 group-hover:bg-crimson/60 transition-colors duration-700" />
                  </div>

                  <div>
                    <p className="text-4xl md:text-5xl font-semibold tracking-tight text-crimson leading-none mb-5">
                      {metric.value}
                    </p>

                    <p className="text-xs uppercase tracking-[0.22em] text-softWhite leading-relaxed mb-4">
                      {metric.label}
                    </p>

                    <p className="text-sm text-mutedWhite/70 leading-relaxed">
                      {metric.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}