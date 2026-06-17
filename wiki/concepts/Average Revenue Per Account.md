---
type: atom
title: Average Revenue Per Account
aliases: [ARPA, ARPU, Average Revenue Per User, Average Revenue Per Customer, ARPC, Average Revenue Per Account (ARPA)]
category: metric
applicable_to: [SaaS, subscription, telecom, services, B2B, B2C]
key_metrics: [total_revenue, account_count, monthly_revenue, annual_revenue, expansion_MRR]
related:
  - "depends_on: Monthly Recurring Revenue"
  - "amplifies: Customer Lifetime Value"
  - "see_also: Annual Contract Value"
  - "see_also: Net MRR Churn Rate"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "54-57,169,263"
tags: [metric, arpa, arpu, revenue, saas, subscription, profitability]
created: 2026-06-16
---

# Average Revenue Per Account

## Definition

Average Revenue Per Account (ARPA) measures how much revenue a firm earns from each customer account over a given period — typically calculated monthly for SaaS, quarterly or annually for other businesses. Pereira notes ARPA is often used interchangeably with ARPU (Average Revenue Per User) and ARPC (Average Revenue Per Customer), but they differ subtly: one client may have many accounts, and one account may have many users. ARPA isn't recognized by GAAP, but it's the foundation of MRR (MRR = ARPA × Customer Count) and a key driver of LTV (LTV = ARPA × Lifespan).

## How to calculate

Pereira's formula (page 56):
- **ARPA = Total Revenue (over period) ÷ Number of Accounts (over same period)**

**Worked example.** Company generates $540,000 monthly revenue across 2,000 customer accounts:
- ARPA = $540,000 ÷ 2,000 = **$270 per account per month**

**ARPC variant** (page 169) — Pereira's worked example: $2,000,000 monthly revenue ÷ 120,000 subscribers = **$16.67 ARPC** (the consumer-subscription frame, where each subscriber = one account).

**Important distinction:**
- **ARPA** — per account; an account can contain multiple users; better for B2B
- **ARPU** — per user; useful when individual usage drives revenue (telecom, consumer)
- **ARPC** — per customer; equivalent to ARPA when one customer = one account

## When to use

- Sizing the average value of an account to drive sales targeting
- Comparing pricing tiers — which plans drive the highest ARPA?
- Benchmarking against competitors using similar sales motion
- Tracking monetization improvements — rising ARPA over time signals pricing power or upsell success
- Feeding into MRR (MRR = ARPA × accounts) and CLV (CLV = ARPA × lifespan) calculations

## When NOT to use

- As the headline growth metric — it can rise even as the customer base shrinks
- For businesses with one-time-purchase products (use Average Order Value instead)
- When account sizes vary dramatically — a few enterprise accounts can swing ARPA; segment instead
- Pre-PMF or very small businesses where the sample is too small for a meaningful average

## Common pitfalls

- **Vanity metric trap** — Pereira explicitly warns ARPA can be moved by a small number of significant consumers in a short period (page 55); it's only valuable when monitored alongside other SaaS metrics
- **Conflating ARPA and ARPU** — Pereira notes the two are commonly assumed synonymous but aren't; one client may have many accounts (page 54)
- **Top-line vs net** — ARPA on gross revenue ignores discounts and refunds; the net figure is the operating truth
- **Whale distortion** — a single enterprise account in an SMB book can lift ARPA by 30% while masking the actual price point most customers pay
- **Not segmenting by cohort** — new-customer ARPA differs from tenured-customer ARPA; blended hides the trend
- **Ignoring expansion** — Pereira's main lever for raising ARPA is expansion MRR via upsells, cross-sells, and add-ons (page 56)

## Benchmarks

- **Consumer subscription (B2C)** — single-digit to low-double-digit dollars per month
- **SMB SaaS** — $50-500 per account per month
- **Mid-market SaaS** — $500-5,000 per account per month
- **Enterprise SaaS** — $5,000-50,000+ per account per month
- **Trend matters more than absolute** — rising ARPA over time is the signal of monetization health

## Decision questions

- What's our ARPA trend, and what's driving it (price changes, mix shift, expansion)?
- Is our ARPA distorted by a few large accounts? What's the median?
- How does ARPA differ by tier, segment, and cohort?
- Are we using ARPA or ARPU — and is that consistent with how we sell?
- Where are the expansion levers — upsells, cross-sells, add-ons, seat growth?

## Canonical examples

- **Telecom, social media, banking** — Pereira's named industries that lean on ARPA (page 54)
- **The $270 ARPA × 2,000 customers = $540K MRR example** (page 64) — the canonical ARPA-MRR relationship
- **The $16.67 ARPC example** (page 169) — consumer subscription variant
- **ARPA → LTV link** — Pereira's note that boosting ARPA may enhance LTV (page 56)

## Related concepts

- [[Monthly Recurring Revenue]] — _depends_on_ (MRR = ARPA × accounts)
- [[Customer Lifetime Value]] — _amplifies_ (CLV = ARPA × lifespan; ARPA is the value-per-period input)
- [[Annual Contract Value]] — _see_also_ (ACV is the B2B annualized analog)
- [[Net MRR Churn Rate]] — _see_also_ (expansion drives ARPA up; churn drives it down)
- [[SaaS Pricing Models]] — _see_also_ (pricing structure directly shapes ARPA)
- [[Vanity Metric Trap]] — _see_also_ (ARPA in isolation can be misleading)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 54-57 (definition, importance, formula, improvement levers), page 169 (ARPC variant), page 263 (ecommerce context)
