---
type: atom
title: Usage-Based Insurance (UBI)
aliases: [Pay-Per-Mile Insurance, Pay-How-You-Drive, PHYD, PAYD, Telematics Insurance, Behavioural Insurance]
category: business_model
applicable_to: [insurtech, insurance, auto, motor, fleet, B2C, telematics]
key_metrics: [miles_driven_per_policy, score_distribution, premium_per_mile, telematics_adoption_rate, loss_ratio_by_score_band, retention_by_score_band]
related:
  - "specializes: Direct Insurer Business Model"
  - "see_also: On-Demand Insurance Model"
  - "see_also: Parametric Insurance Model"
  - "contrasts_with: Subscription Business Model"
sources: [_Sources/Insurtech-Business-Model-2-f5khsw]
source_pages: "21, 33-34"
tags: [insurtech, insurance, business_model, UBI, telematics, IoT, motor, auto]
created: 2026-06-17
---

# Usage-Based Insurance (UBI)

## Definition

UBI prices insurance against observed behaviour rather than declared characteristics. Pereira locates UBI inside the IoT-driven Insurtech wave: "Telematics, the technology that is to monitor cars, trucks, equipment, and other assets by using GPS technology that allows the sending, receiving, and storing of telemetry data, paved the pathway for Usage-Based Insurance (UBI)" (page 34). The model collects real-time data from a vehicle (via dongle, app, or embedded OEM telematics), translates it into either an exposure metric (miles driven — "PAYD") or a behaviour score (acceleration, braking, cornering, time-of-day, phone-use — "PHYD"), and adjusts the premium accordingly. Pereira's two examples are Metromile (per-mile billing) and Root (multi-week telematics test before binding) — pages 21 and 34. UBI is the most data-intensive vertical Insurtech model and the one most exposed to privacy criticism (constant-surveillance concerns Pereira flags on page 40). It also flips the demographic-based pricing model that dominates motor insurance — replacing "20-year-old male in Riyadh" with "this specific driver's last 14 days of behaviour."

## Key attributes

- **Behaviour-priced** — exposure (PAYD) or behaviour (PHYD) replaces demographic proxies
- **Telematics substrate** — OBD dongle, mobile-phone sensors, or OEM embedded data
- **Continuous data loop** — pricing can be re-rated per renewal or even per trip
- **Real-time risk signals** — speed, harsh braking, cornering, phone-use, time-of-day, geography
- **Self-selection benefit** — safe drivers gravitate to UBI, improving the carrier's book mix
- **Required upfront test period (sometimes)** — Root's multi-week test before binding (page 21)
- **Privacy-trade-off product** — explicit surveillance in exchange for explicit discount
- **OEM-disintermediation risk** — auto manufacturers (Tesla, Ford) increasingly bundle their own UBI

## When to use

- Motor / fleet markets where demographic pricing is regulator-restricted or commercially blunt
- Markets where a meaningful subset of customers genuinely drive less or better than the average
- When you can acquire telematics data cheaply (mobile-only, no dongle)
- Fleet B2B where the buyer wants driver-coaching ROI in addition to premium savings
- Markets where the regulator allows real-time behavioural rating

## When NOT to use

- Lines where behaviour is not directly observable or not predictive of loss
- Privacy-sensitive markets or customer segments who will reject surveillance
- When the data-engineering cost outstrips the loss-ratio improvement
- Geographies where the road / claims environment is so chaotic that individual behaviour barely moves the loss curve
- When OEMs already own the data pipe and won't share it

## Common pitfalls

- **Score-band cliff** — small score changes producing large premium jumps create churn
- **Self-selection cap** — once the safest drivers are loaded onto your book, growth requires worse risks at lower discounts
- **Data-pipeline brittleness** — broken dongles, app uninstalls, and OS permission changes silently kill the rating signal
- **Regulator pushback** — geographical, time-of-day, or behavioural rating can be ruled discriminatory
- **Privacy backlash** — Pereira flags surveillance fatigue as a structural Insurtech criticism (page 40)
- **OEM data lock-in** — Tesla Insurance, Ford Insure, GM OnStar Insurance are absorbing the UBI customer at source

## Key metrics

- **Miles Driven per Policy** (PAYD) — the primary exposure unit
- **Score Distribution** (PHYD) — the shape of your book on a behaviour curve
- **Premium per Mile** — the headline rate variable
- **Telematics Adoption Rate** — share of book actively transmitting
- **Loss Ratio by Score Band** — the validation that score predicts loss
- **Retention by Score Band** — safe drivers should retain; punished drivers may churn (which can be a feature)
- **Combined Ratio** — UBI is supposed to beat the book average within ~24 months

## Decision questions

- Is our regulator comfortable with behavioural and geographical rating?
- Can we acquire telematics data without a hardware install?
- Will safe drivers in our market actually shop for the discount, or are they captive to incumbents?
- What's our data-engineering cost per active policy, and does it leave room for loss-ratio gain?
- What's our defence against OEM-owned telematics becoming the dominant rail?

## Canonical examples

- **Metromile (US)** — pay-per-mile pricing: low monthly base + per-mile fee (page 21)
- **Root (US)** — multi-week smartphone telematics test, then a price (page 21)
- **Progressive Snapshot, Allstate Drivewise, State Farm Drive Safe & Save** — incumbent UBI programmes
- **Tesla Insurance** — OEM-native real-time UBI
- **Octo Telematics, Cambridge Mobile Telematics** — UBI-as-a-service infrastructure providers
- **Saudi context** — **Tameeni** has piloted UBI motor with telematics partners; **SAMA** has signalled openness to behavioural rating; fleet UBI for B2B logistics (e.g., **Saudi Post / SPL**, **Aramex**) is the more mature near-term wedge than mass-consumer UBI

## Related concepts

- [[Direct Insurer Business Model]] — _specializes_ (UBI is a rating overlay on direct distribution)
- [[On-Demand Insurance Model]] — _see_also_ (both unbundle the annual policy; UBI is continuous, on-demand is episodic)
- [[Parametric Insurance Model]] — _see_also_ (both replace human-mediated assessment with data triggers)
- [[Subscription Business Model]] — _contrasts_with_ (flat recurring vs. behaviour-variable billing)
- [[IoT Business Models]] — _see_also_ (UBI is the canonical IoT-monetisation case in insurance)

## Sources

- [[_Sources/Insurtech-Business-Model-2-f5khsw]] — page 21 (Metromile, Root), pages 33-34 (IoT/telematics → UBI mechanism)
