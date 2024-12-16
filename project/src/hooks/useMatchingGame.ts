import { useState, useCallback, useMemo } from 'react';
import { VocabularyCard } from '../types';
import { shuffleArray } from '../utils/array';

interface MatchingCard {
  id: string;
  content: string;
  isJapanese: boolean;
}

export function useMatchingGame(vocabulary: VocabularyCard[]) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Create and shuffle cards
  const cards = useMemo(() => {
    // Select 6 random vocabulary items
    const selectedVocab = shuffleArray(vocabulary).slice(0, 6);

    // Create pairs of cards (Japanese and English)
    const cardPairs = selectedVocab.flatMap(vocab => ([
      {
        id: vocab.kana,
        content: vocab.kana,
        isJapanese: true
      },
      {
        id: vocab.kana, // Same ID for matching pairs
        content: vocab.english,
        isJapanese: false
      }
    ]));

    // Shuffle the cards
    return shuffleArray(cardPairs);
  }, [vocabulary]);

  const handleCardClick = useCallback((index: number, playSound?: () => void) => {
    if (selectedCards.includes(index) || matchedPairs.includes(cards[index].id)) {
      return;
    }

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [firstIndex, secondIndex] = newSelected;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id === secondCard.id) {
        // Match found
        playSound?.();
        setMatchedPairs(prev => [...prev, firstCard.id]);
      }

      // Clear selection after a delay
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  }, [selectedCards, matchedPairs, cards]);

  const isGameComplete = matchedPairs.length === 6;

  return {
    cards,
    selectedCards,
    matchedPairs,
    handleCardClick,
    isGameComplete
  };
}