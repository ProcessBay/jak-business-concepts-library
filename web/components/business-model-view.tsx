"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { useBusinessProfile } from "@/components/business-profile-dialog";
import { useBusinessModel } from "@/components/cement-dialog";
import { useHydrated } from "@/lib/use-hydrated";
import { profilePromptBlock } from "@/lib/profile";
import {
  PLAN_SECTIONS,
  SECTION_LABEL,
  decisionsBySection,
  modelToText,
  removeDecision,
  setStrategy,
  strategyStale,
  type BusinessModel,
  type StrategySynthesis,
} from "@/lib/business-model";

type Tab = "strategy" | "plan" | "decisions";

const EMPTY_MODEL: BusinessModel = { version: 3, decisions: [], updatedAt: "" };

export function BusinessModelView() {
  const hydrated = useHydrated();
  const liveProfile = useBusinessProfile();
  const liveModel = useBusinessModel();
  // Until mounted, mirror the server's empty render to avoid hydration drift.
  const profile = hydrated ? liveProfile : null;
  const model = hydrated ? liveModel : EMPTY_MODEL;
  const [tab, setTab] = React.useState<Tab>("strategy");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const bySection = decisionsBySection(model);
  const count = model.decisions.length;
  const coveredAreas = PLAN_SECTIONS.filter((s) => bySection[s.id].length).length;
  const exportText = modelToText(model);
  const strategy = model.strategy;
  const stale = strategyStale(model);

  async function synthesize() {
    setBusy(true);
    setError(null);
    try {
      const pillars = PLAN_SECTIONS.filter((s) => bySection[s.id].length).map(
        (s) => ({
          id: s.id,
          label: s.label,
          hint: s.hint,
          decisions: bySection[s.id].map((d) => ({
            decision: d.decision,
            conceptTitle: d.conceptTitle,
          })),
        })
      );
      const res = await fetch("/api/synthesize-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: profile ? profilePromptBlock(profile) : undefined,
          pillars,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStrategy({
        headline: data.headline ?? "",
        pillars: data.pillars ?? {},
        tensions: data.tensions ?? [],
        gaps: data.gaps ?? [],
        basedOnCount: count,
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error(e);
      setError("Couldn't synthesize just now — try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {profile ? profile.name : "Your business plan"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile?.oneLiner ??
              "Your living strategy — decisions woven into one coherent plan."}
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
          ["strategy", "Strategy"],
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

      {tab === "strategy" ? (
        count === 0 ? (
          <EmptyHint />
        ) : (
          <StrategyView
            model={model}
            strategy={strategy}
            stale={stale}
            busy={busy}
            error={error}
            onSynthesize={synthesize}
          />
        )
      ) : tab === "plan" ? (
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
                      <ul className="mt-4 space-y-3.5">
                        {items.map((d) => (
                          <li
                            key={d.id}
                            className="border-s-2 border-primary/30 ps-3 text-[13px] leading-relaxed"
                          >
                            <p className="text-foreground">{d.decision}</p>
                            {d.conceptSlug && (
                              <Link
                                href={`/concepts/${d.conceptSlug}`}
                                className="mt-1 inline-block text-[11px] text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
                              >
                                via {d.conceptTitle}
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

function StrategyView({
  model,
  strategy,
  stale,
  busy,
  error,
  onSynthesize,
}: {
  model: BusinessModel;
  strategy: StrategySynthesis | undefined;
  stale: boolean;
  busy: boolean;
  error: string | null;
  onSynthesize: () => void;
}) {
  const bySection = decisionsBySection(model);

  // No synthesis yet — invite the founder to run the first pass.
  if (!strategy) {
    return (
      <div className="mt-6 rounded-xl border border-dashed bg-muted/30 px-6 py-10 text-center">
        <h2 className="text-base font-semibold">
          Turn your decisions into one coherent strategy
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          You&apos;ve cemented {model.decisions.length} decision
          {model.decisions.length === 1 ? "" : "s"}. Synthesize weaves them into
          a living strategy — a tight narrative per pillar, plus the tensions
          and gaps worth your attention. Your decisions stay exactly as you
          wrote them.
        </p>
        <div className="mt-5">
          <Button onClick={onSynthesize} disabled={busy}>
            {busy ? "Synthesizing…" : "Synthesize my strategy"}
          </Button>
        </div>
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Headline + refresh control */}
      <div className="rounded-xl border bg-gradient-to-br from-primary/[0.06] to-transparent p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-medium uppercase tracking-wide text-primary/80">
              Strategic thesis
            </div>
            <p className="mt-1.5 text-lg font-medium leading-snug text-foreground">
              {strategy.headline || "Your strategy, synthesized."}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onSynthesize}
            disabled={busy}
            className="shrink-0"
          >
            {busy ? "Synthesizing…" : stale ? "Refresh" : "Re-synthesize"}
          </Button>
        </div>
        {stale && !busy && (
          <p className="mt-3 text-xs text-amber-600 dark:text-amber-500">
            Your plan changed since this was written ·{" "}
            {model.decisions.length - strategy.basedOnCount > 0
              ? `${model.decisions.length - strategy.basedOnCount} new decision(s)`
              : "decisions removed"}{" "}
            — refresh to bring it current.
          </p>
        )}
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
      </div>

      {/* Per-pillar synthesized narratives */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {PLAN_SECTIONS.filter((s) => strategy.pillars[s.id]).map((section) => (
          <Card key={section.id}>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold">{section.label}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-foreground/90">
                {strategy.pillars[section.id]}
              </p>
              {/* The raw words this was built from, preserved. */}
              <details className="mt-3 group">
                <summary className="cursor-pointer list-none text-[11px] font-medium text-muted-foreground hover:text-foreground">
                  <span className="underline-offset-2 group-hover:underline">
                    {bySection[section.id].length} decision
                    {bySection[section.id].length === 1 ? "" : "s"} behind this
                  </span>
                </summary>
                <ul className="mt-2 space-y-2 border-s-2 border-border ps-3">
                  {bySection[section.id].map((d) => (
                    <li key={d.id} className="text-[12px] leading-relaxed text-muted-foreground">
                      {d.decision}
                    </li>
                  ))}
                </ul>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tensions */}
      {strategy.tensions.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-300">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Tensions to resolve
          </h3>
          <ul className="mt-3 space-y-2.5">
            {strategy.tensions.map((t, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-amber-900/90 dark:text-amber-200/90">
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gaps */}
      {strategy.gaps.length > 0 && (
        <div className="rounded-xl border p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Open questions to work on next
          </h3>
          <ul className="mt-3 space-y-2.5">
            {strategy.gaps.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/90">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {g}
              </li>
            ))}
          </ul>
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
        Ask your co-strategist or follow a playbook. When an answer gives you a
        decision worth keeping, hit{" "}
        <span className="font-medium text-foreground">Add to my plan</span> — it
        files itself into the right pillar. Once you&apos;ve cemented a few, hit
        Synthesize to weave them into one coherent strategy.
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
