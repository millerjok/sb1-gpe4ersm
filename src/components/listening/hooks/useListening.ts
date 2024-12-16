import { useState, useCallback, useMemo } from 'react';
import { VocabularyCard } from '../../../types';
import { ListeningStats, ListeningFeedback } from '../../../types/listening';
import { shuffleArray } from '../../../utils/array';
import { playSound } from '../../../utils/sound';
import { useTextToSpeech } from '../../../hooks/useTextToSpeech';

const TOTAL_QUESTIONS = 15;
const BASE_SCORE = 10;
const STREAK_BONUS = 5;
const FEEDBACK_DELAY = 1500;

export function useListening(vocabulary: VocabularyCard[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<ListeningFeedback>({
    show: false,
    isCorrect: false
  });

  const speak = useTextToSpeech();

  const questions = useMemo(() => {
    if (!vocabulary?.length) return [];
    
    return shuffleArray(vocabulary)
      .slice(0, TOTAL_QUESTIONS)
      .map(card => ({
        id: card.kana,
        text: card.example,
        translation: card.exampleEnglish,
        correctAnswer: card.exampleEnglish,
        options: shuffleArray([
          card.exampleEnglish,
          ...shuffleArray(vocabulary.filter(v => v.kana !== card.kana))
            .slice(0, 3)
            .map(v => v.exampleEnglish)
        ])
      }));
  }, [vocabulary]);

  const currentQuestion = questions[currentIndex];

  const handlePlayAudio = useCallback(() => {
    if (!currentQuestion) return;
    
    setIsPlaying(true);
    speak(currentQuestion.text);
    
    // Reset playing state after animation duration
    setTimeout(() => setIsPlaying(false), 2000);
  }, [currentQuestion, speak]);

  const handleAnswer = useCallback((answer: string) => {
    if (!currentQuestion || feedback.show) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(prev => Math.max(prev, newStreak));
      
      const streakBonus = newStreak >= 3 ? STREAK_BONUS * Math.floor(newStreak / 3) : 0;
      setScore(prev => prev + BASE_SCORE + streakBonus);

      playSound('/sounds/card-flip.mp3');
      setFeedback({
        show: true,
        isCorrect: true,
        message: 'Excellent listening!',
        streakBonus: streakBonus
      });
    } else {
      setStreak(0);
      playSound('/sounds/wrong.mp3');
      setFeedback({
        show: true,
        isCorrect: false,
        message: `The correct answer was: ${currentQuestion.correctAnswer}`
      });
    }

    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false });
      
      if (currentIndex + 1 >= questions.length) {
        setIsComplete(true);
        playSound('/sounds/pikachu-sound.mp3');
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, FEEDBACK_DELAY);
  }, [currentQuestion, currentIndex, questions.length, streak, feedback.show]);

  const stats: ListeningStats = {
    score,
    streak,
    bestStreak,
    accuracy: (score / ((currentIndex + 1) * BASE_SCORE)) * 100,
    totalQuestions: TOTAL_QUESTIONS,
    completedQuestions: currentIndex + 1
  };

  const restartMode = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setIsComplete(false);
    setFeedback({ show: false, isCorrect: false });
  }, []);

  return {
    currentQuestion,
    stats,
    feedback,
    isComplete,
    isPlaying,
    handleAnswer,
    handlePlayAudio,
    restartMode
  };
}