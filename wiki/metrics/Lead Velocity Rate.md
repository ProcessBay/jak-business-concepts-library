---
type: atom
title: Lead Velocity Rate
aliases: [monthly lead growth rate, qualified lead growth rate, pipeline expansion rate]
category: metrics
tags:
  - saas
  - metrics
  - pipeline
  - growth
  - sales
sources:
  - [[Business Model Metrics Pereira 2022]]
source_pages: "47–48"
---

# Lead Velocity Rate

## Definition

Lead Velocity Rate (LVR) is the month-over-month growth rate of qualified leads. Unlike revenue metrics, which lag behind sales activity, LVR is a real-time indicator of pipeline health and future growth potential. It measures whether the top of the funnel is expanding fast enough to support revenue targets.

## Key attributes

- **Formula:** LVR % = ((Current Month's Qualified Leads − Previous Month's Qualified Leads) / Previous Month's Qualified Leads) × 100.
- **Leading indicator:** Revenue growth may lag lead growth by a sales cycle; LVR reveals problems before they show up in MRR.
- **Qualification matters:** The "qualified" filter is essential — raw lead growth without conversion quality is vanity.
- **Seasonality:** LVR should be interpreted with seasonal context (e.g., holiday dips, Q4 budget flush).
- **Sales alignment:** To maximize LVR, track not just lead volume but also SQL rate and path-to-close velocity.

## When to use

- Early warning system for revenue shortfalls — declining LVR predicts future revenue deceleration.
- Sales planning and quota setting — if LVR is rising, you can confidently increase hiring and quotas.
- Marketing performance evaluation — measuring which campaigns or channels generate the fastest-qualified-lead growth.
- Board reporting — LVR gives investors confidence that growth is pipeline-driven, not one-time lucky breaks.

## When NOT to use

- Do not use LVR without tracking conversion rate — a surge in leads that do not convert is worthless.
- Do not compare LVR across businesses with different sales-cycle lengths; a 90-day cycle vs. a 14-day cycle changes the LVR-to-revenue lag.
- Do not optimize for LVR at the expense of lead quality — "qualified" must be rigorously defined and enforced.

## Common pitfalls

- Lowering qualification standards to inflate LVR — this creates a "happy ears" pipeline that never closes.
- Ignoring sales-cycle length when interpreting LVR — a high LVR in January may not show revenue until March.
- Comparing LVR month-to-month without accounting for seasonality.
- Focusing only on inbound LVR and ignoring outbound or partner-sourced qualified leads.

## Key metrics


| Metric | Formula | Why It Matters |
|--------|---------|----------------|
| LVR | ((QL_this − QL_last) / QL_last) × 100 | Pipeline growth momentum |
| SQL Rate | SQLs / MQLs | Lead quality and handoff efficiency |
| LVR-to-Revenue Lag | Avg sales cycle length | When today's LVR becomes revenue |
| Qualified Lead Volume | Absolute count of QLs | Context for percentage growth |

## Decision questions

1. Are our qualified lead criteria strict enough that LVR growth translates into revenue growth?
2. What is the typical lag between LVR spike and revenue recognition in our sales cycle?
3. Which channel (organic, paid, outbound, partner) is driving the highest-quality LVR?
4. If LVR is flat but revenue is growing, are we getting better at conversion — or exhausting our backlog?
5. Are we seasonally adjusting LVR to avoid false alarms or false confidence?

## Canonical examples

- **Pacific Crest SaaS Survey** — high-growth SaaS companies consistently show positive LVR months before revenue acceleration, making LVR a favorite metric for venture investors (Pereira, p. 48).
- **Winter revenue dips** — a SaaS company anticipating Q1 revenue softness can deliberately boost Q4 LVR through targeted campaigns, ensuring Q1 pipeline coverage (Pereira, p. 48).
- **Marketing-sales handoff** — when LVR rises but SQL rate falls, the gap usually indicates a qualification or messaging mismatch between marketing and sales (Pereira, p. 48).

## Related concepts

- [[Customer Acquisition Cost]] — LVR efficiency determines how much CAC is required per dollar of eventual revenue
- [[Customer Conversion Rate]] — the bridge between LVR and actual customers
- [[AARRR Framework]] — LVR maps to the "Acquisition" stage
- [[Go-to-Market Strategy]] — channel choices directly shape LVR trajectory
