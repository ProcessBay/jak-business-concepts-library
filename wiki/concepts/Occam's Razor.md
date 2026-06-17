---
type: atom
title: Occam's Razor
aliases: [Occams Razor, Ockham's Razor, Law of Parsimony, Principle of Parsimony, Simplest Explanation]
category: principle
applicable_to: [decision_making, problem_solving, strategy, product_design, diagnosis, scientific_reasoning]
key_metrics: [assumption_count, explanation_complexity]
related:
  - "see_also: Hanlon's Razor"
  - "see_also: First Principles Thinking"
  - "contrasts_with: Hickam's Dictum"
  - "contrasts_with: Occam's Broom"
sources: [_Sources/Super_Guide_Mental_Models-omnxhn]
source_pages: "51-57"
tags: [principle, mental_model, decision_making, problem_solving, simplicity, parsimony]
created: 2026-06-16
---

# Occam's Razor

## Definition

Occam's Razor is the principle that, among competing explanations or solutions, the one requiring the fewest assumptions is usually the most reliable. Pereira frames it: "The simplest explanation is usually the most reliable. If you want to figure out what happened, come up with the simplest possible explanation. You should know that Occam's Razor is not always right. That is, the easiest answer isn't always the right answer. But when a business has more than one way to solve a problem, the best thing to do is pick the one that makes the fewest assumptions." Attributed to 14th-century friar William of Ockham (with earlier Aristotle and Grosseteste antecedents), the razor is a decision-making tool, not a law of nature: it's a probabilistic bias toward parsimony.

## Key attributes

- **Fewest assumptions wins** — not the simplest-looking, but the one requiring the fewest unproved premises
- **Probabilistic, not absolute** — favors the simpler explanation; doesn't guarantee it's right
- **Simplicity ≠ ignoring detail** — "simple doesn't mean ignoring important details in order to make things easier to understand" (Pereira p. 51)
- **Cuts inflated proposals** — Pereira's business application: lean MVPs, single websites instead of brand-split sites, canonical links instead of country-domain duplication
- **Pairs with Hanlon's Razor** — both prefer simpler explanations; Hanlon's applies parsimony specifically to attributions of intent
- **Aristotelian root** — "the demonstration that comes from fewer postulates or hypotheses is better" (Pereira p. 52)
- **Has a corrective sibling — Hickam's Dictum** — for complex situations with many interacting causes, oversimplification is its own failure mode

## When to use

- Diagnostic situations (technical bugs, system failures, business performance issues) where competing explanations exist
- Product design — when a feature could be implemented two ways, prefer the one with fewer dependencies
- MVP scoping — strip to the simplest version that validates the hypothesis
- Strategic proposal evaluation — prefer the strategy requiring fewer favorable assumptions
- Communicating to customers, investors, or teams — fewer assumptions ≠ fewer details, but clearer logic
- Diagnosing failures in scaling, expansion, or marketing

## When NOT to use

- Genuinely complex systems with multiple interacting causes (use Hickam's Dictum instead)
- When the "simple" explanation only looks simple because you're ignoring inconvenient facts (Occam's Broom — Pereira p. 56)
- Medical, scientific, or engineering diagnosis where multiple confounding factors are normal
- When parsimony is being used to dismiss valid complexity for political or comfort reasons

## Common pitfalls

- **Confusing simplicity with familiarity** — preferring the explanation that feels easiest, not the one with fewest assumptions
- **Occam's Broom** (Pereira p. 56) — sweeping inconvenient facts under the rug to keep the simple explanation alive; a form of confirmation bias
- **Skipping evidence** — using the razor to avoid investigation
- **Over-application to complex systems** — when many factors genuinely contribute, the simple explanation is wrong
- **Ignoring Hickam's Dictum** — Pereira p. 57: "Occam's Razor speeds up the process of making decisions, [but] since the outcome could have a bigger effect, it's important to weigh Occam's Razor against Hickam's Dictum"

## Key metrics

- **Number of assumptions** — count the unproved premises each explanation requires
- **Number of dependencies** — for design decisions, count the moving parts each option introduces
- **Reversibility** — simpler options often have fewer one-way doors

## Decision questions

- Which explanation requires the fewest unproved assumptions?
- Am I preferring the "simple" answer because it's actually parsimonious, or because it's comforting?
- Have I swept any inconvenient facts under the rug to keep the simple explanation alive?
- Is this a domain where multiple causes genuinely interact (Hickam's Dictum) rather than a single-cause situation?
- What's the simpler version of this proposal that still solves the actual problem?

## Canonical examples

- **McDonald's "Would you like fries with that?" (Pereira p. 53)** — marketers chose the simplest mechanism to grow per-customer revenue out of probably many considered options; potatoes are cheap, fries are profitable, the prompt is universal
- **Apple iPhone / iPad design (Pereira p. 53)** — single-button smartphones and tablets stripped to a sleek, simple product without extra features; removing the headphone jack was an oversimplification debate, but the broader pattern is parsimony
- **Pereira's "too many websites" example (p. 54)** — businesses that run separate sites for each brand or for B2B vs B2C spread limited marketing resources thin; the parsimonious alternative is one website with a password-protected B2B section
- **Lean MVP (Pereira p. 54–55)** — simpler MVPs are cheaper, lower-risk, faster to market; complexity should be added only when the customer evaluation justifies each feature
- **International expansion (Pereira p. 55)** — instead of duplicating sites on country domains (.fr, .es), use canonical link elements on the main site — cheaper, more effective, better SEO
- **Aristotle and Grosseteste** — the philosophical roots; "if one thing were shown to be true from a lot of known premises and another from a small number of equally known premises, the latter is better" (Pereira p. 52)

## Related concepts

- [[Hanlon's Razor]] — _see_also_ (both prefer the simpler explanation; Hanlon's applies parsimony to questions of intent)
- [[First Principles Thinking]] — _see_also_ (first principles often converge on parsimonious solutions, but not always)
- [[Hickam's Dictum]] — _contrasts_with_ (Hickam's: when situations are genuinely multi-causal, oversimplification fails. Pereira p. 57)
- [[Occam's Broom]] — _contrasts_with_ (the failure mode where inconvenient facts are hidden to preserve the simple explanation)
- [[Confirmation Bias]] — _see_also_ (Occam's Broom is confirmation bias dressed up as parsimony)

## Sources

- [[_Sources/Super_Guide_Mental_Models-omnxhn]] — pages 51–57 (definition, history with Ockham/Aristotle/Grosseteste, McDonald's and Apple examples, business applications: websites, proposals, international expansion, contrasts with Hanlon's Razor, Occam's Broom, and Hickam's Dictum)
