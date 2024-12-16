import React from 'react';
import { chapters } from '../data/chapters';

interface ChapterGridProps {
  onChapterSelect: (chapterId: number) => void;
}

export function ChapterGrid({ onChapterSelect }: ChapterGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => onChapterSelect(chapter.id)}
          className="bg-white hover:bg-pink-50 text-gray-800 font-semibold py-4 px-6 rounded-xl 
                   border-2 border-pink-200 shadow-md transform transition 
                   hover:scale-105 hover:shadow-lg"
        >
          {chapter.title}
        </button>
      ))}
    </div>
  );
}