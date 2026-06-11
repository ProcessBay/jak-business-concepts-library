import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { playbooks } from "@/lib/playbooks";

export const metadata: Metadata = {
  title: "Playbooks",
  description:
    "Guided journeys through the knowledge graph — from a real business question to a concrete decision, each step applied to your business.",
};

export default function PlaybooksPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Playbooks</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        A library is where answers live; a playbook is how you reach a
        decision. Each one sequences a handful of concepts into a path —
        and every step applies to your business.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {playbooks.map((pb) => (
          <Link key={pb.slug} href={`/playbooks/${pb.slug}`}>
            <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-5">
                <h2 className="text-base font-semibold">{pb.title}</h2>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {pb.question}
                </p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {pb.tagline}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {pb.steps.length} steps
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    ~{pb.minutes} min
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
