---
type: atom
title: Per-Seat SaaS Pricing
aliases: [Per-User Pricing, Per-Seat Pricing, Per-License Pricing, Seat-Based Pricing]
category: framework
applicable_to: [SaaS, B2B_SaaS, collaboration_software, CRM, productivity_tools]
key_metrics: [ARPU, seats_per_account, seat_expansion_rate, ARR, NRR, time_to_seat_growth, CAC_payback]
related:
  - "specializes: SaaS Pricing Models"
  - "amplifies: Land and Expand Model"
  - "see_also: Three-Tier Pricing"
  - "see_also: Hybrid SaaS Pricing"
  - "contrasts_with: Usage-Based SaaS Pricing"
sources: [_Sources/Pricing_Strategies_for_SaaS-flmttw]
source_pages: "26-28,59-60,104-105"
tags: [SaaS, pricing, per-seat, per-user, B2B, subscription, monetization]
created: 2026-06-07
---

# Per-Seat SaaS Pricing

## Definition

Per-Seat SaaS Pricing (also called per-user pricing) charges customers based on the number of named users, licenses, or seats with access to the software. Pereira positions it as one of the five primary SaaS pricing architectures and the dominant model for collaboration, CRM, productivity, and project management tools. Revenue scales linearly with team adoption: a customer with 50 seats pays 50× the per-seat price. The model's elegance is in its alignment — more people getting value means proportionally more revenue — but the trade-off is that it can penalize adoption (every new user adds cost), incentivize account sharing, and fail to capture heavy-user value. The Slack and Salesforce case studies in the book show per-seat working in concert with tiered packaging, where each seat-tier combination produces a different ARPU.

## Key attributes

- **Linear revenue scaling** — N seats × per-seat price; predictable for both buyer and seller
- **Active-vs-inactive user definition matters** — Pereira flags this as the biggest design decision; counting inactive users inflates bills and erodes trust
- **Seat thresholds map to tiers** — common pattern: 1-10 seats Basic, 10-50 Pro, 50+ Enterprise (book describes this structure)
- **Easy customer math** — "X seats × $Y = monthly cost" is the most transparent SaaS pricing customers see
- **Expansion path built-in** — team growth = revenue growth without any sales action
- **Admin overhead** — accurate seat tracking for large enterprises with departments and contractors is non-trivial (page 28)
- **Per-user vs per-organization choice** — Pereira contrasts seat-based with flat per-org pricing (page 59-60)
- **Often combined with tiered packaging** — a tier sets the feature set; seat count sets the volume

## When to use

- Team collaboration tools where each user gets independent value (Slack, Asana, Notion, Microsoft 365)
- CRMs and sales tools where each rep needs their own login (Salesforce, HubSpot Sales)
- B2B SaaS pursuing Land-and-Expand — seat count is the natural expansion metric
- Products where value scales with team size, not data volume or transactions
- Categories where competitors already price per-seat and buyers expect it
- When seat count is a clean, undisputable measurement (no metering ambiguity)

## When NOT to use

- Single-admin tools (analytics dashboards, ops tools) where one user serves many — penalizes adoption
- Infrastructure / API products where usage, not users, drives value (use [[Usage-Based SaaS Pricing]])
- Consumer-style apps where individual purchase decisions matter (use flat or tiered)
- High-volume seat needs at low per-seat economic value (creates billing friction)
- When customer can easily share one login among many people (login sharing destroys the model)

## Common pitfalls

- **Defining "user" loosely** — counting deactivated, dormant, or guest users feels predatory and breaks trust
- **No volume discounting** — flat per-seat pricing at 5,000 seats prices out big customers; needs enterprise tier
- **Per-seat-only architecture** — leaving no room for power-user upcharges or platform-level fees
- **Penalizing adoption** — when adding a teammate has friction (procurement, license requests), product adoption stalls inside accounts
- **Account sharing arbitrage** — without SSO enforcement, customers rotate one login among the team
- **Ignoring inactive seats** — buyers want auto-deprovisioning and bill credits for unused seats
- **Tier-seat misalignment** — putting must-have features behind both higher tier AND more seats compounds friction

## Key metrics

- **ARPU** — average revenue per user (across all customers)
- **Seats per account** — distribution and average; rising trend = healthy land-and-expand
- **Seat expansion rate** — % growth in seat count within existing accounts (quarterly)
- **NRR (Net Revenue Retention)** — Pereira frames per-seat as a key NRR driver
- **CAC payback period** — months to recover acquisition cost from per-seat ARR
- **Time-to-team-adoption** — speed at which a new account adds beyond the initial seat
- **Active-to-licensed ratio** — % of paid seats actually using the product (health signal)

## Decision questions

- Does every additional user genuinely get independent value, or are some seats just shadow-licenses?
- How will we define "active user" — and will customers accept that definition at billing time?
- What's our seat-volume discount schedule (or do we tier by seats × features)?
- Can we enforce per-seat pricing technically (SSO, unique-login detection), or will customers game it?
- Does our pricing penalize the very adoption that grows account value? If yes, redesign.
- What's our expansion threshold trigger (seat count, % of org penetration) that signals "ready for enterprise tier"?

## Canonical examples

- **Slack** — per-active-user pricing combined with tiered packaging (Standard, Plus, Enterprise Grid); pages 104-105
- **Salesforce** — per-user licensing across Essentials / Professional / Enterprise / Unlimited tiers (pages 102-103)
- **Microsoft 365** — per-user with feature tiers (Business Basic / Standard / Premium / E3 / E5)
- **Asana, Monday, ClickUp** — per-seat with workspace-level tiering
- **HubSpot Sales/Service Hub** — per-paid-seat on top of a tiered platform fee
- **Zoom** — adopts the close-cousin per-host model (host = the person who schedules and runs meetings), book pages 105-107

## Related concepts

- [[SaaS Pricing Models]] — _specializes_ (per-seat is one of the five primary SaaS pricing architectures)
- [[Land and Expand Model]] — _amplifies_ (seat count growth IS the expansion motion)
- [[Three-Tier Pricing]] — _see_also_ (per-seat almost always combined with feature tiers)
- [[Hybrid SaaS Pricing]] — _see_also_ (per-seat as one leg of a hybrid model)
- [[Usage-Based SaaS Pricing]] — _contrasts_with_ (consumption- vs license-based)
- [[SaaS Metrics Suite]] — _see_also_ (ARPU, NRR, expansion metrics)

## Sources

- [[_Sources/Pricing_Strategies_for_SaaS-flmttw]] — pages 26-28 (per-user pricing model definition, pros/cons, user-definition decisions, tiering), pages 59-60 (per-user vs per-organization trade-offs), pages 104-105 (Slack case study showing per-active-user combined with tiered packaging)
