---
type: atom
title: Play-to-Earn Game Model
aliases: [P2E, Play-to-Earn, GameFi, Play-and-Earn, Move-to-Earn, X-to-Earn]
category: vertical_business_model
applicable_to: [web3, gaming, blockchain, NFT, B2C, consumer]
key_metrics: [daily_active_players, monthly_active_players, average_revenue_per_player, NFT_floor_price, token_emission_rate, scholarship_yield, churn_rate, payback_period, treasury_runway]
related:
  - "specializes: Marketplace Business Model"
  - "underpinned_by: Tokenomics"
  - "see_also: NFT Marketplace Business Model"
  - "see_also: Web3 Network Effects"
  - "competes_with: Free-to-Play Game Model"
sources: [_Sources/Web3.0-Business-Model-oyi2ud]
source_pages: "44-46,81-85"
tags: [web3, gaming, blockchain, NFT, business_model, P2E, GameFi, B2C]
created: 2026-06-17
---

# Play-to-Earn Game Model

## Definition

Play-to-Earn (P2E) is a Web3 game business model where players earn cryptocurrency or NFTs through gameplay, and the in-game assets they accumulate are tradable on open marketplaces — collapsing the wall between in-game economy and real-world income. Pereira anchors his analysis on Axie Infinity, "the most popular player-to-earn (P2E) game" with over 2.1 million monthly players as of May 2022 (page 81). The model combines four overlapping network effects: (1) the **P2E game itself** — players breed Axies, battle, and trade, earning Smooth Love Potion (SLP) tokens that can be sold for real money; (2) the **Axie Marketplace** for buying and selling Axie NFTs and in-game items; (3) the **DAO** — Axie Infinity Shards (AXS) holders vote on the project's trajectory; (4) **scholarship programs** that "rent" Axies to potential players to lower the entry barrier and capture players from developing countries (pages 81-85). Stepn extends the pattern to "move-to-earn" — rewarding walking, jogging, and running with NFTs and tokens (pages 44-46). The X-to-Earn family includes learn-to-earn, sleep-to-earn, and other behavioral-incentive variants. The defining vulnerability: P2E economies depend on continuous new-player inflows to maintain token prices, which is why the 2022 P2E winter wiped out most projects when SLP and AXS prices collapsed and scholarship managers exited.

## Key attributes

- **Earn-from-play loop** — players accumulate fungible tokens (SLP, GST) or NFTs through gameplay
- **Asset ownership** — in-game items are NFTs the player owns and can trade on open markets (vs. Web2 games where items belong to the publisher)
- **Dual-token architecture** — typically a high-emission "game token" (SLP, GST) and a low-emission "governance token" (AXS, GMT) — the dual-token model Pereira identifies (page 51)
- **Open marketplace** — first-party (Axie Marketplace) or third-party (OpenSea) venues to liquidate earned assets
- **Onboarding barrier** — NFT purchase required to play (Axie required 3 Axies at $200+ each, page 84)
- **Scholarship/guild ecosystem** — rentier intermediaries (YGG, Merit Circle) bridge the capital barrier for emerging-market players
- **Cyclical economy** — earnings track token price, which tracks new-player demand, which tracks earnings expectations — a reflexive loop that breaks brutally
- **Habit-formation mechanics** — Pereira on Stepn: "encouraging patterns of behavior that easily become routines — habit formation machines" (page 45)

## When to use

- Games where the economy is genuinely improved by player asset ownership and cross-game portability
- Casual or session-based games suited to repeatable earning loops (vs. story-driven single-player)
- When the team can sustain genuine gameplay quality — not just a Ponzi wrapped in pixels
- When the target geography has the labor-cost arbitrage to make small earnings meaningful (Philippines, Venezuela for Axie in 2021)
- When you can credibly tax secondary marketplace activity as a revenue stream

## When NOT to use

- The "game" is just a yield-farming UI with no genuine fun (most 2021-22 P2E projects)
- The team can't seed a sustainable token sink — emissions will outpace burn from day one
- Target users are core gamers in wealthy markets — they want fun, not labor
- You're in a jurisdiction that treats P2E earnings as taxable gambling income with onerous reporting
- You can't afford the security and audit budget — exploits in NFT contracts or bridges are catastrophic (Ronin bridge hack on Axie Infinity, $625M stolen, March 2022 — context for Pereira's data)

## Common pitfalls

