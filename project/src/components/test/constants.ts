export const TOTAL_QUESTIONS = 15;
export const FEEDBACK_DELAY = 1500;
export const BASE_SCORE = 10;

export const STREAK_LEVELS = [
  { threshold: 3, bonus: 5, name: 'Good' },
  { threshold: 5, bonus: 10, name: 'Great' },
  { threshold: 7, bonus: 20, name: 'Amazing' },
  { threshold: 10, bonus: 50, name: 'Unstoppable' }
] as const;