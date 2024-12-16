import { useState, useCallback } from 'react';
import { CarPosition } from '../../../types/racing';

const BASE_MOVE_DISTANCE = 20; // Increased base distance
const STREAK_BONUS = 5; // Points added per streak level

export function useRacingMovement() {
  const [carPositions, setCarPositions] = useState<{
    player1: CarPosition;
    player2: CarPosition;
  }>({
    player1: { x: 0, progress: 0 },
    player2: { x: 0, progress: 0 }
  });

  const calculateMoveDistance = useCallback((streak: number) => {
    // Base distance + streak bonus (max 4 streak levels)
    const streakBonus = streak > 1 ? Math.min(streak - 1, 4) * STREAK_BONUS : 0;
    return BASE_MOVE_DISTANCE + streakBonus;
  }, []);

  const movePlayer = useCallback((player: 'player1' | 'player2', streak: number) => {
    const moveDistance = calculateMoveDistance(streak);
    
    let hasFinished = false;
    
    setCarPositions(prev => {
      const newProgress = prev[player].progress + moveDistance;
      hasFinished = newProgress >= 100;
      
      return {
        ...prev,
        [player]: {
          ...prev[player],
          progress: Math.min(100, newProgress)
        }
      };
    });

    return hasFinished;
  }, [calculateMoveDistance]);

  return { 
    carPositions, 
    movePlayer
  };
}