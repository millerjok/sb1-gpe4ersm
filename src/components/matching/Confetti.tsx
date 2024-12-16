import React from 'react';
import { motion } from 'framer-motion';

interface ConfettiPieceProps {
  color: string;
  delay: number;
}

function ConfettiPiece({ color, delay }: ConfettiPieceProps) {
  return (
    <motion.div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: color,
        borderRadius: '2px',
        position: 'absolute',
      }}
      initial={{ y: -20, x: '-50%', rotate: 0 }}
      animate={{
        y: ['0%', '100%'],
        x: ['-50%', `${(Math.random() - 0.5) * 200}%`],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

export function Confetti() {
  const colors = ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'];
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    color: colors[i % colors.length],
    delay: i * 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pieces.map((piece, i) => (
        <ConfettiPiece key={i} {...piece} />
      ))}
    </div>
  );
}