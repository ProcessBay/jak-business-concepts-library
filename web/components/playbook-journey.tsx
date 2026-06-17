"use client";

import * as React from "react";
import Link from "next/link";
import { Streamdown } from "streamdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCategory } from "@/lib/atoms";
import { useBusinessProfile } from "@/components/business-profile-dialog";
import { CementDialog, type CementSeed } from "@/components/cement-dialog";
import { useHydrated } from "@/lib/use-hydrated";
import { profilePromptBlock } from "@/lib/profile";
import type { SectionId } from "@/lib/business-model";

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
  question: string;
  section: SectionId;
  steps: JourneyStep[];
  synthesisQuery: string;
}

interface SessionState {
  advice: Record<number, string>;
  synthesis: string;
}

function useSession(playbookSlug: string) {
  const key = `jak-playbook-session:${playbookSlug}`;
  const [state, setState] = React.useState<SessionState>({ advice: {}, synthesis: "" });

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw) as SessionState);
    } catch {
      // corrupted session — start fresh
    }
  }, [key]);

  const persist = React.useCallback(
    (next: SessionState) => {
      setState(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // storage full/blocked — session just won't persist
      }
    },
    [key]
  );

  return { state, persist };
}

/** Stream from /api/playbook into a callback, returning the full text. */
async function streamPlaybook(
  body: unknown,
  onChunk: (acc: string) => void,
  signal: AbortSignal
): Promise<string> {
  const res = await fetch("/api/playbook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let acc = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    acc += decoder.decode(value, { stream: true });
    onChunk(acc);
  }
  return acc;
}

