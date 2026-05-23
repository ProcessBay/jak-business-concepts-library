---
type: atom
title: Customer Acquisition Cost
aliases: [CAC, cost per customer acquisition, customer acquisition expenses]
category: metrics
tags:
  - saas
  - metrics
  - acquisition
  - unit-economics
  - growth
sources:
  - [[Business Model Metrics Pereira 2022]]
source_pages: "57–60"
---

# Customer Acquisition Cost

## Definition

Customer Acquisition Cost (CAC) is the total cost of marketing and sales efforts required to acquire a single new customer. It is a critical unit-economics metric that directly impacts profitability and scalability. When compared to Lifetime Value (LTV) or Monthly Recurring Revenue (MRR), CAC reveals whether a company is running efficiently.

## Key attributes

- **Formula:** CAC = Total Marketing & Sales Spend / Number of New Customers Acquired in the same period.
- **Scope:** Includes salaries, tools, ad spend, content production, events, and commissions.
- **Time lag matters:** CAC is backward-looking. A lead generated in Q1 may convert in Q2, so aligning spend and customer timing is important.
- **Blended vs. paid:** Blended CAC includes organic; paid CAC isolates spend on paid channels.
- **Investor lens:** Investors use CAC to assess scalability. They care more about present, provable numbers than future promises.

## When to use

- Evaluating marketing channel efficiency (which channel delivers customers cheapest?).
- Justifying sales and marketing budgets to leadership or investors.
- Setting CAC payback targets (common benchmark: <12 months for SaaS).
- Benchmarking against industry norms (varies widely by sector and model).

## When NOT to use

- Do not use CAC in isolation — it must be paired with LTV, retention, and payback period to be meaningful.
- Do not compare CAC across radically different business models (enterprise SaaS vs. B2C mobile app) without normalizing for deal size and sales cycle.
- Do not optimize CAC alone at the expense of customer quality — cheap customers who churn quickly destroy value.

## Common pitfalls

- Ignoring sales and marketing salaries in CAC (counting only ad spend).
- Using blended CAC to hide rising paid CAC — organic share may be masking channel deterioration.
- Comparing CAC to revenue instead of gross margin — a customer must pay back the *margin*, not just top-line revenue.
- Chasing CAC reduction without monitoring lead quality; cheaper leads often convert worse and churn faster.

## Key metrics


| Metric | Formula | Why It Matters |
|--------|---------|----------------|
| Blended CAC | Total S&M / New customers | Overall acquisition efficiency |
| Paid CAC | Paid S&M / New customers from paid | Channel-specific efficiency |
| CAC Payback Period | CAC / (ARPU × Gross Margin) | Time to recover acquisition cost |
| LTV:CAC Ratio | LTV / CAC | Value created per dollar spent |

## Decision questions

1. Are we counting all costs — salaries, tools, overhead — or just ad spend?
2. Is our CAC payback period under 12 months? Under 6?
3. Which channel has the lowest CAC, and which has the highest LTV:CAC?
4. If we doubled marketing spend, would CAC rise linearly, or are we seeing diminishing returns?
5. Are our "cheap" acquisition channels bringing customers who retain and expand?

## Canonical examples

- **SaaS CAC benchmarks** — B2B SaaS CAC can range from hundreds to tens of thousands depending on ACV; the key is keeping CAC payback under 12 months (Pereira, p. 58).
- **Adobe's shift to subscription** — by lowering upfront prices through monthly subscriptions, Adobe expanded its addressable market and spread CAC recovery across many billing cycles (Pereira, p. 58).
- **CRM and sales-enablement tools** — investing in Salesforce or Gainsight does not instantly reduce CAC, but over time streamlines funnel management and improves conversion quality (Pereira, p. 59).

## Related concepts

- [[Customer Lifetime Value]] — CAC's essential counterpart for unit economics
- [[Monthly Recurring Revenue]] — the recurring stream that must pay back CAC
- [[Lead Velocity Rate]] — a leading indicator that predicts future CAC efficiency
- [[Freemium Conversion Metrics]] — freemium as a CAC-reduction strategy
- [[Go-to-Market Strategy]] — channel choices that determine CAC structure
