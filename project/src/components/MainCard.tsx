import React, { useState } from 'react';
import { ChapterGrid } from './ChapterGrid';
import { ModeGrid } from './ModeGrid';
import { FlashcardMode } from './flashcard/FlashcardMode';
import { MatchingGame } from './matching/MatchingGame';
import { TestMode } from './test/TestMode';
import { ListeningMode } from './listening/ListeningMode';
import { RacingMode } from './racing/RacingMode';
import { AppView } from '../types';
import { vocabularySets } from '../data/vocabularySets';

export function MainCard() {
  const [view, setView] = useState<AppView>('chapters');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const handleChapterSelect = (chapterId: number) => {
    setSelectedChapter(chapterId);
    setView('modes');
  };

  const handleBackToChapters = () => {
    setView('chapters');
    setSelectedChapter(null);
  };

  const handleModeSelect = (modeId: string) => {
    switch (modeId) {
      case 'matching':
        setView('matching');
        break;
      case 'flashcard':
        setView('flashcard');
        break;
      case 'test':
        setView('test');
        break;
      case 'listening':
        setView('listening');
        break;
      case 'racing':
        setView('racing');
        break;
      default:
        console.warn('Unhandled mode:', modeId);
    }
  };

  const handleMatchingComplete = (time: number) => {
    console.log(`Matching completed in ${time} seconds`);
    setView('modes');
  };

  const currentVocabulary = selectedChapter ? vocabularySets[selectedChapter] : [];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-pink-200">
      <div className="space-y-8">
        {view === 'chapters' && (
          <ChapterGrid onChapterSelect={handleChapterSelect} />
        )}
        
        {view === 'modes' && selectedChapter && (
          <ModeGrid 
            onBack={handleBackToChapters}
            selectedChapter={selectedChapter}
            onModeSelect={handleModeSelect}
          />
        )}

        {view === 'flashcard' && selectedChapter && (
          <FlashcardMode
            chapterId={selectedChapter}
            onBack={() => setView('modes')}
          />
        )}

        {view === 'matching' && selectedChapter && (
          <MatchingGame
            vocabulary={currentVocabulary}
            onComplete={handleMatchingComplete}
            onBack={() => setView('modes')}
          />
        )}

        {view === 'test' && selectedChapter && (
          <TestMode
            vocabulary={currentVocabulary}
            onBack={() => setView('modes')}
          />
        )}

        {view === 'listening' && selectedChapter && (
          <ListeningMode
            vocabulary={currentVocabulary}
            onBack={() => setView('modes')}
          />
        )}

        {view === 'racing' && selectedChapter && (
          <RacingMode
            vocabulary={currentVocabulary}
            onBack={() => setView('modes')}
          />
        )}
      </div>
    </div>
  );
}