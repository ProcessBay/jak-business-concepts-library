"""JAK Business Concepts Library — local Streamlit bot.

Local-first search + optional Kimi synthesis on top.

Features:
  - synonym + phrase expansion
  - intent detection (greeting / definition / comparison / advice / list / general)
  - structured markdown responses with clickable related-concept buttons
  - sidebar atom browser
  - optional AI synthesis via Kimi (Moonshot) — falls back gracefully on failure
"""

from __future__ import annotations

import json
import os
import re
import time
import urllib.request
import urllib.error
from pathlib import Path

import streamlit as st

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _resolve_wiki_path() -> Path:
    """Resolve the wiki location across local dev and deployed environments.

    Search order:
      1. WIKI_PATH env var (escape hatch / Streamlit Cloud override)
      2. Sibling directory: <bot>/../wiki  — local dev (Obsidian vault is source of truth)
      3. In-repo copy: <bot>/wiki         — deployed (Streamlit Cloud)
    """
    here = Path(__file__).resolve().parent
    candidates = [
        os.environ.get("WIKI_PATH"),
        str(here.parent / "wiki"),
        str(here / "wiki"),
    ]
    for c in candidates:
        if c and Path(c).is_dir():
            return Path(c)
    # Last-ditch fallback: in-repo copy even if missing (will yield 0 atoms with a clear sidebar warning)
    return here / "wiki"


WIKI_PATH = _resolve_wiki_path()
SOURCES_COUNT = 19

# Load .env if present (lightweight — no python-dotenv dependency)
ENV_PATH = Path(__file__).resolve().parent / ".env"
if ENV_PATH.exists():
    for raw in ENV_PATH.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        # Don't overwrite env already set in the shell
        os.environ.setdefault(k, v)


def _secret(key: str, default: str = "") -> str:
    """Read a config value, checking Streamlit Cloud secrets first, then env."""
    try:
        # st.secrets exists on Streamlit Cloud / when a secrets.toml is configured.
        # Accessing a missing key raises; we guard for both shapes.
        if key in st.secrets:
            return str(st.secrets[key]).strip()
    except Exception:
        pass
    return os.environ.get(key, default).strip()


KIMI_API_KEY = _secret("KIMI_API_KEY", "")
KIMI_BASE_URL = _secret("KIMI_BASE_URL", "https://api.moonshot.ai/v1").rstrip("/")
KIMI_MODEL = _secret("KIMI_MODEL", "moonshot-v1-auto")

# Per-browser-session safety cap on AI calls — bounds cost exposure on public deploys.
# Override via SESSION_AI_LIMIT secret/env (set to 0 to disable the cap).
try:
    SESSION_AI_LIMIT = int(_secret("SESSION_AI_LIMIT", "15") or "15")
except ValueError:
    SESSION_AI_LIMIT = 15

# Master AI kill switch — set DISABLE_AI=1 in Streamlit secrets to force local-only mode
# without redeploying. Useful if costs spike or you spot abuse.
AI_DISABLED = _secret("DISABLE_AI", "").lower() in ("1", "true", "yes")


# ---------------------------------------------------------------------------
# Kimi client (urllib — no extra deps)
# ---------------------------------------------------------------------------


class KimiError(Exception):
    pass


