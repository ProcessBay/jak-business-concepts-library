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
  PLAN_SECTIONS,
  SECTION_LABEL,
  decisionsBySection,
  modelToText,
  removeDecision,
} from "@/lib/business-model";

type Tab = "plan" | "decisions";

export function BusinessModelView() {
  const profile = useBusinessProfile();
  const model = useBusinessModel();
  const [tab, setTab] = React.useState<Tab>("plan");

  const bySection = decisionsBySection(model);
  const count = model.decisions.length;
  const coveredAreas = PLAN_SECTIONS.filter((s) => bySection[s.id].length).length;
  const exportText = modelToText(model);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {profile ? profile.name : "Your business plan"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile?.oneLiner ??
              "Your consolidated plan — strategy, model, go-to-market, growth, and more."}
          </p>
        </div>
        {count > 0 && <CopyButton text={exportText} label="Copy plan" />}
      </div>

      {/* Foundation from the profile — the facts the plan builds on. */}
      {profile && (
        <Card className="mt-5 bg-muted/30">
          <CardContent className="p-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Foundation — from your business profile
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:grid-cols-4">
              <Fact label="Industry" value={profile.industry} />
              <Fact label="Customers" value={profile.customers} />
              <Fact label="Model today" value={profile.businessModel} />
              <Fact label="Stage" value={profile.stage} />
            </div>
            {profile.challenges.length > 0 && (
              <div className="mt-3">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Challenges to solve
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {profile.challenges.map((c) => (
                    <Badge key={c} variant="outline" className="text-[10px]">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="mt-6 flex items-center gap-1 border-b">
        {([
          ["plan", `Plan${coveredAreas ? ` · ${coveredAreas}/${PLAN_SECTIONS.length}` : ""}`],
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

      {tab === "plan" ? (
        <>
          {count === 0 && <EmptyHint />}
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {PLAN_SECTIONS.map((section) => {
              const items = bySection[section.id];
              return (
                <Card
                  key={section.id}
                  className={items.length ? "" : "border-dashed"}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-sm font-semibold">{section.label}</h2>
                        <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                          {section.hint}
                        </p>
                      </div>
                      {items.length > 0 && (
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          {items.length}
                        </Badge>
                      )}
                    </div>

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
                      <Link
                        href={`/?q=${encodeURIComponent(section.prompt)}`}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-2 hover:underline"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5v14" />
                        </svg>
                        Work on this
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : count === 0 ? (
        <EmptyHint />
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
                        {SECTION_LABEL[d.section]}
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

function Fact({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="font-medium text-foreground">{label}</div>
      <div className="text-muted-foreground">{value || "—"}</div>
    </div>
  );
}

function EmptyHint() {
  return (
    <div className="mt-6 rounded-xl border border-dashed bg-muted/30 px-6 py-10 text-center">
      <h2 className="text-base font-semibold">Build your plan, one decision at a time</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
        Ask the library or follow a playbook. When an answer gives you a
        decision worth keeping, hit{" "}
        <span className="font-medium text-foreground">Add to my model</span> — it
        files itself into the right pillar below, building a comprehensive plan
        across strategy, model, pricing, go-to-market, growth, metrics, and moat.
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
