import React from 'react';
import { motion } from 'framer-motion';
import { ListeningStats } from '../../types/listening';

interface ListeningProgressProps {
  stats: ListeningStats;
}

export function ListeningProgress({ stats }: ListeningProgressProps) {
  const progress = (stats.completedQuestions / stats.totalQuestions) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          Question {stats.completedQuestions} of {stats.totalQuestions}
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600">
            Score: <span className="font-bold text-pink-600">{stats.score}</span>
          </div>
          {stats.streak >= 3 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`
                px-4 py-2 rounded-full text-white font-bold
                ${stats.streak >= 10 ? 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500' :
                  stats.streak >= 7 ? 'bg-gradient-to-r from-yellow-400 to-red-500' :
                  stats.streak >= 5 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                  'bg-gradient-to-r from-yellow-300 to-yellow-500'}
              `}
            >
              {stats.streak}x Streak! 🔥
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}