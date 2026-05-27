"""
JAK Business Concepts Library — telemetry module.

Logs each user query to a Supabase Postgres table via the PostgREST REST API.
Stdlib-only (urllib + threading + hashlib) — no new dependencies.

Design constraints:
  * Fire-and-forget. A telemetry write MUST NEVER block, slow, or crash the
    user-facing response. Every call returns immediately; the HTTP POST runs
    on a background daemon thread that swallows all exceptions.
  * No PII. session_hash is a one-way truncated SHA256 of the Streamlit
    session id, not reversible to a user. We do not capture IP or user agent.
  * Kill-switchable. If TELEMETRY_ENABLED is anything other than truthy, or
    if SUPABASE_URL / SUPABASE_ANON_KEY are missing, logging is a no-op.
  * Anon-key only. The Streamlit app holds the anon key, which (per the SQL
    schema) can INSERT into query_log but cannot SELECT from it. The service
    role key never lives in this codebase.

Configuration (env vars or Streamlit secrets, in that order):
  SUPABASE_URL        — e.g. https://abcdefgh.supabase.co
  SUPABASE_ANON_KEY   — the public 'anon' API key for the Supabase project
  TELEMETRY_ENABLED   — "1" | "true" | "yes" to enable; default "1"
  APP_VERSION         — optional string written into each row

Usage:
  from telemetry import log_query
  log_query(
      query_text="what is freemium",
      language="en",
      intent="DEFINITION",
      matched_atoms=["Freemium Business Model", "Penny Gap"],
      ai_used=True,
      ai_model="moonshot-v1-auto",
      response_ms=842,
      session_id=st.session_state.get("_session_id", ""),
  )
"""

from __future__ import annotations

import hashlib
import json
import os
import threading
import urllib.error
import urllib.request
from typing import Iterable, Optional


# ---------------------------------------------------------------------------
# Config resolution — mirrors app._secret() so behaviour is consistent.
# ---------------------------------------------------------------------------

def _secret(key: str, default: str = "") -> str:
    """Read from Streamlit secrets first, then env. Mirrors app._secret()."""
    try:
        import streamlit as st  # local import; module must be safe outside Streamlit
        try:
            if key in st.secrets:
                return str(st.secrets[key]).strip()
        except Exception:
            pass
    except Exception:
        pass
    return os.environ.get(key, default).strip()


def _truthy(value: str) -> bool:
    return value.lower() in ("1", "true", "yes", "on")


# Resolved once at import time. Cheap — these are short strings.
SUPABASE_URL: str = _secret("SUPABASE_URL", "").rstrip("/")
SUPABASE_ANON_KEY: str = _secret("SUPABASE_ANON_KEY", "")
TELEMETRY_ENABLED: bool = _truthy(_secret("TELEMETRY_ENABLED", "1"))
APP_VERSION: str = _secret("APP_VERSION", "")


def is_configured() -> bool:
    """True when telemetry can actually write. Use from app.py for diagnostics."""
    return TELEMETRY_ENABLED and bool(SUPABASE_URL) and bool(SUPABASE_ANON_KEY)


# ---------------------------------------------------------------------------
# Privacy: session-id hashing
# ---------------------------------------------------------------------------

def hash_session(session_id: str) -> str:
    """One-way hash a session id. Truncated to 12 hex chars (48 bits) —
    enough to count distinct sessions for analytics, not enough to reverse."""
    if not session_id:
        return ""
    return hashlib.sha256(session_id.encode("utf-8")).hexdigest()[:12]


# ---------------------------------------------------------------------------
# Background writer
# ---------------------------------------------------------------------------

_INSERT_TIMEOUT_SEC = 4.0  # generous; the thread is daemonised anyway


def _post_row(row: dict) -> None:
    """Synchronously POST one row to the Supabase REST endpoint.
    Runs on a daemon thread; any exception is swallowed by _safe_post."""
    url = f"{SUPABASE_URL}/rest/v1/query_log"
    body = json.dumps(row).encode("utf-8")
    req = urllib.request.Request(
        url=url,
        data=body,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
            # Prefer=return=minimal — don't ship the inserted row back, saves bytes
            "Prefer": "return=minimal",
        },
    )
    # urlopen returns a context manager; we read+discard to free the socket.
    with urllib.request.urlopen(req, timeout=_INSERT_TIMEOUT_SEC) as resp:
        resp.read()


def _safe_post(row: dict) -> None:
    """Thread target. Swallows every exception so a misconfigured Supabase
    project, network blip, or DNS failure can never surface to the user."""
    try:
        _post_row(row)
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, OSError, ValueError):
        # Intentionally silent. Telemetry must never break the app.
        pass
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def log_query(
    *,
    query_text: str,
    language: str,
    intent: str,
    matched_atoms: Optional[Iterable[str]] = None,
    ai_used: bool = False,
    ai_model: str = "",
    response_ms: int = 0,
    session_id: str = "",
    not_covered: Optional[bool] = None,
) -> None:
    """Log a single query. Returns immediately; the write happens on a
    background daemon thread. Safe to call from anywhere, including inside
    a Streamlit rerun loop. All errors are swallowed silently.

    `not_covered` is auto-derived from matched_atoms when not supplied:
    an empty / None matched_atoms list implies the library couldn't answer.
    """
    if not is_configured():
        return

    # Defensive normalisation — don't trust callers.
    atoms_list = [str(a) for a in (matched_atoms or []) if a]
    match_count = len(atoms_list)
    if not_covered is None:
        not_covered = (match_count == 0)

    # Trim very long queries to keep DB rows cheap. 4 KB is generous.
    text = (query_text or "")[:4000]

    row = {
        "session_hash": hash_session(session_id),
        "language": (language or "")[:8] or None,
        "intent": (intent or "")[:32] or None,
        "query_text": text,
        "matched_atoms": atoms_list,
        "match_count": match_count,
        "ai_used": bool(ai_used),
        "ai_model": (ai_model or "")[:64] or None,
        "not_covered": bool(not_covered),
        "response_ms": int(response_ms) if response_ms else 0,
        "app_version": APP_VERSION or None,
    }

    t = threading.Thread(target=_safe_post, args=(row,), daemon=True)
    t.start()
