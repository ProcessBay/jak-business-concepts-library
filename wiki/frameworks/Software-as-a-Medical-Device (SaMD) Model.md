---
type: atom
title: Software-as-a-Medical-Device (SaMD) Model
aliases: [SaMD, Software as a Medical Device, Medical Software Model, Clinical Software Model]
category: vertical_business_model
applicable_to: [healthtech, medtech, B2B, B2B2C, providers, payors, regulated_software]
key_metrics: [regulatory_clearance_count, ACV, ARR, deployment_count, clinical_validation_studies, reimbursement_codes, integration_count, NPS_clinician]
related:
  - "specializes: SaaS Business Model"
  - "see_also: Healthcare Reimbursement Revenue Model"
  - "see_also: Telehealth Platform Model"
  - "see_also: Value-Based Care Contracting"
sources: [_Sources/HealthTech-Business-Model-]
source_pages: "68-69"
tags: [healthtech, business_model, samd, regulated_software, medtech, B2B, digital_therapeutics]
created: 2026-06-17
---

# Software-as-a-Medical-Device (SaMD) Model

## Definition

Software-as-a-Medical-Device (SaMD), per the IMDRF definition Pereira nods to, is software intended to perform one or more medical purposes — diagnosis, treatment, monitoring — **without being part of a hardware medical device**. The software itself is the regulated medical product. Pereira positions SaMD as a distinct revenue stream within the "Insurers as Your Sponsors" hybrid B2C/B2B pattern: the platform sells the software-as-medical-device to hospitals and physicians, and the cost is typically reimbursable by insurers as a billable medical good. SaMD is the regulatory cousin of digital therapeutics (DTx), clinical decision support (CDS), AI-imaging diagnostics, and continuous-monitoring algorithms. What distinguishes SaMD economically from generic healthtech SaaS is the regulatory moat — FDA 510(k), De Novo, PMA clearance, EU MDR conformity, SFDA registration — each of which costs 12-36 months and $1-10M+ to obtain, and each of which structurally protects pricing.

## Key attributes

- **The software is the regulated medical product** — not a wrapper around a device; the algorithm is what's cleared
- **Regulatory clearance gates revenue** — no FDA/EU MDR/SFDA clearance means no claims, no reimbursement, no enterprise sales
- **Clinical evidence is the moat** — RCTs, real-world evidence, peer-reviewed publications; competitors without them can't catch up quickly
- **Reimbursement-linked pricing** — when a CPT code (or equivalent) exists, ACV jumps 5-10x; without it, you sell as SaaS
- **Long enterprise sales cycles** — hospital procurement, IT security review, clinical governance committee, legal; 9-18 months typical
- **Integration depth matters** — EMR/EHR integration (Epic, Cerner, Oracle Health) is table stakes for serious deployment
- **Post-market surveillance obligation** — regulators require ongoing safety monitoring; the cost doesn't end at clearance
- **Cyber and data security** — HIPAA, EU MDR cybersecurity annex, SFDA data rules; one breach can revoke clearance

## When to use

- The product makes or materially supports a clinical decision — diagnosis, treatment selection, therapy delivery, prognosis
- There is plausible reimbursement path (existing CPT code, a Category III code, or a clear policy trajectory)
- The team can fund a 2-3 year regulatory + clinical evidence runway before meaningful revenue
- The clinical use case has measurable, objective endpoints (sensitivity, specificity, time-to-diagnosis, outcome improvement)
- Hospital/provider customers see workflow value, not just clinical value (otherwise procurement stalls forever)

## When NOT to use

- The product is purely wellness/lifestyle (not making clinical claims) — SaMD's regulatory cost is wasted overhead
- No realistic reimbursement story and no enterprise willingness to pay out-of-pocket
- The use case is too niche to support the fixed regulatory cost
- The team has no regulatory or clinical-affairs DNA — outsourced RA can take you to 510(k) but not durable post-market
- Markets where the regulatory pathway is unclear or de facto requires US/EU clearance first as a precondition

## Common pitfalls

