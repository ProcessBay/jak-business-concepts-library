---
type: atom
title: Blockchain-as-a-Service (BaaS)
aliases: [BaaS, Blockchain as a Service, Managed Blockchain, Enterprise Blockchain Service]
category: vertical_business_model
applicable_to: [web3, blockchain, enterprise, B2B, cloud, SaaS, healthcare, automotive, fintech, supply_chain]
key_metrics: [ARR, paying_tenants, contract_value, transactions_per_second_billed, storage_consumed, smart_contract_deployments, integration_partners]
related:
  - "specializes: As-a-Service Business Model"
  - "specializes: Platform-as-a-Service"
  - "see_also: SaaS Business Model"
  - "see_also: Layer 1 Protocol Business Model"
  - "competes_with: Self-Hosted Blockchain"
sources: [_Sources/Web3.0-Business-Model-oyi2ud]
source_pages: "52-58"
tags: [web3, blockchain, B2B, BaaS, enterprise, business_model]
created: 2026-06-17
---

# Blockchain-as-a-Service (BaaS)

## Definition

Blockchain-as-a-Service (BaaS) is a cloud-based offering where third parties develop, operate, and maintain blockchain infrastructure for enterprise clients on a subscription or usage basis — letting organizations build blockchain-based applications without managing nodes, consensus, or cryptographic plumbing themselves. Pereira: "this kind of business model illustrates how third parties may develop, operate, and maintain a blockchain on behalf of a company. This means infrastructure and technology related to blockchains are subject to a fee if they are provided by a service provider that charges for this service" (page 52). The analogy he draws is web hosting: "When it comes to a business, blockchain-based services are comparable to web hosting providers in a number of ways. The use of cloud computing allows for the creation of blockchain applications and smart contracts, both of which may be hosted inside the ecosystem of the provider" (pages 52-53). BaaS providers typically bundle smart-contract capabilities, user management, identity tooling, monitoring, and SDK access. Pereira cites a market forecast: "blockchain-as-a-service is expected to grow at a compound annual growth rate of 62.2 percent between 2020 and 2026... [reaching] $11.5 billion by 2026" (page 54). Major BaaS providers include IBM Blockchain Platform, AWS Managed Blockchain (discontinued for Ethereum 2024, retained Hyperledger Fabric), Microsoft Azure Blockchain Service (discontinued 2021 — a cautionary tale), Hyperledger Cello, and ConsenSys Quorum. Industry adoption Pereira documents: healthcare, automotive, fintech, transportation/logistics, document tracking, data storage, and contract execution (pages 55-58).

## Key attributes

- **Managed infrastructure** — provider runs nodes, manages consensus, handles upgrades, monitors uptime
- **Pay-per-use or subscription pricing** — typically tiered by transactions/sec, storage, smart-contract deployments, or seats
- **Smart-contract tooling included** — IDEs, testing frameworks, deployment pipelines, audit integrations
- **Enterprise-grade SLAs** — uptime guarantees, compliance certifications (SOC 2, ISO 27001, HIPAA where applicable)
- **Hybrid public/private chain support** — most BaaS platforms offer permissioned chains (Hyperledger Fabric, Quorum) and public-chain interop (Ethereum mainnet, Polygon)
- **Industry-template libraries** — pre-built smart contracts for supply-chain provenance, KYC/identity, document-notarization
- **Integration with cloud-native stack** — IAM, observability, key management, data pipelines bundled with the broader cloud account
- **Lower barrier for experimentation** — Pereira: "BaaS is an ideal solution for startups that want to explore the potential of blockchain technology without incurring significant costs or risks" (page 54)

## When to use

