import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestQuestion, QuestionFeedback } from '../../types/test';
import { BASE_SCORE } from './constants';

interface QuestionCardProps {
  question: TestQuestion;
  feedback: QuestionFeedback;
  onAnswer: (answer: string) => void;
}

export function QuestionCard({ question, feedback, onAnswer }: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg text-center min-h-[200px] flex flex-col justify-center"
      >
        <div className="text-gray-600 mb-4">
          Translate this {question.isJapanese ? 'Japanese' : 'English'} word:
        </div>
        <div className={`text-3xl font-bold ${question.isJapanese ? 'font-japanese' : ''}`}>
          {question.prompt}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !feedback.show && onAnswer(option)}
            disabled={feedback.show}
            className={`
              w-full h-24 rounded-lg shadow transition-all text-lg font-medium
              flex items-center justify-center px-6 text-center
              ${feedback.show && option === question.correctAnswer
                ? 'bg-green-100 border-2 border-green-500 text-green-700'
                : 'bg-white hover:bg-gray-50 text-gray-800 hover:shadow-md transform hover:scale-105 transition-all'
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
            className="text-center space-y-4"
          >
            {feedback.isCorrect ? (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xl font-medium space-y-2"
              >
                <div className="text-3xl">✨</div>
                <div className="text-green-600">
                  Correct! +{BASE_SCORE} points
                  {feedback.streakBonus && (
                    <div className="text-yellow-600 font-bold mt-2">
                      {feedback.streakBonus.name} Streak! +{feedback.streakBonus.points} points 🔥
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="space-y-2"
              >
                <div className="text-xl text-red-500">Not quite right</div>
                <div className="text-gray-600">
                  The correct answer was:{' '}
                  <span className="font-bold text-pink-600">{feedback.correctAnswer}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}