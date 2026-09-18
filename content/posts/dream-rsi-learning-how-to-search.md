---
title: "What If an AI Agent Could Learn How to Search?"
slug: "dream-rsi-learning-how-to-search"
description: "Dream-RSI turns past experiments into a replayable training ground for better exploration. What the research proves, where it falls short, and why agent builders should pay attention."
date: "2026-09-18"
category: "Engineering"
topics: ["Agentic AI", "Recursive self-improvement", "Research"]
status: "published"
featured: false
question: "What if the next breakthrough comes from choosing better experiments?"
---

## Intro: the experiment after the experiment

An AI agent tries an idea. It fails. It tries another. Eventually, something works.

We celebrate the successful output. But the expensive part is often everything that happened before it: the branches pursued for too long, the promising failures abandoned too early, the experiments repeated because nobody improved the process choosing them.

What if those attempts could teach an agent how to spend its next thousand attempts?

That is the interesting question behind **Dream-RSI: Recursive Self-Improvement through Evolving Worlds**, a September 2026 research paper by Tong Zheng and colleagues. Its central proposal is to turn recorded discovery histories into environments where alternative exploration strategies can be tested cheaply. The system then deploys a better strategy, collects more experience, and repeats. [Read the paper, version 1](https://arxiv.org/abs/2609.14858v1).

The phrase *recursive self-improvement* invites enormous expectations. Here, its meaning is specific: the system revises the code that decides where to search. The underlying language models remain fixed.

That scope makes the research useful. It identifies a part of agent performance that engineers can isolate, measure, and improve: **how an agent allocates effort when the answer is not yet known.**

## Inside the research: learning how to explore

### A capable worker still needs a good strategy

Imagine a coding agent optimizing a slow program. It could refine the best implementation, try a different algorithm, investigate a failed experiment, or run several approaches in parallel. It also needs to decide when further work is unlikely to justify its cost.

Those decisions constitute an *exploration policy*. A strong model can still waste a large budget if that policy repeatedly chooses unproductive work.

Testing a new policy directly is expensive. An individual candidate can be evaluated by running it. A strategy must guide many candidates before its quality becomes apparent. Learning how to conduct experiments can therefore require another expensive layer of experimentation.

Dream-RSI attacks that feedback problem. It separates the agent generating solutions from the controller scheduling its attempts, then uses recorded experience to improve the controller.

### History becomes something you can run

During discovery, the system records attempts in a tree. Each attempt preserves its starting relationship to earlier work, the resulting artifact and workspace, evaluation feedback, and score.

A completed tree becomes a replay environment. A candidate policy initially sees only the root. As it chooses to open or extend branches, the simulator reveals the corresponding recorded outcomes. It can test different allocations of effort without asking the coding agent to regenerate those outcomes or rerunning the original evaluations.

For an illustrative example, suppose a recorded search contains three approaches. One improves quickly and then stalls. Another starts poorly but recovers after a repair. A third consumes many attempts without progress. Replay lets different scheduling policies encounter those observations in sequence and be scored on what they choose to pursue.

The policy cannot legitimately peek at future scores. Otherwise, it would be optimizing with hindsight unavailable during real execution. The paper's replay interface and supplied development prompt restrict decisions to revealed observations.

The distinction from ordinary memory matters. A summary might advise an agent to avoid an approach. Replay lets a controller test whether its decision rules would have allocated effort effectively across the recorded search.

### What actually improves

The loop has three stages:

1. **Explore:** the current policy schedules real generation and evaluation attempts.
2. **Replay:** completed discovery trees become reusable environments for evaluating alternative policies.
3. **Revise:** a policy-development agent edits the controller code using replay feedback; the best evaluated candidate is selected for the next online round.

The discovery model, evaluator, and execution interfaces stay fixed. The controller stays fixed within an online rollout and can change between rollouts. The new rollout expands the history available for the next improvement cycle.

In the main formulation, policy scoring balances the best discovered solution, the number of attempts used, and useful parallel execution. This makes efficiency part of the objective. A policy that reaches a good result by exhausting every branch should not automatically beat one that reaches it with substantially less work.

That design also exposes a human choice: what counts as improvement? The objective's trade-offs are specified by the system's designers. Recursive optimization does not remove the need to choose them carefully. [Method: paper sections 2–3](https://arxiv.org/pdf/2609.14858v1).

### The results worth paying attention to

The paper evaluates eight tasks across algorithm engineering, mathematical optimization, and GPU kernel engineering. Its most useful controlled comparison keeps the discovery setup and starting policy the same, while the baseline's exploration policy remains fixed.

For a Lasso solver, using Gemini-3.1 Pro, Dream-RSI uses **317 discovery-agent calls compared with 550** for fixed exploration. The resulting solver's average runtime across six held-out datasets falls from **3,587.1 ms to 2,931.0 ms**. That is roughly 42% fewer discovery calls and an 18% reduction in average solver runtime, calculated from the reported values.

There is a revealing detail beneath that average: the Dream-RSI solver is slower on five of those six datasets. Its large improvement on RCV1 drives the overall gain. A better average is meaningful, but it does not establish a uniformly better solution for every workload.

The GPU results show two different benefits. On VGG16, the method reaches comparable performance with 2.43 times fewer generations. On ConvDiv, it achieves 2.09 times the inverse-runtime performance under comparable discovery budgets. One result concerns the cost of finding a solution; the other concerns the quality of the solution found.

The mathematical results are mixed. Dream-RSI improves the sum–difference score and ties the strongest listed circle-packing result. For autocorrelation, where lower is better, its score of 1.456375 is slightly worse than fixed exploration's 1.456001. Adaptation helps in several settings, but the evidence does not support universal superiority. [Results: Figure 3, Table 1, and Figure 4](https://arxiv.org/pdf/2609.14858v1).

### Where the evidence stops

Replay only contains outcomes that were recorded. It cannot establish what an untried branch would have produced. Online generation is stochastic; replay reveals a particular historical result. A strategy that looks strong in that recorded world can still disappoint in a fresh run.

The paper's selection procedure guarantees that the chosen policy is no worse on the fixed history's average replay score, because the current policy is among the candidates. **That is a guarantee about replay selection, not a guarantee of continued improvement in the real task.**

Cost also needs careful reading. The experiments count discovery-agent calls. Those counts do not by themselves establish equivalent savings in total dollars, tokens, or elapsed time, including policy development. The headline comparison of up to 162 times fewer calls against SimpleTES also involves different model backbones. The same-model fixed-policy comparison gives a cleaner view of the controller's contribution.

My interpretation is that Dream-RSI demonstrates a promising method for improving exploration in these evaluated discovery settings. It does not demonstrate unlimited self-improvement, general workplace autonomy, or an agent that can rewrite every part of itself successfully.

## What this could change for AI agents

The possibilities below are extrapolations from the research, rather than outcomes demonstrated by its experiments.

### Agent infrastructure becomes a place to learn

Agent builders routinely choose retry limits, branching rules, concurrency, and stopping conditions. Dream-RSI suggests that some of those choices could become policies improved through evidence from previous runs.

For a future code-optimization service, the valuable question might be whether a modest gain deserves another refinement, whether a failed implementation deserves repair, or whether an entirely different approach deserves the remaining budget.

If replay transfers reliably to fresh workloads, improvements could come from better orchestration even when the underlying model stays the same. That would give teams another way to improve performance between model upgrades.

### Operational history gains a second purpose

Logs help explain what happened. Structured discovery traces can additionally support experiments about how work should have been scheduled.

That possibility raises the value of recording relationships between attempts, exact artifact versions, evaluation results, and failures. A final answer and a transcript may be insufficient to reconstruct a useful replay environment.

It also connects to a concern I raised in [When AI Writes the Code, Who Understands It?](/notes/when-ai-writes-and-reviews-the-code): faster automated work needs a durable explanation. A system changing its own controller should preserve which version acted, what evidence justified the revision, and whether fresh evaluations confirmed the expected benefit.

### Better evaluation becomes more valuable

The evaluated tasks provide comparatively clear feedback: mathematical objectives, numerical checks, and execution performance. Many production tasks have incomplete success criteria and delayed consequences.

A support agent might resolve a ticket quickly while misunderstanding the customer. An infrastructure agent might reduce deployment time while making recovery harder. Optimizing exploration cannot rescue an objective that rewards the wrong outcome.

I would therefore start applying this idea in bounded environments with reproducible evaluations. Candidate controllers should face fresh cases outside the replay history, and their total operating cost should be measured. Deployment would need versioning and rollback so an apparently better controller does not become an irreversible decision.

### A growing history can also preserve a blind spot

The most interesting unresolved question is whether the replay collection becomes more representative as it grows.

A policy determines which experiences get collected. Those experiences shape its successor. That creates a useful feedback loop, but also a possible bias: repeatedly searching familiar territory can produce a rich history of a narrow world.

Testing on unfamiliar tasks and preserving opportunities for fresh exploration would help distinguish learning a useful strategy from becoming increasingly skilled at navigating yesterday's experiments.

Dream-RSI makes a concrete contribution to the agent landscape: it shows how expensive discovery experience can be reused to improve the decisions governing future discovery. The opportunity is substantial wherever experiments are costly and outcomes can be evaluated reliably.

The question I would carry into the next generation of agent systems is this: **after a thousand attempts, has the agent only produced a better answer, or has it learned to spend the next thousand more wisely?**

*Research basis: Tong Zheng et al., Dream-RSI: Recursive Self-Improvement through Evolving Worlds, arXiv:2609.14858v1, submitted September 14, 2026. This article analyzes the supplied version; proposed production applications are the author's interpretation.*
