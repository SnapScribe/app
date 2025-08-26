import { Category, Language, Word } from "@/types";
import { mockCategories, mockSupportedLanguages, mockWords } from "./mocks";

export const getSupportedLanguages = async (): Promise<Language[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSupportedLanguages), 150);
  });
};
export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 200);
  });
};

export const getWords = async (): Promise<Word[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockWords), 420);
  });
};

export const identifyWord = async ({
  image,
  language,
}: {
  image: string;
  language: string;
}): Promise<Word> => {
  return await new Promise(() => undefined);
};
