---
type: atom
title: Tokenomics
aliases: [Token Economy, Token Economics, Token Design, Crypto-Economics]
category: concept
applicable_to: [web3, blockchain, crypto, DeFi, gaming, B2C, B2B, protocol_design]
key_metrics: [token_supply, circulating_supply, market_cap, fully_diluted_valuation, token_velocity, holder_distribution, staking_ratio, burn_rate, emission_schedule, treasury_balance]
related:
  - "underpins: Layer 1 Protocol Business Model"
  - "underpins: Play-to-Earn Game Model"
  - "underpins: Work Token Model"
  - "see_also: Web3 Network Effects"
  - "see_also: Cryptocurrency Exchange Business Model"
sources: [_Sources/Web3.0-Business-Model-oyi2ud]
source_pages: "47-51,66-69,72-73"
tags: [web3, blockchain, crypto, tokenomics, concept, business_model]
created: 2026-06-17
---

# Tokenomics

## Definition

Tokenomics is the design and management of a token's economy — the rules governing supply, distribution, incentives, and value accrual that determine whether a Web3 network functions as a self-sustaining economy or collapses into ponzinomics. Pereira documents the emerging Web 3.0 token-based business model taxonomy: (1) **issuing a native asset** rewarded to miners for proof-of-work (Bitcoin precedent, followed by Ethereum, Monero, ZCash); (2) **holding the native asset** while building the network (Blockstream's BTC treasury, ConsenSys's ETH treasury); (3) **payment tokens** required for transactions on a network; (4) **burn tokens** where revenue is used to buy back and destroy tokens to reduce supply (Binance BNB, MakerDAO MKR); (5) **work tokens** where service providers stake the native token to earn the right to perform work (Augur REP, Keep Network KEEP); and other patterns including dual-token models, governance tokens, tokenized securities, and "Tech-4-Tokens" treasury swaps. Token value rises with protocol popularity because the connected token must be acquired to participate, and early adopters who receive tokens are rewarded as the network grows — making tokens "a new way of jump-starting and scaling up network effects on the blockchain" (page 73).

## Key attributes

- **Native asset issuance** — a token minted by the protocol and distributed via mining, staking, or other contribution-based rewards
- **Supply mechanics** — fixed cap (Bitcoin's 21M), inflationary (most PoS chains), or deflationary via burn (BNB, MKR)
- **Distribution mechanics** — mining/staking rewards, airdrops, public sale, founder/team allocation, treasury/DAO allocation, ecosystem grants
- **Value accrual paths** — fee capture, burn-and-buyback, staking yield, governance rights, work-token economic security
- **Two-sided incentive design** — supply-side (miners, validators, service providers) and demand-side (users, holders, speculators)
- **Token velocity problem** — pure payment tokens have high velocity and weak value accrual; design must create reasons to hold
- **Composability** — tokens are programmable, so other protocols can integrate, wrap, or build derivatives on top
- **Governance dimension** — token holders vote on protocol parameters, treasury spend, and roadmap (overlaps with [[DAO Business Model]])

## When to use

- Building a permissionless network where coordination must emerge without a central operator
- When supply-side participants need cryptographic guarantees that their effort will be rewarded
- When you want to align incentives between protocol founders, early users, and long-term holders
- When network-effect bootstrapping requires paid acquisition that fiat economics can't justify
- When the protocol genuinely needs scarce on-chain resource accounting (block space, compute, storage, attention)

## When NOT to use

- The product works as a normal SaaS — a token would add friction without value (Pereira: payment-token approaches "have an obvious detrimental influence on the user experience" since ETH/DAI payments become two transactions)
- You can't articulate a non-speculative reason to hold the token (the token's only utility is selling it to the next buyer)
- The jurisdiction treats your token as an unregistered security (SEC under Howey, MiCA in EU, CMA Saudi Arabia Virtual Asset framework)
- The target user is non-crypto-native and you're forcing wallet onboarding for no benefit
- Founders need most of the supply to fund the project (the token will be perceived as a pre-mined dump)

## Common pitfalls

