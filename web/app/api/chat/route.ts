import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { searchAtoms, detectIntent } from "@/lib/search";
import { buildSystemPrompt } from "@/lib/prompts";

export const maxDuration = 60;

const kimi = createOpenAICompatible({
  name: "moonshot",
  apiKey: process.env.KIMI_API_KEY ?? "",
  baseURL: process.env.KIMI_BASE_URL ?? "https://api.moonshot.ai/v1",
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
    const { messages }: { messages: UIMessage[] } = await req.json();

    const query = latestUserText(messages);
    const intent = detectIntent(query);
    const hits = searchAtoms(query, 4);
    const system = buildSystemPrompt(intent, hits.map((h) => h.atom));

    const result = streamText({
      model: kimi(MODEL),
      system,
      messages: await convertToModelMessages(messages),
      temperature: 0.55,
      maxOutputTokens: 2400,
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
