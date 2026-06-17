---
type: atom
title: Healthcare Reimbursement Revenue Model
aliases: [Insurer-Sponsored Revenue Model, Insurance Reimbursement Model, Payor Revenue Model, Hybrid B2C B2B Health Model]
category: revenue_model
applicable_to: [healthtech, healthcare, B2B, B2B2C, providers, payors, insurers]
key_metrics: [reimbursement_rate, claim_denial_rate, days_in_AR, coverage_breadth, attached_lives, prior_auth_approval_rate, CPT_codes_secured]
related:
  - "see_also: Value-Based Care Contracting"
  - "see_also: Software-as-a-Medical-Device (SaMD) Model"
  - "see_also: Telehealth Platform Model"
  - "see_also: Multiple Revenue Streams"
sources: [_Sources/HealthTech-Business-Model-]
source_pages: "67-70,72-73"
tags: [healthtech, business_model, reimbursement, payor, B2B, B2B2C, revenue_model]
created: 2026-06-17
---

# Healthcare Reimbursement Revenue Model

## Definition

The healthcare reimbursement revenue model monetises a digital health product by having a **third-party payor — insurer, employer, government health authority — reimburse part or all of the cost** on behalf of the patient who uses it. It is a hybrid B2C/B2B model: the patient is the user, but the insurer is the buyer. Pereira identifies three archetypes: **(1) Fee-for-service** — payor reimburses each transaction the way it would a clinical procedure or drug; **(2) Value-based reimbursement** — periodic (typically annual) payment that floats based on usage volume or user-satisfaction-with-outcome; **(3) Software-as-a-Medical-Device (SaMD)** — the software itself is the billable medical good. Adjacent revenue streams sit on top: contracts with hospitals as B2B buyers (one-time license, subscription license, freemium-for-clinics, pay-per-use), and direct contracts with employer/government schemes. Pereira flags **reimbursement and payment problems** as one of the top reasons healthcare startups fail — fragmented state-by-state rules, inconsistent codes, and slow billing cycles strangle cash flow.

## Key attributes

- **Hybrid B2C/B2B structure** — user ≠ buyer; product decisions are made by the patient but paid for by the payor
- **Three archetypes** — fee-for-service, value-based reimbursement, SaMD
- **Reimbursement code is the gatekeeper** — without a CPT (US), HCPCS, AMA Cat-III, or local-equivalent code, you can't be billed for
- **Long cash conversion cycle** — days-in-AR of 60-120 days is typical; the model is working-capital-hungry
- **Coverage is jurisdiction-by-jurisdiction** — US: state Medicaid + private payor + Medicare; UK: NHS; KSA: CHI + MOH; UAE: DOH/Daman; each is its own sales motion
- **Payor concentration risk** — one payor can be 30%+ of revenue; if they change policy, the cliff is real
- **Prior authorisation and denial management** become operational disciplines, not afterthoughts
- **Coverage advocacy is a multi-year game** — securing reimbursement codes typically takes 18-36 months of evidence, lobbying, and society endorsement

## When to use

- Product delivers clinical value the payor can quantify (reduces hospital admissions, shortens recovery, prevents disease progression)
- Existing reimbursement codes apply, or there's a credible 2-3 year path to securing them
- Patient willingness-to-pay alone is too low to cover product cost (rare disease, chronic condition, low-income populations)
- Markets with sophisticated payor infrastructure (US, EU, UK, GCC private insurance)
- Company has the regulatory and clinical-evidence chops to support reimbursement claims

## When NOT to use

- Pure wellness/lifestyle products with no clinical claims — payors won't cover and shouldn't be asked to
- Markets where the payor landscape is fragmented or immature (most African and many Asian markets)
- Early-stage products without clinical evidence — pursuing reimbursement before evidence is wasting cycles
- Cash-flow-fragile startups — reimbursement cycles will starve them
- Use cases where direct-to-consumer cash-pay margins are healthy and reimbursement just adds operational complexity

## Common pitfalls

