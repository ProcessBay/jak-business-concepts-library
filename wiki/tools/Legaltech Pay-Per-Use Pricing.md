---
type: atom
title: Legaltech Pay-Per-Use Pricing
aliases: [Pay-Per-Use Legal Pricing, Unit-Based Legal Pricing, On-Demand Legal Pricing, Consumption Pricing for Legaltech]
category: pricing_tactic
applicable_to: [legaltech, legal, B2B, B2C, SMB, in_house_legal, law_firms, pricing]
key_metrics: [ARPU, utilization_rate, revenue_per_unit, customer_acquisition_cost, churn_rate, subscription_attach_rate, average_basket_size]
related:
  - "specializes: Consumption-Based Revenue Model"
  - "see_also: Three-Tier Pricing"
  - "see_also: Hybrid SaaS Pricing"
  - "competes_with: Subscription Business Model"
sources: [_Sources/Legaltech_Business_Model]
source_pages: "79-88"
tags: [legaltech, pricing, pay-per-use, consumption_based, unit_pricing, tactic]
created: 2026-06-17
---

# Legaltech Pay-Per-Use Pricing

## Definition

Pricing tactic for legaltech products where customers pay per discrete unit of consumption — a document review, a contract analysis, a search query, a research session, a signed envelope, a GB processed — rather than a flat subscription fee. Pereira documents pay-per-use as the fourth primary legaltech model alongside marketplace, SaaS, and freemium, arguing it specifically suits clients with irregular legal needs (most SMBs, occasional litigators, in-house teams with lumpy matter pipelines) who would otherwise reject a subscription. Pereira's pricing-design framework spans five mechanisms: (1) unit-based pricing (per task), (2) flexible tiered pricing (per-volume tiers), (3) subscription-pay-per-use hybrid (subscription covers baseline, overflow billed per unit), (4) customizable packages (bundled units at fixed price), and (5) usage-spike scalability and transparency (clear billing parameters, no surprise charges). The tactic trades the predictability of subscription revenue for a lower psychological barrier to first purchase and broader addressable market reach.

## Key attributes

- **Five canonical structures** — unit-based, flexible tiered, hybrid subscription+PPU, customizable packages, scalability/transparency frame
- **Variable revenue per customer** — directly proportional to usage; revenue forecasting is harder than subscription
- **Lower commitment threshold** — customers pay only for what they use, removing "shelfware" objection
- **Broad TAM reach** — startups, SMBs, occasional users who can't justify subscription become addressable
- **Hybrid is the common landing pattern** — pure pay-per-use is rare; most successful legaltech blends subscription baseline + overflow PPU (Rocket Lawyer model)
- **Transparency is load-bearing** — unexpected charges destroy trust faster in legal than other categories
- **Utilization rate is the primary health metric** — under-used products both kill revenue and signal churn risk
- **Cost structure must match revenue model** — vendor needs largely-variable COGS (cloud, API calls) for unit economics to work

## When to use

- Customers with lumpy or unpredictable legal needs (SMBs, startups, occasional litigators)
- Markets where subscription rejection is high — buyer's first objection is "but I won't use it every month"
- Legaltech products with clear, measurable units (documents reviewed, contracts analyzed, searches run, envelopes signed)
- Vendor-side: when COGS scales with usage (cloud compute, third-party APIs, attorney time)
- As a freemium-conversion mechanism — pay-per-use is the bridge between free and full subscription
- For new product categories where buyers can't yet predict their usage

## When NOT to use

- Products where the customer's value comes from continuous availability (insurance-like coverage, compliance monitoring)
- Vendor-side fixed-cost-heavy products (mostly fixed-cost SaaS) where revenue volatility hits margin hard
- Sticky enterprise relationships where subscription land-and-expand is the better growth path
- When the customer's procurement process can't handle variable invoices (many large corporates and government buyers want fixed annual)
- Markets where competitors offer all-you-can-eat subscription at flat pricing — PPU loses on TCO

## Common pitfalls

- **Revenue volatility surprises CFO** — subscription investors and operators discount variable revenue; explain unit economics relentlessly
- **Low utilization spiral** — customers who don't use don't renew; need usage-engagement program (onboarding, in-app prompts, success management)
- **Pricing per unit is hard to calibrate** — too low erodes margin; too high suppresses usage; A/B testing across segments needed
- **Surprise billing destroys trust** — usage spikes generating unexpected invoices are the #1 churn driver; require usage alerts, caps, prepay options
- **Cannibalization risk** — when launched alongside subscription, PPU can cannibalize subscription if cheaper for low-usage customers
- **Competitive-pricing race to the bottom** — if all competitors price per unit, transparent comparison shopping commoditizes
- **Forecasting accuracy collapses** — quarterly revenue forecasts become harder; sales-comp plans need redesign
- **Customer-segment misfit** — small-but-heavy-usage customers (the "power user") may pay more under PPU than they would under subscription; need careful segmentation

## Key metrics

- **ARPU** — average revenue per user (highly variable; track P25/P50/P75 not just mean)
- **Utilization rate** — units consumed vs. units enabled
- **Revenue per unit** — by customer segment and use case
- **CAC** — typically lower than subscription due to lower commitment threshold
- **Churn rate** — defined carefully (zero-usage month, three consecutive zero months, etc.)
- **Subscription attach rate** — % of PPU customers converting to hybrid or full subscription
- **Average basket size** — units per transaction
- **Revenue concentration by power user** — top-decile vs. long tail

## Decision questions

- Is our unit definition clear, valuable, and measurable to the customer (per document, per contract, per search)?
- What's our minimum viable margin per unit, and how does it scale at volume?
- Do we offer pure PPU, hybrid subscription+PPU, or PPU-with-prepay-credits (à la AWS)?
- How do we prevent surprise billing — usage alerts, hard caps, soft caps with overage rates?
- What's our retention plan when usage drops to zero — re-engagement, downgrade, win-back?
- Where does PPU sit in the pricing-tier ladder — entry tier or alongside subscription?

## Canonical examples

- **Rocket Lawyer** — Pereira's hybrid case; subscription baseline + on-demand attorney consultation as PPU layer (pages 128-130)
- **DocuSign** — envelope-based caps with overage pricing for enterprise editions
- **Westlaw / LexisNexis pay-as-you-go** — historical pay-per-search legal research pricing; legacy of the model
- **Avvo Q&A and document services** — per-document and per-consultation pricing within marketplace
- **eDiscovery platforms** — per-GB ingestion and per-GB-month hosting are dominant PPU patterns
- **Saudi context** — MoJ's Najiz prices certain services per transaction (notarization fees, court filings); private-sector legal-services platforms (Mohamy, Sahem) experiment with per-consultation pricing for SMB legal advice as the market matures

## Related concepts

- [[Consumption-Based Revenue Model]] — _specializes_ (legaltech-specific patterns)
- [[Hybrid SaaS Pricing]] — _see_also_ (subscription + PPU blend is the common landing pattern)
- [[Three-Tier Pricing]] — _see_also_ (PPU often sits as entry tier below subscription)
- [[Subscription Business Model]] — _competes_with_ (and increasingly blends)
- [[Usage-Based SaaS Pricing]] — _see_also_

## Sources

- [[_Sources/Legaltech_Business_Model]] — pages 79-88 (pay-per-use models in legaltech, advantages and benefits, challenges and considerations, designing a pay-per-use pricing structure, balancing pricing and value)
