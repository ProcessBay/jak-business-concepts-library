---
type: atom
title: Critical Path Method
aliases: [CPM, Critical Path Analysis, Critical Path Scheduling]
category: framework
applicable_to: [construction, engineering, manufacturing, infrastructure, software, services]
key_metrics: [total_project_duration, critical_path_length, float_time, slack_time, schedule_variance, resource_utilization]
related:
  - "see_also: PERT"
  - "see_also: Waterfall Methodology"
  - "complements: PRINCE2"
  - "contrasts_with: Kanban Framework"
sources: [_Sources/Project_Management_Frameworks-yca3ot]
source_pages: "27-38"
tags: [project_management, scheduling, traditional, planning, framework, deterministic]
created: 2026-06-16
---

# Critical Path Method

## Definition

The Critical Path Method (CPM) is a deterministic project scheduling technique that identifies the longest sequence of dependent activities (the "critical path") whose total duration sets the minimum possible project completion time. Pereira describes the technique as constructing a network diagram of activities and dependencies, then running a Forward Pass (early start/early finish) and a Backward Pass (late start/late finish) to calculate float — the slack time an activity can absorb without delaying the project. Activities on the critical path have zero float; any delay there delays the whole project. CPM is the workhorse scheduling method inside Waterfall and other plan-driven approaches.

## Key attributes

- **Network diagram of activities and dependencies** — nodes for activities, arrows for predecessor/successor links
- **Forward Pass and Backward Pass** — compute Early Start/Early Finish, then Late Start/Late Finish
- **Float (slack) calculation** — Float = LF − EF; zero float = critical path
- **Three float classes** — Zero (critical), Positive (buffer), Negative (already behind)
- **Deterministic single-point estimates** — assumes one duration per activity (PERT adds probabilistic estimates)
- **Total duration = sum of critical-path activity durations** plus longest parallel path adjustments
- **Identifies where management attention pays off** — protect critical-path activities; flex non-critical ones for resource leveling

## When to use

- Construction and engineering projects with well-defined activity sequences
- Projects with clear inter-task dependencies and known durations
- Resource-constrained projects needing prioritization of which activities to staff first
- As a planning layer underneath Waterfall, PRINCE2, or any plan-driven approach
- When stakeholders need a defensible "fastest possible" completion date

## When NOT to use

- Highly uncertain projects where duration estimates are guesses (use PERT instead)
- Iterative or flow-based work where "the project" is a continuous backlog (use Kanban/Scrum metrics)
- Projects where activities significantly overlap or run concurrently (CPM assumes sequential)
- Projects whose scope changes faster than the network can be re-baselined
- Very small projects where the overhead of network construction exceeds the benefit

## Common pitfalls

- Treating CPM durations as facts instead of estimates — Pereira notes that accuracy of CPM rises and falls with estimate quality
- Ignoring resource constraints — CPM optimizes time, not staffing feasibility
- Failing to update the network as reality diverges; stale CPM analysis misleads
- Assuming independent sequential activities when real work overlaps or has feedback loops
- Allowing network complexity to balloon on large projects until it becomes unmaintainable
- Reporting only the critical path and ignoring near-critical paths that could become critical with one slip

## Key metrics

- **Total project duration** — sum of critical path activity durations
- **Critical path length** (and identity of activities on it)
- **Float / Slack time** per activity (LF − EF or LS − ES)
- **Critical-path ratio** — fraction of activities on critical path; high ratio means fragile schedule
- **Schedule variance** — actual vs. planned timing of milestones
- **Resource utilization** on critical-path vs. float activities

## Decision questions

- What activities are on our critical path right now, and how confident are our duration estimates?
- Where do we have float we could redeploy to protect critical activities?
- Are any non-critical activities about to become critical?
- Do our duration estimates account for resource availability, or only ideal time?
- Should we use PERT (probabilistic) instead because our durations are genuinely uncertain?

## Canonical examples

- Construction project scheduling — the foundational CPM use case (page 27)
- Defense and aerospace planning — historical CPM heartland alongside PERT (page 38)
- Manufacturing process scheduling
- Large IT migration and rollout projects
- Event production with hard launch dates

## Related concepts

- [[PERT]] — _see_also_ (probabilistic sibling using three-point estimates)
- [[Waterfall Methodology]] — _see_also_ (CPM is the typical Waterfall scheduling tool)
- [[PRINCE2]] — _complements_ (CPM fits inside PRINCE2 plan-management theme)
- [[Kanban Framework]] — _contrasts_with_ (flow-based alternative; no critical path)
- [[Gantt Chart]] — _see_also_ (common visualization of CPM output)

## Sources

- [[_Sources/Project_Management_Frameworks-yca3ot]] — pages 27-33 (CPM mechanics, network construction, Forward/Backward Pass, float calculation), pages 34-37 (benefits and limitations)
