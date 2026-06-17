"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { useBusinessProfile } from "@/components/business-profile-dialog";
import { useBusinessModel } from "@/components/cement-dialog";
import {
  CANVAS_AREAS,
  decisionsByArea,
  modelToText,
  removeDecision,
} from "@/lib/business-model";

type Tab = "model" | "decisions";

export function BusinessModelView() {
  const profile = useBusinessProfile();
  const model = useBusinessModel();
  const [tab, setTab] = React.useState<Tab>("model");

  const byArea = decisionsByArea(model);
  const count = model.decisions.length;
  const exportText = modelToText(model);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {profile ? profile.name : "Your business"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile?.oneLiner ??
              "Your consolidated model — the concepts you've decided to act on."}
          </p>
        </div>
        {count > 0 && <CopyButton text={exportText} label="Copy model" />}
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 border-b">
        {([
          ["model", "Model"],
          ["decisions", `Decisions${count ? ` (${count})` : ""}`],
        ] as [Tab, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={
              "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors " +
              (tab === id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground")
            }
          >
            {label}
          </button>
        ))}
      </div>

      {count === 0 ? (
        <EmptyState />
      ) : tab === "model" ? (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CANVAS_AREAS.map((area) => {
            const items = byArea[area.id];
            return (
              <Card
                key={area.id}
                className={items.length ? "" : "border-dashed opacity-70"}
              >
                <CardContent className="p-4">
                  <h2 className="text-sm font-semibold">{area.label}</h2>
                  <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                    {area.hint}
                  </p>
                  {items.length ? (
                    <ul className="mt-3 space-y-2">
                      {items.map((d) => (
                        <li key={d.id} className="text-xs leading-relaxed">
                          <span className="text-foreground">{d.decision}</span>
                          {d.conceptSlug && (
                            <Link
                              href={`/concepts/${d.conceptSlug}`}
                              className="ms-1 text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
                            >
                              ({d.conceptTitle})
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-xs text-muted-foreground/70">
                      Nothing here yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {model.decisions
            .slice()
            .reverse()
            .map((d) => (
              <Card key={d.id}>
                <CardContent className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {CANVAS_AREAS.find((a) => a.id === d.area)?.label}
                      </Badge>
                      {d.conceptSlug && (
                        <Link
                          href={`/concepts/${d.conceptSlug}`}
                          className="text-xs text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
                        >
                          {d.conceptTitle}
                        </Link>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm">{d.decision}</p>
                  </div>
                  <button
                    onClick={() => removeDecision(d.id)}
                    className="shrink-0 text-xs text-muted-foreground transition-colors hover:text-destructive"
                    aria-label="Remove decision"
                  >
                    Remove
                  </button>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-xl border border-dashed bg-muted/30 px-6 py-12 text-center">
      <h2 className="text-base font-semibold">Your model is empty — for now</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Ask the library a question or follow a playbook. When an answer gives you
        a decision worth keeping, hit{" "}
        <span className="font-medium text-foreground">Add to my model</span> —
        it lands here, organized into a real business model you can act on and
        share.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button render={<Link href="/" />} nativeButton={false}>
          Ask a question
        </Button>
        <Button
          variant="outline"
          render={<Link href="/playbooks" />}
          nativeButton={false}
        >
          Follow a playbook
        </Button>
      </div>
    </div>
  );
}
