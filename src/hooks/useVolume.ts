import { useState, useEffect, useRef } from 'react';

const VOLUME_STORAGE_KEY = 'volume';

export const useVolume = () => {
  // Initialize volume from localStorage or default to 0.2
  const [volume, setVolumeState] = useState<number>(() => {
    if (typeof window === 'undefined') return 0.2;
    const savedVolume = parseFloat(localStorage.getItem(VOLUME_STORAGE_KEY) || '0.2');
    return isNaN(savedVolume) ? 0.2 : savedVolume;
  });

  // Store audio elements in a ref to persist between renders
  const audioElements = useRef<Record<string, HTMLAudioElement>>({});

  // Save volume to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(VOLUME_STORAGE_KEY, volume.toString());
      // Update volume of all existing audio elements
      Object.values(audioElements.current).forEach(audio => {
        if (audio) audio.volume = volume;
      });
    }
  }, [volume]);

  // Set volume and update all audio elements
  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume)); // Ensure volume is between 0 and 1
    setVolumeState(clampedVolume);
  };

  // Play audio from a file
  const playAudio = (audioFile: string) => {
    if (audioElements.current[audioFile]) {
      audioElements.current[audioFile].play().catch((error: Error) => {
        console.log('Autoplay prevented:', error);
      });
    } else {
      const audio = new Audio(audioFile);
      audio.volume = volume;
      audio.play().catch((error: Error) => {
        console.log('Autoplay prevented:', error);
      });
      audioElements.current[audioFile] = audio;
    }
  };

  // Pause audio
  const pauseAudio = (audioFile: string) => {
    if (audioElements.current[audioFile]) {
      audioElements.current[audioFile].pause();
    }
  };

  // Reset audio to beginning
  const resetAudio = (audioFile: string) => {
    if (audioElements.current[audioFile]) {
      audioElements.current[audioFile].currentTime = 0;
    }
  };

  // Unmute all audio elements
  const unmuteAudio = () => {
    Object.values(audioElements.current).forEach(audio => {
      if (audio) audio.volume = volume;
    });
  };

  return {
    volume,
    setVolume,
    playAudio,
    pauseAudio,
    resetAudio,
    unmuteAudio,
  };
};

export default useVolume;
