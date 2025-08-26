import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Category, Word, Language } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories, getSupportedLanguages, getWords, identifyWord } from '@/data/server';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';

interface DataContextProps {
  supportedLanguages: Language[];
  categories: Category[];
  words: Word[];
  filteredWords: Word[];
  language?: Language;
  changeLanguage: (iso: string) => void;
  processItem: (image: string) => Promise<void>;
  loading: boolean;
  error: Error | undefined;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const {
    data: supportedLanguages = [],
    isLoading: supportedLanguagesLoading,
    error: supportedLanguagesError,
  } = useQuery<Language[], Error>({
    queryKey: ['supportedLanguages'],
    queryFn: getSupportedLanguages,
    staleTime: 24 * 60 * 60_000,
    refetchOnWindowFocus: false,
  });

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 24 * 60 * 60_000,
    refetchOnWindowFocus: false,
  });

  const {
    data: words = [],
    isLoading: wordsLoading,
    error: wordsError,
  } = useQuery<Word[], Error>({
    queryKey: ['words'],
    queryFn: getWords,
    staleTime: 30 * 60_000,
    refetchOnWindowFocus: false,
  });

  const loading = supportedLanguagesLoading || categoriesLoading || wordsLoading;
  const error = supportedLanguagesError || categoriesError || wordsError || undefined;

  const [language, setLanguage] = useState<Language | undefined>(undefined);
  const toast = useToast();

  const showAlert = useCallback(
    (severity: 'success' | 'error' | 'info', title: string) => {
      toast.show({
        placement: 'bottom right',
        duration: 3000,
        render: () => (
          <Toast action={severity} variant="solid">
            <ToastTitle>{title}</ToastTitle>
          </Toast>
        ),
      });
    },
    [toast],
  );

  useEffect(() => {
    if (!language && supportedLanguages.length > 0) {
      setLanguage(supportedLanguages[0]);
    }
  }, [supportedLanguages, language]);

  const filteredWords = useMemo(() => {
    if (!language) return words;
    return words.filter((w) => w.languageId === language.id);
  }, [words, language]);

  const mutation = useMutation<Word, Error, { image: string; language: string }>({
    mutationFn: identifyWord,
    onSuccess: () => {
      showAlert('success', 'Item processed');
      queryClient.invalidateQueries({ queryKey: ['words'] });
    },
    onError: () => {
      showAlert('error', 'Failed to process item');
    },
  });

  const changeLanguage = useCallback(
    (iso: string) => {
      const found = supportedLanguages.find((l) => l.iso639 === iso);
      if (!found) {
        showAlert('error', 'Invalid language selected');
        return;
      }
      showAlert('info', `Language changed to ${found.name}`);
      setLanguage(found);
    },
    [showAlert, supportedLanguages],
  );

  const processItem = useCallback(
    async (image: string) => {
      if (!language) {
        showAlert('error', 'Select language first');
        return;
      }
      await mutation.mutateAsync({ image, language: language.iso639 });
    },
    [showAlert, language, mutation],
  );

  const value = useMemo<DataContextProps>(
    () => ({
      supportedLanguages,
      categories,
      words,
      filteredWords,
      language,
      changeLanguage,
      processItem,
      loading,
      error,
    }),
    [
      supportedLanguages,
      categories,
      words,
      filteredWords,
      language,
      changeLanguage,
      processItem,
      loading,
      error,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataContextProvider');
  return ctx;
};
