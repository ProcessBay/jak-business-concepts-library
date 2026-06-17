---
type: atom
title: LTV to CAC Ratio
aliases: [LTV:CAC, LTV/CAC, LTV to CAC, LTV-CAC Ratio, Lifetime Value to Customer Acquisition Cost Ratio]
category: metric
applicable_to: [SaaS, B2B, B2C, subscription, ecommerce, marketplaces]
key_metrics: [LTV, CAC, ratio_target, payback_period]
related:
  - "depends_on: Customer Lifetime Value"
  - "depends_on: Customer Acquisition Cost"
  - "see_also: CAC Payback Period"
  - "see_also: SaaS Quick Ratio"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "133-137,167"
tags: [metric, ltv_cac, unit_economics, saas, subscription, ratio]
created: 2026-06-16
---

# LTV to CAC Ratio

## Definition

The LTV:CAC ratio compares the lifetime value of a customer to the cost of acquiring that customer. Pereira frames it as the single most important measure of acquisition efficiency — it tells you whether you're building a business or burning cash. The formula is brutally simple: **LTV:CAC = LTV ÷ CAC**. A ratio of 3:1 is the canonical healthy threshold; below 1:1 you're losing money on every customer; above 5:1 you're likely underinvesting in growth.

## How to calculate

Pereira's formula (page 135):
- **LTV:CAC = Customer Lifetime Value ÷ Customer Acquisition Cost**

**Worked example.** If LTV is $1,600 and CAC is $800:
- LTV:CAC = $1,600 ÷ $800 = **2:1** (or 2.0×) — below the healthy threshold; pricing, retention, or acquisition needs work

A second example (page 134): if LTV is $1,000 and you want a 10:1 ratio, you'd need CAC ≤ $100. Most businesses can't hit 10:1 — the math forces choices about which customers to chase.

## When to use

- The headline efficiency metric on any SaaS or subscription pitch deck
- Deciding whether to accelerate or decelerate acquisition spend
- Comparing customer segments — high-LTV:CAC segments deserve more pipeline investment
- Investor conversations — "the value of your customers is about four times the cost of acquisition" is a strong pitch (page 135)
- Sanity-checking pricing changes — raising price improves LTV without changing CAC, multiplying the ratio

## When NOT to use

- Pre-PMF startups where neither LTV nor CAC is stable enough to ratio meaningfully
- Land-and-expand models where Year-1 CAC is intentionally high to capture accounts that pay back over 5+ years (use payback period instead)
- When CLV is measured on revenue rather than contribution margin — the ratio looks artificially healthy
- Heavy-brand businesses where current-period CAC understates long-term acquisition value

## Common pitfalls

- **Revenue-LTV instead of margin-LTV** — using top-line revenue inflates the ratio; investors expect margin-adjusted LTV
- **Optimistic churn assumption** — early cohorts have artificially low churn (selection bias); using their numbers in LTV inflates the ratio
- **Blended CAC** — including organic wins in the denominator pulls CAC down and ratio up artificially
- **Ignoring payback period** — a 5:1 LTV:CAC with a 4-year payback can still kill cash flow (page 138)
- **Optimizing the ratio at the cost of growth** — a 10:1 ratio often signals underinvestment in acquisition; you're leaving market share for competitors

## Benchmarks

- **< 1:1** — losing money on every customer; usually a kill-or-pivot signal
- **1:1 to 3:1** — surviving but not thriving; business growth will be capital-constrained
- **3:1** — Pereira's stated "generally considered favorable" threshold (page 138)
- **3:1 to 5:1** — healthy zone where most successful SaaS businesses live
- **> 5:1** — often a signal to spend more on acquisition; you may be underinvesting in growth

## Decision questions

- What's our true LTV:CAC by segment, not blended?
- Are we using margin-LTV or revenue-LTV? Which one do our investors expect?
- If the ratio is healthy, why aren't we spending more on acquisition?
- If the ratio is weak, do we fix it via higher LTV (price, retention) or lower CAC (channel mix, conversion)?
- Does our payback period match the ratio's optimism?

## Canonical examples

- **A 3:1 ratio is the SaaS canonical health check** — Pereira's stated favorable benchmark (page 138)
- **Investor signal** — investors look for 3-4× ratios as a green light on funding (page 135)
- **Customer targeting** — the ratio helps identify which customer segments to chase by analyzing existing high-LTV clients (page 135)

## Related concepts

- [[Customer Lifetime Value]] — _depends_on_ (the numerator)
- [[Customer Acquisition Cost]] — _depends_on_ (the denominator)
- [[CAC Payback Period]] — _see_also_ (time dimension the ratio ignores)
- [[SaaS Quick Ratio]] — _see_also_ (growth-vs-churn analog of LTV:CAC)
- [[SaaS Rule of 40]] — _see_also_ (companion efficiency metric)
- [[Subscription Business Model]] — _see_also_ (the context where the ratio matters most)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 133-137 (definition, importance, formula, improvement), page 167 (subscription model context)
