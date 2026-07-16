import { useState } from "react";

export default function AIVoiceSearch({ onSearch }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      console.log("Voice:", text);

      onSearch(text);

      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <button
      onClick={startListening}
      className={`px-5 py-3 rounded-xl text-white font-bold transition ${
        listening
          ? "bg-red-600 animate-pulse"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {listening ? "🎙 Listening..." : "🎤 Voice Search"}
    </button>
  );
}