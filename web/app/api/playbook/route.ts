import { streamText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { atomBySlug } from "@/lib/atoms";
import { atomExcerpt, SYSTEM_PROMPT } from "@/lib/prompts";

export const maxDuration = 60;

const kimi = createOpenAICompatible({
  name: "kimi",
  apiKey: process.env.KIMI_API_KEY ?? "",
  baseURL: process.env.KIMI_BASE_URL ?? "https://api.moonshot.ai/v1",
  headers: { "api-key": process.env.KIMI_API_KEY ?? "" },
});
const MODEL = process.env.KIMI_MODEL ?? "moonshot-v1-auto";

interface PriorStep {
  title: string;
  /** The decision/advice produced in that step (trimmed). */
  advice: string;
}

interface Body {
  mode: "step" | "synthesis";
  profile?: string;
  playbookTitle: string;
  question: string;
  // step mode
  conceptSlug?: string;
  framing?: string;
  task?: string;
  prior?: PriorStep[];
  stepIndex?: number;
  totalSteps?: number;
  // synthesis mode
  steps?: PriorStep[];
}

function priorBlock(prior: PriorStep[]): string {
  if (!prior?.length) return "";
  return (
    "\n\nDECISIONS ALREADY MADE IN THIS SESSION (build on these — stay " +
    "consistent, reference them where relevant, do NOT repeat their content):\n" +
    prior
      .map((p, i) => `${i + 1}. ${p.title}: ${p.advice.slice(0, 700).trim()}`)
      .join("\n\n")
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const profileBlock = body.profile
      ? `\n\nTHE BUSINESS (apply everything to this specifically):\n${body.profile.slice(0, 1400)}`
      : "\n\n(No business profile provided — give the best general guidance, but note where their specifics would sharpen it.)";

    let system: string;
    let prompt: string;
    let maxOutputTokens: number;

    if (body.mode === "synthesis") {
      const steps = body.steps ?? [];
      system =
        SYSTEM_PROMPT +
        `\n\nYou are CLOSING a guided strategy session titled "${body.playbookTitle}", ` +
        `which set out to answer: ${body.question}\n\n` +
        "You are given the decisions worked out across the session's steps. " +
        "Synthesize them into ONE coherent, decisive recommendation for this " +
        "business — the through-line, not a summary of each step.\n\n" +
        "STRUCTURE:\n" +
        "- Open with the recommendation in 1-2 sentences (no header). Be decisive.\n" +
        "- `## The plan` — 3-5 sentences or tight bullets showing how the pieces " +
        "fit into one move, grounded in the decisions made.\n" +
        "- `## First 30 days` — 3-4 concrete sequenced actions.\n" +
        "- `## The number to watch` — the single metric that proves it's working.\n" +
        "- Close with `**Bottom line —**` and one sharp sentence.\n" +
        "Aim for ~300-450 words. Build only on the session's decisions and the " +
        "business; do not introduce new frameworks." +
        profileBlock +
        priorBlock(steps);
      prompt =
        "Write the closing recommendation for this session, tying every step " +
        "into one decisive plan for the business.";
      maxOutputTokens = 1200;
    } else {
      const atom = body.conceptSlug ? atomBySlug.get(body.conceptSlug) : null;
      const excerpt = atom
        ? atomExcerpt(atom)
        : "(concept not found — reason from the task and the business only)";
      system =
        SYSTEM_PROMPT +
        `\n\nYou are guiding a founder through step ${body.stepIndex ?? 1} of ${body.totalSteps ?? "several"} ` +
        `in the playbook "${body.playbookTitle}", working toward: ${body.question}\n\n` +
        "Apply THIS step's concept to the business and move their thinking one " +
        "concrete step forward. This is one move in a sequence — be focused and " +
        "decisive, not a full essay.\n\n" +
        "STRUCTURE:\n" +
        "- 2-4 tight paragraphs (or a short paragraph + 3-4 bullets) applying " +
        "the concept to this specific business.\n" +
        "- Build on the decisions already made earlier in the session.\n" +
        "- End with `**Your move —**` and ONE concrete, specific decision for " +
        "this step that the founder could cement into their plan.\n" +
        "Aim for ~150-260 words. No preamble.\n\n" +
        "WIKI EXCERPT (the only knowledge you may use for this concept):\n\n" +
        excerpt +
        profileBlock +
        priorBlock(body.prior ?? []);
      prompt = body.task ?? `Apply ${atom?.title ?? "this concept"} to the business.`;
      maxOutputTokens = 700;
    }

    const result = streamText({
      model: kimi(MODEL),
      system,
      prompt,
      temperature: 0.5,
      maxOutputTokens,
      providerOptions: { kimi: { reasoningEffort: "none" } },
      onError: ({ error }) => console.error("[playbook] stream error:", error),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[playbook] request failed:", error);
    return Response.json({ error: "Failed to process the request." }, { status: 500 });
  }
}
