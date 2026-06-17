---
type: atom
title: Triggered Email Campaign
aliases: [Triggered Email, Transactional Trigger Email, Behavior-Triggered Email]
category: marketing_tactic
applicable_to: [B2C, B2B, SaaS, ecommerce, services, content]
key_metrics: [open_rate, click_through_rate, conversion_rate, time_to_send, revenue_per_trigger]
related:
  - "uses: Behavioral Trigger"
  - "specializes: Lead Nurturing Workflow"
  - "depends_on: Marketing Automation Platform"
  - "differs_from: Drip Campaign"
  - "see_also: Audience Segmentation for Marketing Automation"
sources: [_Sources/Marketing_Automation-qapv22]
source_pages: "76-79"
tags: [marketing, email, automation, trigger, lifecycle]
created: 2026-06-17
---

# Triggered Email Campaign

## Definition

A triggered email campaign is an automated email — or short series — sent in response to a specific user action or event, rather than on a predetermined schedule. Pereira calls these "one of the most powerful forms of email automation" because they "increase engagement rates because they are timely and relevant to the user's behavior or preferences." Common triggers include signup (fires welcome series), abandoned cart (fires recovery email), purchase (fires confirmation, review request, cross-sell), inactivity (fires re-engagement), milestone (fires anniversary or loyalty reward). Triggered campaigns sit alongside drip campaigns in the automation toolkit — drip is calendar-driven, triggered is behavior-driven — and modern programs blend both, with triggers often kicking off drip sequences.

## Key attributes

- **Event-fired** — sends when the user does the thing, not when the calendar says
- **Near-real-time** — relevance compounds with timeliness; send within minutes when possible
- **Single email or short branching sequence** — usually tighter than long drips
- **Highly personalized** — references the specific action that fired it
- **Often highest-performing** — open and click rates routinely exceed batch sends
- **Workflow-composable** — triggered email can be the first step in a multi-step workflow
- **Exit-aware** — sequence stops when the goal action happens

## When to use

- Welcome series on signup or subscription
- Abandoned cart, abandoned browse, abandoned form recovery
- Order confirmation, shipping update, delivery notification
- Post-purchase: review request, cross-sell, replenishment reminder
- Trial ending, subscription renewal, payment failure
- Inactivity re-engagement after defined dormancy period
- Milestone moments: anniversary, loyalty tier, usage threshold

## When NOT to use

- For one-off campaigns or announcements (use broadcast)
- When the action doesn't reliably predict interest in a follow-up
- Without frequency capping when multiple triggers can fire on overlapping events
- When latency makes the message arrive long after the moment passes
- For audiences where triggered behavior feels invasive (privacy mismatch)

## Common pitfalls

- Generic templates that ignore the specific action that fired the trigger
- Latency — sending hours or days after the trigger event kills relevance
- No exit — sending follow-ups after the user already completed the desired action
- Trigger swarm — multiple triggers fire on related events, overwhelming the user
- Treating triggered email as transactional only (missing upsell, retention opportunities)
- No A/B testing of triggered messages because "they're already working"
- Failing to localize for time zone — triggered email at 3 AM the user's time

## Key metrics

- **Open rate** (typically 2-5x batch, but watch for decline)
- **Click-through rate**
- **Conversion rate** (recover cart, complete purchase, re-engage)
- **Time-to-send** (latency from trigger event to email delivery)
- **Revenue per triggered send** (especially for cart recovery)
- **Unsubscribe rate per trigger type**

## Decision questions

- What user action is strong enough signal to merit an immediate email?
- How fast can the email fire — is the trigger truly real-time?
- What is the one action this triggered email is designed to drive?
- What happens if multiple triggers fire close together (frequency caps)?
- What exit condition stops the sequence (conversion, unsubscribe, time)?
- How will we test and iterate triggered messages?

## Canonical examples

- **Welcome email on newsletter signup** — fires immediately with welcome series intro (page 77)
- **Amazon abandoned cart recovery** — viewed-but-didn't-buy fires personalized follow-up with similar items or discount (pages 122-123)
- **Shopify abandoned cart** — items in cart, purchase incomplete → automated email with cart contents and CTA (page 128)
- **Post-purchase review request** — completed order fires review/feedback email after delivery window
- **Trial-ending trigger** — SaaS trial day 12 of 14 fires subscription discount email (page 78)

## Related concepts

- [[Behavioral Trigger]] — _uses_ (the trigger that fires the email)
- [[Lead Nurturing Workflow]] — _specializes_ (triggered email is one nurture move)
- [[Marketing Automation Platform]] — _depends_on_
- [[Drip Campaign]] — _differs_from_ (drip is time-scheduled; triggered is event-fired)
- [[Audience Segmentation for Marketing Automation]] — _see_also_ (segment + trigger compound relevance)

## Sources

- [[_Sources/Marketing_Automation-qapv22]] — pages 76-79 (triggered email campaigns, drip campaigns, workflow automation, dynamic content)
