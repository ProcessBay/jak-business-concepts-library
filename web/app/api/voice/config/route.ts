/**
 * Reports which premium-voice engines are wired, so the client can pick
 * Azure (studio quality) and fall back to the browser Web Speech API when a
 * deployment name isn't set. Set TRANSCRIBE_MODEL / TTS_MODEL to the Azure
 * Foundry DEPLOYMENT names to turn the premium path on.
 */
export async function GET() {
  return Response.json({
    stt: !!process.env.TRANSCRIBE_MODEL,
    tts: !!process.env.TTS_MODEL,
  });
}
