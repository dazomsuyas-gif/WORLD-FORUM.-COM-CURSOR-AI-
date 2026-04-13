"use client";

import { useMemo, useRef, useState } from "react";

type State = "idle" | "recording" | "ready";

function supportsSpeechSynthesis() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function AudioPractice(props: { sampleText: string }) {
  const { sampleText } = props;
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const canRecord = useMemo(() => {
    return (
      typeof window !== "undefined" &&
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices?.getUserMedia) &&
      typeof MediaRecorder !== "undefined"
    );
  }, []);

  const speak = () => {
    setError(null);
    if (!supportsSpeechSynthesis()) {
      setError("Speech synthesis is not supported in this browser.");
      return;
    }
    if (!sampleText.trim()) {
      setError("No sample text provided.");
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(sampleText);
      u.rate = 0.95;
      u.pitch = 1;
      u.onstart = () => setIsSpeaking(true);
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
    } catch {
      setError("Could not play sample audio.");
    }
  };

  const startRecording = async () => {
    setError(null);
    if (!canRecord) {
      setError("Recording is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        // Stop tracks so the mic indicator turns off.
        for (const t of stream.getTracks()) t.stop();
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        const url = URL.createObjectURL(blob);
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
        setState("ready");
      };

      recorderRef.current = recorder;
      recorder.start();
      setState("recording");
    } catch {
      setError("Microphone permission denied or unavailable.");
    }
  };

  const stopRecording = () => {
    const r = recorderRef.current;
    if (!r) return;
    try {
      r.stop();
      recorderRef.current = null;
    } catch {
      setError("Could not stop recording.");
    }
  };

  return (
    <div className="glass p-8">
      <div className="text-xs uppercase tracking-wider text-white/50">
        Audio practice (MVP)
      </div>
      <div className="mt-4 text-sm leading-6 text-white/70">
        Sample: <span className="text-white/90">{sampleText}</span>
      </div>

      {error ? <div className="mt-4 text-sm text-red-200">{error}</div> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={speak}
          disabled={isSpeaking}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)] disabled:opacity-60"
          style={{ background: "var(--grad-gold)" }}
        >
          {isSpeaking ? "Playing…" : "Play sample"}
        </button>

        {state !== "recording" ? (
          <button
            type="button"
            onClick={startRecording}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
          >
            Record yourself
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="rounded-full border border-red-400/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:border-red-400/50 hover:bg-red-500/15"
          >
            Stop recording
          </button>
        )}
      </div>

      {audioUrl ? (
        <div className="mt-6">
          <div className="text-xs uppercase tracking-wider text-white/50">
            Your recording
          </div>
          <audio className="mt-3 w-full" controls src={audioUrl} />
        </div>
      ) : null}

      <div className="mt-6 text-xs text-white/45">
        Next: real curated audio files per language + waveform visualization +
        pronunciation scoring.
      </div>
    </div>
  );
}

