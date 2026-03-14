import { useState, useEffect, useRef } from "react";

type RecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult:
    | ((event: {
        results: { [i: number]: { [i: number]: { transcript: string } } };
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognitionAPI() {
  const w = window as unknown as {
    SpeechRecognition?: new () => RecognitionInstance;
    webkitSpeechRecognition?: new () => RecognitionInstance;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function useVoiceSearch() {
  const [isSupported] = useState(() => getSpeechRecognitionAPI() != null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(() =>
    getSpeechRecognitionAPI() == null
      ? "Speech recognition is not supported in this browser."
      : ""
  );

  const recognitionRef = useRef<RecognitionInstance | null>(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const startListening = () => {
    if (!isSupported || isListening) return;

    const SpeechRecognitionAPI = getSpeechRecognitionAPI();
    if (SpeechRecognitionAPI == null) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    };

    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
    recognitionRef.current = recognition;

    setTranscript("");
    setError("");
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
  };

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  };
}
