import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Category, Language, Word } from "types"

import { translate } from "@/i18n/translate"
import { getSupportedLanguages, getCategories, getWords, identifyWord } from "@/utils/server"

import { useBilling } from "./BillingContext"

interface DataContextProps {
  supportedLanguages: Language[]
  categories: Category[]
  words: Word[]
  filteredWords: Word[]
  language?: Language
  changeLanguage: (iso: string) => void
  processItem: (image: string) => Promise<Word | undefined>
  loading: boolean
  error: Error | undefined
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { credits } = useBilling()
  const queryClient = useQueryClient()

  const {
    data: supportedLanguages = [],
    isLoading: supportedLanguagesLoading,
    error: supportedLanguagesError,
  } = useQuery<Language[], Error>({
    queryKey: ["supportedLanguages"],
    queryFn: getSupportedLanguages,
    staleTime: 24 * 60 * 60_000,
    refetchOnWindowFocus: false,
  })

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 24 * 60 * 60_000,
    refetchOnWindowFocus: false,
  })

  const {
    data: words = [],
    isLoading: wordsLoading,
    error: wordsError,
  } = useQuery<Word[], Error>({
    queryKey: ["words"],
    queryFn: getWords,
    staleTime: 30 * 60_000,
    refetchOnWindowFocus: false,
  })

  const loading = supportedLanguagesLoading || categoriesLoading || wordsLoading
  const error = supportedLanguagesError || categoriesError || wordsError || undefined

  const [language, setLanguage] = useState<Language | undefined>(undefined)

  const showAlert = useCallback((severity: "success" | "error" | "info", msg: string) => {
    alert(msg)
  }, [])

  useEffect(() => {
    if (!language && supportedLanguages.length > 0) {
      setLanguage(supportedLanguages[0])
    }
  }, [supportedLanguages, language])

  const filteredWords = useMemo(() => {
    if (!language) return words
    return words.filter((w) => w.languageId === language.id)
  }, [words, language])

  const mutation = useMutation<Word, Error, { image: string; language: string }>({
    mutationFn: identifyWord,
    onSuccess: () => {
      showAlert("success", "Item processed")
      queryClient.invalidateQueries({ queryKey: ["words"] })
    },
    onError: () => {
      showAlert("error", "Failed to process item")
    },
  })

  const changeLanguage = useCallback(
    (val: string) => {
      const found = supportedLanguages.find((l) => l.label === val || l.value === val)
      if (!found) {
        showAlert("error", translate("alerts:invalidLanguage"))
        return
      }
      showAlert("info", `${translate("alerts:languageChanged")} ${found.label}`)
      setLanguage(found)
    },
    [showAlert, supportedLanguages],
  )

  const processItem = useCallback(
    async (image: string) => {
      if (!language) {
        showAlert("error", "Select language first")
        return
      }
      if (!credits) {
        showAlert("error", "Insufficient credits")
        return
      }
      return await mutation.mutateAsync({ image, language: language.value })
    },
    [showAlert, language, credits],
  )

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
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useData must be used within DataContextProvider")
  return ctx
}
