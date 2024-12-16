import React from 'react';
import { motion } from 'framer-motion';
import { RacingQuestion as RacingQuestionType } from '../../types/racing';
import { AnswerGrid } from './AnswerGrid';

interface RacingQuestionProps {
  question: RacingQuestionType;
  onAnswer: (answer: string, player: 'player1' | 'player2') => void;
  disabledPlayers: Set<string>;
}

export function RacingQuestion({ question, onAnswer, disabledPlayers }: RacingQuestionProps) {
  const player1Controls = ['W', 'D', 'S', 'A'];
  const player2Controls = ['↑', '→', '↓', '←'];

  return (
    <div className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg text-center"
      >
        <div className="text-gray-600 mb-4">
          Translate this {question.isJapanese ? 'Japanese' : 'English'} word:
        </div>
        <div className={`text-3xl font-bold ${question.isJapanese ? 'font-japanese' : ''}`}>
          {question.prompt}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {/* Player 1 Controls */}
        <div className="flex flex-col items-center">
          <div className="text-center text-blue-600 font-bold mb-8">
            Player 1 (WASD)
            {disabledPlayers.has('player1') && (
              <span className="text-red-500 ml-2">(Wrong answer!)</span>
            )}
          </div>
          <div className="flex items-center justify-center">
            <AnswerGrid
              options={question.options}
              onAnswer={(answer) => onAnswer(answer, 'player1')}
              disabled={disabledPlayers.has('player1')}
              color="blue"
              controls={player1Controls}
            />
          </div>
        </div>

        {/* Player 2 Controls */}
        <div className="flex flex-col items-center">
          <div className="text-center text-red-600 font-bold mb-8">
            Player 2 (Arrow Keys)
            {disabledPlayers.has('player2') && (
              <span className="text-red-500 ml-2">(Wrong answer!)</span>
            )}
          </div>
          <div className="flex items-center justify-center">
            <AnswerGrid
              options={question.options}
              onAnswer={(answer) => onAnswer(answer, 'player2')}
              disabled={disabledPlayers.has('player2')}
              color="red"
              controls={player2Controls}
            />
          </div>
        </div>
      </div>
    </div>
  );
}