---
type: atom
title: Negative Network Effect Curation Tactics
aliases: [Network Curation Playbook, Curation Strategies, Anti-Pollution Tactics, Five Curation Modes]
category: tactic
applicable_to: [social, marketplaces, platforms, two_sided, content_platforms, B2C]
key_metrics: [signal_to_noise_ratio, bad_actor_removal_rate, content_quality_score, churn_at_size_thresholds, moderation_cost_per_user]
related:
  - "see_also: Negative Network Effects"
  - "see_also: Network Effects"
  - "see_also: Cold-Start Playbook"
  - "see_also: Hidden Network Effects"
sources: [_Sources/Network_Effects-queqlx-2]
source_pages: "80-82"
tags: [tactic, playbook, network_effects, curation, moderation, quality_control, anti_pollution]
created: 2026-06-02
---

# Negative Network Effect Curation Tactics

## Definition

Negative network effects (congestion and pollution) emerge in nearly every mature network and, left unmanaged, can collapse the value the network spent years building. Pereira identifies five curation modes that founders can deploy — alone or in combination — to counteract them: **embedded curation** (limits built into the product structure itself), **user-controlled curation** (filters, lists, mute/block, friend categories), **manual curation** (operator-driven moderation and enforcement), **community curation** (peer ratings, votes, likes, reports), and **automated curation** (algorithmic ranking and filtering from behavioral + community signals). Each has distinct strengths, weaknesses, and timing — manual works early when scale is low; automated requires a maturity threshold; community requires active engagement; embedded is built in from day one. Mature networks usually run all five concurrently.

## Key attributes

- **Five distinct modes** — embedded, user-controlled, manual, community, automated
- **Timing matters** — manual is early-stage; automated requires liquidity to feed signals; embedded must be designed in
- **Curation slows growth deliberately** — trade growth speed for network durability
- **Combine, don't substitute** — mature networks (Facebook, Airbnb) use all five concurrently
- **Verticalized (embedded) often outperforms horizontal** — Nextdoor's neighborhood limit vs Facebook's open graph
- **Trade-offs** — manual scales poorly, community can be manipulated, automated can be opaque
- **Bad-actor specific** — different patterns work against trolls, spammers, scammers, low-quality supply

## When to use

- Designing a new network — bake in embedded curation from day one
- Mature network seeing engagement / retention decline — diagnose which negative effect dominates and deploy matching mode(s)
- Two-sided marketplaces with growing supply quality variance — community + automated curation
- Communities approaching pollution thresholds (feed clutter, signal-to-noise decline)

## When NOT to use

- Pre-critical-mass networks where curation friction will starve growth
- Networks small enough that pollution / congestion are theoretical
- Categories where curation is legally / structurally prohibited

## Common pitfalls

- **Relying on community curation alone in early stages** — too few signals, easily gamed
- **Skipping manual curation because "it doesn't scale"** — early manual catches set the cultural norms that all later modes ride on
- **Over-automating** — opaque ranking drives user distrust and accusations of bias
- **Cosmetic filters** — user-controlled tools that look helpful but don't actually reduce noise
- **Letting bad actors persist** — trust collapse is faster than trust building (Pereira repeated emphasis)
- **One-size curation** — congestion and pollution require different responses; using one mode for both fails

## Key metrics

- **Signal-to-noise ratio** in primary feed (impressions engaged / total impressions)
- **Bad-actor identification and removal rate** — true-positive vs false-positive
- **Content / supply quality score** trajectory over time
- **Moderation cost per active user** — should fall as automated takes over
- **Churn at size thresholds** — does it disappear after curation deployment?
- **Reports per active user** — leading indicator of trust health

## Decision questions

- Which curation mode(s) match our network type and stage?
- Are we using manual moderation early to set norms automated systems can later inherit?
- What embedded structure (verticalization, limits, gating) is built into the product itself?
- How do we measure curation effectiveness — and trigger escalation when it fails?
- What's the kill switch if a bad-actor pattern overwhelms our current curation mode?

## Canonical examples

- **Embedded** — **Nextdoor** (neighborhood-only); **Mapbox** (passive crowdsourcing with controlled inputs) (page 80)
- **User-controlled** — **Deliveroo / Uber Eats** (cuisine, price filters); **Airbnb** (location, budget, amenities filters); **Facebook friend lists** (page 81)
- **Manual** — early-stage moderation, content removal, enforced rules (page 81)
- **Community** — ratings, likes, shares, reports (page 82)
- **Automated** — **Facebook News Feed ranking**; **Airbnb Superhost program**; **Uber Eats restaurant ranking algorithm** (page 82)
- **Multi-mode at scale** — Facebook, Airbnb, YouTube run all five concurrently
- **Google's spam fight** — manual + automated curation chapter case (page 53)

## Related concepts

- [[Negative Network Effects]] — _see_also_ (the problem these tactics solve)
- [[Network Effects]] — _see_also_
- [[Cold-Start Playbook]] — _see_also_ (curation paired with seeding)
- [[Hidden Network Effects]] — _see_also_ (throttling is an embedded-curation variant)
- [[Two-Sided Network Effect]] — _see_also_
- [[Critical Mass]] — _see_also_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Negative Network Effects]] — _auto_ (score 14.0: tags×4.0, applicable_to×5.0, title×3.0, alias×2.0)
- [[Cold-Start Playbook]] — _auto_ (score 12.8: tags×6.0, applicable_to×4.0, category×0.8, alias×2.0)
- [[Asymmetric Supply-Demand Acquisition]] — _auto_ (score 9.8: tags×6.0, applicable_to×3.0, category×0.8)
- [[Network Effects vs Virality vs Economies of Scale]] — _auto_ (score 7.5: tags×2.0, applicable_to×4.0, title×1.5)
- [[Critical Mass]] — _auto_ (score 7.0: tags×2.0, applicable_to×4.0, alias×1.0)
- [[Direct Network Effect]] — _auto_ (score 7.0: tags×2.0, applicable_to×2.0, title×3.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Network_Effects-queqlx-2]] — pages 80-82 (five curation modes chapter), page 53 (Google spam case), pages 33-35 (negative NE context)
