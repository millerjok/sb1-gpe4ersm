import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { useListening } from './hooks/useListening';
import { ListeningProgress } from './ListeningProgress';
import { ListeningComplete } from './ListeningComplete';
import { VocabularyCard } from '../../types';

interface ListeningModeProps {
  vocabulary: VocabularyCard[];
  onBack: () => void;
}

export function ListeningMode({ vocabulary, onBack }: ListeningModeProps) {
  const {
    currentQuestion,
    stats,
    feedback,
    isComplete,
    isPlaying,
    handleAnswer,
    handlePlayAudio,
    restartMode
  } = useListening(vocabulary);

  if (isComplete) {
    return (
      <ListeningComplete
        stats={stats}
        onRestart={restartMode}
        onBack={onBack}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No questions available.</p>
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
    <div className="flex flex-col items-center space-y-8 w-full max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition-colors flex items-center"
        >
          <span className="mr-2">←</span> Back
        </button>
      </div>

      <ListeningProgress stats={stats} />

      <div className="w-full space-y-8">
        <div className="text-center text-gray-600 mb-4">
          Listen to the Japanese sentence and choose the correct translation
        </div>

        <motion.button
          onClick={handlePlayAudio}
          className={`
            mx-auto w-24 h-24 rounded-full flex items-center justify-center
            ${isPlaying 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
              : 'bg-gradient-to-r from-pink-500 to-purple-500'
            }
            shadow-lg hover:shadow-xl transform hover:scale-105 transition-all
          `}
          whileTap={{ scale: 0.95 }}
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
        >
          <Volume2 className="w-12 h-12 text-white" />
        </motion.button>

        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !feedback.show && handleAnswer(option)}
              disabled={feedback.show}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-6 rounded-lg shadow transition-all text-lg font-medium h-24
                flex items-center justify-center text-center
                ${feedback.show && option === currentQuestion.correctAnswer
                  ? 'bg-green-100 border-2 border-green-500 text-green-700'
                  : 'bg-white hover:bg-gray-50 text-gray-800 hover:shadow-md transform hover:scale-105'
                }
              `}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {feedback.show && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-2"
            >
              {feedback.isCorrect ? (
                <div className="text-green-600">
                  <div className="text-2xl">✨</div>
                  <div className="font-medium">Excellent hearing!</div>
                  {feedback.streakBonus > 0 && (
                    <div className="text-yellow-600 font-bold mt-2">
                      +{feedback.streakBonus} Streak Bonus! 🔥
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-red-500">
                  <div className="text-xl">Not quite right</div>
                  <div className="text-gray-600 mt-2">
                    The correct answer was:{' '}
                    <span className="font-bold">{currentQuestion.correctAnswer}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}