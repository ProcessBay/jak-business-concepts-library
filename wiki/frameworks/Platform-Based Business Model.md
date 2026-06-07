---
type: atom
title: Platform-Based Business Model
aliases: [Platform Model, Multi-Sided Platform, Platform Economy Model]
category: framework
applicable_to: [platforms, marketplaces, SaaS, ecosystem, two_sided, three_sided, ExO]
key_metrics: [active_users_per_side, transaction_volume, take_rate, liquidity, cross_side_conversion]
related:
  - "specializes: Exponential Business Model"
  - "amplifies: Network Effects"
  - "see_also: Marketplace Business Model"
  - "see_also: Ecosystem-Based Business Model"
  - "see_also: Two-Sided Network Effect"
sources: [_Sources/Exponential_Business_Models-nwpxx3]
source_pages: "46-49,71-77"
tags: [framework, platform, multi_sided, exponential, marketplace, network_effects]
created: 2026-06-02
---

# Platform-Based Business Model

## Definition

A platform business model creates value by facilitating interactions between two or more groups of users — typically a supply side and a demand side — rather than by producing and selling its own inventory. Pereira's frame is that platforms are not categorized by what they sell but by what they orchestrate: the platform *is* the asset, and the asset is composed of users, data, and the software that mediates exchange between them. Platform exchanges range from short-form transactions (a buyer finding a seller on Amazon, a rider matched to a driver on Uber) to long-form partnerships (a developer building on Apple's App Store). Two activation conditions determine viability: (1) chicken-and-egg liquidity must be solved on both sides simultaneously, and (2) network effects must compound so each new participant raises platform value for everyone else.

## Key attributes

- **Two- or three-sided architecture** — supply side, demand side, and sometimes a third party (e.g., advertisers, restaurants) (pages 46, 72)
- **No inventory ownership** — the platform owns the interface, the data, and the rules, not the goods (page 46)
- **Network effects required** — value scales with participation; without network effects, it is a directory, not a platform (page 46)
- **Liquidity is the leading indicator** — matched transactions per unit time, not raw user count
- **Trust and reputation infrastructure** — ratings, reviews, identity verification are core, not optional
- **Take-rate economics** — revenue is typically a percentage of GMV mediated, not a fixed fee
- **Cross-side conversion design** — sellers must attract buyers and vice versa; both sides need value loops
- **Asset-light cost structure** — variable costs scale far slower than transaction volume

## When to use

- Two or more distinct user groups exist who would create value for each other if matched
- An existing industry is structurally fragmented (many small suppliers, many small buyers) and matching is slow or expensive
- You can solve the chicken-and-egg problem on at least one side (single-side go-to-market, subsidization, or geographic seeding)
- Network effects are plausible — every new participant materially raises platform value for everyone else
- Software and data can mediate the exchange (otherwise an offline broker is more efficient)

## When NOT to use

- The two sides do not actually want to interact — you are pushing a platform on a category that is fundamentally bilateral or single-side
- One side has overwhelming bargaining power and refuses to be disintermediated (e.g., a few mega-suppliers who will not list)
- Trust and quality cannot be mechanized — categories where bespoke human judgment trumps algorithmic matching
- Regulatory or licensing structures prevent platform mediation (e.g., regulated medical referrals)
- You lack the runway to subsidize one side long enough to reach liquidity

## Common pitfalls

- **Building both sides simultaneously and getting traction on neither** — most successful platforms seed one side first
- **Cosmetic two-sidedness** — looks like a platform but is actually a reseller in disguise
- **Disintermediation leakage** — buyers and sellers complete the deal off-platform after meeting, stripping the take rate
- **Premature monetization** — charging before liquidity exists kills the network
- **Geographic over-extension** — platform liquidity is local; one city working ≠ ten cities working
- **Ignoring the trust layer** — without reputation systems, platforms collapse into adverse selection
- **Owning the asset by accident** — when the platform takes inventory or hires the supply side, it has become a linear business in platform clothing

