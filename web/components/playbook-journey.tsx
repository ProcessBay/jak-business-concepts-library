"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCategory } from "@/lib/atoms";
import { useBusinessProfile } from "@/components/business-profile-dialog";

export interface JourneyStep {
  index: number;
  conceptSlug: string;
  conceptTitle: string;
  category: string;
  blurb: string;
  framing: string;
  applyQuery: string;
}

interface Props {
  playbookSlug: string;
  title: string;
  steps: JourneyStep[];
  synthesisQuery: string;
}

function useProgress(playbookSlug: string) {
  const key = `jak-playbook-progress:${playbookSlug}`;
  const [done, setDone] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDone(new Set(JSON.parse(raw) as number[]));
    } catch {
      // corrupted progress is not worth surfacing — start fresh
    }
  }, [key]);

  const toggle = React.useCallback(
    (index: number, value?: boolean) => {
      setDone((prev) => {
        const next = new Set(prev);
        const shouldAdd = value ?? !next.has(index);
        if (shouldAdd) next.add(index);
        else next.delete(index);
        try {
          localStorage.setItem(key, JSON.stringify([...next]));
        } catch {
          // storage full/blocked — progress just won't persist
        }
        return next;
      });
    },
    [key]
  );

  return { done, toggle };
}

export function PlaybookJourney({ playbookSlug, title, steps, synthesisQuery }: Props) {
  const router = useRouter();
  const profile = useBusinessProfile();
  const { done, toggle } = useProgress(playbookSlug);

  const applyLabel = profile ? `Apply to ${profile.name}` : "Apply to my business";
  const allDone = done.size >= steps.length;

  function fire(query: string, stepIndex?: number) {
    if (stepIndex !== undefined) toggle(stepIndex, true);
    router.push(`/?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="space-y-4">
      {/* Progress line */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(done.size / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {done.size}/{steps.length}
        </span>
      </div>

      {!profile && (
        <p className="rounded-lg border border-dashed bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
          Tip: add your business (top right) before starting — every step
          below will then be answered for your company specifically, not in
          the abstract.
        </p>
      )}

      <ol className="space-y-3">
        {steps.map((step) => {
          const isDone = done.has(step.index);
          return (
            <li key={step.conceptSlug}>
              <Card className={isDone ? "border-primary/30 bg-muted/30" : ""}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggle(step.index)}
                      aria-label={isDone ? "Mark step as not done" : "Mark step as done"}
                      className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                        isDone
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-primary"
                      }`}
                    >
                      {isDone ? "✓" : step.index + 1}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h2 className="text-base font-semibold">{step.conceptTitle}</h2>
                        <Badge variant="secondary" className="text-[10px]">
                          {formatCategory(step.category)}
                        </Badge>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.framing}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => fire(step.applyQuery, step.index)}>
                          {applyLabel}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          nativeButton={false}
                          render={<Link href={`/concepts/${step.conceptSlug}`} />}
                        >
                          Read the concept
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ol>

      {/* Synthesis */}
      <Card className={allDone ? "border-primary" : "border-dashed"}>
        <CardContent className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold">
              {allDone ? "Ready: get your recommendation" : "Finish line"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {allDone
                ? `Pull all ${steps.length} steps into one decisive recommendation for ${profile?.name ?? "your business"}.`
                : "Work the steps above, then pull everything into one decisive recommendation. You can run it early — it's just sharper once you've seen each step."}
            </p>
          </div>
          <Button onClick={() => fire(synthesisQuery)} className="shrink-0">
            Get my recommendation
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        Every step&apos;s answer has an{" "}
        <span className="font-medium text-foreground">Add to my model</span>{" "}
        button — cement the decisions you like into your{" "}
        <Link href="/model" className="text-primary underline-offset-2 hover:underline">
          central plan
        </Link>
        .
      </p>
    </div>
  );
}
