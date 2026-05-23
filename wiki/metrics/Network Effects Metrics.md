---
type: atom
title: Network Effects Metrics
aliases: [network dynamics metrics, platform growth metrics, marketplace liquidity metrics]
category: metrics
tags:
  - network-effects
  - metrics
  - platform-economics
  - growth
  - retention
sources:
  - [[Source Network Effects Pereira 2022]]
source_pages: "66–76"
---

# Network Effects Metrics

## Definition

Network effects metrics are the diagnostic tools that measure whether a platform or marketplace is actually benefiting from network dynamics—or merely accumulating users who do not create value for each other. These metrics span acquisition, engagement, marketplace liquidity, and economics, providing a framework to assess network health, predict defensibility, and guide resource allocation.

## Key attributes

- **Acquisition metrics** track organic vs. paid mix, traffic sources, and time-series CAC. Rising organic share indicates strengthening network effects.
- **Engagement metrics** include retention cohorts, core action retention, dollar retention, and power-user curves (L7/L30 histograms). Improving cohort retention as the network matures is a hallmark of true network effects.
- **Marketplace metrics** measure liquidity: match rate, market depth, time to find a match, and concentration/fragmentation of supply and demand.
- **Economics metrics** capture pricing power and unit economics evolution as network density increases.
- **Competitor-related metrics** include multi-tenanting prevalence and switching/multi-homing costs.

## When to use

- Board reporting or investor updates to demonstrate network-driven moat (not just growth).
- Deciding when to reduce paid acquisition—rising organic share and falling CAC suggest network effects are kicking in.
- Diagnosing "leaky bucket" problems: low match rates or high multi-tenanting indicate weak network lock-in.

## When NOT to use

- Do not use these metrics for pure SaaS businesses without network components—traditional SaaS metrics (CAC payback, LTV/CAC) suffice.
- Do not compare marketplace metrics across radically different categories (ride-sharing vs. hiring) without normalizing for transaction frequency and value.

## Common pitfalls

- Confusing virality with network effects. A high viral coefficient without retention improvement does not indicate sustainable network value.
- Measuring aggregate metrics that hide local weakness. Global DAU/MAU can rise while specific cities remain below critical mass.
- Ignoring supply-side fragmentation. Over-concentration in top sellers or buyers creates dependency risk.

## Key metrics


| Category | Metric | Why It Matters |
|----------|--------|----------------|
| Acquisition | Organic vs. paid users | Rising organic % = network effects driving adoption |
| Acquisition | Time-series paid CAC | Should decline post-critical mass |
| Competitor | Prevalence of multi-tenanting | High multi-tenanting = weak lock-in |
| Competitor | Switching costs | Measured by onboarding time, data/content investment |
| Engagement | User retention cohorts | Older cohorts should retain better as network grows |
| Engagement | Power-user curves (L7/L30) | Shift to higher-frequency buckets over time |
| Marketplace | Match rate | % of demand matched to supply |
| Marketplace | Market depth | Inventory available without price impact |
| Marketplace | Time to find a match | Speed of liquidity realization |
| Marketplace | Concentration/fragmentation | Top 10% suppliers' share of volume |
| Economics | Pricing power | Ability to raise prices without churn |
| Economics | Unit economics by market age | Older/denser markets should show better margins |

## Decision questions

1. Is our organic user share increasing as the network grows, or are we still dependent on paid acquisition?
2. Do retention cohorts improve with network age, or are we seeing flat/churning behavior?
3. What is our match rate, and how does it vary by geography or category?
4. How many of our users are multi-tenanting with competitors, and what would raise switching costs?
5. Are we seeing pricing power emerge in mature markets, or are we still competing purely on price?

## Canonical examples

- **Facebook organic growth** — as the network expanded, users invited friends organically, reducing reliance on paid acquisition; organic share became a leading indicator of network health (Pereira, p. 66).
- **OpenTable** — concentrated demand on one platform made customer acquisition cheaper over time, unlike ride-sharing where driver multi-tenanting kept CAC high (Pereira, p. 67).
- **Care.com retention by geography** — users in Charlotte retained better as local babysitter density increased; NYC density did not help Charlotte users, demonstrating the importance of local network metrics (Pereira, p. 71).
- **Uber/Lyft match rates** — measured as driver time with passengers vs. idle; high match rates indicate efficient liquidity (Pereira, p. 72).

## Related concepts

- [[Critical Mass]] — the threshold these metrics help identify
- [[Direct vs Indirect Network Effects]] — understanding which user interactions the metrics should track
- [[Two-Sided Network Effects]] — cross-side metrics for marketplace liquidity
- [[Negative Network Effects and Curation]] — metrics for when growth degrades experience