export function PlaybookJourney({
  playbookSlug,
  title,
  question,
  section,
  steps,
}: Props) {
  const hydrated = useHydrated();
  const liveProfile = useBusinessProfile();
  const profile = hydrated ? liveProfile : null;
  const { state, persist } = useSession(playbookSlug);

  // What's streaming right now: a step index, "synthesis", or null.
  const [streaming, setStreaming] = React.useState<number | "synthesis" | null>(null);
  const [liveText, setLiveText] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [cementSeed, setCementSeed] = React.useState<CementSeed | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  const doneCount = steps.filter((s) => state.advice[s.index]?.trim()).length;
  const allDone = doneCount >= steps.length;
  const profileBlock = profile ? profilePromptBlock(profile) : undefined;

  React.useEffect(() => () => abortRef.current?.abort(), []);

  function priorFor(uptoIndex: number) {
    return steps
      .filter((s) => s.index < uptoIndex && state.advice[s.index]?.trim())
      .map((s) => ({ title: s.conceptTitle, advice: state.advice[s.index] }));
  }

  async function runStep(step: JourneyStep) {
    if (streaming !== null) return;
    setError(null);
    setStreaming(step.index);
    setLiveText("");
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const full = await streamPlaybook(
        {
          mode: "step",
          profile: profileBlock,
          playbookTitle: title,
          question,
          conceptSlug: step.conceptSlug,
          framing: step.framing,
          task: step.applyQuery,
          prior: priorFor(step.index),
          stepIndex: step.index + 1,
          totalSteps: steps.length,
        },
        setLiveText,
        ctrl.signal
      );
      persist({ ...state, advice: { ...state.advice, [step.index]: full } });
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        console.error(e);
        setError("That step didn't generate — try again.");
      }
    } finally {
      setStreaming(null);
      setLiveText("");
    }
  }

  async function runSynthesis() {
    if (streaming !== null) return;
    setError(null);
    setStreaming("synthesis");
    setLiveText("");
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const full = await streamPlaybook(
        {
          mode: "synthesis",
          profile: profileBlock,
          playbookTitle: title,
          question,
          steps: steps
            .filter((s) => state.advice[s.index]?.trim())
            .map((s) => ({ title: s.conceptTitle, advice: state.advice[s.index] })),
        },
        setLiveText,
        ctrl.signal
      );
      persist({ ...state, synthesis: full });
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        console.error(e);
        setError("The recommendation didn't generate — try again.");
      }
    } finally {
      setStreaming(null);
      setLiveText("");
    }
  }

  function resetSession() {
    abortRef.current?.abort();
    persist({ advice: {}, synthesis: "" });
  }

  // The next step the founder should work on (enforces build-on-prior order).
  const frontier = steps.findIndex((s) => !state.advice[s.index]?.trim());

  return (
    <div className="space-y-4">
      {/* Progress line */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(doneCount / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {doneCount}/{steps.length}
        </span>
        {(doneCount > 0 || state.synthesis) && (
          <button
            onClick={resetSession}
            className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Start over
          </button>
        )}
      </div>

      <p className="rounded-lg border border-dashed bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
        {profile ? (
          <>
            A guided session for <span className="font-medium text-foreground">{profile.name}</span>.
            Work the steps in order — each one builds on the decisions before it.
            Cement the moves you like; they flow into your{" "}
            <Link href="/model" className="text-primary underline-offset-2 hover:underline">
              plan
            </Link>
            .
          </>
        ) : (
          <>
            Tip: add your business (top right) first — every step then builds on
            your specifics and on the decisions you make as you go.
          </>
        )}
      </p>

      <ol className="space-y-3">
        {steps.map((step) => {
          const advice = state.advice[step.index];
          const isStreaming = streaming === step.index;
          const isActive = !advice && step.index === frontier;
          const isLocked = !advice && step.index !== frontier;

          return (
            <li key={step.conceptSlug}>
              <Card
                className={
                  advice
                    ? "border-primary/30"
                    : isActive
                      ? "border-primary/60"
                      : "opacity-60"
                }
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                        advice
                          ? "border-primary bg-primary text-primary-foreground"
                          : isActive
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground"
                      }`}
                    >
                      {advice ? "✓" : step.index + 1}
                    </div>
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

                      {/* Streaming or saved advice */}
                      {(isStreaming || advice) && (
                        <div className="mt-3 rounded-lg border bg-muted/30 p-4">
                          <div className="prose-sm max-w-none text-[13px] leading-relaxed [&_h2]:mt-3 [&_h2]:text-sm [&_h2]:font-semibold [&_p]:my-2 [&_ul]:my-2">
                            <Streamdown>
                              {isStreaming ? liveText || "…" : advice}
                            </Streamdown>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {isActive && (
                          <Button
                            size="sm"
                            onClick={() => runStep(step)}
                            disabled={streaming !== null}
                          >
                            {isStreaming ? "Thinking…" : "Work through this step"}
                          </Button>
                        )}
                        {advice && !isStreaming && (
                          <>
                            <Button
                              size="sm"
                              onClick={() =>
                                setCementSeed({
                                  conceptSlug: step.conceptSlug,
                                  conceptTitle: step.conceptTitle,
                                  conceptCategory: step.category,
                                  sourceAnswer: advice,
                                })
                              }
                            >
                              Add to my plan
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => runStep(step)}
                              disabled={streaming !== null}
                            >
                              Redo
                            </Button>
                          </>
                        )}
                        {isLocked && (
                          <span className="text-xs text-muted-foreground">
                            Complete the step above first
                          </span>
                        )}
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

      {error && (
        <p className="text-center text-xs text-destructive">{error}</p>
      )}

      {/* Synthesis */}
      <Card className={allDone ? "border-primary" : "border-dashed"}>
        <CardContent className="p-5">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">
                {allDone ? "Your recommendation" : "Finish line"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {allDone
                  ? `Tie every step into one decisive plan for ${profile?.name ?? "your business"}.`
                  : `Work the steps above (${doneCount}/${steps.length} done), then pull them into one decisive plan.`}
              </p>
            </div>
            <Button
              onClick={runSynthesis}
              disabled={!allDone || streaming !== null}
              className="shrink-0"
            >
              {streaming === "synthesis"
                ? "Building…"
                : state.synthesis
                  ? "Rebuild"
                  : "Build my recommendation"}
            </Button>
          </div>

          {(streaming === "synthesis" || state.synthesis) && (
            <div className="mt-4 rounded-lg border bg-muted/30 p-4">
              <div className="prose-sm max-w-none text-[13px] leading-relaxed [&_h2]:mt-3 [&_h2]:text-sm [&_h2]:font-semibold [&_p]:my-2 [&_ul]:my-2">
                <Streamdown>
                  {streaming === "synthesis" ? liveText || "…" : state.synthesis}
                </Streamdown>
              </div>
              {state.synthesis && streaming !== "synthesis" && (
                <div className="mt-3">
                  <Button
                    size="sm"
                    onClick={() =>
                      setCementSeed({
                        conceptTitle: `${title} — recommendation`,
                        section,
                        sourceAnswer: state.synthesis,
                      })
                    }
                  >
                    Add recommendation to my plan
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <CementDialog seed={cementSeed} onClose={() => setCementSeed(null)} />
    </div>
  );
}
