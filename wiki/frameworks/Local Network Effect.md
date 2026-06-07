---
type: atom
title: Local Network Effect
aliases: [Local Network Effects, Geographic Network Effect, Density Network Effect]
category: framework
applicable_to: [marketplaces, ride-sharing, food_delivery, home_services, dating, community_apps, hyperlocal]
key_metrics: [density_per_geography, retention_by_market_age, match_rate_per_market, time_to_match_per_market, unit_economics_per_market]
related:
  - "specializes: Network Effects"
  - "see_also: Two-Sided Network Effect"
  - "amplifies: Marketplace Business Model"
  - "see_also: Critical Mass"
  - "see_also: Tinder Local-Density Anti-Pattern"
sources: [_Sources/Network_Effects-queqlx-2]
source_pages: "52-53,54,71"
tags: [network_effects, local, geography, density, hyperlocal, marketplaces]
created: 2026-06-02
---

# Local Network Effect

## Definition

A local network effect is one whose value accrues only to users within a bounded geography, cluster, or interest community — not to the global network. Pereira: "A regional network is a group of people who have come together because they share the same medium (interest, socio-economic class, or physical location). The network will be more resistant to outside threats as a result." Ride-sharing, dating, home services, food delivery, and hyperlocal social all show this pattern: a million Uber drivers in Tokyo don't help a rider in Karachi. The strategic implication is that liquidity must be reached *city by city, ZIP by ZIP, or category by category*, and growth, retention, and unit-economics metrics must be measured per market — never as a national average that hides weak markets behind strong ones.

## Key attributes

- **Bounded scope** — value confined to a geography, cluster, or interest community
- **Per-market liquidity threshold** — each market needs to cross critical mass independently
- **Retention by market age** — older / more established markets retain better than new ones
- **Defensive on home turf** — strong local networks resist global competitors (Didi vs Uber in China)
- **Vulnerable to local entry** — a new entrant can attack one city at a time without facing the global moat
- **Density > volume** — 1,000 users in one city beats 100,000 spread thinly
- **Unit economics improve with market age** — CAC drops, retention rises, take-rate sustainable

## When to use

- Building marketplaces or platforms where the user interacts only with nearby supply/demand
- Designing the launch sequence — choose cities deliberately rather than spraying
- Diagnosing why national CAC/retention dashboards are misleading
- Allocating marketing spend by market maturity rather than uniformly

## When NOT to use

- Products where users interact globally (Twitter, email, most SaaS)
- Pure data / content networks where geography is incidental
- Categories where regulation makes local-only operation economically nonviable

## Common pitfalls

- Reporting a global average that hides per-market weakness — Pereira's #1 warning sign
- Expanding cities before existing ones hit liquidity — capital drains, no city defensible
- Failing to recognize the Tinder anti-pattern — global growth that doesn't help local match density
- Subsidizing the wrong side per market — driver subsidy works in Lagos, rider subsidy in San Francisco
- Treating power-users from mature markets as predictive of new-market cohorts
- Underestimating local competitors — they only need to win one ZIP to draw blood

## Key metrics

- **Density per geography** (riders/km², hosts/neighborhood, daters/zip)
- **Per-market match rate / time-to-match**
- **Per-market unit economics** — CAC, retention, take-rate per cohort by market age
- **Retention by market age** — older markets should show better retention curves
- **Organic share of new users per market** — should rise with maturity
- **Power-user / L7-L30 curves per market** — leading indicator of liquidity

## Decision questions

- What is our *unit of local density* — city, ZIP, neighborhood, category, school?
- What's the per-unit liquidity threshold, and which markets cross it?
- Are we measuring per-market metrics or hiding behind a national average?
- Which markets to launch next, given limited capital — and what's the kill criterion for failing ones?
- How do mature-market unit economics compare to new-market — and what's the steady-state?

## Canonical examples

- **Uber, Lyft** — per-city ride matching; the 5-minute wait threshold is local (pages 41, 50, 71)
- **Airbnb** — per-city hosts × per-city travelers; LA listings irrelevant to a Tokyo guest (pages 43, 77)
- **Tinder** — local dating; global users do nothing for local match density (page 54)
- **Care.com, Angie's List, Thumbtack** — per-city service providers; cited as local NE archetypes (pages 71, 75)
- **OpenTable** — local restaurants × local diners (page 67-68)
- **Nextdoor** — embedded local curation, deliberately neighborhood-bounded (page 80)
- **Frank social-borrowing** — local trust circles cap value at ~7 people (page 40-41)

## Related concepts

- [[Network Effects]] — _parent_
- [[Two-Sided Network Effect]] — _see_also_ (local NE typically rides on a two-sided base)
- [[Critical Mass]] — _see_also_ (must be reached per local unit)
- [[Marketplace Business Model]] — _amplifies_
- [[Cold-Start Playbook]] — _see_also_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Indirect Network Effect]] — _auto_ (score 7.8: tags×2.0, applicable_to×1.0, title×3.0, category×0.8, alias×1.0)
- [[Two-Sided Network Effect]] — _auto_ (score 7.8: tags×2.0, applicable_to×2.0, title×3.0, category×0.8)
- [[Network Density and Clustering]] — _auto_ (score 7.5: tags×4.0, applicable_to×1.0, title×1.5, alias×1.0)
- [[Data Network Effect]] — _auto_ (score 6.8: tags×2.0, title×3.0, category×0.8, alias×1.0)
- [[Negative Network Effects]] — _auto_ (score 6.5: tags×2.0, applicable_to×1.0, title×1.5, alias×2.0)
- [[Negative Network Effect Curation Tactics]] — _auto_ (score 6.0: tags×2.0, applicable_to×1.0, title×3.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Network_Effects-queqlx-2]] — pages 52-53 (local NE definition), page 54 (Tinder case study), page 71 (retention by geography for Care.com, Angie's List)
