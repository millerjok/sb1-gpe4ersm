import React from 'react';
import { motion } from 'framer-motion';
import { RacingLights } from './RacingLights';
import { RacingStreak } from './RacingStreak';

interface RacingTrackProps {
  player1Score: number;
  player2Score: number;
  player1Streak: number;
  player2Streak: number;
}

export function RacingTrack({ 
  player1Score, 
  player2Score,
  player1Streak,
  player2Streak
}: RacingTrackProps) {
  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between text-lg font-bold">
        <div className="flex items-center space-x-4">
          <div className="text-blue-600">Player 1: {player1Score}/10</div>
          <RacingStreak streak={player1Streak} color="blue" />
        </div>
        <div className="flex items-center space-x-4">
          <RacingStreak streak={player2Streak} color="red" />
          <div className="text-red-600">Player 2: {player2Score}/10</div>
        </div>
      </div>

      <div className="relative h-48 bg-gray-800 rounded-xl p-4">
        {/* Track background with grid */}
        <div className="h-full grid grid-rows-2 gap-4">
          {/* Player 1 Track */}
          <RacingLights 
            score={player1Score} 
            color="blue"
            label="Player 1"
          />
          
          {/* Player 2 Track */}
          <RacingLights 
            score={player2Score} 
            color="red"
            label="Player 2"
          />
        </div>
      </div>
    </div>
  );
}