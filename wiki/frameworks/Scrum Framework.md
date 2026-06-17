---
type: atom
title: Scrum Framework
aliases: [Scrum, Scrum Methodology, Scrum Agile]
category: framework
applicable_to: [software, product_dev, services, marketing, consulting, R&D]
key_metrics: [velocity, sprint_burndown, sprint_goal_attainment, escaped_defects, team_happiness, cycle_time]
related:
  - "specializes: Agile Project Management"
  - "see_also: Kanban Framework"
  - "see_also: PRINCE2"
  - "contrasts_with: Waterfall Methodology"
sources: [_Sources/Project_Management_Frameworks-yca3ot]
source_pages: "47-62,84,155"
tags: [project_management, framework, agile, scrum, iterative, software, product_dev]
created: 2026-06-16
---

# Scrum Framework

## Definition

Scrum is an agile project management framework built on iterative, time-boxed delivery cycles called sprints (typically one to four weeks), inside which a cross-functional Development Team converts prioritized backlog items into a potentially shippable increment. Pereira identifies three core principles — **transparency, inspection, and adaptation** — operationalized via three roles (Product Owner, Scrum Master, Development Team), three artifacts (Product Backlog, Sprint Backlog, Increment), and five ceremonies (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective, plus the sprint itself). Scrum was born in software but applies wherever value can be delivered incrementally and stakeholders can provide frequent feedback.

## Key attributes

- **Time-boxed sprints** — 1 to 4 weeks, fixed length, delivering a potentially shippable increment
- **Three roles** — Product Owner (what), Scrum Master (how-well), Development Team (how)
- **Three artifacts** — Product Backlog (prioritized wishlist), Sprint Backlog (this sprint's commitment), Increment (the done work)
- **Five ceremonies** — Sprint Planning, Daily Scrum (15 min), Sprint Review (demo), Sprint Retrospective, plus the sprint container
- **Cross-functional self-organizing teams** — diverse skills enable a complete increment without external dependencies
- **Definition of Done** — explicit, team-agreed quality bar for "done" increments
- **Empirical process control** — transparency, inspection, adaptation replace upfront prediction

## When to use

- Software product development with evolving requirements
- Projects where customer feedback during build genuinely changes priorities
- Teams that can be cross-functional and co-located (or strongly virtually-collaborative)
- Small to medium projects (Pereira flags scaling limitations for large initiatives)
- Contexts where time-to-feedback dominates time-to-completion in value
- Organizations willing to invest in cultural shift and role-discipline

## When NOT to use

- Projects with truly stable, well-understood, regulation-locked requirements
- Hardware/construction projects where iteration is physically expensive
- Teams that can't or won't operate as cross-functional and self-organizing
- Distributed teams without strong communication infrastructure (Pereira notes communication dependency)
- Very large complex programs without scaling framework (use SAFe, LeSS, or Scrum-of-Scrums)
- Organizations whose culture demands traditional command-and-control governance

## Common pitfalls

- "Scrum-but" — skipping retrospectives or daily standups while claiming to do Scrum
- Treating the Daily Scrum as status reporting to the Scrum Master instead of team synchronization
- Product Owner unavailable or unable to make priority decisions, starving the team
- Estimating in time instead of relative effort, then treating estimates as commitments
- Mid-sprint scope changes that violate the sprint commitment
- Cargo-cult adoption — adopting ceremonies without adopting the underlying values
- Misapplying to large complex programs without explicit scaling design

## Key metrics

- **Velocity** — story points (or items) completed per sprint, used for forecasting
- **Sprint Burndown** — remaining work in the sprint over time
- **Sprint Goal attainment rate** — % of sprints meeting the agreed goal
- **Escaped defects** — bugs reaching production after a sprint claims "done"
- **Cycle time** per backlog item — from start to "done"
- **Team happiness / Net Promoter** — surrogate for sustainability of pace
- **Definition-of-Done adherence** — increments meeting all DoD criteria

## Decision questions

- Do we genuinely have a Product Owner empowered to set and reorder priorities?
- Can we deliver a potentially shippable increment every 1 to 4 weeks, or are we just running mini-Waterfalls?
- Are stakeholders available to review the increment and feed back into the backlog?
- Will our culture tolerate the transparency Scrum requires?
- Do we need a scaling framework, or is one Scrum team enough?

## Canonical examples

- Software product teams across SaaS companies — the dominant Scrum context (page 47)
- PRINCE2 Agile — explicit integration of Scrum delivery inside PRINCE2 governance (page 84)
- Pereira's general PM conclusion cites Scrum as the canonical Agile framework (page 155)
- Marketing and content teams adapting Scrum for campaign cycles
- R&D teams using Scrum for experiment cadence

## Related concepts

- [[Agile Project Management]] — _specializes_ (Scrum is the dominant Agile framework)
- [[Kanban Framework]] — _see_also_ (sibling flow-based Agile approach)
- [[PRINCE2]] — _see_also_ (integrated as PRINCE2 Agile)
- [[Waterfall Methodology]] — _contrasts_with_ (sequential vs. iterative)
- [[Sprint Planning]] — _see_also_ (the planning ceremony)
- [[Sprint Retrospective]] — _see_also_ (continuous improvement ceremony)
- [[Daily Standup]] — _see_also_ (synchronization ceremony)

## Sources

- [[_Sources/Project_Management_Frameworks-yca3ot]] — pages 47-53 (roles, stakeholders, cross-functional team dynamics), pages 53-57 (artifacts and ceremonies), pages 57-62 (advantages and challenges), page 84 (PRINCE2 Agile integration), page 155 (conclusion)
