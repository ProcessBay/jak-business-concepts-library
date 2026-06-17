---
type: atom
title: Customer Lifetime Value
aliases: [CLV, CLTV, LTV, Lifetime Value, Customer Lifetime Value (CLV)]
category: metric
applicable_to: [SaaS, B2B, B2C, subscription, ecommerce, services, telecom]
key_metrics: [ARPU, churn_rate, average_customer_lifespan, gross_margin]
related:
  - "amplifies: LTV to CAC Ratio"
  - "depends_on: Churn Rate"
  - "depends_on: Average Revenue Per Account"
  - "see_also: Customer Acquisition Cost"
  - "see_also: CAC Payback Period"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "91-96,169"
tags: [metric, ltv, clv, unit_economics, retention, saas, subscription]
created: 2026-06-16
---

# Customer Lifetime Value

## Definition

Customer Lifetime Value (CLV, also CLTV or LTV) is the total revenue a business can reasonably expect to receive from a single customer account over the duration of the relationship. Pereira frames it as the comparison of a client's revenue value against expected customer lifetime — a customer that stays longer becomes more valuable. The simplest formula: **CLV = ARPU × Average Customer Lifespan**, or equivalently **CLV = ARPU ÷ Churn Rate**. CLV is the foundation of subscription economics — it sets the ceiling on what you can rationally spend to acquire a customer (CAC).

## How to calculate

Pereira gives two equivalent formulas (page 93):
- **CLV = ARPU × Average Customer Lifespan** (where ARPU = MRR ÷ Total Current Users)
- **CLV = ARPU ÷ Churn Rate**

**Worked example.** A SaaS firm has ARPU of $50/month and monthly churn of 2%.
- Average customer lifespan = 1 ÷ 0.02 = 50 months
- CLV = $50 × 50 = **$2,500**

For higher-fidelity calculations, multiply by gross margin to get contribution-margin CLV (the version investors care about):
- **CLV (margin-adjusted) = (ARPU × Gross Margin %) ÷ Churn Rate**

## When to use

- Sizing customer acquisition budgets (CLV sets the ceiling on CAC)
- Comparing customer segments to identify which cohorts are most valuable
- Forecasting long-term revenue from the current installed base
- Evaluating subscription/recurring-revenue businesses where lifespan matters
- Diagnosing whether retention investments will pay off (high-churn businesses can't compound LTV)

## When NOT to use

- One-time-purchase businesses with no measurable repeat behavior
- Very early-stage startups where churn and lifespan estimates are pure guesswork
- When churn is non-stationary (CLV assumes a steady-state churn rate; rapidly changing churn invalidates the formula)
- As a standalone metric without comparing to CAC — high CLV with higher CAC is still unprofitable

## Common pitfalls

- **Using revenue instead of gross profit** — CLV on top-line revenue overstates actual customer value; investors expect contribution-margin CLV
- **Averaging across all customers** — hides cohort and segment differences; high-LTV whales mask low-LTV deadweight
- **Stale churn assumption** — using last-year's churn when current cohorts are churning differently
- **Treating CLV as future revenue** — it's expected, not guaranteed; only realized when the customer stays
- **Ignoring discount rate** — strict NPV-CLV discounts future cash flows; the simple formula doesn't
- **Confusing ARPU and ARPA** — Average Revenue Per User vs. Per Account; one customer may have many accounts

## Benchmarks

- **LTV:CAC ratio ≥ 3:1** is the canonical healthy threshold (Pereira p. 138)
- **B2B SaaS** typical CLV: thousands to tens of thousands of dollars per account
- **Consumer subscription** typical CLV: tens to low hundreds of dollars
- World-class subscription businesses achieve **negative net churn**, which mathematically pushes CLV toward infinity (expansion outweighs cancellations)

## Decision questions

- What's our ARPU, and is it growing through expansion or stagnating?
- What's our true churn rate by cohort (not blended)?
- Does our CLV exceed CAC by at least 3×?
- Where are we leaking CLV — onboarding, value delivery, support, or pricing?
- Are we measuring CLV on revenue or on gross margin?

## Canonical examples

- **Mobile phone subscribers and music subscription customers** — classic long-lived CLV examples (page 92)
- **Amazon and McDonald's** — increase CLV via upselling and cross-selling (page 95)
- **SaaS firms** — CLV is the headline metric for valuation and growth investing (pages 91-96)

## Related concepts

- [[LTV to CAC Ratio]] — _amplifies_ (the canonical health check)
- [[Customer Acquisition Cost]] — _see_also_ (the cost side of the equation)
- [[CAC Payback Period]] — _see_also_ (time dimension of CAC recovery)
- [[Churn Rate]] — _depends_on_ (churn is the denominator in the simple LTV formula)
- [[Average Revenue Per Account]] — _depends_on_ (ARPU/ARPA is the numerator)
- [[Customer Retention Tactics (Pereira)]] — _see_also_ (levers that raise CLV)
- [[Subscription Business Model]] — _see_also_ (the model where CLV matters most)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 91-96 (definition, importance, calculation, improvement levers), page 169 (ARPC variant)
