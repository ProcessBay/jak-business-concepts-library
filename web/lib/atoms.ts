import atomsData from "@/lib/generated/atoms.json";

export interface RelatedRef {
  title: string;
  slug: string;
}

export interface Atom {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  aliases: string[];
  definition: string;
  sections: Record<string, string>;
  related: RelatedRef[];
  sources: string[];
}

export const atoms = atomsData as unknown as Atom[];

export const atomBySlug = new Map(atoms.map((a) => [a.slug, a]));
export const atomByTitle = new Map(atoms.map((a) => [a.title.toLowerCase(), a]));

export const categories = [...new Set(atoms.map((a) => a.category))].sort();

export function formatCategory(cat: string): string {
  return cat
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
