"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { THEMES } from "@/lib/themes";
import atomsIndex from "@/lib/generated/atoms-index.json";

interface SlimAtom {
  title: string;
  slug: string;
  category: string;
  aliases: string[];
  blurb: string;
  subtheme: string | null;
}

const index = atomsIndex as SlimAtom[];

const byCategory: Record<string, SlimAtom[]> = {};
for (const a of index) {
  (byCategory[a.category] ??= []).push(a);
}
for (const k of Object.keys(byCategory)) {
  byCategory[k].sort((a, b) => a.title.localeCompare(b.title));
}

// Big catch-all buckets get a second level (sub-themes); the 6 canonical
// categories are shown flat.
const BIG_BUCKETS = new Set(["concepts", "frameworks", "tools"]);

function groupBySubtheme(atoms: SlimAtom[]): [string, SlimAtom[]][] {
  const m = new Map<string, SlimAtom[]>();
  for (const a of atoms) {
    const key = a.subtheme ?? "General";
    (m.get(key) ?? m.set(key, []).get(key)!).push(a);
  }
  return [...m.entries()].sort((a, b) => b[1].length - a[1].length);
}

function ConceptCard({ atom }: { atom: SlimAtom }) {
  return (
    <Link href={`/concepts/${atom.slug}`}>
      <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold leading-snug">{atom.title}</h3>
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            {atom.blurb}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export function LibraryBrowser() {
  const [query, setQuery] = React.useState("");
  // Collapsed by default — 9 scannable themes; expand to drill in.
  const [open, setOpen] = React.useState<Set<string>>(new Set());

  const q = query.toLowerCase().trim();

  function matchesFor(cat: string): SlimAtom[] {
    const atoms = byCategory[cat] ?? [];
    if (!q) return atoms;
    return atoms.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.aliases.some((x) => x.toLowerCase().includes(q)) ||
        a.blurb.toLowerCase().includes(q)
    );
  }

  function toggle(cat: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }

  const totalMatches = q
    ? THEMES.reduce((n, t) => n + matchesFor(t.category).length, 0)
    : index.length;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">The Library</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        The engine room — {index.length} proven business concepts your
        co-strategist draws on. Browse them here, or just{" "}
        <Link href="/" className="text-primary underline-offset-2 hover:underline">
          ask
        </Link>{" "}
        and they get applied to your business.
      </p>

      <div className="mt-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across the whole library…"
          className="max-w-md"
        />
        {q && (
          <p className="mt-2 text-xs text-muted-foreground">
            {totalMatches} match{totalMatches === 1 ? "" : "es"} for “{query}”
          </p>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {THEMES.map((theme) => {
          const matches = matchesFor(theme.category);
          if (q && matches.length === 0) return null;
          const isOpen = q ? true : open.has(theme.category);
          return (
            <div key={theme.category} className="rounded-xl border">
              <button
                onClick={() => !q && toggle(theme.category)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <div>
                  <h2 className="text-base font-semibold">{theme.title}</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {theme.blurb}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge variant="secondary" className="text-[10px]">
                    {matches.length}
                  </Badge>
                  {!q && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        "text-muted-foreground transition-transform " +
                        (isOpen ? "rotate-90" : "")
                      }
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="border-t p-4">
                  {BIG_BUCKETS.has(theme.category) ? (
                    // Second level: sub-themes within the big bucket.
                    <div className="space-y-5">
                      {groupBySubtheme(matches).map(([sub, atoms]) => (
                        <div key={sub}>
                          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {sub} <span className="font-normal">· {atoms.length}</span>
                          </h3>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {atoms.map((atom) => (
                              <ConceptCard key={atom.slug} atom={atom} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {matches.map((atom) => (
                        <ConceptCard key={atom.slug} atom={atom} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
