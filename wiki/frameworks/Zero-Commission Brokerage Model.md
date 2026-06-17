---
type: atom
title: Zero-Commission Brokerage Model
aliases: [Zero-Commission Trading, Commission-Free Brokerage, $0 Commission Model, PFOF Brokerage Model]
category: business_model
applicable_to: [wealthtech, fintech, brokerage, trading, B2C, B2B]
key_metrics: [funded_accounts, AUC, net_interest_income, asset_management_fee_revenue, PFOF_revenue, ARPU, deposit_beta]
related:
  - "see_also: Robo-Advisor Business Model (WealthTech)"
  - "amplifies: Freemium Business Model"
  - "see_also: Multiple Revenue Streams"
  - "see_also: Cross-Subsidy Business Model"
sources: [_Sources/Wealthtech_Business_Model]
source_pages: "78-88"
tags: [wealthtech, business_model, brokerage, zero_commission, PFOF, B2C, freemium]
created: 2026-06-17
---

# Zero-Commission Brokerage Model

## Definition

The zero-commission brokerage offers free or near-free trading of stocks and ETFs while monetizing the customer relationship through a portfolio of indirect revenue streams: net interest income on cash balances and margin loans, asset-management fees on advisory programs, securities-lending revenue, payment-for-order-flow (PFOF), bank deposit fees, and ancillary services. Charles Schwab cemented the model in 2019 when it eliminated US equity commissions, triggering an industry-wide cascade. Pereira documents Schwab's revenue mix: 40% net interest, 30% asset-management fees, 14% trading revenue (still earned on options, mutual funds, foreign assets), 3% bank deposit fees, 3% other (page 85). The model's core insight: commissions were never the real profit center for incumbents — they were the friction tax that kept volume low. Removing them grows AUC (assets under custody) which feeds the higher-margin revenue lines.

## Key attributes

- **Free equity & ETF trading** — $0 commission on US stocks and ETFs is now table stakes
- **Net interest income (NII) as primary revenue** — Schwab earns interest on uninvested cash, margin loans, segregated securities, bank deposits, often 40%+ of total revenue
- **Asset management fees** — fee-for-service advisory programs charging 0.30-1.00% on managed portfolios
- **Securities lending** — lending out client shares to short-sellers in exchange for a fee
- **PFOF** — selling order flow to market makers (Citadel, Virtu) who pay for the right to execute retail orders (controversial; banned in UK and EU MiFID II)
- **Cash sweep deposit beta** — paying clients minimal interest on cash while earning Fed funds + spread on the deposit
- **Banking products bundled** — checking, debit, FX, lending — often through partner or in-house bank
- **Mutual fund / options / foreign-asset fees** — commissions retained on products outside the "free trading" perimeter
- **Multiple-revenue-stream architecture** — no single line dominates; resilient to compression in any one source

## When to use

- Building a brokerage at scale where AUC is the volume driver and you can run a bank-like balance-sheet alongside
- When regulatory regime permits PFOF or allows generous cash-sweep economics (US-favorable; EU/UK restrictive)
- As an incumbent defending against fintech entrants — Schwab and Fidelity neutralized Robinhood by matching $0 and out-scaling on NII
- When you can cross-subsidize a "free" surface with higher-margin advisory, lending, and banking products
- For institutional / advisor channels (Schwab Advisor Services) where free trading is bundled with custody and software

## When NOT to use

- Markets where PFOF is banned and cash-sweep economics are constrained — the model loses its primary fuel (UK, EU MiFID II)
- Sub-scale plays — you need millions of accounts and billions in AUC to make the indirect revenue lines work
- When you have no path to banking/cash-management capability — the NII line requires deposit infrastructure
- Pure-play active-trader markets where the customer wants tight spreads on derivatives, not free stock trades
- When regulators are tightening cash-sweep disclosure and best-execution rules — economics shift quickly

## Common pitfalls

