---
type: atom
title: MoSCoW Prioritization
aliases: [MoSCoW, MoSCoW Method, MoSCoW Framework, Must-Should-Could-Won't]
category: concept
applicable_to: [product, project_management, MVP_design, agile, prioritization]
key_metrics: [feature_inclusion_rate, scope_creep_rate, MVP_size, on_time_delivery]
related:
  - "amplifies: Minimum Viable Product"
  - "see_also: Lean Startup Methodology"
  - "see_also: Single-Feature MVP"
sources: [_Sources/Minimum-Viable-Product-MVP-txseve]
source_pages: "50,83,113"
tags: [concept, prioritization, MVP, agile, product_management]
created: 2026-06-02
---

# MoSCoW Prioritization

## Definition

MoSCoW is a prioritization technique that sorts requirements into four categories — **M**ust-have, **S**hould-have, **C**ould-have, and **W**on't-have (this release) — to force discipline about what actually ships in a given iteration. The lowercase "o"s are filler, not meaningful. Pereira recommends MoSCoW as the default method for prioritizing MVP features: "The MoSCoW prioritization method is a good way to prioritize the features that you want to be included in your MVP." Its strength is that it makes scope explicit and forces stakeholders to agree on what is genuinely essential vs merely desirable — a discipline that prevents the "minimum" in MVP from quietly inflating.

## Key attributes

- **Four categories, ranked** — Must / Should / Could / Won't
- **"Must" is mandatory for THIS release** — failure to deliver any Must means the release fails
- **"Should" is important but not critical** — workarounds exist if not delivered
- **"Could" is nice-to-have** — included only if time/budget permits
- **"Won't" is explicitly out of scope this release** — deferred, not killed
- **Forces stakeholder agreement** — the categorization itself is the conversation
- **Risk: stakeholders inflate "Must"** — Pereira warns >60% in "Must" produces an MVP that is "barely minimum and... isn't particularly viable" (page 113)

## When to use

- MVP feature scoping — primary use case Pereira describes (page 50)
- Sprint planning in Agile / Scrum
- Release planning when scope-vs-deadline pressure is high
- Cross-functional negotiations (product, engineering, sales, marketing pushing competing features)
- Anytime "everything is a priority" rhetoric is dominant — MoSCoW forces ranking

## When NOT to use

- When the team has discipline to do single-feature MVPs (MoSCoW is overkill for "one thing")
- For pure research or discovery work where requirements aren't yet stable
- When stakeholders are politically unable to put anything in "Won't" (the framework fails silently)
- In contexts where the four-tier granularity loses information (use a numbered backlog instead)
- For purely technical work where "must" and "should" don't have meaningful customer-value distinction

## Common pitfalls

- **"Must" inflation** — >60% of features categorized as Must, defeating prioritization (Pereira, page 113)
- **No "Won't" courage** — putting everything in Could instead of explicitly cutting
- **Treating MoSCoW as MVP definition** — must-haves become the whole MVP, with no room for learning
- **No tie-breaking** — within "Must", which Must goes first?
- **Confusing "Should" with "Must" under deadline pressure** — scope creeps as deadline approaches
- **Letting non-customer-facing teams set Musts** — engineering "musts" can drown out customer "musts"
- **Re-doing MoSCoW every sprint** — should be re-validated, not recreated

## Key metrics

- % of features categorized as Must (red flag if >40% of total)
- Feature inclusion rate by category at release (did Musts ship? Did Shoulds?)
- Scope creep rate (Could → Must transitions during the release)
- On-time delivery vs MoSCoW scope
- Post-release validation (did "Must" actually drive value?)

## Decision questions

- If we shipped without this feature, would the release fail completely? (If no → not a Must)
- Have stakeholders agreed on what's in "Won't" — explicitly, not implicitly?
- Is more than 40-50% of our backlog in "Must"? (If yes → re-prioritize, the framework is failing)
- Who owns tie-breaking within Must?
- Are our Musts genuinely customer-essential, or stakeholder-political?

## Canonical examples

- **MVP feature scoping (Pereira's primary use)** — page 50 illustrates MoSCoW as the canonical prioritization for MVP features
- **DSDM (Dynamic Systems Development Method)** — originated MoSCoW in the 1990s as part of agile project management
- **Many product teams use MoSCoW per sprint** — combined with story-point estimation
- **The "MoSCoW abuse" anti-pattern (page 113)** — Pereira describes how managers "treat them as if they were MoSCoW rules," with stakeholders cramming >60% of requirements into Must, producing a non-minimum and non-viable release

## Related concepts

- [[Minimum Viable Product]] — _amplifies_ (MoSCoW is the standard MVP scoping tool)
- [[Single-Feature MVP]] — _see_also_ (alternative discipline that avoids MoSCoW failure modes)
- [[Lean Startup Methodology]] — _see_also_
- [[Build-Measure-Learn Loop]] — _see_also_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Value Drivers]] — _auto_ (score 4.8: tags×4.0, category×0.8)
- [[Build-Measure-Learn Loop]] — _auto_ (score 4.0: tags×2.0, applicable_to×2.0)
- [[Fake Door Test]] — _auto_ (score 4.0: tags×2.0, applicable_to×2.0)
- [[Lean Startup Methodology]] — _auto_ (score 4.0: tags×2.0, applicable_to×1.0, alias×1.0)
- [[Product-Market Fit]] — _auto_ (score 3.8: tags×2.0, applicable_to×1.0, category×0.8)
- [[Vanity Metrics vs Actionable Metrics]] — _auto_ (score 3.8: tags×2.0, applicable_to×1.0, category×0.8)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Minimum-Viable-Product-MVP-txseve]] — page 50 (MoSCoW as MVP prioritization method; the four categories), page 83 (MoSCoW + Blue Ocean as priority approaches), page 113 (MoSCoW abuse anti-pattern — "musts" overflow producing non-minimum, non-viable MVPs)
