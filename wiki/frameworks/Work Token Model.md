---
type: atom
title: Work Token Model
aliases: [Work Token, Stake-to-Work Model, Service Token Model, Supply-Side Token Model]
category: vertical_business_model
applicable_to: [web3, blockchain, protocol, DeFi, infrastructure, B2B, B2B2C]
key_metrics: [staked_supply, service_provider_count, fees_distributed_to_stakers, slash_events, token_yield, stake_concentration, work_completion_rate]
related:
  - "underpinned_by: Tokenomics"
  - "specializes: Two-Sided Marketplace"
  - "see_also: Layer 1 Protocol Business Model"
  - "see_also: Web3 Network Effects"
  - "competes_with: Payment Token Model"
sources: [_Sources/Web3.0-Business-Model-oyi2ud]
source_pages: "50-51"
tags: [web3, blockchain, crypto, business_model, tokenomics, work_token, B2B]
created: 2026-06-17
---

# Work Token Model

## Definition

The work token model is a decentralized-network business pattern where service providers must stake the protocol's native token to earn the right to perform work — aligning their economic interest with the long-term success of the network, and creating value accrual to the token via demand from service providers (not just end users). Pereira: "The work token is an emerging business model for decentralized networks. This model focuses only on the supply side of the network's revenue production in order to minimize the amount of friction that users experience while interacting with the network... In the same way that taxi medallions need an investment, service providers need to put up a certain number of their own local tokens before they can be allowed to operate for the network" (page 50). End users pay in a different unit of account (typically a stablecoin, ETH, or fiat-onramp) — friction-free — while the work-token requirement forces supply-side actors to acquire and lock the native token. Service providers earn rewards in proportion to honest work performed, with stake subject to slashing if they misbehave: "Service providers will be rewarded with both incentives and stakes, which can then be reduced over time depending on how much work they do in providing honest service that benefits everyone else within the community" (page 50). The token is valued by discounting expected future cash flows attributable to all network service providers. Pereira cites Augur's REP and Keep Network's KEEP as flagship examples (page 50).

## Key attributes

- **Stake-to-earn-work mechanic** — service providers lock native tokens to be eligible to perform paid work on the network
- **Slashing for misbehavior** — stake can be partially or fully forfeited if the provider acts dishonestly or fails SLAs
- **End-user friction minimized** — users pay in stable units (ETH, DAI, USDC, fiat); the token requirement is invisible to them (page 50)
- **Cash-flow-valuable token** — token can be modeled via DCF on expected fees flowing to service providers (page 51)
- **Supply-side scarcity** — token-required participation creates a natural cap on supply-side capacity, supporting service quality
- **Aligns service providers with network success** — providers want the token to appreciate, which requires honest service that grows network usage
- **Permissionless competitive market** — anyone can buy tokens, stake, and start providing service (subject to technical/operational requirements)
- **Higher capital barrier than pure payment tokens** — providers must front capital to enter; a moat against frivolous participants

## When to use

- The network has a distinct supply-side that performs identifiable, slashable work (prediction-market reporters, oracle operators, storage providers, computation providers, threshold-cryptography signers)
- Service quality matters and you need economic skin-in-the-game to enforce it
- You want token value accrual without forcing token-friction on end users
- The work is verifiable on-chain (or via cryptographic proofs) so slashing can be objectively triggered
- The network's revenue can credibly be modeled as cash flow to service providers (DCF-valuable token)

## When NOT to use

- The "work" is subjective, hard to verify, or requires human judgement that can't be slashed objectively
- Supply-side capital requirements would price out the providers you actually want (small, distributed contributors)
- The network is end-user-facing in a way that makes payment-token friction unavoidable anyway
- Regulatory framework treats stake-to-earn-yield as a security offering (work tokens face the same securities risk as other yield-bearing tokens — SEC, MiCA, CMA Saudi Arabia)
- The supply side is already permissioned (e.g., regulated entities); you don't need crypto-economic security

## Common pitfalls

