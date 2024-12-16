import React from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

interface RacingCarProps {
  player: 'player1' | 'player2';
  position: number;
  color: 'blue' | 'red';
}

export function RacingCar({ player, position, color }: RacingCarProps) {
  return (
    <motion.div
      className={`absolute ${player === 'player1' ? 'top-1/4' : 'top-3/4'} -translate-y-1/2`}
      animate={{ x: `${position}%` }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div
        className={`w-16 h-16 bg-${color}-500 rounded-lg shadow-lg transform -translate-x-1/2
                   flex items-center justify-center`}
        animate={{ y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <Car className="w-10 h-10 text-white" />
      </motion.div>
    </motion.div>
  );
}