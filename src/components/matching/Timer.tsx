import React, { useEffect, useState } from 'react';

interface TimerProps {
  isRunning: boolean;
  onTick: (time: number) => void;
}

export function Timer({ isRunning, onTick }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime(t => {
          const newTime = t + 1;
          onTick(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTick]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-xl font-mono">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}