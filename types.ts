export type Category = {
  id: number;
  name: string;
  emoji: string;
};

export type Word = {
  id: number;
  name: string;
  description: string;
  image: string;
  languageId: number;
  createdAt: number;
  categoryId: number;
};

export type FlashCard = {
  word: string;
  guess1: string;
  guess2: string;
  image: string;
};

export type Language = {
  id: number;
  name: string;
  iso639: string; // 2-letter language code
  flag: string; // emoji flag icon
};
