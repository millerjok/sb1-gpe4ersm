import React from 'react';

export function ActionButtons() {
  return (
    <div className="flex flex-col space-y-4">
      <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transform transition hover:scale-105 shadow-lg">
        Start Learning
      </button>
      <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transform transition hover:scale-105 shadow-lg">
        Practice Hiragana
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transform transition hover:scale-105 shadow-lg">
        Take a Quiz
      </button>
    </div>
  );
}