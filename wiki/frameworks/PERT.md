---
type: atom
title: PERT
aliases: [Program Evaluation and Review Technique, PERT Chart, Three-Point Estimation]
category: framework
applicable_to: [defense, aerospace, construction, engineering, R&D, IT, complex_projects]
key_metrics: [expected_time, critical_path_length, probability_of_on_time_completion, standard_deviation_of_duration]
related:
  - "see_also: Critical Path Method"
  - "see_also: Waterfall Methodology"
  - "complements: PRINCE2"
sources: [_Sources/Project_Management_Frameworks-yca3ot]
source_pages: "38-46"
tags: [project_management, scheduling, traditional, planning, framework, probabilistic, risk]
created: 2026-06-16
---

# PERT

## Definition

Program Evaluation and Review Technique (PERT) is a probabilistic project scheduling methodology developed by the US Navy and Booz Allen Hamilton in the late 1950s for large, uncertain projects — originally Polaris missile development. Where CPM uses single-point duration estimates, PERT uses three: Optimistic (O), Most Likely (M), and Pessimistic (P), combined via the weighted formula **Expected Time (TE) = (O + 4M + P) / 6**. Pereira notes the method assumes durations follow a beta distribution, which lets project managers calculate not just expected completion time but the probability of meeting deadlines. PERT trades CPM's simplicity for explicit handling of uncertainty.

## Key attributes

- **Three-point estimation** — Optimistic, Most Likely, Pessimistic durations per activity
- **Weighted expected time formula** — TE = (O + 4M + P) / 6, with M weighted 4× more than the extremes
- **Beta-distribution assumption** — enables probability-of-completion calculations
- **Network-diagram representation** — event nodes (milestones) connected by activity arrows
- **Probabilistic critical path** — identifies the longest path of expected times, with standard deviation
- **Designed for high-uncertainty contexts** — defense, aerospace, R&D where activity times are genuinely unknown
- **Statistical-literacy requirement** — managers must interpret distributions, standard deviations, confidence intervals

## When to use

- Large, complex projects where activity durations are genuinely uncertain
- R&D, aerospace, defense, novel engineering — projects without strong historical baselines
- When stakeholders need to know the probability (not just the expectation) of hitting a date
- When risk-adjusted scheduling matters more than tightest possible schedule
- Combined with CPM when both deterministic critical-path identification and uncertainty quantification are needed

## When NOT to use

- Small or routine projects where the estimation overhead exceeds the value
- Projects with reliable historical duration data — CPM is simpler and sufficient
- Teams without statistical literacy to interpret the outputs
- Iterative software contexts where the project structure changes faster than the network
- When false precision from probabilistic outputs would mislead stakeholders

## Common pitfalls

- Optimistic estimates that are actually wishful thinking, biasing TE downward
- Treating the beta distribution as universally valid; Pereira flags this as a key assumption risk
- Mistaking probabilistic outputs for guarantees — "80% probability" still means 20% slip
- Demanding O/M/P estimates from people who can't meaningfully distinguish them
- Complex calculations and data management overhead growing faster than project benefit
- Failing to update estimates as the project learns

## Key metrics

- **Expected Time (TE)** per activity — weighted three-point estimate
- **Critical path length** — sum of TEs along the critical path
- **Probability of completion by date X** — derived from the path's standard deviation
- **Standard deviation per activity** — (P − O) / 6
- **Variance of critical path** — sum of activity variances along the path
- **Estimate accuracy** — actual durations vs. TE, tracked retrospectively to recalibrate

## Decision questions

- Are our duration estimates uncertain enough to justify PERT's overhead, or will CPM do?
- Who is qualified to give Optimistic / Most Likely / Pessimistic estimates without confusing them?
- Do our stakeholders understand probabilistic outputs, or will "80% likely" be misread as "definitely"?
- Is the project structure stable enough that the PERT network won't be obsolete next month?
- What's the cost of being wrong about the critical path's variance?

## Canonical examples

- US Navy Polaris missile program — PERT's origin context (page 38)
- Aerospace projects — Pereira cites this as a heartland use case (page 38)
- Large construction with novel design elements
- Pharmaceutical R&D and drug development pipelines
- Major IT infrastructure builds with novel technology stacks

## Related concepts

- [[Critical Path Method]] — _see_also_ (deterministic sibling; often used together)
- [[Waterfall Methodology]] — _see_also_ (PERT/CPM are typical Waterfall scheduling tools)
- [[PRINCE2]] — _complements_ (fits inside PRINCE2 plan-management theme)
- [[Monte Carlo Simulation]] — _see_also_ (modern probabilistic-scheduling successor)

## Sources

- [[_Sources/Project_Management_Frameworks-yca3ot]] — pages 38-42 (key concepts, three-point estimation, expected-time formula, critical-path analysis, probabilistic estimates, event and activity nodes), pages 43-46 (advantages and challenges)