- **Rate-cycle exposure** — when Fed cuts to zero, NII collapses; the model's "free" surface stays free but the funding line disappears
- **Best-execution and PFOF scrutiny** — SEC enforcement actions (Robinhood $65M settlement) and ongoing review of the practice
- **Cash-sweep litigation** — Schwab, Wells, Morgan Stanley all face suits over inadequate yields paid to clients on swept cash
- **Active-trader cannibalization** — once free, trading volume per user can paradoxically fall as users stop optimizing
- **Gamification backlash** — Robinhood-style UX prompts regulatory and political pressure
- **PFOF dependency** — Robinhood's pre-IPO PFOF mix made it vulnerable to any rule change
- **Brand confusion** — "free" reads as commodity; differentiation must come from research, advisory, banking
- **Margin call cascades** — leveraged retail accounts in a downturn trigger losses, complaints, and regulatory inquiry

## Key metrics

- **Funded Accounts** and **Net New Accounts** — Schwab 31M+ accounts
- **AUC (Assets Under Custody)** — total client assets on platform; the funnel for all indirect revenue
- **NII / Net Interest Margin** — interest earned minus interest paid; sensitive to rate environment
- **Asset Management Fee Revenue** as % of total — Schwab ~30%; the discretionary advisory engine
- **PFOF per million-shares routed** — wholesaler economics
- **Deposit Beta** — % of fed-funds-rate move passed through to client cash yield
- **ARPU** — total revenue / average accounts
- **DAU / Trades per Account per Month** — engagement metric but not the primary driver
- **Mutual Fund / Options / FX Commission Revenue** — the products still paid for

## Decision questions

- What's our second revenue line that's bigger than commissions ever were?
- Are we resilient to a zero-rate environment, or does our model collapse when NII goes to zero?
- What's our regulatory exposure on PFOF and cash sweep, and how dependent are we on either?
- Do we have or partner with a bank that can monetize client cash at scale?
- How do we differentiate from competitors who all offer $0 — is it research, advisory, brand, banking bundle?
- What's the path to advisory cross-sell, and what tier of AUC does it require?

## Canonical examples

- **Charles Schwab** — pioneer of $0 commission at scale; 31M+ accounts; revenue mix 40% NII / 30% AM fees / 14% trading / 3% bank deposit / 3% other; market cap $130B+ (pages 78-88)
- **Fidelity Investments** — matched Schwab to $0; dominant in retirement (401k); cross-sells advisory, brokerage, banking
- **Vanguard** — $0 on Vanguard ETFs; lower NII focus; member-owned structure
- **Robinhood** — pure-play mobile; PFOF-heavy; 23M+ accounts; gamification controversy; IPO'd at $32B (now lower)
- **Interactive Brokers Lite** — IBKR's free tier vs. its Pro per-trade tier
- **eToro stocks (US)** — $0 commission for US-listed equity through eToro
- **Webull, SoFi Invest, M1 Finance** — newer entrants combining $0 trading with banking/lending bundles
- **Saudi context** — Saudi commission structure is set by CMA and Tadawul; full "zero commission" retail equity trading isn't permitted because exchange and clearing fees pass through. But banks (SNB Capital, Al Rajhi Capital) have already moved toward thin-commission digital brokerage; the next move is bundled cash-sweep + advisory + lending economics around a free-feeling app. White space for a non-bank fintech-first player remains regulator-gated.

## Related concepts

- [[Multiple Revenue Streams]] — _see_also_ (model survives by NOT depending on commissions)
- [[Freemium Business Model]] — _amplifies_ (free trading as the freemium hook)
- [[Robo-Advisor Business Model (WealthTech)]] — _see_also_ (advisory tier sits on top of free brokerage)
- [[Hybrid Advisor Model]] — _see_also_ (Schwab Intelligent Portfolios Premium)
- [[Cross-Subsidy Business Model]] — _see_also_ (NII and AM cross-subsidize "free" trading)

## Sources

- [[_Sources/Wealthtech_Business_Model]] — pages 78-88 (Charles Schwab full case study, revenue breakdown, multi-stream business model)
