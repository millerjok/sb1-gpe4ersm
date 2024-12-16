export interface TestQuestion {
  prompt: string;
  correctAnswer: string;
  options: string[];
  isJapanese: boolean;
  originalCard: {
    kanji: string;
    kana: string;
    english: string;
    example: string;
    exampleEnglish: string;
  };
}

export interface TestStats {
  accuracy: number;
  bestStreak: number;
  averageResponseTime: number;
  totalScore: number;
  streakBonus: number;
  streakLevel?: string;
}

export interface QuestionFeedback {
  show: boolean;
  isCorrect: boolean;
  correctAnswer?: string;
  streakBonus?: {
    points: number;
    name: string;
  };
}

export interface MissedQuestion {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  example: string;
  exampleEnglish: string;
}