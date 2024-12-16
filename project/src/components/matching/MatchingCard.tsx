import React from 'react';
import { motion } from 'framer-motion';

interface MatchingCardProps {
  card: {
    content: string;
    isJapanese: boolean;
  };
  isSelected: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function MatchingCard({ card, isSelected, isMatched, onClick }: MatchingCardProps) {
  if (isMatched) {
    return (
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32"
      />
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        w-32 h-32 rounded-xl shadow-lg cursor-pointer
        flex items-center justify-center p-4 text-center
        transition-all duration-300
        ${isSelected ? 'bg-pink-100 border-2 border-pink-400' : 'bg-white hover:bg-gray-50'}
        ${card.isJapanese ? 'text-2xl' : 'text-lg'}
      `}
      onClick={onClick}
    >
      {card.content}
    </motion.div>
  );
}