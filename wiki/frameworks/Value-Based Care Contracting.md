---
type: atom
title: Value-Based Care Contracting
aliases: [Value-Based Care, VBC, Risk-Based Contracting, Outcomes-Based Healthcare Contract, Value-Based Reimbursement]
category: vertical_business_model
applicable_to: [healthtech, healthcare, B2B, providers, payors, insurers]
key_metrics: [outcome_metric_achievement, cost_per_episode, readmission_rate, contract_share_at_risk, MLR, shared_savings_captured, patient_attributed_lives]
related:
  - "see_also: Telehealth Platform Model"
  - "see_also: Software-as-a-Medical-Device (SaMD) Model"
  - "see_also: Healthcare Reimbursement Revenue Model"
  - "see_also: Value-Based Pricing"
sources: [_Sources/HealthTech-Business-Model-]
source_pages: "23-24,28,54,68"
tags: [healthtech, business_model, value_based_care, reimbursement, B2B, payor, contracting]
created: 2026-06-17
---

# Value-Based Care Contracting

## Definition

Value-based care (VBC) contracting is a payment model in which payment for medical services is **predetermined based on expected metric-based patient outcomes**, rather than fee-for-service volume. Pereira frames it as the emerging counter-model to fragmented, inefficient pay-per-procedure healthcare: the provider (or healthtech vendor) accepts financial risk that outcomes will improve, and shares in savings or upside if they do. The book identifies two practical variants: (1) **risk-based contracting** — provider/vendor agrees to specific outcome metrics, with payment adjusted up or down based on achievement; (2) **value-based reimbursement** — paid regularly (typically annually) at a rate that floats based on usage volume or user-satisfaction-with-outcome. VBC sits structurally above multiple delivery models (telehealth, SaMD, on-demand) — it's the **payment architecture**, not the care-delivery model. It only works when outcomes are measurable, the patient population is attributable, and there's enough longitudinal data to settle the contract honestly.

## Key attributes

- **Payment is tied to outcomes, not volume** — clinical metrics (HbA1c reduction, readmission rate, mortality), experience metrics, or cost metrics
- **Risk-sharing spectrum** — upside-only (shared savings), two-sided (savings + downside), or full capitation (provider holds all risk)
- **Population attribution is the contract foundation** — the contract must define which patients "count" and how outcomes are measured
- **Long contracting cycle** — multi-year contracts are typical; outcomes data lags by 12-24 months
- **Bridges payor and provider incentives** — both sides want lower total cost and better outcomes for the contracted population
- **Demands deep data infrastructure** — claims data, EMR data, patient-reported outcomes; without integrated data, settlement is impossible
- **Outcome metric design is the political battleground** — what gets measured, how it's risk-adjusted, what counts as the baseline

## When to use

- Chronic disease management (diabetes, CHF, COPD, mental health) where intervention quality measurably changes outcomes
- Bundled-episode care (joint replacement, maternity, cardiac procedure) where total episode cost is the unit
- Large attributable populations (employer group, ACO, regional payor block, government payor) where statistics can settle a contract
- Markets where the payor is sophisticated enough to design and police outcome-based contracts (CMS, private US payors, NHS, Saudi CHI)
- Healthtech products that demonstrably move a clinical or cost metric the payor cares about

## When NOT to use

- Acute one-off interventions where outcomes are binary and short-horizon (trauma surgery, vaccination)
- Small patient populations where outcomes can't be statistically attributed
- Markets where payors are not equipped to design or honor outcome-based contracts (most emerging markets)
- Cases where the clinical metric is too noisy or too easily gamed (subjective scales without validation)
- Vendors who can't yet prove their intervention works — VBC before clinical evidence is naked risk

## Common pitfalls

- **Metric gaming** — the contracted metric improves while real health outcomes don't (Goodhart's Law in clinical scrubs)
- **Cherry-picking and lemon-dropping** — providers select healthier patients into the contract and exclude difficult ones; structurally undermines the model
- **Misaligned attribution windows** — patient outcomes credited to the wrong provider/vendor because attribution rules were vague
- **Risk adjustment failures** — population gets sicker through demographic drift; contract eats the loss
- **No baseline, no contract** — vendors signing VBC contracts before they have outcome baselines lose money structurally
- **Data plumbing nightmares** — settling a VBC contract requires matched claims+clinical+PRO data; if the pipes leak, the contract can't be settled
- **Regulatory mismatch** — many jurisdictions don't permit the payor structures VBC assumes (capitation in Gulf states is legally constrained)
- **Selling VBC as a "deal sweetener"** — vendors who concede risk to win the deal but don't operationally deliver outcomes go bankrupt fast

## Key metrics

- **Outcome metric achievement** — % of contracted metrics hit per measurement period
- **Cost per episode** or **per member per month (PMPM)** — the financial metric the contract is settling against
- **Readmission rate, ED utilization, complication rate** — common contracted clinical metrics
- **Contract share at risk** — % of contract value that's variable based on outcomes (upside-only vs. two-sided vs. full cap)
- **MLR (Medical Loss Ratio)** — if vendor is taking insurance-like risk
- **Shared savings captured** — actual $ collected from upside contracts
- **Patient attributed lives** — denominator for everything

## Decision questions

- What outcome are we promising to move, and do we have evidence we can move it?
- What's our baseline, who measures it, and who arbitrates disputes?
- What share of revenue are we putting at risk, and can we survive 1-2 years of bad outcomes?
- Who's the population, how are they attributed, and what's the churn rate inside the attributed pool?
- Is our data infrastructure actually capable of supporting contract settlement?
- What's the contract term, and what's the renegotiation trigger if baselines drift?
- Do we have a clinical-operations team to deliver the outcomes, or are we hoping the algorithm does it alone?

## Canonical examples

- **CMS ACO/MSSP programs** — US Medicare's flagship value-based contracting framework
- **Iora Health, ChenMed, Oak Street Health** (US) — value-based primary care provider models
- **Livongo (now Teladoc Health)** — diabetes management with outcome-linked employer/payor contracts
- **Omada Health, Virta Health** — DTx companies routinely contracting on outcomes (weight, A1c reversal)
- **Babylon Health** (UK NHS contract) — capitated GP-at-hand model; cautionary tale on risk discipline
- **CHI (Council of Health Insurance), KSA** — emerging value-based insurance design guidance for the Saudi payor ecosystem
- **NHS Long Term Plan** — value-based commissioning frameworks in England
- **Bundled-payment pilots** for joint replacement (Medicare BPCI, NHS Best Practice Tariff)

## Related concepts

- [[Value-Based Pricing]] — _see_also_ (generic parent of the pricing logic)
- [[Healthcare Reimbursement Revenue Model]] — _see_also_ (VBC is one of three reimbursement archetypes)
- [[Telehealth Platform Model]] — _see_also_ (VBC is how payors increasingly buy telehealth)
- [[Software-as-a-Medical-Device (SaMD) Model]] — _see_also_ (outcome-linked SaMD contracts)
- [[Shift Left Healthcare Model]] — _see_also_ (VBC is part of the structural shift)

## Sources

- [[_Sources/HealthTech-Business-Model-]] — pages 23-24 (risk-based contracting, two-sided networks in new GTM section), 28 (value-based care as goal of on-demand model), 54 (financial optimization), 68 (value-based reimbursements as payor revenue stream)
