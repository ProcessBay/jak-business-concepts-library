---
type: atom
title: Customer Lifetime Value
aliases: [CLV, LTV, Customer Value, Lifetime Customer Value]
category: metrics
tags:
  - saas
  - metrics
  - unit-economics
  - retention
  - growth
sources:
  - [[Business Model Metrics Pereira 2022]]
source_pages: "91–96"
---

# Customer Lifetime Value

## Definition

Customer Lifetime Value (CLV or LTV) is the total revenue a business can reasonably expect from a single customer account over the entire duration of the relationship. It is the counterweight to Customer Acquisition Cost (CAC): together they define whether a unit-economics model is viable.

## Key attributes

- **Formula (simple):** CLV = Average Revenue Per Account × Gross Margin × Average Customer Lifespan.
- **Formula (advanced):** CLV = (ARPA × Gross Margin) / Customer Churn Rate.
- **Time horizon:** Most SaaS businesses calculate CLV over 3–5 years; shorter for transactional models.
- **Expansion revenue:** Best-in-class companies include upsell and cross-sell in CLV, not just initial contract value.
- **Discounting:** For precision, future revenue should be discounted to present value.

## When to use

- Determining how much to spend on acquisition — the LTV:CAC ratio should generally exceed 3:1.
- Segmenting customers — high-CLV segments deserve more retention investment.
- Pricing and packaging decisions — understanding value delivered informs pricing power.
- Board and investor conversations — CLV demonstrates long-term revenue potential.

## When NOT to use

- Do not use CLV for very early-stage companies with insufficient retention data — the churn estimate will be speculative.
- Do not compare CLV across businesses with different cost structures without adjusting for gross margin.
- Do not treat CLV as a fixed number; it changes with product improvements, pricing changes, and competitive dynamics.

## Common pitfalls

- Ignoring gross margin — a customer generating $10K revenue at 50% margin is very different from one at 90% margin.
- Using aggregate churn for all segments — enterprise and SMB customers often have wildly different lifespans.
- Overstating CLV by including non-recurring services (implementation, training).
- Failing to update CLV as cohort data matures — early estimates rarely survive contact with reality.

## Key metrics


| Metric | Formula | Why It Matters |
|--------|---------|----------------|
| Simple CLV | ARPA × Margin × Lifespan | Quick directional estimate |
| CLV via churn | (ARPA × Margin) / Churn | More robust for subscription models |
| LTV:CAC Ratio | CLV / CAC | Viability signal; target > 3:1 |
| Payback Period | CAC / (ARPA × Margin) | Time to recover acquisition investment |

## Decision questions

1. Are we calculating CLV at the customer segment level, or hiding variation with an aggregate number?
2. Does our LTV:CAC ratio exceed 3:1? If not, which lever (pricing, retention, CAC) should we pull?
3. Are we including expansion revenue and churned-reactivation revenue in CLV?
4. How sensitive is our CLV to a 1% change in monthly churn?
5. Which customer behaviors correlate with higher CLV, and can we acquire more of those customers?

## Canonical examples

- **LTV:CAC as investor gate** — investors routinely reject SaaS businesses with LTV:CAC below 3:1, regardless of growth rate (Pereira, p. 92).
- **Retention as CLV lever** — improving retention by just 5% can increase CLV by 25–95% depending on the model, making retention often the highest-ROI investment (Pereira, p. 93).
- **Adobe Creative Cloud** — by shifting from perpetual licenses to subscriptions, Adobe dramatically increased CLV by extending customer relationships and enabling ongoing upsell (Pereira, p. 93).

## Related concepts

- [[Customer Acquisition Cost]] — CLV's essential counterpart; together they define unit economics
- [[Monthly Recurring Revenue]] — the recurring stream from which CLV is derived
- [[Churn Rate]] — the primary variable that destroys CLV
- [[Net Promoter Score]] — customer satisfaction as a leading indicator of CLV
- [[Subscription Revenue Cycle]] — the operating loop that generates and sustains CLV
