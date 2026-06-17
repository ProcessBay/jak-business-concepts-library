"use client";

/**
 * The central business model — the "consolidated plan."
 *
 * This is distinct from the business PROFILE (who you are, drives answer
 * personalization). The MODEL is what you've DECIDED to do: concepts you've
 * cemented, each captured as { concept → what we'll do → which part of the
 * model it affects }. Concepts are organized on a Business Model Canvas
 * spine — the canonical "detailed business model" structure (and itself a
 * concept in the library).
 *
 * Stored in localStorage only (browser-first). The interface is designed so a
 * cloud-sync backend can be layered underneath later without changing callers.
 */

export const CANVAS_AREAS = [
  {
    id: "value-proposition",
    label: "Value Proposition",
    hint: "The problem you solve and why customers choose you",
  },
  {
    id: "customer-segments",
    label: "Customer Segments",
    hint: "Who you serve",
  },
  {
    id: "channels",
    label: "Channels",
    hint: "How you reach and deliver to customers",
  },
  {
    id: "customer-relationships",
    label: "Customer Relationships",
    hint: "How you win, keep, and grow customers",
  },
  {
    id: "revenue-streams",
    label: "Revenue Streams",
    hint: "How you make money",
  },
  {
    id: "key-resources",
    label: "Key Resources",
    hint: "The assets your model depends on",
  },
  {
    id: "key-activities",
    label: "Key Activities",
    hint: "The things you must do well",
  },
  {
    id: "key-partners",
    label: "Key Partners",
    hint: "Who you rely on outside the business",
  },
  {
    id: "cost-structure",
    label: "Cost Structure",
    hint: "Your major costs",
  },
] as const;

export type CanvasAreaId = (typeof CANVAS_AREAS)[number]["id"];

export const CANVAS_LABEL: Record<CanvasAreaId, string> = Object.fromEntries(
  CANVAS_AREAS.map((a) => [a.id, a.label])
) as Record<CanvasAreaId, string>;

/** Best-guess canvas area from an atom's category, used to pre-select the
 *  area when cementing. The user can always override. */
export function suggestArea(category?: string): CanvasAreaId {
  switch (category) {
    case "pricing":
      return "revenue-streams";
    case "growth":
      return "channels";
    case "metrics":
      return "customer-relationships";
    case "platform-economics":
      return "key-partners";
    case "strategy":
      return "value-proposition";
    case "business-models":
      return "revenue-streams";
    case "tools":
      return "key-activities";
    case "frameworks":
      return "key-activities";
    default:
      return "value-proposition";
  }
}

export interface CementedDecision {
  id: string;
  conceptSlug?: string;
  conceptTitle: string;
  conceptCategory?: string;
  area: CanvasAreaId;
  /** "What we'll do" — the concrete commitment. */
  decision: string;
  /** Optional supporting detail / excerpt of the advice. */
  rationale?: string;
  createdAt: string;
}

export interface BusinessModel {
  version: 1;
  decisions: CementedDecision[];
  updatedAt: string;
}

const KEY = "jak-business-model";
const listeners = new Set<() => void>();

const EMPTY: BusinessModel = { version: 1, decisions: [], updatedAt: "" };

// useSyncExternalStore needs a stable snapshot reference until data changes.
let cachedRaw: string | null = null;
let cachedModel: BusinessModel = EMPTY;

export function getModel(): BusinessModel {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedModel;
    cachedRaw = raw;
    cachedModel = raw ? (JSON.parse(raw) as BusinessModel) : EMPTY;
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
  // Crypto if available; otherwise time + random — collisions don't matter here.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().slice(0, 8);
  }
  return Math.random().toString(36).slice(2, 10);
}

export function addDecision(
  d: Omit<CementedDecision, "id" | "createdAt">
): CementedDecision {
  const model = { ...getModel(), decisions: [...getModel().decisions] };
  const decision: CementedDecision = {
    ...d,
    id: newId(),
    createdAt: new Date().toISOString(),
  };
  model.decisions.push(decision);
  write(model);
  return decision;
}

export function updateDecision(id: string, patch: Partial<CementedDecision>) {
  const model = getModel();
  const next = {
    ...model,
    decisions: model.decisions.map((d) =>
      d.id === id ? { ...d, ...patch } : d
    ),
  };
  write(next);
}

export function removeDecision(id: string) {
  const model = getModel();
  write({ ...model, decisions: model.decisions.filter((d) => d.id !== id) });
}

export function clearModel() {
  write({ ...EMPTY });
}

export function decisionsByArea(
  model: BusinessModel
): Record<CanvasAreaId, CementedDecision[]> {
  const out = Object.fromEntries(
    CANVAS_AREAS.map((a) => [a.id, [] as CementedDecision[]])
  ) as Record<CanvasAreaId, CementedDecision[]>;
  for (const d of model.decisions) out[d.area].push(d);
  return out;
}

/** Plain-text export of the whole model — for the copy button and, later,
 *  feeding back into the AI as grounding for a "review my whole model" pass. */
export function modelToText(model: BusinessModel): string {
  if (!model.decisions.length) return "";
  const byArea = decisionsByArea(model);
  const lines: string[] = ["MY BUSINESS MODEL", ""];
  for (const area of CANVAS_AREAS) {
    const items = byArea[area.id];
    if (!items.length) continue;
    lines.push(`## ${area.label}`);
    for (const d of items) {
      lines.push(`- ${d.decision}${d.conceptTitle ? ` (via ${d.conceptTitle})` : ""}`);
    }
    lines.push("");
  }
  return lines.join("\n").trim();
}
