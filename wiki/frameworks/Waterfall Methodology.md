---
type: atom
title: Waterfall Methodology
aliases: [Waterfall Model, Sequential Project Management, Linear Project Management]
category: framework
applicable_to: [construction, manufacturing, infrastructure, software, regulated_industries]
key_metrics: [on-time_delivery_rate, budget_variance, schedule_variance, requirements_stability, defect_rate, rework_rate]
related:
  - "contrasts_with: Scrum Framework"
  - "contrasts_with: Kanban Framework"
  - "see_also: Critical Path Method"
  - "see_also: PRINCE2"
  - "specializes: Traditional Project Management"
sources: [_Sources/Project_Management_Frameworks-yca3ot]
source_pages: "16-26,155"
tags: [project_management, framework, traditional, sequential, waterfall, plan_driven]
created: 2026-06-16
---

# Waterfall Methodology

## Definition

The Waterfall methodology is a sequential, linear project management approach where each phase is completed before the next begins — resembling water flowing downward through a fixed series of steps. Pereira identifies six phases: Requirements Gathering and Analysis, System Design, Implementation, Testing, Deployment, and Maintenance and Support. The methodology depends on thorough upfront planning and documentation, and is best suited to projects with stable, well-defined requirements where changes are unlikely once execution begins. It is the archetypal "traditional" project management approach against which Agile/iterative methods are typically contrasted.

## Key attributes

- **Sequential phase progression** — six phases executed in fixed order, each gating the next
- **Heavy upfront requirements work** — Requirements Specification document signed off before design
- **Document-driven** — formal artifacts (Requirements, Design Spec, Test Plan) preserve project intent
- **Predictability over flexibility** — gives accurate schedules/budgets when requirements hold; expensive when they don't
- **Late testing** — defects surface in the Testing phase, well after design and implementation are "done"
- **Formal change-management process** — changes after sign-off require rework cycles, not in-flight adjustment
- **Limited client involvement after kickoff** — stakeholders engage heavily upfront and at deployment, less in between

## When to use

- Construction, manufacturing, infrastructure — physical projects where rework is genuinely expensive
- Regulated environments (medical devices, defense, aerospace) where documentation is mandatory
- Projects with stable, well-understood requirements unlikely to change
- Contexts where the client cannot or will not engage iteratively
- Fixed-scope, fixed-price contracts where scope must be locked at signing

## When NOT to use

- Software products with evolving requirements or unknown user needs
- Markets where time-to-feedback matters more than time-to-completion
- Projects with high technical or market uncertainty
- Clients who want to see and shape the product as it develops
- Teams skilled in and culturally aligned with iterative delivery

## Common pitfalls

- Treating upfront requirements as "done" when they're really assumptions
- Discovering critical design flaws only at Testing, when rework is most expensive
- Misreading low-change-cost projects as Waterfall-suitable (when reality is they're just early)
- Pretending Waterfall provides certainty when it actually defers risk to the end
- Forcing Waterfall on software where the cost of iteration is near-zero
- Using Waterfall's documentation as substitute for actual stakeholder communication

## Key metrics

- **On-time delivery rate** — did each phase finish on its planned date?
- **Schedule variance** and **budget variance** — actuals vs. baseline
- **Requirements stability** — % of original requirements unchanged at delivery
- **Defect rate at UAT** — bugs surfacing in user acceptance testing
- **Rework rate** — % of completed work re-done after a downstream discovery
- **Phase exit gate pass rate** — first-time-through quality of phase deliverables

## Decision questions

- Are our requirements truly stable, or does that just feel safer than admitting uncertainty?
- What does it cost us if a defect surfaces during Testing vs. during Design?
- Can our client wait until Deployment to see working output?
- Do we have the documentation discipline Waterfall actually requires?
- Would Hybrid (Waterfall scaffold + Agile delivery inside phases) serve us better?

## Canonical examples

- Construction projects — Pereira cites construction as a Waterfall-native industry (page 13, 24)
- Manufacturing and infrastructure development (page 24)
- Defense and aerospace projects (PERT/CPM heritage, pages 38, 155)
- Public-sector IT with locked specifications and procurement gates
- Medical device development under FDA design-control regulations

## Related concepts

- [[Critical Path Method]] — _see_also_ (CPM is the canonical Waterfall scheduling technique)
- [[PRINCE2]] — _see_also_ (stage-gated governance that wraps Waterfall-style execution)
- [[Scrum Framework]] — _contrasts_with_ (iterative alternative)
- [[Kanban Framework]] — _contrasts_with_ (flow-based alternative)
- [[Hybrid Project Management]] — _see_also_ (Waterfall + Agile blend)
- [[Design-Bid-Build]] — _specializes_ (construction-specific Waterfall variant)

## Sources

- [[_Sources/Project_Management_Frameworks-yca3ot]] — pages 16-21 (six phases), pages 21-26 (advantages and disadvantages), page 155 (conclusion summary)
