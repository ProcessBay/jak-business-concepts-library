"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Streamdown } from "streamdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProfile, profilePromptBlock } from "@/lib/profile";
import { useBusinessProfile } from "@/components/business-profile-dialog";
import { CementDialog, type CementSeed } from "@/components/cement-dialog";
import { CopyButton } from "@/components/copy-button";
import { CementedGraph } from "@/components/cemented-graph";
import { PlanStrip } from "@/components/plan-strip";
import { ATOM_COUNT } from "@/lib/atoms";

interface ConceptRef {
  title: string;
  slug: string;
  category: string;
}

const SUGGESTIONS = [
  "What is value-based pricing?",
  "Compare freemium vs free trial",
  "What business model fits an online store?",
  "How do network effects create moats?",
];

const PROFILE_SUGGESTIONS = [
  "Which pricing model fits our business?",
  "What's our biggest strategic risk right now?",
  "Which growth lever should we pull first?",
  "How could we add recurring revenue?",
];

function MessageText({ text }: { text: string }) {
  return (
    <div className="prose-chat text-[0.95rem]">
      <Streamdown>{text}</Streamdown>
    </div>
  );
}

export function Chat() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeProfile = useBusinessProfile();
  const [input, setInput] = React.useState("");
  // Related-concept chips per user query (keyed by the query text)
  const [chips, setChips] = React.useState<Record<string, ConceptRef[]>>({});
  const [cementSeed, setCementSeed] = React.useState<CementSeed | null>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const autoSent = React.useRef(false);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // Reset to a fresh home dashboard. Fired by the "Home" nav (when already on
  // "/") and the in-conversation "New" button — so returning home never just
  // replays the last conversation.
  const resetChat = React.useCallback(() => {
    setMessages([]);
    setChips({});
    setInput("");
    autoSent.current = false;
    if (window.location.search) router.replace("/");
  }, [setMessages, router]);

  React.useEffect(() => {
    const handler = () => resetChat();
    window.addEventListener("jak:new-chat", handler);
    return () => window.removeEventListener("jak:new-chat", handler);
  }, [resetChat]);

  const ask = React.useCallback(
    (text: string) => {
      const q = text.trim();
      if (!q) return;
      // Read the profile at send time so it's always current.
      const profile = getProfile();
      sendMessage(
        { text: q },
        { body: profile ? { profile: profilePromptBlock(profile) } : {} }
      );
      setInput("");
      // Fire the local search for citation chips — instant, no LLM.
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((refs: ConceptRef[]) =>
          setChips((prev) => ({ ...prev, [q]: refs }))
        )
        .catch(() => {});
    },
    [sendMessage]
  );

  // ?q= deep link (concept pages link here with a prefilled question)
  React.useEffect(() => {
    const q = searchParams.get("q");
    if (q && !autoSent.current) {
      autoSent.current = true;
      ask(q);
    }
  }, [searchParams, ask]);

  // Fires per streamed chunk — keep it instant; smooth-scroll would queue
  // animation frames faster than they can complete.
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, [messages]);

  const isEmpty = messages.length === 0;
  const isBusy = status === "submitted" || status === "streaming";

  // Track the latest user query so chips render under the reply to it
  let lastUserText = "";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4">
      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-12 text-center">
          {/* Your business map — grows as concepts are cemented (above the ask). */}
          {activeProfile && (
            <div className="mb-4 w-full max-w-2xl">
              <CementedGraph />
            </div>
          )}
          <h1 className="text-3xl font-semibold tracking-tight">
            {activeProfile
              ? `What are you trying to figure out for ${activeProfile.name}?`
              : "What are you trying to figure out?"}
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            {activeProfile
              ? `Answers are tailored to ${activeProfile.name} — ${activeProfile.oneLiner}`
              : `Ask anything about business models, pricing, growth, metrics, platform economics, or strategy. Every answer is grounded in a curated library of ${ATOM_COUNT} concepts — no invented facts.`}
          </p>
          <form
            className="mt-8 w-full max-w-xl"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the library…"
              className="w-full rounded-xl border bg-background px-5 py-4 text-base shadow-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
            />
          </form>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {(activeProfile ? PROFILE_SUGGESTIONS : SUGGESTIONS).map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
          {/* The central plan, below the ask. */}
          {activeProfile && (
            <div className="mt-10 flex w-full justify-center">
              <PlanStrip />
            </div>
          )}
          <div className="mt-8 text-xs text-muted-foreground">
            Working toward a decision?{" "}
            <Link
              href="/playbooks"
              className="font-medium text-primary hover:underline"
            >
              Follow a playbook
            </Link>{" "}
            — guided paths like{" "}
            <Link href="/playbooks/price-your-product" className="underline-offset-2 hover:underline">
              Price your product
            </Link>{" "}
            or{" "}
            <Link href="/playbooks/add-recurring-revenue" className="underline-offset-2 hover:underline">
              Add recurring revenue
            </Link>
            .
          </div>
        </div>
      ) : (
        <>
          <div className="sticky top-14 z-10 -mx-4 flex items-center justify-between border-b bg-background/90 px-4 py-2 backdrop-blur">
            <button
              onClick={resetChat}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Home
            </button>
            <button
              onClick={resetChat}
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5v14" />
              </svg>
              New question
            </button>
          </div>
          <div className="flex-1 space-y-6 py-8">
            {messages.map((message) => {
              if (message.role === "user") {
                const text = message.parts
                  .filter((p) => p.type === "text")
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                lastUserText = text;
                return (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-muted px-4 py-2.5 text-[0.95rem]">
                      {text}
                    </div>
                  </div>
                );
              }
              const refs = chips[lastUserText] ?? [];
              const answerText = message.parts
                .filter((p) => p.type === "text")
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const topConcept = refs[0];
              // Only offer "add to model" once the answer has finished streaming.
              const isLast = message.id === messages[messages.length - 1]?.id;
              const answerDone = !isLast || status === "ready" || status === "error";
              return (
                <div key={message.id}>
                  {message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <MessageText key={`${message.id}-${i}`} text={part.text} />
                    ) : null
                  )}
                  {refs.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Sources
                      </span>
                      {refs.map((ref) => (
                        <Link key={ref.slug} href={`/concepts/${ref.slug}`}>
                          <Badge
                            variant="secondary"
                            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            {ref.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                  {answerText.trim() && answerDone && (
                    // The read-vs-adopt split: read freely, or commit this into
                    // your consolidated business model.
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() =>
                          setCementSeed({
                            conceptSlug: topConcept?.slug,
                            conceptTitle: topConcept?.title ?? lastUserText.slice(0, 60),
                            conceptCategory: topConcept?.category,
                            sourceAnswer: answerText,
                          })
                        }
                        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5v14" />
                        </svg>
                        Add to my model
                      </button>
                      <CopyButton text={answerText} />
                    </div>
                  )}
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
                Searching the library…
              </div>
            )}
            {/* K2.6 reasons before it writes — show a pulse while the last
                assistant message is streaming reasoning but has no text yet. */}
            {status === "streaming" &&
              (() => {
                const last = messages[messages.length - 1];
                const hasVisibleText =
                  last?.role === "assistant" &&
                  last.parts.some((p) => p.type === "text" && p.text.trim());
                return last?.role === "assistant" && !hasVisibleText ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
                    Thinking it through…
                  </div>
                ) : null;
              })()}
            {status === "error" && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                The AI engine is temporarily unavailable — your question
                wasn&apos;t lost, try sending it again in a little while.
                Browsing the{" "}
                <Link href="/library" className="underline">
                  library
                </Link>{" "}
                and{" "}
                <Link href="/playbooks" className="underline">
                  playbooks
                </Link>{" "}
                still works.
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <form
            className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pb-6 pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a follow-up…"
                className="flex-1 rounded-xl border bg-background px-4 py-3 text-[0.95rem] shadow-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="lg" disabled={isBusy || !input.trim()}>
                Send
              </Button>
            </div>
          </form>
        </>
      )}
      <CementDialog seed={cementSeed} onClose={() => setCementSeed(null)} />
    </div>
  );
}
