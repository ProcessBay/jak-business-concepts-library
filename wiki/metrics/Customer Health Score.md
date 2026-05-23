---
type: atom
title: Customer Health Score
aliases: [Customer Churn Score, Customer Engagement Score, Customer Retention Score]
category: metrics
tags:
  - saas
  - metrics
  - customer-success
  - retention
  - prediction
sources:
  - [[Business Model Metrics Pereira 2022]]
source_pages: "97–101"
---

# Customer Health Score

## Definition

Customer Health Score (CHS) is a composite metric that aggregates multiple behavioral and engagement signals into a single score predicting whether a customer is likely to churn, expand, or renew. It is used by customer success teams to prioritize interventions and by product teams to identify at-risk accounts before they cancel.

## Key attributes

- **Multi-factor:** Typically combines product usage frequency, feature breadth, support ticket volume, NPS, payment history, and engagement with communications.
- **Weighted:** Different factors are weighted based on their predictive power for the specific product and customer segment.
- **Segmented:** A "good" score varies by customer type — enterprise users behave differently than SMB users.
- **Actionable:** The score is only useful if it triggers specific playbooks (outreach, training, executive escalation).

## When to use

- Customer success prioritization — which accounts need attention this week?
- Early churn prediction — intervening before the cancellation request.
- Expansion identification — healthy, highly engaged accounts are prime for upsell.
- Product feedback — clusters of low scores may indicate product gaps.

## When NOT to use

- Do not use CHS without validation — ensure the score actually predicts outcomes before relying on it.
- Do not treat CHS as a single number without understanding its component drivers.

## Common pitfalls

- Using vanity metrics (logins) instead of value metrics (core feature usage).
- Failing to update weights as the product and customer base evolve.
- Creating scores that are too complex to explain or act upon.

## Decision questions

1. Which 3–5 behaviors most strongly correlate with retention and expansion in our data?
2. Do we have automated playbooks triggered by health score thresholds?
3. How often do we validate and recalibrate the scoring model?
4. Is our health score simple enough for a CSM to explain to a customer?

## Related concepts

- [[Net Promoter Score]] — often a component of health scoring
- [[Customer Engagement Score]] — related composite metric focused on product usage
- [[Churn Rate]] — the outcome health scores aim to predict
- [[Customer Lifetime Value]] — health score is a leading indicator of CLV trajectory
