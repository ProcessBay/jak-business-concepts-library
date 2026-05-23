---
type: atom
title: Direct vs Indirect Network Effects
aliases: [direct network effects, indirect network effects, network effect comparison]
category: platform-economics
tags:
  - network-effects
  - platform-strategy
  - marketplace
  - defensibility
sources:
  - [[Source Network Effects Pereira 2022]]
source_pages: "22–25, 44–48"
---

# Direct vs Indirect Network Effects

## Definition

Network effects describe how a product or service becomes more valuable as more people use it. The distinction between *direct* and *indirect* network effects is foundational to platform strategy because it determines user-acquisition logic, pricing dynamics, and competitive moat durability.

- **Direct network effects** occur when an increase in users on the *same side* of a network directly increases value for all existing users. The classic example is the telephone: each new phone subscriber makes the network more valuable for every other subscriber. Social media (Facebook, WhatsApp) and personal utility networks (iMessage) exhibit direct effects.
- **Indirect network effects** (also called cross-side effects) occur when growth on *one side* of a multi-sided network increases value for users on the *other side*, but not necessarily for users on the same side. In a two-sided marketplace like eBay, more sellers increase competition among sellers (negative same-side effect) but dramatically improve selection for buyers, which indirectly benefits all sellers by drawing more demand.

## Key attributes

- Direct effects are strongest in homogeneous networks where every node serves the same purpose (e.g., telephony, messaging).
- Indirect effects dominate in heterogeneous networks with distinct producer and consumer roles (e.g., marketplaces, app platforms).
- Same-side effects can be positive (Windows file compatibility) or negative (Lyft driver congestion).
- Cross-side effects are typically positive up to an asymptote: more Uber drivers help riders until wait times fall below ~4–5 minutes, after which marginal drivers add little value.

## When to use

- Designing platform architecture and deciding which side of a marketplace to subsidize first.
- Explaining to investors or partners why "more users" is not a generic growth story—it must map to a specific side and direction of value creation.
- Diagnosing why a marketplace feels "stuck": often one side has weak indirect effects because the other side is not growing.

## When NOT to use

- Do not use this framework to justify spending indiscriminately on both sides of a marketplace. Asymmetry matters: one side is usually harder to acquire.
- Do not assume direct effects automatically create winner-take-all outcomes. Asymptotic limits and multi-tenanting can erode that moat.

## Common pitfalls

- Confusing virality with network effects. A viral TikTok video spreads fast but does not become more valuable to each viewer as more people watch it.
- Confusing economies of scale with network effects. Apple's iPhone manufacturing scale lowers unit costs; iMessage's value rises because more friends own iPhones.
- Ignoring negative same-side effects. Adding too many drivers or hosts can degrade experience unless the platform curates quality.

## Key metrics

- Organic vs. paid user ratio by side
- Cross-side conversion rate (e.g., buyer activation per new seller)
- Asymptote detection: wait time, match rate, or relevance scores plateauing

## Decision questions

1. Is our network homogeneous (one user type) or heterogeneous (multiple distinct roles)?
2. Which side of our network is the scarce side, and what is our plan to acquire it first?
3. At what network size do our cross-side effects asymptote, and what is our next value proposition beyond liquidity?
4. Are we seeing negative same-side effects that require curation or throttling?
5. Can users multi-tenant (use us and a competitor simultaneously), and if so, what locks them to our network?

## Canonical examples

- **Telephone / WhatsApp** — direct physical/personal utility network effects. Value rises with each additional node because the product is communication itself (Pereira, pp. 44–47).
- **eBay / Airbnb** — indirect two-sided marketplace effects. More sellers alone do not help sellers; more buyers do, which then loops back (Pereira, pp. 48–49).
- **Lyft driver congestion** — negative same-side network effect. Additional drivers beyond a threshold increase competition without improving rider experience (Pereira, p. 34).

## Related concepts

- [[Two-Sided Network Effects]] — deeper dive into marketplace and platform dynamics
- [[Critical Mass]] — the threshold at which network effects become self-sustaining
- [[Negative Network Effects and Curation]] — managing degradation at scale
- [[Network Effects Metrics]] — measuring strength and directionality