- **Ponzinomics** — token price depends entirely on new buyers entering; collapses when net inflows reverse (Terra/Luna, many P2E games post-2022)
- **Founder/insider over-allocation** — 40%+ to team and investors with short vesting destroys long-term holder confidence
- **High-emission farming traps** — yields paid in the native token inflate supply faster than demand can absorb (DeFi summer 2020-21 farm-and-dump cycle)
- **No regulatory strategy** — selling a token that the SEC or CMA later deems a security retroactively (Ripple/XRP, Telegram Gram)
- **Velocity collapse** — too easy to spend and exit the token; nobody holds; price floor disappears
- **Burn-as-theater** — Arjun Balaji's critique (cited by Pereira, page 50): burning tokens doesn't change "revenue per token" since no dividends are distributed; cosmetic supply reduction may not create real value
- **Forking risk** — open-source plus token portability means dissatisfied users can fork the protocol and migrate (Pereira: "improved coordination characteristics in Web3 make it possible for ecosystem actors to abandon a protocol")
- **Token-as-strategy substitute** — issuing a token to mask the absence of product-market fit

## Key metrics

- **Total supply / max supply / circulating supply** — the three numbers that define dilution risk
- **Market cap** (price × circulating) and **fully diluted valuation** (price × max supply) — gap signals future unlock pressure
- **Token velocity** (transaction volume / market cap per period) — high velocity = weak value accrual
- **Holder distribution** (Gini coefficient, top-100 wallet concentration) — centralization risk
- **Staking ratio** (staked supply / circulating) — security and supply-sink signal
- **Burn rate vs. emission rate** — net inflation/deflation
- **Emission schedule** (halvings, vesting cliffs) — future supply shocks
- **Treasury balance** (DAO/foundation runway) — survival capital
- **Token-incentivized vs. organic activity** — what's left when emissions stop

## Decision questions

- Why does this protocol need a token at all? Could it function with ETH/USDC?
- What forces someone to hold (not just transact in) this token?
- How are emissions matched to value-creating activity, not just any activity?
- Who holds today, and what's their unlock schedule?
- What's the regulatory characterization — utility, security, or hybrid — in our key jurisdictions?
- What happens to the token economy if emissions stop tomorrow?
- Can the protocol survive a hostile fork that distributes the new token without our team?

## Canonical examples

- **Bitcoin (BTC)** — fixed-supply native asset, PoW miner reward, the precedent for all token economies (Pereira, page 47)
- **Ethereum (ETH)** — gas token + post-merge staking yield + EIP-1559 burn; demand from every dApp transaction (page 47, 77-80)
- **Binance Coin (BNB)** — exchange-fee-discount utility + quarterly burns funded by Binance revenue (page 50)
- **MakerDAO (MKR)** — stability-fee revenue used to buy and burn MKR; governance token for DAI stablecoin (page 50)
- **Augur (REP), Keep Network (KEEP)** — work-token examples; stake to earn the right to provide service (page 50)
- **Smooth Love Potion (SLP) + Axie Infinity Shards (AXS)** — dual-token P2E model on Axie Infinity (pages 81-83)
- **Basic Attention Token (BAT)** — earned via attention to Brave browser ads, spent on tips and ad-buys (page 64)
- **The Graph (GRT)** — ERC20 utility token paying indexers and curators for blockchain query services (pages 64-65)
- **Saudi context** — SAMA's wholesale digital currency pilot (Project Aber, 2020, with UAE) explored tokenized interbank settlement; CMA Virtual Asset framework (in development through 2025-2026) will shape compliant token design for KSA-based projects; NEOM's blockchain-infrastructure agenda is a likely future tokenomics testbed

## Related concepts

- [[Layer 1 Protocol Business Model]] — _underpinned_by_ (every L1 has its own token economy)
- [[Play-to-Earn Game Model]] — _underpinned_by_ (P2E hinges on dual-token tokenomics)
- [[Work Token Model]] — _underpinned_by_ (work tokens are a specific tokenomics pattern)
- [[Web3 Network Effects]] — _amplifies_ (tokens are how Web3 scales network effects)
- [[Cryptocurrency Exchange Business Model]] — _see_also_ (exchanges monetize speculation on tokenomics)
- [[Network Effects]] — _see_also_ (token-incentivized network effects are a Web3-specific variant)

## Sources

- [[_Sources/Web3.0-Business-Model-oyi2ud]] — pages 47-51 (emerging Web 3.0 business models — issuing native asset, holding native asset, payment/burn/work tokens, other models), pages 66-69 (how Web 3.0 models make money — minting your own currency, decentralized credit), pages 72-73 (mental models — standalone value, network value, token value)
