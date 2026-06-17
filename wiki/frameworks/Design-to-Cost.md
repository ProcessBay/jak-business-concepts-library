---
type: atom
title: Design-to-Cost
aliases: [DTC, Design to Cost, Target Costing, Cost-Driven Design]
category: framework
applicable_to: [manufacturing, hardware, infrastructure, capex_projects, product_design, services]
key_metrics: [target_cost, unit_cost_variance, capex_per_unit_capacity, BOM_cost, overhead_per_unit]
related:
  - "see_also: Design for Manufacturability"
  - "see_also: Cost Breakdown Analysis"
  - "amplifies: Six Cost-Reduction Approaches (Pereira)"
  - "see_also: Cost Structure"
  - "see_also: Function Cost Analysis"
sources: [_Sources/Super_Guide_Cost_Reducing_Strategies_and_Techniques-1dgdwg]
source_pages: "27-28"
tags: [cost_reduction, product_design, framework, capex, finance]
created: 2026-06-17
---

# Design-to-Cost

## Definition

Design-to-Cost (DTC) is the inverse of Design-to-Value: instead of designing the best product you can and then pricing it, you fix a target cost first and design the product to land beneath that ceiling. Pereira frames DTC as the analysis and reduction of the design phase and requirements of any project — emphasizing assembly time, handling, and labor as the cost factors to identify, compensate for, and control **early in the production stage**. DTC applies across three illustrative domains in the source: **Capital Expenditure** (build a viable solar manufacturing operation under a hard capital ceiling), **Lifestyle Expenses** (site selection and infrastructure choices for a data center to control infrastructure, cooling, and power), and **Backward Invention** (strip features from a $900 phone to land a $150 SKU for a lower-income segment). The discipline extends past unit economics to overhead, recurring costs, warranty exposure, and returns.

## Key attributes

- **Target cost is an input, not an output** — design backwards from the cost ceiling
- **Early-stage discipline** — leverage is highest before requirements harden
- **Three primary domains** — Capital Expenditure, Lifestyle/Infrastructure Expenses, Backward Invention
- **Labor, assembly, handling focus** — these three cost factors dominate most DTC decisions
- **Trade-off explicit** — features are negotiated against the cost ceiling, not added then defended
- **Covers full cost stack** — unit cost, overhead, recurring, warranty, returns

## When to use

- New product entering a price-constrained segment (down-market expansion)
- Capex-constrained capacity builds where the budget is hard
- Backward-invention plays: spinning a premium SKU into a value SKU
- Infrastructure projects (data centers, plants) where site economics dominate
- Products where competitors define the price point and you must engineer beneath it

## When NOT to use

- Premium positioning where customers pay for unconstrained capability
- Early R&D where the cost-to-build cannot yet be estimated honestly
- Markets with no clear price ceiling (luxury, bespoke, novel categories)
- Services with high variable labor where cost is structurally usage-bound, not design-bound

## Common pitfalls

- Setting a target cost without market evidence — the ceiling becomes arbitrary
- Stripping features the customer actually paid for (Backward Invention done badly)
- Optimizing unit cost while ignoring overhead, warranty, and returns (the full DTC stack)
- Treating DTC and DFM as competitors rather than complements (they stack)
- Using DTC to justify low-quality substitution that destroys brand trust
- Letting engineering "win back" features mid-cycle, eroding the ceiling

## Key metrics

- **Target unit cost** and **actual unit cost variance**
- **Capex per unit of capacity** for infrastructure DTC
- **BOM cost** vs. target
- **Overhead per unit** absorbed
- **Warranty reserve as % of revenue**
- **Return rate** post-launch

## Decision questions

- What is the market-evidenced price ceiling, and what cost ceiling does that imply at our target margin?
- Which features can be stripped without the customer noticing the value loss?
- Are we managing the full DTC stack — unit, overhead, recurring, warranty, returns?
- Where is the right trade between DTC and DFM in our process?
- Is the cost ceiling holding under engineering pressure to add features back?

## Canonical examples

- **Solar manufacturing operation** — DTC used to cut requirements while keeping factory at optimal capacity from opening day (page 27)
- **Data center site selection** — choosing locations that allow solar panel installation, space utilization, and efficient cooling (page 27)
- **Backward-invention phones** — converting a $900 high-end device to a $150 SKU for lower-income segments (page 27)
- **Tata Nano** — landmark backward-invention play targeting an ultra-low price point
- **No-frills airlines** — operational design starting from the seat-mile cost target

## Related concepts

- [[Design for Manufacturability]] — _see_also_ (DFM is the engineering-stage execution of DTC targets)
- [[Cost Breakdown Analysis]] — _see_also_ (the analytical input that makes DTC targets credible)
- [[Function Cost Analysis]] — _see_also_ (used to decide which functions earn their cost)
- [[Cost Structure]] — _see_also_
- [[Six Cost-Reduction Approaches (Pereira)]] — _amplifies_ (DTC operationalizes Optimization and Elimination at design time)

## Sources

- [[_Sources/Super_Guide_Cost_Reducing_Strategies_and_Techniques-1dgdwg]] — pages 27–28 (definition, three application domains, full cost-stack coverage)
