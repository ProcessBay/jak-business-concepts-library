/**
 * Text-to-speech via Azure AI Foundry (gpt-4o-mini-tts).
 *
 * Accepts { text, voice? }, calls the Azure OpenAI-compatible /audio/speech
 * endpoint, streams the audio back as audio/mpeg. Returns 501 when no
 * TTS_MODEL deployment is configured — the client falls back to the browser
 * speechSynthesis API.
 */
export const maxDuration = 60;

const BASE = process.env.SPEECH_BASE_URL ?? process.env.KIMI_BASE_URL ?? "";
const KEY = process.env.SPEECH_API_KEY ?? process.env.KIMI_API_KEY ?? "";
const MODEL = process.env.TTS_MODEL ?? "";
const VOICE = process.env.TTS_VOICE ?? "alloy";

export async function POST(req: Request) {
  if (!MODEL) {
    return Response.json({ error: "tts-not-configured" }, { status: 501 });
  }
  try {
    const { text, voice }: { text?: string; voice?: string } = await req.json();
    const input = (text ?? "").trim().slice(0, 2000);
    if (!input) return Response.json({ error: "no-text" }, { status: 400 });

    const res = await fetch(`${BASE}/audio/speech`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "api-key": KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        input,
        voice: voice || VOICE,
        // A warm, measured advisor tone — this is a co-strategist, not a reader.
        instructions:
          "Speak as a calm, sharp business strategist — warm, measured, confident. Natural pacing, not rushed.",
      }),
    });

    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => "");
      console.error("[voice/speak] upstream", res.status, detail.slice(0, 300));
      return Response.json({ error: "upstream", status: res.status }, { status: 502 });
    }

    return new Response(res.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[voice/speak] failed:", error);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
