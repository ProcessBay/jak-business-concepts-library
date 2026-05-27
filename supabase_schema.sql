-- ============================================================================
-- JAK Business Concepts Library — telemetry schema
-- ----------------------------------------------------------------------------
-- Run this once in the Supabase SQL editor for the project that backs the bot.
-- Idempotent — safe to re-run; nothing is dropped.
--
-- Storage: ~50 bytes per row average → 500 MB free tier ≈ 10M queries headroom.
-- No PII: session_hash is a one-way SHA256 truncation of the Streamlit session
-- id, not reversible to a user.
-- ============================================================================

create table if not exists public.query_log (
  id            bigserial primary key,
  ts            timestamptz not null default now(),
  session_hash  text,                -- truncated SHA256, not reversible
  language      text,                -- 'en' | 'ar'
  intent        text,                -- DEFINITION | COMPARISON | ADVICE | LIST | GREETING | GENERAL
  query_text    text,                -- raw user query (the IP)
  matched_atoms text[],              -- titles of top atoms shown
  match_count   int,                 -- 0 ⇒ not_covered
  ai_used       boolean,
  ai_model      text,
  not_covered   boolean,
  response_ms   int,
  app_version   text
);

create index if not exists idx_query_log_ts       on public.query_log (ts desc);
create index if not exists idx_query_log_language on public.query_log (language);
create index if not exists idx_query_log_intent   on public.query_log (intent);
create index if not exists idx_query_log_notcov   on public.query_log (not_covered);

-- ----------------------------------------------------------------------------
-- Row-level security: lock down reads/writes to service_role + a write-only
-- anon insert policy. The Streamlit app uses the anon key, which can ONLY
-- insert — it cannot read anything back. The service_role key (kept private,
-- used in the Supabase dashboard / SQL editor only) reads the reports.
-- ----------------------------------------------------------------------------

alter table public.query_log enable row level security;

drop policy if exists "anon can insert telemetry" on public.query_log;
create policy "anon can insert telemetry"
  on public.query_log
  for insert
  to anon
  with check (true);

-- No SELECT policy for anon ⇒ anon key cannot read query_log at all.

-- ============================================================================
-- Reporting views — query these from Supabase SQL editor or a future admin UI.
-- ============================================================================

create or replace view public.query_log_weekly as
select
  date_trunc('week', ts)             as week,
  language,
  count(*)                           as queries,
  count(*) filter (where not_covered) as not_covered,
  count(*) filter (where ai_used)     as ai_assisted,
  count(distinct session_hash)        as sessions
from public.query_log
group by 1, 2
order by 1 desc, 2;

create or replace view public.top_queries_30d as
select
  lower(trim(query_text)) as query_text,
  language,
  count(*)                as n,
  sum(case when not_covered then 1 else 0 end) as n_not_covered,
  max(ts)                 as last_asked
from public.query_log
where ts >= now() - interval '30 days'
  and query_text is not null
  and length(trim(query_text)) > 0
group by 1, 2
order by n desc
limit 200;

create or replace view public.top_gaps_30d as
-- Questions the library could not answer — these are the editorial backlog
-- and the seeds for the quarterly "what KSA founders actually ask" report.
select
  lower(trim(query_text)) as query_text,
  language,
  count(*)                as n,
  max(ts)                 as last_asked
from public.query_log
where not_covered
  and ts >= now() - interval '30 days'
  and query_text is not null
  and length(trim(query_text)) > 0
group by 1, 2
order by n desc
limit 100;

create or replace view public.intent_mix_30d as
select
  intent,
  language,
  count(*) as n,
  round(100.0 * count(*) / sum(count(*)) over (partition by language), 1) as pct_of_lang
from public.query_log
where ts >= now() - interval '30 days'
group by 1, 2
order by language, n desc;

create or replace view public.atoms_referenced_30d as
-- Which atoms actually got surfaced in responses — tells you which knowledge
-- pulls weight and which is dead weight.
select
  unnest(matched_atoms) as atom,
  count(*)              as times_surfaced
from public.query_log
where ts >= now() - interval '30 days'
  and matched_atoms is not null
group by 1
order by times_surfaced desc;
