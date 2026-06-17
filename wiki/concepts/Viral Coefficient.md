---
type: atom
title: Viral Coefficient
aliases: [Viral Coefficient, K-Factor, Virality, Viral K, Viral Coefficient (K)]
category: metric
applicable_to: [SaaS, B2C, consumer_apps, marketplaces, social_products]
key_metrics: [invitations_per_user, invitation_conversion_rate, viral_cycle_time]
related:
  - "see_also: Network Effects"
  - "see_also: Viral Loop (Steve Blank)"
  - "see_also: Customer Acquisition Cost"
  - "amplifies: Network Effects vs Virality vs Economies of Scale"
sources: [_Sources/Business_Model_Metrics-nh7lz7]
source_pages: "50-52"
tags: [metric, virality, k_factor, growth, referrals, network_effects]
created: 2026-06-16
---

# Viral Coefficient

## Definition

The Viral Coefficient (often called the K-Factor) measures the number of new users a typical existing user generates through referrals. Pereira frames it as an estimate of a company's exponential referral cycle — the average number of new customers each existing customer recruits via recommendations, invitations, or shares. A product is "viral" only when its coefficient exceeds 1.0, meaning each user brings in more than one additional user; below 1.0, referrals decay; above 1.0, the user base compounds exponentially (in theory — sustained K > 1 is exceptionally rare in practice).

## How to calculate

Pereira gives two equivalent formulas (pages 51-52):

**Formula 1 (referral-attribution):**
- **K = Number of New Users Joined via Referrals ÷ Total Number of Customers** (in the same period)

**Formula 2 (invitation-funnel):**
- **K = Average Invitations Sent Per User × Conversion Rate of Those Invitations**

**Worked example.** Each existing user sends an average of 8 invitations per month, and 15% of invitations convert into new users.
- K = 8 × 0.15 = **1.2** — viral

If only 5% converted, K = 8 × 0.05 = 0.4 — sub-viral (decaying).

**Viral Cycle Time** — Pereira notes that the time between sending an invitation and the recipient becoming an inviter themselves matters as much as K. Short viral cycles compound fast; long cycles dampen even a healthy K.

## When to use

- Consumer products and social apps where word-of-mouth is the primary growth channel
- B2C SaaS with invite-based onboarding (Dropbox, Slack, Calendly model)
- Marketplaces — each new buyer/seller brings counterparties
- Products with explicit referral programs to track program ROI
- Reducing CAC — word-of-mouth referrals eliminate paid acquisition cost (page 51)

## When NOT to use

- B2B enterprise sales where individual users don't drive purchase decisions
- Pure-paid acquisition businesses where there's no referral motion to measure
- Mature products where viral growth has saturated
- Single-point-in-time measurement — viral coefficients are highly variable and require trend analysis
- As a long-term growth model — Pereira notes that sustained exponential growth from referrals alone is "almost impossible to achieve" in the real world (page 51)

## Common pitfalls

- **Attribution noise** — distinguishing referral-driven sign-ups from organic discovery requires clean tracking
- **Cycle-time blindness** — a K of 1.5 with a 6-month cycle compounds far slower than K of 1.1 with a 2-week cycle
- **One-time-spike interpretation** — launches, press, or campaigns can spike K temporarily; sustained K is what matters
- **Conflating virality with network effects** — virality is about user acquisition; network effects are about per-user value (see [[Network Effects vs Virality vs Economies of Scale]])
- **Ignoring saturation** — K declines as the addressable market saturates; early-stage K doesn't last
- **Pereira's caveat** — viral coefficients are inherently variable and hard to estimate accurately (page 51)

## Benchmarks

- **K < 1** — sub-viral; referrals decay over time; you need other acquisition channels
- **K ≈ 1** — replacement-level; the base sustains itself but doesn't grow purely from referrals
- **K > 1** — viral; the user base compounds (in theory)
- **K > 1 + short cycle time** — explosive growth zone (Hotmail, Dropbox, Calendly at peak)
- **Most "viral" products** actually run K of 0.3-0.7 supplemented by paid and organic acquisition; pure K > 1 is rare and rarely sustainable

## Decision questions

- What's our current K, and how is it trending?
- What's our viral cycle time, and can we shorten it?
- Is our referral mechanism friction-free, or does it require effort?
- What share of our acquisition is referral vs paid vs organic?
- If K < 1, what's the gap we need to close to make referrals a growth engine?

## Canonical examples

- **Dropbox referral program** — give 500MB, get 500MB; one of the most cited viral coefficient case studies
- **Hotmail "P.S. I love you" footer** — the canonical viral cycle that drove K > 1 for years
- **Calendly** — every meeting recipient sees the product and may become a user
- **Slack** — invited team members become inviters

## Related concepts

- [[Network Effects]] — _see_also_ (different mechanism — value vs acquisition)
- [[Network Effects vs Virality vs Economies of Scale]] — _see_also_ (the disambiguation atom)
- [[Viral Loop (Steve Blank)]] — _see_also_ (the design pattern that produces K > 1)
- [[Customer Acquisition Cost]] — _see_also_ (high K reduces blended CAC dramatically)
- [[Critical Mass]] — _see_also_ (the threshold beyond which K and network effects compound)
- [[Flywheel Effect]] — _see_also_ (the compounding growth pattern virality produces)

## Sources

- [[_Sources/Business_Model_Metrics-nh7lz7]] — pages 50-52 (definition, viral cycle time, importance, two formulas)