- **Building first, regulating later** — code that wasn't built under design controls (ISO 13485, IEC 62304) often has to be partly rewritten to be clearance-ready
- **Underestimating clinical evidence cost** — pivotal studies for AI/ML SaMD can run $2-10M and 18-36 months
- **Off-label promotion** — marketing claims that exceed the cleared indication is a fast track to warning letters and import bans
- **Model drift and the AI/ML regulatory predicate** — algorithms that retrain in deployment face evolving rules (FDA PCCP, EU AI Act); planning for "locked vs. continuously learning" matters at design time
- **Cybersecurity gap** — devices found vulnerable in post-market can be recalled; budget cyber from day one
- **Integration as an afterthought** — hospitals don't want another standalone tool; EMR integration is months of work and politics
- **Selling to clinicians instead of buyers** — clinicians champion, but the contract is signed by CMIO, CFO, or procurement; talk to all three early
- **Ignoring local regulators** — FDA clearance doesn't grant SFDA, MOH, NHRA, or DHA approval; each market is its own gate

## Key metrics

- **Regulatory clearance count** by jurisdiction (FDA, EU MDR, SFDA, Health Canada, TGA, etc.)
- **ACV / ARR** — typical SaMD enterprise deal is $50K-$500K+ ACV depending on use case and hospital size
- **Deployment count** — # of live hospital/clinic sites
- **Clinical validation studies** published in peer-reviewed journals
- **Reimbursement codes secured** (CPT Category I/III, HCPCS, local equivalents)
- **EMR integration count** — Epic App Orchard, Cerner Code, Oracle Health, custom HL7/FHIR
- **NPS clinician** — predicts re-procurement and reference selling
- **Time from contract to go-live** — proxy for product/integration maturity

## Decision questions

- What's the regulatory pathway in each market we'll sell into, and what's the cost and time?
- Is our clinical use case strong enough to support the evidence burden — or are we forcing SaMD onto wellness software?
- How do we fund the 24-36 month gap between R&D and meaningful revenue?
- Where does reimbursement come from, and what's our plan if it doesn't arrive?
- Are we built under ISO 13485/IEC 62304 from day one, or carrying QMS debt we'll have to repay?
- What's our integration strategy with EMR — Epic-first, agnostic, or middleware-based?
- How do we govern AI/ML model updates under evolving rules (FDA PCCP, EU AI Act high-risk classification)?

## Canonical examples

- **IDx-DR** (now Digital Diagnostics) — first FDA-cleared autonomous AI for diabetic retinopathy
- **Caption Health** — AI-guided cardiac ultrasound; FDA-cleared
- **Viz.ai** — stroke detection on CT imaging; reimbursable via CPT
- **Aidoc, Zebra Medical, Lunit** — radiology AI SaMD
- **Pear Therapeutics** (reSET, reSET-O, Somryst) — prescription digital therapeutics for SUD and insomnia; cautionary tale on reimbursement maturity
- **Akili (EndeavorRx)** — FDA-cleared video-game DTx for paediatric ADHD
- **Babyl/Babylon GP at hand** — symptom-checker SaMD claims
- **Cura, Altibbi** (MENA) — pieces of their stack approach SaMD claims as they mature toward AI triage; SFDA registration of clinical software is an emerging path in KSA
- **Tempus, Foundation Medicine** — genomic interpretation as SaMD-adjacent

## Related concepts

- [[SaaS Business Model]] — _specializes_ (SaMD is regulated SaaS for clinical use)
- [[Healthcare Reimbursement Revenue Model]] — _see_also_ (how SaMD gets paid)
- [[Telehealth Platform Model]] — _see_also_ (often paired with SaMD for AI-triage)
- [[Value-Based Care Contracting]] — _see_also_ (SaMD can be sold on outcome-based contracts)
- [[B2B SaaS Business Model]] — _see_also_

## Sources

- [[_Sources/HealthTech-Business-Model-]] — pages 68 (Software-as-a-medical-device model — "marketing healthcare software to hospitals and physicians"), 69 (B2B contract structures); SaMD treated in source as one revenue stream within "Insurers as Your Sponsors" / B2B hospital contracts pattern
