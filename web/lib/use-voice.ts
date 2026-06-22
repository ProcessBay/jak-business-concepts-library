"use client";

import * as React from "react";

/**
 * Voice I/O for "Talk to the graph".
 *
 * Premium path: Azure Foundry gpt-4o-transcribe (STT) + gpt-4o-mini-tts (TTS),
 * detected via /api/voice/config. Fallback: the browser Web Speech API
 * (SpeechRecognition + speechSynthesis) so the experience works everywhere,
 * even before the Azure deployments exist.
 */

type Engine = "azure" | "webspeech" | "none";

interface VoiceConfig {
  stt: boolean;
  tts: boolean;
}

// Minimal shapes for the non-standardized Web Speech API.
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: unknown) => void) | null;
  start: () => void;
  stop: () => void;
}
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>;
}

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export interface UseVoice {
  ready: boolean;
  sttEngine: Engine;
  ttsEngine: Engine;
  listening: boolean;
  speaking: boolean;
  interim: string;
  /** Begin capturing speech; onFinal fires once with the transcript. */
  startListening: (onFinal: (text: string) => void, lang?: string) => Promise<void>;
  stopListening: () => void;
  speak: (text: string, voice?: string) => Promise<void>;
  stopSpeaking: () => void;
}

export function useVoice(): UseVoice {
  const [config, setConfig] = React.useState<VoiceConfig | null>(null);
  const [listening, setListening] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);
  const [interim, setInterim] = React.useState("");

  const recognitionRef = React.useRef<SpeechRecognitionLike | null>(null);
  const mediaRef = React.useRef<{
    rec: MediaRecorder;
    chunks: Blob[];
    stream: MediaStream;
    onFinal: (t: string) => void;
    lang?: string;
  } | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    let alive = true;
    fetch("/api/voice/config")
      .then((r) => r.json())
      .then((c: VoiceConfig) => alive && setConfig(c))
      .catch(() => alive && setConfig({ stt: false, tts: false }));
    return () => {
      alive = false;
    };
  }, []);

  const hasWebSpeechSTT = !!getSpeechRecognition();
  const hasWebSpeechTTS =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const sttEngine: Engine = config?.stt
    ? "azure"
    : hasWebSpeechSTT
      ? "webspeech"
      : "none";
  const ttsEngine: Engine = config?.tts
    ? "azure"
    : hasWebSpeechTTS
      ? "webspeech"
      : "none";

  const startListening = React.useCallback(
    async (onFinal: (text: string) => void, lang = "en-US") => {
      if (listening) return;
      setInterim("");

      if (sttEngine === "azure") {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const rec = new MediaRecorder(stream);
          const chunks: Blob[] = [];
          rec.ondataavailable = (e) => {
            if (e.data.size) chunks.push(e.data);
          };
          rec.onstop = async () => {
            stream.getTracks().forEach((t) => t.stop());
            setListening(false);
            const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
            const fd = new FormData();
            fd.append("audio", blob, "audio.webm");
            if (lang) fd.append("language", lang.split("-")[0]);
            try {
              const r = await fetch("/api/voice/transcribe", { method: "POST", body: fd });
              const d = (await r.json()) as { text?: string };
              if (d.text) onFinal(d.text);
            } catch {
              /* swallow — user can retry */
            }
          };
          mediaRef.current = { rec, chunks, stream, onFinal, lang };
          rec.start();
          setListening(true);
        } catch {
          setListening(false);
        }
        return;
      }

      if (sttEngine === "webspeech") {
        const SR = getSpeechRecognition();
        if (!SR) return;
        const rec = new SR();
        rec.lang = lang;
        rec.interimResults = true;
        rec.continuous = false;
        let finalText = "";
        rec.onresult = (e) => {
          let interimText = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const r = e.results[i];
            const t = r[0].transcript;
            if (r.isFinal) finalText += t;
            else interimText += t;
          }
          setInterim(interimText || finalText);
        };
        rec.onend = () => {
          setListening(false);
          setInterim("");
          if (finalText.trim()) onFinal(finalText.trim());
        };
        rec.onerror = () => setListening(false);
        recognitionRef.current = rec;
        rec.start();
        setListening(true);
      }
    },
    [listening, sttEngine]
  );

  const stopListening = React.useCallback(() => {
    if (sttEngine === "azure") mediaRef.current?.rec.stop();
    else recognitionRef.current?.stop();
  }, [sttEngine]);

  const stopSpeaking = React.useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  const speak = React.useCallback(
    async (text: string, voice?: string) => {
      const clean = text.trim();
      if (!clean) return;
      stopSpeaking();

      if (ttsEngine === "azure") {
        setSpeaking(true);
        try {
          const r = await fetch("/api/voice/speak", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: clean, voice }),
          });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const blob = await r.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audioRef.current = audio;
          audio.onended = () => {
            setSpeaking(false);
            URL.revokeObjectURL(url);
          };
          audio.onerror = () => {
            setSpeaking(false);
            URL.revokeObjectURL(url);
          };
          await audio.play();
        } catch {
          setSpeaking(false);
        }
        return;
      }

      if (ttsEngine === "webspeech") {
        setSpeaking(true);
        const u = new SpeechSynthesisUtterance(clean);
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(u);
      }
    },
    [ttsEngine, stopSpeaking]
  );

  // Tear down on unmount.
  React.useEffect(
    () => () => {
      try {
        recognitionRef.current?.stop();
        mediaRef.current?.stream.getTracks().forEach((t) => t.stop());
        audioRef.current?.pause();
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
      } catch {
        /* noop */
      }
    },
    []
  );

  return {
    ready: config !== null,
    sttEngine,
    ttsEngine,
    listening,
    speaking,
    interim,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}
