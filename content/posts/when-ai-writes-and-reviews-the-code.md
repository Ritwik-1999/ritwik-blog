---
title: "When AI Writes the Code, Who Understands It?"
slug: "when-ai-writes-and-reviews-the-code"
description: "AI can write and review a change while human understanding falls behind. A documentation agent could help preserve the knowledge teams need to operate their systems."
date: "2026-09-12"
category: "Engineering"
topics: ["AI-assisted development", "Documentation", "System ownership"]
status: "published"
featured: true
question: "If AI writes the code and AI reviews it, who understands the system?"
---

A developer describes a feature. An AI agent implements it, another reviews the changes, and automated checks report success. A person scans the summary and approves the merge. The work moves forward with very little human intervention.

There is real value in that workflow. Repetitive implementation and first-pass review can consume attention that engineers could spend elsewhere. But there is a question the green checks cannot answer: who now understands the behavior entering production?

A company can own its repositories and still struggle to explain its systems. My concern is that automating both creation and review can widen that gap when teams remove the moments in which people build understanding. The risk is gradual: changes accumulate faster than anyone develops a reliable mental model of them.

## Agreement is not understanding

AI review can catch mistakes. It can question an implementation, identify missing tests, and offer useful alternatives. GitHub describes Copilot code review as supplementing human review and emphasizes human oversight and validation across its agentic tools. [GitHub's responsible-use guidance](https://docs.github.com/en/copilot/responsible-use/agents)

The problem starts when an automated review becomes sufficient evidence for a decision it was never equipped to make. A reviewer may inspect the changed code without knowing that a seemingly redundant check protects an old integration, or that a retry changes the business meaning of an operation.

Using a different model may offer another perspective. It does not supply requirements that nobody documented. Two agents can work from the same incomplete context and produce mutually consistent answers. Their agreement is useful evidence, but it cannot establish that the team has explained the right problem.

Human reviewers have blind spots too. The aim is to preserve someone accountable for connecting implementation choices to the wider system.

## The understanding gap becomes an operational problem

Imagine a hypothetical order service where an agent adds retries after a supplier API times out. The tests pass. An automated review checks exception handling and sees a bounded retry loop. The change appears reasonable.

Later, some customers receive duplicate orders. The supplier sometimes accepted the original request even though its response never reached the service. Retrying created another order. A test built around the assumption that timeout means failure would not expose that distinction.

Now the team needs to answer practical questions. Where is the retry policy defined? Does the supplier support deduplication? Which version introduced the behavior? Can retries be disabled without losing legitimate orders?

Those questions require knowledge across code, external contracts, deployment configuration, and business expectations. A repository search can locate a function. It cannot, by itself, explain a decision whose rationale was never recorded.

The same gap appears outside incidents. A new engineer needs to trace a request through unfamiliar services. Someone fixing a bug needs to know which assumptions must survive the fix. If every explanation must be reconstructed from scratch, faster delivery can leave a growing maintenance burden behind it.

## Invest in an agent that maintains the explanation

One practical response is to invest in a documentation agent whose job is to keep the system understandable as it changes. Its output should be a maintained knowledge base with evidence, rather than a pile of generated descriptions.

I would begin with a small set of questions every service should answer:

- What does this service do, and who owns it?
- How do requests and data move through it?
- Which dependencies and failure modes matter?
- How is it deployed, observed, and recovered?
- Which design decisions are intentional, and why?

The agent could inspect approved repositories, infrastructure definitions, API contracts, tests, and existing decision records. From those sources, it could propose service summaries, dependency maps, runbooks, and onboarding guides.

Each important claim should link to its supporting source and identify the relevant version. “Retries are limited to three attempts” should point to the configuration or implementation. “This protects against duplicate orders” needs evidence of that behavior, not a confident interpretation of a function name.

## Make documentation part of the change

The useful integration point is the pull request: the proposed code change and its explanation can be reviewed together. The agent examines what changed, identifies affected documentation, and opens a documentation update alongside the implementation.

For the retry example, it should flag the operational contract: whether requests can be repeated safely, what happens after an ambiguous response, and how an operator can stop further attempts. If it cannot establish those facts, it should ask an explicit question.

After merge, documentation should identify the code revision it describes. Deployment records must then show whether that revision is actually running. The latest repository state and the live system are not necessarily the same thing, particularly during staged rollouts or emergency changes.

Periodic checks can flag stale links, missing owners, changed interfaces, and runbooks affected by new configuration. These checks create review work; they do not prove that every explanation is correct. Teams should record when critical instructions were last exercised, not merely when their wording was regenerated.

## Do not automate the same blind spot three times

There is an obvious objection: if AI writes, reviews, and documents the code, have we simply added another layer of plausible output?

We have, unless the documentation process introduces evidence and human learning. A generated explanation can accurately describe an incorrect implementation. It can also invent a sensible-sounding reason for a decision nobody actually made.

The agent therefore needs to distinguish observed behavior, human-recorded intent, and unresolved inference. An architectural decision record should capture the responsible engineer's rationale and rejected alternatives. The agent can organize that account, but it should not manufacture the history.

Its access should also match its purpose. Reading relevant code and proposing documentation changes does not require authority to modify production. Sensitive logs, credentials, and customer information should not be copied into broadly accessible guides. The knowledge base should preserve the access boundaries of its sources.

People still need to review consequential changes and explain their effects. Documentation gives them a better starting point; it does not transfer responsibility to the tool that wrote it.

## Test whether people can use it

During root cause analysis, a documentation agent could help assemble a timeline, locate relevant changes, and connect symptoms to documented dependencies. It should separate observations from hypotheses. A convincing causal story is not the same as a cause supported by evidence.

Google's SRE guidance treats a postmortem as a record of an incident, its impact, causes, response, and follow-up actions. A documentation agent could help preserve those findings once the team has investigated them. [Postmortem culture](https://sre.google/sre-book/postmortem-culture/)

The strongest evaluation is practical. Ask an engineer unfamiliar with a service to use its documentation to trace a request, identify its owner, and explain a safe recovery procedure. Run a controlled incident exercise. Check whether the guide helps them find evidence or sends them confidently in the wrong direction.

Measure time to find useful information, incorrect instructions, unanswered questions, and corrections made by maintainers. Page count and generated word count say little about understanding. Start with one service, learn where the agent helps, and expand only when the documentation earns trust in use.

## Keep someone who can explain the system

AI-assisted development does not inevitably leave companies unable to understand their code. That outcome depends on how teams organize review, learning, and ownership. Automation can also make explanations easier to produce and maintain.

The investment I would argue for is straightforward: when accelerating code production, fund the work of keeping that code understandable. A documentation agent is one way to reduce that burden, provided its claims remain traceable and people remain involved.

The question after a successful merge should extend beyond whether the checks passed: **can someone on this team explain what changed, why it matters, and what to do when it fails?**
