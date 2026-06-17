---
type: atom
title: SaaS Pricing Models
aliases: [SaaS Pricing Strategies, Subscription Pricing, Software Pricing]
category: framework
applicable_to: [saas, b2b_saas, b2c_saas, platform, subscription]
key_metrics: [arpu, conversion_rate, expansion_rate, churn_by_tier, price_elasticity]
related:
  - "specializes: Pricing Mechanisms"
  - "requires: Value Proposition"
  - "requires: Customer Segments"
  - "see_also: Freemium Model"
  - "see_also: Tiered Pricing"
  - "see_also: Three-Tier Pricing"
  - "see_also: SaaS Business Model"
sources: [_Sources/Super-Guide-SaaS-Business-Model-xnexrn]
source_pages: "83-85"
tags: [saas, pricing, subscription, revenue-model, monetization, b2b, b2c]
created: 2026-05-22
---

# SaaS Pricing Models

## Definition

The five primary pricing architectures for SaaS businesses: Freemium, Flat-Rate, Tiered, Per-User, and Usage-Based. Pricing is the most powerful and most undertested growth lever in SaaS. Pereira: "The pricing model affects the potential user's decision to use the service or not. The pricing model can have an impact on the growth rate of a company. A report published by PWC stated that it may take up to two years for a SaaS company to break even."

## The five models

### 1. Freemium
**What:** Free tier with limited features + paid tiers with expanded functionality.

**Examples:** Slack, Dropbox, Airstory, HubSpot (limited free tools)

**Pros:**
- Low barrier to entry — users can try before buying
- Viral potential — free users invite other free users
- Large top-of-funnel for conversion
- Defensive moat against competitors

**Cons:**
- Low conversion rates (typically 2-5% of free users convert)
- High support burden from non-paying users
- Revenue uncertainty — "not everyone turns into a premium customer"
- Risk of free tier being "too good"

**Best for:** Products with network effects, viral loops, or where users can self-educate

**Worst for:** High-touch, complex products requiring onboarding

---

### 2. Flat-Rate Pricing
**What:** Single price, single package, all features included.

**Examples:** Basecamp ($99/month flat)

**Pros:**
- Simplicity — no decision paralysis
- Predictable revenue per customer
- Easy to communicate and sell
- Lower complexity in billing/support

**Cons:**
- No ability to capture value from power users
- One-size-fits-all misses segments with different willingness-to-pay
- No expansion revenue from existing customers
- Hard to differentiate from competitors

**Best for:** Simple products with uniform usage patterns; early-stage when you don't know segments yet

**Worst for:** Products with wide variance in customer size or usage intensity

---

### 3. Tiered Pricing
**What:** Multiple packages at different price points with different feature sets.

**Examples:** HubSpot, Mailchimp, most B2B SaaS

**Pros:**
- Captures different willingness-to-pay across segments
- Natural upsell path (Starter → Professional → Enterprise)
- Expansion revenue from upgrades
- Anchoring effect — middle tier looks reasonable

**Cons:**
- Feature gate decisions are hard to get right
- Users may feel "nickel-and-dimed"
- Support complexity (different tiers get different features)
- Risk of overengineering tiers before knowing customer needs

**Best for:** Products serving multiple segments (SMB vs. Enterprise); mature products with clear feature differentiation

**Worst for:** Early-stage products without enough usage data to define tiers meaningfully

**Golden rule:** 3 tiers is the sweet spot. Good-Better-Best. (See: [[Three-Tier Pricing]])

---

### 4. Per-User Pricing
**What:** Charge per seat, per license, or per employee using the software.

**Examples:** Asana, Slack, Microsoft 365

**Pros:**
- Revenue scales with customer growth (land-and-expand)
- Easy to calculate and justify
- Aligns cost with value (more users = more value)
- Natural expansion as teams grow

**Cons:**
- Creates incentive for account sharing / license friction
- Penalizes adoption (every new user = more cost)
- Doesn't capture heavy vs. light users
- Can be gamed by customers rotating shared logins

**Best for:** Team collaboration tools where value increases with more users

**Worst for:** Products where one person manages the tool for many (e.g., analytics dashboards)

---

