---
type: atom
title: Open Banking
aliases: [Open Banking, Banking-as-a-Service APIs, Open Finance, PSD2, Account Aggregation]
category: concept
applicable_to: [fintech, banking, payments, API_economy, B2B]
key_metrics: [API_call_volume, third_party_partners, accounts_aggregated, revenue_per_API_call, partner_revenue_share]
related:
  - "amplifies: Neobank Business Model"
  - "amplifies: Embedded Finance"
  - "uses: APIs As Revenue Stream"
  - "see_also: Aggregator Business Model"
  - "see_also: Multiple Revenue Streams"
sources: [_Sources/Fintech-Business-Models-2nd-edition-sgy2j0]
source_pages: "29"
tags: [fintech, concept, open_banking, API, banking, B2B]
created: 2026-06-17
---

# Open Banking

## Definition

Open Banking is a regulatory and technical framework that requires (or enables) banks to expose customer financial data and payment-initiation capabilities to authorized third parties through standardized APIs, with the customer's consent. Pereira positions it as a structural shift in how value flows through fintech: "FinTech companies sell licenses and code as a result of their new business model. This collaboration has proven to be a boon for the companies who are doing it, and for the smaller institutions that are looking to grow… As Open Banking gains traction, more and more FinTech companies will adopt this strategy to boost revenue. In the next few years, FinTech companies charging retailers and other companies to use their banking infrastructure will become a new way of increasing or sourcing revenue" (page 29). It is the rail that unlocks Embedded Finance, Banking-as-a-Service, and most cross-fintech partnerships. Architecturally, it inverts the bank from "destination" to "platform"; commercially, it converts customer data from a proprietary asset to a licensable one. Major implementations include the EU's PSD2, UK Open Banking, Australia's CDR, and Saudi Arabia's SAMA Open Banking Framework (live phased rollout since 2022).

## Key attributes

- **API-based data and payment access** — third parties query account data and initiate payments via standardized endpoints
- **Customer-consent driven** — the customer authorizes each third-party connection; consent is revocable
- **Regulatory mandate in many markets** — PSD2 (EU), CMA9 (UK), CDR (Australia), SAMA Framework (Saudi Arabia)
- **Bidirectional revenue model** — banks monetize APIs; fintechs build products on top
- **Foundation for Embedded Finance** — without Open Banking rails, embedded products require fragile bilateral integrations
- **TPP categorization** — Account Information Service Providers (AISPs) read data; Payment Initiation Service Providers (PISPs) move money
- **Security and standardization burden** — OAuth, FAPI, strong customer authentication; high implementation cost

## When to use

- When designing a fintech that depends on third-party bank data (PFM, lending underwriting, accounting integration)
- When building a banking-as-a-service offering — your APIs become someone else's product
- When you're an incumbent bank looking to monetize data and infrastructure as new revenue (page 29)
- When operating in markets with mandated Open Banking compliance (compliance becomes opportunity)
- When building cross-bank user experiences (single-app view of multiple bank accounts)

## When NOT to use

- In jurisdictions without Open Banking regulation, where bilateral data agreements are prohibitively expensive
- When you cannot afford the security / compliance investment APIs demand
- When customer-consent friction destroys conversion (some flows still don't justify the OAuth dance)
- When data quality on the bank side is too poor to build a reliable product on top
- When the regulatory framework restricts your specific use case (some jurisdictions limit PISP, not just AISP)

## Common pitfalls

- Treating Open Banking as compliance overhead rather than a strategic platform play
- Building on bank APIs that are sandbox-quality and break in production
- Underestimating consent-flow churn — every refresh asks the user to re-authorize
- Conflating "open banking" with "open data" — payment initiation is a distinct, harder regulatory track
- Failing to monetize on the bank side — many banks built mandated APIs and treated them as cost, not product
- Ignoring liability questions when payment-initiation goes wrong (who pays for a failed PISP transfer?)

## Key metrics

- **API call volume** (read vs. write, by partner)
- **Third-party partners** (AISPs / PISPs connected)
- **Accounts aggregated** across partners
- **Revenue per API call** or per active connection (commercial Open Banking)
- **Partner revenue share** (for bank-side monetization)
- **Consent refresh / renewal rate** (drop-off is the killer metric for user-facing fintechs)
- **Latency and uptime** of Open Banking endpoints (bank side)

## Decision questions

- Are we consuming Open Banking (TPP) or providing it (bank/issuer) — or both?
- What does our consent UX look like, and how do we minimize refresh drop-off?
- Which regulatory framework applies in each market we operate in?
- Is Open Banking a feature or a business — and if a business, what's the pricing model?
- How do we handle partner liability and dispute resolution?
- What's our roadmap from data access to payment initiation to embedded products?

## Canonical examples

- **PSD2 / EU** — the regulation that ignited modern Open Banking
- **UK Open Banking (CMA9)** — most mature Open Banking ecosystem; CMA-mandated rollout to the 9 largest UK banks
- **Plaid, TrueLayer, Tink** — leading Open Banking infrastructure / aggregator businesses
- **Yapily, Token.io** — PISP/AISP infrastructure plays
- **Saudi Arabia SAMA Open Banking Framework** — phased rollout since 2022; account information services live; payment initiation in expansion
- **Lean Technologies** (Saudi Arabia / MENA) — leading regional Open Banking infrastructure provider
- **Tarabut Gateway** — MENA Open Banking infrastructure (Bahrain / UAE / Saudi)
- **Ant Financial** (China) — informal "open banking" via transaction-data lending to SMEs (pages 48-49)

## Related concepts

- [[Neobank Business Model]] — _amplifies_ (Open Banking rails make neobank cross-sell economic)
- [[Embedded Finance]] — _amplifies_ (Open Banking is the underlying rail)
- [[APIs As Revenue Stream]] — _see_also_ (Open Banking is a specific instance)
- [[Aggregator Business Model]] — _see_also_ (aggregator fintechs are TPPs by another name)
- [[P2P Lending Business Model]] — _uses_ (account data improves underwriting)
- [[Digital Wallet Business Model]] — _uses_ (account aggregation feeds wallet functionality)

## Sources

- [[_Sources/Fintech-Business-Models-2nd-edition-sgy2j0]] — page 29 (Open Banking as new revenue stream for fintechs; APIs charging retailers and other companies for banking infrastructure access)
