---
type: atom
title: Customer Engagement Score
aliases: [CES score, user engagement metric, product stickiness score]
category: metrics
tags:
  - saas
  - metrics
  - product
  - retention
  - engagement
sources:
  - [[Business Model Metrics Pereira 2022]]
source_pages: "110–114"
---

# Customer Engagement Score

## Definition

Customer Engagement Score (CES) is a quantitative measure of how actively users interact with a product or service. It aggregates user actions — logins, feature usage, session duration, transactions — into a single score that indicates product stickiness and predicts retention, expansion, and churn.

## Key attributes

- **Behavioral:** Based on actual product usage, not self-reported satisfaction.
- **Weighted events:** Different actions carry different weights based on their correlation with desired outcomes.
- **Segmented:** Scores are most meaningful when compared within customer segments or cohorts.
- **Predictive:** High engagement correlates with renewal and expansion; declining engagement predicts churn.

## When to use

- Product-led growth motions — identifying power users and at-risk accounts.
- Customer success prioritization — low engagement scores trigger proactive outreach.
- Free-to-paid conversion — engagement during trial is a strong predictor of conversion.
- Feature prioritization — understanding which behaviors drive engagement.

## When NOT to use

- Do not use engagement as a proxy for value — a user may be active but not achieving their desired outcome.
- Do not compare engagement scores across different product categories.

## Common pitfalls

- Counting vanity actions (page views) instead of value actions (core workflow completion).
- Failing to weight events by their business impact.
- Ignoring engagement decay — a user who was highly engaged but is now declining needs intervention.

## Decision questions

1. What are the 3–5 core actions that define "engaged" usage in our product?
2. How does engagement score correlate with actual renewal and expansion in our data?
3. Do we have automated triggers when engagement scores drop below thresholds?
4. How do engagement patterns differ between our best and worst customers?

## Related concepts

- [[Customer Health Score]] — often incorporates engagement as a key input
- [[Net Promoter Score]] — satisfaction vs. behavioral engagement
- [[Churn Rate]] — declining engagement is a leading indicator of churn
- [[Freemium Conversion Metrics]] — engagement drives freemium-to-paid conversion
