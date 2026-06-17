"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { THEMES } from "@/lib/themes";
import atomsIndex from "@/lib/generated/atoms-index.json";

interface SlimAtom {
  title: string;
  slug: string;
  category: string;
  aliases: string[];
}

const index = atomsIndex as SlimAtom[];

const byCategory: Record<string, SlimAtom[]> = {};
for (const a of index) {
  (byCategory[a.category] ??= []).push(a);
}
for (const k of Object.keys(byCategory)) {
  byCategory[k].sort((a, b) => a.title.localeCompare(b.title));
}

/** Collapsible multi-level menu — engaging theme → its atoms — for fast access
 *  from anywhere. Slides in from the left; filter narrows across everything. */
export function BrowseSidebar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const q = filter.toLowerCase().trim();

  function toggle(cat: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }

  function go(slug: string) {
    setOpen(false);
    router.push(`/concepts/${slug}`);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Browse all concepts"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        }
      />
      <SheetContent side="left" className="w-80 overflow-y-auto p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle>Browse concepts</SheetTitle>
        </SheetHeader>
        <div className="p-3">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter all concepts…"
            className="mb-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <nav className="space-y-0.5">
            {THEMES.map((theme) => {
              const atoms = byCategory[theme.category] ?? [];
              const matches = q
                ? atoms.filter(
                    (a) =>
                      a.title.toLowerCase().includes(q) ||
                      a.aliases.some((x) => x.toLowerCase().includes(q))
                  )
                : atoms;
              if (q && matches.length === 0) return null;
              const isOpen = q ? true : expanded.has(theme.category);
              return (
                <div key={theme.category}>
                  <button
                    onClick={() => !q && toggle(theme.category)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <span>{theme.title}</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      {matches.length}
                      {!q && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={isOpen ? "rotate-90" : ""}
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <ul className="mb-1 ms-2 border-s ps-2">
                      {matches.map((a) => (
                        <li key={a.slug}>
                          <button
                            onClick={() => go(a.slug)}
                            className="block w-full truncate rounded px-2 py-1 text-start text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            {a.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
