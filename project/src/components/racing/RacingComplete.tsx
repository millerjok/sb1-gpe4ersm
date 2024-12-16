import React from 'react';
import { motion } from 'framer-motion';
import { Confetti } from '../matching/Confetti';
import { RacingStats } from '../../types/racing';

interface RacingCompleteProps {
  stats: RacingStats;
  onRestart: () => void;
  onBack: () => void;
}

export function RacingComplete({ stats, onRestart, onBack }: RacingCompleteProps) {
  const getWinnerMessage = () => {
    if (stats.winner === 'player1') return { text: 'Player 1 Wins! 🏆', color: 'text-blue-600' };
    if (stats.winner === 'player2') return { text: 'Player 2 Wins! 🏆', color: 'text-red-600' };
    return { text: "It's a Tie! 🤝", color: 'text-purple-600' };
  };

  const message = getWinnerMessage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <Confetti />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-8"
      >
        <h2 className={`text-4xl font-bold ${message.color}`}>
          {message.text}
        </h2>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-blue-100 p-6 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">
              Player 1
            </div>
            <div className="text-3xl font-bold mt-2">
              {stats.player1Score}
            </div>
          </div>
          
          <div className="bg-red-100 p-6 rounded-xl">
            <div className="text-2xl font-bold text-red-600">
              Player 2
            </div>
            <div className="text-3xl font-bold mt-2">
              {stats.player2Score}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-red-500
                     text-white rounded-full shadow-lg hover:shadow-xl
                     transform transition-all"
          >
            Race Again
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