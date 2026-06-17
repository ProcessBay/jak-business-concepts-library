---
type: atom
title: Healthcare Marketplace Model
aliases: [Health Marketplace, Doctor Marketplace, Medical Marketplace, Clinical Marketplace]
category: vertical_business_model
applicable_to: [healthtech, healthcare, B2C, B2B, providers, marketplaces]
key_metrics: [GMV, take_rate, listing_count, search_to_book_conversion, supply_liquidity, demand_liquidity, repeat_book_rate, NPS_two_sided]
related:
  - "specializes: Marketplace Business Model"
  - "see_also: Telehealth Platform Model"
  - "see_also: On-Demand Healthcare Model"
  - "see_also: Two-Sided Platform"
sources: [_Sources/HealthTech-Business-Model-]
source_pages: "34-36"
tags: [healthtech, business_model, marketplace, B2C, B2B, two_sided]
created: 2026-06-17
---

# Healthcare Marketplace Model

## Definition

A healthcare marketplace connects supply (clinicians, hospitals, medical devices, facilities) with demand (patients, hospitals, payers) on a single platform, replacing opaque, relationship-mediated transactions with searchable, reviewable, price-comparable ones. Pereira identifies three substrates: **(1) Doctors/Clinicians ↔ Hospitals/Patients** — patients choose providers by proximity, services, qualifications, pricing, reviews; **(2) Medical Devices ↔ Hospitals** — a sharing economy where underutilised imaging/surgical equipment is rented between facilities, preventing duplicate capex and unlocking new revenue for asset owners; **(3) Crowdsourced Safety Net** — peer support and crowdfunded financial aid for patients with chronic/debilitating illness (GoFundMe-pattern verticalised to healthcare). The marketplace mechanic creates a reverse-auction dynamic where service providers compete for patient demand, structurally pushing the sector toward value-based care, higher market efficiency, broader access, and lower average cost.

## Key attributes

- **Two-sided liquidity** — listings on one side, search/booking on the other; chicken-and-egg dynamics dominate launch
- **Discovery and trust layer** — search, filters, reviews, ratings, credential verification; the platform's job is reducing patient search cost
- **Reverse-auction dynamics** — providers compete on price, quality, availability; this is the structural argument for value-based care
- **Take-rate revenue** — booking fee, listing fee, or % of transaction; sometimes lead-gen subscription for providers
- **Asymmetric stakes** — patient picks once; provider lives or dies by the channel; this asymmetry shapes incentives
- **Credential verification is non-negotiable** — unlike Airbnb, a fake listing here kills people; the platform owns the liability
- **Three patterns: clinician marketplace, device marketplace, crowdsourced safety-net** (Pereira's taxonomy)
- **Often hybrid with on-demand or telehealth** — pure marketplace (search → book → see) is rare; most layer a service rail on top

## When to use

- Fragmented provider markets where patients struggle to find/compare options (most emerging-market healthcare)
- Specialties with high price/quality variance and informed patient demand (dentistry, fertility, aesthetics, elective surgery)
- B2B equipment markets where capex sits idle across nearby facilities
- Patient-financing or community-support use cases that traditional payers don't cover
- Markets with growing health-tourism flows (KSA, UAE, Thailand) where international patients need a discovery surface

## When NOT to use

- Markets where the payer (insurance, single-payer) dictates network and removes patient choice
- Acute/emergency settings — patients don't shop, they're routed
- Specialties dominated by primary-care relationship and referral chains (most chronic care)
- Markets without enough provider density to create real choice (rural, very small countries)
- Categories where regulation forbids paid lead-gen for clinical services (some EU/Gulf jurisdictions restrict commission on patient referrals)

## Common pitfalls

- **Anti-kickback / patient-referral law violations** — many jurisdictions criminalise commission-per-patient-booking for clinical services; the platform must redesign monetization (listing fees, subscriptions, ads) to stay legal
- **Race-to-the-bottom on price** — pure price competition strips margin from providers, who then degrade quality or quit the platform
- **Fake/inflated reviews** — clinical reputation can't survive Trustpilot-style review fraud; the moderation cost is real
- **Credential-verification failure** — onboarding unlicensed or mis-specialty practitioners is a regulatory and PR catastrophe
- **Cold-start in both sides simultaneously** — paying for supply before demand exists, or vice versa; most healthcare marketplaces under-budget the chicken-and-egg phase
- **Letting providers transact off-platform** — once the patient-provider relationship forms, both sides have incentive to bypass the fee; weak network defensibility
- **Confusing marketplace with EMR** — providers need workflow tools (scheduling, billing); marketplaces that don't deliver them lose supply

## Key metrics

- **GMV** (gross booking value) and **take rate** — the marketplace's revenue equation
- **Listing count** by specialty and geography; **supply liquidity** (% listings with availability in next 7 days)
- **Search-to-book conversion** — the canonical marketplace funnel metric
- **Repeat book rate** — does the patient come back to the marketplace, or directly to the provider
- **Demand liquidity** — % search queries returning ≥3 viable options
- **NPS** measured separately on both sides — the cheapest predictor of whether either side will defect
- **Off-platform leakage rate** — the marketplace killer; surveyed or inferred from booking patterns

## Decision questions

- Which side is harder to acquire — supply or demand — and how do we subsidise it to build liquidity?
- What's our regulatory posture on patient-referral commissions in each jurisdiction we operate?
- How do we credential and verify providers at scale without bottlenecking onboarding?
- What's our defence against off-platform leakage once the patient and provider know each other?
- Do we monetize listings (provider pays subscription/lead-gen) or transactions (commission per booking)? Which survives the regulatory test?
- Are we a pure discovery layer, or are we integrating workflow (scheduling, EMR, payments) deeply enough to be the system of record?

## Canonical examples

- **Zocdoc** (US) — appointment marketplace; subscription monetization to dodge per-referral law
- **Doctolib** (France, Germany) — booking + practice management; deep workflow defensibility
- **Practo** (India) — search + book + telehealth; multi-product evolution from marketplace roots
- **Vezeeta** (Egypt, KSA, Lebanon, Jordan) — MENA's leading doctor-discovery marketplace
- **Tabeebak** (KSA) — local doctor-finder marketplace
- **Cura, SehatY** (KSA) — telemedicine with discovery features
- **Doctify** (UK) — review-led doctor discovery
- **GoFundMe Medical** — the crowdsourced safety-net pattern Pereira describes
- **Cohealo, Medinas** (US) — medical-device sharing/secondary-market marketplaces

## Related concepts

- [[Marketplace Business Model]] — _specializes_ (sector-agnostic parent)
- [[Telehealth Platform Model]] — _see_also_ (often layered on top of a marketplace substrate)
- [[On-Demand Healthcare Model]] — _see_also_ (frequently fused with on-demand)
- [[Two-Sided Platform]] — _see_also_
- [[Shift Left Healthcare Model]] — _see_also_ (marketplaces are central to the B2C shift)

## Sources

- [[_Sources/HealthTech-Business-Model-]] — pages 34-36 (definition; three application areas — clinicians/hospitals, medical devices, crowdsourced safety net; ecosystem effects of B2C marketplace shift)
