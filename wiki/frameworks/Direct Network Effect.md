---
type: atom
title: Direct Network Effect
aliases: [Same-Side Network Effect, Physical Network Effect, Protocol Network Effect, Personal Network Effect]
category: framework
applicable_to: [social, communication, messaging, telecom, B2C, protocols, OS]
key_metrics: [active_users, MAU, DAU_MAU, viral_coefficient, density_per_cluster, organic_share_of_new_users]
related:
  - "specializes: Network Effects"
  - "contrast: Indirect Network Effect"
  - "see_also: Metcalfe's Law"
  - "see_also: Reed's Law"
  - "amplifies: Personal Utility Network"
sources: [_Sources/Network_Effects-queqlx-2]
source_pages: "23-24,33,46-48"
tags: [network_effects, direct, same_side, social, messaging, telecom]
created: 2026-06-02
---

# Direct Network Effect

## Definition

A direct (or same-side) network effect occurs when each additional user of a product directly raises the value of that product for all other users of the same type. Pereira: "Direct network effects happen when the number of users of a product, service, or platform goes up, which makes the value of the product, service, or platform go up." Telephones are the canonical case — a phone with no one to call is useless; each new line raises the value of every existing line. Pereira sub-divides direct effects into five named patterns: **Physical** (telecom, infrastructure, transportation networks where physical capital is contested), **Protocol** (standards-driven: Ethernet, fax, cryptocurrency), **Personal Utility** (private-communication tools: WhatsApp, iMessage), **Personal** (identity-bearing social: Facebook, LinkedIn), and **Market Networks** (identified pros transacting: HoneyBook, Angellist).

## Key attributes

- **Same-side value transfer** — value flows between users of the same type, not across heterogeneous sides
- **Five named sub-types** — Physical, Protocol, Personal Utility, Personal, Market Network
- **Winner-takes-most tendency** — direct effects often produce 1-2 dominant players per category
- **Critical mass per cluster** — value usually local to a friend/colleague group, not global
- **High switching cost** — once an identity-bearing direct network is joined, leaving is costly
- **Inherits Metcalfe's / Reed's value scaling** — value grows ~N² for paired comms, ~2^N for group-forming
- **Vulnerable to negative same-side effects** — congestion (cell networks), pollution (social feed noise), spam

## When to use

- Building communication, messaging, or pure social products
- Designing protocols or standards seeking adoption
- Distinguishing your effect from cross-side / indirect dynamics when explaining the moat to investors
- Planning seeding strategy — focus on densifying a single cluster (school, company, geography) rather than broad acquisition

## When NOT to use

- Marketplace or platform contexts where heterogeneous groups exchange value (use Two-Sided framing)
- Single-user products where additional users add nothing
- Hardware products where Apple-style scale economies are mistaken for direct NE
- Pure broadcast/audience products (Sarnoff law applies; direct NE framing overstates value scaling)

## Common pitfalls

- Confusing direct NE with virality — TikTok virality does not equal direct NE (your enjoyment isn't raised by my viewing)
- Failing to seed cluster-by-cluster (Facebook's Harvard-only start was deliberate; global launches commonly fail)
- Underestimating real-identity / pseudonymity requirements — anonymous direct networks usually die from pollution
- Treating central-node and periphery-node behavior identically — directed (one-to-many) networks have very different mechanics
- Ignoring negative same-side effects — Lyft drivers compete with each other; Windows users do not (file compat)

## Key metrics

- **MAU / DAU** and DAU/MAU stickiness ratio
- **Power-user curves (L7, L30)** — days-active histograms; better than DAU/MAU for measuring engagement
- **Organic share of new users** — should rise as the network grows
- **Density per cluster** — friends-of-friends overlap, school/company graph saturation
- **Viral coefficient** — invites sent × accept rate (acquisition mechanism, distinct from value mechanism)
- **Retention by cohort age** — older cohorts should retain better as network value compounds

## Decision questions

- Which sub-type are we (Physical / Protocol / Personal Utility / Personal / Market Network)?
- What is our minimum viable cluster, and how do we densify it before expanding?
- Are we identity-bearing? If not, can we tolerate the pollution risk?
- Is our network one-to-one (peer-symmetric) or one-to-many (asymmetric follow)? Different product implications
- What are our negative same-side effects, and how do we curate them out?

## Canonical examples

- **Telephone, fax** — physical/protocol direct NE (pages 18, 46)
- **WhatsApp, iMessage, Facebook Messenger** — personal utility direct NE (pages 23, 47, 78)
- **Facebook, Instagram, LinkedIn, Twitter** — personal direct NE (page 47-48)
- **Ethernet, cryptocurrency** — protocol direct NE (page 47)
- **HoneyBook, Angellist, IvyMark** — market network variants (page 48)
- **Windows file compatibility** — positive same-side direct NE among users (page 33)

## Related concepts

- [[Network Effects]] — _parent_
- [[Indirect Network Effect]] — _contrast_
- [[Two-Sided Network Effect]] — _contrast_ (cross-side, not same-side)
- [[Metcalfe's Law]] — _amplifies_ (value scales N²)
- [[Reed's Law]] — _amplifies_ (group-forming variant scales 2^N)
- [[Critical Mass]] — _see_also_
- [[Negative Network Effects]] — _see_also_ (congestion and pollution)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Indirect Network Effect]] — _auto_ (score 8.8: tags×2.0, applicable_to×1.0, title×3.0, category×0.8, alias×2.0)
- [[Negative Network Effects]] — _auto_ (score 8.5: tags×2.0, applicable_to×4.0, title×1.5, alias×1.0)
- [[Network Effects]] — _auto_ (score 7.5: tags×2.0, applicable_to×3.0, title×1.5, alias×1.0)
- [[Negative Network Effect Curation Tactics]] — _auto_ (score 7.0: tags×2.0, applicable_to×2.0, title×3.0)
- [[Data Network Effect]] — _auto_ (score 6.8: tags×2.0, applicable_to×1.0, title×3.0, category×0.8)
- [[Two-Sided Network Effect]] — _auto_ (score 6.8: tags×2.0, title×3.0, category×0.8, alias×1.0)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Network_Effects-queqlx-2]] — pages 23-24 (direct definition), page 33 (same-side effects), pages 46-48 (five sub-types and examples)
