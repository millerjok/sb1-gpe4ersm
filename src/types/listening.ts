export interface ListeningQuestion {
  id: string;
  audio: string;
  text: string;
  translation: string;
  options: string[];
  correctAnswer: string;
}

export interface ListeningStats {
  score: number;
  streak: number;
  bestStreak: number;
  accuracy: number;
  totalQuestions: number;
  completedQuestions: number;
}

export interface ListeningFeedback {
  show: boolean;
  isCorrect: boolean;
  message?: string;
  streakBonus?: number;
}