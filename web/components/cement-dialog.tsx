"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  type BusinessModel,
  type SectionId,
  PLAN_SECTIONS,
  addDecision,
  getModel,
  subscribeModel,
  suggestSection,
} from "@/lib/business-model";

export function useBusinessModel(): BusinessModel {
  return React.useSyncExternalStore(subscribeModel, getModel, getModel);
}

/** Pull the "Bottom line —" takeaway out of a synthesis answer to pre-fill the
 *  decision field — the answer's own one-line conclusion is usually the right
 *  starting point for "what we'll do." */
export function extractBottomLine(answer: string): string {
  if (!answer) return "";
  const m = answer.match(/\*\*\s*Bottom line\s*[—–-]?\s*\*\*\s*[—–-]?\s*([\s\S]+?)(?:\n\n|\n#|$)/i);
  if (m) return m[1].replace(/\s+/g, " ").replace(/^[—–-]\s*/, "").trim().slice(0, 400);
  // Fall back to the last non-empty paragraph.
  const paras = answer.trim().split(/\n\n+/).filter(Boolean);
  const last = paras[paras.length - 1] ?? "";
  return last.replace(/[*#>`]/g, "").replace(/\s+/g, " ").trim().slice(0, 400);
}

export interface CementSeed {
  conceptSlug?: string;
  conceptTitle: string;
  conceptCategory?: string;
  /** Source answer text — used to pre-fill the decision + stored as rationale. */
  sourceAnswer?: string;
}

interface Props {
  seed: CementSeed | null;
  onClose: () => void;
}

export function CementDialog({ seed, onClose }: Props) {
  const [decision, setDecision] = React.useState("");
  const [section, setSection] = React.useState<SectionId>("strategy");
  const [saved, setSaved] = React.useState(false);

  // Seed the form whenever a new cement request arrives.
  React.useEffect(() => {
    if (!seed) return;
    setDecision(extractBottomLine(seed.sourceAnswer ?? ""));
    setSection(suggestSection(seed.conceptCategory));
    setSaved(false);
  }, [seed]);

  function save() {
    if (!seed || !decision.trim()) return;
    addDecision({
      conceptSlug: seed.conceptSlug,
      conceptTitle: seed.conceptTitle,
      conceptCategory: seed.conceptCategory,
      section,
      decision: decision.trim(),
      rationale: seed.sourceAnswer?.slice(0, 2000),
    });
    setSaved(true);
    window.setTimeout(onClose, 850);
  }

  return (
    <Dialog open={!!seed} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add to your business model</DialogTitle>
          <DialogDescription>
            Cement {seed?.conceptTitle ? <strong>{seed.conceptTitle}</strong> : "this concept"}{" "}
            into your consolidated model — capture what you&apos;ll actually do,
            and where it fits.
          </DialogDescription>
        </DialogHeader>

        {saved ? (
          <div className="flex items-center gap-2 py-6 text-sm text-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Added to your model.
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium">What you&apos;ll do</label>
              <textarea
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                rows={3}
                placeholder="e.g. Move to value-based tiers; price the Pro plan on ROI, not cost."
                className="mt-1 w-full resize-none rounded-lg border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs font-medium">
                Which part of your plan does this affect?
              </label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {PLAN_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSection(s.id)}
                    title={s.hint}
                    className={
                      "rounded-full border px-2.5 py-1 text-xs transition-colors " +
                      (section === s.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:border-primary hover:text-primary")
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={save} disabled={!decision.trim()} className="w-full">
              Add to my model
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
