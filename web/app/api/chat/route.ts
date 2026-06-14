import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { searchAtoms, detectIntent } from "@/lib/search";
import { buildSystemPrompt } from "@/lib/prompts";

export const maxDuration = 60;

// Works with both Moonshot direct (Bearer) and Azure AI Foundry (api-key
// header) — we send both auth headers; each provider ignores the other's.
const kimi = createOpenAICompatible({
  name: "kimi",
  apiKey: process.env.KIMI_API_KEY ?? "",
  baseURL: process.env.KIMI_BASE_URL ?? "https://api.moonshot.ai/v1",
  headers: { "api-key": process.env.KIMI_API_KEY ?? "" },
});

const MODEL = process.env.KIMI_MODEL ?? "moonshot-v1-auto";

function latestUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "user") continue;
    return m.parts
      .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
      .map((p) => p.text)
      .join("\n");
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      profile,
    }: { messages: UIMessage[]; profile?: string } = await req.json();

    const query = latestUserText(messages);
    const intent = detectIntent(query);
    const hits = searchAtoms(query, 4);
    let system = buildSystemPrompt(intent, hits.map((h) => h.atom));

    if (profile && typeof profile === "string") {
      system += `

THE USER'S BUSINESS (apply everything to this — this is the whole point):
${profile.slice(0, 1500)}

PERSONALIZATION RULES:
- Apply each concept directly to THIS business. Use their industry, their customers, their stage — not generic examples.
- When the wiki gives a framework, walk it through their situation step by step.
- When the wiki's examples (companies) illustrate a mechanic, connect the mechanic back to their context explicitly.
- Address them as "you/your" — this is advice, not a lecture.
- Grounding rules still apply: concepts and named companies only from the wiki excerpts. The user's business details come only from the profile above.`;
    }

    const result = streamText({
      model: kimi(MODEL),
      system,
      messages: await convertToModelMessages(messages),
      temperature: 0.55,
      maxOutputTokens: 4000, // includes K2.6 reasoning tokens
      onError: ({ error }) => {
        console.error("[chat] stream error:", error);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[chat] request failed:", error);
    return Response.json(
      { error: "Failed to process the request." },
      { status: 500 }
    );
  }
}
