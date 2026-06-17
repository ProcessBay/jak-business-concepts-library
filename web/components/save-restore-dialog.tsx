"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import {
  downloadWorkspace,
  exportWorkspace,
  importWorkspace,
  parseWorkspace,
  workspaceToCode,
} from "@/lib/workspace";

export function SaveRestoreDialog() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [restoreText, setRestoreText] = React.useState("");
  const [status, setStatus] = React.useState<string | null>(null);

  // Compute the export code lazily when the dialog opens.
  React.useEffect(() => {
    if (open) {
      setCode(workspaceToCode(exportWorkspace()));
      setStatus(null);
      setRestoreText("");
    }
  }, [open]);

  function restoreFromText() {
    const ws = parseWorkspace(restoreText);
    if (!ws) {
      setStatus("That doesn't look like a valid backup. Check the code or file.");
      return;
    }
    importWorkspace(ws);
    setStatus("Restored. Your business and plan are back.");
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((t) => {
      const ws = parseWorkspace(t);
      if (!ws) {
        setStatus("Couldn't read that file as a backup.");
        return;
      }
      importWorkspace(ws);
      setStatus("Restored from file. Your business and plan are back.");
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Save or restore your work"
            title="Save / restore"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <path d="M17 21v-8H7v8M7 3v5h8" />
            </svg>
          </button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Save &amp; restore your work</DialogTitle>
          <DialogDescription>
            Your business profile and plan live in this browser. Back them up to
            keep them safe or move them to another device. Nothing is stored on
            our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <div className="mb-2 text-xs font-medium">Back up</div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={downloadWorkspace}>
                Download backup file
              </Button>
              <CopyButton text={code} label="Copy backup code" />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              The file (or code) contains your profile and every decision in
              your plan.
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="mb-2 text-xs font-medium">Restore</div>
            <input
              type="file"
              accept=".json"
              onChange={onFile}
              className="mb-2 text-xs text-muted-foreground file:me-3 file:rounded-md file:border file:bg-background file:px-3 file:py-1.5 file:text-xs file:font-medium"
            />
            <textarea
              value={restoreText}
              onChange={(e) => setRestoreText(e.target.value)}
              rows={3}
              placeholder="…or paste a backup code here"
              className="w-full resize-none rounded-lg border bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={restoreFromText}
              disabled={restoreText.trim().length < 8}
            >
              Restore from code
            </Button>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Restoring replaces your current profile and plan in this browser.
            </p>
          </div>

          {status && (
            <p className="text-xs font-medium text-primary">{status}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
