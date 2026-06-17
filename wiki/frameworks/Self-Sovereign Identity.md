---
type: atom
title: Self-Sovereign Identity
aliases: [SSI, Decentralized Identity, DID, User-Owned Identity]
category: trust_model
applicable_to: [decentralized, web3, governance, identity, privacy, B2C, B2B]
key_metrics: [user_data_control, third_party_dependency, identity_portability, consent_log_completeness, privacy_breach_rate]
related:
  - "amplifies: Decentralized Business Model"
  - "amplifies: Privacy by Design"
  - "see_also: Decentralized Business Model"
sources: [_Sources/Decentralized_Business_Models-4oed1q]
source_pages: "55-57"
tags: [decentralized, identity, privacy, web3, trust, governance]
created: 2026-06-17
---

# Self-Sovereign Identity

## Definition

Self-Sovereign Identity (SSI) is a trust model in which individuals — not governments, platforms, or corporations — own and control their own digital identity. Pereira positions SSI as one of the game-changing primitives unlocked by decentralization: instead of identity being a record in someone else's database (a Facebook account, a state ID system, a credit bureau profile), the individual holds their own credentials in a personal digital wallet and grants access on a case-by-case basis. After granting access, the individual retains an exhaustive log of every event involving their data. SSI makes online interactions resemble real-world ones — you produce a credential when asked, the verifier checks it, and no central authority brokers or logs the exchange. The model removes the third-party data custodian from the trust relationship and makes the user the sole arbiter of their identity.

## Key attributes

- **User-owned identity** — credentials held in a personal digital wallet, not in a third-party database
- **Consent-based disclosure** — user grants access per interaction, not by default
- **Auditable access log** — user can review every past event involving their data
- **No central authority** — no government, platform, or company brokers the identity exchange
- **Privacy-preserving by construction** — minimum-necessary disclosure rather than full-profile sharing
- **Portable across services** — identity travels with the user, not locked to a platform
- **Pairs with Privacy by Design** — SSI is the identity layer of a broader decentralization stack

## When to use

- Services that handle sensitive personal data (healthcare, finance, government, identity)
- Markets where users distrust centralized data custodians (post-breach industries)
- Cross-border services where centralized identity isn't accepted or available
- Web3 / decentralized application stacks that need identity without a central provider
- Categories where regulatory pressure (GDPR-style data sovereignty) makes user-owned data a moat
- Underbanked / underserved populations who lack traditional identity infrastructure

## When NOT to use

- Use cases where regulated KYC requires a verified central authority record (banking onboarding still needs a verifier)
- Consumer services where users won't tolerate any wallet / credential management friction
- Markets where users actively prefer "platform manages it for me" convenience
- When the firm's business model depends on selling user data (SSI breaks that revenue stream)
- When the verifier ecosystem doesn't exist yet (no one to accept the credentials)

## Common pitfalls

- Wallet UX that loses users at the first onboarding step
- Credential loss with no recovery path (decentralization means no help desk)
- Treating SSI as just "decentralized login" rather than a full data-ownership rethink
- Underestimating the verifier-side adoption gap (issuers + holders + verifiers all need to participate)
- Conflating SSI with crypto / token speculation and losing the privacy-focused users
- Storing too much in the wallet, recreating a centralized honeypot in the user's pocket

## Key metrics

- **User data control index** — % of identity attributes user can revoke / withhold
- **Third-party dependency count** — how many parties hold copies of the user's identity
- **Identity portability** — # of services the same credential works across
- **Consent log completeness** — % of access events captured in the user-visible log
- **Privacy breach rate** — compared to centralized-identity baseline
- **Wallet recovery success rate** — critical UX metric

## Decision questions

- Where in our flow does a centralized identity custodian add risk without adding value?
- What credentials would users actually want to hold themselves?
- Who are the verifiers, and are they ready to accept user-presented credentials?
- How do we handle account recovery without recreating a central authority?
- Does our business model depend on owning user data? (If yes, SSI is structurally hostile.)
- What's the regulated baseline (KYC, age verification) we still have to satisfy?

## Canonical examples

- **Web3 wallets (MetaMask, WalletConnect)** — early SSI-adjacent pattern; user holds the keys
- **Decentralized Identifiers (DIDs) standard** — W3C standard underpinning SSI implementations
- **Verifiable Credentials (W3C VC)** — credential format that lets users present claims without revealing source database
- **Sovrin, uPort, Microsoft ION** — production SSI infrastructure projects
- **Estonia e-Residency** — partial precedent for user-controlled digital identity at national scale
- Pereira positions SSI as a counter-model to platforms like **Facebook** that store individually identifiable information in centralized databases for ad-targeting revenue (pages 46-47)

## Related concepts

- [[Decentralized Business Model]] — _amplifies_ (SSI is identity layer for decentralization)
- [[Privacy by Design]] — _amplifies_ (SSI operationalizes privacy-by-default)
- [[Centralization vs Decentralization]] — _see_also_ (SSI sits firmly at decentralized end of identity spectrum)
- [[Open-Source Business Model]] — _see_also_ (SSI tooling is overwhelmingly open-source)

## Sources

- [[_Sources/Decentralized_Business_Models-4oed1q]] — pages 55-57 (self-sovereign identity, human-centric solutions, privacy by design, Web 3.0)
