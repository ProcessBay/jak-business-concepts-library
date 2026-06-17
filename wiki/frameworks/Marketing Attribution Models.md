---
type: atom
title: Marketing Attribution Models
aliases: [Attribution Model, Marketing Attribution, Multi-Touch Attribution, First-Touch Attribution, Last-Touch Attribution]
category: marketing_framework
applicable_to: [B2B, B2C, SaaS, ecommerce, content, services]
key_metrics: [revenue_by_channel, conversion_credit_by_touchpoint, CAC_by_channel, attribution_consistency]
related:
  - "depends_on: Marketing Automation Platform"
  - "feeds: Marketing-Side Lead Scoring"
  - "see_also: Customer Journey Mapping"
  - "see_also: Buyer's Journey Three-Stage Model"
  - "see_also: GTM KPIs"
sources: [_Sources/Marketing_Automation-qapv22]
source_pages: "85-88,111-112"
tags: [marketing, attribution, analytics, ROI, multi-channel, measurement]
created: 2026-06-17
---

# Marketing Attribution Models

## Definition

Marketing attribution models are rules for assigning credit for a conversion across the various marketing touchpoints a customer interacted with on their path to that conversion. Pereira frames attribution as critical to understanding "what drives customer engagement and conversions" so marketers can identify the most impactful activities in the marketing mix. The three foundational models are: (1) **First-Touch** — full credit to the first interaction, useful for measuring awareness channels; (2) **Last-Touch** — full credit to the last interaction before conversion, useful for assessing closing channels and direct-response; (3) **Multi-Touch** — credit distributed across all touchpoints in the journey, customizable by weighting (linear, time-decay, U-shaped, W-shaped). No single model is correct; each answers a different question, and modern marketing automation platforms typically expose multiple so teams can reconcile their picture of the customer journey.

## Key attributes

- **Credit-assignment rule** — different rules answer different questions, none is "true"
- **Channel- and touchpoint-aware** — depends on tracking the journey across email, paid, social, organic, sales
- **Single-touch vs multi-touch** — single is simpler; multi is closer to reality but harder to calibrate
- **Customizable weighting** — multi-touch can weight by stage, recency, position
- **Platform-dependent** — relies on accurate cross-channel tracking inside MAP + analytics
- **Decision-anchored** — choice of model shapes which channels get budget
- **Cookie/identity-fragile** — modern privacy changes make cross-channel attribution harder

## When to use

- Multi-channel marketing programs where touchpoint contribution must be measured
- Budget allocation decisions across paid, organic, email, content, events
- Sales-marketing alignment requires shared, agreed measurement
- Long customer journeys with many touchpoints (B2B, considered B2C)
- When direct ROI per channel is the lens for go/no-go decisions

## When NOT to use

- Single-channel marketing (no allocation problem to solve)
- Audiences and tracking too small to support statistical confidence
- Without instrumentation across channels — incomplete tracking distorts every model
- When teams will fight over the "right" model instead of acting on signal
- For short-cycle impulse purchases where the entire journey fits one touchpoint

## Common pitfalls

- Treating one model as the truth instead of recognizing each model answers a different question
- Last-touch overcredits closing channels and starves brand and awareness investment
- First-touch ignores nurturing and middle-funnel contribution
- Multi-touch with arbitrary weights becomes opinion dressed as data
- Tracking gaps (cross-device, offline, dark social) silently distort every model
- Comparing channel ROI across different attribution models without normalizing
- Privacy changes (cookie deprecation, iOS tracking) silently break legacy attribution

## Key metrics

- **Revenue attributed per channel** under each model
- **Conversion credit by touchpoint position** (first, middle, last)
- **CAC per channel** under chosen attribution model
- **Attribution consistency** across models (volatile channels deserve scrutiny)
- **Influenced pipeline vs sourced pipeline** (B2B context)
- **Time from first touch to conversion** (journey length informs model choice)

## Decision questions

- What decision are we trying to make with the attribution number? (Budget allocation? Channel optimization? Sales credit?)
- Which model best fits our journey length and complexity?
- Are we comparing models or anchoring on one — and do we know why?
- What tracking gaps distort our picture, and where can we close them?
- How will we explain attribution choices to sales, finance, leadership?
- How resilient is our model to privacy changes (cookies, iOS tracking)?

## Canonical examples

- **First-touch** — content marketing program credited fully for organic search visits that later convert
- **Last-touch** — paid retargeting ad gets full credit for converting browse-abandon visitor
- **Multi-touch linear** — every touchpoint gets equal credit across a B2B journey
- **U-shaped multi-touch** — first and last touches weighted heaviest, middle touches share remainder
- **Social media attribution** — Pereira specifically calls out First Click, Last Click, Linear as models for social channel ROI (page 87)

## Related concepts

- [[Marketing Automation Platform]] — _depends_on_ (the data and reporting layer)
- [[Marketing-Side Lead Scoring]] — _feeds_ (attribution informs which behaviors to score)
- [[Customer Journey Mapping]] — _see_also_ (journey defines the touchpoints to attribute)
- [[Buyer's Journey Three-Stage Model]] — _see_also_
- [[GTM KPIs]] — _see_also_
- [[Customer Acquisition Cost]] — _see_also_ (CAC by channel needs attribution)

## Sources

- [[_Sources/Marketing_Automation-qapv22]] — pages 85-88 (social media ROI and attribution models for social), pages 111-112 (marketing attribution models: first-touch, last-touch, multi-touch)
