---
type: atom
title: CAC Payback Period
aliases: [Payback Period, CAC Payback, Customer Payback Period, Months to Recover CAC]
category: metric
applicable_to: [SaaS, B2B, B2C, subscription, marketplaces]
key_metrics: [CAC, MRR, ARPA, gross_margin_percent, average_cost_of_service]
related:
  - "depends_on: Customer Acquisition Cost"
  - "depends_on: Monthly Recurring Revenue"
  - "complements: LTV to CAC Ratio"
  - "see_also: SaaS Quick Ratio"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "137-139,168"
tags: [metric, payback, cac, unit_economics, cash_flow, saas]
created: 2026-06-16
---

# CAC Payback Period

## Definition

CAC Payback Period is the time it takes to recoup the cost of acquiring one new customer through their recurring payments, upsells, and cross-sells. Pereira's example: a customer that costs $100 to acquire and pays $12 per month has a payback period of 8.3 months. It's the cash-flow companion to LTV:CAC — even a beautiful LTV:CAC of 5:1 can wreck a business if payback takes 4 years. Two equivalent formulas: **CAC ÷ (MRR − ACS)** or **CAC ÷ (ARPA × Gross Margin %)**.

## How to calculate

Pereira's two formulas (page 138):
- **Payback Period = CAC ÷ (MRR − Average Cost of Service)** — months to recover CAC after servicing costs
- **Payback Period = CAC ÷ (ARPA × Gross Margin %)** — the margin-adjusted version investors prefer

**Worked example.** Pereira's basic case (page 137):
- CAC = $100, monthly revenue per customer = $12
- Payback = $100 ÷ $12 = **8.3 months**

**Margin-adjusted example.** CAC = $1,000, ARPA = $200/month, Gross Margin = 75%:
- Payback = $1,000 ÷ ($200 × 0.75) = $1,000 ÷ $150 = **6.7 months**

## When to use

- Cash-flow planning — payback tells you when each customer turns from cash drain to cash generator
- Pitching investors — short payback (< 12 months) is a strong scalability signal
- Comparing acquisition channels — channels with shorter payback should get more budget
- Sanity-checking LTV:CAC — a healthy ratio with a long payback can still strangle cash
- Diagnosing growth-stage capital needs — long payback periods require deeper growth funding

## When NOT to use

- One-time-purchase businesses (payback is instant — meaningless construct)
- Very-early-stage startups where CAC and MRR are too volatile to compute stable payback
- Land-and-expand models where Year-1 revenue dramatically understates Year-3 revenue (use expansion-adjusted variant)
- Free/freemium products until paying-customer behavior stabilizes

## Common pitfalls

- **Ignoring gross margin** — payback on revenue ignores the cost of servicing; the margin-adjusted formula is the real one
- **Using ARPU/ARPA without expansion** — for expansion-heavy businesses, payback on initial ARPA is pessimistic
- **Mismatched CAC and revenue periods** — CAC lands in Q1, revenue trickles over years; lookback windows must be consistent
- **MRR churn ignored** — Pereira notes that high MRR churn prolongs the payback period (page 137); a "12-month payback" assumes the customer is still there at month 12
- **Optimizing for short payback at the cost of LTV** — short-payback channels often produce low-LTV customers

## Benchmarks

- **< 12 months** — strong; most healthy SMB SaaS targets this
- **12-18 months** — acceptable for mid-market SaaS
- **18-24 months** — defensible for enterprise SaaS with high-LTV accounts
- **> 24 months** — capital-intensive; requires deep growth funding and high investor patience
- Pereira notes that even a 3:1 LTV:CAC ratio becomes problematic if payback is long (page 138)

## Decision questions

- What's our payback period using margin-adjusted formula, not revenue?
- Does it match our cash runway — can we afford the payback wait at current spend?
- How does payback vary by segment and channel?
- Is MRR churn extending our effective payback beyond the nominal calculation?
- Can we shorten payback via upsells (page 138), pricing changes, or customer retention?

## Canonical examples

- **Pereira's anchor case** — $100 CAC, $12/month customer, 8.3-month payback (page 137)
- **SaaS investor benchmark** — < 12 months payback is the standard pitch-deck claim
- **The improvement levers** — Pereira lists three (page 138): increase Average Order Value via upsell/cross-sell, reduce customer churn, and the same levers that improve LTV:CAC

## Related concepts

- [[Customer Acquisition Cost]] — _depends_on_ (the numerator)
- [[Monthly Recurring Revenue]] — _depends_on_ (the denominator)
- [[LTV to CAC Ratio]] — _complements_ (LTV:CAC gives the magnitude; payback gives the timing)
- [[SaaS Quick Ratio]] — _see_also_ (growth-vs-churn companion)
- [[Average Revenue Per Account]] — _see_also_ (ARPA × margin is the cash-generation rate)
- [[Net MRR Churn Rate]] — _see_also_ (churn extends effective payback)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 137-139 (definition, why it matters, two formulas, how to reduce), page 168 (subscription model context)
