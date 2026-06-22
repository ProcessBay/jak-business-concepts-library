"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Streamdown } from "streamdown";
import { Badge } from "@/components/ui/badge";
import { getProfile, profilePromptBlock } from "@/lib/profile";
import { useBusinessProfile } from "@/components/business-profile-dialog";
import { useVoice } from "@/lib/use-voice";
import { TalkGraph } from "@/components/talk-graph";

interface ConceptRef {
  title: string;
  slug: string;
  category: string;
}

function stripMd(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** A concise, natural thing to SAY — the lead + the bottom line — rather than
 *  reading 600 words of markdown aloud. */
function spokenSummary(md: string): string {
  const noFence = md.replace(/```[\s\S]*?```/g, " ");
  const firstPara =
    noFence.split(/\n\n+/).find((p) => p.trim() && !p.trim().startsWith("#")) ?? "";
  const bl = noFence.match(
    /\*\*\s*Bottom line\s*[—–-]?\s*\*\*\s*[—–-]?\s*([\s\S]+?)(?:\n\n|\n#|$)/i
  );
  let out = stripMd(firstPara);
  const bottom = bl ? stripMd(bl[1]) : "";
  if (bottom && !out.includes(bottom.slice(0, 30))) out += ". " + bottom;
  return out.replace(/\s+/g, " ").trim().slice(0, 520);
}

function answerOf(message: { parts: { type: string; text?: string }[] }): string {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export function TalkExperience() {
  const profile = useBusinessProfile();
  const voice = useVoice();
  const searchParams = useSearchParams();
  const [highlighted, setHighlighted] = React.useState<Set<string>>(new Set());
  const [sources, setSources] = React.useState<ConceptRef[]>([]);
  const [question, setQuestion] = React.useState("");
  const spokenIdRef = React.useRef<string | null>(null);
  const autoAsked = React.useRef(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const ask = React.useCallback(
    (text: string) => {
      const q = text.trim();
      if (!q) return;
      setQuestion(q);
      // Light up the exact concepts the answer is grounded in.
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((refs: ConceptRef[]) => {
          setSources(refs);
          setHighlighted(new Set(refs.map((r) => r.slug)));
        })
        .catch(() => {});
      const p = getProfile();
      sendMessage({ text: q }, { body: p ? { profile: profilePromptBlock(p) } : {} });
    },
    [sendMessage]
  );

  // Deep link: /talk?q=... auto-asks once (shareable + drives verification).
  React.useEffect(() => {
    const q = searchParams.get("q");
    if (q && !autoAsked.current) {
      autoAsked.current = true;
      ask(q);
    }
  }, [searchParams, ask]);

  // Speak the answer once it finishes streaming.
  React.useEffect(() => {
    if (status !== "ready") return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant" || last.id === spokenIdRef.current) return;
    spokenIdRef.current = last.id;
    const txt = answerOf(last);
    if (txt.trim()) voice.speak(spokenSummary(txt));
  }, [status, messages, voice]);

  // Keep the panel scrolled to the latest content.
  React.useEffect(() => {
    panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight });
  }, [messages]);

  const isThinking = status === "submitted" || status === "streaming";
  const active = isThinking || voice.speaking || voice.listening;

  const assistantText = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return answerOf(messages[i]);
    }
    return "";
  })();

  function micClick() {
    if (voice.speaking) {
      voice.stopSpeaking();
      return;
    }
    if (voice.listening) {
      voice.stopListening();
      return;
    }
    voice.startListening((text) => ask(text));
  }

  const hasConversation = !!question || messages.length > 0;

  const micState = voice.listening
    ? "listening"
    : isThinking
      ? "thinking"
      : voice.speaking
        ? "speaking"
        : "idle";

  const micLabel = {
    idle: "Tap to talk",
    listening: "Listening… tap to stop",
    thinking: "Thinking…",
    speaking: "Speaking… tap to stop",
  }[micState];

  const sttUnavailable = voice.ready && voice.sttEngine === "none";

  return (
    <div className="relative h-[calc(100dvh-3.5rem)] w-full overflow-hidden">
      <TalkGraph
        highlighted={highlighted}
        active={active}
        onNodeClick={(slug) => {
          const ref = sources.find((s) => s.slug === slug);
          ask(
            `Tell me about ${ref?.title ?? slug.replace(/-/g, " ")} and how it applies to ${
              profile?.name ?? "my business"
            }.`
          );
        }}
      />

      {/* Title + engine badge */}
      <div className="pointer-events-none absolute left-4 top-4 max-w-xs">
        <h1 className="text-lg font-semibold tracking-tight">Talk to the graph</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Ask out loud — watch the concepts behind the answer light up.
        </p>
        {voice.ready && (
          <span className="pointer-events-auto mt-2 inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur">
            <span
              className={
                "inline-block size-1.5 rounded-full " +
                (voice.sttEngine === "azure" ? "bg-emerald-500" : "bg-amber-500")
              }
            />
            {voice.sttEngine === "azure"
              ? "Premium voice (Azure)"
              : voice.sttEngine === "webspeech"
                ? "Browser voice"
                : "Voice unavailable"}
          </span>
        )}
      </div>

      {/* Conversation panel */}
      {hasConversation && (
        <div
          ref={panelRef}
          className="absolute right-3 top-3 bottom-28 w-[min(92vw,25rem)] overflow-y-auto rounded-2xl border bg-background/85 p-4 shadow-lg backdrop-blur-md"
        >
          {question && (
            <div className="mb-3 flex justify-end">
              <div className="max-w-[90%] rounded-2xl bg-muted px-3.5 py-2 text-sm">
                {question}
              </div>
            </div>
          )}

          {isThinking && !assistantText && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
              Searching the graph…
            </div>
          )}

          {assistantText && (
            <div className="prose-chat text-[0.92rem]">
              <Streamdown>{assistantText}</Streamdown>
            </div>
          )}

          {sources.length > 0 && (
            <div className="mt-4 border-t pt-3">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Lit up for this answer
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {sources.map((ref) => (
                  <Link key={ref.slug} href={`/concepts/${ref.slug}`}>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer text-[11px] transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {ref.title}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mic control */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <button
          onClick={micClick}
          disabled={isThinking || sttUnavailable}
          aria-label={micLabel}
          className={
            "relative flex size-16 items-center justify-center rounded-full text-primary-foreground shadow-lg transition-all disabled:opacity-60 " +
            (micState === "listening"
              ? "bg-red-500"
              : micState === "speaking"
                ? "bg-emerald-600"
                : "bg-primary hover:scale-105")
          }
        >
          {micState === "listening" && (
            <span className="absolute inset-0 animate-ping rounded-full bg-red-500/60" />
          )}
          {micState === "speaking" ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          )}
        </button>
        <span className="rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          {voice.listening && voice.interim ? voice.interim : micLabel}
        </span>
        {sttUnavailable && (
          <span className="max-w-xs text-center text-[11px] text-muted-foreground">
            Your browser doesn&apos;t support voice input. Try Chrome, or{" "}
            <Link href="/" className="text-primary underline-offset-2 hover:underline">
              type your question
            </Link>
            .
          </span>
        )}
      </div>
    </div>
  );
}
