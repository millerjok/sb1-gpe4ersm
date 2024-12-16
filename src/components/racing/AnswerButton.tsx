import React from 'react';

interface AnswerButtonProps {
  content: string;
  keyLabel: string;
  position: 'north' | 'east' | 'south' | 'west';
  onClick: () => void;
  disabled: boolean;
  color: 'blue' | 'red';
}

export function AnswerButton({ content, keyLabel, onClick, disabled, color }: AnswerButtonProps) {
  const baseColor = color === 'blue' ? 'blue' : 'red';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-32 h-16 rounded-lg
        ${disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : `bg-${baseColor}-100 hover:bg-${baseColor}-200 text-${baseColor}-800 shadow-md`
        }
        transition-colors duration-200
        flex items-center justify-center
        transform-none
      `}
    >
      <div className="flex flex-col items-center">
        <span className="text-lg font-medium">{content}</span>
        <span className={`text-sm ${disabled ? 'text-gray-400' : `text-${baseColor}-600`}`}>
          {keyLabel}
        </span>
      </div>
    </button>
  );
}