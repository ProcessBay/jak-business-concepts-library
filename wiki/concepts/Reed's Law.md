---
type: atom
title: Reed's Law
aliases: [Reed Law, Group-Forming Network Law, 2^N Network Value, Reed-Law Scaling]
category: principle
applicable_to: [social_networks, group_messaging, communities, clusters, B2C, B2B2C]
key_metrics: [active_clusters, sub_groups, clustering_coefficient, group_size_distribution, density]
related:
  - "see_also: Network Effects"
  - "see_also: Metcalfe's Law"
  - "contrast: Sarnoff's Law"
  - "amplifies: Direct Network Effect"
  - "see_also: Network Density and Clustering"
sources: [_Sources/Network_Effects-queqlx-2]
source_pages: "28,35-37"
tags: [principle, network_effects, law, valuation, group_forming, clustering, theory]
created: 2026-06-02
---

# Reed's Law

## Definition

Reed's Law, formulated by MIT professor David P. Reed in 1999, states that the value of a "group-forming network" — one that supports easy creation of subgroups, channels, or clusters — scales as 2^N, where N is the number of nodes. The intuition: the number of *possible* subgroups in a network of N members is 2^N − N − 1, which grows exponentially with N rather than quadratically (Metcalfe) or linearly (Sarnoff). Pereira: "Reed argued that 'group-forming networks' allow cluster formation… and scale value even faster than other networks." Reed's Law is the formal explanation for why platforms with rich subgroup primitives (Slack channels, Discord servers, Facebook Groups, WhatsApp groups, subreddits) appear so dramatically more valuable than flat peer-comms networks of the same node count.

## Key attributes

- **Value ∝ 2^N** — exponential in the number of nodes, driven by combinatorial subgroup formation
- **Requires group-forming primitives** — channels, lists, groups, communities, threads; flat networks don't qualify
- **Highest of the three classical laws** — exceeds both Metcalfe (N²) and Sarnoff (N) above modest N
- **Clustering coefficient matters** — Pereira: "A high-clustering network expands exponentially, while a low-clustering network grows slowly"
- **Theoretical ceiling, not realized value** — actual 2^N is impossible at internet scale; usable subgroups are a tiny fraction
- **Most often quoted to justify rich-community valuations** — Slack, Discord, Reddit, Meetup
- **Backed by network-science clustering literature** — connects to graph theory's clustering coefficient

## When to use

- Designing or analyzing community / group platforms (Slack, Discord, Circle, Reddit clones)
- Investor narrative explaining why a platform with sub-community features deserves premium valuation
- Strategic decision to add group-forming primitives to a flat social product
- Justifying retention durability of community-rich platforms

## When NOT to use

- Pure peer-comms (Metcalfe), broadcast (Sarnoff), or single-side audience products
- Networks where users don't actually form persistent subgroups (most marketplaces)
- Categories where clusters never reach combinatorial richness (small professional communities)
- As a literal valuation multiple — 2^N is intractable past N≈30; treat it as a *scaling intuition*, not a price

## Common pitfalls

- Treating 2^N as a literal financial multiple — it is a *theoretical* upper bound, never realized
- Adding "groups" cosmetically without genuine group-forming utility — Reed's Law requires real cluster formation
- Ignoring that real clustering coefficients are usually low — most users belong to few real groups
- Confusing community feel with combinatorial subgroup formation
- Letting subgroup proliferation dilute discoverability — fragmentation hurts more than it helps

## Key metrics

- **Active clusters / sub-groups** — count and median size
- **Clustering coefficient** — fraction of a node's neighbors that are also neighbors with each other
- **Group-size distribution** — Reed-Law value sits in mid-sized groups (Dunbar-ish ranges)
- **Cross-group participation** — users in multiple subgroups
- **Density** — actual links / possible links; high density boosts both Metcalfe and Reed values

## Decision questions

- Do users *actually* form persistent subgroups, or only consume content broadcast-style?
- Is our clustering coefficient high enough that the Reed framing is meaningful?
- What group-forming primitives are missing — channels, lists, threads, communities?
- Are we surfacing the right subgroups without fragmenting the network?
- How would a competitor without group-forming primitives realistically catch us?

## Canonical examples

- **Slack** — channels and DMs in countless team-defined subgroups
- **Discord** — servers, channels, voice rooms; canonical Reed-Law app
- **Facebook Groups** — Pereira's example of how Facebook extended past Metcalfe into Reed territory (page 28)
- **WhatsApp / Messenger group chats** — group-forming primitives layered on a peer-comms base
- **Reddit subreddits** — subgroups as the unit of value
- **Meetup, Mighty Networks, Circle** — explicitly group-forming social platforms
- **Open-Source communities** (GitHub, mailing-list communities) — subgroup-rich technical clusters

## Related concepts

- [[Network Effects]] — _see_also_
- [[Metcalfe's Law]] — _see_also_ (peer-comms variant, N²)
- [[Sarnoff's Law]] — _contrast_ (broadcast variant, linear N)
- [[Direct Network Effect]] — _amplifies_
- [[Network Density and Clustering]] — _see_also_
- [[Critical Mass]] — _see_also_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Metcalfe's Law]] — _auto_ (score 16.2: tags×10.0, applicable_to×2.0, title×1.5, category×0.8, alias×2.0)
- [[Network Effects]] — _auto_ (score 8.8: tags×4.0, applicable_to×2.0, category×0.8, alias×2.0)
- [[Network Density and Clustering]] — _auto_ (score 7.0: tags×4.0, applicable_to×2.0, alias×1.0)
- [[Hyper Scalability]] — _auto_ (score 5.8: tags×2.0, applicable_to×2.0, category×0.8, alias×1.0)
- [[Growing vs Scaling]] — _auto_ (score 4.8: tags×2.0, applicable_to×1.0, category×0.8, alias×1.0)
- [[Multiple Revenue Streams]] — _auto_ (score 4.8: tags×2.0, applicable_to×2.0, category×0.8)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Network_Effects-queqlx-2]] — page 28 (clustering and Reed's Law intuition), pages 35-37 (the three classical laws, Reed's formula and reasoning)
