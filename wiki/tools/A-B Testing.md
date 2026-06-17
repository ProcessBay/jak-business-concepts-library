---
type: atom
title: A/B Testing
aliases: [A/B Test, Split Testing, AB Testing, Bucket Testing, Online Controlled Experiment]
category: tactic
applicable_to: [SaaS, e-commerce, consumer_apps, marketing, product, conversion_optimization]
key_metrics: [conversion_lift, statistical_significance, sample_size, baseline_conversion_rate, p_value]
related:
  - "amplifies: Growth Hacking"
  - "amplifies: Growth Loop"
  - "amplifies: Product-Led Growth"
  - "see_also: Build-Measure-Learn Loop"
  - "see_also: Cohort Retention Analysis"
  - "see_also: Falsifiable Hypothesis Building"
sources: [_Sources/Growth_Hacking_Techniques-dtoisx-2]
source_pages: "34-35,60,82-83,95"
tags: [tactic, experimentation, ab_testing, optimization, growth, conversion, data_driven]
created: 2026-06-17
---

# A/B Testing

## Definition

A/B testing is a controlled experiment in which two (or more) variations of an element — a landing page, an email subject line, a pricing tier, an onboarding flow, a CTA button — are shown to randomly assigned user segments to determine which produces a better outcome on a defined metric. Pereira treats A/B testing as the operational backbone of growth hacking: it is the mechanism that converts opinions into data, allows iterative optimization at every stage of the growth loop, and produces the compounding improvements that separate a 1% conversion product from a 5% conversion product. Where intuition fails, A/B tests adjudicate. The discipline requires sufficient traffic, statistical rigor, and a culture that accepts losing hypotheses as learning, not as failure.

## Key attributes

- **Randomized assignment** — users split randomly to remove selection bias
- **Single-variable isolation** — one thing changed at a time (otherwise you can't attribute the lift)
- **Pre-defined success metric** — measure decided before the test starts
- **Statistical significance** — winner determined by statistical confidence, not gut
- **Sample size matters** — too few users → noise; long-tail metrics need long tests
- **Hypothesis-driven** — every test starts with a falsifiable hypothesis
- **Continuous, not one-off** — winning experiments compound; testing is a permanent capability

## When to use

- Optimizing any high-traffic conversion surface (landing pages, checkout, sign-up)
- Comparing pricing, packaging, or feature combinations
- Testing onboarding flow changes before full rollout
- Email subject lines, send times, content variations
- Any ad creative, copy, or targeting comparison
- Validating product-feature decisions where intuition diverges

## When NOT to use

- Low-traffic surfaces (sample size insufficient → noise dominates signal)
- When the change is so large that A/B testing it is unethical or impractical (entire brand redesign)
- When you don't have a clear primary metric (testing for "engagement" without a definition)
- When the test infrastructure is unreliable (data leaks, assignment bugs)
- For long-term strategic decisions where short-term metrics mislead

## Common pitfalls

- Calling a winner too early (peeking at results before statistical significance)
- Running multiple variables at once (you can't attribute the cause)
- Optimizing local maxima while missing larger redesigns
- Ignoring secondary metrics (a winning conversion lift that tanks retention)
- HiPPO override (Highest Paid Person's Opinion overrules the data)
- No hypothesis (running tests just to run them — wastes traffic without learning)
- Sample contamination (same user sees both variants)

## Key metrics

- **Conversion lift** — % difference between variants
- **Statistical significance** (typically p < 0.05) or Bayesian posterior probability
- **Sample size** — users per variant required for given baseline and detectable lift
- **Baseline conversion rate** — the control's performance
- **Test duration** — long enough to capture full user behavior cycle

## Decision questions

- What is our hypothesis, and what would falsify it?
- Do we have enough traffic to detect the lift we expect within a reasonable timeframe?
- What is our primary metric, and what secondary metrics could a winning test break?
- Are we changing one variable, or did scope creep make this a multi-variable test?
- Will we actually act on the result — or are we testing because we like testing?

## Canonical examples

- **Booking.com** — runs ~1,000 concurrent tests; conversion-optimization machine
- **Amazon** — pioneered large-scale A/B testing of homepage, search, checkout
- **Google** — famously tested 41 shades of blue for ad links
- **Netflix** — A/B tests thumbnails, recommendations, intro experience
- **Dropbox** — A/B tested referral-program incentive structures (page 99-100)
- **Airbnb** — tests onboarding, search ranking, listing presentation continuously

## Related concepts

- [[Growth Hacking]] — _amplifies_ (A/B testing is the growth hacker's primary tool)
- [[Build-Measure-Learn Loop]] — _amplifies_ (A/B is one form of the Lean Startup measure step)
- [[Falsifiable Hypothesis Building]] — _see_also_ (good A/B tests start with falsifiable hypotheses)
- [[Cohort Retention Analysis]] — _see_also_ (cohort analysis catches what A/B testing misses)
- [[Vanity Metrics vs Actionable Metrics]] — _see_also_ (A/B tests must measure actionable metrics)

## Sources

- [[_Sources/Growth_Hacking_Techniques-dtoisx-2]] — pages 34-35 (A/B testing for monitoring), page 60 (A/B testing in data analytics), pages 82-83 (A/B testing for pricing), page 95 (A/B testing in growth loops)
