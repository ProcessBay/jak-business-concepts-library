---
type: atom
title: Gambler's Fallacy
aliases: [Monte Carlo Fallacy, Fallacy of the Maturity of Chances, Negative Recency Effect]
category: anti_pattern
applicable_to: [decision_making, investing, risk_assessment, forecasting, sports_analytics]
key_metrics: []
related:
  - "see_also: Hot Hand Fallacy"
  - "see_also: Availability Heuristic"
  - "see_also: Confirmation Bias"
sources: [_Sources/Cognitive_Biases-uphx4y]
source_pages: "44-53"
tags: [cognitive_bias, anti_pattern, probability, statistics, decision_making]
created: 2026-06-16
---

# Gambler's Fallacy

## Definition

The Gambler's Fallacy is the mistaken belief that past random events influence the probability of future independent random events — that a coin which has landed heads ten times is "due" for tails, or that a stock that has fallen for weeks is "due" to rebound. Pereira locates the bias in the human drive to detect patterns and impose order on randomness, and in the misapplication of the Law of Large Numbers: long-run frequencies do converge to expected probabilities, but the next individual trial doesn't "self-correct" toward the average.

## Key attributes

- **Misperceived dependence between independent events** — past outcomes don't affect a fair coin's next flip
- **Driven by pattern-seeking** — the brain insists on finding order in randomness
- **Misapplied Law of Large Numbers** — long-run convergence misread as short-run self-correction
- **Closely linked to the representativeness heuristic** — a streak doesn't "look like" randomness, so we predict reversal
- **Inverted twin is the Hot Hand Fallacy** — same mechanism, opposite prediction (continuation rather than reversal)
- **Amplified by cultural beliefs in luck, fate, ritual**
- **Cross-domain** — gambling, investing, sports, hiring streaks, sales pipelines

## When you're most at risk

- You're observing a streak (winning, losing, hot, cold) and looking for the next move
- The underlying process is genuinely random or close to it
- You're emotionally invested (chasing losses, riding wins)
- The domain has noisy feedback and rare events
- You're trying to time something (markets, sales cycles, hiring waves)
- Cultural framing emphasizes "luck balancing out"

## When it's NOT a problem

- The events genuinely ARE dependent (not random) — a deck of cards without replacement; a hot manufacturing line with autocorrelated defects
- Mean reversion is real in the underlying process (some financial regimes do show short-term reversal)
- You're explicitly modeling probability and the math accounts for known dependence
- The "streak" reflects a real causal change (a new policy, a new competitor) that warrants updating

## Common manifestations in business

- **Investing**: assuming a falling stock is "due to bounce"; doubling down on losers (Pereira p.46)
- **Trading**: betting against streaks under the false assumption of mean reversion in genuinely random walks
- **Sales forecasting**: assuming a slow quarter "must" be followed by a strong one
- **Hiring after a bad streak**: assuming the next candidate must be better (no, the base rate is unchanged)
- **Product launches**: assuming after three flops the next must hit
- **Gambling and risk-taking generally**: chasing losses (p.49)
- **Sports analytics**: belief in "due" performance for cold players or teams (p.45)
- **Roulette / casino bets**: doubling down on black after a black streak (p.45)

## Indicators you're falling into it

- Your decision rests on what's "due" rather than on a model of the underlying process
- You're betting on reversal of a streak without a causal hypothesis for why it would reverse
- You're chasing losses with bigger bets
- You can't articulate why the next event is dependent on past events
- Your emotional state (frustration with losses, excitement at wins) is driving sizing
- The decision feels obvious because of recent runs rather than because of analysis

## Countermeasures

- **Understand independence** — internalize that for genuinely independent events, history does not change the next probability (Pereira p.50)
- **Embrace the Law of Large Numbers** — short-term deviations are normal and don't self-correct (p.51)
- **Establish decision criteria in advance** — pre-set stop-losses, position-size rules, bet limits
- **Distinguish independent from dependent processes** — verify the assumption of independence before applying mean-reversion thinking
- **Emotional regulation** — recognize that streak responses are emotional, not analytical
- **Decision journal** — track whether streak-based decisions actually performed
- **Seek expert input on probability** — statisticians, quants, anyone who'll do the math
- **Recognize cultural / superstitious framings** — "due", "luck balancing", "the streak must end"

## Canonical examples

- **Monte Carlo Casino, 1913** — roulette ball landed black 26 times in a row; gamblers lost fortunes betting on red (origin of "Monte Carlo Fallacy")
- **Stock-picking based on consecutive down-days** — no statistical edge
- **Lottery number selection** — "this number hasn't come up in months, so it's due"
- **Sports betting against losing streaks** — bookmakers profit from this consistently
- **Investors averaging down into a falling stock** based on intuitive mean-reversion (p.46)
- **Hiring after a bad-hire streak** — assuming you'll "course-correct" by chance
- **Founders pivoting because the last quarter was bad** — without analyzing the actual cause
- **Sports fans believing in "due" wins for losing teams** (p.45)

## Related concepts

- [[Hot Hand Fallacy]] — _see_also_ (mirror image — continuation rather than reversal)
- [[Availability Heuristic]] — _see_also_ (recent runs are highly available)
- [[Confirmation Bias]] — _see_also_ (once you bet "due", you seek confirming next outcomes)
- [[Recency Bias]] — _see_also_ (over-weights recent streaks)
- [[Overconfidence Effect]] — _amplifies_ (false confidence in pattern detection)

## Sources

- [[_Sources/Cognitive_Biases-uphx4y]] — pages 44-53 (mechanism, probability foundations, hot hand comparison, avoidance)
