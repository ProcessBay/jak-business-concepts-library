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

/**
 * Turn a piece of advice into ONE concrete, practical commitment for the
 * user's plan — the thing they'll actually DO, specific to their business.
 * This runs when a user cements a concept into their model, so the plan
 * holds real directives, not summary sentences.
 */
export async function POST(req: Request) {
  try {
    const {
      conceptTitle,
      answer,
      profile,
    }: { conceptTitle?: string; answer?: string; profile?: string } =
      await req.json();

    const advice = (answer ?? "").slice(0, 6000).trim();
    if (advice.length < 40) {
      return Response.json({ decision: "" });
    }

    const system =
      "You convert business advice into ONE concrete, practical commitment the " +
      "business will add to its plan — what they will actually DO, in their own " +
      "context.\n\n" +
      "RULES:\n" +
      "- 2-4 sentences, or up to 3 short bullet points. No more.\n" +
      "- Start with a verb. State the decision; no 'you should consider' hedging.\n" +
      "- Be specific to THIS business — use its industry, customers, model.\n" +
      "- Make it executable: a real next move, not a restatement of theory.\n" +
      "- Do NOT define the concept or give background. Just the practical direction.\n" +
      "- No preamble, no headers, no 'Here is'. Output only the commitment.";

    const user =
      (profile ? `BUSINESS:\n${profile}\n\n` : "") +
      (conceptTitle ? `CONCEPT BEING APPLIED: ${conceptTitle}\n\n` : "") +
      `ADVICE GIVEN:\n${advice}\n\n` +
      "Write the practical commitment for this business's plan.";

    const { text } = await generateText({
      model: kimi(MODEL),
      temperature: 0.4,
      maxOutputTokens: 600,
      providerOptions: { kimi: { reasoningEffort: "none" } },
      system,
      prompt: user,
    });

    return Response.json({ decision: text.trim() });
  } catch (error) {
    console.error("[cement] synthesis failed:", error);
    // Soft-fail: the client falls back to its local Bottom-line extraction.
    return Response.json({ decision: "" }, { status: 200 });
  }
}
