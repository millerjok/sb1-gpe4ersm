import React from 'react';
import { VocabularyCard } from '../../types';

interface FlashcardProps {
  card: VocabularyCard;
  isFlipped: boolean;
  onClick: () => void;
}

export function Flashcard({ card, isFlipped, onClick }: FlashcardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer w-full max-w-md aspect-[3/2] perspective-1000
        transition-transform duration-500 transform-style-preserve-3d
        ${isFlipped ? 'rotate-y-180' : ''}
      `}
    >
      {/* Front of card - Kana */}
      <div className="absolute w-full h-full backface-hidden">
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-pink-200 h-full flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-800 mb-4">{card.kanji}</span>
          <span className="text-2xl text-gray-600">{card.kana}</span>
        </div>
      </div>
      
      {/* Back of card - Meaning & Example */}
      <div className="absolute w-full h-full backface-hidden rotate-y-180">
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-pink-200 h-full">
          <div className="space-y-4">
            <div>
              <p className="text-lg text-pink-600">{card.kana}</p>
              <p className="text-sm text-gray-500">{card.romaji}</p>
              <p className="text-xl font-bold text-gray-800 mt-2">{card.english}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Example:</p>
              <p className="text-sm text-gray-600">{card.example}</p>
              <p className="text-sm text-gray-500 italic">{card.exampleEnglish}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}