def kimi_chat(messages: list, *, model: str = None, max_tokens: int = 400,
              temperature: float = 0.3, timeout: int = 30) -> str:
    """Call Kimi /chat/completions and return the assistant content.

    Raises KimiError with a human-readable diagnostic on any failure.
    """
    if not KIMI_API_KEY:
        raise KimiError("KIMI_API_KEY is not set in environment or .env file.")

    body = json.dumps({
        "model": model or KIMI_MODEL,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{KIMI_BASE_URL}/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {KIMI_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        try:
            err_body = json.loads(e.read().decode("utf-8"))
            msg = err_body.get("error", {}).get("message", str(e))
            etype = err_body.get("error", {}).get("type", "")
        except Exception:
            msg, etype = str(e), ""
        if e.code == 401:
            raise KimiError(
                f"401 Invalid Authentication. Check KIMI_API_KEY. "
                f"Note: the .cn endpoint rejects international keys — "
                f"set KIMI_BASE_URL=https://api.moonshot.ai/v1. Detail: {msg}"
            )
        if e.code == 404 and "model" in msg.lower():
            raise KimiError(
                f"Model `{model or KIMI_MODEL}` not available on this account. "
                f"Try KIMI_MODEL=moonshot-v1-auto. Detail: {msg}"
            )
        raise KimiError(f"HTTP {e.code} ({etype}): {msg}")
    except urllib.error.URLError as e:
        raise KimiError(f"Network error reaching {KIMI_BASE_URL}: {e.reason}")
    except Exception as e:
        raise KimiError(f"Unexpected error: {e}")

    try:
        return payload["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError) as e:
        raise KimiError(f"Unexpected response shape: {payload!r}")


@st.cache_data(show_spinner=False, ttl=300)
def kimi_status() -> dict:
    """Probe Kimi once at startup so the sidebar can show health."""
    if not KIMI_API_KEY:
        return {"ok": False, "reason": "no key", "model": KIMI_MODEL}
    try:
        kimi_chat(
            [{"role": "user", "content": "Reply with: OK"}],
            max_tokens=8, temperature=0.0, timeout=10,
        )
        return {"ok": True, "model": KIMI_MODEL, "endpoint": KIMI_BASE_URL}
    except KimiError as e:
        return {"ok": False, "reason": str(e), "model": KIMI_MODEL}

# ---------------------------------------------------------------------------
# Page + styles
# ---------------------------------------------------------------------------

st.set_page_config(
    page_title="JAK Business Concepts Library",
    page_icon=None,
    layout="wide",
    initial_sidebar_state="expanded",
)

# shadcn-inspired minimalistic dark theme
# - Neutral zinc palette (no purples/blues as accents)
# - Tight typography hierarchy: h1 1.5rem, h2 1.15rem, h3 1rem, body 0.95rem
# - 1px borders, subtle radii, generous whitespace
# - Single accent: zinc-50 for foreground, zinc-400 for muted
st.markdown(
    """
<style>
    /* font stack */
    html, body, [class*="css"]  {
        font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    /* canvas */
    .stApp { background-color: #09090b; }                  /* zinc-950 */
    [data-testid="stSidebar"] { background-color: #0a0a0c; border-right: 1px solid #1f1f23; }
    [data-testid="stSidebar"] .stMarkdown p,
    [data-testid="stSidebar"] .stMarkdown li { color: #d4d4d8; }

    /* global text */
    .stMarkdown, .stMarkdown p, .stMarkdown li, .stChatMessage p, .stChatMessage li {
        color: #e4e4e7;                                     /* zinc-200 */
        font-size: 0.95rem;
        line-height: 1.65;
        letter-spacing: 0.005em;
    }

    /* tight typography hierarchy — much less delta between header and body */
    h1, .stMarkdown h1 {
        color: #fafafa !important;                          /* zinc-50 */
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        letter-spacing: -0.015em;
        margin: 0.5rem 0 0.25rem 0 !important;
        line-height: 1.3 !important;
    }
    h2, .stMarkdown h2, .stChatMessage h2 {
        color: #fafafa !important;
        font-size: 1.15rem !important;
        font-weight: 600 !important;
        letter-spacing: -0.01em;
        margin: 1.25rem 0 0.5rem 0 !important;
        line-height: 1.4 !important;
        padding-bottom: 0.25rem;
        border-bottom: 1px solid #1f1f23;
    }
    h3, .stMarkdown h3, .stChatMessage h3 {
        color: #fafafa !important;
        font-size: 1rem !important;
        font-weight: 600 !important;
        margin: 1rem 0 0.4rem 0 !important;
        line-height: 1.4 !important;
    }

    strong { color: #fafafa; font-weight: 600; }
    em { color: #a1a1aa; font-style: italic; }              /* zinc-400 */
    code { color: #fafafa; background: #18181b; padding: 1px 6px; border-radius: 4px; font-size: 0.85em; }

    /* chat bubbles — minimal cards */
    .stChatMessage {
        background-color: #0c0c0f !important;
        border: 1px solid #1f1f23;
        border-radius: 8px;
        padding: 18px 22px;
        margin: 6px 0;
        box-shadow: none;
    }

    /* tables */
    .stMarkdown table {
        border-collapse: collapse;
        font-size: 0.9rem;
        margin: 0.75rem 0;
    }
    .stMarkdown th, .stMarkdown td {
        border: 1px solid #27272a;
        padding: 8px 12px;
        text-align: left;
    }
    .stMarkdown th { background: #18181b; color: #fafafa; font-weight: 600; }

    /* blockquotes */
    .stMarkdown blockquote {
        border-left: 2px solid #3f3f46;
        padding: 0.25rem 0 0.25rem 1rem;
        color: #a1a1aa;
        margin: 0.5rem 0;
        font-style: normal;
    }

    /* buttons — neutral, tight */
    .stButton button {
        background-color: #18181b;                          /* zinc-900 */
        color: #e4e4e7;
        border: 1px solid #27272a;                          /* zinc-800 */
        border-radius: 6px;
        padding: 7px 12px;
        font-size: 0.85rem;
        font-weight: 500;
        text-align: left;
        transition: all 0.12s ease;
        box-shadow: none;
    }
    .stButton button:hover {
        background-color: #27272a;
        border-color: #3f3f46;
        color: #fafafa;
    }
    .stButton button:focus { box-shadow: none !important; outline: none; }

    /* expanders */
    .streamlit-expanderHeader {
        background-color: transparent !important;
        border: 1px solid #1f1f23 !important;
        border-radius: 6px !important;
        color: #a1a1aa !important;
        font-size: 0.85rem !important;
        font-weight: 500 !important;
    }

    /* chat input */
    [data-testid="stChatInput"] {
        border: 1px solid #27272a;
        border-radius: 8px;
        background: #0c0c0f;
    }
    [data-testid="stChatInput"] textarea { color: #fafafa !important; }

    /* metrics in sidebar */
    [data-testid="stMetricValue"] { color: #fafafa; font-size: 1.5rem; font-weight: 600; }
    [data-testid="stMetricLabel"] { color: #71717a; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }

    /* horizontal rules */
    hr { border: none; border-top: 1px solid #1f1f23; margin: 1rem 0; }

    /* page header — top of app */
    .app-title {
        color: #fafafa;
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: -0.015em;
        margin: 0;
    }
    .app-subtitle {
        color: #71717a;
        font-size: 0.875rem;
        margin: 0.25rem 0 0 0;
        font-weight: 400;
    }
    .badge {
        display: inline-block;
        background: #18181b;
        color: #a1a1aa;
        border: 1px solid #27272a;
        padding: 2px 10px;
        border-radius: 4px;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.02em;
        text-transform: uppercase;
    }
    .badge-active {
        background: #fafafa;
        color: #09090b;
        border-color: #fafafa;
    }
    .section-eyebrow {
        color: #71717a;
        font-size: 0.7rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 500;
        margin: 1rem 0 0.5rem 0;
    }
</style>
""",
    unsafe_allow_html=True,
)

# ---------------------------------------------------------------------------
# Constants — section labels + synonym maps
# ---------------------------------------------------------------------------

SECTION_KEYS = (
    "definition",
    "key attributes",
    "when to use",
    "when not to use",
    "common pitfalls",
    "key metrics",
    "decision questions",
    "canonical examples",
    "examples",
    "related concepts",
    "sources",
)

# Multi-word phrases mapped to expansion terms (space-separated).
PHRASE_SYNONYMS = {
    "ice cream": "food retail consumer dtc physical shop subscription scalable",
    "ice cream shop": "food retail consumer dtc physical subscription scalable land expand",
    "ice cream business": "food retail consumer dtc subscription scalable",
    "restaurant": "food retail consumer service scalable",
    "coffee shop": "food retail consumer dtc subscription",
    "food business": "retail consumer dtc subscription scalable",
    "retail business": "consumer dtc subscription scalable",
    "ecommerce": "dtc retail consumer subscription",
    "small business": "scalable retail consumer",
    "consumer goods": "dtc retail consumer",
    "physical product": "dtc retail consumer scalable",
    "free trial": "freemium trial free conversion",
    "freemium model": "freemium business model",
    "network effect": "network platform two-sided critical mass indirect direct",
    "network effects": "network platform two-sided critical mass indirect direct",
    "saas metric": "cac ltv mrr churn arr retention conversion",
    "saas metrics": "cac ltv mrr churn arr retention conversion lifetime acquisition",
    "saas business": "subscription recurring software cloud",
    "growth strategy": "gtm go-to-market aarrr viral referral product-led sales-led distribution",
    "growth strategies": "gtm go-to-market aarrr viral referral product-led sales-led distribution influencer",
    "growth tactics": "gtm aarrr viral referral product-led",
    "growth hacking": "viral referral aarrr kpi growth",
    "business model": "monetization freemium subscription scalable land expand",
    "business models": "monetization freemium subscription scalable land expand",
    "pricing strategy": "pricing value-based tiered usage-based monetization saas",
    "pricing strategies": "pricing value-based tiered usage-based monetization saas",
    "competitive analysis": "competition porters competitive positioning",
    "go to market": "gtm distribution sales-led product-led",
    "two sided": "two-sided platform marketplace network",
    "product led": "product-led freemium gtm",
    "value proposition": "value usp positioning",
}

WORD_SYNONYMS = {
    # tech / business types
    "saas": "software subscription cloud b2b recurring",
    "b2b": "saas enterprise business",
    "b2c": "consumer retail",
    "app": "software mobile consumer",
    "mobile": "app consumer",
    "startup": "scalable growth gtm",
    "marketplace": "platform two-sided network",
    "platform": "marketplace network two-sided",
    "enterprise": "b2b saas",
    "ai": "software app startup",
    # concepts
    "price": "pricing monetization value-based",
    "pricing": "monetization value-based freemium",
    "monetize": "pricing monetization",
    "monetization": "pricing revenue",
    "cost": "cac acquisition",
    "revenue": "mrr arr monetization",
    "subscription": "recurring mrr saas",
    "recurring": "subscription mrr arr",
    "churn": "retention attrition",
    "retention": "churn engagement lifetime",
    "growth": "scale acquisition gtm viral referral",
    "scale": "growth scalable scalability",
    "scaling": "scale scalable",
    "metric": "kpi measure analytics",
    "metrics": "kpi measure analytics",
    "kpi": "metric measure",
    "viral": "referral growth loops",
    "referral": "viral loops word-of-mouth",
    "partnership": "alliance strategic partner",
    "partner": "partnership alliance",
    "strategy": "strategic positioning competitive",
    "competition": "competitive porters strategy",
    "competitor": "competitive porters",
    "positioning": "perceptual strategy competitive value",
    # retail-y
    "food": "retail consumer restaurant",
    "retail": "consumer dtc shop store",
    "consumer": "retail dtc b2c",
    "shop": "retail store consumer dtc",
    "store": "retail shop consumer",
    "physical": "retail consumer dtc",
    "restaurant": "food retail consumer",
    "dtc": "consumer retail direct",
    # outcomes
    "acquire": "acquisition cac",
    "acquisition": "cac acquire customer",
}

STOP_WORDS = {
    "a", "an", "the", "and", "or", "of", "for", "in", "on", "at", "to", "is", "are",
    "what", "how", "why", "when", "where", "who", "which", "should", "can", "do", "does",
    "i", "we", "you", "me", "my", "our", "your", "us", "about", "tell", "explain",
    "describe", "define", "whats", "thats", "s", "t", "d", "m", "ll", "re", "ve",
    "them", "they", "it", "be", "with", "have", "has", "had", "this", "that", "these",
    "those", "will", "would", "could", "use", "using", "compare", "comparing", "versus",
    "vs", "between", "any", "some", "all", "good", "best", "worst", "give", "show",
    "list", "kinds", "types", "examples", "example",
}

GREETINGS = {
    "hi", "hello", "hey", "yo", "sup", "hola", "help", "start", "menu",
    "hi there", "hey there", "hello there", "good morning", "good evening",
}


def format_category(cat: str) -> str:
    return cat.replace("-", " ").replace("_", " ").title()


# ---------------------------------------------------------------------------
# Wiki loader
# ---------------------------------------------------------------------------


def parse_frontmatter(content: str):
    """Lightweight YAML frontmatter parser. Returns (dict, body)."""
    if not content.startswith("---"):
        return {}, content
    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content
    fm_text = parts[1]
    body = parts[2].strip()

    fm = {}
    current_key = None
    for raw in fm_text.split("\n"):
        line = raw.rstrip()
        if not line.strip():
            continue
        # list item under previous key
        m = re.match(r"^\s+-\s+(.+)$", line)
        if m and current_key is not None:
            val = m.group(1).strip().strip('"').strip("'")
            val = re.sub(r"\[\[(.+?)\]\]", r"\1", val)
            if not isinstance(fm.get(current_key), list):
                fm[current_key] = []
            fm[current_key].append(val)
            continue
        # key: value
        m = re.match(r"^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$", line)
        if m:
            key = m.group(1).strip()
            val = m.group(2).strip()
            if val == "":
                fm[key] = []
            elif val.startswith("[") and val.endswith("]"):
                items = [x.strip().strip('"').strip("'") for x in val[1:-1].split(",")]
                fm[key] = [x for x in items if x]
            else:
                fm[key] = val.strip('"').strip("'")
            current_key = key
    return fm, body


def parse_sections(body: str) -> dict:
    """Split body into named sections. Handle both `## Header` and `**Label:**` forms."""
    sections = {}
    current = None
    buf = []

    def flush():
        if current and buf:
            text = "\n".join(buf).strip()
            if text and current not in sections:
                sections[current] = text

    for line in body.split("\n"):
        # H2 header line
        m = re.match(r"^##\s+(.+?)\s*$", line)
        if m:
            flush()
            current = m.group(1).strip().lower()
            buf = []
            continue
        # H1 title line — terminate current
        if re.match(r"^#\s+", line):
            flush()
            current = None
            buf = []
            continue
        # Inline bold label (only at start of line, not list-item bolds)
        m = re.match(r"^\*\*([^*]+?):\*\*\s*(.*)$", line)
        if m:
            label = m.group(1).strip().lower()
            if any(label == k or label.startswith(k) for k in SECTION_KEYS):
                flush()
                current = label
                rest = m.group(2)
                buf = [rest] if rest.strip() else []
                continue
        buf.append(line)
    flush()
    return sections


@st.cache_data(show_spinner=False)
def load_wiki_atoms() -> dict:
    atoms = {}
    if not WIKI_PATH.exists():
        return atoms
    for md_file in WIKI_PATH.rglob("*.md"):
        if md_file.name.startswith("MOC_"):
            continue
        if md_file.parent.name == "sources":
            continue
        try:
            content = md_file.read_text(encoding="utf-8")
        except Exception:
            continue
        fm, body = parse_frontmatter(content)
        title = fm.get("title") or md_file.stem.replace("_", " ")
        if isinstance(title, list):
            title = title[0] if title else md_file.stem
        category = md_file.parent.name
        aliases = fm.get("aliases", [])
        if isinstance(aliases, str):
            aliases = [a.strip() for a in aliases.split(",") if a.strip()]
        tags_raw = fm.get("tags", [])
        if isinstance(tags_raw, str):
            tags = re.findall(r"[A-Za-z0-9_-]+", tags_raw)
        elif isinstance(tags_raw, list):
            tags = tags_raw
        else:
            tags = []

        atoms[title] = {
            "title": title,
            "content": body,
            "category": category,
            "path": str(md_file.relative_to(WIKI_PATH)),
            "tags": [t.lower() for t in tags],
            "aliases": [a.lower() for a in aliases],
            "sections": parse_sections(body),
        }
    return atoms


# ---------------------------------------------------------------------------
# Tokenization + query expansion + search
# ---------------------------------------------------------------------------


def tokenize(text: str) -> list:
    out = []
    for raw in re.findall(r"[A-Za-z][A-Za-z0-9'-]*", text.lower()):
        tok = raw.strip("-'")
        if len(tok) <= 1:
            continue
        if tok in STOP_WORDS:
            continue
        out.append(tok)
    return out


def expand_query(query: str):
    """Return (direct_tokens, syn_tokens) — sets of expanded tokens."""
    q = query.lower()
    direct = set(tokenize(q))
    syn = set()

    for phrase, expansion in PHRASE_SYNONYMS.items():
        if phrase in q:
            for t in tokenize(expansion):
                if t not in direct:
                    syn.add(t)

    for t in list(direct):
        if t in WORD_SYNONYMS:
            for s in tokenize(WORD_SYNONYMS[t]):
                if s not in direct:
                    syn.add(s)

    return direct, syn


def search_atoms(query: str, atoms: dict, top_k: int = 8):
    if not query.strip():
        return []

    q_lower = query.lower()
    q_phrase = re.sub(r"[^a-z0-9 -]+", " ", q_lower).strip()
    q_phrase = re.sub(r"\s+", " ", q_phrase)
    direct, syn = expand_query(query)
    if not direct and not syn:
        return []

    results = []
    for title, data in atoms.items():
        score = 0.0
        title_l = title.lower()
        content_l = data["content"].lower()
        category_l = data["category"].lower()
        title_tokens = set(tokenize(title))

        # Full-title substring (title is a substring of the query)
        if title_l in q_lower:
            score += 130
        # Query is substring of a longer title (e.g., "freemium" ⊂ "freemium business model")
        elif len(q_phrase) >= 4 and q_phrase in title_l:
            score += 70

        # Multi-word literal phrase boost — query phrase appears verbatim in body
        if " " in q_phrase and len(q_phrase) >= 6 and q_phrase in content_l:
            score += 45

        # Title token overlap
        score += len(title_tokens & direct) * 28
        score += len(title_tokens & syn) * 9

        # Canonical-concept boost: when a directly-matched concept word is in
        # the title AND the title carries a canonical noun (Model / Strategy /
        # Framework / Pricing), this is usually the foundational atom.
        canonical_nouns = {"model", "strategy", "framework", "pricing"}
        if title_tokens & direct and title_tokens & canonical_nouns:
            score += 18

        # Aliases
        for alias in data["aliases"]:
            if not alias:
                continue
            if alias in q_lower:
                score += 50
                continue
            atokens = set(tokenize(alias))
            if atokens & direct:
                score += 18

        # Tags
        for tag in data["tags"]:
            tag_l = tag.lower()
            if tag_l in direct:
                score += 14
            elif tag_l in syn:
                score += 5
            else:
                for t in direct:
                    if len(t) > 3 and (t in tag_l or tag_l in t):
                        score += 6
                        break

        # Category
        cat_tokens = set(tokenize(category_l.replace("-", " ")))
        if cat_tokens & direct:
            score += 18
        elif cat_tokens & syn:
            score += 7

        # Body keyword frequency
        for t in direct:
            if len(t) <= 2:
                continue
            count = content_l.count(t)
            if count:
                score += min(count, 12) * 1.5
        for t in syn:
            if len(t) <= 2:
                continue
            count = content_l.count(t)
            if count:
                score += min(count, 6) * 0.6

        if score > 0:
            results.append((score, title, data))

    results.sort(key=lambda x: x[0], reverse=True)
    return results[:top_k]


# ---------------------------------------------------------------------------
# Intent detection
# ---------------------------------------------------------------------------


def detect_intent(query: str) -> str:
    q = query.lower().strip().rstrip("?.!").strip()

    if not q:
        return "GREETING"
    if q in GREETINGS:
        return "GREETING"
    if len(q) <= 6 and any(q == g or q.startswith(g + " ") for g in ("hi", "hey", "yo", "sup")):
        return "GREETING"

    # COMPARISON
    if re.search(r"\bvs\.?\b|\bversus\b", q):
        return "COMPARISON"
    if q.startswith("compare ") or "difference between" in q:
        return "COMPARISON"

    # ADVICE — situational
    if re.search(
        r"\b(should i|should we|recommend|advice|how (do|should|would) (i|we|you))\b",
        q,
    ):
        return "ADVICE"
    if re.search(
        r"\bwhat\b[^?]{0,40}\b(model|strategy|approach|pricing|tactic)\b[^?]{0,40}\bfor\b",
        q,
    ):
        return "ADVICE"
    if re.search(r"\bfor (?:a|an|my|our)\s+\w+", q):
        return "ADVICE"

    # LIST — explicit
    if re.match(r"^(list|all|types of|kinds of|examples of|show me|give me)\b", q):
        return "LIST"
    if "frameworks" in q or "concepts" in q:
        return "LIST"

    # DEFINITION
    if re.match(r"^(what (is|are|does)|define|explain|describe|tell me about|whats|what's)\b", q):
        return "DEFINITION"

    # Short topic browse defaults to LIST
    if len(q.split()) <= 4:
        return "LIST"

    return "GENERAL"


# ---------------------------------------------------------------------------
# Response helpers
# ---------------------------------------------------------------------------


def truncate_md(text: str, max_chars: int = 600) -> str:
    if not text:
        return ""
    text = text.strip()
    if len(text) <= max_chars:
        return text
    cut = text[:max_chars]
    last_period = cut.rfind(". ")
    if last_period > max_chars - 250:
        return cut[: last_period + 1]
    return cut.rstrip() + "…"


def get_section(data: dict, *keys: str):
    sections = data.get("sections", {})
    for key in keys:
        if key in sections:
            return sections[key]
        for k, v in sections.items():
            if k.startswith(key):
                return v
    return None


def get_definition(data: dict) -> str:
    sec = get_section(data, "definition")
    if sec:
        return sec
    for para in data["content"].split("\n\n"):
        p = para.strip()
        if p and not p.startswith("#") and not p.startswith("**"):
            return p
        if p.startswith("**Definition"):
            cleaned = re.sub(r"^\*\*Definition:?\*\*\s*", "", p)
            return cleaned
    return ""


def first_sentence(text: str, fallback_chars: int = 200) -> str:
    if not text:
        return ""
    text = text.strip()
    m = re.search(r"^(.+?[.!?])(?:\s|$)", text)
    if m:
        return m.group(1).strip()
    return truncate_md(text, fallback_chars)


def _term_variants(term: str):
    t = term.lower().strip()
    variants = {t}
    if not t.endswith("s"):
        variants.add(t + "s")
    if t.endswith("s") and len(t) > 3:
        variants.add(t[:-1])
    return variants


def find_contrast_sentence(content: str, term_a: str, term_b: str):
    """Look for a sentence that contrasts the two terms (handles plurals)."""
    avs = _term_variants(term_a)
    bvs = _term_variants(term_b)
    sentences = re.split(r"(?<=[.!?])\s+", content.replace("\n", " "))
    # Prefer sentences mentioning both
    for s in sentences:
        sl = s.lower()
        if any(a in sl for a in avs) and any(b in sl for b in bvs) and len(s) < 450:
            return s.strip()
    # Fall back to contrast keywords plus either term
    for s in sentences:
        sl = s.lower()
        if any(k in sl for k in ("unlike ", "as opposed to", "in contrast", "whereas ", "rather than")):
            if any(a in sl for a in avs) or any(b in sl for b in bvs):
                return s.strip()
    return None


def extract_related_titles(data: dict, atoms: dict) -> list:
    """Pull [[Wiki Link]] titles from the Related Concepts section,
    keeping only those that exist as atoms in the library."""
    section = get_section(data, "related concepts", "related")
    if not section:
        return []
    found = re.findall(r"\[\[([^\]]+?)\]\]", section)
    # Strip pipe aliases like [[Title|alias]]
    titles = [t.split("|")[0].strip() for t in found]
    # Match against atom keys case-insensitively
    by_lower = {t.lower(): t for t in atoms}
    out = []
    seen = set()
    for t in titles:
        canonical = by_lower.get(t.lower())
        if canonical and canonical != data["title"] and canonical not in seen:
            seen.add(canonical)
            out.append(canonical)
    return out


def _atom_excerpt_for_prompt(data: dict) -> str:
    """Build a rich excerpt to send Kimi as grounded context for detailed synthesis.

    Sections are ordered by priority for synthesis quality: Definition,
    Examples (so Kimi has named instances), Key attributes, When-to-use,
    When-NOT-to-use, Common pitfalls. Per-section limits keep the per-atom
    excerpt around ~3000 chars; no outer truncation so high-priority sections
    are never dropped.
    """
    pieces = [f"# {data['title']}", f"Category: {data['category']}"]
    if data.get("aliases"):
        pieces.append("Aliases: " + ", ".join(data["aliases"]))

    defn = get_definition(data)
    if defn:
        pieces.append("\n## Definition\n" + truncate_md(defn, 900))

    # Examples come early so they can't be truncated off
    examples = get_section(data, "canonical examples", "examples")
    if examples:
        pieces.append("\n## Examples (the ONLY companies/products you may cite)\n" + truncate_md(examples, 600))

    attrs = get_section(data, "key attributes")
    if attrs:
        pieces.append("\n## Key attributes\n" + truncate_md(attrs, 600))

    when_use = get_section(data, "when to use")
    if when_use:
        pieces.append("\n## When to use\n" + truncate_md(when_use, 500))

    when_not = get_section(data, "when not to use")
    if when_not:
        pieces.append("\n## When NOT to use\n" + truncate_md(when_not, 400))

    pitfalls = get_section(data, "common pitfalls")
    if pitfalls:
        pieces.append("\n## Common pitfalls\n" + truncate_md(pitfalls, 400))

    return "\n".join(pieces)


INTENT_PROMPTS = {
    "DEFINITION": """Write a detailed, engaging answer in clean markdown.

Required structure:
- Open with ONE punchy line that hooks the reader — a sharp observation, a surprising framing, a tension, or a question. No header above it. Then in the same paragraph, give the actual definition in 1-2 sentences.
- One short paragraph on why this concept is interesting — the mechanic that makes it work, or the counter-intuitive part most people miss.
- `## How it actually works` — 4-6 bullets breaking down the core mechanics. Use vivid concrete language; show the mechanism, don't list traits.
- `## When to reach for it` — 3-5 concrete fit signals. Each should feel like a situation, not a checkbox.
- `## Where it goes wrong` — 2-3 bullets on how teams misuse it.
- `## In the wild` — only examples that appear by name in the wiki excerpts. One short line each, with the SPECIFIC mechanic each example illustrates. Omit this section entirely if the excerpts contain no examples.
- Close with **Bottom line —** followed by ONE sharp sentence that lands the takeaway.

Aim for ~500-800 words.""",

    "COMPARISON": """Write a vivid, structured comparison in clean markdown.

Required structure:
- Open with a hook: state what people THINK the difference is, then hint that the real difference is something else. 2-3 sentences. No header.
- `## [Term A]` — what it is, how it actually works, when it fits. 1 paragraph + 2-3 bullets.
- `## [Term B]` — same structure.
- `## Side-by-side` — a markdown table with 4-5 rows on dimensions that actually matter (time-bound, conversion path, who pays, risk, examples, etc.). Only cite examples that appear in the wiki excerpts; if only one side has examples in the wiki, write "—" for the other.
- `## How to choose` — 3-4 numbered "Choose X if … / Choose Y if …" rules. Make each one sound like a specific moment in a specific business.
- Close with **Bottom line —** followed by ONE sharp sentence.

Aim for ~600-900 words.""",

    "ADVICE": """Give vivid, situation-tailored advice in clean markdown.

Required structure:
- Open by playing back the user's situation in sharper language than they used (1-2 sentences, no header). Name the actual tension or constraint that matters most.
- `## What I'd reach for` — your top framework + 2-3 sentences of WHY it fits THIS situation, grounded in the wiki excerpts. Be specific.
- `## Worth considering` — 2-3 other relevant frameworks. For each: a one-paragraph "this becomes the right answer when…" rationale.
- `## Where this gets dangerous` — 3-4 specific risks tied to THIS situation, not generic warnings.
- `## What to do this week` — 3-5 concrete, sequenced actions. Each should be something the user can actually start doing on Monday.
- Close with **Bottom line —** followed by ONE sharp sentence.

Aim for ~500-800 words. Name frameworks. No generic advice.""",

    "LIST": """Survey the topic with energy in clean markdown.

Required structure:
- Open with a hook: what binds these concepts together, and what's the question they're collectively trying to answer? 2-3 sentences. No header.
- `## The frameworks` (or `## The metrics` — pick what fits) — for each concept: **Name** — one-sentence definition. Then a short follow-up sentence on what specifically it tells you or when you'd reach for it.
- `## How they stack` — one paragraph showing how these concepts feed each other, trade off, or build a chain.
- `## Where to start` — depending on the user's likely starting situation, which 1-2 to focus on first and why.
- Close with **Bottom line —** followed by ONE sharp sentence.

Aim for ~600-900 words.""",

    "GENERAL": """Write a detailed, engaging answer in clean markdown. Open with a sharp 2-3 sentence hook + direct answer (no header). Add 2-3 `##` supporting subsections drawn from the wiki excerpts. Close with **Bottom line —** followed by one sharp sentence. Aim for ~500-700 words.""",
}


def synthesize_with_ai(query: str, intent: str, top_atoms: list) -> tuple:
    """Return (synthesis_text or None, error_or_None).

    Generates a detailed, structured response grounded in the provided atoms.
    The system prompt forbids inventing facts beyond the excerpts.
    """
    if not KIMI_API_KEY or not top_atoms:
        return None, None

    # Bigger excerpts, more atoms — give the model rich grounding
    excerpts = "\n\n========================================\n\n".join(
        _atom_excerpt_for_prompt(data) for _, _, data in top_atoms[:4]
    )

    intent_instructions = INTENT_PROMPTS.get(intent, INTENT_PROMPTS["GENERAL"])

    system = (
        "You are JAK — a sharp, curious business strategy writer with the "
        "voice of a sparring partner, not a textbook. You take dry frameworks "
        "and make them land. Think Patrick O'Shaughnessy or Packy McCormick: "
        "clear, vivid, a little playful, never corporate, never hedging.\n\n"
        "VOICE RULES:\n"
        "- Open with a hook. A tension, a question, a counter-intuitive line — "
        "anything but 'X is a strategy that...'. Make the reader want sentence two.\n"
        "- Use concrete, vivid language. Show mechanics, don't list traits.\n"
        "- Short sentences punch. Mix them with longer ones.\n"
        "- Confident but not arrogant. Specific but not jargon-y.\n"
        "- No emojis. No exclamation marks. No 'fun fact:'. No 'In essence,'.\n\n"
        "ABSOLUTE GROUNDING RULES (a violation makes the answer wrong):\n"
        "1. Every factual claim, example, company name, statistic, and framework "
        "must come from the WIKI EXCERPTS below. If the excerpts don't contain a "
        "piece of information, do NOT fill in from general knowledge — either "
        "omit it, or write '(not covered in the library)'.\n"
        "2. Only cite companies/products that appear by name in the WIKI "
        "EXCERPTS. No pulling in well-known examples like Adobe, Salesforce, "
        "Netflix, etc. unless the excerpts mention them.\n"
        "3. Never echo prompt scaffolding in your output. Don't write things "
        "like 'A short paragraph on...' or 'Bold takeaway sentence:'. Just "
        "write the actual content.\n"
        "4. No preamble. No 'Great question', 'Based on the wiki', 'Sure'.\n"
        "5. Use proper markdown — `## H2` for sections, `**bold**` sparingly, "
        "bullet lists, markdown tables where the structure asks. Headers must "
        "start with `## `, never be bolded paragraphs."
    )

    user = (
        f"USER QUESTION: {query}\n\n"
        f"INTENT: {intent}\n\n"
        f"TASK INSTRUCTIONS:\n{intent_instructions}\n\n"
        f"WIKI EXCERPTS (the only knowledge you may use):\n\n{excerpts}"
    )

    try:
        text = kimi_chat(
            [
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            max_tokens=2200,
            temperature=0.55,
            timeout=60,
        )
        return text, None
    except KimiError as e:
        return None, str(e)


def find_contrast_anywhere(atoms: dict, term_a: str, term_b: str):
    """Search every atom for a sentence that mentions both terms together.

    Prefer atoms whose title contains either term — those are most likely
    to be the canonical home of the contrast.
    """
    avs = _term_variants(term_a)
    bvs = _term_variants(term_b)

    def title_relevance(title: str) -> int:
        tl = title.lower()
        return int(any(a in tl for a in avs)) + int(any(b in tl for b in bvs))

    ordered = sorted(atoms.items(), key=lambda kv: -title_relevance(kv[0]))

    # Pass 1: both-term sentences only
    for title, data in ordered:
        sentences = re.split(r"(?<=[.!?])\s+", data["content"].replace("\n", " "))
        for s in sentences:
            sl = s.lower()
            if any(a in sl for a in avs) and any(b in sl for b in bvs) and len(s) < 450:
                return title, s.strip()

    # Pass 2: any sentence with a contrast keyword + one term
    for title, data in ordered:
        sentence = find_contrast_sentence(data["content"], term_a, term_b)
        if sentence:
            return title, sentence

    return None, None


# ---------------------------------------------------------------------------
# Response builders (one per intent)
# ---------------------------------------------------------------------------


POPULAR_CONCEPTS = [
    "Value-Based Pricing",
    "Freemium Business Model",
    "AARRR Framework",
    "Customer Acquisition Cost",
    "Direct vs Indirect Network Effects",
    "Scalable Business Model",
]


def respond_greeting(atoms: dict) -> dict:
    cats = {}
    for d in atoms.values():
        c = format_category(d["category"])
        cats[c] = cats.get(c, 0) + 1
    cat_lines = "\n".join(f"- **{c}** — {n} concepts" for c, n in sorted(cats.items()))
    markdown = f"""**Hi — I'm JAK.** Your Business Concepts Library.

I've indexed **{len(atoms)} concepts** drawn from **{SOURCES_COUNT} source books and reports**.

### Topic areas
{cat_lines}

### How to ask
- **Definition** — _"What is value-based pricing?"_
- **Comparison** — _"Compare freemium vs free trial"_
- **Situation advice** — _"What business model for an ice cream shop?"_
- **Browse a topic** — _"growth strategies"_, _"SaaS metrics"_, _"network effects"_

Or click a popular concept below to jump in.
"""
    concepts = [c for c in POPULAR_CONCEPTS if c in atoms]
    return {"markdown": markdown, "concepts": concepts}


def respond_definition(query: str, results, atoms: dict) -> dict:
    if not results:
        return no_match(query)
    _, title, data = results[0]
    parts = [f"## {title}", f"*{format_category(data['category'])}*", ""]

    definition = get_definition(data)
    if definition:
        parts.append(f"**Definition.** {truncate_md(definition, 700)}")
        parts.append("")

    attrs = get_section(data, "key attributes")
    if attrs:
        parts.append("### Key attributes")
        parts.append(truncate_md(attrs, 700))
        parts.append("")

    when_use = get_section(data, "when to use")
    if when_use:
        parts.append("### When to use")
        parts.append(truncate_md(when_use, 500))
        parts.append("")

    examples = get_section(data, "canonical examples", "examples")
    if examples:
        parts.append("### Examples")
        parts.append(truncate_md(examples, 500))
        parts.append("")

    parts.append(f"_Source: `{data['path']}`_")

    # Collect clickable concepts: explicit Related Concepts links + ranked search neighbors
    concepts = extract_related_titles(data, atoms)
    seen = {title} | set(concepts)
    for _, t, _ in results[1:6]:
        if t not in seen:
            seen.add(t)
            concepts.append(t)
    return {"markdown": "\n".join(parts), "concepts": concepts[:8]}


def respond_comparison(query: str, atoms: dict) -> dict:
    q = query.lower().rstrip("?!.").strip()
    q_clean = re.sub(r"^(compare\s+|difference between\s+|what(?:'s| is) the difference between\s+)", "", q)

    pair = None
    for sep in (" vs. ", " vs ", " versus ", " or "):
        if sep in q_clean:
            a, b = q_clean.split(sep, 1)
            pair = (a.strip(), b.strip())
            break
    if not pair:
        # try " and " carefully (only if "compare" was present)
        if "compare " in q and " and " in q_clean:
            a, b = q_clean.split(" and ", 1)
            pair = (a.strip(), b.strip())

    if not pair:
        # Fall through — not really a comparison
        results = search_atoms(query, atoms)
        return respond_general(query, results, atoms)

    term_a, term_b = pair
    results_a = search_atoms(term_a, atoms, top_k=3)
    results_b = search_atoms(term_b, atoms, top_k=3)

    if not results_a and not results_b:
        return no_match(query)

    side_a = results_a[0] if results_a else None
    side_b = results_b[0] if results_b else None
    same_atom = side_a and side_b and side_a[1] == side_b[1]

    parts = [f"## Comparison: {term_a.title()} vs {term_b.title()}", ""]

    def render_side(label: str, result) -> str:
        _, title, data = result
        block = [f"### {label}: {title}", f"*{format_category(data['category'])}*", ""]
        defn = get_definition(data)
        if defn:
            block.append(f"**Definition.** {truncate_md(defn, 450)}")
            block.append("")
        when_use = get_section(data, "when to use")
        if when_use:
            block.append(f"**When to use.** {truncate_md(when_use, 400)}")
            block.append("")
        return "\n".join(block)

    # Look anywhere in the library for an explicit contrast sentence
    contrast_source, contrast_sentence = find_contrast_anywhere(atoms, term_a, term_b)

    if same_atom:
        _, title, data = side_a
        parts.append(
            f"_Both concepts are discussed in the same atom: **{title}**. The library frames them as related rather than as separate atoms._\n"
        )
        defn = get_definition(data)
        if defn:
            parts.append(f"**Definition.** {truncate_md(defn, 600)}")
            parts.append("")
        if contrast_sentence:
            src = f" (from _{contrast_source}_)" if contrast_source and contrast_source != title else ""
            parts.append(f"### Key contrast{src}")
            parts.append(f"> {contrast_sentence}")
            parts.append("")
        when_use = get_section(data, "when to use")
        if when_use:
            parts.append("### When it fits")
            parts.append(truncate_md(when_use, 450))
            parts.append("")
        when_not = get_section(data, "when not to use")
        if when_not:
            parts.append("### When it doesn't fit")
            parts.append(truncate_md(when_not, 450))
            parts.append("")
    else:
        if side_a:
            parts.append(render_side(term_a.title(), side_a))
        else:
            parts.append(f"### {term_a.title()}\n_No direct atom in the library; the closest concepts appear below._\n")
        if side_b:
            parts.append(render_side(term_b.title(), side_b))
        else:
            parts.append(f"### {term_b.title()}\n_No direct atom in the library; the closest concepts appear below._\n")

        if contrast_sentence:
            parts.append(f"### Key contrast (from _{contrast_source}_)")
            parts.append(f"> {contrast_sentence}")
            parts.append("")

        parts.append("### How to decide between them")
        for label, result in ((term_a, side_a), (term_b, side_b)):
            if not result:
                continue
            _, t, d = result
            when_use = get_section(d, "when to use")
            if when_use:
                bullet = next((l for l in when_use.split("\n") if l.strip().startswith("-")), "")
                if bullet:
                    parts.append(f"- Choose **{t}** when: {bullet.lstrip('- ').strip()}")

    # Concepts to click: the two main atoms + their related links
    concepts = []
    seen = set()
    for result in (side_a, side_b):
        if not result:
            continue
        _, t, d = result
        if t not in seen:
            seen.add(t)
            concepts.append(t)
        for r in extract_related_titles(d, atoms):
            if r not in seen:
                seen.add(r)
                concepts.append(r)
    if contrast_source and contrast_source in atoms and contrast_source not in seen:
        concepts.append(contrast_source)
    return {"markdown": "\n".join(parts), "concepts": concepts[:8]}


def situation_label(query: str) -> str:
    q = query.lower()
    hits = [p for p in PHRASE_SYNONYMS if p in q and len(p) > 4]
    if hits:
        return hits[0]
    # fall back to a noun phrase after "for"
    m = re.search(r"\bfor (?:a|an|my|our)\s+([\w\s-]+?)(?:\?|$|\.)", q)
    if m:
        return m.group(1).strip()
    return ""


def respond_advice(query: str, atoms: dict) -> dict:
    results = search_atoms(query, atoms, top_k=10)
    if not results:
        return no_match(query)

    situation = situation_label(query)
    parts = [f"## Recommendation for: _{query}_", ""]
    if situation:
        parts.append(
            f"Reading this as a question about **{situation}**. Based on the library, here are the most relevant frameworks:\n"
        )
    else:
        parts.append("Here are the most relevant frameworks from the library:\n")

    for i, (_, title, data) in enumerate(results[:4], 1):
        parts.append(f"### {i}. {title}")
        parts.append(f"*{format_category(data['category'])}*")
        defn = get_definition(data)
        if defn:
            parts.append("")
            parts.append(truncate_md(defn, 380))
        when_use = get_section(data, "when to use")
        if when_use:
            first_bullets = [l for l in when_use.split("\n") if l.strip().startswith("-")][:3]
            if first_bullets:
                parts.append("")
                parts.append("**Fit signals:**")
                parts.extend(first_bullets)
        parts.append("")

    parts.append("---")
    parts.append("Click any concept below to drill into it, or ask _\"Compare X vs Y\"_ to weigh tradeoffs.")

    concepts = [t for _, t, _ in results[:6]]
    return {"markdown": "\n".join(parts), "concepts": concepts}


def respond_list(query: str, results, atoms: dict) -> dict:
    q = query.lower()

    # Detect category match
    cats_present = sorted({d["category"] for d in atoms.values()})
    matched_cat = None
    for cat in cats_present:
        cat_words = [w for w in re.split(r"[-_\s]+", cat) if len(w) > 3]
        if any(w in q for w in cat_words):
            matched_cat = cat
            break

    if matched_cat:
        in_cat_titles = {t for t, d in atoms.items() if d["category"] == matched_cat}
        ranked_in_cat = [(s, t, d) for s, t, d in results if t in in_cat_titles]
        remaining_titles = sorted(in_cat_titles - {t for _, t, _ in ranked_in_cat})
        ordered = ranked_in_cat + [(0, t, atoms[t]) for t in remaining_titles]

        parts = [f"## {format_category(matched_cat)} — {len(ordered)} concepts", ""]
        if ranked_in_cat:
            parts.append("_Sorted by relevance to your query._\n")
        for _, title, data in ordered:
            defn = get_definition(data)
            sentence = first_sentence(defn, 200) if defn else ""
            line = f"- **{title}**"
            if sentence:
                line += f" — {sentence}"
            parts.append(line)
        parts.append("")
        parts.append("_Click any concept below to open it._")

        concepts = [t for _, t, _ in ordered]
        return {"markdown": "\n".join(parts), "concepts": concepts[:12]}

    if not results:
        return no_match(query)

    parts = [f"## Results for: _{query}_", ""]
    parts.append(f"Top {min(len(results), 6)} matches from the library:\n")
    for i, (_, title, data) in enumerate(results[:6], 1):
        defn = get_definition(data)
        sentence = first_sentence(defn, 220) if defn else ""
        parts.append(f"**{i}. {title}** — *{format_category(data['category'])}*")
        if sentence:
            parts.append(f"&nbsp;&nbsp;&nbsp;&nbsp;{sentence}")
        parts.append("")

    parts.append("_Click any concept below to open it._")
    concepts = [t for _, t, _ in results[:6]]
    return {"markdown": "\n".join(parts), "concepts": concepts}


def respond_general(query: str, results, atoms: dict) -> dict:
    if not results:
        return no_match(query)
    _, title, data = results[0]
    parts = [f"## On: _{query}_", "", f"### {title}", f"*{format_category(data['category'])}*", ""]
    defn = get_definition(data)
    if defn:
        parts.append(truncate_md(defn, 600))
        parts.append("")
    when_use = get_section(data, "when to use")
    if when_use:
        parts.append("**When to use.** " + truncate_md(when_use, 400))
        parts.append("")

    concepts = [title]
    seen = {title}
    for _, t, _ in results[1:5]:
        if t not in seen:
            seen.add(t)
            concepts.append(t)
    return {"markdown": "\n".join(parts), "concepts": concepts}


def no_match(query: str) -> dict:
    markdown = f"""I couldn't find a strong match for **"{query}"** in the library.

**Try one of these patterns:**
- _"What is [concept]?"_ — for definitions
- _"Compare X vs Y"_ — for contrasts
- _"What business model for [situation]?"_ — for tailored advice
- _"growth strategies"_, _"SaaS metrics"_ — to browse a topic

**Topics I know well:** business models, pricing, growth, metrics, platform economics, strategy.
"""
    return {"markdown": markdown, "concepts": []}


def answer(query: str, atoms: dict, use_ai: bool = True) -> dict:
    """Return a structured response: {markdown, concepts, ai, ai_error}."""
    intent = detect_intent(query)
    if intent == "GREETING":
        base = respond_greeting(atoms)
        base["ai"] = None
        base["ai_error"] = None
        base["intent"] = intent
        return base

    if intent == "COMPARISON":
        base = respond_comparison(query, atoms)
        # Build top_atoms from the two compared sides for AI grounding
        q_clean = re.sub(
            r"^(compare\s+|difference between\s+|what(?:'s| is) the difference between\s+)",
            "", query.lower().rstrip("?!.").strip(),
        )
        pair = None
        for sep in (" vs. ", " vs ", " versus ", " or "):
            if sep in q_clean:
                a, b = q_clean.split(sep, 1)
                pair = (a.strip(), b.strip())
                break
        top_atoms = []
        if pair:
            for term in pair:
                hits = search_atoms(term, atoms, top_k=1)
                if hits and hits[0][1] not in {t for _, t, _ in top_atoms}:
                    top_atoms.append(hits[0])
    else:
        results = search_atoms(query, atoms)
        if intent == "DEFINITION":
            base = respond_definition(query, results, atoms)
        elif intent == "ADVICE":
            base = respond_advice(query, atoms)
        elif intent == "LIST":
            base = respond_list(query, results, atoms)
        else:
            base = respond_general(query, results, atoms)
        top_atoms = results[:4]

    ai_text, ai_error = None, None
    if use_ai and intent != "GREETING" and top_atoms:
        ai_text, ai_error = synthesize_with_ai(query, intent, top_atoms)

    base["ai"] = ai_text
    base["ai_error"] = ai_error
    base["intent"] = intent
    return base


# ---------------------------------------------------------------------------
# UI helpers
# ---------------------------------------------------------------------------


def _slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def query_for_concept(title: str) -> str:
    """The query a clicked concept button should fire."""
    return f"What is {title}?"


def enqueue(query: str):
    """Stage a query for processing on the next rerun."""
    st.session_state.pending_query = query


def render_response(resp: dict, msg_idx: int):
    """Render an assistant response.

    Hierarchy:
      1. AI synthesis (primary — detailed, multi-section markdown). If AI failed
         or is disabled, the structured wiki content is shown as the primary
         response instead so the user always gets a useful answer.
      2. "Source material from the wiki" expander (always present when we have it)
         — the raw structured atom dump that grounds the synthesis.
      3. Jump-to-concept buttons.
    """
    has_ai = bool(resp.get("ai"))
    has_md = bool(resp.get("markdown"))
    intent = resp.get("intent")

    if has_ai:
        st.markdown(
            "<div class='section-eyebrow'>Synthesis — grounded in the wiki</div>",
            unsafe_allow_html=True,
        )
        st.markdown(resp["ai"])

        if has_md and intent != "GREETING":
            with st.expander("Source material from the wiki"):
                st.markdown(resp["markdown"])
    else:
        # Fallback: show the structured wiki dump as the main answer
        if resp.get("ai_error") and intent not in (None, "GREETING"):
            st.warning(
                f"AI synthesis unavailable, showing local wiki results.\n\n_{resp['ai_error'][:200]}_"
            )
        if has_md:
            st.markdown(resp["markdown"])

    concepts = resp.get("concepts") or []
    if concepts:
        st.markdown(
            "<div class='section-eyebrow'>Jump to concept</div>",
            unsafe_allow_html=True,
        )
        cols = st.columns(min(len(concepts), 3))
        for i, title in enumerate(concepts):
            if cols[i % len(cols)].button(
                title, key=f"concept_{msg_idx}_{i}_{_slug(title)}", use_container_width=True
            ):
                enqueue(query_for_concept(title))
                st.rerun()


# ---------------------------------------------------------------------------
# UI
# ---------------------------------------------------------------------------

atoms = load_wiki_atoms()

if "messages" not in st.session_state:
    st.session_state.messages = [{"role": "assistant", "response": respond_greeting(atoms)}]
if "pending_query" not in st.session_state:
    st.session_state.pending_query = None
if "ai_calls_used" not in st.session_state:
    st.session_state.ai_calls_used = 0

# Header — AI health AND session quota
ai_health = (
    kimi_status() if (KIMI_API_KEY and not AI_DISABLED) else {"ok": False, "reason": "disabled" if AI_DISABLED else "no key"}
)
quota_exhausted = SESSION_AI_LIMIT > 0 and st.session_state.ai_calls_used >= SESSION_AI_LIMIT
ai_available_now = ai_health.get("ok") and not quota_exhausted

badge_label = "AI + Wiki" if ai_available_now else "Local search"
badge_class = "badge badge-active" if ai_available_now else "badge"

st.markdown(
    f"""
<div style='display:flex;align-items:baseline;gap:12px;margin-bottom:0.25rem;'>
  <h1 class='app-title' style='margin:0;'>JAK Business Concepts Library</h1>
  <span class='{badge_class}'>{badge_label}</span>
</div>
<p class='app-subtitle'>Business models, pricing, growth, metrics, platform economics, strategy.</p>
""",
    unsafe_allow_html=True,
)
st.markdown("<div style='margin-top:0.75rem;'></div>", unsafe_allow_html=True)

examples = [
    "What is value-based pricing?",
    "Compare freemium vs free trial",
    "What business model for an ice cream shop?",
    "growth strategies",
]
cols = st.columns(len(examples))
for col, ex in zip(cols, examples):
    if col.button(ex, key=f"ex_{_slug(ex)}", use_container_width=True):
        enqueue(ex)
        st.rerun()

# Render conversation
for msg_idx, msg in enumerate(st.session_state.messages):
    with st.chat_message(msg["role"]):
        if msg["role"] == "user":
            st.markdown(msg["content"])
        else:
            render_response(msg["response"], msg_idx)

# Process queued query (from a concept button or example) before reading new chat input
queued = st.session_state.pending_query
prompt_input = st.chat_input("Ask about business concepts…")
prompt = queued or prompt_input
if queued:
    st.session_state.pending_query = None

if prompt:
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    with st.chat_message("assistant"):
        # Re-check quota at request time (in case multiple queries used it up this session)
        use_ai_now = ai_health.get("ok") and (
            SESSION_AI_LIMIT == 0 or st.session_state.ai_calls_used < SESSION_AI_LIMIT
        )
        spinner_msg = (
            "Synthesizing a detailed answer from the wiki…"
            if use_ai_now else "Searching wiki…"
        )
        with st.spinner(spinner_msg):
            resp = answer(prompt, atoms, use_ai=use_ai_now)
        if resp.get("ai"):
            st.session_state.ai_calls_used += 1
        render_response(resp, len(st.session_state.messages))
    st.session_state.messages.append({"role": "assistant", "response": resp})

# Sidebar — AI status + atom browser
with st.sidebar:
    st.markdown("<div class='section-eyebrow' style='margin-top:0;'>Library</div>", unsafe_allow_html=True)
    col_a, col_b = st.columns(2)
    col_a.metric("Atoms", len(atoms))
    col_b.metric("Sources", SOURCES_COUNT)

    st.markdown("<div class='section-eyebrow'>Synthesis</div>", unsafe_allow_html=True)
    if ai_health.get("ok"):
        remaining_line = ""
        if SESSION_AI_LIMIT > 0:
            remaining = max(0, SESSION_AI_LIMIT - st.session_state.ai_calls_used)
            if remaining == 0:
                remaining_line = (
                    "<div style='color:#71717a;font-size:0.75rem;margin-top:4px;'>"
                    "Session AI quota used — refresh to reset, or continue with local search.</div>"
                )
            else:
                remaining_line = (
                    f"<div style='color:#71717a;font-size:0.75rem;margin-top:4px;'>"
                    f"{remaining} AI {'queries' if remaining != 1 else 'query'} remaining this session</div>"
                )
        st.markdown(
            f"<div style='color:#a1a1aa;font-size:0.85rem;'>Connected · "
            f"<code>{ai_health.get('model')}</code></div>"
            f"{remaining_line}",
            unsafe_allow_html=True,
        )
    else:
        reason = ai_health.get("reason", "unknown")
        st.markdown(
            f"<div style='color:#a1a1aa;font-size:0.85rem;'>Local-only mode</div>"
            f"<div style='color:#71717a;font-size:0.75rem;margin-top:4px;'>{reason[:160]}</div>",
            unsafe_allow_html=True,
        )

    st.markdown("<div class='section-eyebrow'>Browse atoms</div>", unsafe_allow_html=True)
    cats_by_name = {}
    for title, d in atoms.items():
        cats_by_name.setdefault(d["category"], []).append(title)
    for cat in sorted(cats_by_name):
        with st.expander(f"{format_category(cat)} ({len(cats_by_name[cat])})", expanded=False):
            for title in sorted(cats_by_name[cat]):
                if st.button(title, key=f"sb_{_slug(cat)}_{_slug(title)}", use_container_width=True):
                    enqueue(query_for_concept(title))
                    st.rerun()

    st.markdown("<div style='margin-top:1rem;'></div>", unsafe_allow_html=True)
    if st.button("Reset chat", use_container_width=True):
        st.session_state.messages = [{"role": "assistant", "response": respond_greeting(atoms)}]
        st.session_state.pending_query = None
        st.session_state.ai_calls_used = 0
        st.rerun()

    st.markdown(
        "<div style='margin-top:2rem;padding-top:1rem;border-top:1px solid #1f1f23;"
        "color:#52525b;font-size:0.7rem;line-height:1.5;'>"
        "Built by <strong style='color:#a1a1aa;font-weight:500;'>Jamal Khan</strong> "
        "as part of JAK OS. AI synthesis grounded in a private business-concepts wiki."
        "</div>",
        unsafe_allow_html=True,
    )
