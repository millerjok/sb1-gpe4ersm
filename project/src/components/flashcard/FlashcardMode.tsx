import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Flashcard } from './Flashcard';
import { FlashcardControls } from './FlashcardControls';
import { vocabularySets } from '../../data/vocabulary';
import { useSound } from '../../hooks/useSound';

interface FlashcardModeProps {
  chapterId: number;
  onBack: () => void;
}

export function FlashcardMode({ chapterId, onBack }: FlashcardModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const playFlipSound = useSound('/sounds/card-flip.mp3');
  
  const cards = vocabularySets[chapterId] || [];
  const currentCard = cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      playFlipSound();
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      playFlipSound();
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    playFlipSound();
    setIsFlipped(!isFlipped);
  };

  if (!currentCard) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No flashcards available for this chapter.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Modes
        </button>
        <div className="text-gray-600">
          Card {currentIndex + 1} of {cards.length}
        </div>
      </div>

      <div className="flex justify-center">
        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          onClick={handleFlip}
        />
      </div>

      <FlashcardControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        onShowMeaning={handleFlip}
        showingMeaning={isFlipped}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < cards.length - 1}
      />
    </div>
  );
}