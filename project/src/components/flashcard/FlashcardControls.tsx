import React from 'react';

interface FlashcardControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onShowMeaning: () => void;
  showingMeaning: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function FlashcardControls({
  onPrevious,
  onNext,
  onShowMeaning,
  showingMeaning,
  hasPrevious,
  hasNext
}: FlashcardControlsProps) {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      {hasPrevious && (
        <button
          onClick={onPrevious}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full
                   transform transition hover:scale-105"
        >
          Previous
        </button>
      )}
      
      <button
        onClick={onShowMeaning}
        className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full
                 transform transition hover:scale-105"
      >
        {showingMeaning ? 'Hide Meaning' : 'Show Meaning'}
      </button>

      {hasNext && (
        <button
          onClick={onNext}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full
                   transform transition hover:scale-105"
        >
          Next
        </button>
      )}
    </div>
  );
}