import React from 'react';
import { AnswerButton } from './AnswerButton';

interface AnswerGridProps {
  options: string[];
  onAnswer: (answer: string) => void;
  disabled: boolean;
  color: 'blue' | 'red';
  controls: string[];
}

export function AnswerGrid({ options, onAnswer, disabled, color, controls }: AnswerGridProps) {
  return (
    <div className="relative w-[400px] h-[300px]">
      {/* Center circle for visual reference */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-gray-200" />
      
      <div className="absolute inset-0">
        {/* North button */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <AnswerButton
            content={options[0]}
            keyLabel={controls[0]}
            position="north"
            onClick={() => onAnswer(options[0])}
            disabled={disabled}
            color={color}
          />
        </div>

        {/* East button */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2">
          <AnswerButton
            content={options[1]}
            keyLabel={controls[1]}
            position="east"
            onClick={() => onAnswer(options[1])}
            disabled={disabled}
            color={color}
          />
        </div>

        {/* South button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <AnswerButton
            content={options[2]}
            keyLabel={controls[2]}
            position="south"
            onClick={() => onAnswer(options[2])}
            disabled={disabled}
            color={color}
          />
        </div>

        {/* West button */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <AnswerButton
            content={options[3]}
            keyLabel={controls[3]}
            position="west"
            onClick={() => onAnswer(options[3])}
            disabled={disabled}
            color={color}
          />
        </div>
      </div>
    </div>
  );
}