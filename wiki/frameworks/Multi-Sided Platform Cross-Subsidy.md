---
type: atom
title: Multi-Sided Platform Cross-Subsidy
aliases: [Cross-Subsidy Platform Model, Multi-Sided Subsidy, Subsidized Side, Money Side, Two-Sided Cross-Subsidy]
category: platform_strategy
applicable_to: [platforms, marketplaces, media, advertising, ecosystems, B2B, B2C, B2B2C]
key_metrics: [subsidized_side_MAU, paying_side_ARPU, take_rate, contribution_margin_by_side, network_density]
related:
  - "amplifies: Two-Sided Network Effect"
  - "specializes: Platform-Based Business Model"
  - "see_also: Hidden-Pattern Business Model"
  - "see_also: Free Platform Distribution Strategy (Android Pattern)"
sources: [_Sources/Google_Business_Model-7bulcf]
source_pages: "23-27,31,72-75"
tags: [google, case_study, business_model, platform, multi_sided, cross_subsidy]
created: 2026-06-17
---

# Multi-Sided Platform Cross-Subsidy

## Definition

On a platform with two or more distinct customer groups, charge one side heavily (the "money side"), subsidize or give the service away free to the other side (the "subsidized side"), and let the network effects between them generate the value that justifies the imbalance. Pereira describes Google as a multi-sided platform in which **users, content producers (publishers, YouTubers, app developers), and advertisers** all contribute equally to platform value but pay very differently — users and most publishers pay nothing or get paid, advertisers pay essentially all the bills. The cross-subsidy is the deliberate pricing asymmetry that makes the side most price-sensitive joinable at zero cost, knowing the other side will pay a premium to reach them. Pereira treats this as the structural backbone of Google's business and the reason the company describes its "customers" as "key partners" — all three sides are bound to the platform's success.

## Key attributes

- **Two-or-more sides** with distinct value propositions and price elasticities
- **Asymmetric pricing** — one or more sides subsidized to zero or negative, one side charged premium
- **Network effects across sides** — more users attract more advertisers, more advertisers attract more publishers
- **Side-selection discipline** — wrong choice of money side kills the platform (Microsoft tried to charge developers for early Bing inventory)
- **Indirect price discrimination** — money side pays for access to a population they can't reach otherwise
- **All-sides churn risk** — losing the subsidized side collapses the value to the money side
- **Take-rate as primary lever** — platform's margin lives in how much it extracts from the money side

## When to use

- You can identify two clearly distinct sides with different willingness-to-pay
- One side's adoption is structurally throttled by price sensitivity
- The other side's willingness to pay scales with the first side's volume
- The "value of access" to the subsidized side compounds with scale (winner-take-most dynamics)
- You can sustain the subsidy from money-side revenue long enough to hit network-effect ignition

## When NOT to use

- The two sides are actually the same user wearing different hats (no real cross-subsidy)
- Money-side willingness-to-pay doesn't scale with subsidized-side volume
- Subsidized side defects to a free alternative once it exists (low switching cost)
- Regulators view your cross-subsidy as predatory pricing or tying
- You can't sustain subsidy losses long enough for network effects to kick in

## Common pitfalls

- Subsidizing the wrong side (the price-insensitive one)
- Letting the subsidy fall to zero too early — subsidized side defects, platform unwinds
- Over-extracting from the money side — they build their own alternative (Amazon Ads vs. Google for product search)
- Confusing cross-subsidy with loss-leadership — cross-subsidy is structural, loss-leadership is temporary
- Failing to identify all sides — Google's "publishers" were almost an afterthought before AdSense
- Ignoring the third side until it churns — content producers leaving YouTube or app developers leaving Play Store

## Key metrics

- **Subsidized-side MAU/scale** — the asset being sold to the money side
- **Paying-side ARPU** — revenue per money-side customer
- **Take rate** — platform's cut on transactions/auctions
- **Contribution margin by side** — explicit per-side P&L
- **Side concentration risk** — top-N customers on the money side
- **Cross-side conversion** — how many money-side participants come from the subsidized side over time

## Decision questions

- Which side is genuinely price-sensitive, and which can pay?
- Does money-side WTP rise with subsidized-side volume? (If not, no cross-subsidy works)
- What's our path to ignition — how long do we subsidize before network effects carry?
- What stops the money side from building their own alternative?
- Are we tracking each side's churn and satisfaction independently?

## Canonical examples

- **Google Search** — users free, advertisers pay (pages 14, 23–27)
- **Google AdSense** — publishers receive revenue share, advertisers pay (pages 20, 41–50, 74–75)
- **YouTube** — viewers free, creators paid (revenue share), advertisers pay (pages 21, 31)
- **Android / Play Store** — users free, OEMs free (or pay licensing), developers pay 15–30% cut (pages 59–66)
- **Free-to-air TV, magazines** — analog ancestors (audience free, advertisers pay)
- **LinkedIn** — job-seekers free, recruiters pay; readers free, advertisers pay
- **Visa / Mastercard** — cardholders subsidized, merchants pay interchange
- **Uber early years** — riders subsidized, driver payouts subsidized — both sides subsidized, capital pays; eventually rebalanced

## Related concepts

- [[Two-Sided Network Effect]] — _amplifies_ (cross-subsidy weaponizes the network effect)
- [[Platform-Based Business Model]] — _specializes_
- [[Hidden-Pattern Business Model]] — _see_also_ (the user-side experience of being subsidized)
- [[Free Platform Distribution Strategy (Android Pattern)]] — _see_also_ (cross-subsidy applied to OS distribution)
- [[Consumer-Free API-Paid Monetization (Google Maps Pattern)]] — _see_also_ (consumer side subsidized, B2B side pays)
- [[Performance Advertising Model]] — _see_also_ (how the money side typically pays)

## Sources

- [[_Sources/Google_Business_Model-7bulcf]] — pages 23–27 (BMC: three customer segments — advertisers, publishers, users — with distinct value props), page 31 (key partners framed as customers because all sides contribute equally), pages 72–75 (sustainable advantage rooted in the cross-subsidy structure; partners depend on Google more than Google depends on any one of them)
