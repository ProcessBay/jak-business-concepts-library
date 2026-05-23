# JAK Business Concepts Library

A grounded chatbot over a curated wiki of 57 business concepts (business models, pricing, growth, metrics, platform economics, strategy), powered by Kimi (Moonshot) for synthesis.

Built as part of JAK OS by Jamal Khan.

---

## What it does

Ask a question — _"What is value-based pricing?"_, _"Compare freemium vs free trial"_, _"What business model for an ice cream shop?"_ — and the bot:

1. Detects the intent (definition / comparison / advice / list).
2. Searches the wiki with synonym expansion and aliases (so "PLG", "Pirate Metrics", "WTP" all map to canonical atoms).
3. Sends the top 3-4 matching atoms to Kimi as grounded context.
4. Kimi writes a detailed, structured answer (~500-900 words) strictly grounded in those excerpts — no hallucinated examples, no facts outside the wiki.
5. Shows the raw source atoms in a collapsible expander, plus clickable buttons to jump to related concepts.

---

## Run locally

```bash
cd ~/jak-vault/bot
./start.sh
```

Open http://localhost:8501.

The first time, copy `.env.example` to `.env` and fill in your Kimi API key.

---

## Deploy to Streamlit Cloud

The repo is self-contained — `app.py` reads from `./wiki/` when deployed. To deploy:

1. **Push this directory to a GitHub repo** (private is fine).
2. Go to https://share.streamlit.io and connect the repo.
3. Set the main file to `app.py`.
4. In **Settings → Secrets**, paste your config (template at `.streamlit/secrets.toml.example`):
   ```toml
   KIMI_API_KEY = "sk-..."
   KIMI_BASE_URL = "https://api.moonshot.ai/v1"
   KIMI_MODEL = "moonshot-v1-auto"
   SESSION_AI_LIMIT = "15"
   ```
5. Deploy.

---

## Cost controls

The bot has two safeguards baked in for public deployments:

- **`SESSION_AI_LIMIT`** — per-browser-session cap on AI synthesis calls (default 15). After the cap, the bot falls back to local search for that session. Reset on refresh.
- **`DISABLE_AI`** — emergency kill switch. Set to `1` in Streamlit secrets to force local-only mode without redeploying.

Set `SESSION_AI_LIMIT = "0"` to disable the cap entirely.

---

## Updating the wiki

The Obsidian vault at `~/jak-vault/wiki/` is the source of truth. To push wiki edits to the deployed bot:

```bash
rsync -a --delete ~/jak-vault/wiki/ ~/jak-vault/bot/wiki/
cd ~/jak-vault/bot
git add wiki/
git commit -m "Sync wiki"
git push
```

Streamlit Cloud auto-redeploys on push.

---

## Architecture

| File | Purpose |
|---|---|
| `app.py` | Main Streamlit app — loader, search, intent detection, Kimi client, UI |
| `wiki/` | Knowledge base — 57 markdown atoms across 6 categories + sources/ |
| `requirements.txt` | Single dep: streamlit |
| `.streamlit/config.toml` | Dark theme defaults |
| `.streamlit/secrets.toml.example` | Template for Streamlit Cloud secrets |
| `.env.example` | Template for local `.env` |
| `start.sh` | Local launcher — frees port 8501, runs streamlit |

---

## Kimi setup gotcha (important)

Kimi has two endpoints: `api.moonshot.cn` (China) and `api.moonshot.ai` (international). International keys are rejected with `401 Invalid Authentication` on the `.cn` endpoint. Always use `https://api.moonshot.ai/v1` unless you specifically have a China-region key.

Working models: `moonshot-v1-auto` (recommended for synthesis), `moonshot-v1-32k`, `kimi-k2.6` (reasoning model, needs higher `max_tokens`).
