import { useState, useCallback, useMemo } from 'react';
import { VocabularyCard } from '../../../types';
import { TestQuestion, QuestionFeedback, MissedQuestion, TestStats } from '../../../types/test';
import { shuffleArray } from '../../../utils/array';
import { playSound } from '../../../utils/sound';
import { TOTAL_QUESTIONS, FEEDBACK_DELAY, BASE_SCORE } from '../constants';
import { getStreakBonus, calculateAccuracy } from '../utils/scoring';

export function useTest(vocabulary: VocabularyCard[]) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [startTime] = useState(Date.now());
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [missedQuestions, setMissedQuestions] = useState<MissedQuestion[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState<QuestionFeedback>({ 
    show: false, 
    isCorrect: false 
  });

  const questions = useMemo(() => {
    if (!vocabulary?.length) return [];
    
    return shuffleArray([...vocabulary])
      .slice(0, TOTAL_QUESTIONS)
      .map((card): TestQuestion => {
        const isJapanese = Math.random() > 0.5;
        const otherCards = vocabulary.filter(v => v.kana !== card.kana);
        const wrongAnswers = shuffleArray(otherCards)
          .slice(0, 3)
          .map(w => isJapanese ? w.english : w.kana);

        return {
          prompt: isJapanese ? card.kanji || card.kana : card.english,
          correctAnswer: isJapanese ? card.english : card.kana,
          options: shuffleArray([
            isJapanese ? card.english : card.kana,
            ...wrongAnswers
          ]),
          isJapanese,
          originalCard: card
        };
      });
  }, [vocabulary]);

  const currentStreakBonus = useMemo(() => getStreakBonus(streak), [streak]);

  const handleAnswer = useCallback((answer: string) => {
    const current = questions[currentQuestion];
    if (!current) return;

    const isCorrect = answer === current.correctAnswer;
    const responseTime = (Date.now() - startTime) / 1000;
    
    setResponseTimes(prev => [...prev, responseTime]);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(prev => Math.max(prev, newStreak));
      
      const streakBonus = getStreakBonus(newStreak);
      const bonusPoints = streakBonus?.bonus || 0;
      
      playSound('/sounds/card-flip.mp3');
      setScore(prev => prev + BASE_SCORE + bonusPoints);

      setFeedback({
        show: true,
        isCorrect: true,
        streakBonus: streakBonus ? {
          points: bonusPoints,
          name: streakBonus.name
        } : undefined
      });
    } else {
      setStreak(0);
      setMissedQuestions(prev => [...prev, {
        question: current.prompt,
        correctAnswer: current.correctAnswer,
        userAnswer: answer,
        example: current.originalCard.example,
        exampleEnglish: current.originalCard.exampleEnglish
      }]);
      playSound('/sounds/wrong.mp3');

      setFeedback({
        show: true,
        isCorrect: false,
        correctAnswer: current.correctAnswer
      });
    }

    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false });
      
      if (currentQuestion + 1 >= TOTAL_QUESTIONS) {
        setIsComplete(true);
        playSound('/sounds/pikachu-sound.mp3');
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    }, FEEDBACK_DELAY);
  }, [currentQuestion, questions, streak, startTime]);

  const stats: TestStats = {
    accuracy: calculateAccuracy(score, currentQuestion + 1),
    bestStreak,
    averageResponseTime: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length || 0,
    totalScore: score,
    streakBonus: currentStreakBonus?.bonus || 0,
    streakLevel: currentStreakBonus?.name
  };

  const restartTest = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setResponseTimes([]);
    setMissedQuestions([]);
    setIsComplete(false);
    setFeedback({ show: false, isCorrect: false });
  }, []);

  return {
    currentQuestion: questions[currentQuestion],
    questionNumber: currentQuestion + 1,
    totalQuestions: TOTAL_QUESTIONS,
    score,
    streak,
    currentStreakBonus,
    stats,
    missedQuestions,
    isComplete,
    feedback,
    handleAnswer,
    restartTest
  };
}