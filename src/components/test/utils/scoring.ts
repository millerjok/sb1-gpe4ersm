import { STREAK_LEVELS, BASE_SCORE } from '../constants';

export function getStreakBonus(streak: number) {
  return [...STREAK_LEVELS]
    .reverse()
    .find(level => streak >= level.threshold);
}

export function calculateAccuracy(score: number, questionsAnswered: number): number {
  if (questionsAnswered === 0) return 0;
  return (score / (questionsAnswered * BASE_SCORE)) * 100;
}

export function calculateTotalScore(baseScore: number, streakBonus: number): number {
  return baseScore + streakBonus;
}