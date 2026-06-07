---
type: atom
title: Wizard of Oz Test
aliases: [Wizard of Oz Testing, Concierge MVP, Manual MVP, Fake Backend Test]
category: tactic
applicable_to: [B2B, B2C, startup, product_management, MVP_design]
key_metrics: [hypothesis_validation_rate, conversion_per_test, customer_NPS, cost_per_test]
related:
  - "specializes: Business Model Testing Cycle"
  - "amplifies: Minimum Viable Product"
  - "see_also: Concierge Test"
sources: [_Sources/Business_Model_Testing-voowm0]
source_pages: "21-22"
tags: [tactic, testing, MVP, validation, lean]
created: 2026-05-22
---

# Wizard of Oz Test

## Definition

A Wizard of Oz test presents customers with what appears to be an automated, fully-functioning product or service, but the backend is being executed manually by humans behind the scenes. The customer doesn't know the "magic" is fake — they get the experience and provide real feedback, while the firm avoids building the full automation before validating demand. Named after the curtain-pulling wizard in the Frank Baum story, this technique lets startups test product-market fit at the experience level without the engineering cost of the actual product. Distinct from a Concierge Test (where the customer knows the service is manual).

## Key attributes

- **Customer doesn't know it's manual** — experience feels automated
- **Tests product-market fit without building the product** — saves engineering cost
- **Reveals real conversion behavior** — customers respond to the experience, not to features
- **Operationally intensive** — humans do the work that machines eventually will
- **Time-limited** — works for early validation; doesn't scale
- **Risk: customer disappointment if discovered** — handle with care

## When to use

- Pre-building a complex automation (AI, recommendation, matching)
- Validating that customers actually want the OUTPUT of the system you'd build
- Early-stage testing where building the real system would take months
- Hypothesis testing for marketplace and platform startups

## When NOT to use

- Long-term operations (Wizard of Oz doesn't scale)
- Categories where regulatory or safety issues exist
- When the manual operation can't match the promised speed/quality
- When discovery would damage brand trust

## Common pitfalls

- Operational failures making the "automated" experience inconsistent
- Customer expectations exceeding what humans can sustainably deliver
- Failing to track data systematically (the test should produce learning)
- Letting Wizard of Oz become permanent because automating is hard
- Discovery via slow response times or visible human touch in the UX

## Key metrics

- Hypothesis validation rate (did customers want the output?)
- Customer NPS / CSAT during the test
- Cost per test transaction (human labor)
- Conversion rate (does the test prove demand?)

## Decision questions

- What's the ONE assumption we're testing — and does Wizard of Oz isolate it?
- Can we sustain the manual operation for the test duration without quality drift?
- What's the cost per test customer, and is it justified by the learning?
- What's our exit plan — at what scale do we automate?

## Canonical examples

- **Zappos** — Nick Swinmurn manually photographed shoes at local stores and shipped them himself to validate online shoe demand before building inventory infrastructure (classic example)
- **Aardvark** — manually-matched Q&A service before building the AI matching
- **Stitch Fix** — early manual styling before algorithmic recommendation
- **Many "AI" startup MVPs** — humans operating behind a chatbot facade

## Related concepts

- [[Business Model Testing Cycle]] — _specializes_
- [[Minimum Viable Product]] — _amplifies_ (Wizard of Oz is one MVP variant)
- [[Concierge Test]] — _see_also_ (related but transparent)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Concierge MVP]] — _auto_ (score 13.8: tags×6.0, applicable_to×3.0, category×0.8, alias×4.0)
- [[Fake Door Test]] — _auto_ (score 12.2: tags×6.0, applicable_to×2.0, title×1.5, category×0.8, alias×2.0)
- [[Falsifiable Hypothesis Building]] — _auto_ (score 11.8: tags×6.0, applicable_to×4.0, category×0.8, alias×1.0)
- [[Landing Page MVP]] — _auto_ (score 11.8: tags×6.0, applicable_to×3.0, category×0.8, alias×2.0)
- [[Explainer Video MVP]] — _auto_ (score 10.8: tags×6.0, applicable_to×3.0, category×0.8, alias×1.0)
- [[Piecemeal MVP]] — _auto_ (score 10.8: tags×6.0, applicable_to×3.0, category×0.8, alias×1.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Business_Model_Testing-voowm0]] — pages 21-22 (Wizard of Oz card)
