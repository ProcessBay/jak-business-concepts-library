---
type: atom
title: Lead Velocity Rate
aliases: [LVR, Qualified Lead Velocity Rate, Lead Velocity Rate (LVR), QLVR]
category: metric
applicable_to: [SaaS, B2B, subscription, services]
key_metrics: [current_month_qualified_leads, previous_month_qualified_leads, MoM_growth_rate]
related:
  - "see_also: Customer Acquisition Cost"
  - "see_also: Average Sales Cycle Length"
  - "leading_indicator_of: Monthly Recurring Revenue"
  - "see_also: Pipeline Coverage Ratio"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "47-48,168"
tags: [metric, lvr, lead_velocity, b2b, pipeline, forecasting, leading_indicator]
created: 2026-06-16
---

# Lead Velocity Rate

## Definition

Lead Velocity Rate (LVR) measures the month-over-month percentage growth in **qualified** leads. Pereira positions LVR as a more reliable forward indicator than revenue because revenue lags lead generation by the length of the sales cycle — while revenue metrics report what already happened, LVR reports what's about to happen. Coined and popularized by Jason Lemkin, LVR is the canonical leading indicator for B2B SaaS — if LVR is healthy, revenue will follow; if LVR collapses, revenue collapse follows by one sales cycle.

## How to calculate

Pereira's formula (page 48):
- **LVR % = ((Current Month's Qualified Leads − Previous Month's Qualified Leads) ÷ Previous Month's Qualified Leads) × 100**

**Worked example.** Last month: 200 qualified leads. This month: 240 qualified leads.
- LVR = ((240 − 200) ÷ 200) × 100 = (40 ÷ 200) × 100 = **20% MoM growth in qualified leads**

**Critical input — "qualified" matters.** Use MQL or SQL counts (not raw leads), per your sales/marketing definition. Pereira emphasizes that the definition of "qualified" must be locked and consistent.

## When to use

- Forecasting future revenue when current revenue is too noisy or too lagging
- Early-warning system — LVR drops precede revenue drops by ~one sales cycle
- Pipeline planning — knowing LVR + sales cycle + win rate gives a forward revenue picture
- Marketing performance tracking — LVR isolates top-of-funnel performance from sales execution
- Strategic decision support — if you anticipate a winter slowdown, raise LVR proactively (Pereira's example, page 47)

## When NOT to use

- Pure-PLG businesses with no qualification step
- Very early-stage businesses where lead counts are too low for meaningful month-over-month comparison
- Long-sales-cycle businesses (enterprise 12-24 months) where monthly LVR is noisy; use quarterly LVR
- When "qualified" isn't consistently defined — LVR becomes meaningless if the definition drifts

## Common pitfalls

- **Counting raw leads instead of qualified leads** — raw lead count inflates LVR without translating to revenue; only qualified leads matter
- **Definition drift** — if "qualified" changes between months, LVR is comparing apples to oranges
- **Ignoring quality** — Pereira's caveat (page 48): an increase is a good sign, but it doesn't tell you how many qualified leads turn into actual sales; track LVR alongside conversion rate
- **Vanity-growth trap** — marketing teams can hit LVR targets by lowering the qualification bar; pair LVR with downstream conversion to detect this
- **Seasonality blindness** — December often dips, January spikes; YoY comparison may matter more than MoM
- **No causal connection to revenue** — LVR predicts revenue only if conversion rates and sales cycle are stable; if either changes, LVR alone misleads

## Benchmarks

- **> 20% MoM** — high-growth SaaS post-PMF
- **10-20% MoM** — typical for healthy growth-stage B2B SaaS
- **5-10% MoM** — mature businesses or saturating markets
- **< 0%** — qualified leads shrinking; revenue decline likely follows in one sales cycle
- Pereira notes that LVR varies enormously by sector, product category, and target market; trend matters more than absolute (page 48)

## Decision questions

- What's our LVR trend over the last 6 months?
- Are we counting truly qualified leads (MQL/SQL with defined criteria)?
- Has our qualification definition stayed consistent?
- Does our LVR correlate with our actual revenue trend one sales cycle later? If not, why?
- If LVR is dropping, what marketing/demand-gen levers can we pull NOW to recover before revenue follows?

## Canonical examples

- **Jason Lemkin / SaaStr framing** — LVR as the canonical leading indicator (the metric Pereira leans on)
- **Pereira's winter-revenue example** (page 47) — anticipating Q4 weakness, raise LVR proactively to bring in more leads
- **Subscription model context** (page 168) — Pereira lists LVR as a key subscription metric

## Related concepts

- [[Customer Acquisition Cost]] — _see_also_ (LVR up + CAC up may signal saturation)
- [[Average Sales Cycle Length]] — _see_also_ (the lag between LVR and revenue)
- [[Monthly Recurring Revenue]] — _see_also_ (MRR is the lagging counterpart LVR predicts)
- [[Leads by Lifecycle Stage]] — _see_also_ (the lifecycle that defines "qualified")
- [[Customer Engagement Score]] — _see_also_ (engagement-stage analog of LVR)
- [[Vanity Metrics vs Actionable Metrics]] — _see_also_ (LVR is actionable when qualification is honest)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 47-48 (definition, importance, formula, benchmark caveat), page 168 (subscription model context)
