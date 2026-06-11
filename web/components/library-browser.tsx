"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
const allCategories = [...new Set(index.map((a) => a.category))].sort();

export function LibraryBrowser() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);

  const q = query.toLowerCase().trim();
  const filtered = index.filter((atom) => {
    if (category && atom.category !== category) return false;
    if (!q) return true;
    return (
      atom.title.toLowerCase().includes(q) ||
      atom.aliases.some((a) => a.toLowerCase().includes(q)) ||
      atom.blurb.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-2 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
        <span className="text-sm text-muted-foreground">
          {filtered.length} of {index.length} concepts
        </span>
      </div>
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Every concept below is a curated atom in the knowledge graph — the only
        source the AI is allowed to cite.
      </p>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter concepts…"
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setCategory(null)}>
            <Badge variant={category === null ? "default" : "outline"}>All</Badge>
          </button>
          {allCategories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat === category ? null : cat)}>
              <Badge variant={category === cat ? "default" : "outline"}>
                {formatCategory(cat)}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((atom) => (
          <Link key={atom.slug} href={`/concepts/${atom.slug}`}>
            <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <CardContent className="p-4">
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <h2 className="text-sm font-semibold leading-snug">{atom.title}</h2>
                </div>
                <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {atom.blurb}
                </p>
                <Badge variant="secondary" className="mt-3 text-[10px]">
                  {formatCategory(atom.category)}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
