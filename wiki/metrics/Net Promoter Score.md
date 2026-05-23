---
type: atom
title: Net Promoter Score
aliases: [NPS score, customer loyalty metric, promoter score]
category: metrics
tags:
  - saas
  - metrics
  - customer-satisfaction
  - retention
  - product
sources:
  - [[Business Model Metrics Pereira 2022]]
source_pages: "76–78"
---

# Net Promoter Score

## Definition

Net Promoter Score (NPS) is a customer loyalty and satisfaction metric measured on a scale from -100 to 100. It assesses how likely customers are to recommend a company's product or service to others. A positive NPS indicates that promoters outnumber detractors; a negative score signals that the business is doing more harm than good in its market.

## Key attributes

- **Survey question:** "On a scale of 0 to 10, how likely are you to recommend [Company] to a friend or colleague?"
- **Segmentation:**
  - **Promoters (9–10):** Loyal enthusiasts who will buy more and refer others.
  - **Passives/Neutrals (7–8):** Satisfied but unenthusiastic; vulnerable to competitive offers.
  - **Detractors (0–6):** Unhappy customers who can damage the brand through negative word-of-mouth.
- **Formula:** NPS = % of Promoters − % of Detractors.
- **Range:** -100 (everyone is a detractor) to +100 (everyone is a promoter).
- **Relationship to revenue:** Even small NPS improvements can significantly affect customer acquisition cost (through referrals) and retention.

## When to use

- Board and investor reporting as a health indicator of customer relationships.
- Product prioritization — understanding what drives promoter enthusiasm and detractor dissatisfaction.
- Customer success segmentation — prioritizing at-risk detractors and leveraging promoters for case studies and referrals.
- Competitive benchmarking — comparing your NPS to industry peers.

## When NOT to use

- Do not use NPS as a standalone metric; it must be paired with behavioral data (actual churn, expansion) to avoid "say-do" gaps.
- Do not compare NPS across industries without context — what is "good" for telecom differs from SaaS.
- Do not treat a single NPS survey as definitive; trend and cohort analysis are essential.

## Common pitfalls

- Survey fatigue — over-surveying customers, especially without closing the loop on feedback, breeds resentment.
- Ignoring passives — while they do not affect the score, passives represent a large pool of at-risk revenue.
- Cultural bias — response patterns vary by geography and culture (e.g., some regions skew toward moderate scores).
- Focusing only on the score, not the verbatim feedback — the "why" behind the score is where actionable insight lives.

## Key metrics


| Metric | Definition | Why It Matters |
|--------|-----------|----------------|
| NPS | % Promoters − % Detractors | Overall loyalty indicator |
| Response Rate | Survey completions / invitations sent | Data quality signal |
| Detractor Resolution Rate | % of detractors contacted and resolved | Operational follow-through |
| Promoter Referral Rate | Actual referrals from promoters | Links NPS to revenue |

## Decision questions

1. What is the root cause of detractor scores, and do we have a systematic process to address it?
2. Are we leveraging promoters for referrals, testimonials, and case studies?
3. How does NPS correlate with actual churn and expansion revenue in our data?
4. Are we surveying at the right moment in the customer journey — post-onboarding, post-support, or quarterly?
5. What would it take to move our passives (7–8) into the promoter camp?

## Canonical examples

- **NPS and revenue linkage** — companies with NPS above 50 typically grow 2× faster than those with NPS below 0, primarily through lower CAC (organic referrals) and higher retention (Pereira, p. 77).
- **Detractor recovery** — resolving a detractor's core issue can turn them into a promoter; the effort often yields higher satisfaction than if no problem had occurred (the "service recovery paradox") (Pereira, p. 77).
- **CRM integration** — embedding NPS data into Salesforce or HubSpot allows sales and success teams to tailor outreach by loyalty segment (Pereira, p. 78).

## Related concepts

- [[Customer Lifetime Value]] — NPS is a leading indicator of CLV
- [[Customer Acquisition Cost]] — promoters reduce CAC through organic referrals
- [[Churn Rate]] — detractors churn at higher rates; NPS predicts who will leave
- [[Customer Health Score]] — a composite metric that often includes NPS as an input
