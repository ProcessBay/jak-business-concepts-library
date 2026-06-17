import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const maxDuration = 60;

const kimi = createOpenAICompatible({
  name: "kimi",
  apiKey: process.env.KIMI_API_KEY ?? "",
  baseURL: process.env.KIMI_BASE_URL ?? "https://api.moonshot.ai/v1",
  headers: { "api-key": process.env.KIMI_API_KEY ?? "" },
});
const MODEL = process.env.KIMI_MODEL ?? "moonshot-v1-auto";

interface DecisionIn {
  decision: string;
  conceptTitle?: string;
}
interface PillarIn {
  id: string;
  label: string;
  hint: string;
  decisions: DecisionIn[];
}

/**
 * Synthesize the founder's cemented decisions into ONE coherent strategy.
 *
 * This is the "living plan" pass: instead of a pile of bullets, each pillar
 * becomes a tight narrative that weaves its decisions together, and the model
 * surfaces cross-pillar tensions and the most important gaps. The raw
 * decisions are never altered — this synthesis sits alongside them.
 *
 * Output is strict JSON so the client can render structured sections.
 */
export async function POST(req: Request) {
  try {
    const {
      profile,
      pillars,
    }: { profile?: string; pillars?: PillarIn[] } = await req.json();

    const withDecisions = (pillars ?? []).filter((p) => p.decisions?.length);
    if (withDecisions.length === 0) {
      return Response.json({ error: "no-decisions" }, { status: 400 });
    }

    const pillarBlocks = withDecisions
      .map((p) => {
        const lines = p.decisions
          .map(
            (d) =>
              `  - ${d.decision}${d.conceptTitle ? ` (via ${d.conceptTitle})` : ""}`
          )
          .join("\n");
        return `### ${p.label} [id: ${p.id}]\n(${p.hint})\n${lines}`;
      })
      .join("\n\n");

    const allIds = withDecisions.map((p) => p.id);

    const system =
      "You are a sharp startup strategist consolidating a founder's cemented " +
      "decisions into ONE coherent strategy. You are given their business and " +
      "the decisions they've committed to, grouped by strategic pillar.\n\n" +
      "Produce a synthesis — NOT a summary. Weave the decisions in each pillar " +
      "into a single coherent direction, in relation to each other and to the " +
      "business. Name the through-line.\n\n" +
      "RULES:\n" +
      "- Ground EVERYTHING in the decisions and the business given. Do NOT " +
      "invent strategy the founder didn't choose. You may connect dots between " +
      "their decisions, but don't add new bets.\n" +
      "- Each pillar narrative: 2-4 sentences, concrete, in their context. " +
      "Reference the actual decisions; don't restate them verbatim.\n" +
      "- tensions: real places where two decisions pull against each other or " +
      "create risk together. Be specific (name the decisions). [] if none.\n" +
      "- gaps: the 2-4 most important unanswered questions given their stage " +
      "and what they've decided. Sharp and specific, not generic.\n" +
      "- headline: one punchy sentence capturing their strategic thesis.\n\n" +
      "Output STRICT JSON only, no markdown fence, this exact shape:\n" +
      "{\n" +
      '  "headline": string,\n' +
      '  "pillars": { "<pillar-id>": string },  // only the ids given\n' +
      '  "tensions": string[],\n' +
      '  "gaps": string[]\n' +
      "}\n" +
      `Valid pillar ids: ${allIds.join(", ")}.`;

    const user =
      (profile ? `BUSINESS:\n${profile}\n\n` : "") +
      `CEMENTED DECISIONS BY PILLAR:\n${pillarBlocks}\n\n` +
      "Synthesize the coherent strategy as JSON.";

    const { text } = await generateText({
      model: kimi(MODEL),
      temperature: 0.5,
      maxOutputTokens: 1800,
      providerOptions: { kimi: { reasoningEffort: "none" } },
      system,
      prompt: user,
    });

    // Be forgiving about a stray code fence or prose around the JSON.
    const raw = text.trim();
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return Response.json({ error: "bad-output" }, { status: 502 });
    }
    const parsed = JSON.parse(raw.slice(start, end + 1)) as {
      headline?: string;
      pillars?: Record<string, string>;
      tensions?: string[];
      gaps?: string[];
    };

    // Keep only pillar ids we asked for.
    const pillarsOut: Record<string, string> = {};
    for (const id of allIds) {
      const v = parsed.pillars?.[id];
      if (typeof v === "string" && v.trim()) pillarsOut[id] = v.trim();
    }

    return Response.json({
      headline: (parsed.headline ?? "").trim(),
      pillars: pillarsOut,
      tensions: (parsed.tensions ?? []).filter(Boolean).slice(0, 8),
      gaps: (parsed.gaps ?? []).filter(Boolean).slice(0, 6),
    });
  } catch (error) {
    console.error("[synthesize-strategy] failed:", error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
