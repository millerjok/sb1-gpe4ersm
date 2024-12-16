import React from 'react';
import { VocabularyCard } from '../../types';
import { useTest } from './hooks/useTest';
import { TestProgress } from './TestProgress';
import { QuestionCard } from './QuestionCard';
import { TestComplete } from './TestComplete';

interface TestModeProps {
  vocabulary: VocabularyCard[];
  onBack: () => void;
}

export function TestMode({ vocabulary, onBack }: TestModeProps) {
  const {
    currentQuestion,
    questionNumber,
    totalQuestions,
    score,
    streak,
    currentStreakBonus,
    stats,
    missedQuestions,
    isComplete,
    feedback,
    handleAnswer,
    restartTest
  } = useTest(vocabulary);

  if (isComplete) {
    return (
      <TestComplete 
        score={score}
        total={totalQuestions}
        stats={stats}
        missedQuestions={missedQuestions}
        onRestart={restartTest}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors flex items-center"
        >
          <span className="mr-2">←</span> Back
        </button>
      </div>

      <TestProgress 
        current={questionNumber}
        total={totalQuestions}
        score={score}
        streak={streak}
        streakBonus={currentStreakBonus}
      />

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          feedback={feedback}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}