---
type: atom
title: Layer 1 Protocol Business Model
aliases: [Layer 1, L1 Protocol, Layer 1 Blockchain, Base Layer Protocol, L1 Business Model]
category: vertical_business_model
applicable_to: [web3, blockchain, crypto, protocol, infrastructure, B2B, B2C, B2B2C]
key_metrics: [total_value_locked, daily_active_addresses, transaction_count, gas_fee_revenue, validator_count, staking_yield, token_market_cap, developer_count, dApp_deployments]
related:
  - "underpinned_by: Tokenomics"
  - "competes_with: Layer 2 Scaling Solution"
  - "see_also: Blockchain-as-a-Service (BaaS)"
  - "see_also: Web3 Network Effects"
  - "see_also: Play-to-Earn Game Model"
sources: [_Sources/Web3.0-Business-Model-oyi2ud]
source_pages: "47-48,62-63,77-80"
tags: [web3, blockchain, crypto, protocol, infrastructure, business_model]
created: 2026-06-17
---

# Layer 1 Protocol Business Model

## Definition

A Layer 1 (L1) protocol is a base-layer blockchain — the foundational settlement and execution environment on which applications and other protocols are built. Pereira: "It is common to refer to Ethereum as a Layer 1 protocol. This terminology describes Ethereum as the 'computer' of the blockchain, on which other projects may be developed" (page 77). The business model rests on a native token (BTC, ETH, SOL, ADA, AVAX) whose value accrues from network usage — gas fees paid to validators, demand from applications and end users, and (in proof-of-stake systems) staking economics that lock supply. Pereira documents the foundational pattern as "issuing a native asset" (page 47): the network mints a scarce digital asset and distributes it as block rewards to miners or validators, who in return secure the network. As the price of the asset rises, the cost of attacking the network rises, increasing security, increasing demand, raising price further — a reflexive flywheel. Ethereum extends the pattern with three overlapping network effects (page 77): (1) the **Ether token interaction network** — validators secure, holders use; (2) **smart contracts as a platform** — dApps consume gas, increasing ETH demand; (3) **composability** — developers remix existing contracts, lowering switching costs for new builders. The model's defining tension is that low switching costs and high liquidity mean "users may always sell Ether and buy another token to access decentralized applications (dApps) built on another blockchain" (page 80) — which is why Cardano, Solana, Avalanche, Aptos, Sui, and dozens of others compete continuously for L1 mindshare.

## Key attributes

- **Native token monetization** — block rewards, transaction fees (gas), and (PoS) staking yields all denominate in the native token
- **Validator/miner economics** — economic security depends on stakers/miners earning enough to justify capital lockup or hardware cost
- **Gas-fee revenue** — every transaction pays a fee; high-demand chains generate massive fee revenue (Ethereum: $9-10B in 2021 peak, much lower in bear markets)
- **Composability as moat** — developers reuse existing smart contracts; the larger the contract library, the easier to build new (Pereira, page 80)
- **dApp ecosystem flywheel** — more dApps → more users → more transactions → more validator revenue → more security → more dApps
- **Multiple network-effect layers** — Pereira's three for Ethereum (page 77): interaction network (token + nodes), platform (smart contracts + dApps), interaction network (composability)
- **Negative congestion network effect** — Pereira's caveat: too much traffic causes "high transaction fees and lengthy processing times... the value of the network is decreased for all other buyers of tokens whenever there is a new buyer of tokens" (page 78)
- **Defensibility risks** — no app-store matching, low switching costs, identity-irrelevant nodes mean L1s commoditize as the ecosystem grows (Pereira: "a sea of competing blockchains and cryptocurrencies," page 79)

## When to use

