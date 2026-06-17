---
type: atom
title: Monthly Recurring Revenue
aliases: [MRR, Monthly Recurring Revenue (MRR), Normalized Monthly Revenue]
category: metric
applicable_to: [SaaS, subscription, B2B, B2C, services]
key_metrics: [new_MRR, expansion_MRR, contraction_MRR, churn_MRR, net_new_MRR, ARR, ARPA]
related:
  - "amplifies: Annual Recurring Revenue"
  - "depends_on: Average Revenue Per Account"
  - "see_also: Net MRR Churn Rate"
  - "see_also: SaaS Quick Ratio"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "62-67,171-172"
tags: [metric, mrr, revenue, saas, subscription, forecasting]
created: 2026-06-16
---

# Monthly Recurring Revenue

## Definition

Monthly Recurring Revenue (MRR) is the predictable, recurring revenue a subscription business expects to generate each month, normalized across all pricing plans and payment periods. Pereira notes that while GAAP and IASB don't recognize MRR formally, it's the most important metric for subscription businesses — it converts every plan variant (monthly, annual, multi-year) into a single comparable monthly number. The simplest formula: **MRR = ARPA × Number of Customer Accounts**. MRR decomposes into five flows: New, Expansion, Contraction, Churned, and Reactivated — analyzing the mix matters more than the headline number.

## How to calculate

Pereira's formula (page 64):
- **MRR = ARPA × Total Customer Accounts**

**Worked example.** ARPA = $270/month and 2,000 customers:
- MRR = $270 × 2,000 = **$540,000**

**Decomposed (Net New MRR):**
- **Net New MRR = New MRR + Expansion MRR − Contraction MRR − Churned MRR**

This decomposition is what drives the SaaS Quick Ratio and Net MRR Churn calculations.

## When to use

- The headline operating metric for any subscription business — boards, investors, and operators all track it
- Forecasting near-term revenue (MRR × 12 = ARR run rate)
- Decomposing growth — is the business growing via new logos, expansion, or both?
- Aligning sales compensation — quotas tied to New MRR or Net New MRR
- Tracking individual contributor performance (Pereira notes MRR is often used for division/team/individual scorecards, page 63)

## When NOT to use

- One-time-purchase businesses with no recurring revenue stream
- Usage-based businesses where revenue is genuinely volatile month-to-month (consider Annualized Run Rate variants instead)
- Mixed-model businesses where recurring is a minority of revenue
- Very early stage where churn is too volatile to make MRR forecasting meaningful

## Common pitfalls

- **Including one-time fees in MRR** — setup fees, professional services, and one-off charges are NOT recurring; including them inflates MRR
- **Annual contracts counted as $X immediate, not $X/12 monthly** — annual ACV must be divided by 12 to land in MRR; otherwise you get bookings vs MRR confusion
- **Ignoring the decomposition** — a flat MRR with rising churn and rising new sales is a different (worse) business than flat MRR with stable churn
- **Treating MRR as cash** — MRR is recognized revenue; cash collection lags (annual prepayments inflate cash, monthly billing matches MRR)
- **Discounts not netted** — promotional pricing should reduce MRR by the discount amount; "list price MRR" overstates reality
- **Counting trial users** — only paying accounts count toward MRR

## Benchmarks

- **MRR Growth Rate** is the meaningful benchmark, not absolute MRR
- **T2D3** (triple, triple, double, double, double) is the venture standard for top-tier SaaS growth post-PMF
- **15-20% month-over-month growth** at early stage; **10-15%** at $1M ARR; **5-10%** at $10M ARR
- **Net New MRR** should consistently exceed Churned MRR (otherwise you're shrinking)

## Decision questions

- What's our Net New MRR trend — growing, flat, or declining?
- What share of growth comes from new logos vs. expansion?
- Is our MRR decomposition healthy (low churn, healthy expansion)?
- Are we including one-time fees? Annual contracts correctly normalized?
- What's our MRR-to-cash conversion timing?

## Canonical examples

- **Publicly-traded SaaS firms** disclose MRR/ARR as a primary metric (page 62)
- **Pereira's worked example** — $270 ARPA × 2,000 customers = $540,000 MRR (page 64)
- **MRR improvement levers** — Pereira lists six (pages 64-67): raise prices, add price tiers, increase prospects, expand upsell options, deliver what customers want, implement retention initiatives

## Related concepts

- [[Annual Recurring Revenue]] — _amplifies_ (MRR × 12)
- [[Average Revenue Per Account]] — _depends_on_ (the ARPA factor)
- [[Net MRR Churn Rate]] — _see_also_ (the leak side)
- [[SaaS Quick Ratio]] — _see_also_ (built from MRR decomposition)
- [[Customer Acquisition Cost]] — _see_also_ (MRR per customer drives payback)
- [[Subscription Business Model]] — _see_also_ (the model where MRR is the headline metric)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 62-67 (definition, importance, formula, six improvement levers), pages 171-172 (subscription model context)
