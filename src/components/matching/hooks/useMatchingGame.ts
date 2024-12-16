import { useState, useCallback, useMemo, useEffect } from 'react';
import { VocabularyCard } from '../../../types';
import { MatchingCard } from '../../../types/matching';
import { shuffleArray } from '../../../utils/array';

const PAIRS_TO_MATCH = 6;
const MATCH_CHECK_DELAY = 1000;

export function useMatchingGame(vocabulary: VocabularyCard[]) {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Create and shuffle cards
  const cards = useMemo(() => {
    if (!vocabulary?.length) return [];

    const selectedVocab = shuffleArray([...vocabulary]).slice(0, PAIRS_TO_MATCH);
    const cardPairs = selectedVocab.flatMap(vocab => ([
      {
        id: vocab.kana,
        content: vocab.kana,
        isJapanese: true
      },
      {
        id: vocab.kana,
        content: vocab.english,
        isJapanese: false
      }
    ]));
    return shuffleArray(cardPairs);
  }, [vocabulary]);

  const handleCardClick = useCallback((index: number) => {
    if (isChecking || 
        matchedPairs.includes(cards[index].id) ||
        selectedCards.includes(index) ||
        selectedCards.length >= 2) {
      return;
    }

    // Add new card to selection
    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    // Check for match when two cards are selected
    if (newSelected.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = newSelected;

      setTimeout(() => {
        if (cards[firstIndex].id === cards[secondIndex].id) {
          // Play match sound
          const audio = new Audio('/sounds/card-flip.mp3');
          audio.play().catch(console.error);
          
          setMatchedPairs(prev => [...prev, cards[firstIndex].id]);
          
          // Check if game is complete
          if (matchedPairs.length + 1 === PAIRS_TO_MATCH) {
            setShowConfetti(true);
            const victorySound = new Audio('/sounds/pikachu-sound.mp3');
            victorySound.play().catch(console.error);
          }
        }
        setSelectedCards([]);
        setIsChecking(false);
      }, MATCH_CHECK_DELAY);
    }
  }, [selectedCards, matchedPairs, cards, isChecking]);

  return {
    cards,
    selectedCards,
    matchedPairs,
    showConfetti,
    handleCardClick
  };
}