## Key metrics

- **Active users per side** — DAU/MAU for each distinct group
- **Liquidity** — share of search/listing/request events that result in a match within a target window
- **Transaction volume / GMV** — total dollar throughput of the platform
- **Take rate** — revenue as % of GMV
- **Repeat-transaction rate** — measure of network value vs one-time use
- **Cross-side ratio** — supply per unit demand (target band varies by category)
- **Time to first match** — onboarding-side activation metric

## Decision questions

- Which side will we seed first, and how will we subsidize them?
- What is our liquidity threshold — at what density of supply does demand convert reliably?
- Where could disintermediation happen, and how do we make the platform sticky enough to prevent it?
- What is our reputation/trust layer, and is it operational before scaled distribution?
- What take rate do the unit economics support, and can the supply side sustain it?
- Is this market structurally many-to-many, or have we forced platform logic onto a one-to-many category?

## Canonical examples

- **Amazon** — global buyer-seller marketplace plus Amazon Prime fulfillment flywheel (pages 47-48, 76)
- **TikTok** — content creators ↔ advertisers ↔ viewers; three-sided (page 48)
- **Apple App Store** — developers ↔ end users; ecosystem-grade platform (page 48)
- **Fiverr** — freelancers ↔ companies hiring (page 48)
- **Instacart** — shoppers ↔ grocery stores ↔ customers; three-sided (page 48)
- **GitHub** — developers ↔ projects ↔ companies; acquired by Microsoft for $7.5B in 2018 (page 49)
- **JustPark** — driveway owners ↔ motorists (page 49)
- **Zipcar** — car owners (corporate) ↔ on-demand renters (page 49)
- **uTest** — software companies ↔ crowdsourced testers (page 49)
- **WAX Marketplace** — gamers ↔ virtual item NFTs on blockchain (page 49)
- **Airbnb** — hosts ↔ travelers ↔ experience providers (page 71)
- **Uber** — drivers ↔ riders ↔ restaurants (Uber Eats three-sided) (page 72)
- **PayPal** — merchants ↔ consumers (page 73)
- **Etsy** — creative sellers ↔ buyers, 88.3M active buyers in 2022 (page 74)

## Related concepts

- [[Marketplace Business Model]] — _see_also_ (the transaction-platform subtype)
- [[Multilateral Platform]] — _see_also_ (3+ sided variant)
- [[Two-Sided Network Effect]] — _amplifies_ (the structural force that makes platforms exponential)
- [[Network Effects]] — _amplifies_
- [[Exponential Business Model]] — _specializes_ (platforms are the most common ExO archetype)
- [[Ecosystem-Based Business Model]] — _see_also_ (advanced multi-platform variant)
- [[Pipeline to Platform Shift]] — _see_also_
- [[Take-Rate Economics]] — _see_also_

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Exponential Business Model]] — _auto_ (score 11.8: tags×8.0, applicable_to×3.0, category×0.8)
- [[Ecosystem-Based Business Model]] — _auto_ (score 11.2: tags×6.0, applicable_to×3.0, title×1.5, category×0.8)
- [[Two-Sided Network Effect]] — _auto_ (score 10.8: tags×6.0, applicable_to×2.0, category×0.8, alias×2.0)
- [[Flywheel Business Model]] — _auto_ (score 9.8: tags×4.0, applicable_to×5.0, category×0.8)
- [[Amazon Flywheel]] — _auto_ (score 8.8: tags×6.0, applicable_to×2.0, category×0.8)
- [[Linear vs Exponential Business Model]] — _auto_ (score 7.8: tags×6.0, category×0.8, alias×1.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Exponential_Business_Models-nwpxx3]] — pages 46-47 (definition and dynamics), pages 47-49 (platform examples), pages 71-77 (worked examples Airbnb/Uber/PayPal/Etsy/Squarespace/Netflix/Amazon/Spotify)