- Enterprise client needs blockchain capability but lacks crypto-native engineering depth
- Use case is structurally well-suited to permissioned/consortium chain (supply-chain provenance, interbank settlement, regulatory reporting)
- The client is already heavily invested in one cloud (AWS, Azure, IBM Cloud) and wants procurement to stay simple
- Regulatory or compliance constraints make self-hosted nodes operationally unviable
- A proof-of-concept or pilot is the goal — fast spin-up matters more than long-term cost optimization
- A consortium of enterprises needs neutral shared infrastructure (Pereira's Hyperledger Cello example, pages 53)

## When NOT to use

- The use case is genuinely public-chain native (DeFi, NFTs, retail Web3) — BaaS adds overhead with no benefit
- The volume and cost profile favor self-hosted nodes at steady state (BaaS is expensive at scale)
- The provider's commitment to the product is uncertain (Microsoft Azure Blockchain Service discontinuation, 2021; AWS Managed Blockchain Ethereum discontinuation, 2024 — vendor risk is high in this category)
- The client's blockchain ambition is theatre rather than substance — BaaS will produce a working pilot that nobody uses
- Data sovereignty constraints prevent the BaaS provider's hosting region from being used

## Common pitfalls

- **Vendor discontinuation** — multiple major providers have killed BaaS offerings (Azure Blockchain Service, AWS Ethereum); enterprises are left rebuilding on alternative platforms
- **PoC purgatory** — clients run a BaaS pilot, declare victory, never put it into production, never renew
- **Cost blindness at scale** — managed transaction costs that look reasonable in PoC become uneconomic at production volumes
- **Permissioned-chain irrelevance** — building on a private chain that nobody outside the consortium will ever read or verify; questionable benefit vs. a shared database
- **Compliance theatre** — "we're on blockchain" used to satisfy a regulator without solving the underlying coordination problem
- **Lock-in via proprietary extensions** — BaaS providers extend standard protocols with proprietary features; migration becomes expensive
- **Skill atrophy** — internal team never learns blockchain fundamentals; client becomes hostage to the BaaS provider's engineers
- **Regulatory whiplash** — KYC, AML, data-protection rules can retroactively make the deployed architecture non-compliant

## Key metrics

- **ARR / MRR** — recurring revenue from BaaS subscriptions
- **Paying tenants** (enterprise accounts) and **contract value** (ACV)
- **Transactions per second (TPS) billed** — usage-based revenue driver
- **Storage consumed** (state, history, off-chain assets)
- **Smart contract deployments** — proxy for active client engineering work
- **Net revenue retention (NRR)** — expansion within existing accounts
- **Time-to-first-transaction** — onboarding-friction metric
- **Production-grade vs. pilot accounts** — the most predictive lifecycle metric

## Decision questions

- Why BaaS rather than self-hosted? What's the structural reason this won't reverse?
- Is the use case truly blockchain-shaped, or could a multi-party database solve it?
- What's the vendor-continuity story — is this provider committed for 5+ years?
- What's the migration path if we need to leave this BaaS provider?
- Public chain, permissioned chain, or hybrid — and why?
- Do we have the internal blockchain literacy to evaluate what the BaaS provider is doing for us?
- What's the production-grade roadmap, or is this destined to stay a pilot?

## Canonical examples

- **IBM Blockchain Platform** — the most mature enterprise BaaS, anchored on Hyperledger Fabric; supply-chain (Maersk TradeLens — discontinued 2023, instructive failure), food safety (Walmart, Carrefour), trade finance (we.trade — also discontinued)
- **AWS Managed Blockchain** — Hyperledger Fabric + (until 2024) Ethereum mainnet support
- **Microsoft Azure Blockchain Service** — discontinued September 2021; cautionary tale for BaaS vendor risk
- **Hyperledger Cello** — open-source BaaS toolkit Pereira specifically cites (page 53); part of the Linux Foundation Hyperledger project (launched December 2015; IBM, Intel, J.P. Morgan among members)
- **ConsenSys Quorum / Codefi** — enterprise Ethereum-fork BaaS, financial-services oriented
- **Alibaba Cloud BaaS** — dominant in China and Southeast Asia
- **Chainstack, Infura, Alchemy, QuickNode** — RPC-and-infrastructure BaaS for public chains (developer-side rather than enterprise IT-side)
- **Saudi context** — SAMA's blockchain digital-currency pilot with the UAE (Project Aber, 2020) ran on a permissioned-chain architecture comparable to BaaS deployments; Aramco's blockchain provenance pilots (drilling-equipment supply chain) leverage enterprise BaaS patterns; Tabadul, Etimad, and other government-procurement platforms are likely consumers as the KSA digital-government roadmap matures; MCIT's Digital Government Authority has indicated openness to permissioned-chain infrastructure for cross-ministry data sharing

## Related concepts

- [[As-a-Service Business Model]] — _specializes_ (BaaS is one of the aaS family — IaaS, PaaS, SaaS, FaaS, BaaS)
- [[SaaS Business Model]] — _see_also_ (similar recurring-revenue economics)
- [[Layer 1 Protocol Business Model]] — _competes_with_ (BaaS abstracts the protocol; L1s monetize directly via their token)
- [[Tokenomics]] — _see_also_ (most BaaS platforms avoid native tokens, charging fiat — a deliberate enterprise-friendly choice)
- [[Cloud Business Model]] — _amplifies_ (BaaS is typically a cloud add-on)
- [[Subscription Business Model]] — _see_also_ (BaaS contracts are typically recurring)

## Sources

- [[_Sources/Web3.0-Business-Model-oyi2ud]] — pages 52-54 (BaaS definition, how it works, Hyperledger Cello example, BaaS for startups, market growth forecast), pages 55-58 (industry-wise use cases — healthcare, automotive, FinTech, transportation/logistics, document tracking, data storage, contract execution)
