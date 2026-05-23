---
type: atom
title: AARRR Framework
aliases: [Pirate Metrics, Startup Metrics Framework, Customer Lifecycle Metrics]
category: framework
applicable_to: [startup, scaleup, saas, digital_product, marketplace]
key_metrics: [acquisition_rate, activation_rate, retention_rate, referral_rate, revenue_per_user]
related:
  - "requires: Customer Acquisition Cost"
  - "requires: Customer Lifetime Value"
  - "see_also: SaaS Metrics Suite"
  - "see_also: Growth Hacking"
  - "see_also: Cohort Analysis"
sources: [Growth_Hacking_Techniques_Pereira_2022]
source_pages: "22-26"
tags: [growth, metrics, aarrr, pirate-metrics, funnel, startup]
created: 2026-05-22
---

# AARRR Framework (Pirate Metrics)

## Definition

AARRR is a framework for measuring and optimizing the customer lifecycle in digital businesses. Coined by Dave McClure, the five stages form a funnel: **Acquisition** → **Activation** → **Retention** → **Referral** → **Revenue**. Pereira: "The AARRR framework provides a structured approach to understanding and optimizing the customer journey, from the first touchpoint to long-term loyalty and advocacy."

## The five stages

### 1. Acquisition
**What:** Getting users to visit your product or platform.

**Key channels:** SEO, content marketing, paid ads, social media, partnerships, PR

**Key metrics:**
- Website traffic
- Sign-up rate
- Cost per acquisition (CPA)
- Channel mix (organic vs. paid)

**Decision questions:**
- Which acquisition channel has the lowest CPA?
- What is our organic vs. paid mix?
- Are we acquiring the right users (not just any users)?

### 2. Activation
**What:** Users experience the core value of the product for the first time.

**Key moment:** The "aha moment" — when a user first understands the product's value.

**Key metrics:**
- Activation rate (% of signups who reach core value)
- Time-to-value (minutes from signup to aha moment)
- Onboarding completion rate

**Decision questions:**
- What is our product's "aha moment"?
- How long does it take a new user to reach it?
- What percentage of signups never activate?

### 3. Retention
**What:** Users return and continue using the product over time.

**Key metrics:**
- Daily/Weekly/Monthly active users (DAU/WAU/MAU)
- Cohort retention rate
- Churn rate
- Net Revenue Retention (NRR)

**Decision questions:**
- What percentage of users return after day 1, 7, 30?
- What features correlate with retention?
- Which user segments retain best?

### 4. Referral
**What:** Users invite others to use the product.

**Key metrics:**
- Viral coefficient (K-factor)
- Net Promoter Score (NPS)
- Referral conversion rate
- Organic user share

**Decision questions:**
- How many new users does each existing user bring?
- What incentive structure drives referrals?
- Is our product inherently viral?

### 5. Revenue
**What:** Users pay for the product.

**Key metrics:**
- Conversion rate (free to paid)
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)
- Monthly Recurring Revenue (MRR)

**Decision questions:**
- What percentage of activated users convert to paid?
- What is our average revenue per user?
- How does revenue correlate with retention?

## The AARRR funnel

```
Acquisition (visitors)
    ↓
Activation (users who get value)
    ↓
Retention (users who return)
    ↓
Referral (users who invite others)
    ↓
Revenue (users who pay)
```

**Key insight:** Most startups focus on acquisition, but retention and referral are where sustainable growth lives. "It's cheaper to retain a current customer than buy a new one."

## When to use

- Building a growth dashboard
- Diagnosing where the funnel is leaking
- Prioritizing growth experiments
- Communicating metrics to investors
- Structuring a growth team

## When NOT to use

- For non-digital businesses (adaptation required)
- As a substitute for qualitative customer research
- In isolation — must be paired with cohort analysis
- Before having enough data for statistical significance

## Common pitfalls

- **Focusing on vanity metrics** — measuring traffic instead of activation
- **Optimizing the wrong stage** — fixing acquisition when retention is the real problem
- **Ignoring the funnel drop-off** — looking at top-line numbers, not conversion rates
- **Static analysis** — not tracking how the funnel evolves over time
- **Segment blindness** — averaging all users instead of analyzing by segment

## Decision questions

- Which stage of our funnel has the biggest drop-off?
- What is our activation rate, and how does it compare to industry benchmarks?
- Are we acquiring users who are likely to retain and pay?
- What is our viral coefficient, and is it >1 (viral growth)?
- Which cohort has the highest LTV, and what do they have in common?

## Canonical examples

- **Dropbox** — Referral stage: "Give 500MB, Get 500MB" drove viral growth
- **Facebook** — Activation: "7 friends in 10 days" was their aha moment metric
- **Slack** — Retention: team-based activation led to high retention and expansion
- **Airbnb** — Acquisition: Craigslist integration for cross-posting listings

## Related concepts

- [[SaaS Metrics Suite]] — _requires_ (MRR, CAC, LTV)
- [[Customer Churn]] — _see_also_ (retention inverse)
- [[Cohort Analysis]] — _see_also_ (retention measurement)
- [[Product-Led Growth]] — _see_also_ (activation and viral loops)
- [[Customer Acquisition Cost]] — _requires_ (acquisition metric)

## Sources

- [[Growth_Hacking_Techniques_Pereira_2022]] — pages 22-26 (AARRR framework as foundational growth hacking measurement model)
