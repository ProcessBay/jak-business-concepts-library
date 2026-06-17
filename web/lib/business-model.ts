"use client";

/**
 * The central business plan — the "consolidated model."
 *
 * Distinct from the business PROFILE (who you are, drives personalization).
 * The PLAN is what you've DECIDED to do: concepts you've cemented, each
 * captured as { concept → what we'll do → which strategic pillar it affects }.
 *
 * Organized around eight strategic PILLARS — not just the Business Model
 * Canvas — so the plan covers the whole picture: strategy, customers, the
 * business model itself, pricing, go-to-market, growth, metrics, and moat.
 * The pillars map onto the library's own categories so cementing routes
 * naturally.
 *
 * Stored in localStorage (browser-first). Interface is sync-ready so a cloud
 * backend can be layered underneath later without changing callers.
 */

export const PLAN_SECTIONS = [
  {
    id: "strategy",
    label: "Strategy & Positioning",
    hint: "Your vision, value proposition, and why you win",
    prompt: "What's our sharpest positioning and differentiation?",
  },
  {
    id: "customers",
    label: "Customers",
    hint: "Who you serve and the jobs they hire you for",
    prompt: "Who exactly should we focus on, and what do they really need?",
  },
  {
    id: "business-model",
    label: "Business Model",
    hint: "How you create, deliver, and capture value",
    prompt: "What business model best fits our business?",
  },
  {
    id: "pricing",
    label: "Pricing & Monetization",
    hint: "How you charge, package, and capture value",
    prompt: "How should we price and package our offering?",
  },
  {
    id: "gtm",
    label: "Go-to-Market",
    hint: "How you reach the market and land customers",
    prompt: "What go-to-market motion should we use?",
  },
  {
    id: "growth",
    label: "Growth",
    hint: "Your engine for acquisition, retention, and referral",
    prompt: "Which growth lever should we bet on first?",
  },
  {
    id: "metrics",
    label: "Metrics & Unit Economics",
    hint: "The numbers that tell you it's working",
    prompt: "Which metrics and unit economics should we track?",
  },
  {
    id: "moat",
    label: "Moat & Defensibility",
    hint: "Why competitors can't easily copy you",
    prompt: "How do we build a durable competitive moat?",
  },
] as const;

export type SectionId = (typeof PLAN_SECTIONS)[number]["id"];

export const SECTION_LABEL: Record<SectionId, string> = Object.fromEntries(
  PLAN_SECTIONS.map((s) => [s.id, s.label])
) as Record<SectionId, string>;

/** Best-guess pillar from an atom's category, used to pre-select the section
 *  when cementing. The user can always override. */
export function suggestSection(category?: string): SectionId {
  switch (category) {
    case "strategy":
      return "strategy";
    case "business-models":
      return "business-model";
    case "platform-economics":
      return "moat";
    case "pricing":
      return "pricing";
    case "growth":
      return "growth";
    case "metrics":
      return "metrics";
    case "frameworks":
      return "business-model";
    case "tools":
      return "gtm";
    default:
      return "strategy";
  }
}

// Legacy Business Model Canvas areas → new pillars, so anything cemented
// before this restructure still slots in correctly.
const LEGACY_AREA_TO_SECTION: Record<string, SectionId> = {
  "value-proposition": "strategy",
  "customer-segments": "customers",
  channels: "gtm",
  "customer-relationships": "growth",
  "revenue-streams": "business-model",
  "key-resources": "business-model",
  "key-activities": "business-model",
  "key-partners": "business-model",
  "cost-structure": "business-model",
};

export interface CementedDecision {
  id: string;
  conceptSlug?: string;
  conceptTitle: string;
  conceptCategory?: string;
  section: SectionId;
  /** "What we'll do" — the concrete commitment. */
  decision: string;
  /** Optional supporting detail / excerpt of the advice. */
  rationale?: string;
  createdAt: string;
}

export interface BusinessModel {
  version: 2;
  decisions: CementedDecision[];
  updatedAt: string;
}

