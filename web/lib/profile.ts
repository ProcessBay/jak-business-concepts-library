"use client";

/**
 * Business profile — the personalization layer.
 *
 * Stored client-side only (localStorage). No accounts, no server persistence:
 * the user's business context never lives anywhere but their browser and the
 * per-request prompt. Module-level listeners keep every component in sync.
 */

export interface BusinessProfile {
  name: string;
  oneLiner: string;
  industry: string;
  businessModel: string;
  customers: string;
  stage: string;
  challenges: string[];
  /** Longer free-text summary used in prompts. */
  summary: string;
  createdAt: string;
}

const KEY = "jak-business-profile";
const listeners = new Set<() => void>();

// useSyncExternalStore requires getSnapshot to return a STABLE reference
// until the store actually changes — cache the parse keyed on the raw string.
let cachedRaw: string | null = null;
let cachedProfile: BusinessProfile | null = null;

export function getProfile(): BusinessProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedProfile;
    cachedRaw = raw;
    cachedProfile = raw ? (JSON.parse(raw) as BusinessProfile) : null;
    return cachedProfile;
  } catch {
    return null;
  }
}

export function setProfile(profile: BusinessProfile | null) {
  if (typeof window === "undefined") return;
  if (profile) localStorage.setItem(KEY, JSON.stringify(profile));
  else localStorage.removeItem(KEY);
  listeners.forEach((fn) => fn());
}

export function subscribeProfile(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Compact prompt block for the chat API. Kept under ~1200 chars. */
export function profilePromptBlock(p: BusinessProfile): string {
  const lines = [
    `Business: ${p.name} — ${p.oneLiner}`,
    `Industry: ${p.industry}`,
    `Business model: ${p.businessModel}`,
    `Customers: ${p.customers}`,
    `Stage: ${p.stage}`,
    p.challenges.length ? `Key challenges: ${p.challenges.join("; ")}` : "",
    p.summary ? `Context: ${p.summary}` : "",
  ].filter(Boolean);
  return lines.join("\n").slice(0, 1200);
}
