---
type: atom
title: Net Promoter Score
aliases: [NPS, Net Promoter Score (NPS), Promoter Score]
category: metric
applicable_to: [SaaS, B2B, B2C, ecommerce, retail, services, subscription]
key_metrics: [promoter_percent, detractor_percent, passive_percent, response_rate]
related:
  - "see_also: Customer Health Score"
  - "see_also: Customer Engagement Score"
  - "complements: Customer Retention Rate"
  - "see_also: Customer Satisfaction"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "76-78,143,168,264"
tags: [metric, nps, customer_satisfaction, loyalty, brand]
created: 2026-06-16
---

# Net Promoter Score

## Definition

Net Promoter Score (NPS) is a scale from −100 to +100 that measures how likely customers are to recommend a company's product or service to a friend or colleague. Pereira frames it as the canonical loyalty proxy — derived from a single survey question on a 0-10 scale. Respondents scoring 9-10 are **Promoters**, 7-8 are **Passives**, and 0-6 are **Detractors**. The formula: **NPS = % Promoters − % Detractors** (Passives are ignored). NPS is universally understood by executives and boards, which is both its strength (comparability) and its weakness (gameability).

## How to calculate

Pereira's formula (page 77):
- **NPS = % of Promoters − % of Detractors**
- Detractors: scores 0-6 (Pereira's text says "1 to 6" but the standard scale starts at 0)
- Passives: scores 7-8
- Promoters: scores 9-10

**Comprehensive formula:**
- **NPS = ((Number of Promoters − Number of Detractors) ÷ Total Respondents) × 100**

**Worked example.** Out of 200 respondents: 110 Promoters, 50 Passives, 40 Detractors.
- % Promoters = 110/200 = 55%
- % Detractors = 40/200 = 20%
- NPS = 55 − 20 = **+35**

## When to use

- Tracking customer loyalty trend over time (the direction matters more than the absolute number)
- Comparing customer segments — enterprise vs SMB, channel A vs channel B
- Triggering customer success outreach — Detractors should get a call within 48 hours
- Post-onboarding measurement — early NPS predicts long-term retention
- Board reporting — NPS is the universally understood loyalty metric

## When NOT to use

- As the sole measure of customer health (combine with Customer Health Score, churn, expansion)
- For very small samples — < 100 respondents produces noisy NPS that swings randomly
- When response rates are < 10% — non-response bias dominates
- For products where the asker isn't the user (e.g., enterprise software where IT buys but employees use)
- As a sales quota or comp metric (immediately becomes gameable)

## Common pitfalls

- **Gameable wording** — asking right after a success moment ("you just closed a deal — how likely are you to recommend us?") inflates NPS
- **Selection bias** — only happy users respond; quiet detractors silently churn
- **No follow-up on Detractors** — Pereira's first improvement lever is engaging detractors (page 77); without it the survey is theater
- **Confusing tNPS and rNPS** — Transactional NPS (post-interaction) and Relationship NPS (annual) measure different things; don't compare
- **Industry-comparing without context** — B2B SaaS NPS norms differ from consumer retail; cross-industry comparisons mislead
- **Ignoring Passives** — Passives are 1-2 bad experiences away from being Detractors; track them as a leading indicator

## Benchmarks

- **NPS > 0** — net positive sentiment; minimum acceptable
- **NPS 30-50** — typical for healthy B2B SaaS
- **NPS 50-70** — excellent; world-class consumer brands (Apple, Tesla)
- **NPS > 70** — exceptional and rare
- **Negative NPS** — more detractors than promoters; the business is at structural risk

## Decision questions

- What's our NPS trend, and what's driving the direction?
- Are we acting on Detractor feedback within 48 hours?
- Are we measuring tNPS (transactional) or rNPS (relationship), and being consistent?
- Does NPS correlate with our actual retention and expansion data?
- Are we comparing ourselves to industry peers or just to our own history?

## Canonical examples

- **The single-question survey** — "On a scale of 0 to 10, how likely are you to recommend Company A to a friend or colleague?" (page 76)
- **NPS as CRM trigger** — Pereira recommends incorporating NPS with CRM and other KPIs (page 78); Detractors should trigger automated outreach
- **Industry standard** — appears in subscription, SaaS, franchise, and ecommerce sections of Pereira's guide (pages 76, 143, 168, 264)

## Related concepts

- [[Customer Health Score]] — _see_also_ (composite measure NPS feeds into)
- [[Customer Engagement Score]] — _see_also_ (behavioral counterpart to attitudinal NPS)
- [[Customer Retention Rate]] — _complements_ (NPS leads, retention lags)
- [[Customer Success Management]] — _see_also_ (Detractor outreach is core CS work)
- [[Vanity Metrics vs Actionable Metrics]] — _see_also_ (NPS straddles the line; acted-upon NPS is actionable)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 76-78 (definition, formula, improvement levers), page 143 (franchise context), page 168 (subscription context), page 264 (ecommerce context)
