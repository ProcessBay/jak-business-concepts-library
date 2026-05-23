---
type: atom
title: SaaS Metrics Suite
aliases: [SaaS KPIs, SaaS Dashboard Metrics, Subscription Metrics]
category: framework
applicable_to: [saas, b2b_saas, b2c_saas, platform, marketplace]
key_metrics: [mrr, arr, cac, ltv, ltv_cac_ratio, customer_churn, revenue_churn, nrr, gross_margin, payback_period, arpu, expansion_rate, cohort_retention]
related:
  - "specializes: Monthly Recurring Revenue"
  - "requires: Customer Acquisition Cost"
  - "requires: Customer Lifetime Value"
  - "requires: Customer Churn"
  - "see_also: Cohort Analysis"
  - "see_also: Business Model Metrics"
sources: [_Sources/Super-Guide-SaaS-Business-Model-xnexrn]
source_pages: "49-70"
tags: [saas, metrics, kpi, recurring-revenue, analytics, dashboard, performance]
created: 2026-05-22
---

# SaaS Metrics Suite

## Definition

The core metrics that measure the health, growth, and sustainability of a SaaS business. Unlike traditional businesses where revenue is transactional, SaaS metrics must capture: (1) recurring revenue momentum, (2) unit economics viability, (3) retention quality, and (4) growth efficiency. Pereira: "SaaS providers must be very careful about the MRR because, once it starts to shrink, it can be very hard to control."

## The metrics hierarchy

### Tier 1: Revenue metrics (what's happening to money)
| Metric | Formula | Why it matters | Target |
|---|---|---|---|
| **MRR** | Sum of all recurring monthly revenue | Core pulse of the business | Growing 10-20% MoM |
| **ARR** | MRR × 12 | Investor-facing annual view | Consistent with MRR trend |
| **Net New MRR** | New MRR + Expansion - Churn - Contractions | True growth rate | Positive and growing |
| **ARPU** | MRR ÷ # of active customers | Value per customer | Increasing over time |

### Tier 2: Unit economics (does the math work?)
| Metric | Formula | Why it matters | Target |
|---|---|---|---|
| **CAC** | Sales + Marketing spend ÷ # new customers | Cost to acquire one customer | Recoverable in <12 months |
| **LTV** | ARPU × Gross Margin ÷ Churn Rate | Total value of one customer | LTV:CAC > 3:1 |
| **LTV:CAC Ratio** | LTV ÷ CAC | Unit economics health | >3:1 (good), >5:1 (excellent) |
| **Payback Period** | CAC ÷ (ARPU × Gross Margin) | Time to recover acquisition cost | <12 months |

### Tier 3: Retention metrics (is the bucket leaking?)
| Metric | Formula | Why it matters | Target |
|---|---|---|---|
| **Customer Churn** | Lost customers ÷ Total customers at start | % customers leaving monthly | <2% B2B; <5% B2C |
| **Revenue Churn** | Lost MRR ÷ MRR at start | % revenue leaving monthly | <2% B2B; <5% B2C |
| **Net Revenue Retention** | (Starting MRR + Expansions - Churn - Contractions) ÷ Starting MRR | Revenue from existing cohorts | >100% healthy; >120% excellent |
| **Gross Margin** | (Revenue - COGS) ÷ Revenue | Profitability of revenue | >70% for pure SaaS |

## MRR types and formulas (detailed)

| Type | Definition | Formula |
|---|---|---|
| **New MRR** | Revenue from brand new customers | Sum of first-month subscriptions from new customers |
| **Expansion/Upsell MRR** | Revenue from existing customers upgrading | Sum of additional revenue from plan upgrades |
| **Reactivation MRR** | Revenue from churned customers returning | Sum of subscriptions from reactivated accounts |
| **Churned MRR** | Revenue lost from cancellations | Sum of MRR from canceled accounts |
| **Contracted MRR** | Revenue lost from downgrades | Sum of MRR difference from downgraded accounts |
| **Net New MRR** | True growth accounting for all movements | New + Expansion + Reactivation - Churned - Contracted |

