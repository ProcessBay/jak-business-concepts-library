---
type: atom
title: Kanban Framework
aliases: [Kanban, Kanban Method, Kanban Project Management]
category: framework
applicable_to: [software, ops, services, manufacturing, marketing, support, knowledge_work]
key_metrics: [lead_time, cycle_time, throughput, work_in_progress, cumulative_flow, blocked_time]
related:
  - "specializes: Agile Project Management"
  - "see_also: Scrum Framework"
  - "see_also: Lean Project Management"
  - "originates_from: Toyota Production System"
  - "contrasts_with: Waterfall Methodology"
sources: [_Sources/Project_Management_Frameworks-yca3ot]
source_pages: "62-70,84,156"
tags: [project_management, framework, agile, kanban, flow, pull_system, lean, visual_management]
created: 2026-06-16
---

# Kanban Framework

## Definition

Kanban is an agile project management methodology originating in the Toyota Production System of the 1940s, designed to manage flow efficiency through visual workflow, work-in-progress (WIP) limits, and a pull-based system. Pereira identifies five core practices: **visualizing workflow** (typically on a board with columns like To Do / In Progress / Done), **limiting WIP** to prevent overload, **managing flow and lead time**, **continuous improvement and evolution**, and **implementing pull-based systems** where new work is pulled in only as capacity allows. Unlike Scrum, Kanban has no fixed iterations and no prescribed roles — it overlays whatever process you already have and applies pressure on flow.

## Key attributes

- **Visualize workflow** — Kanban board with columns representing work states
- **WIP limits** — explicit caps on items per column to prevent overload and surface bottlenecks
- **Pull-based flow** — work is pulled into the next stage only when there is capacity, not pushed
- **Continuous flow, not iterations** — no fixed sprint boundaries; items move when ready
- **Lead-time and cycle-time focus** — measure and optimize how long work takes end-to-end
- **Cumulative Flow Diagrams (CFDs)** — visualize WIP over time across stages
- **Evolutionary, not revolutionary** — overlays existing processes rather than replacing them

## When to use

- Operations, support, maintenance, or any continuous-flow work without natural sprint boundaries
- Teams with highly variable item sizes where time-boxed sprints feel forced
- Service-oriented work where priorities shift continuously (DevOps, IT ops, customer support)
- As an evolutionary first step from traditional PM toward Agile
- Combined with other methods (Scrumban) when sprints exist but flow visibility is the priority
- When immediate adoption matters and you can't pause for a Scrum transformation

## When NOT to use

- Greenfield product development where sprint cadence and review ceremonies genuinely add value
- Teams that need the forcing function of sprint commitments to focus
- Stakeholders demanding predictable batch delivery dates (Pereira flags Kanban's lead-time estimation difficulty)
- Contexts where WIP limits will be ignored by management override
- Projects requiring heavy upfront scope-and-schedule contracts

## Common pitfalls

- Putting up a Kanban board but never setting WIP limits — losing the central mechanism
- WIP limits too high (no effective constraint) or too low (resource underutilization)
- Treating Kanban as "no process" — it requires explicit policies for each column
- No metrics discipline; Pereira emphasizes lead time, cycle time, throughput and CFDs as core
- Ignoring stakeholder pressure for fixed delivery dates instead of communicating probabilistic forecasts
- Adopting Kanban without the cultural shift to pull-based, flow-managed work

## Key metrics

- **Lead time** — from request to delivery (customer-perceived time)
- **Cycle time** — from start of work to delivery (team-controlled time)
- **Throughput** — items completed per unit time
- **Work in Progress (WIP)** — current items in flight; constrained by limits
- **Cumulative Flow Diagram (CFD)** — visualization of items per stage over time
- **Blocked time** — duration items spend blocked, surfacing systemic bottlenecks
- **Lead-time distribution** — percentile-based forecasts (e.g., 85th-percentile delivery time)

## Decision questions

- Where are we accumulating WIP, and what's the bottleneck causing it?
- Are our WIP limits actually constraining behavior, or just decoration?
- Does our work have a natural sprint rhythm, or is it genuinely continuous flow?
- Can we communicate lead-time forecasts probabilistically to stakeholders demanding dates?
- Have we made the cultural shift from push to pull?

## Canonical examples

- Toyota Production System — Kanban's origin in manufacturing (page 62)
- Software DevOps, IT operations, and support teams — modern dominant use case
- PRINCE2 Agile delivery via Kanban (page 84)
- Marketing content production pipelines
- Customer-support ticket triage workflows
- Pereira's PM conclusion names Kanban as a rising influence on modern PM (page 156)

## Related concepts

- [[Agile Project Management]] — _specializes_ (Kanban is one of the two dominant Agile frameworks)
- [[Scrum Framework]] — _see_also_ (sibling iterative Agile approach)
- [[Lean Project Management]] — _see_also_ (shared Toyota Production System lineage)
- [[Work In Progress Limits]] — _see_also_ (Kanban's core mechanism)
- [[Cumulative Flow Diagram]] — _see_also_ (Kanban's key visualization)
- [[Waterfall Methodology]] — _contrasts_with_ (plan-driven sequential alternative)
- [[Scrumban]] — _see_also_ (Scrum + Kanban hybrid)

## Sources

- [[_Sources/Project_Management_Frameworks-yca3ot]] — pages 62-65 (principles and practices: visualization, WIP limits, flow, continuous improvement, pull), pages 65-67 (boards, cards, columns, swimlanes, metrics), pages 67-70 (benefits and considerations), page 84 (PRINCE2 Agile), page 156 (conclusion)
