---
type: atom
title: Activity-Based Costing
aliases: [ABC, Activity Based Costing, ABC Costing]
category: costing_system
applicable_to: [accounting, manufacturing, services, all_industries]
key_metrics: [cost_per_activity, cost_driver_rate, overhead_absorption_rate, activity_cost_pool, unit_cost]
related:
  - "contrasts_with: Absorption Costing"
  - "specializes: Standard Costing"
  - "see_also: Cost Structure"
  - "see_also: Process Costing"
sources: [_Sources/Cost_Models-ttnmxc]
source_pages: "22-24,29"
tags: [cost, accounting, financial, costing_system, overhead, activity_based, manufacturing]
created: 2026-06-17
---

# Activity-Based Costing

## Definition

Activity-Based Costing (ABC) is a form of cost allocation in which overhead costs are assigned to the specific activities associated with the production of goods or services — those activities being collectively known as **cost drivers** because they form the bulk of the total costs a business has to shoulder. Pereira frames ABC as a corrective to cruder, blanket overhead allocations: instead of spreading overhead evenly across all output, ABC traces it to the activities that actually consume it. The result is "generally more accurate than total costing, since it assigns these costs to specific units of production," letting a business measure both its true costs and its real per-unit profitability with much higher fidelity.

## Key attributes

- **Cost-driver based** — overhead is allocated to the activities that cause it, not to volume alone
- **Two-stage allocation** — costs are first pooled by activity, then assigned to products/services by driver consumption
- **Higher accuracy** — far more accurate than total or absorption costing for diversified product mixes
- **Surfaces hidden subsidies** — exposes products that look profitable but in fact consume disproportionate overhead
- **Decision-grade data** — outputs feed pricing, product-mix, and process-redesign decisions
- **Data-hungry** — requires identifying activities, drivers, and consumption rates per product/service

## When to use

- Diversified product or service lines with very different overhead consumption patterns
- Manufacturing environments where overhead is a large share of total cost
- When current costing under- or over-prices certain products and you suspect cross-subsidy
- For pricing and product-rationalization decisions where accuracy matters
- When implementing lean or continuous improvement and need activity-level cost visibility

## When NOT to use

- Single-product businesses where overhead allocation is trivial
- Very small operations where data collection cost outweighs the accuracy benefit
- Businesses where overhead is a tiny share of total cost
- When the production process is so unstable that activity definitions can't stabilize
- Short-term tactical decisions where marginal costing answers the question faster

## Common pitfalls

- Over-engineering the activity taxonomy — hundreds of cost pools where a dozen would do
- Treating ABC as a finance exercise instead of a management tool
- Picking cost drivers that are easy to measure rather than truly causal
- Failing to update activities and drivers as the production process evolves
- Letting ABC outputs sit in reports without flowing into pricing or product decisions

## Key metrics

- **Cost per activity** (e.g., cost per setup, per inspection, per order)
- **Cost driver rate** — total activity cost / total driver units
- **Activity cost pool** — total overhead grouped by activity
- **Overhead absorption rate** by product
- **Unit cost** (direct + ABC-allocated overhead)
- **Profit margin per product** post-ABC reallocation

## Decision questions

- Which activities actually drive our overhead, and is anyone managing them?
- Which products look profitable on average-cost numbers but are losing money under ABC?
- What's the simplest activity taxonomy that gives us decision-useful accuracy?
- Are our pricing decisions reflecting true cost-to-serve or industry-average overhead?
- Will the cost of running ABC pay back through better pricing or product rationalization?

## Canonical examples

- **Diversified manufacturers** — different SKUs consume very different setup, inspection, and handling time (page 29)
- **Hospitals** — patient cases as cost objects; procedures, lab work, nursing time as activities
- **Banks** — per-transaction costing across product lines (loans, deposits, advisory)
- **Aerospace and defense** — high-overhead, low-volume contracts where activity tracing is essential

## Related concepts

- [[Cost Structure]] — _amplifies_ (ABC is one of the lenses for building one)
- [[Absorption Costing]] — _contrasts_with_ (ABC traces overhead; absorption distributes it)
- [[Standard Costing]] — _see_also_ (ABC outputs often feed standards)
- [[Process Costing]] — _see_also_ (alternative system for continuous-flow production)
- [[Cost-Plus Pricing]] — _see_also_ (ABC produces more honest cost inputs to mark up)

## Sources

- [[_Sources/Cost_Models-ttnmxc]] — pages 22–24 (costing definition and purpose), page 29 (Activity-Based Costing system definition, cost drivers, accuracy claim)
