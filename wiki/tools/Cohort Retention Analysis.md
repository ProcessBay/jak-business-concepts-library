---
type: atom
title: Cohort Retention Analysis
aliases: [Cohort Analysis, Retention Cohorts, Cohort Curves]
category: tactic
applicable_to: [B2B, B2C, SaaS, subscription, e_commerce, consumer_apps]
key_metrics: [month_N_retention, cohort_LTV, cohort_curve_shape, time_to_stabilization]
related:
  - "amplifies: Churn Rate"
  - "amplifies: Customer Lifetime Value"
  - "see_also: SaaS Business Model"
  - "see_also: Customer Feedback Loop"
sources: [_Sources/Super-Guide-SaaS-Business-Model-4-xnexrn]
source_pages: "59-61"
tags: [tactic, cohort, retention, analytics, methodology]
created: 2026-05-23
---

# Cohort Retention Analysis

## Definition

Cohort Retention Analysis groups customers by a shared characteristic (typically signup month) and tracks each group's behavior over time, revealing whether retention is improving or degrading across acquisition periods. Rather than aggregating all customers into a single metric (which masks problems), cohort analysis shows how the January 2024 cohort behaves at Month 1, Month 6, Month 12 — and compares it to the January 2023 cohort at the same ages. Pereira frames it as essential for diagnosing SaaS health: aggregate retention can look stable while new cohorts are silently churning faster.

## Key attributes

- **Group by acquisition period** — usually monthly signup cohorts
- **Track per-cohort metric over time** — retention, revenue, engagement, etc.
- **Compare cohorts at same age** — apples-to-apples (Month 3 vs Month 3)
- **Reveals trends invisible in aggregates** — newer cohorts churning faster is a critical signal
- **Three primary purposes** — diagnose retention; measure product/marketing changes; understand new customers
- **Visual format** — typically a triangle table (cohorts as rows, age in months as columns)

## When to use

- Diagnosing SaaS health or any subscription business
- Measuring impact of product changes, pricing changes, or new acquisition channels
- Understanding whether customer quality is improving over time
- Investor pitch — cohort curves are highly persuasive when they look good
- Customer success prioritization (which cohorts need intervention)

## When NOT to use

- For one-time purchase businesses where retention is moot
- When customer counts per cohort are too small for statistical reliability (<50 per cohort)
- As a substitute for qualitative insight (cohort curves show WHAT, not WHY)

## Common pitfalls

- Reading aggregate retention as cohort retention (very different)
- Cherry-picking favorable cohorts in presentations
- Failing to account for seasonality in cohorts
- Mixing too many variables (new product feature + new marketing campaign simultaneously)
- Stopping at Month 12 when the real story is Month 24+ (especially for B2B SaaS)

## How to build cohort analysis

1. **Start with a goal and question** — what are you trying to learn?
2. **Define the metrics and data needed** — usually retention %, optionally revenue
3. **Perform the analysis** — typically via SQL on event data; tools like Mixpanel, Amplitude, Heap automate
4. **Study the data** — look for: improving cohorts, degrading cohorts, where each cohort stabilizes

## Key metrics per cohort

- Month N retention % (% of cohort still active)
- Cohort LTV (revenue per customer over cohort lifetime)
- Cohort curve shape (rapid drop then flat = product-market fit; continuous drop = no PMF)
- Time-to-stabilization (when does the curve flatten?)

## Decision questions

- Is our newest cohort retaining better or worse than older cohorts?
- Where do cohort curves stabilize (and does that ceiling rise over time)?
- Which acquisition channel's cohorts perform best?
- What product change correlates with cohort retention improvement (or degradation)?
- For at-risk cohorts: what intervention could change the curve?

## Canonical examples

- **Strong PMF cohort curve** — drops in first few weeks then flattens (Slack, Notion, many SaaS)
- **Weak PMF cohort curve** — continuous gradual decline; never stabilizes (most failed startups)
- **Improving cohorts over time** — each new cohort retains better than the previous (product-market fit deepening)

## Related concepts

- [[Churn Rate]] — _amplifies_ (cohort retention IS the inverse of churn over time)
- [[Customer Lifetime Value]] — _amplifies_ (LTV calc depends on retention curve)
- [[SaaS Business Model]] — _see_also_
- [[Customer Feedback Loop]] — _see_also_ (cohort + qualitative = full picture)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Competitive Product Analysis]] — _auto_ (score 7.2: tags×2.0, applicable_to×3.0, title×1.5, category×0.8)
- [[Feature Matrix Analysis]] — _auto_ (score 7.2: tags×2.0, applicable_to×3.0, title×1.5, category×0.8)
- [[Customer Feedback Loop]] — _auto_ (score 6.8: tags×4.0, applicable_to×2.0, category×0.8)
- [[Loyalty Program]] — _auto_ (score 6.8: tags×4.0, applicable_to×2.0, category×0.8)
- [[Piecemeal MVP]] — _auto_ (score 6.8: tags×2.0, applicable_to×4.0, category×0.8)
- [[Pricing Psychology]] — _auto_ (score 6.8: tags×2.0, applicable_to×4.0, category×0.8)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Super-Guide-SaaS-Business-Model-4-xnexrn]] — pages 59-61 (Customer Retention Cohort Analysis)
