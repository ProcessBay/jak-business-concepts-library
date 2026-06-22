/**
 * Speech-to-text via Azure AI Foundry (gpt-4o-transcribe).
 *
 * Accepts a multipart upload with an `audio` blob, forwards it to the Azure
 * OpenAI-compatible /audio/transcriptions endpoint, returns { text }.
 *
 * Auth/base default to the same Azure resource that hosts Kimi (dual-header
 * auth so both Moonshot-direct and Azure work). Returns 501 when no
 * TRANSCRIBE_MODEL deployment is configured — the client then falls back to
 * the browser Web Speech API.
 */
export const maxDuration = 60;

const BASE = process.env.SPEECH_BASE_URL ?? process.env.KIMI_BASE_URL ?? "";
const KEY = process.env.SPEECH_API_KEY ?? process.env.KIMI_API_KEY ?? "";
const MODEL = process.env.TRANSCRIBE_MODEL ?? "";

export async function POST(req: Request) {
  if (!MODEL) {
    return Response.json({ error: "stt-not-configured" }, { status: 501 });
  }
  try {
    const inForm = await req.formData();
    const audio = inForm.get("audio");
    if (!(audio instanceof Blob)) {
      return Response.json({ error: "no-audio" }, { status: 400 });
    }

    const out = new FormData();
    out.append("file", audio, (audio as File).name || "audio.webm");
    out.append("model", MODEL);
    // Hint the model toward the languages this product serves.
    const lang = inForm.get("language");
    if (typeof lang === "string" && lang) out.append("language", lang);

    const res = await fetch(`${BASE}/audio/transcriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "api-key": KEY },
      body: out,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[voice/transcribe] upstream", res.status, detail.slice(0, 300));
      return Response.json({ error: "upstream", status: res.status }, { status: 502 });
    }

    const data = (await res.json()) as { text?: string };
    return Response.json({ text: (data.text ?? "").trim() });
  } catch (error) {
    console.error("[voice/transcribe] failed:", error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