- **Building around one payor's billing codes** — when CMS or a private payor changes the rule, your business model collapses overnight (US 2023 telehealth wind-down)
- **Underestimating denial rates** — 15-30% denial rates are normal; without a denials team, those dollars are lost
- **Coverage but no reimbursement** — getting "covered" by a payor doesn't guarantee the reimbursement rate covers cost; rate matters more than coverage
- **Prior-auth bottlenecks** — products that need PA for every use die in the workflow
- **State-by-state fragmentation in US** — Medicaid rules differ by state; what works in California won't in Texas
- **Cross-border failure** — FDA-cleared and US-reimbursed doesn't translate to SFDA, CHI, NHRA, DHA reimbursement; each market is a separate 18-36 month workstream
- **Confusing payor pilots with payor contracts** — a 6-month payor pilot is not revenue; it's a credentialing exercise
- **Slow billing infrastructure** — DIY billing with no clearinghouse experience can extend days-in-AR to 180+
- **Failing the evidence-generation strategy** — Pereira explicitly flags this as a top failure mode; no RCT, no payor

## Key metrics

- **Reimbursement rate** by payor and CPT code — actual $ received per transaction
- **Claim denial rate** — % submitted claims initially denied; **first-pass approval rate** is the cleaner metric
- **Days in AR** — days from service to payment
- **Coverage breadth** — # payors × # lives covered ("attached lives")
- **Prior auth approval rate** and **PA cycle time**
- **CPT codes secured** (Category I, Category III, HCPCS)
- **Revenue per attached life** — the LTV-equivalent for payor-billed health products
- **Payor concentration** — % revenue from top 1, top 3, top 5 payors

## Decision questions

- Which payor archetype are we selling to — government, commercial insurer, employer, self-insured plan — and what's the contracting playbook for each?
- Do reimbursement codes exist for our use case, or do we need to build evidence and lobby for new ones?
- What's our clinical evidence package, and is it strong enough to support the rate we want?
- How do we fund the 12-24 month gap between product launch and first reimbursement dollar?
- What's our denial-management and AR operations capability — are we staffed for the back-office reality?
- How do we hedge payor concentration risk?
- Is our second market a regulatory-adjacent jurisdiction (FDA → EU MDR) or a separate ground-up effort (KSA, China)?

## Canonical examples

- **Teladoc Health** — heavy reliance on US private-payor and employer reimbursement; FFS + value-based mix
- **Livongo (now Teladoc)** — employer-paid chronic disease management; per-member-per-month with outcome alignment
- **Omada Health** — diabetes prevention; CDC-recognised DPP code, payor- and employer-billed
- **Pear Therapeutics** — FDA-cleared PDTs (reSET, Somryst); cautionary tale on slow payor adoption killing the company
- **Akili Interactive (EndeavorRx)** — FDA-cleared paediatric ADHD game; payor coverage struggles parallel Pear's
- **23andMe (clinical reports)** — limited payor reimbursement; primarily D2C
- **Hinge Health, Sword Health** — musculoskeletal DTx; employer-reimbursed at scale
- **Cura, SehatY** (KSA) — early integration with CHI reimbursement guidance; payor mix evolving
- **Tabby Care, Vezeeta** — bundled telehealth with insurance reimbursement in MENA

## Related concepts

- [[Value-Based Care Contracting]] — _see_also_ (the outcome-linked variant of reimbursement)
- [[Software-as-a-Medical-Device (SaMD) Model]] — _see_also_ (SaMD is one reimbursement archetype)
- [[Telehealth Platform Model]] — _see_also_ (telehealth often runs on reimbursement)
- [[Multiple Revenue Streams]] — _see_also_ (most healthtech blends D2C and reimbursement)
- [[B2B SaaS Business Model]] — _see_also_ (hospital contracts as adjacent revenue)

## Sources

- [[_Sources/HealthTech-Business-Model-]] — pages 67 (Direct-to-Customers vs Insurers as Sponsors framing), 68-69 (fee-for-service, value-based reimbursements, SaMD), 70 (B2B and B2B2C hospital contract types), 72-73 (reimbursement and payment problems as top failure mode)
