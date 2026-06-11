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
import { Badge } from "@/components/ui/badge";
import {
  type BusinessProfile,
  getProfile,
  setProfile,
  subscribeProfile,
} from "@/lib/profile";

export function useBusinessProfile(): BusinessProfile | null {
  return React.useSyncExternalStore(subscribeProfile, getProfile, () => null);
}

export function BusinessProfileDialog() {
  const profile = useBusinessProfile();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function analyze() {
    setBusy(true);
    setError(null);
    try {
      let res: Response;
      if (file) {
        const form = new FormData();
        form.set("file", file);
        res = await fetch("/api/profile", { method: "POST", body: form });
      } else {
        res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setProfile(data.profile as BusinessProfile);
      setText("");
      setFile(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant={profile ? "secondary" : "default"} size="sm" nativeButton>
            {profile ? profile.name : "Add your business"}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {profile ? profile.name : "Tell the library about your business"}
          </DialogTitle>
          <DialogDescription>
            {profile
              ? "Every answer and concept is now applied to this business. Stored only in your browser."
              : "Paste a description or upload a document (pitch deck text, business plan, website copy — .pdf, .txt, .md). The library will tailor every answer to it. Nothing is stored on our servers."}
          </DialogDescription>
        </DialogHeader>

        {profile ? (
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">{profile.oneLiner}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium">Industry</span>
                <p className="text-muted-foreground">{profile.industry}</p>
              </div>
              <div>
                <span className="font-medium">Model</span>
                <p className="text-muted-foreground">{profile.businessModel}</p>
              </div>
              <div>
                <span className="font-medium">Customers</span>
                <p className="text-muted-foreground">{profile.customers}</p>
              </div>
              <div>
                <span className="font-medium">Stage</span>
                <p className="text-muted-foreground">{profile.stage}</p>
              </div>
            </div>
            {profile.challenges.length > 0 && (
              <div>
                <span className="text-xs font-medium">Challenges</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {profile.challenges.map((c) => (
                    <Badge key={c} variant="outline" className="text-[10px]">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setProfile(null)}
              >
                Remove
              </Button>
              <Button size="sm" onClick={() => setProfile(null)}>
                Replace…
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. We run a 12-person management consulting firm in Riyadh serving government and enterprise clients. Revenue is project-based and lumpy. We want recurring revenue and are exploring productizing our frameworks…"
              rows={6}
              className="w-full resize-none rounded-lg border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.txt,.md"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="text-xs text-muted-foreground file:me-3 file:rounded-md file:border file:bg-background file:px-3 file:py-1.5 file:text-xs file:font-medium"
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button
              onClick={analyze}
              disabled={busy || (!file && text.trim().length < 40)}
              className="w-full"
            >
              {busy ? "Analyzing your business…" : "Analyze"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
