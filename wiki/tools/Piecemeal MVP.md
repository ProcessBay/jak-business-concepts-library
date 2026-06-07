---
type: atom
title: Piecemeal MVP
aliases: [Piecemeal MV, Stitched MVP, Glue Code MVP, Existing-Tools MVP]
category: tactic
applicable_to: [startups, B2B, B2C, SaaS, e_commerce, marketplaces, MVP_design]
key_metrics: [time_to_launch, validated_learning_per_dollar, gross_margin_proxy, conversion_rate]
related:
  - "specializes: Minimum Viable Product"
  - "amplifies: Build-Measure-Learn Loop"
  - "see_also: Concierge MVP"
  - "see_also: Wizard of Oz Test"
sources: [_Sources/Minimum-Viable-Product-MVP-txseve]
source_pages: "36,66,81"
tags: [tactic, MVP, validation, no_code, lean_startup]
created: 2026-06-02
---

# Piecemeal MVP

## Definition

A Piecemeal MVP is a tactic for delivering a real product or service to customers by stitching together existing tools, platforms, and third-party services — instead of building anything bespoke. Pereira describes it as "an inexpensive way of delivering products to customers... use existing tools and solutions so that you don't have to develop everything from scratch." A Piecemeal MVP might combine off-the-shelf e-commerce, payment processing, third-party fulfillment, a no-code form builder, and Zapier-style glue — producing a working end-to-end experience without proprietary code. The hypothesis under test is usually "does this combined workflow create value for customers?" without yet investing in a custom-built system.

## Key attributes

- **No proprietary build** — every component is an existing tool or service
- **Real end-to-end experience** — customers actually receive value
- **Glue code is the only "build"** — workflows wired together with integrations, scripts, or manual handoffs
- **Lower fidelity than a custom product** — UX is fragmented across tools
- **Margin sacrifice for speed** — third-party fees eat into unit economics intentionally
- **Tests the workflow, not the tech** — answers "is this WORTH building" before "how do we build it"
- **Easy to dismantle** — failed Piecemeal MVPs leave nothing to maintain

## When to use

- Marketplace or workflow-product validation where the question is "does this end-to-end flow work for users?"
- E-commerce category validation (sell other brands' products before designing your own)
- When the team lacks engineering capacity but has commercial conviction
- Pre-funding validation — show traction with zero infrastructure cost
- When the eventual product would be expensive to build and an early signal is needed

## When NOT to use

- When margins are tight and third-party fees would distort the unit economics signal
- For products whose value depends on a seamless, branded experience
- When the workflow involves sensitive data that can't move across third-party tools
- When the glue code is itself non-trivial to build and maintain
- Past validation — Piecemeal MVPs are not the production system

## Common pitfalls

- **Tool sprawl** — too many systems, each with its own bugs and login
- **Fragile glue** — one third-party API change breaks the whole flow
- **Misreading margin signals** — calling the business "unviable" when really the third-party fees are the issue
- **Inheriting tool limitations** — the MVP shape gets distorted by what existing tools can do
- **Letting the Piecemeal MVP become permanent** — technical debt accumulates as you scale on duct tape
- **Compliance gaps** — data handling across third parties may violate privacy rules

## Key metrics

- Time to launch (days, ideally)
- Validated learning per dollar of tool spend
- Gross margin proxy (would the unit economics work if you owned the stack?)
- End-to-end conversion rate (where does the stitched workflow lose people?)
- Customer support volume per transaction (signal of UX friction)

## Decision questions

- What workflow are we testing, and which existing tools can we stitch to deliver it end-to-end?
- Are we testing the workflow, or are we accidentally testing the limitations of our chosen tools?
- At what scale do the third-party fees stop making sense?
- What's our trigger to start building proprietary components?
- Is our customer's experience good enough that their feedback reflects the offer, not the duct tape?

## Canonical examples

- **Groupon** — started with a WordPress site, emailed PDF vouchers manually to subscribers, used existing payment tools. Built a custom backend only after the model proved out (page 81)
- **Marketplace MVPs** — list products from other marketplaces in your catalog, deliver orders via third-party services (Pereira's illustration, page 36)
- **No-code SaaS MVPs** — Bubble + Airtable + Stripe + Zapier as a complete product stack
- **Pre-Shopify e-commerce experiments** — using Etsy + Squarespace + Mailchimp instead of building a store

## Related concepts

- [[Minimum Viable Product]] — _specializes_
- [[Concierge MVP]] — _see_also_ (manual variant; Piecemeal automates with tools)
- [[Wizard of Oz Test]] — _see_also_ (Wizard hides the seams; Piecemeal shows them)
- [[Build-Measure-Learn Loop]] — _amplifies_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Concierge MVP]] — _auto_ (score 15.2: tags×8.0, applicable_to×5.0, title×1.5, category×0.8)
- [[Explainer Video MVP]] — _auto_ (score 15.2: tags×8.0, applicable_to×5.0, title×1.5, category×0.8)
- [[Landing Page MVP]] — _auto_ (score 15.2: tags×8.0, applicable_to×5.0, title×1.5, category×0.8)
- [[Single-Feature MVP]] — _auto_ (score 13.2: tags×6.0, applicable_to×5.0, title×1.5, category×0.8)
- [[Fake Door Test]] — _auto_ (score 11.8: tags×6.0, applicable_to×4.0, category×0.8, alias×1.0)
- [[Minimum Viable Product]] — _auto_ (score 11.0: tags×6.0, applicable_to×4.0, alias×1.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Minimum-Viable-Product-MVP-txseve]] — page 36 (Piecemeal MV card under High-Fidelity MVP types), page 66 (Piecemeal MVPs as validation method), page 81 (Groupon WordPress example)
