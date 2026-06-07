---
type: atom
title: Indirect Network Effect
aliases: [Indirect Network Effects, Complementary Network Effect, Same-Side-via-Other-Side Effect]
category: framework
applicable_to: [platforms, marketplaces, OS, ecosystems, B2B2C, developer_platforms]
key_metrics: [complementary_inventory_breadth, developer_count, app_count, cross_side_uptake, supply_concentration]
related:
  - "specializes: Network Effects"
  - "contrast: Direct Network Effect"
  - "see_also: Two-Sided Network Effect"
  - "amplifies: Multilateral Platform"
  - "see_also: Platform Effects"
sources: [_Sources/Network_Effects-queqlx-2]
source_pages: "23-24,34,48"
tags: [network_effects, indirect, platform, ecosystem, complements]
created: 2026-06-02
---

# Indirect Network Effect

## Definition

An indirect network effect arises when a new user of one type does not directly help other same-type users, but indirectly benefits them by attracting complementary users on a different side of the network. Pereira: "Nodes on the same side of the network indirectly benefit each other [by] increasing the benefits to complementing users on the other side of the network." A new eBay seller does not help other sellers directly — in fact, it raises competition — but a wider selection attracts more buyers, which ultimately benefits all sellers. OS platforms are the textbook case: a new Windows developer does not help existing developers, but more apps attracts more users, which means a larger software market. The mechanism is mediated rather than direct, which makes indirect effects slower to cold-start but very defensible once liquidity arrives.

## Key attributes

- **Mediated (not direct) value transfer** — same-side benefit flows only via the other side
- **Often confused with cross-side / two-sided** — Pereira treats them as overlapping but distinct; indirect is the broader pattern, two-sided cross-side is the strongest direct form
- **Slow cold-start** — chicken-and-egg gap before complement attracts complement
- **Strong moat at maturity** — switching costs compound across both sides
- **Common in OS, app stores, marketplaces, payment networks**
- **Asymptotic risk** — once complementary inventory saturates a user need, marginal addition contributes little
- **Pricing inversion** — often one side is free or subsidized to attract the other (Parker, Van Alstyne, Rochet, Tirole research, page 19)

## When to use

- Designing OS, app-store, or developer-platform strategies
- Building marketplaces where breadth-of-supply is the user draw
- Diagnosing why building complements (apps, integrations) is the right wedge into a platform-dominated category
- Strategy for incumbents to defend against single-feature competitors who lack complement breadth

## When NOT to use

- Pure communication / messaging products (direct NE applies)
- Single-side audience products (Sarnoff law applies)
- Products where one user genuinely creates direct value for same-side users (use direct framing)
- Categories where complements are not portable across competitors (the indirect effect doesn't transfer)

## Common pitfalls

- Believing the indirect effect will start itself — it almost never does; deliberate subsidy is required
- Optimizing same-side metrics (sellers, developers) without watching complement breadth on the other side
- Letting one side commoditize away while the other commoditizes (race to the bottom on both sides)
- Underestimating the role of curation — indirect effects collapse without quality control on the complementary side
- Confusing "two distinct user groups" with indirect effect — the effect only exists if same-side users benefit *via* the other side

## Key metrics

- **Complementary inventory breadth** — # apps, listings, SKUs, drivers per category
- **Cross-side uptake** — % of one side that consumes the other within a period
- **Supply concentration** — top-10 share of supply; high concentration is fragility
- **Multi-homing prevalence** — how many users / sellers use competing platforms
- **Time to first transaction** — proxy for chicken-and-egg severity

## Decision questions

- Are we genuinely indirect, or is this a direct or two-sided effect mislabeled?
- Which side bears the cold-start subsidy, and is the LTV math defensible?
- How do we measure complement breadth as a leading indicator of network health?
- Where does asymptote hit — at what level of complement breadth does marginal addition stop mattering?
- Are we curating the complementary side adequately to prevent quality collapse?

## Canonical examples

- **Microsoft Windows + developers** — more Windows apps attracts more users, attracting more developers (page 34, 48)
- **Apple App Store / Google Play** — apps × users two-sided indirect (page 19, 62)
- **eBay sellers** — new sellers raise competition but widen catalog, ultimately raising buyer demand (page 34)
- **Visa / Mastercard / Amex** — cardholders × merchants payment network (page 49)
- **YouTube creators × viewers** — more creators = more content = more viewers = more creators
- **OS platforms** Android, Linux, macOS (page 48)

## Related concepts

- [[Network Effects]] — _parent_
- [[Direct Network Effect]] — _contrast_
- [[Two-Sided Network Effect]] — _see_also_ (the cross-side direct cousin)
- [[Multilateral Platform]] — _amplifies_
- [[Marketplace Business Model]] — _amplifies_
- [[Cold-Start Playbook]] — _see_also_
- [[Asymmetric Supply-Demand Acquisition]] — _see_also_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Two-Sided Network Effect]] — _auto_ (score 11.8: tags×4.0, applicable_to×3.0, title×3.0, category×0.8, alias×1.0)
- [[Direct Network Effect]] — _auto_ (score 8.8: tags×2.0, applicable_to×1.0, title×3.0, category×0.8, alias×2.0)
- [[Local Network Effect]] — _auto_ (score 7.8: tags×2.0, applicable_to×1.0, title×3.0, category×0.8, alias×1.0)
- [[Negative Network Effects]] — _auto_ (score 7.5: tags×2.0, applicable_to×2.0, title×1.5, alias×2.0)
- [[Negative Network Effect Curation Tactics]] — _auto_ (score 7.0: tags×2.0, applicable_to×2.0, title×3.0)
- [[Data Network Effect]] — _auto_ (score 6.8: tags×2.0, title×3.0, category×0.8, alias×1.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Network_Effects-queqlx-2]] — pages 23-24 (indirect definition), page 34 (indirect vs cross-side), page 48 (examples and OS platforms)
