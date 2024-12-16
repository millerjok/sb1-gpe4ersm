import React from 'react';
import { motion } from 'framer-motion';
import { CircleDot } from 'lucide-react';

interface RacingLightsProps {
  score: number;
  color: 'blue' | 'red';
  label: string;
}

export function RacingLights({ score, color, label }: RacingLightsProps) {
  return (
    <div className="relative h-full">
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-white font-medium">
        {label}
      </div>
      <div className="h-full grid grid-cols-10 gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`
              relative rounded-md border-2 
              ${index < score 
                ? `bg-${color}-500 border-${color}-400 animate-pulse` 
                : 'bg-gray-700 border-gray-600'
              }
            `}
          >
            {index < score && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <CircleDot className={`w-6 h-6 text-${color}-200`} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}