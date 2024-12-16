import React from 'react';
import { motion } from 'framer-motion';
import { Confetti } from '../matching/Confetti';
import { ListeningStats } from '../../types/listening';

interface ListeningCompleteProps {
  stats: ListeningStats;
  onRestart: () => void;
  onBack: () => void;
}

export function ListeningComplete({ stats, onRestart, onBack }: ListeningCompleteProps) {
  const getFeedback = () => {
    if (stats.accuracy >= 90) return { emoji: '🎯', text: 'Amazing listening skills!' };
    if (stats.accuracy >= 70) return { emoji: '👂', text: 'Great comprehension!' };
    if (stats.accuracy >= 50) return { emoji: '💪', text: 'Keep practicing!' };
    return { emoji: '📚', text: 'Practice makes perfect!' };
  };

  const feedback = getFeedback();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <Confetti />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-8 max-w-4xl w-full"
      >
        <div className="text-6xl mb-4">{feedback.emoji}</div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 
                       text-transparent bg-clip-text">
          Listening Practice Complete!
        </h2>
        
        <p className="text-xl text-gray-600">{feedback.text}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-2xl font-bold text-pink-600">
              {Math.round(stats.accuracy)}%
            </div>
            <div className="text-gray-600">Accuracy</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-2xl font-bold text-purple-600">
              {stats.bestStreak}
            </div>
            <div className="text-gray-600">Best Streak</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-2xl font-bold text-blue-600">
              {stats.score}
            </div>
            <div className="text-gray-600">Total Score</div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500
                     text-white rounded-full shadow-lg hover:shadow-xl
                     transform transition-all"
          >
            Practice Again
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-8 py-3 bg-gray-100 text-gray-800 rounded-full
                     hover:bg-gray-200 shadow-md hover:shadow-lg
                     transform transition-all"
          >
            Back to Menu
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}