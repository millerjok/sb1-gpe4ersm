import { useMemo } from 'react';
import { VocabularyCard } from '../../../types';
import { shuffleArray } from '../../../utils/array';

const TOTAL_ROUNDS = 15; // Increased number of rounds

export function useRacingQuestions(vocabulary: VocabularyCard[]) {
  const questions = useMemo(() => {
    if (!vocabulary?.length) return [];
    
    return shuffleArray([...vocabulary])
      .slice(0, TOTAL_ROUNDS)
      .map(card => {
        const isJapanese = Math.random() > 0.5;
        const otherCards = vocabulary.filter(v => v.kana !== card.kana);
        const wrongAnswers = shuffleArray(otherCards)
          .slice(0, 3)
          .map(w => isJapanese ? w.english : w.kana);

        // Randomize the position of the correct answer
        const correctAnswer = isJapanese ? card.english : card.kana;
        const allOptions = [...wrongAnswers, correctAnswer];
        const options = shuffleArray(allOptions);

        return {
          prompt: isJapanese ? card.kanji || card.kana : card.english,
          correctAnswer,
          options,
          isJapanese
        };
      });
  }, [vocabulary]);

  return { questions };
}