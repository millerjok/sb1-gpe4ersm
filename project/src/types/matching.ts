export interface MatchingCard {
  id: string;
  content: string;
  isJapanese: boolean;
}

export interface MatchingGameState {
  cards: MatchingCard[];
  selectedCards: number[];
  matchedPairs: string[];
  showConfetti: boolean;
}