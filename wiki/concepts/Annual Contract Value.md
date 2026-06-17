---
type: atom
title: Annual Contract Value
aliases: [ACV, Annual Contract Value (ACV), Average Contract Value]
category: metric
applicable_to: [SaaS, B2B, enterprise, subscription, services]
key_metrics: [total_contract_value, contract_duration, one_time_fees, ARR]
related:
  - "see_also: Annual Recurring Revenue"
  - "see_also: Monthly Recurring Revenue"
  - "see_also: Average Revenue Per Account"
  - "depends_on: Total Contract Value"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "121-122"
tags: [metric, acv, contract_value, b2b, enterprise, saas]
created: 2026-06-16
---

# Annual Contract Value

## Definition

Annual Contract Value (ACV) is the average yearly revenue received from each customer contract, excluding one-time fees. Pereira defines it as Total Contract Value divided by the number of years in the contract, with one-time fees stripped out before the division. ACV is the B2B/enterprise-SaaS analog of ARPA — it normalizes multi-year deals (a 3-year contract for $300K is $100K ACV, not $300K) so accounts of different contract lengths can be compared on equal footing.

## How to calculate

Pereira's formula (page 122):
- **ACV = (Total Contract Value − One-Time Fees) ÷ Number of Years in Contract**

**Worked example 1.** A customer signs a 5-year contract for $25,000 (no one-time fees):
- ACV = $25,000 ÷ 5 = **$5,000 per year**

**Worked example 2.** A 5-year contract totals $26,000, including a $1,000 setup fee:
- Recurring portion = $26,000 − $1,000 = $25,000
- ACV = $25,000 ÷ 5 = **$5,000 per year**

## When to use

- B2B/enterprise SaaS where multi-year contracts are common — normalizes them for comparison
- Account prioritization — high-ACV accounts deserve more customer success investment
- Sales segmentation — ACV bands define "SMB" vs "Mid-Market" vs "Enterprise" tiers
- Forecasting renewal revenue — ACV × renewal probability = forecast
- Comparing your average deal size against competitors and benchmarks

## When NOT to use

- Pure monthly-subscription businesses with no annual or multi-year contracts (use ARPA/MRR instead)
- Consumer subscription products where "contracts" don't exist
- Transactional revenue businesses (use Average Order Value)
- When contract lengths vary so wildly that averaging obscures the model

## Common pitfalls

- **Including one-time fees** — inflates ACV; Pereira is explicit that one-time fees must be excluded (page 122)
- **Confusing ACV with TCV** — Total Contract Value is the full multi-year sum; ACV is the annualized slice
- **Confusing ACV with ARR** — ARR is the company-wide run rate; ACV is the per-account average
- **Ramp deals not normalized** — many enterprise deals ramp over time ($50K Y1, $100K Y2, $150K Y3); using simple average ($100K) overstates Year-1 ARR
- **Using ACV as a sales quota proxy** — sales bookings are TCV, not ACV; misaligning them breaks comp plans

## Benchmarks

- **SMB SaaS** — ACV typically $1K-10K
- **Mid-Market SaaS** — ACV typically $10K-100K
- **Enterprise SaaS** — ACV typically $100K-1M+
- ACV thresholds drive sales motion: low ACV demands self-serve/PLG; high ACV demands field sales

## Decision questions

- What's our average ACV, and which segment does that imply?
- Does our sales motion match our ACV — are we trying to do enterprise sales on SMB ACV?
- Are we excluding one-time fees properly?
- Which accounts have the highest ACV potential and deserve focused expansion effort?
- Is ACV trending up (we're moving upmarket) or down (we're commoditizing)?

## Canonical examples

- **Enterprise SaaS deals** — multi-year commitments need ACV to compare across deal sizes (pages 121-122)
- **Customer prioritization** — Pereira notes ACV helps identify which accounts have the highest revenue potential and should be focused on (page 121)
- **The $25K-over-5-years case** — Pereira's worked example yielding $5K ACV (page 122)

## Related concepts

- [[Annual Recurring Revenue]] — _see_also_ (ARR aggregates ACV across the book)
- [[Monthly Recurring Revenue]] — _see_also_ (MRR is the monthly version)
- [[Average Revenue Per Account]] — _see_also_ (ARPA is the SMB/PLG analog)
- [[Customer Lifetime Value]] — _see_also_ (CLV = ACV × expected contract renewals)
- [[Land and Expand Model]] — _see_also_ (ACV starts small and grows via expansion)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 121-122 (definition, why it matters, formula, worked examples)
