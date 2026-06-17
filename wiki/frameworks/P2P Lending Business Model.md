---
type: atom
title: P2P Lending Business Model
aliases: [Peer-to-Peer Lending, P2P Lending, Marketplace Lending, P2P Loans, Crowdlending]
category: vertical_business_model
applicable_to: [fintech, lending, marketplace, B2C, B2B, SME_finance]
key_metrics: [origination_volume, default_rate, take_rate, average_loan_size, investor_yield, borrower_APR, marketplace_liquidity]
related:
  - "specializes: Marketplace Business Model"
  - "see_also: Crowdfunding Models"
  - "see_also: Buy Now Pay Later Business Model"
  - "competes_with: Traditional Bank"
  - "uses: Open Banking"
sources: [_Sources/Fintech-Business-Models-2nd-edition-sgy2j0]
source_pages: "10,26-27,18"
tags: [fintech, business_model, lending, marketplace, P2P, B2C, B2B]
created: 2026-06-17
---

# P2P Lending Business Model

## Definition

Peer-to-peer (P2P) lending is a marketplace that matches individual borrowers with individual or institutional lenders, cutting the bank out of the middle. Pereira documents Lending Club as the seminal example: "a website that provides low, fixed interest rates on loans by aggregating loan requests and passing them to peer-to-peer investors who decide whether to approve these loans or not" (page 10). The platform earns commission on origination and fees through the repayment cycle — it bears no credit risk on its own balance sheet (in the pure model), instead acting as the matching engine, underwriter, and servicer. Borrowers get lower rates than banks; investors get yields higher than savings accounts. The business has migrated over the last decade from genuinely peer-funded to "marketplace lending," where institutional capital dominates loan funding — but the platform mechanics and unit economics remain similar. P2P is also a candidate model for SME lending in emerging markets where bank credit is constrained.

## Key attributes

- **Two-sided marketplace** — borrowers on one side, lenders (retail or institutional) on the other
- **Platform earns origination + servicing fees** — not interest spread; no balance-sheet risk in the pure model
- **Automated underwriting** — algorithmic credit scoring, often using alternative data beyond traditional credit files
- **Disintermediation pitch** — borrowers get lower rates, lenders get higher yields, platform takes a cut of both
- **Marketplace liquidity is the killer constraint** — without institutional capital, loan demand outstrips funding
- **Geographic / regulatory fragmentation** — each jurisdiction treats P2P differently (SEC, FCA, SAMA, etc.)
- **Default risk borne by lenders** — platform incentive misalignment is a structural pitfall

## When to use

- Markets where bank credit is rationed for prime-but-underserved borrowers (good credit, no banking relationship)
- SME lending in emerging markets where traditional underwriting fails
- When you have proprietary underwriting data that incumbents lack
- When yield-hungry retail or institutional capital is searching for better-than-savings returns
- Specialized credit niches (student loans, medical, invoice finance) where vertical depth wins

## When NOT to use

- Markets where banks aggressively compete for prime credit (margins compress to nothing)
- Without proprietary data or distribution — generic P2P platforms have failed repeatedly
- When you cannot guarantee marketplace liquidity (no funding = no loans = death spiral)
- In jurisdictions where retail-investor P2P is restricted or banned
- For balance-sheet-intensive products that don't fit a marketplace model

## Common pitfalls

- Underestimating default rates in the first credit cycle — most P2P platforms grew through benign credit conditions
- Losing the "peer" pitch when institutional capital takes over (Lending Club's trajectory)
- Mis-pricing risk in pursuit of origination volume
- Marketplace cold-start: insufficient lender liquidity throttles borrower acquisition
- Regulatory whiplash — what's permitted today may be banned tomorrow
- Misaligned incentives — platform earns on origination, lender bears the default; over-origination follows

## Key metrics

- **Origination volume** (cumulative and monthly)
- **Take rate** — fees as % of origination
- **Default rate** by vintage and credit grade
- **Average loan size** and **average APR**
- **Investor yield** (net of defaults and fees) — must beat alternatives
- **Marketplace liquidity ratio** — lender capital available vs. borrower demand
- **Origination CAC** by side (borrower CAC, lender CAC)
- **Servicing cost per loan**

## Decision questions

- What's our underwriting edge — proprietary data, vertical depth, or just price?
- How do we guarantee lender liquidity through a downturn?
- What happens to our take rate when banks come back to compete?
- Are we genuinely peer-funded or "marketplace lending" in disguise — and does it matter for regulation?
- How do incentives stay aligned between platform, borrower, and lender?
- What's our regulatory path in each market we enter?

## Canonical examples

- **Lending Club** — US pioneer; aggregates loan requests for P2P investors at low fixed rates; grew to hundreds of millions in volume in <10 years (page 10)
- **Prosper** — original US P2P lender
- **Funding Circle** — UK-origin SME-focused P2P/marketplace lender
- **Zopa** — UK consumer P2P (later pivoted to digital bank)
- **Lendico, Auxmoney** — European P2P plays
- **Forus, Lendo** (Saudi Arabia) — SAMA-licensed crowdlending platforms for SME finance
- **Beehive** (UAE) — Sharia-compliant P2P lending platform
- **Ant Financial / Alipay** (China) — uses transaction data to extend credit to SMEs (a hybrid of P2P, marketplace lending, and data-driven underwriting; pages 48-49)

## Related concepts

- [[Marketplace Business Model]] — _specializes_ (P2P is a financial marketplace)
- [[Crowdfunding Models]] — _see_also_ (crowdlending is a flavor of crowdfunding)
- [[Buy Now Pay Later Business Model]] — _see_also_ (different credit model, similar underwriting tech)
- [[Open Banking]] — _uses_ (account data improves underwriting)
- [[Customer Acquisition Cost]] — _see_also_ (two-sided CAC is structurally high)

## Sources

- [[_Sources/Fintech-Business-Models-2nd-edition-sgy2j0]] — page 10 (Lending Club definition and trajectory), pages 26-27 (P2P lending model mechanics, take rate, geographic growth), page 18 (lending fintech context)