const KEY = "jak-business-model";
const listeners = new Set<() => void>();

const EMPTY: BusinessModel = { version: 2, decisions: [], updatedAt: "" };

let cachedRaw: string | null = null;
let cachedModel: BusinessModel = EMPTY;

const SECTION_IDS = new Set<string>(PLAN_SECTIONS.map((s) => s.id));

/** Normalize a stored decision: migrate legacy `area` to `section`. */
function normalizeDecision(d: Record<string, unknown>): CementedDecision {
  let section = d.section as string | undefined;
  if (!section || !SECTION_IDS.has(section)) {
    const legacy = d.area as string | undefined;
    section = (legacy && LEGACY_AREA_TO_SECTION[legacy]) || "strategy";
  }
  return {
    id: String(d.id ?? Math.random().toString(36).slice(2, 10)),
    conceptSlug: d.conceptSlug as string | undefined,
    conceptTitle: String(d.conceptTitle ?? "Decision"),
    conceptCategory: d.conceptCategory as string | undefined,
    section: section as SectionId,
    decision: String(d.decision ?? ""),
    rationale: d.rationale as string | undefined,
    createdAt: String(d.createdAt ?? new Date().toISOString()),
  };
}

export function getModel(): BusinessModel {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedModel;
    cachedRaw = raw;
    if (!raw) {
      cachedModel = EMPTY;
      return cachedModel;
    }
    const parsed = JSON.parse(raw) as { decisions?: Record<string, unknown>[] };
    cachedModel = {
      version: 2,
      decisions: (parsed.decisions ?? []).map(normalizeDecision),
      updatedAt: (parsed as { updatedAt?: string }).updatedAt ?? "",
    };
    return cachedModel;
  } catch {
    return EMPTY;
  }
}

function write(model: BusinessModel) {
  if (typeof window === "undefined") return;
  model.updatedAt = new Date().toISOString();
  localStorage.setItem(KEY, JSON.stringify(model));
  listeners.forEach((fn) => fn());
}

export function subscribeModel(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().slice(0, 8);
  }
  return Math.random().toString(36).slice(2, 10);
}

export function addDecision(
  d: Omit<CementedDecision, "id" | "createdAt">
): CementedDecision {
  const current = getModel();
  const decision: CementedDecision = {
    ...d,
    id: newId(),
    createdAt: new Date().toISOString(),
  };
  write({ ...current, decisions: [...current.decisions, decision] });
  return decision;
}

export function updateDecision(id: string, patch: Partial<CementedDecision>) {
  const model = getModel();
  write({
    ...model,
    decisions: model.decisions.map((d) =>
      d.id === id ? { ...d, ...patch } : d
    ),
  });
}

export function removeDecision(id: string) {
  const model = getModel();
  write({ ...model, decisions: model.decisions.filter((d) => d.id !== id) });
}

export function clearModel() {
  write({ ...EMPTY });
}

export function decisionsBySection(
  model: BusinessModel
): Record<SectionId, CementedDecision[]> {
  const out = Object.fromEntries(
    PLAN_SECTIONS.map((s) => [s.id, [] as CementedDecision[]])
  ) as Record<SectionId, CementedDecision[]>;
  for (const d of model.decisions) out[d.section].push(d);
  return out;
}

/** Plain-text export of the whole plan — for the copy button and, later,
 *  feeding back into the AI as grounding for a "review my whole plan" pass. */
export function modelToText(model: BusinessModel): string {
  if (!model.decisions.length) return "";
  const bySection = decisionsBySection(model);
  const lines: string[] = ["MY BUSINESS PLAN", ""];
  for (const section of PLAN_SECTIONS) {
    const items = bySection[section.id];
    if (!items.length) continue;
    lines.push(`## ${section.label}`);
    for (const d of items) {
      lines.push(
        `- ${d.decision}${d.conceptTitle ? ` (via ${d.conceptTitle})` : ""}`
      );
    }
    lines.push("");
  }
  return lines.join("\n").trim();
}
