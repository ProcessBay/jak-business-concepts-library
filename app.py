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

import base64
import json
import os
import re
import time
import urllib.request
import urllib.error
from pathlib import Path

import streamlit as st

# Telemetry: fire-and-forget query logging to Supabase. Stdlib-only, never
# blocks or raises into the response path. See telemetry.py for design notes.
# Lives outside `try` so a missing module is loud, but log_query itself is
# always safe to call — when SUPABASE_* secrets are absent it's a no-op.
import telemetry

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _resolve_wiki_path() -> Path:
    """Resolve the PRIMARY wiki location across local dev and deployed environments.

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
    return here / "wiki"


def _resolve_extra_atom_roots() -> list:
    """Additional roots to scan for atom-formatted markdown.

    The PB OneDrive Knowledge Library lives outside ~/jak-vault/wiki but
    contains 70+ canonical business concepts. When running locally we scan
    it in addition to wiki/ so Obsidian edits show up immediately. When
    deployed (no Knowledge Library on disk) these are absent — but the
    deploy snapshot at bot/wiki/{concepts,frameworks,tools} already contains
    a copy of the same atoms, so coverage is identical.

    Returns the list of (root_path, folder_to_category_override) tuples.
    """
    home = Path.home()
    kl = home / "jak-vault" / "01_Corporate" / "03_Knowledge_Library"
    if not kl.is_dir():
        return []
    # Map ugly OneDrive folder names to clean kebab-case categories
    return [
        (kl / "Frameworks_&_Models", "frameworks"),
        (kl / "Reference_Materials", "concepts"),
        (kl / "Tools_&_Resources", "tools"),
    ]


WIKI_PATH = _resolve_wiki_path()
EXTRA_ATOM_ROOTS = _resolve_extra_atom_roots()
SOURCES_COUNT = 11

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
# Arabic uses moonshot-v1-128k + hardened language-lock prompt + CJK sanitizer.
# Quality is imperfect (Kimi's Arabic occasionally leaks Chinese chars which
# the sanitizer strips) but it's a single-provider setup that ships cleanly.
KIMI_MODEL_AR = _secret("KIMI_MODEL_AR", "moonshot-v1-128k")

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
# Bilingual strings (English + Arabic)
# ---------------------------------------------------------------------------

STRINGS = {
    # Header
    "app_title":            {"en": "JAK Business Concepts Library",
                             "ar": "مكتبة JAK لمفاهيم الأعمال"},
    "app_subtitle":         {"en": "Business models, pricing, growth, metrics, platform economics, strategy.",
                             "ar": "نماذج الأعمال، التسعير، النمو، المؤشرات، اقتصاديات المنصات، الاستراتيجية."},
    "badge_ai":             {"en": "AI + Wiki", "ar": "الذكاء الاصطناعي + الموسوعة"},
    "badge_local":          {"en": "Local search", "ar": "بحث محلي"},

    # Example query buttons
    "ex_value_pricing":     {"en": "What is value-based pricing?",
                             "ar": "ما هو التسعير القائم على القيمة؟"},
    "ex_freemium_vs_trial": {"en": "Compare freemium vs free trial",
                             "ar": "قارن بين النموذج المجاني والتجربة المجانية"},
    "ex_ice_cream":         {"en": "What business model for an ice cream shop?",
                             "ar": "ما نموذج العمل المناسب لمحل آيس كريم؟"},
    "ex_growth":            {"en": "growth strategies",
                             "ar": "استراتيجيات النمو"},

    # Sidebar eyebrows
    "sb_library":           {"en": "Library", "ar": "المكتبة"},
    "sb_synthesis":         {"en": "Synthesis", "ar": "التحليل بالذكاء الاصطناعي"},
    "sb_browse":            {"en": "Browse atoms", "ar": "تصفّح المفاهيم"},
    "sb_language":          {"en": "Language", "ar": "اللغة"},
    "sb_atoms":             {"en": "Atoms", "ar": "المفاهيم"},
    "sb_sources":           {"en": "Sources", "ar": "المصادر"},
    "sb_connected":         {"en": "Connected", "ar": "متصل"},
    "sb_local_mode":        {"en": "Local-only mode", "ar": "وضع محلي فقط"},
    "sb_quota_used":        {"en": "Session AI quota used — refresh to reset, or continue with local search.",
                             "ar": "انتهت حصة الجلسة من الذكاء الاصطناعي — حدّث الصفحة لإعادة التعيين أو تابع بالبحث المحلي."},
    "sb_quota_remaining":   {"en": "{n} AI {label} remaining this session",
                             "ar": "{n} {label} متبقية في هذه الجلسة"},
    "sb_queries_label":     {"en": "queries", "ar": "استعلام"},
    "sb_query_label":       {"en": "query", "ar": "استعلام"},
    "btn_reset":            {"en": "Reset chat", "ar": "مسح المحادثة"},

    # Main content
    "eyebrow_synthesis":    {"en": "Synthesis — grounded in the wiki",
                             "ar": "تحليل مرتكز على الموسوعة"},
    "eyebrow_jump":         {"en": "Jump to concept", "ar": "انتقل إلى مفهوم"},
    "expander_source":      {"en": "Source material from the wiki",
                             "ar": "المادة المرجعية من الموسوعة"},
    "input_placeholder":    {"en": "Ask about business concepts…",
                             "ar": "اسأل عن مفاهيم الأعمال…"},
    "spinner_ai":           {"en": "Synthesizing a detailed answer from the wiki…",
                             "ar": "جارٍ تحليل إجابة مفصّلة من الموسوعة…"},
    "spinner_local":        {"en": "Searching wiki…", "ar": "جارٍ البحث في الموسوعة…"},
    "ai_unavailable":       {"en": "AI synthesis unavailable, showing local wiki results.",
                             "ar": "التحليل بالذكاء الاصطناعي غير متاح، نعرض نتائج الموسوعة المحلية."},
    "footer":               {"en": "A ProcessBay tool, built by Jamal Khan as part of JAK OS. AI synthesis grounded in a private business-concepts wiki.",
                             "ar": "أداة من ProcessBay، أنشأها جمال خان ضمن منظومة JAK OS. التحليل بالذكاء الاصطناعي مرتكز على موسوعة خاصة لمفاهيم الأعمال."},

    # Greeting
    "greeting_hi":          {"en": "**Hi — I'm JAK.** Your Business Concepts Library.",
                             "ar": "**أهلاً — أنا JAK.** مكتبة مفاهيم الأعمال."},
    "greeting_indexed":     {"en": "I've indexed **{atoms} concepts** drawn from **{sources} source books and reports**.",
                             "ar": "تمّت فهرسة **{atoms} مفهوماً** مستخلصاً من **{sources} كتاباً وتقريراً مرجعياً**."},
    "greeting_topics":      {"en": "### Topic areas", "ar": "### المجالات"},
    "greeting_how":         {"en": "### How to ask", "ar": "### كيف تسأل"},
    "greeting_def":         {"en": "**Definition** — _\"What is value-based pricing?\"_",
                             "ar": "**تعريف** — _\"ما هو التسعير القائم على القيمة؟\"_"},
    "greeting_cmp":         {"en": "**Comparison** — _\"Compare freemium vs free trial\"_",
                             "ar": "**مقارنة** — _\"قارن بين النموذج المجاني والتجربة المجانية\"_"},
    "greeting_adv":         {"en": "**Situation advice** — _\"What business model for an ice cream shop?\"_",
                             "ar": "**نصيحة تطبيقية** — _\"ما نموذج العمل المناسب لمحل آيس كريم؟\"_"},
    "greeting_browse":      {"en": "**Browse a topic** — _\"growth strategies\"_, _\"SaaS metrics\"_, _\"network effects\"_",
                             "ar": "**تصفّح موضوع** — _\"استراتيجيات النمو\"_، _\"مؤشرات SaaS\"_، _\"التأثيرات الشبكية\"_"},
    "greeting_or":          {"en": "Or click a popular concept below to jump in.",
                             "ar": "أو اضغط على أحد المفاهيم الشائعة أدناه للبدء."},

    # No-match
    "no_match_intro":       {"en": "I couldn't find a strong match for **\"{q}\"** in the library.",
                             "ar": "لم أعثر على مطابقة قويّة لـ **\"{q}\"** في المكتبة."},

    # Category labels
    "cat_business-models":  {"en": "Business Models", "ar": "نماذج الأعمال"},
    "cat_growth":           {"en": "Growth", "ar": "النمو"},
    "cat_metrics":          {"en": "Metrics", "ar": "المؤشرات"},
    "cat_platform-economics": {"en": "Platform Economics", "ar": "اقتصاديات المنصات"},
    "cat_pricing":          {"en": "Pricing", "ar": "التسعير"},
    "cat_strategy":         {"en": "Strategy", "ar": "الاستراتيجية"},
}


def t(key: str, lang: str = "en", **fmt) -> str:
    """Lookup a translated string; falls back to English then to the key itself."""
    entry = STRINGS.get(key, {})
    s = entry.get(lang) or entry.get("en") or key
    if fmt:
        try:
            return s.format(**fmt)
        except (KeyError, IndexError):
            return s
    return s


# Atom-title translations. Wiki atoms live with English canonical titles
# (the underlying search/synthesis layer keys off the English form), but the
# UI shows the Arabic label to Arabic users via concept_label() below.
CONCEPT_LABELS = {
    # Business Models
    "Drivers of Scalability": "محرّكات قابلية التوسّع",
    "Freemium Business Model": "النموذج المجاني (Freemium)",
    "Freemium Value Proposition Design": "تصميم القيمة في النموذج المجاني",
    "Hyper Scalability": "التوسّع الفائق",
    "Internal vs External Scalability": "التوسّع الداخلي مقابل الخارجي",
    "Land and Expand Model": "نموذج «اكسب ثم وسّع»",
    "Scalable Business Model": "نموذج العمل القابل للتوسّع",
    # Growth
    "AARRR Framework": "إطار AARRR (مقاييس القراصنة)",
    "Distribution Channels and Partnerships": "قنوات التوزيع والشراكات",
    "Go-to-Market Strategy": "استراتيجية الإطلاق التجاري",
    "Growth Hacking Techniques": "تقنيات النموّ السريع",
    "Influencer Marketing for Acquisition": "التسويق عبر المؤثّرين لاكتساب العملاء",
    "Referral Programs": "برامج الإحالة",
    "Sales-Led vs Product-Led GTM": "الإطلاق بقيادة المبيعات مقابل بقيادة المنتج",
    "Viral Growth Loops": "حلقات النموّ الفيروسي",
    # Metrics
    "Churn Rate": "معدّل التسرّب (Churn)",
    "Customer Acquisition Cost": "تكلفة اكتساب العميل (CAC)",
    "Customer Conversion Rate": "معدّل تحويل العملاء",
    "Customer Engagement Score": "مؤشّر تفاعل العميل",
    "Customer Health Score": "مؤشّر صحّة العميل",
    "Customer Lifetime Value": "القيمة الدائمة للعميل (LTV)",
    "Freemium Conversion Metrics": "مؤشّرات التحويل في النموذج المجاني",
    "GTM KPIs and Measurement": "مؤشّرات الإطلاق التجاري وقياسه",
    "Growth Hacking KPI Baselines": "خطوط الأساس لمؤشّرات النموّ السريع",
    "Lead Velocity Rate": "معدّل سرعة العملاء المحتملين",
    "Monthly Recurring Revenue": "الإيرادات المتكرّرة الشهرية (MRR)",
    "Net Promoter Score": "مؤشّر صافي المروّجين (NPS)",
    "Network Effects Metrics": "مؤشّرات التأثيرات الشبكية",
    # Platform Economics
    "API Business Model": "نموذج عمل واجهات البرمجة (API)",
    "API Economy": "اقتصاد واجهات البرمجة (API)",
    "Critical Mass": "الكتلة الحرجة",
    "Direct vs Indirect Network Effects": "التأثيرات الشبكية المباشرة مقابل غير المباشرة",
    "Freemium API Model": "النموذج المجاني لواجهات البرمجة",
    "Negative Network Effects and Curation": "التأثيرات الشبكية السلبية والتنسيق",
    "Platform Business Model Scalability": "قابلية توسّع نماذج المنصّات",
    "Subscription Business Model": "نموذج الاشتراك",
    "Subscription Fatigue": "إجهاد الاشتراكات",
    "Subscription Maturity Model": "نموذج نضج الاشتراكات",
    "Subscription Revenue Cycle": "دورة إيرادات الاشتراك",
    "Transaction Based API Model": "نموذج API القائم على المعاملات",
    "Two-Sided Network Effects": "التأثيرات الشبكية ثنائية الجانب",
    # Pricing
    "GTM Pricing Strategies": "استراتيجيات التسعير عند الإطلاق",
    "Penny Gap": "فجوة القرش",
    "SaaS Monetization Strategies": "استراتيجيات تحقيق الدخل لـ SaaS",
    "SaaS Pricing Experimentation": "التجريب التسعيري لـ SaaS",
    "SaaS Renewal Pricing": "تسعير تجديد اشتراكات SaaS",
    "Value-Based Pricing": "التسعير القائم على القيمة",
    # Strategy
    "BCG Matrix": "مصفوفة BCG",
    "Co-Innovation and R&D Alliances": "الابتكار المشترك وتحالفات البحث والتطوير",
    "Co-Innovation and RD Alliances": "الابتكار المشترك وتحالفات البحث والتطوير",
    "Competitive Analysis": "التحليل التنافسي",
    "Partner Due Diligence": "العناية الواجبة في اختيار الشركاء",
    "Partnership Exit Strategies": "استراتيجيات الخروج من الشراكات",
    "Partnership Value Proposition": "القيمة المقترحة للشراكة",
    "Perceptual Mapping": "الخرائط الإدراكية",
    "Porters Five Forces": "قوى بورتر الخمس",
    "Strategic Partnerships": "الشراكات الاستراتيجية",
    "Strategic Partnership Types": "أنواع الشراكات الاستراتيجية",
    "Value Proposition and USP": "القيمة المقترحة والميزة الفريدة (USP)",
}


def concept_label(title: str, lang: str = "en") -> str:
    """Return the localized label for an atom title. Falls back to the
    English title if no translation is registered (so newly added atoms
    still display, just untranslated)."""
    if lang == "ar" and title in CONCEPT_LABELS:
        return CONCEPT_LABELS[title]
    return title


def detect_arabic(text: str) -> bool:
    """Return True if the string contains Arabic-script characters."""
    return any("؀" <= ch <= "ۿ" or "ݐ" <= ch <= "ݿ" for ch in text)


def render_markdown_content_aware(text: str):
    """Render markdown with direction matching the content's script.

    If the text contains Arabic characters, wrap it in dir='rtl' + text-align:right
    so it's correctly right-justified regardless of the current UI language. This
    matters for user-typed messages and any other place where the content language
    can diverge from the UI language.
    """
    if not text:
        st.markdown(text or "")
        return
    if detect_arabic(text):
        st.markdown(
            f"<div dir='rtl' style='text-align:right;'>\n\n{text}\n\n</div>",
            unsafe_allow_html=True,
        )
    else:
        st.markdown(text)


# Unicode ranges to scrub from Arabic AI output (Kimi sometimes leaks Chinese).
# Keeps Arabic, Latin (for foreign brand names), digits, punctuation.
_CJK_LEAK_RE = re.compile(
    "["
    "　-〿"     # CJK symbols & punctuation
    "぀-ゟ"     # Hiragana
    "゠-ヿ"     # Katakana
    "㐀-䶿"     # CJK Extension A
    "一-鿿"     # CJK Unified Ideographs
    "가-힯"     # Hangul Syllables
    "Ѐ-ӿ"     # Cyrillic
    "]+"
)


def sanitize_arabic_output(text: str) -> str:
    """Remove any non-Arabic-script characters that leaked from the model.

    Kimi's models occasionally drop in Chinese/Russian characters when
    producing Arabic. We strip those out — leaves Arabic, Latin (brand names
    like Salesforce), digits, and punctuation intact.
    """
    if not text:
        return text
    return _CJK_LEAK_RE.sub("", text)


def get_active_lang() -> str:
    """Resolve the active UI language.

    Priority: session_state → ?lang= query param → browser default (JS-driven) → 'en'.
    """
    if "lang" in st.session_state and st.session_state.lang in ("en", "ar"):
        return st.session_state.lang
    qp = st.query_params.get("lang")
    if qp in ("en", "ar"):
        st.session_state.lang = qp
        return qp
    # Not yet known — return en provisionally; the JS detect snippet will set it
    return "en"


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


def kimi_chat_stream(messages: list, *, model: str = None, max_tokens: int = 2200,
                     temperature: float = 0.55, timeout: int = 60):
    """Stream Kimi /chat/completions, yielding content chunks as they arrive.

    Uses OpenAI-compatible SSE — Moonshot returns `data: {...}` lines with
    delta.content fragments, terminated by `data: [DONE]`. Yields plain text
    chunks suitable for passing to st.write_stream().

    Raises KimiError on connection-level failure. Stream-level errors (Kimi
    returning a non-stream JSON error mid-response) are also surfaced via
    KimiError so the caller can fall back gracefully.
    """
    if not KIMI_API_KEY:
        raise KimiError("KIMI_API_KEY is not set.")

    body = json.dumps({
        "model": model or KIMI_MODEL,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "stream": True,
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{KIMI_BASE_URL}/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {KIMI_API_KEY}",
            "Content-Type": "application/json",
            "Accept": "text/event-stream",
        },
        method="POST",
    )

    try:
        resp = urllib.request.urlopen(req, timeout=timeout)
    except urllib.error.HTTPError as e:
        try:
            err_body = json.loads(e.read().decode("utf-8"))
            msg = err_body.get("error", {}).get("message", str(e))
        except Exception:
            msg = str(e)
        if e.code == 401:
            raise KimiError(f"401 Invalid Authentication: {msg}")
        if e.code == 404 and "model" in msg.lower():
            raise KimiError(f"Model `{model or KIMI_MODEL}` not available: {msg}")
        raise KimiError(f"HTTP {e.code}: {msg}")
    except urllib.error.URLError as e:
        raise KimiError(f"Network error reaching {KIMI_BASE_URL}: {e.reason}")

    # Parse the SSE stream
    try:
        for raw_line in resp:
            line = raw_line.decode("utf-8", errors="replace").strip()
            if not line or not line.startswith("data:"):
                continue
            payload = line[5:].strip()
            if payload == "[DONE]":
                break
            try:
                obj = json.loads(payload)
            except json.JSONDecodeError:
                continue
            # Surface mid-stream errors
            if "error" in obj:
                raise KimiError(str(obj["error"]))
            try:
                delta = obj["choices"][0].get("delta", {})
            except (KeyError, IndexError):
                continue
            chunk = delta.get("content")
            if chunk:
                yield chunk
    finally:
        try:
            resp.close()
        except Exception:
            pass


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

PB_ICON_PATH = Path(__file__).resolve().parent / "assets" / "processbay-icon.png"
PB_LOGO_PATH = Path(__file__).resolve().parent / "assets" / "processbay-logo.png"

st.set_page_config(
    page_title="JAK Business Concepts Library",
    page_icon=str(PB_ICON_PATH) if PB_ICON_PATH.exists() else None,
    layout="wide",
    initial_sidebar_state="expanded",
)

# Resolve active UI language for this rerun (en | ar)
LANG = get_active_lang()
IS_RTL = LANG == "ar"

# Stable per-session id used only for telemetry hashing. Not a user id, not
# a tracker — just a way to count distinct sessions in analytics. We hash it
# before it ever leaves the process (telemetry.hash_session).
if "_telemetry_session_id" not in st.session_state:
    import uuid as _uuid
    st.session_state._telemetry_session_id = _uuid.uuid4().hex

# On the very first load with no ?lang= query param, run a tiny JS snippet that
# reads navigator.language and reloads the page with ?lang=ar|en. After that
# the param is sticky and we never re-trigger this.
if "lang_bootstrapped" not in st.session_state:
    st.session_state.lang_bootstrapped = True
    if "lang" not in st.query_params:
        st.components.v1.html(
            """
