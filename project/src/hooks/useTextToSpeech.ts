import { useCallback, useState, useEffect } from 'react';

export function useTextToSpeech() {
  const [japaneseVoice, setJapaneseVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Find the best Japanese voice on component mount
  useEffect(() => {
    const findJapaneseVoice = () => {
      if (!window.speechSynthesis) return;

      // Get all available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find Google Japanese voice first
      let voice = voices.find(v => 
        v.name.includes('Google') && v.lang.startsWith('ja')
      );

      // Fallback to any Japanese voice if Google voice is not available
      if (!voice) {
        voice = voices.find(v => v.lang.startsWith('ja'));
      }

      if (voice) {
        setJapaneseVoice(voice);
      }
    };

    // Initial check
    findJapaneseVoice();

    // Handle dynamic voice loading
    window.speechSynthesis.onvoiceschanged = findJapaneseVoice;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use the found Japanese voice if available
    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    } else {
      utterance.lang = 'ja-JP';
    }

    // Optimize settings for Japanese speech
    utterance.rate = 0.8; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    // Handle errors
    utterance.onerror = (event) => {
      console.error('TTS Error:', event.error);
    };

    window.speechSynthesis.speak(utterance);
  }, [japaneseVoice]);

  return speak;
}