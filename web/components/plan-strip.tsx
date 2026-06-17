"use client";

import Link from "next/link";
import { useBusinessModel } from "@/components/cement-dialog";
import { PLAN_SECTIONS, decisionsBySection } from "@/lib/business-model";

/** Compact at-a-glance strip of the 8 plan pillars with how many decisions
 *  each holds — sits below the ask on the home page, links into /model. */
export function PlanStrip() {
  const model = useBusinessModel();
  const bySection = decisionsBySection(model);
  const total = model.decisions.length;
  const covered = PLAN_SECTIONS.filter((s) => bySection[s.id].length).length;

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Your plan
        </span>
        <Link
          href="/model"
          className="text-xs font-medium text-primary underline-offset-2 hover:underline"
        >
          {total > 0 ? `${total} decision${total === 1 ? "" : "s"} · ${covered}/8 areas →` : "Open →"}
        </Link>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PLAN_SECTIONS.map((s) => {
          const n = bySection[s.id].length;
          return (
            <Link
              key={s.id}
              href={n > 0 ? "/model" : `/?q=${encodeURIComponent(s.prompt)}`}
              title={n > 0 ? `${n} in ${s.label}` : `Work on ${s.label}`}
              className={
                "rounded-full border px-2.5 py-1 text-xs transition-colors " +
                (n > 0
                  ? "border-primary/40 bg-primary/5 text-foreground hover:border-primary"
                  : "text-muted-foreground hover:border-primary hover:text-primary")
              }
            >
              {s.label}
              {n > 0 && <span className="ms-1 font-medium text-primary">{n}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
