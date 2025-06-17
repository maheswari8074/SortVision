import { useEffect, useCallback, useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { isAudioSupported } from '../utils/soundEffects';

export const useAudio = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [volume, setVolumeState] = useState(audioEngine.volume);
  const [isMuted, setIsMuted] = useState(audioEngine.isMuted);

  useEffect(() => {
    console.log('useAudio: Hook mounted. Initial isAudioEnabled state:', isAudioEnabled);
    // Removed audioEngine.init() from here, it will now be called on user interaction

    const handleUserInteraction = () => {
      console.log('useAudio: User interaction detected. Current audioEngine.isAudioEnabled:', audioEngine.isAudioEnabled);

      // Ensure AudioEngine is initialized and enabled only once on first user interaction
      if (!audioEngine.audioContext) {
        console.log('useAudio: AudioContext not yet initialized. Calling audioEngine.init()...');
        audioEngine.init();
        if (!audioEngine.audioContext) {
          console.error('useAudio: Failed to initialize AudioContext during user interaction. Aborting sound enable.');
          return;
        }
      }

      if (!audioEngine.isAudioEnabled) {
        console.log('useAudio: AudioEngine not yet enabled (or suspended). Attempting to enable...');
        audioEngine.enableAudio();
        // The promise from resume() in enableAudio() will update audioEngine.isAudioEnabled asynchronously.
        // We will rely on the separate useEffect to pick up this change.
        console.log('useAudio: Called audioEngine.enableAudio().');
      } else {
        console.log('useAudio: AudioEngine already initialized and enabled.');
      }
      // Update local state to reflect engine's state after any potential change
      setIsAudioEnabled(audioEngine.isAudioEnabled);
      console.log('useAudio: Updated local isAudioEnabled state to:', audioEngine.isAudioEnabled);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      console.log('useAudio: Hook unmounting. Closing audio engine.');
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      audioEngine.closeAudio(); // Crucial for memory leak prevention
    };
  }, []); // Dependency array remains empty for single mount run

  // Separate useEffect to monitor audioEngine.isAudioEnabled and update local state
  useEffect(() => {
    console.log('useAudio: audioEngine.isAudioEnabled monitor effect running. Engine state:', audioEngine.isAudioEnabled, 'Local state:', isAudioEnabled);
    if (isAudioEnabled !== audioEngine.isAudioEnabled) {
      console.log('useAudio: audioEngine.isAudioEnabled changed. Updating local state to:', audioEngine.isAudioEnabled);
      setIsAudioEnabled(audioEngine.isAudioEnabled);
    }
  }, [audioEngine.isAudioEnabled, isAudioEnabled]); // Dependency on the engine's actual state and local state for consistency

  const setVolume = useCallback((value) => {
    audioEngine.setVolume(value);
    setVolumeState(value);
  }, []);

  const toggleMute = useCallback(() => {
    audioEngine.toggleMute();
    setIsMuted(!isMuted);
  }, [isMuted]);

  const playCompareSound = useCallback((value) => {
    if (isAudioEnabled) {
      audioEngine.playCompareSound(value);
    }
  }, [isAudioEnabled]);

  const playSwapSound = useCallback((value) => {
    if (isAudioEnabled) {
      audioEngine.playSwapSound(value);
    }
  }, [isAudioEnabled]);

  const playAccessSound = useCallback((value) => {
    if (isAudioEnabled) {
      audioEngine.playAccessSound(value);
    }
  }, [isAudioEnabled]);

  const playCompleteSound = useCallback(() => {
    if (isAudioEnabled) {
      audioEngine.playCompleteSound();
    }
  }, [isAudioEnabled]);

  const playPivotSound = useCallback((value) => {
    if (isAudioEnabled) {
      audioEngine.playPivotSound(value);
    }
  }, [isAudioEnabled]);

  const playMergeSound = useCallback((value) => {
    if (isAudioEnabled) {
      audioEngine.playMergeSound(value);
    }
  }, [isAudioEnabled]);

  const setMaxArrayValue = useCallback((value) => {
    audioEngine.setMaxArrayValue(value);
  }, []);

  const playCategoryClickSound = useCallback(() => {
    if (isAudioEnabled) {
      audioEngine.playCategoryClickSound();
    }
  }, [isAudioEnabled]);

  const playAlgorithmSelectSound = useCallback(() => {
    if (isAudioEnabled) {
      audioEngine.playAlgorithmSelectSound();
    }
  }, [isAudioEnabled]);

  const playTypingSound = useCallback(() => {
    if (isAudioEnabled) {
      audioEngine.playTypingSound();
    }
  }, [isAudioEnabled]);

  return {
    setVolume,
    toggleMute,
    playCompareSound,
    playSwapSound,
    playAccessSound,
    playCompleteSound,
    playPivotSound,
    playMergeSound,
    setMaxArrayValue,
    playCategoryClickSound,
    playAlgorithmSelectSound,
    playTypingSound,
    isMuted,
    volume,
    isAudioEnabled,
    isAudioSupported: isAudioSupported()
  };
}; 