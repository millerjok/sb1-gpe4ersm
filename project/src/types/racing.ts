export interface RacingQuestion {
  prompt: string;
  correctAnswer: string;
  options: string[];
  isJapanese: boolean;
}

export interface RacingStats {
  player1Score: number;
  player2Score: number;
  currentRound: number;
  totalRounds: number;
  winner?: 'player1' | 'player2' | 'tie';
}

export interface CarPosition {
  x: number;
  progress: number;
}