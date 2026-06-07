---
type: atom
title: Metcalfe's Law
aliases: [Metcalfe Law, N-Squared Network Value, Network Value Law]
category: principle
applicable_to: [telecom, social_networks, marketplaces, communication_platforms, B2C, B2B]
key_metrics: [active_nodes_N, pair_connections_N_squared, value_per_user, density]
related:
  - "see_also: Network Effects"
  - "see_also: Reed's Law"
  - "contrast: Sarnoff's Law"
  - "amplifies: Direct Network Effect"
  - "see_also: Critical Mass"
sources: [_Sources/Network_Effects-queqlx-2]
source_pages: "18-19,35-36"
tags: [principle, network_effects, law, valuation, communication, theory]
created: 2026-06-02
---

# Metcalfe's Law

## Definition

Metcalfe's Law states that the value of a communication network grows proportionally to the square of the number of connected users (N²), while the cost grows only linearly (N). Coined by Robert Metcalfe, co-inventor of Ethernet and co-founder of 3Com, in the early 1980s as a sales argument for Ethernet cards: each card added expanded the count of possible pair-connections quadratically, so the *value* of the network compounded much faster than its *cost*. Pereira: "the cost of the network went up with the number of cards installed, but the value of the network went up with the square of the number of users." The law was originally framed for symmetric peer communication (Ethernet, fax, telephone) and was later extended — loosely — to social networks and online marketplaces.

## Key attributes

- **Value ∝ N²** — the count of unique pair-connections in a network of N nodes is N(N−1)/2
- **Cost ∝ N** — linear; each additional node has a fixed marginal cost
- **Symmetric peer-comms assumption** — assumes every node can transact with every other
- **Originated as a sales argument** — Metcalfe used it to sell networking cards, not as a rigorous economic law
- **Often overestimates real value** — Odlyzko/Briscoe/Tilly (2006) argue real value scales N·log(N) due to weak ties
- **Underestimated by Sarnoff, overtaken by Reed** — sits in the middle of the three classical "laws"
- **Generalizes only loosely beyond peer-comms** — for broadcast (Sarnoff) and group-forming (Reed), different exponents apply

## When to use

- Sizing the value-versus-cost case for a peer-communication network (messaging, email, fax, telephony)
- Investor narratives explaining why a network with 2× users may be 4× as valuable
- Quick back-of-envelope to test whether a product's value scales faster than its cost
- Distinguishing your network from broadcast products (Sarnoff) when justifying premium valuation

## When NOT to use

- Pure broadcast / audience products (use Sarnoff's linear N framing)
- Group-forming / cluster-rich networks (Reed's 2^N is more accurate)
- Two-sided marketplaces — the symmetric-peer assumption breaks; cross-side matching matters more
- Asymptotic networks where additional users add no value past a threshold (Lyft post 5-min wait)
- Single-user products

## Common pitfalls

- Mistaking N² for an actual valuation multiple — it is a scaling intuition, not a price
- Counting registered users instead of *active connected* nodes — dormant accounts don't transact
- Ignoring negative network effects (congestion, pollution) that flatten the N² curve in practice
- Applying it to broadcast products where the symmetric-peer assumption is false
- Using it to defend valuations of networks that have already asymptoted

## Key metrics

- **Active nodes (N)** — not registered; not MAU; *actively connected*
- **Pair-connections** — N(N−1)/2 as a theoretical ceiling
- **Per-user value** — should grow with √(value) ≈ N for healthy networks
- **Density** — actual links / possible links; closer to 1 means N² better reflects reality
- **Decay-corrected N** — adjusted for dormant accounts

## Decision questions

- Is our product genuinely a peer-comms network where any pair can transact?
- What fraction of theoretical pair-connections are actually realized?
- Have we asymptoted — past which point N² overstates real value?
- Should we be using Sarnoff (broadcast), Reed (group-forming), or a hybrid law?
- What negative effects (spam, congestion) are dragging the curve below N²?

## Canonical examples

- **Ethernet** — Metcalfe's original sales context; cards × pair-connections (page 18)
- **Telephone networks** — Theodore Vail used a Metcalfe-like argument in 1908 to justify Bell's monopoly (page 18)
- **Fax** — universally cited textbook case
- **Early email networks** — N² peer-pair connectivity
- **Social networks (loose application)** — Facebook, Twitter; Pereira notes the law was "expanded to encompass social networks and online marketplaces" (page 36)

## Related concepts

- [[Network Effects]] — _see_also_ (the law is a quantitative model of NE)
- [[Reed's Law]] — _see_also_ (group-forming variant, 2^N)
- [[Sarnoff's Law]] — _contrast_ (broadcast variant, linear N)
- [[Direct Network Effect]] — _amplifies_ (symmetric peer-comms is the canonical direct NE)
- [[Critical Mass]] — _see_also_
- [[Asymptotic Network Effects]] — _see_also_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Reed's Law]] — _auto_ (score 16.2: tags×10.0, applicable_to×2.0, title×1.5, category×0.8, alias×2.0)
- [[Network Effects]] — _auto_ (score 9.8: tags×4.0, applicable_to×2.0, category×0.8, alias×3.0)
- [[Negative Network Effects]] — _auto_ (score 6.0: tags×2.0, applicable_to×3.0, alias×1.0)
- [[Network Effects vs Virality vs Economies of Scale]] — _auto_ (score 6.0: tags×2.0, applicable_to×3.0, alias×1.0)
- [[Data Network Effect]] — _auto_ (score 5.0: tags×2.0, applicable_to×2.0, alias×1.0)
- [[Direct Network Effect]] — _auto_ (score 5.0: tags×2.0, applicable_to×2.0, alias×1.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Network_Effects-queqlx-2]] — pages 18-19 (history, Metcalfe and Ethernet), pages 35-36 (formal statement among the three laws)
