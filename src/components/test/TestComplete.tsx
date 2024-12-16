import React from 'react';
import { motion } from 'framer-motion';
import { Confetti } from '../matching/Confetti';
import { TestStats, MissedQuestion } from '../../types/test';

interface TestCompleteProps {
  score: number;
  total: number;
  stats: TestStats;
  missedQuestions: MissedQuestion[];
  onRestart: () => void;
  onBack: () => void;
}

export function TestComplete({ 
  score, 
  total, 
  stats, 
  missedQuestions,
  onRestart, 
  onBack 
}: TestCompleteProps) {
  const getFeedback = () => {
    if (stats.accuracy >= 90) return { emoji: '🎉', text: 'Outstanding! You\'re a master!' };
    if (stats.accuracy >= 70) return { emoji: '🌟', text: 'Great job! Keep practicing!' };
    if (stats.accuracy >= 50) return { emoji: '💪', text: 'Good effort! You\'re improving!' };
    return { emoji: '📚', text: 'Keep studying! You\'ll get better!' };
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
        <div className="text-6xl">{feedback.emoji}</div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 
                       text-transparent bg-clip-text">
          Test Complete!
        </h2>
        
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
              {Math.round(stats.averageResponseTime)}s
            </div>
            <div className="text-gray-600">Avg Response Time</div>
          </div>
        </div>

        {missedQuestions.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Review These Words</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missedQuestions.map((mistake, index) => (
                <div key={index} className="p-4 bg-pink-50 rounded-lg text-left">
                  <div className="text-lg font-bold">{mistake.question}</div>
                  <div className="text-gray-600">Correct: {mistake.correctAnswer}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    <div>{mistake.example}</div>
                    <div className="italic">{mistake.exampleEnglish}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500
                     text-white rounded-full shadow-lg hover:shadow-xl
                     transform transition-all"
          >
            Try Again
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