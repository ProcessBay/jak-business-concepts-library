---
type: atom
title: Marketing-Side Lead Scoring
aliases: [Lead Scoring Model, Behavioral Lead Scoring, Demographic Lead Scoring, MAP Lead Scoring]
category: marketing_framework
applicable_to: [B2B, B2C, SaaS, services, considered_purchase]
key_metrics: [MQL_to_SQL_rate, score_threshold_accuracy, lead_velocity, conversion_rate_by_score_band]
related:
  - "feeds: Lead Nurturing Workflow"
  - "depends_on: Marketing Automation Platform"
  - "differs_from: BANT Lead Qualification"
  - "differs_from: 4-5 Threshold Lead Qualification"
  - "uses: Behavioral Trigger"
sources: [_Sources/Marketing_Automation-qapv22]
source_pages: "100-102,119"
tags: [marketing, lead_scoring, lead_management, automation, B2B]
created: 2026-06-17
---

# Marketing-Side Lead Scoring

## Definition

Marketing-side lead scoring is the practice of assigning numerical values to leads inside a marketing automation platform based on observable behaviors and profile attributes — letting marketers prioritize follow-up and trigger handoff when readiness thresholds are crossed. Pereira distinguishes two scoring dimensions that combine for full coverage: (1) **Behavioral scoring** — tracks digital engagement (website visits, content downloads, form submissions, email opens, click-throughs) and assigns higher scores to actions indicating strong intent; (2) **Demographic scoring** — assigns scores based on profile fit (job title, industry, company size, location, role seniority) versus the ideal customer profile. Scoring can also be **implicit** (inferred from observed action) or **explicit** (declared by the lead via forms or conversation). Scores require **normalization** — periodic recalibration as behavior patterns shift. Unlike sales-side qualification (BANT, 4-5 threshold), marketing scoring is automated, continuous, and operates pre-handoff.

## Key attributes

- **Behavioral dimension** — actions earn points (visits, downloads, opens, clicks)
- **Demographic dimension** — profile fit earns points (title, industry, company size)
- **Implicit + explicit blend** — observed behavior + declared information combined
- **Threshold-gated handoff** — score crossing a defined number routes lead to sales
- **Negative scoring** — disqualifying signals (unsubscribed, competitor, wrong geo) deduct points
- **AI-augmentable** — ML can identify which behaviors actually predict conversion
- **Normalization required** — scores must be recalibrated as behavior patterns drift

## When to use

- Long sales cycles with many marketing touchpoints before sales engagement (B2B SaaS, enterprise)
- High volume of inbound leads that sales cannot manually triage
- When marketing must qualify before handoff to keep sales focused on real opportunities
- When you have enough conversion data to validate which behaviors correlate with closed-won
- When sales and marketing have agreed on "marketing-qualified" vs "sales-qualified" definitions

## When NOT to use

- Low-volume, high-touch sales where every lead gets manual attention
- Without enough historical conversion data to validate the scoring model
- Without sales alignment — handed-off scores will be ignored or distrusted
- When the data model can't reliably capture the behaviors being scored
- For impulse / single-touch purchases where there's no journey to score

## Common pitfalls

- Scoring all behaviors equally instead of weighting by predictive power
- Never normalizing — scores drift, threshold accuracy decays
- No negative scoring — disqualified leads stay artificially high
- Demographic-only or behavioral-only — missing half the signal
- Threshold set by intuition not data, so handoff timing is off
- Score inflation — over time, every lead looks "qualified" because criteria stretched
- Marketing and sales disagreeing on what "score = ready" means

## Key metrics

- **MQL → SQL conversion rate** (does score actually predict sales acceptance?)
- **Score threshold accuracy** (lift in close rate above vs below threshold)
- **Conversion rate by score band** (validate the score gradient is meaningful)
- **Lead velocity** (time from first touch to threshold crossing)
- **Sales acceptance rate** of MQLs (do they trust the score?)
- **Negative-scoring effectiveness** (disqualified leads avoided)

## Decision questions

- Which behaviors in our data actually correlate with closed-won deals?
- What demographic attributes define our ideal customer profile?
- What score threshold reliably predicts sales acceptance?
- How often will we normalize scores and validate the model?
- What disqualifying signals should drive negative scoring?
- Have sales and marketing agreed on the definition of "qualified"?

## Canonical examples

- **HubSpot Lead Scoring** — engagement + profile scoring with sales handoff workflows (page 120)
- **B2B SaaS** — pricing-page visit + demo request + decision-maker title combine to cross handoff threshold
- **Enterprise content scoring** — white paper download (+10), webinar attendance (+15), competitor field (-20)
- **AI-powered scoring** — ML model learns predictive behaviors over time (page 119)

## Related concepts

- [[Lead Nurturing Workflow]] — _feeds_ (score gates progression and handoff)
- [[Marketing Automation Platform]] — _depends_on_
- [[BANT Lead Qualification]] — _differs_from_ (BANT is sales-side, conversational; this is marketing-side, automated)
- [[4-5 Threshold Lead Qualification]] — _differs_from_ (4-5 is decision rule, this is continuous score)
- [[Behavioral Trigger]] — _uses_ (behaviors feed score and fire workflows)
- [[Inbound Sales Methodology]] — _see_also_ (downstream qualification)

## Sources

- [[_Sources/Marketing_Automation-qapv22]] — pages 100-102 (lead scoring criteria, behavioral, demographic, implicit vs explicit, normalization), page 119 (AI/ML smart lead scoring)