**Critical rule:** Annual contracts must be divided by 12 for MRR calculation. One-time payments and trial users are NOT included in MRR. (Pereira: "Businesses that are based on the recurring revenue model should calculate the MRR in order to project the future performance." )

## Churn benchmarks by segment

| Segment | Acceptable Monthly Churn | Danger Zone |
|---|---|---|
| B2B Enterprise | <1% | >2% |
| B2B SMB | <2% | >5% |
| B2C / Prosumer | <5% | >10% |

Pereira: "Typically a good or acceptable churn rate is from 2% to 8% for B2C and, for B2B, it should be less than 2%."

## When to use

- Monthly board/investor reporting
- Weekly executive dashboards
- Identifying which growth lever to pull (acquisition vs. retention vs. expansion)
- Pricing experiments (track ARPU and expansion rate)
- Fundraising (investors will scrutinize these metrics)
- Operational decisions (when to hire sales vs. customer success)

## When NOT to use

- As vanity metrics without understanding the story behind the numbers
- Comparing to companies in different segments (B2B vs. B2C benchmarks differ)
- Early pre-launch stage (no data yet — focus on qualitative signals instead)
- In isolation — metrics tell you WHAT, not WHY (pair with customer interviews)

## Common pitfalls

- **Counting annual contracts as monthly MRR** — divide by contract length
- **Including one-time payments in MRR** — MRR is ONLY recurring
- **Including trial users in MRR** — they haven't committed yet
- **Misleading MoM growth on small numbers** — "Investors will not be very pleased if a business boasts a mega percentage and passes the rate off as sustainable growth at scale"
- **Optimizing for vanity metrics** — high user count with low engagement is worthless
- **Ignoring net revenue retention** — gross new sales can mask a leaking bucket

## Decision questions

- Which metric is our biggest constraint right now — acquisition (CAC), retention (churn), or monetization (ARPU)?
- If our churn rate doubled, what would our LTV be? Would our unit economics still work?
- What's our payback period, and does our cash runway support it?
- Are we tracking the metrics that matter for our stage, or metrics that matter for Series C companies?
- Can we segment our metrics by cohort, plan tier, or acquisition channel to find hidden patterns?
- What's our net revenue retention — are existing customers growing in value or shrinking?

## Quick diagnostic: SaaS health scorecard

| Metric | Score 0 | Score 1 | Score 2 | Score 3 |
|---|---|---|---|---|
| MRR Growth | Declining | <5% MoM | 5-15% MoM | >15% MoM |
| LTV:CAC | <1:1 | 1-2:1 | 2-3:1 | >3:1 |
| Customer Churn | >10% | 5-10% | 2-5% | <2% |
| NRR | <80% | 80-100% | 100-115% | >115% |
| Payback Period | >24 mo | 12-24 mo | 6-12 mo | <6 mo |

**Interpretation:** 12-15 = excellent; 8-11 = solid; 4-7 = concerning; <4 = critical

## Related concepts

- [[Monthly Recurring Revenue]] — _specializes_ (core metric)
- [[Customer Acquisition Cost]] — _requires_
- [[Customer Lifetime Value]] — _requires_
- [[Customer Churn]] — _requires_
- [[Cohort Analysis]] — _see_also_ (retention analysis method)
- [[SaaS Business Model]] — _requires_ (parent framework)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[SaaS Pricing Models]] — _auto_ (score 9.2: tags×2.0, applicable_to×4.0, title×1.5, category×0.8, alias×1.0)
- [[SaaS Business Model]] — _auto_ (score 8.2: tags×4.0, applicable_to×1.0, title×1.5, category×0.8, alias×1.0)
- [[Product-Led Growth]] — _auto_ (score 6.8: tags×2.0, applicable_to×4.0, category×0.8)
- [[SaaS Company Stages]] — _auto_ (score 5.2: tags×2.0, applicable_to×1.0, title×1.5, category×0.8)
- [[Affiliate Marketing]] — _auto_ (score 2.0: tags×2.0)
- [[Take-Rate Economics]] — _auto_ (score 2.0: applicable_to×2.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Super-Guide-SaaS-Business-Model-xnexrn]] — pages 49-70 (full metrics suite with formulas and benchmarks)
