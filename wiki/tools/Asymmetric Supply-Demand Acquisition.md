---
type: atom
title: Asymmetric Supply-Demand Acquisition
aliases: [Hard Side First, Supply-Side vs Demand-Side Marketplace, Asymmetric Side Strategy, Which-Side-First]
category: tactic
applicable_to: [marketplaces, platforms, two_sided, B2B2C, ride_sharing, lending, hiring]
key_metrics: [hard_side_CAC, side_specific_LTV, cross_side_uptake, match_rate, paid_share_per_side, supply_density_per_geography]
related:
  - "amplifies: Two-Sided Network Effect"
  - "amplifies: Cold-Start Playbook"
  - "see_also: Indirect Network Effect"
  - "see_also: Critical Mass"
  - "see_also: Marketplace Business Model"
sources: [_Sources/Network_Effects-queqlx-2]
source_pages: "30-31,67-69,72-73"
tags: [tactic, playbook, network_effects, two_sided, asymmetric, marketplace, acquisition]
created: 2026-06-02
---

# Asymmetric Supply-Demand Acquisition

## Definition

In nearly every two-sided marketplace, the two sides are *not* equally difficult to acquire: one side ("the hard side") requires disproportionate capital, effort, and product investment, while the other ("the easy side") arrives roughly on its own once the hard side is sufficient. Pereira: "Almost always, one side of a market or a certain variety of nodes is more difficult to acquire than the other." The strategic implication is that founders must **identify the hard side explicitly, allocate disproportionate resources to it, and stop investing in symmetric growth.** Pereira contrasts **demand-side marketplaces** (where buyers are hard — Fiverr, Upwork, Lending Club; supply self-organizes once paying demand exists) with **supply-side marketplaces** (Uber, Lyft; spend most paid-acquisition budget on drivers, not riders). Within a side, asymmetry persists too — some nodes (a popular OpenTable restaurant) are worth 1000× others.

## Key attributes

- **One side is always harder** — symmetry is the exception, not the rule
- **Two named patterns** — demand-side markets (Fiverr, Lending Club) vs supply-side markets (Uber, Lyft)
- **Per-side CAC asymmetry** — track separately; the average is meaningless
- **Within-side asymmetry too** — top-decile nodes contribute disproportionate value
- **Multi-tenanting risk on one or both sides** — when the easy side can use competitors freely, defensibility erodes
- **Sometimes both sides are hard** — rare and brutal; usually founders lack discipline to admit it
- **Pricing inversion** — often the hard side gets subsidized, the easy side pays (or vice versa, depending on cross-side value)

## When to use

- Designing the initial acquisition strategy for any two-sided marketplace
- Allocating subsidy budget — apply it to the hard side, not split evenly
- Diagnosing why a marketplace stalls — usually one side wasn't densified enough
- Pricing decisions: take-rate, subsidy, free / paid configuration per side
- Targeting within-side: which segments of the hard side to win first

## When NOT to use

- Genuinely symmetric markets (rare) — verify before adopting asymmetric strategy
- Single-sided products
- Categories where the hard side is regulatorily limited and no amount of effort moves the needle

## Common pitfalls

- **Splitting acquisition spend 50/50** — symmetric budgeting wastes the hard-side bottleneck
- **Mistaking the hard side** — wrong identification leads to subsidy of the easy side (no liquidity gained)
- **Ignoring within-side asymmetry** — chasing 1,000 marginal suppliers when 10 top suppliers carry the network
- **Subsidizing forever** — failing to plan a path from subsidized to organic on the hard side
- **Multi-homing blindness** — easy-side users using competitors freely, leaving no moat
- **Per-geography blindness** — hard side may flip by city; Uber's hard side varies between mature and new markets

## Key metrics

- **Hard-side CAC** vs **easy-side CAC** — tracked separately
- **Per-side LTV** — hard-side LTV usually dominates total economics
- **Cross-side uptake** — does easy-side activate when hard-side is present?
- **Match rate** in the seeded cluster (leading indicator of liquidity)
- **Paid share / organic share per side** — should flip as critical mass is reached
- **Within-side concentration** — top-10 share of supply / demand
- **Multi-tenant rate** — % of users also using competitors

## Decision questions

- Which is our hard side, by evidence not assumption (per-side CAC, time-to-acquire, churn)?
- Within the hard side, who are the top-decile nodes we must win first?
- Is our subsidy aligned with the hard side, and what's the runway to organic conversion?
- Where is multi-homing eroding our easy-side defensibility, and how do we increase switching cost?
- Does our hard side flip by geography / segment, and is per-market strategy reflecting that?

## Canonical examples

- **Demand-side markets**: **Fiverr, Upwork** (find buyers; sellers appear) (page 30); **Lending Club** (find borrowers; lenders follow) (page 31)
- **Supply-side markets**: **Uber, Lyft** (spend most paid acquisition on drivers) (page 31, 78)
- **OpenTable** — restaurant supply is hard; diners are easier (pages 68, 72)
- **Airbnb** — host side seeded first via community + word-of-mouth (page 63, 77)
- **eBay** — early collector / hobbyist supply community drove demand growth (page 63)
- **App stores** — developer (supply) side hard; consumer (demand) easy once apps exist
- **Within-side asymmetry**: **OpenTable** popular restaurants vs marginal ones (page 71)

## Related concepts

- [[Two-Sided Network Effect]] — _amplifies_
- [[Cold-Start Playbook]] — _amplifies_
- [[Indirect Network Effect]] — _see_also_
- [[Critical Mass]] — _see_also_
- [[Marketplace Business Model]] — _see_also_
- [[Local Network Effect]] — _see_also_ (asymmetry can flip per geography)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Cold-Start Playbook]] — _auto_ (score 13.8: tags×8.0, applicable_to×4.0, category×0.8, alias×1.0)
- [[Two-Sided Network Effect]] — _auto_ (score 11.0: tags×6.0, applicable_to×3.0, alias×2.0)
- [[Negative Network Effect Curation Tactics]] — _auto_ (score 9.8: tags×6.0, applicable_to×3.0, category×0.8)
- [[Amazon Flywheel]] — _auto_ (score 7.0: tags×4.0, applicable_to×3.0)
- [[Platform-Based Business Model]] — _auto_ (score 7.0: tags×4.0, applicable_to×3.0)
- [[Indirect Network Effect]] — _auto_ (score 6.0: tags×2.0, applicable_to×3.0, alias×1.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Network_Effects-queqlx-2]] — pages 30-31 (asymmetry definition, demand-side vs supply-side markets, within-side asymmetry), pages 67-69 (paid CAC, multi-tenanting, switching cost metrics), pages 72-73 (match rate, market depth)
