import { useCallback } from 'react';
import { playSound } from '../utils/sound';

export function useSound(soundPath: string) {
  return useCallback(() => {
    return playSound(soundPath);
  }, [soundPath]);
}