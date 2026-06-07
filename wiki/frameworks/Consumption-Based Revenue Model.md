---
type: atom
title: Consumption-Based Revenue Model
aliases: [Usage-Based Pricing, Pay-Per-Use, PAYG, Pay-As-You-Go, Metered Billing]
category: revenue_model
applicable_to: [B2B, B2C, SaaS, cloud, utilities, telecom, payment_processing]
key_metrics: [revenue_per_user, usage_growth_rate, customer_concentration, billing_predictability, net_revenue_retention]
related:
  - "contrasts_with: Subscription Business Model"
  - "see_also: Pricing Mechanisms"
  - "see_also: Three-Tier Pricing"
sources: [_Sources/Revenue-Models-2nd-edition-df5jsj]
source_pages: "27-29"
tags: [revenue_model, usage_based, metered, billing, B2B]
created: 2026-05-22
---
# Consumption-Based Revenue Model

## Definition

The consumption-based (or usage-based) revenue model charges customers based on actual measured usage of the product or service — usage of compute (AWS), API calls (Stripe), data sent (Twilio), kilowatt-hours (utilities), miles driven, etc. Pereira contrasts it with subscription models (fixed periodic fee regardless of usage): consumption models align cost with value extracted, scale revenue with customer success, and lower the barrier to entry — but introduce billing complexity, revenue unpredictability, and customer anxiety about runaway bills.

## Key attributes

- **Pay-per-unit-of-use** — billing scales with consumption (API calls, GB stored, minutes)
- **Aligned with customer success** — customer scaling = your revenue scaling
- **Lower barrier to entry** — customers commit to less upfront
- **Revenue unpredictability** — usage varies month-to-month; hard to forecast
- **Net Revenue Retention compounds** — successful customers grow their usage = grow your revenue
- **Billing complexity** — metering, invoicing, dispute resolution non-trivial
- **Often combined with subscription** — base fee + usage overage (hybrid)

## When to use

- Cloud / infrastructure services where usage genuinely varies
- API products where customer success scales calls
- Categories where usage is measurable and customer-attributable
- B2B where customer companies want to start small and scale
- Utility-like services (telecom, energy, water)

## When NOT to use

- B2C contexts where users dislike billing variability (anxiety about runaway bills)
- Categories where usage is hard to meter cleanly
- When the firm needs predictable revenue (subscription is better)
- Very early-stage products where the customer can't predict their own usage

## Common pitfalls

- Bill shock — customer surprised by usage-driven bill, churns
- Underpricing the unit early, hard to raise later
- Complex metering customer doesn't understand
- Letting heavy customers eat margin (need volume tiers or graduated pricing)
- Sales-cycle complexity — quotes hard to give without usage forecasts
- Mix shift toward low-usage customers degrading economics

## Key metrics

- Revenue per active customer
- Usage growth rate per cohort
- Net Revenue Retention (NRR) — usage growth compounds
- Customer concentration (top 10% as % of usage)
- Billing predictability (variance in monthly bills per customer)
- Cohort revenue expansion

## Decision questions

- Is our usage genuinely customer-attributable and measurable cleanly?
- What's our pricing curve — flat per unit, tiered, volume discounts?
- How do customers forecast usage when buying? Do we help them?
- What happens to customers who suddenly consume more than expected — do they churn or upgrade?
- Should we offer a hybrid (base fee + usage) to smooth revenue?

## Canonical examples

- **AWS / Azure / GCP** — compute, storage, network billed per use (page 27)
- **Stripe** — payment processing, per-transaction pricing (page 28)
- **Twilio** — SMS/voice/email per message/minute (page 28)
- **Snowflake** — data warehouse compute and storage per use
- **OpenAI API** — per-token billing (page 29 era didn't cover, but archetype)
- **Utility companies** — kWh, gallons, etc.
- **Phone carriers (legacy)** — pay-per-minute, pay-per-text before unlimited plans

## Related concepts

- [[Subscription Business Model]] — _contrasts_with_ (subscription = fixed, usage = variable)
- [[Pricing Mechanisms]] — _see_also_
- [[Three-Tier Pricing]] — _see_also_ (hybrid: tiers with usage overage)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Subscription Business Model]] — _auto_ (score 7.8: tags×4.0, applicable_to×2.0, category×0.8, alias×1.0)
- [[Freemium Business Model]] — _auto_ (score 6.8: tags×2.0, applicable_to×3.0, category×0.8, alias×1.0)
- [[Bait and Hook Model]] — _auto_ (score 5.8: tags×2.0, applicable_to×2.0, category×0.8, alias×1.0)
- [[Data Monetization Model]] — _auto_ (score 5.8: tags×2.0, applicable_to×2.0, category×0.8, alias×1.0)
- [[Revenue Streams]] — _auto_ (score 5.5: tags×2.0, applicable_to×2.0, title×1.5)
- [[Bundling and Packaging Strategies]] — _auto_ (score 5.0: applicable_to×4.0, alias×1.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Revenue-Models-2nd-edition-df5jsj]] — pages 27-29
