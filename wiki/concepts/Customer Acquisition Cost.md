---
type: atom
title: Customer Acquisition Cost
aliases: [CAC, Cost of Acquisition, Cost Per Acquisition, CPA, Customer Acquisition Cost (CAC)]
category: metric
applicable_to: [SaaS, B2B, B2C, subscription, ecommerce, marketplaces, services]
key_metrics: [marketing_spend, sales_spend, new_customers_acquired, blended_CAC, paid_CAC]
related:
  - "amplifies: LTV to CAC Ratio"
  - "amplifies: CAC Payback Period"
  - "see_also: Customer Lifetime Value"
  - "see_also: Monthly Recurring Revenue"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "57-62,171,177,206,223-225,244"
tags: [metric, cac, unit_economics, acquisition, saas, subscription]
created: 2026-06-16
---

# Customer Acquisition Cost

## Definition

Customer Acquisition Cost (CAC) is the total cost of obtaining a new customer, including all sales and marketing expenses (people, programs, tools, even allocated property and equipment) divided by the number of customers acquired in that period. Pereira positions CAC as the metric investors use to assess a company's scalability and profitability — when compared with LTV or MRR, it reveals whether the business is running efficiently. CAC alone is meaningless; its diagnostic power comes from ratios (LTV:CAC, CAC Payback) and trend lines.

## How to calculate

Pereira's formula (page 58):
- **CAC = Total Sales & Marketing Spend ÷ Number of New Customers Acquired** (in the same period)

**Worked example.** A SaaS company spent $400,000 on sales and marketing in Q1 and acquired 200 new paying customers.
- CAC = $400,000 ÷ 200 = **$2,000 per customer**

**Variants:**
- **Blended CAC** — all spend divided by all new customers (includes organic/word-of-mouth wins; flatters the number)
- **Paid CAC** — paid-channel spend divided by paid-channel-attributed customers (the version that reflects real marginal cost of growth)
- **Fully-loaded CAC** — includes sales team salaries, CRM/tooling, BDR overhead (the version investors expect)

## When to use

- Pairing with LTV to assess unit economics (target LTV:CAC ≥ 3:1)
- Comparing acquisition channels to allocate budget toward the cheapest performers
- Pitching investors — CAC trend over time signals whether the business compounds or erodes
- Setting sales and marketing budgets — CAC × growth target = required spend
- Diagnosing growth-stage health: rising CAC at constant LTV is a red flag

## When NOT to use

- Pre-PMF startups where the customer base is too small to compute meaningful averages
- Brand-driven businesses where acquisition spend builds long-term equity not captured in current CAC
- Free or freemium products where "acquired customer" is ill-defined (use Trial Conversion Rate or activation metrics instead)
- When marketing serves multiple objectives (awareness + acquisition) and you can't cleanly attribute spend

## Common pitfalls

- **Excluding sales team costs** — gives a CAC that looks great but isn't real; B2B CAC must include sales salaries and commissions
- **Including organic wins in the denominator** — flatters blended CAC; paid CAC is the marginal-cost truth
- **Mismatched periods** — spend lands now, customers convert later; lookback windows must be honest
- **Ignoring channel mix** — a falling blended CAC may just mean organic share rose, not that paid got cheaper
- **Not segmenting by customer size** — enterprise CAC is 10-100× SMB CAC; blending them hides the model
- **Cheap CAC at the cost of quality** — content shifts that lower CAC may attract customers who can't afford the product (Pereira p. 61)

## Benchmarks

- **LTV:CAC ≥ 3:1** is the canonical healthy threshold (page 138)
- **CAC Payback < 12 months** for SMB SaaS; < 18-24 months for enterprise
- Pereira notes CAC varies enormously by sector — there is no universal CAC benchmark; what matters is CAC trend and the CAC:LTV relationship
- **Content marketing CAC** is often 30-50% of paid CAC at steady state (page 223)

## Decision questions

- Is our CAC trend stable, rising, or falling? Why?
- Are we measuring blended or paid CAC? Which one is the investor-relevant number?
- What's our payback period — when does CAC become profit?
- Which channels have the best CAC, and can we scale them without saturation?
- Are we including ALL sales and marketing costs, or hiding some?

## Canonical examples

- **SaaS firms** — CAC and LTV are the headline pair on every SaaS pitch deck (pages 57-62)
- **Investor framing** — investors assess scalability via CAC trends (page 58)
- **eCommerce** — CPA (cost per acquisition) is the variant term (page 244)
- **Content marketing** — CAC via content is the slow-build alternative to paid (pages 223-225)

## Related concepts

- [[Customer Lifetime Value]] — _see_also_ (the value side of the equation)
- [[LTV to CAC Ratio]] — _amplifies_ (the canonical health check)
- [[CAC Payback Period]] — _amplifies_ (the time dimension of CAC recovery)
- [[Monthly Recurring Revenue]] — _see_also_ (compared with CAC for SaaS efficiency)
- [[Lead Velocity Rate]] — _see_also_ (leading indicator of CAC pressure)
- [[Pricing Strategies for SaaS]] — _see_also_ (higher price points justify higher CAC)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 57-62 (definition, importance, who cares, improvement levers), page 171 (subscription context), pages 223-225 (content marketing CAC), page 244 (eCommerce CPA variant)
