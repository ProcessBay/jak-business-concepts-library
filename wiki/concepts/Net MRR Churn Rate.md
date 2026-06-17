---
type: atom
title: Net MRR Churn Rate
aliases: [Net MRR Churn, Net Revenue Churn, Net Dollar Churn, Net MRR Churn Rate]
category: metric
applicable_to: [SaaS, subscription, B2B]
key_metrics: [churn_MRR, expansion_MRR, contraction_MRR, total_MRR, negative_churn]
related:
  - "specializes: Churn Rate"
  - "depends_on: Monthly Recurring Revenue"
  - "see_also: Net Revenue Retention"
  - "see_also: SaaS Quick Ratio"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "125-128"
tags: [metric, churn, net_churn, mrr, saas, subscription, retention]
created: 2026-06-16
---

# Net MRR Churn Rate

## Definition

Net MRR Churn Rate measures the percentage of monthly recurring revenue lost from cancellations and downgrades, **after accounting for expansion revenue** from existing customers (upgrades, cross-sells, add-ons). Pereira distinguishes it sharply from gross churn — net MRR churn can be **negative**, which means expansion from existing customers exceeds the revenue lost to churn and downgrades. Negative net MRR churn is the holy grail of SaaS: the customer base grows revenue even without acquiring a single new logo.

## How to calculate

Pereira's formula (page 126):
- **Net MRR Churn Rate = ((Churned MRR − Expansion MRR) ÷ Total MRR at Start of Month) × 100**

**Worked example 1 (positive net churn).** Total MRR $20,000; Churned MRR $4,000; Expansion MRR $1,900.
- Net MRR Churn = (($4,000 − $1,900) ÷ $20,000) × 100 = ($2,100 ÷ $20,000) × 100 = **10.5%**

**Worked example 2 (negative net churn).** Same setup but Expansion MRR = $7,000 (page 127):
- Net MRR Churn = (($4,000 − $7,000) ÷ $20,000) × 100 = (−$3,000 ÷ $20,000) × 100 = **−15%**

Negative result = the business grew revenue from the existing base; this is what unicorns are built on.

## When to use

- The headline retention metric for any expansion-driven SaaS business
- Diagnosing whether your installed base is a growth engine or a leaky bucket
- Investor reporting — negative net MRR churn is a powerful pitch signal
- Identifying expansion levers — upsell, cross-sell, seat expansion, usage growth
- Sanity-checking gross churn — high gross churn can be masked by strong expansion (not always healthy)

## When NOT to use

- Pure-acquisition businesses where there's no expansion motion (consumer subscription with flat pricing)
- Pre-PMF startups where the customer base is too small to compute meaningfully
- Usage-based businesses where "expansion" and "churn" blur month-to-month (use a smoothed multi-month variant)
- When you need a leading indicator — net MRR churn lags; it tells you what happened, not what's coming

## Common pitfalls

- **Reporting gross churn as "churn"** — without the expansion offset, you understate the business's true retention story; without breaking it out, you hide structural problems
- **Confusing Net MRR Churn with Net Revenue Retention** — NRR = 1 + (−Net MRR Churn); the two are mirror images on different axes
- **Including new MRR in expansion** — only revenue from EXISTING customers counts as expansion
- **Including reactivations in expansion** — reactivations are new MRR, not expansion
- **Negative net churn complacency** — even with negative net churn, high gross churn signals product-value problems with specific segments
- **Failed credit cards counted as churn** — Pereira notes 20-40% of SaaS MRR "churn" is actually failed payments; dunning recovers most (page 127)

## Benchmarks

- **> 5%/month** — alarming; the base is shrinking fast
- **1-5%/month** — typical for SMB SaaS
- **< 1%/month** — strong; enterprise SaaS norm
- **0% (flat)** — expansion fully offsets churn; the base is self-sustaining
- **Negative (< 0%)** — Pereira's "most successful companies" zone; the business compounds without new logos
- **NRR equivalents:** 110%+ = good; 120%+ = excellent; 130%+ = world-class (Snowflake-tier)

## Decision questions

- Is our net MRR churn negative, near zero, or positive — and what's the trend?
- What's the gross churn breakdown — voluntary vs involuntary (failed payments)?
- Where is expansion coming from — pricing, seats, usage, upsells, cross-sells?
- Which segments drive expansion? Which drive churn?
- Are we recovering failed-payment "churn" via dunning?

## Canonical examples

- **The negative net churn unicorn** — Pereira's −15% example shows what world-class looks like (page 127)
- **Failed credit cards** — 20-40% of SaaS MRR churn is recoverable via dunning (page 127)
- **The 10.5% baseline case** — Pereira's positive net churn example (page 126)

## Related concepts

- [[Churn Rate]] — _specializes_ (Churn Rate covers gross; Net MRR Churn nets out expansion)
- [[Monthly Recurring Revenue]] — _depends_on_ (the denominator)
- [[SaaS Quick Ratio]] — _see_also_ (combines net churn and new MRR into a single growth signal)
- [[Customer Lifetime Value]] — _see_also_ (negative net churn pushes CLV toward infinity)
- [[Customer Success Management]] — _see_also_ (the function that drives expansion and prevents churn)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 125-128 (definition, importance, formula, benchmarks, reduction levers, failed-payment recovery)