- **Ponzinomics** — the only thing keeping the token economy solvent is new players (matches the [[Tokenomics]] pitfall); when growth stalls, prices collapse and scholarship yields evaporate
- **Emission imbalance** — game-token rewards inflate supply faster than sinks can absorb (Axie's SLP went from ~$0.36 to $0.003 from August 2021 to 2022)
- **Scholarship exploitation** — "scholars" (often in low-income countries) take all the gameplay risk while guilds capture most of the upside
- **Regulatory unfunness** — Philippines' BIR ruled Axie earnings taxable; multiple jurisdictions are scrutinizing P2E as unregistered investment schemes
- **Gameplay-as-afterthought** — the project optimizes for token mechanics; gameplay is shallow; retention collapses
- **Security failures** — bridge and contract hacks destroy player trust and token value overnight
- **Concentration of "Axie Infinity" risk** — if your model rests on one game, one chain, one token, the failure mode is binary

## Key metrics

- **Daily Active Players (DAP) / Monthly Active Players (MAP)** — the demand-side fundamental
- **Average Revenue Per Player (ARPP)** — economic sustainability proxy
- **Earnings per player per hour** — vs. local minimum wage in target geographies (when this falls below ~$1/hr, scholarship economies collapse)
- **NFT floor price** — entry-asset cost; if floor crashes, new-player onboarding stalls
- **Token emission rate vs. burn/sink rate** — net inflation; the make-or-break tokenomics number
- **Scholarship yield** — return-on-NFT-rental for guilds (sub-20% APY makes scholarships unviable)
- **Player churn rate** — typically catastrophic for P2E (50-90% monthly during downturns)
- **Treasury runway** — DAO + team treasury vs. monthly burn at current token price

## Decision questions

- Is the game genuinely fun, or are players only there for the earnings?
- What's the long-term sink for emissions — and is it real economic activity or a circular sink?
- Who are the marginal players — wealthy gamers seeking entertainment, or low-wage workers seeking income? (Different products entirely)
- How fragile is the economy to a 70% token price drop?
- What's the regulatory exposure in the geographies where most earnings happen?
- Can the project survive an exploit, scandal, or competing-game launch?
- Is the dual-token model genuinely necessary, or is it cosmetic complexity?

## Canonical examples

- **Axie Infinity** — anchor case throughout Pereira (pages 81-85); SLP + AXS dual token; >2.1M MAU peak; Ronin sidechain; Yield Guild Games scholarship ecosystem
- **Stepn** — move-to-earn; GMT (governance) + GST (game) dual token; GPS-tracked walking/jogging/running; sneaker NFTs (pages 44-46)
- **The Sandbox** — voxel metaverse + SAND token + land NFTs (Pereira, page 85)
- **Splinterlands** — collectible card P2E that competes with Axie (page 82)
- **Decentraland (MANA), Illuvium (ILV), Gods Unchained (GODS)** — other notable P2E ecosystems
- **Sweatcoin / Sweat Economy** — quasi-P2E move-to-earn at scale (~140M users) without on-chain entry barrier
- **Saudi context** — Saudi Esports Federation and Savvy Games Group ($38B gaming-and-esports strategy under PIF) are gaming-vertical investors; NEOM has positioned itself as a Web3 gaming hub; no major Saudi-origin P2E project as of mid-2026, but the regulatory and infrastructure context is converging — CMA Virtual Asset framework will determine whether KSA-issued P2E tokens are viable

## Related concepts

- [[Tokenomics]] — _underpinned_by_ (P2E lives or dies on dual-token tokenomics)
- [[NFT Marketplace Business Model]] — _see_also_ (P2E NFTs trade on first- and third-party NFT marketplaces)
- [[Web3 Network Effects]] — _amplifies_ (Pereira's four-layer network-effect analysis is anchored on Axie)
- [[Marketplace Business Model]] — _specializes_ (P2E is a vertical marketplace)
- [[Freemium Business Model]] — _competes_with_ (free-to-play is P2E's mainstream competitor)
- [[DAO Business Model]] — _see_also_ (governance-token P2E projects use DAOs for treasury and roadmap)

## Sources

- [[_Sources/Web3.0-Business-Model-oyi2ud]] — pages 44-46 (Stepn case study — Web3 business model canvas walkthrough), pages 81-85 (Axie Infinity — four-layer network effects: P2E game, marketplace, DAO, scholarship programs)
