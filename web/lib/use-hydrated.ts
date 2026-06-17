"use client";

import * as React from "react";

/**
 * True only after the component has mounted on the client.
 *
 * localStorage-backed stores (profile, business model) return empty on the
 * server but populated on the client, so any UI that branches on their
 * contents mismatches during hydration. Gate that UI on this hook: render the
 * server-equivalent (empty) state first, then the real state after mount.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);
  return hydrated;
}
