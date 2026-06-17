---
type: atom
title: Average Sales Cycle Length
aliases: [Sales Cycle Length, Average Deal Cycle, Time to Close, Sales Velocity Cycle]
category: metric
applicable_to: [B2B, SaaS, enterprise, services]
key_metrics: [days_to_close, deal_count, pipeline_stage_durations, win_rate]
related:
  - "see_also: Customer Acquisition Cost"
  - "see_also: Lead Velocity Rate"
  - "complements: Leads by Lifecycle Stage"
  - "see_also: Pipeline Coverage Ratio"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "123-125"
tags: [metric, sales_cycle, b2b, sales_velocity, forecasting]
created: 2026-06-16
---

# Average Sales Cycle Length

## Definition

Average Sales Cycle Length is the average number of days (or hours, for low-touch SaaS) that pass between the start of a sales opportunity and its close. Pereira positions it as a foundational sales-forecasting metric — it tells you how long to expect deals to take, lets you size pipeline coverage, and surfaces stages where deals stall. Long cycles burn cash (CAC sits unrecovered for months); short cycles enable faster iteration on go-to-market motion.

## How to calculate

Pereira's formula (page 123):
- **Average Sales Cycle Length = Sum of Days-to-Close for All Deals ÷ Number of Deals**

**Worked example.** Five sales close in 2, 4, 4, 5, and 6 days respectively (page 123):
- Total days = 2 + 4 + 4 + 5 + 6 = 21
- Average Sales Cycle = 21 ÷ 5 = **4.2 days**

For B2B enterprise, replace "days" with weeks or months. A 4.2-month cycle for mid-market SaaS is common.

**Segmented variants** (more useful than blended average):
- By deal size (enterprise deals cycle slower than SMB)
- By lead source (inbound closes faster than outbound)
- By sales rep (variance flags training gaps)
- By stage duration (where do deals stall?)

## When to use

- Sales forecasting — multiply average cycle by current pipeline to project close dates
- Pipeline coverage math — if cycle is 90 days and quota is $1M/quarter, you need ~3× quota in pipeline 90 days out
- Identifying bottleneck stages — where do deals slow down?
- Sales rep coaching — reps with longer cycles than peers usually have a specific stage problem
- Capacity planning — knowing cycle length sets ramp-time expectations for new hires

## When NOT to use

- Self-serve / PLG businesses where there's no discrete sales cycle
- Very early-stage companies with too few closed deals to compute a meaningful average
- Mixed deal-size businesses without segmentation (blended average hides the model)
- Long-tail enterprise deals (12-24 months) where the average is dominated by a few mega-deals

## Common pitfalls

- **Counting only won deals** — losses also have cycle times; including them gives true average
- **Counting from first touch vs from qualification** — must define start-point consistently; SQL-to-close is the cleanest measure
- **Mixing SMB and enterprise** — Enterprise cycles are 5-10× SMB; blending obscures both
- **Vanity reduction** — pushing reps to "close faster" without product/pricing changes leads to deal discounting or skipped qualification
- **Ignoring stage duration variance** — average cycle of 90 days could be 30/30/30 (healthy) or 10/10/70 (broken at one stage)
- **Forecast-by-average bias** — averages can mislead when the distribution is bimodal (fast SMB + slow ENT)

## Benchmarks

- **Transactional SMB SaaS** — days to weeks (Pereira's 4.2-day example)
- **Mid-market SaaS** — 30-90 days
- **Enterprise SaaS** — 6-12 months
- **Strategic enterprise/government** — 12-24+ months
- **Pereira's general framing**: there is no universal benchmark; what matters is your cycle trend and stage-by-stage analysis

## Decision questions

- What's our average sales cycle by segment, not blended?
- Where do deals stall the longest? Can we instrument and fix that stage?
- Is our cycle trending shorter or longer? What's driving it?
- Do we have enough pipeline coverage given our cycle length and quota?
- Are our new sales reps ramping inside our average cycle, or longer?

## Canonical examples

- **Pereira's worked example** — five deals (2, 4, 4, 5, 6 days) yielding 4.2-day average (page 123)
- **CRM-driven measurement** — Pereira recommends instrumenting via CRM so stage transitions are automatic (page 124)
- **Forecast use** — knowing typical cycle lets you predict monthly sales per rep (page 124)
- **Training tool** — preset sales cycle becomes a model for new reps to follow (page 124)

## Related concepts

- [[Customer Acquisition Cost]] — _see_also_ (long cycles inflate CAC via sales-team time)
- [[Lead Velocity Rate]] — _see_also_ (leading indicator of future cycle-length pressure)
- [[Annual Contract Value]] — _see_also_ (higher ACV typically = longer cycle)
- [[Customer Engagement Score]] — _see_also_ (engagement-during-cycle predicts close)
- [[Go-to-Market Strategy]] — _see_also_ (GTM motion determines cycle length structurally)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 123-125 (definition, formula, importance, forecasting/training use cases)
