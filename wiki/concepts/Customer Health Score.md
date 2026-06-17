---
type: atom
title: Customer Health Score
aliases: [CHS, Customer Health Score (CHS), Health Score, Account Health Score]
category: metric
applicable_to: [SaaS, B2B, subscription, customer_success]
key_metrics: [usage_signals, engagement_signals, support_signals, sentiment_signals, weighted_composite]
related:
  - "complements: Net Promoter Score"
  - "see_also: Customer Engagement Score"
  - "see_also: Churn Rate"
  - "informs: Customer Success Management"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "97-103,264"
tags: [metric, customer_health, customer_success, churn_prevention, saas]
created: 2026-06-16
---

# Customer Health Score

## Definition

Customer Health Score (CHS) is a composite, weighted metric that combines multiple behavioral and attitudinal signals into a single score predicting an account's likelihood to renew, expand, or churn. Pereira positions it as the central instrument of proactive customer success — rather than waiting for churn, CHS lets the CS team intervene early on accounts showing decline. Unlike NPS (attitudinal only) or Engagement Score (behavioral only), CHS blends both: usage, engagement, support tickets, sentiment, and contract data weighted by predictive power.

## How to calculate

There is no single Pereira-prescribed formula because CHS is bespoke to each business. The general construction (pages 98-101):

**Step 1 — Identify the input signals.** Pick measurable behaviors and attributes that correlate with retention. Typical signals:
- Product usage frequency (daily/weekly logins, feature adoption)
- Depth of usage (number of features actively used, seats activated)
- Support ticket volume and severity
- NPS / CSAT survey scores
- Contract attributes (tenure, ACV, renewal date proximity)
- Payment health (on-time, failed, disputed)
- Stakeholder engagement (champion present, executive sponsor active)

**Step 2 — Assign weights.** Each signal gets a weight reflecting its predictive importance (informed by historical churn analysis).

**Step 3 — Compute the composite.** Score each signal on a normalized scale (e.g., 0-100), multiply by weight, sum.

**Step 4 — Classify into bands.** Pereira-style banding:
- **Red / Unhealthy** — immediate CS intervention required
- **Yellow / At Risk** — proactive outreach
- **Green / Healthy** — expansion-ready

## When to use

- Customer success programs needing early-warning indicators
- Account prioritization for CS team capacity allocation
- Triggering automated playbooks (red accounts → executive escalation; green accounts → expansion outreach)
- Renewal forecasting (sum of green-account ARR is the high-confidence renewal base)
- Identifying expansion-ready accounts (consistently green with growing usage)

## When NOT to use

- Very small customer bases where individual relationship knowledge beats a composite score
- Pre-PMF businesses without enough historical churn data to validate the weights
- Self-serve businesses without distinct accounts to score
- As a single-number summary without behind-it diagnostic detail (CS reps need to know WHY a score is red, not just that it is)

## Common pitfalls

- **Weighting without validation** — assigning weights based on intuition rather than historical churn correlation produces a score that looks sophisticated but doesn't predict
- **Stale signals** — using last-quarter's data; CHS needs near-real-time updates
- **Over-weighting NPS** — NPS is one signal, not the whole picture; behavioral signals usually predict better
- **Set-and-forget weights** — what predicts churn changes as the product and market evolve; recalibrate annually
- **Action-less scoring** — Pereira's first improvement lever is determining what actions to take; without playbooks tied to each band, the score is theater (page 101)
- **One score for all segments** — enterprise and SMB churn for different reasons; build segmented CHS models

## Benchmarks

There are no universal CHS benchmarks because each business's scoring system is bespoke. Useful internal benchmarks:
- **% of accounts in Green band** — should be > 60% for a healthy book
- **Conversion of Yellow → Red over time** — high conversion signals declining product-market fit or onboarding gaps
- **Predictive validity** — at minimum, Red accounts should churn at 5-10× the rate of Green accounts; otherwise the model is broken

## Decision questions

- What signals are we using, and have we validated their predictive power against historical churn?
- Do we have automated playbooks tied to each score band?
- How often do we recalibrate weights as the product and market evolve?
- Is CHS segmented by account type (enterprise vs SMB)?
- Does our CS team trust the score, or do they ignore it in favor of gut feel?

## Canonical examples

- **Gainsight, ChurnZero, Totango** — purpose-built CS platforms that calculate and act on CHS
- **Pereira's banding approach** — health scores with predetermined categories trigger specific actions (page 101)
- **Combined with NPS and Engagement Score** — Pereira's positioning of CHS as one of three customer-state instruments (pages 97, 110)
- **In-app intervention trigger** — Pereira's example: declining health score triggers in-app engagement escalation (page 102)

## Related concepts

- [[Net Promoter Score]] — _complements_ (NPS is one signal; CHS combines many)
- [[Customer Engagement Score]] — _see_also_ (behavioral subcomponent of CHS)
- [[Churn Rate]] — _see_also_ (the outcome CHS predicts)
- [[Customer Success Management]] — _see_also_ (the function that operates CHS)
- [[Customer Success Anti-Patterns]] — _see_also_ (the failure modes of bad CHS systems)
- [[Customer Success Strategy 8 Pillars]] — _see_also_ (the strategic frame CHS sits within)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 97-103 (definition, importance, calculation approach, improvement levers, action mapping), page 264 (ecommerce context)
