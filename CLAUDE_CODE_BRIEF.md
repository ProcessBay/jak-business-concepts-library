# Claude Code Brief: Fix JAK Wiki Bot

## Problem Statement

The JAK Business Concepts Library bot at `~/jak-vault/bot/app.py` is running but returns unhelpful responses. User reports "still not working" after multiple iterations.

**Bot URL:** http://localhost:8501

## Current State

| Component | Status |
|---|---|
| Wiki atoms | 57 notes loaded correctly |
| Bot process | Running on port 8501 |
| app.py syntax | Valid Python |
| Kimi API key | Present but returns 401 (invalid) |
| Streamlit | Working |

## Root Cause Analysis

1. **Search algorithm is too literal** — "ice cream business model" finds atoms with "business" and "model" but not relevant ones like "Direct-to-Consumer" or "Subscription"
2. **No synonym expansion** — "growth strategies" doesn't match "Growth Hacking" or "Viral Growth Loops"
3. **Response formatting is poor** — raw text dumps instead of structured, readable answers
4. **No query intent detection** — doesn't distinguish "what is X" vs "compare X and Y" vs "advice for my situation"
5. **Kimi API key is invalid** — 401 errors, so AI synthesis is broken

## Requirements

### Functional Requirements

1. **Smart Search**
   - Expand queries with synonyms (e.g., "ice cream" → "food", "retail", "DTC", "consumer")
   - Match across title, content, tags, AND category
   - Handle multi-word queries properly
   - Return ranked results with relevance scores

2. **Intent Detection**
   - `DEFINITION`: "What is X?" → Return atom definition + key attributes
   - `COMPARISON`: "X vs Y" or "Compare X and Y" → Find both atoms, show differences
   - `ADVICE`: "Should I...?" or "What business model for...?" → Match situation to relevant frameworks
   - `LIST`: "What are the types of...?" → List atoms in category
   - `GREETING`: "Hi", "Hello" → Welcome message

3. **Beautiful Responses**
   - Use markdown formatting (headers, bullets, bold)
   - Extract structured sections from atoms (Definition, When to use, Examples)
   - Show related concepts at bottom
   - Never dump raw text walls

4. **No External API Dependency**
   - Build pure local intelligence using the 57 wiki atoms
   - Do NOT require API keys to function
   - If user later adds a valid OpenAI/Anthropic key, optionally enhance with AI

### Technical Requirements

- Single file: `~/jak-vault/bot/app.py`
- Framework: Streamlit
- Python 3.9+ compatible
- No external dependencies beyond `streamlit`
- Loads atoms from `~/jak-vault/wiki/` (absolute path)

## Wiki Atom Structure

Each atom is a markdown file with YAML frontmatter:

```yaml
---
type: atom
title: Value-Based Pricing
category: pricing
tags: [pricing, saas, strategy]
sources: [Pricing_Strategies_for_SaaS_Pereira_2022]
source_pages: 44-53
---

## Definition
Value-based pricing is...

## Key Attributes
- Attribute 1
- Attribute 2

## When to Use
...

## When NOT to Use
...

## Common Pitfalls
...

## Decision Questions
1. Question one?
2. Question two?

## Canonical Examples
- **Example**: Description (Source, p.XX)

## Related Concepts
- [[Other Atom]]
- [[Another Atom]]
```

## Data Available

57 atoms across 6 categories:
- `business-models/` (7 atoms)
- `growth/` (9 atoms)
- `metrics/` (7 atoms)
- `platform-economics/` (14 atoms)
- `pricing/` (9 atoms)
- `strategy/` (11 atoms)

Plus source notes in `wiki/sources/` (19 sources).

## Deliverables

1. **Rewrite `~/jak-vault/bot/app.py`** from scratch if needed
2. **Test these exact queries** and verify good responses:
   - `"hi"` → Welcome with topic menu
   - `"What is value-based pricing?"` → Clear definition + when to use
   - `"Compare freemium vs free trial"` → Both concepts compared
   - `"What business model for an ice cream shop?"` → Relevant models (DTC, subscription, scalable)
   - `"growth strategies"` → List of growth frameworks
   - `"SaaS metrics"` → Key metrics for SaaS
   - `"What are network effects?"` → Definition with examples

3. **Update `~/jak-vault/bot/start.sh`** to launch cleanly
4. **Verify**: After `cd ~/jak-vault/bot && ./start.sh`, opening http://localhost:8501 shows a working bot

## Success Criteria

- [ ] All 7 test queries return useful, structured responses
- [ ] Responses are formatted with markdown (headers, bullets, bold)
- [ ] No API key required
- [ ] Sidebar shows correct atom count (57)
- [ ] Bot restarts cleanly with `./start.sh`

## Notes

- The Kimi API key in `.env` is INVALID (401). Do not rely on it.
- Focus on making the local search + response generation excellent.
- The user wants a tool they can actually use, not a prototype.
