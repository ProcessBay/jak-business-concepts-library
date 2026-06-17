"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import atomsIndex from "@/lib/generated/atoms-index.json";
import { formatCategory } from "@/lib/atoms";

interface SlimAtom {
  title: string;
  slug: string;
  category: string;
  aliases: string[];
  blurb: string;
}

const index = atomsIndex as SlimAtom[];

const MAX_RESULTS = 25;

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Filter in JS and cap the rendered list — never hand 672 nodes to the
  // widget (that was the crash + the lag).
  const results = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return index.slice(0, MAX_RESULTS);
    const scored: { atom: SlimAtom; score: number }[] = [];
    for (const a of index) {
      const t = a.title.toLowerCase();
      let score = 0;
      if (t === q) score = 100;
      else if (t.startsWith(q)) score = 60;
      else if (t.includes(q)) score = 40;
      else if (a.aliases.some((x) => x.toLowerCase().includes(q))) score = 25;
      else if (a.blurb.toLowerCase().includes(q)) score = 10;
      if (score) scored.push({ atom: a, score });
    }
    scored.sort((x, y) => y.score - x.score);
    return scored.slice(0, MAX_RESULTS).map((s) => s.atom);
  }, [query]);

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/concepts/${slug}`);
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline">Search…</span>
        <kbd className="pointer-events-none hidden rounded border bg-muted px-1.5 font-mono text-[10px] font-medium lg:inline-block">
          ⌘K
        </kbd>
        <svg className="lg:hidden" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* shouldFilter=false: we filter ourselves above. The <Command> root is
            required for cmdk context — CommandDialog does not add it. */}
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={`Search ${index.length} concepts…`}
          />
          <CommandList>
            <CommandEmpty>No concepts match “{query}”.</CommandEmpty>
            <CommandGroup
              heading={query ? `${results.length} match${results.length === 1 ? "" : "es"}` : "Concepts"}
            >
              {results.map((atom) => (
                <CommandItem
                  key={atom.slug}
                  value={atom.slug}
                  onSelect={() => go(atom.slug)}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="truncate">{atom.title}</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {formatCategory(atom.category)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
