import { useState, useCallback, useMemo } from 'react';
import { VocabularyCard } from '../../../types';
import { RacingQuestion, RacingStats } from '../../../types/racing';
import { useKeyboardControls } from './useKeyboardControls';
import { useRacingQuestions } from './useRacingQuestions';
import { playSound } from '../../../utils/sound';

const LIGHTS_TO_WIN = 10;

export function useRacing(vocabulary: VocabularyCard[]) {
  const [currentRound, setCurrentRound] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Streak, setPlayer1Streak] = useState(0);
  const [player2Streak, setPlayer2Streak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [disabledPlayers, setDisabledPlayers] = useState<Set<string>>(new Set());

  const { questions } = useRacingQuestions(vocabulary);

  const handleAnswer = useCallback((answer: string, player: 'player1' | 'player2') => {
    const currentQuestion = questions[currentRound];
    if (!currentQuestion || disabledPlayers.has(player) || isComplete) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const scoreUpdater = player === 'player1' ? setPlayer1Score : setPlayer2Score;
    const streakUpdater = player === 'player1' ? setPlayer1Streak : setPlayer2Streak;
    const currentStreak = player === 'player1' ? player1Streak : player2Streak;
    const currentScore = player === 'player1' ? player1Score : player2Score;
    
    if (isCorrect) {
      // Update score and streak
      const newStreak = currentStreak + 1;
      streakUpdater(newStreak);
      scoreUpdater(prev => prev + 1);
      playSound('/sounds/card-flip.mp3');
      
      // Check if player has won
      if (currentScore + 1 >= LIGHTS_TO_WIN) {
        setIsComplete(true);
        playSound('/sounds/pikachu-sound.mp3');
        return;
      }

      // Reset disabled players and move to next question
      setDisabledPlayers(new Set());
      setCurrentRound(prev => prev + 1);
    } else {
      streakUpdater(0);
      playSound('/sounds/wrong.mp3');
      
      setDisabledPlayers(prev => {
        const newSet = new Set(prev);
        newSet.add(player);
        
        // If both players are wrong, reset for next question
        if (newSet.size === 2) {
          setTimeout(() => {
            setDisabledPlayers(new Set());
            setCurrentRound(prev => prev + 1);
          }, 1000);
        }
        return newSet;
      });
    }
  }, [
    currentRound,
    questions,
    disabledPlayers,
    isComplete,
    player1Score,
    player2Score,
    player1Streak,
    player2Streak
  ]);

  useKeyboardControls(handleAnswer, questions[currentRound], isComplete);

  const stats: RacingStats = {
    player1Score,
    player2Score,
    currentRound: currentRound + 1,
    totalRounds: questions.length,
    winner: isComplete
      ? player1Score >= LIGHTS_TO_WIN
        ? 'player1'
        : player2Score >= LIGHTS_TO_WIN
          ? 'player2'
          : 'tie'
      : undefined
  };

  return {
    currentQuestion: questions[currentRound],
    stats,
    isComplete,
    handleAnswer,
    disabledPlayers,
    player1Streak,
    player2Streak
  };
}