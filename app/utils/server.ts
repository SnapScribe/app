import { Category, Language, Word } from "types"

export const getSupportedLanguages = async (): Promise<Language[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSupportedLanguages), 150)
  })
}
export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 200)
  })
}

export const getWords = async (): Promise<Word[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockWords), 420)
  })
}

export const identifyWord = async ({
  image,
  language,
}: {
  image: string
  language: string
}): Promise<Word> => {
  return await new Promise(() => undefined)
}

export const mockCategories: Category[] = [
  { id: 0, name: "All", emoji: "?" },
  { id: 1, name: "Furniture", emoji: "🏠" },
  { id: 2, name: "Nature", emoji: "🌿" },
  { id: 3, name: "Food", emoji: "🍎" },
  { id: 4, name: "Animals", emoji: "🦋" },
]

export const mockWords: Word[] = [
  {
    id: 1,
    name: "Chair",
    description: "A piece of furniture you sit on",
    image: "https://picsum.photos/seed/chair/350",
    languageId: 1,
    createdAt: 1754262574000,
    categoryId: 1,
  },
  {
    id: 2,
    name: "Oak",
    description:
      "A tree with large leaves that loses in winter whose wood is used to build furtniture",
    image: "https://picsum.photos/seed/oak/350",
    languageId: 1,
    createdAt: 1755731374000,
    categoryId: 1,
  },
  {
    id: 3,
    name: "River",
    description: "A natural flowing watercourse towards an ocean or sea",
    image: "https://picsum.photos/seed/river/350",
    languageId: 1,
    createdAt: 1756249774000,
    categoryId: 1,
  },
  {
    id: 4,
    name: "Lamp",
    description: "A device that produces light using electricity",
    image: "https://picsum.photos/seed/lamp/350",
    languageId: 1,
    createdAt: 1678934567890,
    categoryId: 2,
  },
  {
    id: 5,
    name: "Engineer",
    description: "A professional who designs and builds complex systems",
    image: "https://picsum.photos/seed/engineer/350",
    languageId: 1,
    createdAt: 1678945678901,
    categoryId: 3,
  },
  {
    id: 6,
    name: "Mountain",
    description: "A large natural elevation of the earth's surface",
    image: "https://picsum.photos/seed/mountain/350",
    languageId: 1,
    createdAt: 1678956789012,
    categoryId: 1,
  },
  {
    id: 7,
    name: "Sofa",
    description: "A long upholstered seat with a back and arms",
    image: "https://picsum.photos/seed/sofa/350",
    languageId: 1,
    createdAt: 1678967890123,
    categoryId: 2,
  },
  {
    id: 8,
    name: "Dolphin",
    description: "A highly intelligent marine mammal known for its playfulness",
    image: "https://picsum.photos/seed/dolphin/350",
    languageId: 1,
    createdAt: 1678978901234,
    categoryId: 1,
  },
  {
    id: 9,
    name: "Chef",
    description: "A professional cook who prepares meals in restaurants",
    image: "https://picsum.photos/seed/chef/350",
    languageId: 1,
    createdAt: 1678989012345,
    categoryId: 3,
  },
  {
    id: 10,
    name: "Bookshelf",
    description: "A piece of furniture with shelves for storing books",
    image: "https://picsum.photos/seed/bookshelf/350",
    languageId: 1,
    createdAt: 1679000123456,
    categoryId: 2,
  },
  {
    id: 11,
    name: "Butterfly",
    description: "A flying insect with colorful wings and a slender body",
    image: "https://picsum.photos/seed/butterfly/350",
    languageId: 1,
    createdAt: 1679011234567,
    categoryId: 1,
  },
  {
    id: 12,
    name: "Artist",
    description: "A person who creates paintings or other works of art",
    image: "https://picsum.photos/seed/artist/350",
    languageId: 1,
    createdAt: 1679022345678,
    categoryId: 3,
  },
]

export const mockSupportedLanguages: Language[] = [
  { id: 1, iso639: "en", name: "English", flag: "🇺🇸" },
  { id: 2, iso639: "es", name: "Spanish", flag: "🇪🇸" },
  { id: 3, iso639: "it", name: "Italian", flag: "🇮🇹" },
]
