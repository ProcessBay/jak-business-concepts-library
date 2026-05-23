---
type: atom
title: Monthly Recurring Revenue
aliases: [monthly subscription revenue, recurring monthly income, monthly recurring sales]
category: metrics
tags:
  - saas
  - metrics
  - recurring-revenue
  - finance
  - growth
sources:
  - [[Business Model Metrics Pereira 2022]]
source_pages: "62–67"
---

# Monthly Recurring Revenue

## Definition

Monthly Recurring Revenue (MRR) is the normalized, predictable revenue a subscription business generates each month from its active customer base. It is the foundational financial metric for SaaS and subscription businesses, providing a stable and standardized view of revenue that smooths out seasonal spikes and irregular sales.

## Key attributes

- **Formula:** MRR = ARPA (Average Revenue Per Account) × Total Number of Customer Accounts for the month.
- **Normalization:** MRR converts annual, quarterly, or multi-year contracts into a monthly equivalent to create consistency.
- **Not GAAP/IFRS:** Major accounting standards do not recognize MRR, yet investors and operators rely on it heavily because of its predictive power.
- **Granularity:** Can be tracked at company, division, team, or individual sales-rep level.
- **Complements:** ARR (Annual Recurring Revenue) = MRR × 12; Net MRR = New MRR + Expansion MRR − Churned MRR − Contraction MRR.

## When to use

- Financial forecasting and budgeting — MRR stability makes forward revenue projection easier.
- Growth-trend analysis — tracking MRR over time reveals whether growth is accelerating, decelerating, or plateauing.
- Sales performance measurement — individual and team quotas tied to net-new MRR.
- Investor reporting — publicly traded SaaS companies routinely disclose MRR/ARR.

## When NOT to use

- Do not treat MRR as cash in the bank — it is a normalized metric, not a cash-flow statement.
- Do not use MRR for businesses with no recurring component (purely transactional models).
- Do not ignore MRR churn — gross MRR growth can mask high churn that threatens sustainability.

## Common pitfalls

- Counting one-time fees (setup, implementation, consulting) as MRR — these are non-recurring and should be separated.
- Including trials or free users in MRR — only count paying subscribers.
- Confusing MRR with recognized revenue — accounting standards may spread recognition differently.
- Over-optimizing for MRR growth without watching churn — a leaky bucket is still a leaky bucket.

## Key metrics


| Metric | Formula | Why It Matters |
|--------|---------|----------------|
| MRR | ARPA × Customer count | Baseline recurring revenue |
| ARR | MRR × 12 | Annualized view for investors |
| Net MRR Growth | New + Expansion − Churn − Contraction | True growth after losses |
| MRR Churn | Churned MRR / Beginning MRR | Revenue leakage rate |

## Decision questions

1. What portion of our MRR is from new customers vs. expansion vs. existing base?
2. Is our MRR growing faster than our customer count (indicating upsell success)?
3. How much MRR churn are we experiencing, and which segment drives it?
4. If we raised prices by 10%, what would the MRR impact be net of churn?
5. Are we counting any non-recurring revenue in MRR that distorts our projections?

## Canonical examples

- **SaaS investor reporting** — MRR is the first figure investors check month-to-month because it signals momentum faster than GAAP revenue (Pereira, p. 63).
- **Multi-tier pricing** — companies offering multiple price tiers can track MRR contribution by tier, revealing which packages drive the most predictable revenue (Pereira, p. 64).
- **Netflix MRR model** — by normalizing across global subscriber bases with varying currencies and billing cycles, Netflix maintains a unified MRR view for forecasting (implied in Pereira's normalization discussion, p. 64).

## Related concepts

- [[Customer Acquisition Cost]] — the cost to generate each dollar of MRR
- [[Customer Lifetime Value]] — total value a customer delivers over their MRR-paying lifespan
- [[Churn Rate]] — the enemy of MRR; every churned customer reduces the recurring base
- [[Subscription Business Model]] — the commercial model MRR measures
- [[Value-Based Pricing]] — pricing architecture that directly shapes MRR expansion
