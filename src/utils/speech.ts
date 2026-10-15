// Client-side Modern Standard Arabic Speech Narration
// Uses high-quality server-side Gemini TTS (gemini-3.8-flash-tts) with audio caching,
// and strict Arabic fallback (NEVER falling back to English voices).

const audioCache = new Map<string, string>();
let currentAudioElement: HTMLAudioElement | null = null;
let isCurrentlySpeakingState = false;
const listeners = new Set<(speaking: boolean) => void>();

function notifyListeners(speaking: boolean) {
  isCurrentlySpeakingState = speaking;
  listeners.forEach((listener) => {
    try {
      listener(speaking);
    } catch {
      // ignore
    }
  });
}

export function subscribeToSpeechState(listener: (speaking: boolean) => void): () => void {
  listeners.add(listener);
  listener(isCurrentlySpeakingState);
  return () => {
    listeners.delete(listener);
  };
}

export function isCurrentlySpeaking(): boolean {
  return isCurrentlySpeakingState;
}

export function stopArabicSpeech() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch {
      // ignore
    }
    currentAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }

  notifyListeners(false);
}

/**
 * Speaks Arabic text with Modern Standard Arabic pronunciation (اللغة العربية الفصحى).
 * 1. Calls /api/tts backed by Gemini 3.8 Flash TTS for natural, child-friendly Arabic audio.
 * 2. Caches audio in memory so repeat questions are instantaneous.
 * 3. Fallbacks to browser SpeechSynthesis ONLY IF an authentic Arabic voice exists (never English).
 */
export async function speakArabic(text: string, onEnd?: () => void): Promise<void> {
  const cleanText = text.trim();
  if (!cleanText) return;

  // Stop any ongoing speech
  stopArabicSpeech();
  notifyListeners(true);

  try {
    // 1. Check in-memory audio cache
    let audioDataUri = audioCache.get(cleanText);

    if (!audioDataUri) {
      // Fetch high-fidelity Modern Standard Arabic TTS from server
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          voice: 'Kore' // Cheerful, articulate persona
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioData) {
          audioDataUri = `data:${data.mimeType || 'audio/wav'};base64,${data.audioData}`;
          audioCache.set(cleanText, audioDataUri);
        }
      }
    }

    if (audioDataUri) {
      const audio = new Audio(audioDataUri);
      currentAudioElement = audio;

      audio.onended = () => {
        currentAudioElement = null;
        notifyListeners(false);
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        currentAudioElement = null;
        notifyListeners(false);
        if (onEnd) onEnd();
      };

      await audio.play();
      return;
    }
  } catch {
    // If backend is not present (e.g., pure static hosting on Netlify), continue to direct fallback
  }

  // 2. Direct Arabic audio stream fallback (works 100% on static hosts like Netlify / GitHub Pages)
  try {
    const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
    const audio = new Audio(directUrl);
    currentAudioElement = audio;

    audio.onended = () => {
      currentAudioElement = null;
      notifyListeners(false);
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      // If direct audio blocked or offline, try Web Speech API
      currentAudioElement = null;
      tryBrowserSpeech(cleanText, onEnd);
    };

    await audio.play();
    return;
  } catch {
    tryBrowserSpeech(cleanText, onEnd);
    return;
  }
}

function tryBrowserSpeech(cleanText: string, onEnd?: () => void) {
  // Fallback: Browser Web Speech API ONLY IF genuine Arabic voice exists
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find((v) => v.lang.toLowerCase().startsWith('ar'));

      if (arabicVoice) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.voice = arabicVoice;
        utterance.lang = arabicVoice.lang;
        utterance.rate = 0.9;
        utterance.pitch = 1.1;

        utterance.onend = () => {
          notifyListeners(false);
          if (onEnd) onEnd();
        };

        utterance.onerror = () => {
          notifyListeners(false);
          if (onEnd) onEnd();
        };

        window.speechSynthesis.speak(utterance);
        return;
      } else {
        // IMPORTANT: No Arabic voice found on client machine.
        // DO NOT speak with English voice! End quietly to prevent speaking English to an Arabic child.
        console.warn('No Arabic voice installed in browser; suppressed English speech fallback.');
      }
    } catch {
      // ignore
    }
  }

  notifyListeners(false);
  if (onEnd) onEnd();
}
