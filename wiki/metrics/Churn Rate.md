---
type: atom
title: Churn Rate
aliases: [customer churn, churn percentage, revenue churn]
category: metrics
tags:
  - saas
  - metrics
  - retention
  - unit-economics
  - subscription
sources:
  - [[Business Model Metrics Pereira 2022]]
source_pages: "90, 116–121"
---

# Churn Rate

## Definition

Churn rate is the percentage of customers or revenue lost during a specific time period. It is the inverse of retention and one of the most critical metrics for any subscription or recurring-revenue business. Even small changes in churn have outsized impacts on Customer Lifetime Value (CLV) and company valuation.

## Key attributes

- **Customer churn:** % of customers who cancel or fail to renew in a period.
- **Revenue churn (gross):** % of recurring revenue lost from cancellations or downgrades.
- **Net revenue churn:** Revenue lost minus revenue gained from expansions/upsells in the same period. Negative net churn (expansion > losses) is the gold standard.
- **Voluntary vs. involuntary:** Voluntary churn = active cancellation; involuntary churn = payment failure, expired cards, dunning failures.
- **Cohort churn:** Tracking churn by acquisition cohort reveals whether newer or older customers are more loyal.

## When to use

- Monthly board and investor reporting.
- Diagnosing product-market fit — high churn often signals poor fit.
- Prioritizing retention investments — improving churn by 1% can increase revenue by 6%+ in subscription models.
- Segment analysis — which customer types, geographies, or acquisition channels churn most?

## When NOT to use

- Do not compare churn across industries without context — B2C mobile apps churn at very different rates than enterprise SaaS.
- Do not treat churn as purely a customer-success problem; product, pricing, and onboarding all drive it.

## Common pitfalls

- Ignoring involuntary churn — often 20–40% of total churn is preventable billing failure.
- Using aggregate churn that hides segment differences.
- Confusing customer churn with revenue churn — a few high-value customers churning can hurt revenue more than many low-value ones.

## Key metrics


| Metric | Formula | Why It Matters |
|--------|---------|----------------|
| Customer Churn | Churned customers / Total customers at start | Base retention indicator |
| Gross Revenue Churn | Lost MRR / Starting MRR | Revenue leakage |
| Net Revenue Churn | (Lost − Expansion) MRR / Starting MRR | Gold standard; negative = growth from base |
| Logo Churn | Churned accounts / Total accounts | Account-level health |

## Decision questions

1. What portion of our churn is voluntary vs. involuntary?
2. Which cohorts have the highest churn, and what do they have in common?
3. How does our churn rate compare to industry benchmarks?
4. What is the revenue impact of a 1% churn reduction?
5. Are we seeing expansion revenue offset churn (negative net churn)?

## Related concepts

- [[Customer Lifetime Value]] — churn is the primary destroyer of CLV
- [[Monthly Recurring Revenue]] — churn directly reduces MRR
- [[Customer Acquisition Cost]] — high churn means CAC is wasted
- [[Net Promoter Score]] — satisfaction predicts future churn
- [[Subscription Business Model]] — the model most exposed to churn risk
- [[Subscription Revenue Cycle]] — retention is Step 4 of the cycle
