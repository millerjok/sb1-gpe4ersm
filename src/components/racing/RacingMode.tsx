import React from 'react';
import { motion } from 'framer-motion';
import { useRacing } from './hooks/useRacing';
import { RacingTrack } from './RacingTrack';
import { RacingQuestion } from './RacingQuestion';
import { RacingComplete } from './RacingComplete';
import { VocabularyCard } from '../../types';

interface RacingModeProps {
  vocabulary: VocabularyCard[];
  onBack: () => void;
}

export function RacingMode({ vocabulary, onBack }: RacingModeProps) {
  const {
    currentQuestion,
    stats,
    carPositions,
    isComplete,
    handleAnswer,
    disabledPlayers,
    player1Streak,
    player2Streak
  } = useRacing(vocabulary);

  if (isComplete) {
    return (
      <RacingComplete
        stats={stats}
        onRestart={() => window.location.reload()}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors flex items-center"
        >
          <span className="mr-2">←</span> Back
        </button>
        <div className="text-lg font-bold">
          Question {stats.currentRound} of {stats.totalRounds}
        </div>
      </div>

      <RacingTrack
        carPositions={carPositions}
        player1Score={stats.player1Score}
        player2Score={stats.player2Score}
        player1Streak={player1Streak}
        player2Streak={player2Streak}
      />

      {currentQuestion && (
        <RacingQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabledPlayers={disabledPlayers}
        />
      )}
    </div>
  );
}