export const notes = [
    {
    slug: "terraform-drift",

    title: "Terraform Drift and the Illusion of Stability",

    description:
        "Why infrastructure stops matching intent, how drift enters production systems, and how validation layers reduce surprise.",

    tag: "Infrastructure",

    readTime: "6 min read",

    date: "May 2026",

    content: [
        {
        type: "paragraph",
        text:
            "Infrastructure drift is rarely caused by a single catastrophic event. More often, it emerges slowly through manual interventions, emergency fixes, inconsistent provisioning paths, and undocumented operational decisions."
        },

        {
        type: "paragraph",
        text:
            "Terraform creates the illusion that infrastructure and intent remain perfectly synchronized. In reality, production systems continuously evolve under operational pressure."
        },

        {
        type: "heading",
        text:
            "Why Drift Becomes Dangerous"
        },

        {
        type: "paragraph",
        text:
            "The danger is not merely configuration mismatch. Drift weakens predictability. Once engineers stop trusting deployment state, operational confidence begins collapsing across the system."
        },

        {
        type: "quote",
        text:
            "The cheapest failure is the one detected before production behavior diverges."
        },

        {
        type: "paragraph",
        text:
            "Validation layers, governance automation, infrastructure audits, and repeatable deployment workflows become essential once environments scale beyond a few isolated systems."
        }
    ]
    },
  {
    slug: "platform-engineering-cognitive-load",
    title: "Platform Engineering Is Really About Cognitive Load",
    description:
      "Good platforms do not just automate tasks. They remove unnecessary decisions from engineers operating under pressure.",
    tag: "Platform",
    readTime: "7 min read",
  },
  {
    slug: "manual-cloud-operations",
    title: "The Hidden Cost of Manual Cloud Operations",
    description:
      "Manual checks feel safe until scale turns them into bottlenecks, inconsistencies, and silent operational risk.",
    tag: "Automation",
    readTime: "5 min read",
  },
]