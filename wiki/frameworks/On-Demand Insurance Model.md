---
type: atom
title: On-Demand Insurance Model
aliases: [Micro-Duration Insurance, Toggle Insurance, Pay-When-You-Use Insurance, Episodic Coverage]
category: business_model
applicable_to: [insurtech, insurance, B2C, gig_economy, mobility, travel]
key_metrics: [activation_rate, average_coverage_duration, premium_per_activation, repeat_activations_per_user, time_to_bind, claim_frequency_per_active_hour]
related:
  - "specializes: Direct Insurer Business Model"
  - "see_also: Usage-Based Insurance (UBI)"
  - "see_also: Embedded Insurance Model"
  - "contrasts_with: Subscription Business Model"
sources: [_Sources/Insurtech-Business-Model-2-f5khsw]
source_pages: "21-22, 34"
tags: [insurtech, insurance, business_model, on-demand, micro-duration, gig, mobility]
created: 2026-06-17
---

# On-Demand Insurance Model

## Definition

On-demand insurance lets the policyholder switch coverage on and off — for an hour, a day, a trip, a single item — and pays only for the active interval. Pereira's exemplars are Trov ("micro-duration policies for individual items that toggle on and off" — page 21) and Cuvva (auto cover "designed to suit drivers' lifestyles from just 1 hour to rolling monthly cover" — page 22). The model collapses the unit of insurance from a year-long policy into a billable episode, and shifts the customer mental model from "annual renewal" to "tap to protect." It depends on three substrates: real-time digital binding (no underwriter-in-the-loop), per-episode pricing (actuarial models that work on hours/items, not years), and mobile-first interface (the toggle has to live in the user's pocket). Strategically adjacent to UBI (both are post-annual-policy unbundlings) and to embedded insurance (on-demand is often distributed at point-of-use inside another app), it is distinct in that the customer is the one initiating each activation.

## Key attributes

- **Episodic activation** — coverage exists only when the user toggles it on
- **Sub-annual pricing units** — hours, days, trips, items rather than 12-month terms
- **Instant bind, instant cancel** — the entire policy lifecycle compressed to seconds
- **Mobile-native** — the toggle is the product
- **Item-level or activity-level** — Trov insured individual cameras; Cuvva insures one vehicle for one hour
- **Customer initiates each episode** — distinguishes from auto-on UBI telematics or embedded coverage
- **High activation frequency, low premium-per-activation** — economics live in volume, not ticket
- **Tight data loop with abuse detection** — short-duration covers are vulnerable to anti-selection ("buy cover the moment something feels risky")

## When to use

- Gig and platform-economy segments where coverage need is intermittent (rideshare drivers, delivery riders, vacation-property hosts)
- Categories where the annual-policy unit feels mispriced (occasional drivers, single-trip travellers, item-specific risk)
- When real-time underwriting data exists (location, weather, usage signals)
- When you can distribute the toggle natively in an app the user already opens
- Markets where consumers are mobile-fluent and trust app-based financial transactions

## When NOT to use

- Lines where adverse selection at the moment-of-need is uncontrollable (e.g. fire insurance toggled on as you smell smoke)
- Customer segments who want "set and forget" annual peace of mind
- Markets where regulators require minimum policy terms
- When unit economics can't absorb the per-activation acquisition / servicing cost
- Categories with claim severity so high a single episode wipes out a year of premium

## Common pitfalls

- **Anti-selection at activation** — without strong real-time risk signals, customers toggle on exactly when risk spikes
- **Forgotten-toggle disputes** — claims arise from periods the user thought were covered and weren't
- **Acquisition cost mismatch** — paying CAC for a customer whose lifetime premium is $40 of micro-activations
- **Regulatory friction** — minimum-term laws, stamp duties, and IPT structures designed for annual policies misfire on micro-duration
- **Capital allocation strain** — short-duration premiums create lumpy reserve and IBNR forecasting
- **Trov's exit** — the original on-demand pioneer pivoted away from D2C in 2019; the model is harder to monetize standalone than as an embedded layer

## Key metrics

- **Activation Rate** — activations per active user per period
- **Average Coverage Duration** — the unit of the product
- **Premium per Activation** — ticket size
- **Repeat Activations per User** — proxy for product-market fit
- **Time-to-Bind** — must be seconds, not minutes
- **Claim Frequency per Active Hour** — the anti-selection signal
- **Loss Ratio per Episode Type** — drives which episodes you keep underwriting

## Decision questions

- Does our category have a credible "moment of activation" that isn't a moment of imminent loss?
- Can we underwrite in real time using signals the user doesn't control?
- Will users open our app or someone else's at the moment of need (and does that mean we should be embedded, not standalone)?
- Can our reinsurance partner price episodic exposure?
- Is the activation-driven LTV mathematically larger than our CAC?

## Canonical examples

- **Trov** — micro-duration insurance on individual items via app; toggle on/off (page 21); later pivoted from D2C to embedded-tech provider
- **Cuvva (UK)** — flexible auto cover from 1 hour to rolling monthly; learner-driver and temporary cover for borrowed cars (page 22)
- **Metromile** — pay-per-mile is the UBI cousin; structurally annual but priced episodically (page 21)
- **Hippo, Slice, Marmalade** — on-demand homeowners / cyber / learner-driver in adjacent markets
- **Saudi context** — limited mature on-demand operators; **Tameeni / Taajeer** distribute short-period motor cover (e.g., 1-week, 1-month) as a stepping-stone toward true on-demand; gig-rider and delivery coverage via **HungerStation** and **Mrsool** partnerships are the most likely on-ramp

## Related concepts

- [[Direct Insurer Business Model]] — _specializes_ (on-demand is a temporal slicing of the direct stack)
- [[Usage-Based Insurance (UBI)]] — _see_also_ (both unbundle the annual policy; UBI is passive, on-demand is active)
- [[Embedded Insurance Model]] — _see_also_ (on-demand often distributes via host-app embedding)
- [[Subscription Business Model]] — _contrasts_with_ (recurring vs. episodic billing)
- [[Microinsurance Model]] — _see_also_ (both make insurance affordable via smaller units)

## Sources

- [[_Sources/Insurtech-Business-Model-2-f5khsw]] — pages 21-22 (Trov, Cuvva), page 34 (telematics + episodic context)