- You're building genuinely new cryptographic infrastructure (consensus mechanism, virtual machine, data-availability layer)
- You have a meaningful technical edge (Solana's proof-of-history, Aptos/Sui's Move VM, Celestia's modular DA)
- You can sustain the multi-year, multi-hundred-million-dollar capital requirement to bootstrap an L1
- A specific market segment (gaming, DeFi, RWA) is poorly served by existing L1s
- You can attract a critical mass of developers in the first 12-18 months (without devs, no dApps, no users, no value)

## When NOT to use

- "We need our own L1" is being used to avoid integrating with proven infrastructure (most projects should be apps on Ethereum/Solana, not new L1s)
- Your technical innovation is incremental (yet another EVM-compatible chain with marginally faster blocks)
- You can't fund 5+ years of subsidized ecosystem grants, validator incentives, security audits, and bridge infrastructure
- The market is already commoditized — 2023-2026 saw L1 mindshare consolidate; new entrants increasingly struggle
- You're optimizing for a single application — a Layer 2, app-chain, or rollup is almost always the better architecture

## Common pitfalls

- **Validator centralization** — staking concentrates among a few large operators (Lido on Ethereum), undermining decentralization narrative
- **Bridge hacks** — most catastrophic L1-ecosystem losses come from cross-chain bridge exploits (Ronin $625M, Wormhole $325M, Nomad $190M)
- **Outage events** — Solana's repeated outages (2021-2022) damaged credibility; uptime is now an existential metric
- **Ecosystem-grant burn** — billions in foundation grants distributed; relatively few breakout dApps; treasury depletes
- **Forking risk** — Pereira: "improved coordination characteristics in Web3 make it possible for ecosystem actors to abandon a protocol and instead organize themselves around a forked version" (page 76); Ethereum Classic, Bitcoin Cash, hostile forks of new L1s
- **Token-unlock cliffs** — heavy founder/investor allocations with 1-4 year cliffs create predictable sell pressure
- **Regulatory enforcement** — SEC has signaled multiple L1 tokens may be securities; CMA Saudi Arabia framework still developing
- **Ghost-town syndrome** — chain launches with fanfare, dApps deploy, no users actually arrive; tokens trade on speculation alone

## Key metrics

- **Total Value Locked (TVL)** — capital deposited in DeFi protocols on the chain; the headline economic-activity metric
- **Daily Active Addresses (DAA)** — usage proxy (caveat: bots and sybils inflate)
- **Transaction count and average fee** — multiply to get gas-fee revenue
- **Validator/node count** and **stake concentration** (Nakamoto coefficient) — decentralization health
- **Staking yield** — supply-sink + validator-economics indicator
- **Token market cap and fully diluted valuation** — investor sentiment
- **Developer count** (Electric Capital Developer Report is the standard) — leading indicator for ecosystem health
- **dApp deployments** and **active dApps** — supply-side ecosystem fundamental
- **Bridge volume** in/out — capital flows toward/away from the chain
- **Uptime / outage frequency** — increasingly weighted by serious deployments

## Decision questions

- What's the technical edge that justifies building a new L1 vs. an L2 on Ethereum?
- How will we attract developers — and what does the first 18 months of grants and DevRel look like?
- Who validates / mines, and what's the path to credible decentralization?
- What's the token-unlock schedule, and how does the price survive cliffs?
- What's the regulatory characterization in our key jurisdictions?
- How do we differentiate from the 30+ EVM-compatible L1s already competing?
- What's our story when (not if) we have a major outage or bridge hack?

## Canonical examples

- **Bitcoin (BTC)** — the original L1; PoW; fixed 21M supply; pure store-of-value positioning (Pereira, pages 47, 61)
- **Ethereum (ETH)** — Pereira's anchor case (pages 62-63, 77-80); PoS post-Merge (2022); ~$200B+ market cap; ~$2-4B annual gas-fee revenue depending on cycle; EIP-1559 burn mechanism
- **Solana (SOL)** — Pereira's secondary case (pages 63, 80); proof-of-history + PoS; high-throughput; EVM-incompatible; major outages in 2021-2022 but consistent comeback
- **Cardano (ADA)** — academic-research-led PoS L1 (Pereira, page 80)
- **Avalanche (AVAX), BNB Chain, Polygon PoS, Tron, NEAR, Aptos, Sui** — major L1 competitors
- **Layer 2s as compatible-but-not-rival** — Arbitrum, Optimism, Base, zkSync inherit Ethereum security while offering cheaper execution; an evolution of the L1 thesis rather than a competitor
- **Saudi context** — no Saudi-origin L1 currently exists, but NEOM has signaled Web3-infrastructure ambitions and could host a sovereign or quasi-sovereign chain initiative; PIF-backed Savvy Games Group's $38B gaming strategy creates demand for chain infrastructure that could justify a regional L1 or L2; SAMA's Project Aber (with UAE Central Bank, 2020) operated on a private-chain architecture rather than an L1, but established precedent for sovereign blockchain experimentation

## Related concepts

- [[Tokenomics]] — _underpinned_by_ (every L1's business model is its tokenomics)
- [[Web3 Network Effects]] — _see_also_ (Pereira's three-layer Ethereum analysis is the canonical L1 network-effects model)
- [[Blockchain-as-a-Service (BaaS)]] — _competes_with_ (BaaS abstracts L1s for enterprises; L1s monetize directly via token)
- [[Play-to-Earn Game Model]] — _see_also_ (P2E games deploy on L1s; Axie originally on Ethereum, migrated to Ronin sidechain)
- [[NFT Marketplace Business Model]] — _see_also_ (marketplace volumes drive L1 fee revenue)
- [[Cryptocurrency Exchange Business Model]] — _see_also_ (exchanges list L1 native tokens, partially capturing L1 speculation premium)

## Sources

- [[_Sources/Web3.0-Business-Model-oyi2ud]] — pages 47-48 (issuing a native asset, holding the native asset / building the network — Blockstream BTC, ConsenSys ETH), pages 62-63 (Ethereum, Solana), pages 77-80 (Ethereum as Layer 1 — three network effects: blockchain + ether interaction network, smart contracts platform, composability)
