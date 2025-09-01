export type Category = {
  id: number
  name: string
}

export type Word = {
  id: number
  name: string
  description: string
  image: string
  languageId: number
  createdAt: number
  categoryId: number
}

export type FlashCard = {
  word: string
  guess1: string
  guess2: string
  image: string
}

export type Language = {
  id: number
  label: string
  value: string // 2-letter iso639 language code
  flag: string // emoji flag icon
}
