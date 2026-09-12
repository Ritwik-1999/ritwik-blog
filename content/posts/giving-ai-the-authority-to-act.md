---
title: "Giving AI the Authority to Act"
slug: "giving-ai-the-authority-to-act"
description: "When AI moves from making suggestions to taking action, the question becomes how much responsibility to give it—and where human judgment belongs."
date: "2026-09-10"
category: "Engineering"
topics: ["Agentic AI", "Production systems", "Human judgment"]
status: "published"
featured: false
openingQuestion: "When AI can act,\nwhat should we let it decide?"
openingDescription: "AI agents can move from suggesting an action to taking it. What should they be trusted to do—and when should a person step in?"
---

Imagine an online service slowing down during a busy afternoon. An AI assistant examines the symptoms and suggests restarting a component. A person considers the recommendation and decides what to do.

Now give that assistant access to the operational tools. It can investigate, choose a response, and carry it out. The distance between an idea and its consequences becomes much shorter.

That change is exciting. It also makes an old question newly urgent: when we delegate a task, what exactly are we delegating?

The ability to produce a sensible recommendation is one kind of capability. Permission to alter a system that other people depend on is a separate decision. A useful conversation about AI in production needs room for both.

## From answering to acting

Here, an AI agent means a system that can choose steps, use tools, and respond to what happens as it works toward a goal. The distinction is practical: a predefined workflow follows a route its designers laid out; an agent has some discretion over the route. Anthropic describes this distinction in its engineering guide, which also recommends starting with the simplest approach that meets the task. [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

In production—the systems serving real users—that discretion might involve deciding which logs to examine, preparing a configuration change, or taking an approved operational action. Those activities have very different consequences.

Calling a system “autonomous” tells us surprisingly little. Autonomous over which decisions? With access to whose information? For how long? What happens when the evidence is unclear?

These are questions about the shape of the job we have created.

## A familiar problem, with a different boundary

Consider a hypothetical agent helping investigate a slow checkout service. It finds that a queue is growing and that a recent deployment changed how work is processed.

Several responses are possible. It could gather more evidence. It could prepare a rollback proposal. It could increase processing capacity. It could disable a feature that appears to be contributing to the delay.

Each choice carries assumptions. More capacity may increase cost without removing the bottleneck. A rollback may conflict with a newer data format. Disabling a feature may improve response times while making checkout unusable for some customers.

The instruction “restore service” does not resolve these tradeoffs. The team still needs to decide which outcomes matter, which constraints must hold, and which uncertainties demand review.

This is why a polished demonstration can leave the central production question unanswered. We have seen what the agent can do under the demonstration’s conditions. We still need to define what it may do when conditions change.

## Give actions a scope

For this hypothetical service, a starting policy might look like this:

| Action | Example boundary |
| --- | --- |
| Inspect service health | Access only the relevant telemetry, with limits on sensitive data |
| Prepare a proposed change | Produce a reviewable change and supporting evidence; do not apply it |
| Perform an established recovery action | Use a narrowly authorized procedure with explicit preconditions and limits |
| Make an unfamiliar or high-impact change | Pause for a person to assess the proposal |

This is an illustrative policy, not a universal classification. Even reading data can be consequential if the data is sensitive or sent somewhere it should not go. A reversible-looking change can still interrupt a customer's work.

OWASP’s guidance on excessive agency recommends limiting tool functionality and permissions, requiring approval for high-impact actions, and enforcing authorization in downstream systems. The permission check belongs in the mechanism that performs the action; asking the model to remember a boundary is insufficient. [Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)

For our checkout example, the tool might permit a capacity increase only for one service and within a fixed ceiling. An agent's convincing explanation would not expand that ceiling.

## Make human review worth having

A request that says “Approve this fix?” leaves most of the work with the reviewer. They must reconstruct the incident, discover the proposed change, and decide whether the agent has missed anything.

A useful approval request would explain what will change, why it is expected to help, which evidence supports that expectation, what remains uncertain, and how the result will be checked. It would also state what happens if the change makes things worse.

The person should be approving a specific proposal. If that proposal changes materially, the earlier approval should not silently become permission for a different action.

There is a tradeoff here. Review introduces delay and consumes attention. Requiring it for every trivial step can turn oversight into a sequence of habitual clicks. My view is that review is most valuable where consequences or uncertainty justify that attention, with routine actions bounded by controls established in advance.

The design question is therefore quite concrete: what does the person need to see in order to make a meaningful decision?

## A successful action still needs verification

Suppose a tool times out after the agent requests a capacity increase. Did the operation fail, or did it succeed while the response was lost? Repeating the request without checking could create a second change.

This is a familiar distributed-systems problem. AWS describes how idempotent APIs let callers retry operations without causing repeated side effects, using request identifiers and carefully defined behavior. That property is worth considering wherever an agent can retry a consequential tool call. [Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)

Completion also needs evidence outside the agent's own account of its work. In our example, a successful tool response might confirm that the requested change was accepted. We would still need to check whether checkout improved and whether another part of the service deteriorated.

Google's guidance on canary releases describes evaluating a change on a limited portion of a system before expanding it. Applying that principle to agent-driven changes is a design choice: where the system supports it, limit initial exposure and observe the result before proceeding. A small rollout is useful only if the chosen signals can reveal the failures that matter. [Canarying Releases](https://sre.google/workbook/canarying-releases/)

## What would justify more responsibility?

I would want to see more than a collection of successful runs. I would want examples involving missing information, unavailable tools, conflicting signals, and a goal that cannot be achieved within the allowed scope.

Does the agent recognize when it has reached a boundary? Does it leave enough evidence for someone to understand what happened? Can the team interrupt its work and recover from a partial result?

Those questions change what we count as success. Stopping with a precise explanation may be the right outcome. Finishing a task by violating its constraints may be a failure, even if the visible symptom disappears.

The broader lesson reaches beyond AI. Delegation requires us to make expectations explicit. An agent can expose how much of an organization's operating knowledge still lives in unstated assumptions: who may decide, what counts as acceptable, and when someone must ask for help.

The opportunity is to use that pressure to design better systems of responsibility. Give an agent a useful scope. Make the boundary enforceable. Learn from what happens inside it before changing it.

Then the question becomes more interesting than whether we trust AI in the abstract: **what evidence would make us comfortable giving this system this particular decision?**