<script>
  try {
    const browser = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    const lang = browser.startsWith("ar") ? "ar" : "en";
    const params = new URLSearchParams(window.parent.location.search);
    if (!params.has("lang")) {
      params.set("lang", lang);
      window.parent.location.search = params.toString();
    }
  } catch (e) { /* no-op */ }
</script>
""",
            height=0,
        )

# shadcn-inspired LIGHT theme
# - White background, zinc-900 text
# - ProcessBay blue/purple accents (sourced from the logo: #3b1ee0 -> #6b3aa0)
# - Tight typography hierarchy: h1 1.5rem, h2 1.15rem, h3 1rem, body 0.95rem
# - 1px borders, subtle radii, generous whitespace
st.markdown(
    """
<style>
    /* Load Inter — same family Vercel/Linear/Stripe use. The variable-font
       version means one HTTP request gets every weight. The display=swap
       avoids invisible-text flash. */
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

    :root {
        --pb-blue: #3b1ee0;
        --pb-purple: #6b3aa0;
        --pb-gradient: linear-gradient(135deg, #3b1ee0 0%, #6b3aa0 100%);
    }

    /* Inter as primary, with the OS fallback chain behind it. */
    html, body, [class*="css"]  {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: "cv11", "ss01"; /* Inter's tabular numerals + alt 'a' */
        text-rendering: optimizeLegibility;
    }

    /* canvas */
    .stApp { background-color: #ffffff; }
    [data-testid="stSidebar"] { background-color: #fafafa; border-right: 1px solid #e4e4e7; }
    [data-testid="stSidebar"] .stMarkdown p,
    [data-testid="stSidebar"] .stMarkdown li { color: #3f3f46; }

    /* TIGHT main container — kill the huge default top padding Streamlit applies */
    .main .block-container,
    [data-testid="stMainBlockContainer"] {
        padding-top: 1.5rem !important;
        padding-bottom: 2rem !important;
        max-width: 1100px;
    }
    /* Sidebar — also tighten the top padding */
    [data-testid="stSidebar"] > div:first-child,
    [data-testid="stSidebarContent"] {
        padding-top: 1.5rem !important;
    }
    /* Keep Streamlit's header bar in the DOM (so the sidebar collapse toggle
       inside it stays clickable) but make it visually quiet. */
    [data-testid="stHeader"] {
        background: rgba(255,255,255,0.85) !important;
        backdrop-filter: blur(6px);
    }
    /* Hide ONLY the specific Streamlit Cloud chrome elements — never the
       sidebar collapse button. */
    [data-testid="stMainMenu"],
    [data-testid="stDeployButton"],
    [data-testid="stStatusWidget"],
    [data-testid="stFooter"],
    footer {
        display: none !important;
    }
    /* Force-show the sidebar collapse toggle in all Streamlit versions */
    [data-testid="collapsedControl"],
    [data-testid="stSidebarCollapseButton"],
    [data-testid="stSidebarCollapsedControl"],
    button[kind="header"][aria-label*="sidebar" i] {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 999 !important;
        position: relative;
    }
    /* Hide the "streamlitApp" hover-pill that appears for free-tier deploys */
    [data-testid="stAppDeployButton"],
    a[href*="streamlit.app"][title*="streamlit" i] { display: none !important; }

    /* RTL — applied when <html dir="rtl"> is set further down */
    html[dir="rtl"] body,
    html[dir="rtl"] .stApp,
    html[dir="rtl"] [data-testid="stSidebar"] {
        direction: rtl;
        text-align: right;
        font-family: "Noto Sans Arabic", "SF Arabic", "Geeza Pro", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    }
    html[dir="rtl"] .stMarkdown,
    html[dir="rtl"] .stChatMessage,
    html[dir="rtl"] h1, html[dir="rtl"] h2, html[dir="rtl"] h3,
    html[dir="rtl"] .pb-header-title,
    html[dir="rtl"] .pb-header-subtitle,
    html[dir="rtl"] .app-title,
    html[dir="rtl"] .app-subtitle,
    html[dir="rtl"] .section-eyebrow {
        text-align: right;
        direction: rtl;
    }
    html[dir="rtl"] .stChatMessage ul,
    html[dir="rtl"] .stChatMessage ol { padding-right: 1.4rem; padding-left: 0; }
    /* Arabic buttons centered (not right-aligned) — short labels look more
       balanced centered, even when the surrounding text is RTL. */
    html[dir="rtl"] .stButton button { text-align: center; }
    [dir="rtl"] .stButton button { text-align: center; }
    html[dir="rtl"] .pb-header { flex-direction: row-reverse; }
    html[dir="rtl"] .pb-header-text { text-align: right; }
    html[dir="rtl"] .stMarkdown table th,
    html[dir="rtl"] .stMarkdown table td { text-align: right; }
    html[dir="rtl"] .stMarkdown blockquote {
        border-left: none;
        border-right: 2px solid var(--pb-purple);
        padding: 0.25rem 1rem 0.25rem 0;
    }
    html[dir="rtl"] [data-testid="stSidebar"] { text-align: right; }

    /* Flip the whole app layout so sidebar lives on the right in RTL.
       Streamlit's outer app container is flex, so reversing it swaps sidebar
       and main content visually without any JS. */
    html[dir="rtl"] [data-testid="stAppViewContainer"] { flex-direction: row-reverse; }
    /* Sidebar border lives on the right in LTR; flip it to the left edge in RTL */
    html[dir="rtl"] [data-testid="stSidebar"] {
        border-right: none;
        border-left: 1px solid #e4e4e7;
    }
    /* Sidebar collapse toggle button — Streamlit positions it absolutely; let it stay
       in its default LTR position to avoid weird overlaps */

    /* === Arabic text always right-justifies, regardless of UI direction ===
       The render_markdown_content_aware helper wraps Arabic content in <div dir='rtl'>.
       These selectors make sure any such block gets the right typographic treatment
       even when the surrounding UI is in LTR/English mode. */
    [dir="rtl"] {
        text-align: right;
        direction: rtl;
    }
    [dir="rtl"] ul, [dir="rtl"] ol {
        padding-right: 1.4rem;
        padding-left: 0;
    }
    [dir="rtl"] blockquote {
        border-left: none;
        border-right: 2px solid var(--pb-purple);
        padding: 0.25rem 1rem 0.25rem 0;
    }
    [dir="rtl"] table th, [dir="rtl"] table td { text-align: right; }

    /* Chat input textarea — when UI lang is Arabic, RTL the textarea so the user
       sees Arabic text right-aligned as they type. */
    html[dir="rtl"] [data-testid="stChatInput"] textarea {
        direction: rtl;
        text-align: right;
    }
    /* Even in LTR UI mode, let the browser auto-detect direction for the textarea
       so Arabic typed into the English-mode input still right-aligns. */
    [data-testid="stChatInput"] textarea {
        unicode-bidi: plaintext;
    }

    /* Header row — flex layout, logo sits immediately next to title */
    .pb-header {
        display: flex;
        align-items: center;
        gap: 38px;
        padding-bottom: 1.1rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #e4e4e7;
    }
    .pb-header-logo {
        height: 88px;
        width: auto;
        display: block;
        flex-shrink: 0;
    }
    .pb-header-text {
        flex: 1;
        min-width: 0;
    }
    .pb-header-title-row {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
        margin: 0;
        line-height: 1.2;
    }
    .pb-header-title {
        color: #18181b;
        font-size: 1.65rem;
        font-weight: 600;
        letter-spacing: -0.02em;
        margin: 0;
        padding: 0;
        line-height: 1.2;
    }
    .pb-header-subtitle {
        color: #71717a;
        font-size: 0.92rem;
        margin: 6px 0 0 0;
        font-weight: 400;
        line-height: 1.45;
    }

    /* Body prose — Inter, slightly looser line-height for readability,
       refined letter-spacing. Big-company copy reads at 1.65-1.7 line-height. */
    .stMarkdown, .stMarkdown p, .stMarkdown li, .stChatMessage p, .stChatMessage li {
        color: #27272a;                                     /* zinc-800 */
        font-size: 1rem;
        line-height: 1.7;
        letter-spacing: -0.003em;
    }
    /* Tighter paragraph and list spacing inside chat bubbles */
    .stChatMessage p { margin: 0.5rem 0; }
    .stChatMessage ul, .stChatMessage ol {
        margin: 0.4rem 0 0.75rem 0;
        padding-left: 1.4rem;
    }
    .stChatMessage li { margin: 0.15rem 0; }
    .stChatMessage li > p { margin: 0; }

    /* tight typography hierarchy */
    h1, .stMarkdown h1 {
        color: #18181b !important;                          /* zinc-900 */
        font-size: 1.55rem !important;
        font-weight: 600 !important;
        letter-spacing: -0.015em;
        margin: 0.5rem 0 0.25rem 0 !important;
        line-height: 1.3 !important;
    }
    h2, .stMarkdown h2, .stChatMessage h2 {
        color: #18181b !important;
        font-size: 1.2rem !important;
        font-weight: 600 !important;
        letter-spacing: -0.01em;
        margin: 1.5rem 0 0.5rem 0 !important;
        line-height: 1.35 !important;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid #e4e4e7;
    }
    h3, .stMarkdown h3, .stChatMessage h3 {
        color: #18181b !important;
        font-size: 1.05rem !important;
        font-weight: 600 !important;
        margin: 1.1rem 0 0.4rem 0 !important;
        line-height: 1.35 !important;
    }
    /* First heading inside a chat message shouldn't push down */
    .stChatMessage > div > div:first-child h1:first-child,
    .stChatMessage > div > div:first-child h2:first-child,
    .stChatMessage > div > div:first-child h3:first-child { margin-top: 0 !important; }

    strong { color: #18181b; font-weight: 600; }
    em { color: #71717a; font-style: italic; }
    code {
        color: var(--pb-blue);
        background: #f4f4f5;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 0.85em;
        border: 1px solid #e4e4e7;
    }
    a, .stMarkdown a { color: var(--pb-blue); text-decoration: none; }
    a:hover { text-decoration: underline; }

    /* Chat — borderless, prose-first. Linear/Claude.ai style: no card outline,
       no shadow, no background tint. The only visual distinction between
       user and assistant is the role avatar at the side. */
    .stChatMessage {
        background-color: transparent !important;
        border: none !important;
        border-radius: 0;
        padding: 14px 4px;
        margin: 0;
        box-shadow: none;
    }
    [data-testid="stChatMessageUser"] {
        background-color: transparent !important;
    }
    [data-testid="stChatMessage"] + [data-testid="stChatMessage"] {
        margin-top: 4px;
    }

    /* Related-concepts compact chip row — soft visual weight */
    .related-label {
        color: #a1a1aa;
        font-size: 0.7rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        font-weight: 500;
        margin: 1.5rem 0 0.5rem 0;
    }
    /* Chips look like small text-link-ish buttons, not heavy CTA buttons */
    .stChatMessage .stButton button,
    .stChatMessage + .stHorizontalBlock .stButton button {
        font-size: 0.78rem;
        font-weight: 500;
        padding: 5px 10px;
        background: #fafafa;
        border-color: #e4e4e7;
    }

    /* tables */
    .stMarkdown table {
        border-collapse: collapse;
        font-size: 0.9rem;
        margin: 0.75rem 0;
    }
    .stMarkdown th, .stMarkdown td {
        border: 1px solid #e4e4e7;
        padding: 8px 12px;
        text-align: left;
        color: #27272a;
    }
    .stMarkdown th { background: #f4f4f5; color: #18181b; font-weight: 600; }

    /* blockquotes */
    .stMarkdown blockquote {
        border-left: 2px solid var(--pb-purple);
        padding: 0.25rem 0 0.25rem 1rem;
        color: #52525b;
        margin: 0.5rem 0;
        font-style: normal;
        background: #fafafa;
    }

    /* Buttons — Vercel/Linear-style: clean, neutral, with a smooth PB-accent
       hover. The 180ms transition + subtle lift on hover feels considered. */
    .stButton button {
        background-color: #ffffff;
        color: #18181b;
        border: 1px solid #e4e4e7;
        border-radius: 6px;
        padding: 7px 12px;
        font-size: 0.85rem;
        font-weight: 500;
        text-align: left;
        transition: border-color 180ms ease, color 180ms ease, background-color 180ms ease, transform 180ms ease;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.02);
    }
    .stButton button:hover {
        border-color: var(--pb-blue);
        color: var(--pb-blue);
        background-color: #fafafa;
        transform: translateY(-1px);
    }
    .stButton button:active { transform: translateY(0); }
    .stButton button:focus { box-shadow: 0 0 0 3px rgba(59, 30, 224, 0.12) !important; outline: none; }

    /* expanders */
    .streamlit-expanderHeader, [data-testid="stExpander"] summary {
        background-color: #fafafa !important;
        border: 1px solid #e4e4e7 !important;
        border-radius: 6px !important;
        color: #52525b !important;
        font-size: 0.85rem !important;
        font-weight: 500 !important;
    }

    /* chat input */
    [data-testid="stChatInput"] {
        border: 1px solid #e4e4e7;
        border-radius: 8px;
        background: #ffffff;
    }
    [data-testid="stChatInput"] textarea { color: #18181b !important; }
    [data-testid="stChatInput"]:focus-within { border-color: var(--pb-blue); }

    /* metrics in sidebar */
    [data-testid="stMetricValue"] { color: #18181b; font-size: 1.5rem; font-weight: 600; }
    [data-testid="stMetricLabel"] {
        color: #71717a;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    /* horizontal rules */
    hr { border: none; border-top: 1px solid #e4e4e7; margin: 1rem 0; }

    /* page header — top of app */
    .app-title {
        color: #18181b;
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
        background: #f4f4f5;
        color: #52525b;
        border: 1px solid #e4e4e7;
        padding: 2px 10px;
        border-radius: 4px;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.02em;
        text-transform: uppercase;
    }
    .badge-active {
        background: var(--pb-gradient);
        color: #ffffff;
        border-color: transparent;
    }
    .section-eyebrow {
        color: #71717a;
        font-size: 0.7rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 500;
        margin: 1rem 0 0.5rem 0;
    }

    /* PB logo lockup in header */
    .pb-logo-row {
        display: flex;
        align-items: center;
        gap: 16px;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid #e4e4e7;
    }
    .pb-logo-row img {
        height: 38px;
        width: auto;
    }
    .pb-divider {
        width: 1px;
        height: 36px;
        background: #e4e4e7;
    }
</style>
""",
    unsafe_allow_html=True,
)

# Set <html dir="rtl"> when Arabic is active. Streamlit can't set HTML attrs
# directly, so we use a tiny JS snippet via a hidden component.
if IS_RTL:
    st.components.v1.html(
        """
<script>
  try {
    window.parent.document.documentElement.setAttribute("dir", "rtl");
    window.parent.document.documentElement.setAttribute("lang", "ar");
  } catch (e) { /* no-op */ }
</script>
""",
        height=0,
    )
else:
    st.components.v1.html(
        """
<script>
  try {
    window.parent.document.documentElement.setAttribute("dir", "ltr");
    window.parent.document.documentElement.setAttribute("lang", "en");
  } catch (e) { /* no-op */ }
</script>
""",
        height=0,
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


def format_category(cat: str, lang: str = "en") -> str:
    """Localized category label. Falls back to titlecased English if no translation."""
    key = f"cat_{cat}"
    if key in STRINGS:
        return t(key, lang)
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


def _load_atom_file(md_file: Path, root: Path, category_override: str | None = None) -> tuple | None:
    """Parse one markdown file. Returns (title, data) or None if the file is
    not a valid atom (empty, MOC, or in a sources/ folder)."""
    if md_file.name.startswith("MOC_"):
        return None
    if md_file.parent.name == "sources":
        return None
    try:
        content = md_file.read_text(encoding="utf-8")
    except Exception:
        return None
    if not content.strip():
        return None  # skip 0-byte stubs

    fm, body = parse_frontmatter(content)

    # For extra roots, only accept files that are explicitly atom-formatted —
    # this prevents pulling in stray meeting notes, templates, etc.
    if category_override is not None and fm.get("type") != "atom":
        return None

    title = fm.get("title") or md_file.stem.replace("_", " ")
    if isinstance(title, list):
        title = title[0] if title else md_file.stem
    category = category_override or md_file.parent.name
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

    try:
        rel_path = str(md_file.relative_to(root))
    except ValueError:
        rel_path = str(md_file)

    data = {
        "title": title,
        "content": body,
        "category": category,
        "path": rel_path,
        "tags": [t.lower() for t in tags],
        "aliases": [a.lower() for a in aliases],
        "sections": parse_sections(body),
    }
    return title, data


@st.cache_data(show_spinner=False)
def load_wiki_atoms() -> dict:
    """Load atoms from the primary wiki/ AND any configured extra roots.

    Each atom's key is its canonical title. If the same title appears in
    multiple roots, the later one wins. We load the in-repo wiki/ first so
    locally-edited Knowledge Library atoms (loaded later) override the
    snapshot.
    """
    atoms: dict = {}

    # We track the canonical category folders (business-models, growth, etc.)
    # separately so KL atoms don't overwrite them. The wiki/ taxonomy is the
    # curated source of truth — concept/framework/tool labels are catch-alls.
    canonical_folders = {
        "business-models", "growth", "metrics", "platform-economics",
        "pricing", "strategy",
    }

    # 1. Primary wiki tree — load EVERYTHING, including the snapshot copies of
    #    KL atoms at bot/wiki/{concepts,frameworks,tools}.
    if WIKI_PATH.exists():
        for md_file in WIKI_PATH.rglob("*.md"):
            result = _load_atom_file(md_file, WIKI_PATH)
            if result is None:
                continue
            title, data = result
            existing = atoms.get(title)
            if existing is None:
                atoms[title] = data
                continue
            # If two atoms share a title within wiki/ itself, prefer the one
            # in a canonical category folder over a catch-all (concepts/etc.)
            if existing["category"] in canonical_folders:
                continue  # keep canonical
            if data["category"] in canonical_folders:
                atoms[title] = data  # upgrade to canonical
            # Otherwise: leave the first one in place

    # 2. Extra atom roots — only files with explicit `type: atom` frontmatter.
    #    When running locally with the live Obsidian Knowledge Library, this
    #    is the source of truth for KL atoms. On Streamlit Cloud (no KL on
    #    disk), this loop is a no-op because the snapshot already loaded
    #    them under bot/wiki/{frameworks,concepts,tools}.
    for root, category in EXTRA_ATOM_ROOTS:
        if not root.is_dir():
            continue
        for md_file in root.glob("*.md"):
            result = _load_atom_file(md_file, root, category_override=category)
            if result is None:
                continue
            title, data = result
            existing = atoms.get(title)
            if existing is None:
                atoms[title] = data
                continue
            # Collision with a wiki/ atom — never overwrite the canonical
            # categorization with the KL's generic concept/framework/tool label.
            if existing["category"] in canonical_folders:
                continue
            # Both are non-canonical (e.g., snapshot copy under concepts/)
            # — refresh from the live KL so latest edits win.
            atoms[title] = data

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


def _atom_excerpt_compact(data: dict) -> str:
    """Slim excerpt for reasoning models (kimi-k2.6) where prompt size directly
    multiplies latency. ~500-700 chars per atom vs ~3000 for the regular excerpt.
    Keeps only Definition + Examples + top 3 when-to-use bullets.
    """
    pieces = [f"# {data['title']}"]
    defn = get_definition(data)
    if defn:
        pieces.append(truncate_md(defn, 400))
    examples = get_section(data, "canonical examples", "examples")
    if examples:
        # Just the first 3 example lines
        ex_lines = [l for l in examples.split("\n") if l.strip().startswith("-")][:3]
        if ex_lines:
            pieces.append("Examples: " + " | ".join(l.lstrip("- ").strip()[:120] for l in ex_lines))
    when_use = get_section(data, "when to use")
    if when_use:
        wu_lines = [l for l in when_use.split("\n") if l.strip().startswith("-")][:3]
        if wu_lines:
            pieces.append("Fits when: " + " | ".join(l.lstrip("- ").strip()[:100] for l in wu_lines))
    return "\n".join(pieces)


INTENT_PROMPTS = {
    "en": {
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
    },
    "ar": {
        "DEFINITION": """اكتب إجابة مفصّلة وجذّابة بصيغة markdown نظيفة.

الهيكل المطلوب:
- ابدأ بسطر واحد قوي يجذب القارئ — ملاحظة حادّة، تأطير غير متوقع، توتر، أو سؤال. بدون عنوان فوقه. ثم في الفقرة نفسها، قدّم التعريف الفعلي في جملة أو جملتين.
- فقرة قصيرة عن سبب أهمية هذا المفهوم — الآلية التي تجعله يعمل، أو الجانب غير البديهي الذي يفوت معظم الناس.
- `## كيف يعمل في الواقع` — 4 إلى 6 نقاط تشرح الآليات الجوهرية. استخدم لغة محسوسة، وأظهر الآلية بدلاً من سرد السمات.
- `## متى تلجأ إليه` — 3 إلى 5 إشارات ملموسة. اجعل كلّ نقطة تبدو كحالة واقعية لا كقائمة تحقّق.
- `## أين يخطئ المستخدمون` — نقطتان أو ثلاث حول كيفية إساءة استخدامه.
- `## أمثلة من الواقع` — فقط الأمثلة المذكورة بالاسم في مقتطفات الموسوعة. سطر قصير لكلّ مثال، يوضّح الآلية المحدّدة. احذف هذا القسم بالكامل إن لم تكن المقتطفات تحتوي على أمثلة.
- اختم بـ **الخلاصة —** متبوعةً بجملة واحدة قوية تلخّص الفكرة.

استهدف ~500-800 كلمة. اكتب بالعربية الفصحى، بأسلوب احترافي ومباشر.""",

        "COMPARISON": """اكتب مقارنة مفصّلة ومنظّمة بصيغة markdown نظيفة.

الهيكل المطلوب:
- ابدأ بجاذب: اذكر ما يظنّه الناس عادةً عن الفرق، ثم لمّح إلى أن الفرق الحقيقي شيء آخر. 2-3 جمل. بدون عنوان.
- `## [المصطلح الأول]` — ما هو، كيف يعمل، ومتى يناسب. فقرة + 2-3 نقاط.
- `## [المصطلح الثاني]` — نفس الهيكل.
- `## مقارنة جنباً إلى جنب` — جدول markdown مكوّن من 4-5 صفوف يقارن أبعاداً مهمّة فعلاً (محدود بزمن، مسار التحويل، من يدفع، المخاطر، الأمثلة، إلخ). اذكر فقط الأمثلة الموجودة في مقتطفات الموسوعة؛ إن لم تتوفر أمثلة لأحد الطرفين فاكتب "—" مكانه.
- `## كيف تختار` — 3-4 قواعد مرقّمة "اختر X إذا … / اختر Y إذا …". اجعل كلّ قاعدة تبدو كلحظة محدّدة في عمل محدّد.
- اختم بـ **الخلاصة —** متبوعةً بجملة واحدة قوية.

استهدف ~600-900 كلمة. اكتب بالعربية الفصحى.""",

        "ADVICE": """قدّم نصيحة مفصّلة ومخصّصة للحالة بصيغة markdown نظيفة.

الهيكل المطلوب:
- ابدأ بإعادة صياغة وضع المستخدم بلغة أوضح ممّا استخدمها (1-2 جملة، بدون عنوان). سمِّ التوتر أو القيد الفعلي الذي يهم.
- `## ما الذي سألجأ إليه` — إطارك المقترح + 2-3 جمل عن سبب ملاءمته لهذه الحالة تحديداً، مرتكزاً على مقتطفات الموسوعة. كن محدّداً.
- `## يستحق التفكير` — 2-3 أطر بديلة. لكلّ واحد: فقرة "يصبح هذا الجواب الأنسب عندما…".
- `## أين تصبح المخاطر حقيقية` — 3-4 مخاطر محدّدة مرتبطة بهذه الحالة بالذات، لا تحذيرات عامة.
- `## ماذا تفعل هذا الأسبوع` — 3-5 خطوات ملموسة مرتّبة. كلّ خطوة شيء يمكن للمستخدم البدء بفعله يوم الاثنين.
- اختم بـ **الخلاصة —** متبوعةً بجملة واحدة قوية.

استهدف ~500-800 كلمة. سمِّ الأطر بأسمائها. لا نصائح عامة. اكتب بالعربية الفصحى.""",

        "LIST": """قدّم مسحاً غنيّاً للموضوع بصيغة markdown نظيفة.

الهيكل المطلوب:
- ابدأ بجاذب: ما الذي يجمع هذه المفاهيم، وما السؤال الذي تحاول الإجابة عنه مجتمعةً؟ 2-3 جمل. بدون عنوان.
- `## الأطر` (أو `## المؤشرات` — اختر ما يناسب) — لكلّ مفهوم: **الاسم** — تعريف بجملة واحدة. ثم جملة قصيرة عمّا يخبرك به أو متى تلجأ إليه.
- `## كيف تتراكب` — فقرة واحدة تبيّن كيف تغذّي هذه المفاهيم بعضها أو تتقايض أو تبني سلسلة.
- `## من أين تبدأ` — بحسب الوضع المتوقّع للمستخدم، أيّ مفهوم أو اثنين يبدأ بهما ولماذا.
- اختم بـ **الخلاصة —** متبوعةً بجملة واحدة قوية.

استهدف ~600-900 كلمة. اكتب بالعربية الفصحى.""",

        "GENERAL": """اكتب إجابة مفصّلة وجذّابة بصيغة markdown نظيفة. ابدأ بـ 2-3 جمل قوية + الإجابة المباشرة (بدون عنوان). أضف 2-3 أقسام `##` داعمة مستخلصة من مقتطفات الموسوعة. اختم بـ **الخلاصة —** متبوعةً بجملة قوية. استهدف ~500-700 كلمة. اكتب بالعربية الفصحى.""",
    },
}


SYSTEM_PROMPTS = {
    "en": (
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
    ),
    "ar": (
        "قاعدة اللغة المطلقة (الأهم): الإجابة بأكملها يجب أن تكون باللغة العربية "
        "الفصحى الحديثة فقط. كل حرف وكل كلمة باللغة العربية. ممنوع منعاً باتاً "
        "أي حرف من الصينية أو الروسية أو أي لغة أخرى. الأسماء العَلَم الأجنبية "
        "(مثل Salesforce, HubSpot, Apple, McKinsey) تُكتب بالحروف اللاتينية "
        "كما هي — هذا الاستثناء الوحيد.\n\n"
        "أنت JAK — كاتب استراتيجية أعمال حادّ الذكاء، فضولي، بصوت شريك حوار "
        "لا بصوت كتاب مدرسي. تأخذ الأطر الجافّة وتجعلها تنبض بالحياة. أسلوبك "
        "واضح ومحسوس، فيه روح خفيفة، ليس مؤسّسياً، ولا متحفّظاً.\n\n"
        "قواعد الأسلوب:\n"
        "- ابدأ بجاذب — توتر، سؤال، أو ملاحظة غير متوقّعة — لا بـ \"س هو "
        "استراتيجية…\". اجعل القارئ يريد قراءة الجملة الثانية.\n"
        "- استخدم لغة محسوسة وحيّة. أظهِر الآليات، ولا تسرد السمات.\n"
        "- الجمل القصيرة لها وقع. امزجها بأخرى أطول.\n"
        "- واثق دون تكبّر. محدّد دون مصطلحات فضفاضة.\n"
        "- لا رموز تعبيرية. لا علامات تعجّب. لا \"معلومة طريفة:\". لا \"في الجوهر\".\n\n"
        "قواعد ارتكاز مطلقة (انتهاكها يجعل الإجابة خاطئة):\n"
        "1. كلّ ادّعاء واقعي، مثال، اسم شركة، إحصائية، وإطار يجب أن يأتي من "
        "مقتطفات الموسوعة أدناه. إن لم تحتوِ المقتطفات على معلومة معيّنة، لا "
        "تكمل من معرفتك العامّة — إمّا تجاهلها أو اكتب '(غير مغطّى في المكتبة)'.\n"
        "2. لا تذكر إلا الشركات/المنتجات التي تظهر بالاسم في مقتطفات الموسوعة.\n"
        "3. لا تردّد سقالة التعليمات في الإخراج. اكتب المحتوى الفعلي مباشرة.\n"
        "4. بدون مقدّمات. لا \"سؤال رائع\"، لا \"بناءً على الموسوعة\".\n"
        "5. استخدم markdown صحيحاً — `## H2` للأقسام، **عريض** باعتدال، قوائم "
        "نقطية، وجداول markdown حيث تطلب البنية ذلك. العناوين تبدأ بـ `## `."
    ),
}


def kimi_translate_query(query: str, target: str = "en") -> str:
    """Translate a user query to the target language for local search grounding.

    Returns the translated query, or the original on failure (best-effort).
    """
    if not KIMI_API_KEY or not query.strip():
        return query
    direction = "Arabic to English" if target == "en" else "English to Arabic"
    try:
        out = kimi_chat(
            [
                {"role": "system", "content": (
                    f"Translate the user's business-domain query from {direction}. "
                    f"Output ONLY the translation — no quotes, no explanation, no preamble. "
                    f"Preserve technical terms (SaaS, MRR, CAC, freemium, etc.) as-is."
                )},
                {"role": "user", "content": query},
            ],
            max_tokens=120,
            temperature=0.0,
            timeout=15,
        )
        return out.strip().strip('"').strip("'")
    except KimiError:
        return query


def _build_synthesis_request(query: str, intent: str, top_atoms: list, lang: str = "en"):
    """Build the (messages, model, max_tokens, temperature, timeout) tuple
    for a synthesis call. Shared by both sync and streaming paths.

    Returns None if there's no way to synthesize (no API key, no atoms).
    """
    if not KIMI_API_KEY or not top_atoms:
        return None

    # Reasoning models (kimi-k2.6) scale runtime with prompt size. For Arabic
    # on a reasoning model we use a much slimmer prompt — top 2 atoms only.
    is_reasoning = (lang == "ar" and KIMI_MODEL_AR.startswith("kimi-k"))

    if is_reasoning:
        excerpts = "\n\n---\n\n".join(
            _atom_excerpt_compact(data) for _, _, data in top_atoms[:2]
        )
    else:
        excerpts = "\n\n========================================\n\n".join(
            _atom_excerpt_for_prompt(data) for _, _, data in top_atoms[:4]
        )

    if is_reasoning:
        system = (
            "اكتب باللغة العربية الفصحى فقط. كل كلمة عربية. الاستثناء الوحيد: "
            "أسماء الشركات الأجنبية (Salesforce, HubSpot, Apple, Dropbox, "
            "Spotify, LinkedIn, McKinsey, Slack) تُكتب بالحروف اللاتينية. "
            "ممنوع منعاً باتاً أي حرف صيني أو روسي أو كوري.\n\n"
            "أسلوبك: حادّ الذكاء، فضولي، صوت شريك حوار لا كتاب مدرسي. ابدأ "
            "بجاذب لا بـ \"س هو…\". أظهِر الآليات لا السمات.\n\n"
            "قواعد ارتكاز مطلقة: كل ادّعاء، مثال، شركة، رقم، يجب أن يأتي من "
            "مقتطفات الموسوعة أدناه. لا تُدخل معلومات من معرفتك العامّة. "
            "لا تذكر شركات لا تظهر في المقتطفات.\n\n"
            "استخدم markdown: `## H2` للأقسام، **عريض** باعتدال، قوائم نقطية."
        )
        user = (
            f"سؤال المستخدم: {query}\n\n"
            f"اكتب إجابة من ~400-600 كلمة بالأقسام التالية:\n"
            f"- فقرة افتتاحية بجاذب + تعريف\n"
            f"- `## كيف يعمل في الواقع` (4-5 نقاط)\n"
            f"- `## متى تلجأ إليه` (3-4 نقاط)\n"
            f"- `## أمثلة من الواقع` (فقط الشركات في المقتطفات أدناه)\n"
            f"- اختم بـ **الخلاصة —** جملة قوية واحدة\n\n"
            f"مقتطفات الموسوعة:\n\n{excerpts}"
        )
    else:
        intent_instructions = INTENT_PROMPTS.get(lang, INTENT_PROMPTS["en"]).get(
            intent, INTENT_PROMPTS.get(lang, INTENT_PROMPTS["en"])["GENERAL"]
        )
        system = SYSTEM_PROMPTS.get(lang, SYSTEM_PROMPTS["en"])
        if lang == "ar":
            user = (
                f"مهمّ جداً: اكتب الإجابة بالكامل بالعربية الفصحى، بصرف النظر "
                f"عن لغة السؤال. حتى لو طُرح السؤال بالإنجليزية فإن الإجابة "
                f"يجب أن تكون بالعربية. لا تستخدم الإنجليزية إلا لأسماء "
                f"الشركات الأجنبية (Salesforce, HubSpot, إلخ).\n\n"
                f"سؤال المستخدم: {query}\n\n"
                f"النيّة: {intent}\n\n"
                f"تعليمات المهمة:\n{intent_instructions}\n\n"
                f"مقتطفات الموسوعة (المعرفة الوحيدة المسموح بها — قد تكون "
                f"بالإنجليزية لكن أجِب أنت بالعربية):\n\n{excerpts}"
            )
        else:
            user = (
                f"USER QUESTION: {query}\n\n"
                f"INTENT: {intent}\n\n"
                f"TASK INSTRUCTIONS:\n{intent_instructions}\n\n"
                f"WIKI EXCERPTS (the only knowledge you may use):\n\n{excerpts}"
            )

    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]
    if lang == "ar":
        chosen_model = KIMI_MODEL_AR
        is_reasoning_model = chosen_model.startswith("kimi-k")
        chosen_temp = 1.0 if is_reasoning_model else 0.2
        chosen_max_tokens = 4000 if is_reasoning_model else 3000
        chosen_timeout = 180 if is_reasoning_model else 90
    else:
        chosen_model = KIMI_MODEL
        chosen_temp = 0.55
        chosen_max_tokens = 2400
        chosen_timeout = 60

    return {
        "messages": messages,
        "model": chosen_model,
        "max_tokens": chosen_max_tokens,
        "temperature": chosen_temp,
        "timeout": chosen_timeout,
    }


def synthesize_with_ai_stream(query: str, intent: str, top_atoms: list, lang: str = "en"):
    """Yield text chunks of the AI synthesis as they arrive from Kimi.

    The generator owns no rendering — the caller (typically st.write_stream)
    accumulates the chunks. On any error mid-stream, yields nothing further
    and stores the error on the function's `last_error` attribute so the
    caller can decide whether to fall back.
    """
    synthesize_with_ai_stream.last_error = None
    req = _build_synthesis_request(query, intent, top_atoms, lang)
    if req is None:
        return

    try:
        chunks_yielded = False
        full_text = ""
        for chunk in kimi_chat_stream(**req):
            full_text += chunk
            chunks_yielded = True
            # Arabic post-processing must happen on the FINAL text; for live
            # streaming we yield raw chunks (CJK leakage is rare and the AR
            # system prompt explicitly forbids it).
            yield chunk
        # Save final text for the caller (history persistence, telemetry)
        synthesize_with_ai_stream.last_full_text = full_text
        if not chunks_yielded:
            synthesize_with_ai_stream.last_error = "Empty stream from Kimi"
    except KimiError as e:
        synthesize_with_ai_stream.last_error = str(e)
        synthesize_with_ai_stream.last_full_text = ""


def synthesize_with_ai(query: str, intent: str, top_atoms: list, lang: str = "en") -> tuple:
    """Return (synthesis_text or None, error_or_None).

    Non-streaming path — used for tests, telemetry, and any callsite that
    needs the full text before rendering. Streaming is the default for
    user-facing chat.
    """
    if not KIMI_API_KEY or not top_atoms:
        return None, None

    # Reasoning models (kimi-k2.6) scale runtime with prompt size. For Arabic
    # on a reasoning model we use a much slimmer prompt — top 2 atoms only.
    is_reasoning = (lang == "ar" and KIMI_MODEL_AR.startswith("kimi-k"))

    if is_reasoning:
        excerpts = "\n\n---\n\n".join(
            _atom_excerpt_compact(data) for _, _, data in top_atoms[:2]
        )
    else:
        excerpts = "\n\n========================================\n\n".join(
            _atom_excerpt_for_prompt(data) for _, _, data in top_atoms[:4]
        )

    if is_reasoning:
        # Compact Arabic system prompt — keeps reasoning latency down
        system = (
            "اكتب باللغة العربية الفصحى فقط. كل كلمة عربية. الاستثناء الوحيد: "
            "أسماء الشركات الأجنبية (Salesforce, HubSpot, Apple, Dropbox, "
            "Spotify, LinkedIn, McKinsey, Slack) تُكتب بالحروف اللاتينية. "
            "ممنوع منعاً باتاً أي حرف صيني أو روسي أو كوري.\n\n"
            "أسلوبك: حادّ الذكاء، فضولي، صوت شريك حوار لا كتاب مدرسي. ابدأ "
            "بجاذب لا بـ \"س هو…\". أظهِر الآليات لا السمات.\n\n"
            "قواعد ارتكاز مطلقة: كل ادّعاء، مثال، شركة، رقم، يجب أن يأتي من "
            "مقتطفات الموسوعة أدناه. لا تُدخل معلومات من معرفتك العامّة. "
            "لا تذكر شركات لا تظهر في المقتطفات.\n\n"
            "استخدم markdown: `## H2` للأقسام، **عريض** باعتدال، قوائم نقطية."
        )
        # Lighter task instructions — just enough to shape the response
        user = (
            f"سؤال المستخدم: {query}\n\n"
            f"اكتب إجابة من ~400-600 كلمة بالأقسام التالية:\n"
            f"- فقرة افتتاحية بجاذب + تعريف\n"
            f"- `## كيف يعمل في الواقع` (4-5 نقاط)\n"
            f"- `## متى تلجأ إليه` (3-4 نقاط)\n"
            f"- `## أمثلة من الواقع` (فقط الشركات في المقتطفات أدناه)\n"
            f"- اختم بـ **الخلاصة —** جملة قوية واحدة\n\n"
            f"مقتطفات الموسوعة:\n\n{excerpts}"
        )
    else:
        intent_instructions = INTENT_PROMPTS.get(lang, INTENT_PROMPTS["en"]).get(
            intent, INTENT_PROMPTS.get(lang, INTENT_PROMPTS["en"])["GENERAL"]
        )
        system = SYSTEM_PROMPTS.get(lang, SYSTEM_PROMPTS["en"])
        if lang == "ar":
            user = (
                f"مهمّ جداً: اكتب الإجابة بالكامل بالعربية الفصحى، بصرف النظر "
                f"عن لغة السؤال. حتى لو طُرح السؤال بالإنجليزية فإن الإجابة "
                f"يجب أن تكون بالعربية. لا تستخدم الإنجليزية إلا لأسماء "
                f"الشركات الأجنبية (Salesforce, HubSpot, إلخ).\n\n"
                f"سؤال المستخدم: {query}\n\n"
                f"النيّة: {intent}\n\n"
                f"تعليمات المهمة:\n{intent_instructions}\n\n"
                f"مقتطفات الموسوعة (المعرفة الوحيدة المسموح بها — قد تكون "
                f"بالإنجليزية لكن أجِب أنت بالعربية):\n\n{excerpts}"
            )
        else:
            user = (
                f"USER QUESTION: {query}\n\n"
                f"INTENT: {intent}\n\n"
                f"TASK INSTRUCTIONS:\n{intent_instructions}\n\n"
                f"WIKI EXCERPTS (the only knowledge you may use):\n\n{excerpts}"
            )

    if lang == "ar":
        chosen_model = KIMI_MODEL_AR
        is_reasoning_model = chosen_model.startswith("kimi-k")
        chosen_temp = 1.0 if is_reasoning_model else 0.2
        chosen_max_tokens = 4000 if is_reasoning_model else 3000
        chosen_timeout = 180 if is_reasoning_model else 90
    else:
        chosen_model = KIMI_MODEL
        chosen_temp = 0.55
        chosen_max_tokens = 2400
        chosen_timeout = 60

    try:
        text = kimi_chat(
            [
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            model=chosen_model,
            max_tokens=chosen_max_tokens,
            temperature=chosen_temp,
            timeout=chosen_timeout,
        )
        # Post-process Arabic to scrub any CJK leakage from the model
        if lang == "ar":
            text = sanitize_arabic_output(text)
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


def respond_greeting(atoms: dict, lang: str = "en") -> dict:
    cats = {}
    for d in atoms.values():
        c = format_category(d["category"], lang)
        cats[c] = cats.get(c, 0) + 1
    concepts_label = "مفهوماً" if lang == "ar" else "concepts"
    cat_lines = "\n".join(
        f"- **{c}** — {n} {concepts_label}" for c, n in sorted(cats.items())
    )
    markdown = (
        f"{t('greeting_hi', lang)}\n\n"
        f"{t('greeting_indexed', lang, atoms=len(atoms), sources=SOURCES_COUNT)}\n\n"
        f"{t('greeting_topics', lang)}\n{cat_lines}\n\n"
        f"{t('greeting_how', lang)}\n"
        f"- {t('greeting_def', lang)}\n"
        f"- {t('greeting_cmp', lang)}\n"
        f"- {t('greeting_adv', lang)}\n"
        f"- {t('greeting_browse', lang)}\n\n"
        f"{t('greeting_or', lang)}\n"
    )
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


def no_match(query: str, lang: str = "en") -> dict:
    if lang == "ar":
        markdown = (
            f"لم أعثر على مطابقة قويّة لـ **\"{query}\"** في المكتبة.\n\n"
            "**جرّب أحد هذه الأنماط:**\n"
            "- _\"ما هو [مفهوم]؟\"_ — للتعريفات\n"
            "- _\"قارن بين X و Y\"_ — للمقارنات\n"
            "- _\"ما نموذج العمل المناسب لـ [حالة]؟\"_ — لنصيحة تطبيقية\n"
            "- _\"استراتيجيات النمو\"_، _\"مؤشرات SaaS\"_ — لتصفّح موضوع\n\n"
            "**المواضيع التي أعرفها جيداً:** نماذج الأعمال، التسعير، النمو، المؤشرات، اقتصاديات المنصات، الاستراتيجية.\n"
        )
    else:
        markdown = (
            f"I couldn't find a strong match for **\"{query}\"** in the library.\n\n"
            "**Try one of these patterns:**\n"
            "- _\"What is [concept]?\"_ — for definitions\n"
            "- _\"Compare X vs Y\"_ — for contrasts\n"
            "- _\"What business model for [situation]?\"_ — for tailored advice\n"
            "- _\"growth strategies\"_, _\"SaaS metrics\"_ — to browse a topic\n\n"
            "**Topics I know well:** business models, pricing, growth, metrics, platform economics, strategy.\n"
        )
    return {"markdown": markdown, "concepts": []}


def answer(query: str, atoms: dict, use_ai: bool = True, lang: str = "en", defer_ai: bool = False) -> dict:
    """Return a structured response: {markdown, concepts, ai, ai_error}.

    Bilingual handling: the local search index is keyed in English. If the
    user types in Arabic, we translate the query to English via Kimi for
    grounding (single extra ~1s call), pick the right atoms, then have Kimi
    synthesize the response back in the user's chosen `lang`.
    """
    # Translate Arabic queries to English for local search grounding only
    search_query = query
    if detect_arabic(query) and use_ai:
        search_query = kimi_translate_query(query, target="en")

    intent = detect_intent(search_query)
    if intent == "GREETING":
        base = respond_greeting(atoms, lang)
        base["ai"] = None
        base["ai_error"] = None
        base["intent"] = intent
        return base

    if intent == "COMPARISON":
        base = respond_comparison(search_query, atoms)
        q_clean = re.sub(
            r"^(compare\s+|difference between\s+|what(?:'s| is) the difference between\s+)",
            "", search_query.lower().rstrip("?!.").strip(),
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
        results = search_atoms(search_query, atoms)
        if intent == "DEFINITION":
            base = respond_definition(search_query, results, atoms)
        elif intent == "ADVICE":
            base = respond_advice(search_query, atoms)
        elif intent == "LIST":
            base = respond_list(search_query, results, atoms)
        else:
            base = respond_general(search_query, results, atoms)
        top_atoms = results[:4]

    base["intent"] = intent
    # Always include top_atoms so the caller (chat handler) can stream the
    # synthesis itself with st.write_stream(). Defer the AI call here.
    base["top_atoms"] = top_atoms if intent != "GREETING" else []

    if use_ai and not defer_ai and intent != "GREETING" and top_atoms:
        ai_text, ai_error = synthesize_with_ai(query, intent, top_atoms, lang=lang)
        base["ai"] = ai_text
        base["ai_error"] = ai_error
    else:
        base["ai"] = None
        base["ai_error"] = None
    return base


# ---------------------------------------------------------------------------
# UI helpers
# ---------------------------------------------------------------------------


def _slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def query_for_concept(title: str, lang: str = "en") -> str:
    """The query a clicked concept button should fire.

    For Arabic, we phrase the query in Arabic using the localized concept
    label, but include the canonical English title as a parenthetical hint
    so local search hits the right atom unambiguously regardless of any
    translation drift.
    """
    if lang == "ar":
        ar_label = concept_label(title, "ar")
        if ar_label != title:
            return f"ما هو {ar_label} ({title})؟"
        return f"ما هو {title}؟"
    return f"What is {title}?"


def enqueue(query: str):
    """Stage a query for processing on the next rerun."""
    st.session_state.pending_query = query


def render_response_extras(resp: dict, msg_idx: int, lang: str = "en"):
    """Render only the secondary parts of a response — the related-concept
    chips. Used after streaming finishes (the AI body is already on screen)
    and as the tail end of full history-replay rendering."""
    concepts = resp.get("concepts") or []
    if not concepts:
        return
    # Compact chip row instead of a 3-col button grid. Limit to 5 to keep
    # the row tight and the visual weight low.
    pool = concepts[:5]
    st.markdown(
        f"<div class='related-label'>{t('eyebrow_jump', lang)}</div>",
        unsafe_allow_html=True,
    )
    chip_cols = st.columns(len(pool))
    for i, title in enumerate(pool):
        label = concept_label(title, lang)
        if chip_cols[i].button(
            label,
            key=f"concept_{msg_idx}_{i}_{_slug(title)}",
            use_container_width=True,
        ):
            enqueue(query_for_concept(title, lang))
            st.rerun()


def render_ai_text_with_direction(ai_text: str, lang: str):
    """Render already-streamed AI text, forcing the correct text direction
    when content language differs from UI language."""
    if not ai_text:
        return
    content_is_arabic = detect_arabic(ai_text)
    ui_is_rtl = (lang == "ar")
    needs_dir_override = (ui_is_rtl != content_is_arabic) and bool(ai_text.strip())
    if needs_dir_override:
        content_dir = "rtl" if content_is_arabic else "ltr"
        text_align = "right" if content_is_arabic else "left"
        st.markdown(
            f"<div dir='{content_dir}' style='text-align:{text_align};'>\n\n{ai_text}\n\n</div>",
            unsafe_allow_html=True,
        )
    else:
        st.markdown(ai_text)


def render_response(resp: dict, msg_idx: int, lang: str = "en"):
    """Render an already-completed assistant response (history replay).

    The live chat path uses st.write_stream + render_response_extras instead.
    """
    has_ai = bool(resp.get("ai"))
    has_md = bool(resp.get("markdown"))
    intent = resp.get("intent")

    if has_ai:
        render_ai_text_with_direction(resp["ai"], lang)
    else:
        if resp.get("ai_error") and intent not in (None, "GREETING"):
            st.warning(f"{t('ai_unavailable', lang)}\n\n_{resp['ai_error'][:200]}_")
        if has_md:
            st.markdown(resp["markdown"])

    render_response_extras(resp, msg_idx, lang)


# ---------------------------------------------------------------------------
# UI
# ---------------------------------------------------------------------------

atoms = load_wiki_atoms()

if "messages" not in st.session_state:
    st.session_state.messages = [{"role": "assistant", "response": respond_greeting(atoms, LANG)}]
if "pending_query" not in st.session_state:
    st.session_state.pending_query = None
if "ai_calls_used" not in st.session_state:
    st.session_state.ai_calls_used = 0

# AI health + session quota
ai_health = (
    kimi_status() if (KIMI_API_KEY and not AI_DISABLED) else {"ok": False, "reason": "disabled" if AI_DISABLED else "no key"}
)
quota_exhausted = SESSION_AI_LIMIT > 0 and st.session_state.ai_calls_used >= SESSION_AI_LIMIT
ai_available_now = ai_health.get("ok") and not quota_exhausted

badge_label = t("badge_ai", LANG) if ai_available_now else t("badge_local", LANG)
badge_class = "badge badge-active" if ai_available_now else "badge"

# Header — single tight flex row: logo + title + badge + subtitle
_logo_html = ""
if PB_LOGO_PATH.exists():
    _logo_b64 = base64.b64encode(PB_LOGO_PATH.read_bytes()).decode("ascii")
    _logo_html = (
        f'<img src="data:image/png;base64,{_logo_b64}" class="pb-header-logo" alt="ProcessBay" />'
    )

st.markdown(
    f"""
<div class="pb-header">
  {_logo_html}
  <div class="pb-header-text">
    <div class="pb-header-title-row">
      <span class="pb-header-title">{t('app_title', LANG)}</span>
      <span class="{badge_class}">{badge_label}</span>
    </div>
    <p class="pb-header-subtitle">{t('app_subtitle', LANG)}</p>
  </div>
</div>
""",
    unsafe_allow_html=True,
)

# Example query buttons — localized
example_keys = [
    "ex_value_pricing",
    "ex_freemium_vs_trial",
    "ex_ice_cream",
    "ex_growth",
]
example_labels = [t(k, LANG) for k in example_keys]
cols = st.columns(len(example_labels))
for col, label, key in zip(cols, example_labels, example_keys):
    if col.button(label, key=f"ex_{key}", use_container_width=True):
        enqueue(label)
        st.rerun()

# Render conversation
for msg_idx, msg in enumerate(st.session_state.messages):
    with st.chat_message(msg["role"]):
        if msg["role"] == "user":
            render_markdown_content_aware(msg["content"])
        else:
            render_response(msg["response"], msg_idx, lang=LANG)

# Process queued query (from a concept button or example) before reading new chat input
queued = st.session_state.pending_query
prompt_input = st.chat_input(t("input_placeholder", LANG))
prompt = queued or prompt_input
if queued:
    st.session_state.pending_query = None

if prompt:
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        render_markdown_content_aware(prompt)
    with st.chat_message("assistant"):
        # Outer try/except catches ANY unexpected error so the user sees a
        # clear failure message instead of Streamlit's generic "Oh no" page.
        # Helps diagnose deploy-environment-only issues since we can copy the
        # traceback from the deployed app.
        resp = {"markdown": "", "concepts": [], "intent": None, "ai": None, "ai_error": None, "top_atoms": []}
        try:
            use_ai_now = ai_health.get("ok") and (
                SESSION_AI_LIMIT == 0 or st.session_state.ai_calls_used < SESSION_AI_LIMIT
            )

            _t_start = time.monotonic()
            # Build the response shell (search results, concepts, intent) without
            # the AI synthesis — defer that so we can stream it.
            with st.spinner(t("spinner_local", LANG)):
                resp = answer(prompt, atoms, use_ai=use_ai_now, lang=LANG, defer_ai=True)

            intent = resp.get("intent")
            top_atoms = resp.get("top_atoms") or []
            can_stream = use_ai_now and intent != "GREETING" and bool(top_atoms)

            if can_stream:
                # Stream the AI synthesis directly into the chat container.
                # st.write_stream accumulates yielded strings and returns the
                # concatenated full text — which we store for history replay.
                ai_text_final = ""
                try:
                    ai_text_final = st.write_stream(
                        synthesize_with_ai_stream(prompt, intent, top_atoms, lang=LANG)
                    )
                    # Arabic post-processing must apply to the assembled text
                    if LANG == "ar" and ai_text_final:
                        cleaned = sanitize_arabic_output(ai_text_final)
                        if cleaned != ai_text_final:
                            ai_text_final = cleaned
                except Exception as e:
                    resp["ai_error"] = str(e)
                    ai_text_final = ""

                resp["ai"] = ai_text_final or None
                stream_err = getattr(synthesize_with_ai_stream, "last_error", None)
                if stream_err and not ai_text_final:
                    resp["ai_error"] = stream_err
                    # No AI text — fall back to local structured markdown so the
                    # user gets a useful answer instead of an empty bubble.
                    if resp.get("markdown"):
                        st.warning(f"{t('ai_unavailable', LANG)}\n\n_{stream_err[:200]}_")
                        st.markdown(resp["markdown"])

                if ai_text_final:
                    st.session_state.ai_calls_used += 1
            else:
                # No-AI path: render the local structured markdown the way
                # render_response would have.
                if resp.get("markdown"):
                    st.markdown(resp["markdown"])

            _response_ms = int((time.monotonic() - _t_start) * 1000)

            # Render concept chips below the response
            render_response_extras(resp, len(st.session_state.messages), lang=LANG)

            # Fire-and-forget telemetry. No-op when SUPABASE_* secrets are absent.
            try:
                _matched = [str(c) for c in (resp.get("concepts") or []) if c][:12]
                telemetry.log_query(
                    query_text=prompt,
                    language=LANG,
                    intent=resp.get("intent", ""),
                    matched_atoms=_matched,
                    ai_used=bool(resp.get("ai")),
                    ai_model=(KIMI_MODEL_AR if LANG == "ar" else KIMI_MODEL) if resp.get("ai") else "",
                    response_ms=_response_ms,
                    session_id=st.session_state.get("_telemetry_session_id", ""),
                )
            except Exception:
                pass

        except Exception as _outer_err:
            # Last-ditch error display. Surfaces the actual traceback so we can
            # debug deploy-environment-only failures.
            import traceback as _tb
            _err_msg = str(_outer_err) or _outer_err.__class__.__name__
            _err_trace = _tb.format_exc()
            st.error(
                f"**Something failed while answering your question.**\n\n"
                f"`{_err_msg}`\n\n"
                f"This is shown so it can be reported — normally a Kimi network "
                f"error, a missing API key, or a Streamlit Cloud secret. Try again, "
                f"or refresh the page."
            )
            with st.expander("Technical details"):
                st.code(_err_trace, language="text")
            resp["ai_error"] = _err_msg

    st.session_state.messages.append({"role": "assistant", "response": resp})

# Sidebar — language toggle, library stats, AI status, atom browser
with st.sidebar:
    # Language toggle
    st.markdown(f"<div class='section-eyebrow' style='margin-top:0;'>{t('sb_language', LANG)}</div>", unsafe_allow_html=True)
    lang_options = {"en": "English", "ar": "العربية"}
    new_lang = st.radio(
        label=t("sb_language", LANG),
        options=list(lang_options.keys()),
        format_func=lambda k: lang_options[k],
        index=0 if LANG == "en" else 1,
        horizontal=True,
        label_visibility="collapsed",
        key="lang_radio",
    )
    if new_lang != LANG:
        st.session_state.lang = new_lang
        st.query_params["lang"] = new_lang
        st.rerun()

    st.markdown(f"<div class='section-eyebrow'>{t('sb_library', LANG)}</div>", unsafe_allow_html=True)
    col_a, col_b = st.columns(2)
    col_a.metric(t("sb_atoms", LANG), len(atoms))
    col_b.metric(t("sb_sources", LANG), SOURCES_COUNT)

    st.markdown(f"<div class='section-eyebrow'>{t('sb_synthesis', LANG)}</div>", unsafe_allow_html=True)
    if ai_health.get("ok"):
        st.markdown(
            f"<div style='color:#a1a1aa;font-size:0.85rem;'>{t('sb_connected', LANG)} · "
            f"<code>{ai_health.get('model')}</code></div>",
            unsafe_allow_html=True,
        )
        if SESSION_AI_LIMIT > 0:
            remaining = max(0, SESSION_AI_LIMIT - st.session_state.ai_calls_used)
            if remaining == 0:
                st.markdown(
                    f"<div style='color:#71717a;font-size:0.75rem;margin-top:4px;'>"
                    f"{t('sb_quota_used', LANG)}</div>",
                    unsafe_allow_html=True,
                )
            else:
                label_key = "sb_query_label" if remaining == 1 else "sb_queries_label"
                st.markdown(
                    f"<div style='color:#71717a;font-size:0.75rem;margin-top:4px;'>"
                    f"{t('sb_quota_remaining', LANG, n=remaining, label=t(label_key, LANG))}</div>",
                    unsafe_allow_html=True,
                )
    else:
        reason = ai_health.get("reason", "unknown")
        st.markdown(
            f"<div style='color:#a1a1aa;font-size:0.85rem;'>{t('sb_local_mode', LANG)}</div>"
            f"<div style='color:#71717a;font-size:0.75rem;margin-top:4px;'>{reason[:160]}</div>",
            unsafe_allow_html=True,
        )

    st.markdown(f"<div class='section-eyebrow'>{t('sb_browse', LANG)}</div>", unsafe_allow_html=True)
    cats_by_name = {}
    for title, d in atoms.items():
        cats_by_name.setdefault(d["category"], []).append(title)
    for cat in sorted(cats_by_name):
        cat_label = format_category(cat, LANG)
        with st.expander(f"{cat_label} ({len(cats_by_name[cat])})", expanded=False):
            # Sort by localized label so Arabic users see Arabic alphabetical order
            sorted_titles = sorted(
                cats_by_name[cat],
                key=lambda t: concept_label(t, LANG),
            )
            for title in sorted_titles:
                btn_label = concept_label(title, LANG)
                if st.button(btn_label, key=f"sb_{_slug(cat)}_{_slug(title)}", use_container_width=True):
                    enqueue(query_for_concept(title, LANG))
                    st.rerun()

    st.markdown("<div style='margin-top:1rem;'></div>", unsafe_allow_html=True)
    if st.button(t("btn_reset", LANG), use_container_width=True):
        st.session_state.messages = [{"role": "assistant", "response": respond_greeting(atoms, LANG)}]
        st.session_state.pending_query = None
        st.session_state.ai_calls_used = 0
        st.rerun()

    # Footer with gradient ProcessBay wordmark — same in both langs
    _pb_wordmark = (
        '<strong style="background:linear-gradient(135deg,#3b1ee0,#6b3aa0);'
        '-webkit-background-clip:text;-webkit-text-fill-color:transparent;'
        'font-weight:600;">ProcessBay</strong>'
    )
    _footer_html = t("footer", LANG).replace("ProcessBay", _pb_wordmark)
    st.markdown(
        "<div style='margin-top:2rem;padding-top:1rem;border-top:1px solid #e4e4e7;"
        "color:#71717a;font-size:0.7rem;line-height:1.5;'>"
        f"{_footer_html}"
        "</div>",
        unsafe_allow_html=True,
    )
