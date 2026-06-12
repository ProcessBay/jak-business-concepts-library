import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { z } from "zod";

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

// Lenient by design: trim instead of reject. A model that returns 8
// challenges gave us a GOOD answer — refusing it is a self-inflicted 500.
const ProfileSchema = z.object({
  name: z.string(),
  oneLiner: z.string().transform((s) => s.slice(0, 160)),
  industry: z.string(),
  businessModel: z.string(),
  customers: z.string(),
  stage: z.string(),
  challenges: z.array(z.string()).transform((a) => a.slice(0, 6)),
  summary: z.string().transform((s) => s.slice(0, 1200)),
});

/** Parse model JSON, tolerating truncation: on failure, auto-close any
 *  unterminated string and unbalanced brackets, then retry once. */
function parseJsonLoose(raw: string): unknown {
  const match = raw.match(/\{[\s\S]*/);
  if (!match) throw new Error("no JSON object in model output");
  let text = match[0];
  try {
    return JSON.parse(text);
  } catch {
    // Trim a trailing incomplete token, close open string + brackets.
    text = text.replace(/,\s*"[^"]*$/, "").replace(/,\s*$/, "");
    const quotes = (text.match(/(?<!\\)"/g) ?? []).length;
    if (quotes % 2 === 1) text += '"';
    const opens = [...text].filter((c) => c === "{").length - [...text].filter((c) => c === "}").length;
    const openArr = [...text].filter((c) => c === "[").length - [...text].filter((c) => c === "]").length;
    text += "]".repeat(Math.max(0, openArr)) + "}".repeat(Math.max(0, opens));
    return JSON.parse(text);
  }
}

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

    const { text: out, finishReason } = await generateText({
      model: kimi(MODEL),
      temperature: 0.1,
      maxOutputTokens: 2000,
      system:
        "You extract a structured business profile from a document or description. " +
        "Reply with ONLY a JSON object — no markdown fences, no commentary. Schema: " +
        '{"name": string, "oneLiner": string (<=120 chars), "industry": string, ' +
        '"businessModel": string (how they make money, <=25 words), ' +
        '"customers": string (who they serve, <=20 words), ' +
        '"stage": string (idea/early/growth/established — with a short qualifier), ' +
        '"challenges": string[] (2-5 of the most pressing business challenges, each <=12 words), ' +
        '"summary": string (4-6 sentences capturing what matters for business-strategy advice)}. ' +
        "HARD LIMIT: keep the entire JSON under 350 words. Write in the document's own terms. " +
        "If a field is genuinely unknowable, use a best-effort inference rather than empty strings.",
      prompt: `BUSINESS DOCUMENT/DESCRIPTION:\n\n${rawText}`,
    });

    if (finishReason === "length") {
      // Output hit the token ceiling — the loose parser below usually still
      // recovers a usable profile, but log it so we see how often this fires.
      console.warn("[profile] output truncated at token ceiling");
    }

    const parsed = ProfileSchema.safeParse(parseJsonLoose(out));
    if (!parsed.success) {
      console.error(
        "[profile] schema mismatch:",
        parsed.error.issues,
        "| head:", out.slice(0, 200),
        "| tail:", out.slice(-200)
      );
      throw new Error("Extracted profile didn't match the expected shape");
    }

    return Response.json({
      profile: { ...parsed.data, createdAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error("[profile] extraction failed:", error);
    const msg = error instanceof Error ? error.message : String(error);
    // Quota/billing failures are NOT retryable — don't tell users to retry.
    if (/insufficient balance|exceeded_current_quota|suspended/i.test(msg)) {
      return Response.json(
        {
          error:
            "The AI engine is temporarily unavailable. Browsing the library, map, and playbooks still works — please try the analysis again later.",
        },
        { status: 503 }
      );
    }
    return Response.json(
      {
        error:
          "Analysis hiccuped — please try once more (it usually works on a retry). If it keeps failing, shorten the text to the most important paragraphs.",
      },
      { status: 500 }
    );
  }
}
