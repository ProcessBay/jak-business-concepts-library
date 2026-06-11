import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Streamdown } from "streamdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { atoms, atomBySlug, formatCategory } from "@/lib/atoms";

export function generateStaticParams() {
  return atoms.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const atom = atomBySlug.get(slug);
  if (!atom) return {};
  return {
    title: atom.title,
    description: atom.definition.slice(0, 160),
  };
}

// Sections rendered on concept pages, in display order. Sources/related are
// rendered separately.
const SECTION_ORDER = [
  "definition",
  "key attributes",
  "how it",
  "when to use",
  "when not to use",
  "common pitfalls",
  "key metrics",
  "decision questions",
  "canonical examples",
  "examples",
];

function orderedSections(sections: Record<string, string>) {
  const entries = Object.entries(sections).filter(
    ([k]) => !/^(related|sources)/i.test(k)
  );
  return entries.sort(([a], [b]) => {
    const rank = (key: string) => {
      const i = SECTION_ORDER.findIndex((p) => key.toLowerCase().startsWith(p));
      return i === -1 ? SECTION_ORDER.length : i;
    };
    return rank(a) - rank(b);
  });
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const atom = atomBySlug.get(slug);
  if (!atom) notFound();

  const sections = orderedSections(atom.sections);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="mb-1 flex items-center gap-3">
        <Badge variant="secondary">{formatCategory(atom.category)}</Badge>
        {atom.aliases.length > 0 && (
          <span className="text-xs text-muted-foreground">
            Also known as: {atom.aliases.join(" · ")}
          </span>
        )}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">{atom.title}</h1>

      <div className="mt-6 space-y-6">
        {sections.map(([heading, body]) => (
          <section key={heading}>
            {!heading.toLowerCase().startsWith("definition") && (
              <h2 className="mb-2 border-b pb-1.5 text-lg font-semibold">
                {heading}
              </h2>
            )}
            <div className="prose-chat text-[0.95rem]">
              <Streamdown>{body}</Streamdown>
            </div>
          </section>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        {atom.related.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Related concepts
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {atom.related.map((ref) => (
                <Link key={ref.slug} href={`/concepts/${ref.slug}`}>
                  <Badge
                    variant="outline"
                    className="transition-colors hover:border-primary hover:text-primary"
                  >
                    {ref.title}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
        <Button
          className="shrink-0"
          nativeButton={false}
          render={
            <Link
              href={`/?q=${encodeURIComponent(`Tell me about ${atom.title} for my business`)}`}
            />
          }
        >
          Ask the library about this
        </Button>
      </div>
    </article>
  );
}
