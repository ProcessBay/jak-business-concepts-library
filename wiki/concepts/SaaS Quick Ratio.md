---
type: atom
title: SaaS Quick Ratio
aliases: [SaaS Quick Ratio, Quick Ratio (SaaS), QR, Growth Efficiency Ratio]
category: metric
applicable_to: [SaaS, subscription, B2B]
key_metrics: [new_MRR, expansion_MRR, churn_MRR, contraction_MRR, net_new_MRR]
related:
  - "depends_on: Monthly Recurring Revenue"
  - "complements: Net MRR Churn Rate"
  - "see_also: LTV to CAC Ratio"
  - "see_also: SaaS Rule of 40"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "139-141,170-171"
tags: [metric, saas_quick_ratio, growth_efficiency, mrr, saas]
created: 2026-06-16
---

# SaaS Quick Ratio

## Definition

The SaaS Quick Ratio measures a firm's ability to grow recurring revenue despite attrition — it compares revenue inflows (New MRR + Expansion MRR) to revenue outflows (Churned MRR + Contraction MRR). Pereira calls it "perhaps the single most crucial metric" for analyzing growth capacity because it captures both sides of the SaaS engine in one number. A quick ratio above 4 means you're generating $4 of new recurring revenue for every $1 you lose — healthy growth. Below 1 means you're losing faster than you're gaining; structural collapse follows if sustained.

## How to calculate

Pereira's formula (page 140):
- **SaaS Quick Ratio = (New MRR + Expansion MRR) ÷ (Churned MRR + Contraction MRR)**

You need four MRR components, all defined in monthly terms:
- **New MRR** — recurring revenue from newly acquired customers
- **Expansion MRR** — upgrades, upsells, cross-sells from existing customers
- **Churned MRR** — recurring revenue lost from cancelled customers
- **Contraction MRR** — downgrades from existing customers

**Worked example.** New MRR $2,000; Expansion MRR $700; Churned MRR $400; Contraction MRR $350.
- Quick Ratio = ($2,000 + $700) ÷ ($400 + $350) = $2,700 ÷ $750 = **3.6**

Pereira's interpretation: this company is growing, but slowly — for every $1 of revenue lost, it generates $3.60 of new recurring revenue (page 140).

## When to use

- Diagnosing growth health in a single number — captures both acquisition and retention
- Pitching investors — high Quick Ratio is a strong scalability signal
- Comparing periods month-over-month to spot growth-efficiency changes
- Triaging when growth slows — is it acquisition (numerator) or retention (denominator)?
- Companion to LTV:CAC for a complete unit-economics picture

## When NOT to use

- Pre-PMF businesses where MRR components are too volatile (the ratio swings wildly)
- Usage-based businesses where "expansion" and "contraction" blur month-to-month
- Single-month snapshots — use a rolling 3-month average to smooth noise
- As a stand-alone metric — it tells you efficiency, not absolute growth (a 10:1 ratio on $1K MRR isn't a business)
- For businesses with no expansion motion (no upsells/cross-sells) — the metric loses one of its dimensions

## Common pitfalls

- **Single-month volatility** — one big enterprise deal can spike the ratio; use a 3-month rolling average
- **Mixing reactivations into Expansion MRR** — reactivations are New MRR, not expansion
- **Including one-time charges** — only recurring components count
- **Ignoring the absolute size** — a Quick Ratio of 10 on $50K MRR is a tiny business; a Quick Ratio of 2 on $50M MRR is a real company
- **Optimizing the ratio at the cost of growth** — slowing new sales improves the ratio but kills the business
- **Confusing it with the financial "quick ratio"** — the accounting Quick Ratio (current assets minus inventory ÷ current liabilities) is unrelated

## Benchmarks

Pereira's bands (page 141):
- **< 1** — failing; sustained means collapse
- **1 to 4** — growing, but inefficiently; high acquisition required to offset churn
- **> 4** — rapidly and successfully growing; for every $1 lost, $4+ in new revenue
- **Excellent growth health** requires a sustained Quick Ratio above 4 alongside a real growth rate

Pereira notes the >4 benchmark isn't universally accepted because of business peculiarities, but it's a useful target.

## Decision questions

- What's our SaaS Quick Ratio over the last 3 months (rolling), and what's the trend?
- If the ratio is weak, is the problem in the numerator (slow acquisition/expansion) or denominator (high churn/contraction)?
- How does our ratio compare to other SaaS efficiency metrics like LTV:CAC?
- Are we using monthly figures consistently and excluding one-time fees?
- Is the ratio healthy AND is our absolute MRR growing?

## Canonical examples

- **Pereira's 3.6 case** — $2K New + $700 Expansion vs $400 Churn + $350 Contraction (page 140) — growing but slowly
- **The "for every $1 you lost, you made $4" frame** — Pereira's way of communicating Quick Ratio > 4 (page 141)
- **Investor metric** — Quick Ratio appears prominently in SaaS investor decks alongside LTV:CAC and Net MRR Churn

## Related concepts

- [[Monthly Recurring Revenue]] — _depends_on_ (the four MRR components)
- [[Net MRR Churn Rate]] — _complements_ (Net MRR Churn is the denominator-minus-Expansion-only view)
- [[LTV to CAC Ratio]] — _see_also_ (the acquisition-efficiency companion)
- [[SaaS Rule of 40]] — _see_also_ (growth + profitability companion)
- [[Customer Lifetime Value]] — _see_also_ (downstream from healthy Quick Ratio)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 139-141 (definition, importance, formula, benchmarks), pages 170-171 (subscription model context)
