import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { z } from "zod";

export const maxDuration = 60;

const kimi = createOpenAICompatible({
  name: "moonshot",
  apiKey: process.env.KIMI_API_KEY ?? "",
  baseURL: process.env.KIMI_BASE_URL ?? "https://api.moonshot.ai/v1",
});
const MODEL = process.env.KIMI_MODEL ?? "moonshot-v1-auto";

const ProfileSchema = z.object({
  name: z.string(),
  oneLiner: z.string(),
  industry: z.string(),
  businessModel: z.string(),
  customers: z.string(),
  stage: z.string(),
  challenges: z.array(z.string()).max(6),
  summary: z.string(),
});

const MAX_INPUT_CHARS = 24_000;

async function extractFileText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) {
    const { extractText, getDocumentProxy } = await import("unpdf");
    const buffer = new Uint8Array(await file.arrayBuffer());
    const pdf = await getDocumentProxy(buffer);
    const { text } = await extractText(pdf, { mergePages: true });
    return text;
  }
  // txt / md / anything text-like
  return await file.text();
}

export async function POST(req: Request) {
  try {
    let rawText = "";
    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      const pasted = form.get("text");
      if (file instanceof File) rawText = await extractFileText(file);
      else if (typeof pasted === "string") rawText = pasted;
    } else {
      const { text } = await req.json();
      rawText = typeof text === "string" ? text : "";
    }

    rawText = rawText.trim().slice(0, MAX_INPUT_CHARS);
    if (rawText.length < 40) {
      return Response.json(
        { error: "Please provide more detail about the business (at least a few sentences)." },
        { status: 400 }
      );
    }

    const { text: out } = await generateText({
      model: kimi(MODEL),
      temperature: 0.1,
      maxOutputTokens: 800,
      system:
        "You extract a structured business profile from a document or description. " +
        "Reply with ONLY a JSON object — no markdown fences, no commentary. Schema: " +
        '{"name": string, "oneLiner": string (<=120 chars), "industry": string, ' +
        '"businessModel": string (how they make money), "customers": string (who they serve), ' +
        '"stage": string (idea/early/growth/established — with a short qualifier), ' +
        '"challenges": string[] (2-6 of the most pressing business challenges, inferred if not stated), ' +
        '"summary": string (4-6 sentences capturing what matters for business-strategy advice)}. ' +
        "Write in the document's own terms. If a field is genuinely unknowable, use a best-effort inference rather than empty strings.",
      prompt: `BUSINESS DOCUMENT/DESCRIPTION:\n\n${rawText}`,
    });

    // Tolerate accidental code fences or stray prose around the JSON.
    const jsonMatch = out.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Model returned no JSON object");
    const parsed = ProfileSchema.safeParse(JSON.parse(jsonMatch[0]));
    if (!parsed.success) {
      console.error("[profile] schema mismatch:", parsed.error.issues);
      throw new Error("Extracted profile didn't match the expected shape");
    }

    return Response.json({
      profile: { ...parsed.data, createdAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error("[profile] extraction failed:", error);
    return Response.json(
      { error: "Couldn't analyze that document. Try pasting the text directly." },
      { status: 500 }
    );
  }
}
