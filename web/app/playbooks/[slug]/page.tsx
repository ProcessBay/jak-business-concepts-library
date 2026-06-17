import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { atomBySlug } from "@/lib/atoms";
import { playbooks, playbookBySlug } from "@/lib/playbooks";
import { PlaybookJourney, type JourneyStep } from "@/components/playbook-journey";

export function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pb = playbookBySlug.get(slug);
  if (!pb) return {};
  return { title: pb.title, description: pb.tagline };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pb = playbookBySlug.get(slug);
  if (!pb) notFound();

  // Resolve every step's atom at build time — a bad conceptSlug fails the
  // build here, which is exactly the validation we want.
  const steps: JourneyStep[] = pb.steps.map((step, index) => {
    const atom = atomBySlug.get(step.conceptSlug);
    if (!atom) {
      throw new Error(
        `Playbook "${pb.slug}" step ${index + 1} references missing concept: ${step.conceptSlug}`
      );
    }
    const blurb = atom.definition.split(/(?<=[.!?])\s/)[0] ?? "";
    return {
      index,
      conceptSlug: atom.slug,
      conceptTitle: atom.title,
      category: atom.category,
      blurb,
      framing: step.framing,
      applyQuery: step.applyQuery,
    };
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Playbook
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">{pb.title}</h1>
      <p className="mt-1 text-base text-muted-foreground">{pb.question}</p>

      <div className="mt-8">
        <PlaybookJourney
          playbookSlug={pb.slug}
          title={pb.title}
          question={pb.question}
          section={pb.section}
          steps={steps}
          synthesisQuery={pb.synthesisQuery}
        />
      </div>
    </div>
  );
}
