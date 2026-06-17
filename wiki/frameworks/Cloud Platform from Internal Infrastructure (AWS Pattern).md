---
type: atom
title: Cloud Platform from Internal Infrastructure (AWS Pattern)
aliases: [Internal-Tool-to-Platform, Dogfooding-to-Platform Pattern, AWS Pattern, Build-Use-Sell Pattern]
category: business_model_pattern
applicable_to: [SaaS, cloud, B2B, infrastructure, platforms, fintech, logistics]
key_metrics: [internal_workload_share, external_ARR, gross_margin, operating_margin_contribution, primitives_count, partner_ecosystem_size]
related:
  - "amplifies: Platform-Based Business Model"
  - "specializes: As-a-Service Business Model"
  - "see_also: IaaS vs PaaS vs SaaS"
  - "see_also: Two-Sided Network Effect"
sources: [_Sources/Amazon-Business-Model-irpwq8]
source_pages: "14-16, 50, 55-56, 83-85"
tags: [amazon, case_study, business_model, cloud, aws, platform, infrastructure, B2B]
created: 2026-06-17
---

# Cloud Platform from Internal Infrastructure (AWS Pattern)

## Definition

A company builds infrastructure first to run its own operations at scale, then exposes that infrastructure as a paid platform to third parties — turning a cost center into a high-margin business with operating leverage that funds the parent's reinvention. Pereira documents Amazon Web Services as the canonical case: AWS launched in 2002 to give external developers APIs against Amazon's e-commerce stack, expanded into compute/storage/database primitives, and by 2021 generated $62.2B revenue and >55% of Amazon's operating margin despite being a fraction of total revenue. The pattern's power is that the parent business absorbs the R&D cost as a normal operating expense, and external customers then pay for what becomes pure margin. The downstream consequence — competitors of the parent (e.g., Netflix vs Amazon Video) become customers of its platform — is the strategic shock the model creates.

## Key attributes

- **Built for self first** — infrastructure proven at parent's own scale before any external customer
- **Externalize via APIs and primitives** — sell the building blocks, not the finished application
- **Operating leverage** — incremental external customer costs near-zero, margins expand with scale
- **Coopetition** — direct competitors of the parent become customers of the platform (and that's fine)
- **Funds parent reinvention** — high-margin platform cash subsidizes low-margin commerce/core
- **Long payback** — years between internal-tool maturity and external commercialization (Amazon: ~8 years)
- **Ecosystem multiplier** — ISVs, consultants, certifications grow around the platform

## When to use

- You operate at a scale where internal infrastructure cost is a strategic line item
- Your engineering culture builds composable primitives, not bespoke monoliths
- The infrastructure problems you solved internally are also problems your customers face
- You have the patience to subsidize a multi-year migration from internal-tool to commercial product
- You can tolerate selling to your own competitors as a strategic position

## When NOT to use

- Sub-scale operations where internal infrastructure costs don't justify productization
- Infrastructure that is too narrowly bespoke to your business to generalize
- Cultures that conflate "we use it" with "it's productizable" — most internal tools aren't
- When productization would expose competitive secrets (algorithm-level IP)
- When the parent business isn't healthy enough to absorb the multi-year investment

## Common pitfalls

- Productizing internal tools without rebuilding for multi-tenant security and SLAs
- Underestimating the support, docs, billing, and partner-ecosystem cost (it's a different business)
- Letting the parent business get preferential treatment that drives external customers away
- Pricing for parent-style "cover costs" instead of market-rate "fund reinvention"
- Failing to separate the platform org from the parent — political and incentive misalignment
- Missing the window — by the time you productize, hyperscale competitors have caught up

## Key metrics

- **External ARR** vs internal-workload share (when external > internal, the model is real)
- **Gross margin** (cloud platforms target 60-70%)
- **Operating margin contribution to parent** (AWS = >55% of Amazon's operating income on ~16% of revenue)
- **Primitives / services count** (AWS: 200+ services from data centers in 26 countries)
- **Partner ecosystem size** — ISVs, consultancies, certified individuals
- **Customer concentration** — % revenue from top 10 (lower = healthier)
- **Internal-to-external time-to-productize** for new primitives

## Decision questions

- Is our internal infrastructure genuinely at a scale where external customers would benefit?
- Are we willing to commit the multi-year, multi-org investment to productize it?
- Will we sell to our own competitors? (Answer must be yes for the math to work.)
- Can our parent business absorb the R&D until the platform stands on its own P&L?
- Do we have a culture that builds primitives, or one that builds bespoke apps?

## Canonical examples

- **AWS** — 2002 launch from Amazon's e-commerce APIs; $62.2B revenue, 200+ services (pages 14-16, 50, 55-56)
- **Google Cloud Platform** — externalized from Google's internal infrastructure (BigQuery from Dremel, etc.)
- **Azure** — Microsoft externalized internal Windows/Office back-end stack
- **Stripe Connect / Treasury** — Stripe's internal payments primitives sold to platforms
- **Shopify Fulfillment Network** — Shopify externalizing its merchant logistics stack
- **Twilio (post-app abstraction)** — telephony primitives originally built for internal use cases
- **Goldman Sachs (Marquee)** — externalizing internal trading and risk platforms

## Related concepts

- [[Platform-Based Business Model]] — _amplifies_
- [[As-a-Service Business Model]] — _specializes_ (this is the internal-origin variant)
- [[IaaS vs PaaS vs SaaS]] — _see_also_ (AWS spans all three layers)
- [[Two-Sided Network Effect]] — _see_also_ (developers + ISVs + enterprises)
- [[Cash-Conversion-Cycle Reinvestment Engine]] — _see_also_ (AWS funds Amazon's other bets)

## Sources

- [[_Sources/Amazon-Business-Model-irpwq8]] — pages 14-16 (AWS history, 2002 origin from internal APIs), 50 (AWS revenue and 200+ services), 55-56 (AWS deep-dive, Netflix-as-AWS-customer coopetition), 83-85 (financial contribution, B2B distribution)
