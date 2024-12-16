import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface RacingStreakProps {
  streak: number;
  color: 'blue' | 'red';
}

export function RacingStreak({ streak, color }: RacingStreakProps) {
  if (streak < 2) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`
        px-3 py-1 rounded-full text-white font-bold text-sm
        flex items-center space-x-1
        ${color === 'blue' ? 'bg-blue-500' : 'bg-red-500'}
      `}
    >
      <span>{streak}x</span>
      <Flame 
        className={`w-4 h-4 ${streak >= 5 ? 'animate-pulse' : ''}`}
        style={{ 
          filter: streak >= 3 ? 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' : 'none' 
        }}
      />
    </motion.div>
  );
}