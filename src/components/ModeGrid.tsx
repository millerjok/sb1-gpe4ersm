import React from 'react';
import { modes } from '../data/modes';
import { ArrowLeft } from 'lucide-react';

interface ModeGridProps {
  onBack: () => void;
  selectedChapter: number;
  onModeSelect: (modeId: string) => void;
}

export function ModeGrid({ onBack, selectedChapter, onModeSelect }: ModeGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Chapters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeSelect(mode.id)}
            className="bg-white hover:bg-pink-50 text-left p-6 rounded-xl 
                     border-2 border-pink-200 shadow-md transform transition 
                     hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-start">
              <span className="text-3xl mr-4">{mode.icon}</span>
              <div>
                <h3 className="font-bold text-gray-800">{mode.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{mode.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}