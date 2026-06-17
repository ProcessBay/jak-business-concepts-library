"use client";

/**
 * Backup & Restore — the persistence layer (browser-first).
 *
 * Bundles the whole workspace (business profile + central plan) into one
 * portable artifact you can download as a file or copy as a code, then restore
 * on any device. No accounts, no server — your business data stays yours.
 *
 * (Full cloud accounts can layer on top later; this is the safe, immediate
 * way to never lose work and to move it between machines.)
 */

import {
  getProfile,
  setProfile,
  type BusinessProfile,
} from "@/lib/profile";
import {
  getModel,
  replaceModel,
  type BusinessModel,
} from "@/lib/business-model";

export interface Workspace {
  kind: "jak-workspace";
  version: 1;
  exportedAt: string;
  profile: BusinessProfile | null;
  model: BusinessModel | null;
}

export function exportWorkspace(): Workspace {
  const model = getModel();
  return {
    kind: "jak-workspace",
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: getProfile(),
    model: model.decisions.length ? model : null,
  };
}

// Base64 of the UTF-8 JSON — a single copy-pasteable "code".
export function workspaceToCode(ws: Workspace): string {
  const json = JSON.stringify(ws);
  if (typeof window === "undefined") return "";
  // Handle non-Latin1 safely via encodeURIComponent escape trick.
  return btoa(unescape(encodeURIComponent(json)));
}

export function parseWorkspace(input: string): Workspace | null {
  const text = input.trim();
  if (!text) return null;
  let json = text;
  // Accept either raw JSON or a base64 code.
  if (!text.startsWith("{")) {
    try {
      json = decodeURIComponent(escape(atob(text)));
    } catch {
      return null;
    }
  }
  try {
    const ws = JSON.parse(json) as Workspace;
    if (ws && ws.kind === "jak-workspace") return ws;
    return null;
  } catch {
    return null;
  }
}

/** Apply a restored workspace to local storage (and notify the UI). */
export function importWorkspace(ws: Workspace) {
  if (ws.profile) setProfile(ws.profile);
  if (ws.model) replaceModel(ws.model);
}

export function downloadWorkspace() {
  const ws = exportWorkspace();
  const blob = new Blob([JSON.stringify(ws, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const name = ws.profile?.name
    ? ws.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "business";
  a.href = url;
  a.download = `jak-${name}-backup.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
