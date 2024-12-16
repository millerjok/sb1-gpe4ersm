import React, { useState, useEffect } from 'react';
import { VocabularyCard } from '../../types';
import { MatchingCard } from './MatchingCard';
import { Confetti } from './Confetti';
import { useMatchingGame } from './hooks/useMatchingGame';

interface MatchingGameProps {
  vocabulary: VocabularyCard[];
  onComplete: (time: number) => void;
  onBack: () => void;
}

export function MatchingGame({ vocabulary, onComplete, onBack }: MatchingGameProps) {
  const [startTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const { cards, selectedCards, matchedPairs, showConfetti, handleCardClick } = useMatchingGame(vocabulary);

  // Update timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  // Handle game completion silently
  useEffect(() => {
    if (matchedPairs.length === 6) {
      onComplete(elapsedTime);
    }
  }, [matchedPairs.length, elapsedTime, onComplete]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {showConfetti && <Confetti />}
      
      <div className="flex justify-between w-full px-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back
        </button>
        <div className="text-xl font-mono">
          {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {cards.map((card, index) => (
          <MatchingCard
            key={`${card.id}-${index}`}
            card={card}
            isSelected={selectedCards.includes(index)}
            isMatched={matchedPairs.includes(card.id)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}