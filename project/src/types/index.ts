export interface Chapter {
  id: number;
  title: string;
}

export interface Mode {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type AppView = 'chapters' | 'modes' | 'flashcard' | 'matching' | 'test' | 'listening' | 'racing';

export interface VocabularyCard {
  kanji: string;
  kana: string;
  romaji: string;
  english: string;
  example: string;
  exampleEnglish: string;
}