- **Slashing-as-theatre** — slashing parameters are too lenient to meaningfully deter misbehavior, or so severe that honest providers fear participation
- **Stake concentration** — a few large providers accumulate most stake, undermining decentralization (Lido on Ethereum, while not a pure work token, illustrates the dynamic)
- **Token-price collapse breaks economic security** — if the native token crashes, the cost-of-attack also crashes; networks can become un-economic to secure
- **Speculative price disconnects from work-revenue fundamentals** — Pereira's framing treats the token as DCF-valuable, but token prices in practice often disconnect from underlying cash flows
- **Capital-inefficiency for providers** — large stake requirements lock up capital that could earn yield elsewhere; providers demand higher service fees, raising end-user prices
- **Forking risk** — disgruntled providers can fork the protocol and migrate; Pereira's general Web3 caveat applies (pages 75-76)
- **Coordination failure on slashing** — if the network can't reach consensus on what constitutes misbehavior, slashing either doesn't happen (deterrent fails) or is gamed politically
- **Regulatory characterization** — staking-as-securities case law is evolving; SEC's 2023 Kraken settlement signals scrutiny

## Key metrics

- **Staked supply / total supply** — % of tokens locked as work stake; measures supply-side commitment
- **Number of active service providers** — supply-side health
- **Fees distributed to stakers** (in fiat / native token / stable terms) — the fundamental cash-flow metric
- **Effective stake yield** — APY/APR earned by providers, after slashing losses
- **Slashing events and total value slashed** — deterrent credibility
- **Stake concentration** (Gini, Nakamoto coefficient) — decentralization health
- **Work completion rate / SLA performance** — service quality
- **Token velocity** — work tokens should have lower velocity than payment tokens (stake is locked)

## Decision questions

- What is the "work" being staked against, and how is it objectively verifiable?
- What are the slashing conditions, magnitudes, and who decides when they trigger?
- What's the minimum stake to provide service, and does that price out good providers?
- How are end users protected from supply-side capital costs being passed through as higher fees?
- What's the regulatory characterization of the staked token in our key jurisdictions?
- What's our story when token price crashes 80% and economic security with it?
- How do we resist stake concentration into a few mega-providers?

## Canonical examples

- **Augur (REP)** — Pereira's flagship work-token example (page 50); reporters stake REP to adjudicate prediction-market outcomes; misreporting is slashed; fees flow to reporters proportional to honest work
- **Keep Network (KEEP)** — Pereira's second flagship (page 50); signers stake KEEP to perform threshold-cryptography services (originally for tBTC, a Bitcoin-on-Ethereum bridge)
- **The Graph (GRT)** — work-token variant; indexers stake GRT to serve blockchain data queries (Pereira describes GRT as ERC20 Utility Token, page 64; the work-token framing is from the broader literature)
- **Livepeer (LPT)** — Pereira mentions Livepeer (page 36) without naming the work-token model; orchestrators stake LPT to transcode video on the decentralized streaming network
- **Filecoin (FIL)** — storage providers stake FIL collateral against storage commitments; partial work-token characteristics (Pereira mentions Filecoin pages 39)
- **Chainlink (LINK)** — node operators stake LINK as collateral against oracle accuracy (model expanded post-2022)
- **Ethereum proof-of-stake (ETH)** — partial work-token characteristics; validators stake 32 ETH to earn yield, are slashed for downtime/double-signing; Pereira's pre-Merge text predates this fully
- **Saudi context** — no Saudi-origin work-token protocols currently; the closest analogue might be a future SAMA-licensed validator network for digital riyal infrastructure, where regulated financial institutions would stake to provide validation services — likely permissioned rather than permissionless work-token, but the design pattern translates

## Related concepts

- [[Tokenomics]] — _underpinned_by_ (work tokens are one of Pereira's six emerging Web3 token-based models, page 50)
- [[Two-Sided Marketplace]] — _specializes_ (work tokens are a supply-side staking mechanism in a marketplace structure)
- [[Layer 1 Protocol Business Model]] — _see_also_ (PoS L1s share work-token characteristics; validators stake the native token)
- [[Web3 Network Effects]] — _see_also_ (work tokens reinforce supply-side network effects via capital commitment)
- [[Cryptocurrency Exchange Business Model]] — _see_also_ (exchanges list work tokens; staking services are an emerging exchange revenue line)
- [[Subscription Business Model]] — _competes_with_ (centralized SaaS competes with work-token-powered decentralized alternatives in oracles, storage, compute)

## Sources

- [[_Sources/Web3.0-Business-Model-oyi2ud]] — pages 50-51 (work tokens — Augur REP, Keep Network KEEP; supply-side staking mechanic; future cash flow valuation; placement in Pereira's six emerging Web 3.0 business model taxonomy)
