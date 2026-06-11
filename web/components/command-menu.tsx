"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
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

const byCategory = new Map<string, SlimAtom[]>();
for (const atom of index) {
  const list = byCategory.get(atom.category) ?? [];
  list.push(atom);
  byCategory.set(atom.category, list);
}
const sortedCategories = [...byCategory.keys()].sort();

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="ms-2 gap-2 text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <span className="hidden sm:inline">Search concepts…</span>
        <span className="sm:hidden">Search</span>
        <kbd className="pointer-events-none hidden rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:inline-block">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search 244 business concepts…" />
        <CommandList>
          <CommandEmpty>No concepts found.</CommandEmpty>
          {sortedCategories.map((cat) => (
            <CommandGroup key={cat} heading={formatCategory(cat)}>
              {byCategory.get(cat)!.map((atom) => (
                <CommandItem
                  key={atom.slug}
                  value={`${atom.title} ${atom.aliases.join(" ")}`}
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/concepts/${atom.slug}`);
                  }}
                >
                  {atom.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