### 5. Usage-Based Pricing
**What:** Charge based on consumption — API calls, storage, transactions, messages.

**Examples:** Stripe, AWS, Twilio, Snowflake

**Pros:**
- Lowest barrier to entry (pay nothing if you use nothing)
- Perfectly aligns price with value
- Captures power users who would underpay on flat plans
- Scales seamlessly as customers grow

**Cons:**
- Revenue unpredictability for both sides
- Customer anxiety about runaway bills
- Complex billing infrastructure
- Hard to forecast revenue

**Best for:** Infrastructure/API products where usage directly correlates with customer value

**Worst for:** Products where usage is unpredictable or hard to meter

---

## Model selection matrix

| If your product is... | Consider... | Avoid... |
|---|---|---|
| Simple, single-use-case | Flat-Rate | Tiered (overcomplicates) |
| Viral, network-effect driven | Freemium | Flat-Rate (no viral loop) |
| Serves SMB → Enterprise | Tiered | Flat-Rate (misses segments) |
| Team collaboration tool | Per-User | Usage-Based (hard to meter collaboration) |
| Infrastructure / API | Usage-Based | Per-User (misaligned with value) |
| Early stage, unknown segments | Flat-Rate or simple Freemium | Complex tiered (guessing segments) |

## Hybrid models (advanced)

Most successful SaaS companies use **hybrid approaches**:
- **Freemium + Tiered:** Free tier + Starter/Pro/Enterprise
- **Tiered + Per-User:** Base tier price + per-seat fee
- **Tiered + Usage:** Base features included + overage charges

Example: HubSpot = Freemium entry → Tiered plans → Per-user seats + usage overages

## Decision questions

- Which pricing model best aligns cost with the value metric our customers care about?
- What's our target customer's willingness-to-pay, and which model captures it?
- Do we want predictability (flat/tiered) or scalability (usage/per-user)?
- Can we offer a free tier without cannibalizing paid conversions?
- How will our pricing model affect our CAC and payback period?
- What pricing model do our top 3 competitors use, and why?
- If a customer grows 10x, does our pricing capture that growth (land-and-expand)?
- What's our expansion revenue strategy — seat growth, plan upgrades, or usage increases?

## Common pitfalls

- **Copying competitor pricing without understanding their unit economics**
- **Pricing by cost instead of value** — "The pricing model affects the potential user's decision"
- **Too many tiers** — decision paralysis kills conversions
- **No clear upgrade path** — customers don't know why they should pay more
- **Underpricing to gain market share** — hard to raise prices later; trains customers for cheap
- **Ignoring packaging** — what features go in which tier matters as much as price
- **Not testing** — pricing should be A/B tested like any other growth lever

## Related concepts

- [[Freemium Model]] — _specializes_
- [[Tiered Pricing]] — _specializes_
- [[Three-Tier Pricing]] — _see_also_ (good-better-best structure)
- [[Pricing Mechanisms]] — _see_also_ (fixed vs. dynamic pricing)
- [[Value Proposition]] — _requires_ (pricing must align with value delivered)
- [[Customer Segments]] — _requires_ (different segments = different willingness-to-pay)
- [[SaaS Business Model]] — _requires_ (parent framework)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Per-Seat SaaS Pricing]] — _auto_ (score 15.8: tags×10.0, applicable_to×2.0, title×3.0, category×0.8)
- [[SaaS Business Model]] — _auto_ (score 13.2: tags×8.0, applicable_to×1.0, title×1.5, category×0.8, alias×2.0)
- [[SaaS Renewal Pricing]] — _auto_ (score 12.0: tags×6.0, applicable_to×2.0, title×3.0, alias×1.0)
- [[Hybrid SaaS Pricing]] — _auto_ (score 11.8: tags×6.0, applicable_to×2.0, title×3.0, category×0.8)
- [[Value-Based SaaS Pricing]] — _auto_ (score 11.0: tags×6.0, applicable_to×2.0, title×3.0)
- [[Usage-Based SaaS Pricing]] — _auto_ (score 10.8: tags×6.0, applicable_to×1.0, title×3.0, category×0.8)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/Super-Guide-SaaS-Business-Model-xnexrn]] — pages 83-85 (5 model descriptions with examples)
