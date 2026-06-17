---
type: atom
title: Churn Rate
aliases: [Churn, Customer Churn, Revenue Churn, Logo Churn]
category: metric
applicable_to: [B2B, B2C, SaaS, subscription, telecom, services]
key_metrics: [logo_churn_monthly, revenue_churn_monthly, gross_churn, net_churn, churn_cohort_curves]
related:
  - "amplifies: Customer Lifetime Value"
  - "contrasts_with: Retention Rate"
  - "see_also: Net Revenue Retention"
sources: [_Sources/Subscription-Business-Model-3-69w1ze]
source_pages: "72"
tags: [metric, churn, retention, subscription, unit_economics]
created: 2026-05-23
---

# Churn Rate

## Definition

Churn Rate is the percentage of customers (or revenue) lost over a given period (typically monthly or annual). Pereira frames it as one of the most critical metrics in subscription businesses — small changes compound dramatically. **Logo Churn** counts customers who cancel; **Revenue Churn** counts revenue lost. A business with 5% monthly churn loses ~46% of customers in a year. World-class B2B SaaS targets <0.5-1% monthly churn; consumer apps often run 5-10% monthly. **Net Churn** subtracts expansion revenue from churned revenue — negative net churn (expansion exceeds losses) means the business grows even without new customers.

## Key attributes

- **Two primary types** — Logo Churn (customer count) and Revenue Churn (revenue lost)
- **Compounding effect** — monthly churn compounds dramatically over a year
- **Gross vs. Net** — Gross Churn ignores expansion; Net Churn subtracts expansion (can be negative)
- **Cohort-sensitive** — newest customers churn higher than tenured; analyze by cohort
- **Predictive signal** — churn often telegraphs months in advance via engagement metrics
- **Different benchmarks per category** — B2B SaaS <1%/mo; consumer subscription 5-10%/mo

## When to use

- Diagnostic for subscription business health
- Cohort analysis to identify at-risk segments
- Pricing decisions (churn rises when value-price mismatches)
- Customer success investment justification (low churn = high LTV)
- Investor pitch / due diligence

## When NOT to use

- For pure transactional businesses where customers buy once
- As a single-number summary (always break down by cohort, segment, reason)
- In isolation without retention curves and engagement context

## Common pitfalls

- Reporting only logo churn while revenue churn is higher (e.g., enterprise customers leaving)
- Failing to distinguish voluntary churn (cancellation) from involuntary (payment failure)
- Ignoring churn until it compounds (3% monthly = 30% annual losses)
- Confusing growth with low churn (rapid acquisition can mask high churn)
- Optimizing for short-term churn metrics that hurt long-term value

## Key formulas

- **Logo Churn (monthly)** = Customers Lost in Month / Customers at Start of Month
- **Revenue Churn (monthly)** = Revenue Lost / Revenue at Start of Month
- **Gross Revenue Churn** = (MRR Lost + MRR Contracted) / Starting MRR
- **Net Revenue Churn** = Gross Revenue Churn − MRR Expansion from existing customers
- **Annual Churn approximation** = 1 − (1 − Monthly Churn)^12

## Decision questions

- What's our monthly logo and revenue churn, and how do they trend?
- What's our churn by cohort, segment, plan tier?
- What's our churn cause analysis (payment, value, competition)?
- Could we move from gross to net negative churn via expansion?
- What's the gap between voluntary and involuntary churn?

## Canonical examples

- **Best-in-class B2B SaaS** — <0.5% monthly logo churn (Slack, Datadog historically)
- **World-class consumer subscription** — 2-3% monthly churn (Netflix at peak)
- **Subscription box average** — 10-30% monthly churn
- **Blue Apron** — high churn was a fundamental challenge (page 11 in source)

## Related concepts

- [[Customer Lifetime Value]] — _amplifies_ (LTV depends critically on churn)
- [[Retention Rate]] — _contrasts_with_ (Retention = 1 - Churn)
- [[Net Revenue Retention]] — _see_also_
- [[Subscription Business Model]] — _see_also_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Customer Success Management]] — _auto_ (score 9.0: tags×4.0, applicable_to×4.0, alias×1.0)
- [[Customer Retention Tactics (Pereira)]] — _auto_ (score 7.0: tags×2.0, applicable_to×4.0, alias×1.0)
- [[Customer Success Anti-Patterns]] — _auto_ (score 7.0: tags×2.0, applicable_to×4.0, alias×1.0)
- [[Customer Success Manager Role]] — _auto_ (score 7.0: tags×2.0, applicable_to×4.0, alias×1.0)
- [[Customer Success Strategy 8 Pillars]] — _auto_ (score 7.0: tags×2.0, applicable_to×4.0, alias×1.0)
- [[GTM KPIs]] — _auto_ (score 6.8: tags×2.0, applicable_to×4.0, category×0.8)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Subscription-Business-Model-3-69w1ze]] — page 72 (Six Metrics All Subscription Businesses Should Track)
