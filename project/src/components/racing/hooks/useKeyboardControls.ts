import { useEffect } from 'react';
import { RacingQuestion } from '../../../types/racing';

export function useKeyboardControls(
  handleAnswer: (answer: string, player: 'player1' | 'player2') => void,
  currentQuestion?: RacingQuestion,
  isComplete?: boolean
) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!currentQuestion?.options || isComplete) return;

      // Prevent default scrolling behavior for game controls
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      const optionIndex = (() => {
        switch (e.key.toLowerCase()) {
          case 'w':
          case 'arrowup':
            return 0;
          case 'd':
          case 'arrowright':
            return 1;
          case 's':
          case 'arrowdown':
            return 2;
          case 'a':
          case 'arrowleft':
            return 3;
          default:
            return -1;
        }
      })();

      if (optionIndex === -1) return;

      const player = e.key.toLowerCase().startsWith('arrow') ? 'player2' : 'player1';
      handleAnswer(currentQuestion.options[optionIndex], player);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, handleAnswer, isComplete]);
}