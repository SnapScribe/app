import { FC, useCallback, useMemo, useState } from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"

import { Word } from "types"

import { Button } from "@/components/Button"
import { EmptyState } from "@/components/EmptyState"
import { Icon } from "@/components/Icon"
import { PageWrapper } from "@/components/PageWrapper"
import { useData } from "@/context/DataContext"
import { useDebounce } from "@/hooks/debounce"
import { TabScreenProps } from "@/navigators/TabNavigator"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { CategoriesFilter } from "./CategoriesFilter"
import { SearchBar } from "./SearchBar"
import { WordList } from "./WordList"
import { CaptureModal } from "../modals/CaptureModal"
import { ViewModal } from "../modals/ViewModal"

export const HomeScreen: FC<TabScreenProps<"Home">> = (_props) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [query, setQuery] = useState<string>("")
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false)
  const [captureModalOpen, setCaptureModalOpen] = useState<boolean>(false)
  const [selectedWord, setSelectedWord] = useState<Word>()
  const { categories, filteredWords, loading } = useData()
  const { themed } = useAppTheme()
  const debouncedQuery = useDebounce(query, 300)
  const normalizedQuery = useMemo(() => debouncedQuery.toLowerCase().trim(), [debouncedQuery])

  const sortedCategories = useMemo(() => {
    if (!categories) return []
    const selected = categories.find((c) => c.id === selectedCategory)
    const others = categories.filter((c) => c.id !== selectedCategory)
    return selected ? [selected, ...others] : categories
  }, [categories, selectedCategory])

  const selectedWords = useMemo(() => {
    if (!selectedCategory || selectedCategory === 0) return filteredWords
    return filteredWords.filter((w) => w.categoryId === selectedCategory)
  }, [selectedCategory, filteredWords])

  const searchedWords = useMemo(() => {
    if (!normalizedQuery) return selectedWords
    return selectedWords.filter((word) => word.name.toLowerCase().includes(normalizedQuery))
  }, [selectedWords, normalizedQuery])

  const hasWords = useMemo(() => searchedWords.length > 0, [searchedWords])
  const hasFilters = useMemo(
    () => normalizedQuery.trim() || selectedCategory !== 0,
    [normalizedQuery, selectedCategory],
  )

  const openModal = useCallback((w: Word) => {
    setSelectedWord(w)
    setViewModalOpen(true)
  }, [])

  const handleCapturePress = useCallback((status: boolean) => {
    setCaptureModalOpen(status)
  }, [])

  if (loading) {
    return (
      <PageWrapper tx="homeScreen:title">
        <View style={themed($loadingContainer)}>
          <ActivityIndicator />
        </View>
      </PageWrapper>
    )
  }

  if (!loading && !hasWords && hasFilters) {
    return (
      <PageWrapper tx="homeScreen:title">
        <SearchBar query={query} setQuery={setQuery} />
        <CategoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <EmptyState
          headingTx="homeScreen:noResultsCard.title"
          contentTx="homeScreen:noResultsCard.subtitle"
          buttonTx="homeScreen:noResultsCard.clearFilters"
          buttonOnPress={() => {
            setQuery("")
            setSelectedCategory(0)
          }}
        />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper tx="homeScreen:title">
      <SearchBar query={query} setQuery={setQuery} />

      <CategoriesFilter
        categories={sortedCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <WordList
        words={searchedWords}
        openModal={openModal}
        setCaptureModalOpen={handleCapturePress}
      />

      {!captureModalOpen && searchedWords.length > 0 && (
        <Button style={themed($fab)} onPress={() => handleCapturePress(true)}>
          <Icon icon="lock" />
        </Button>
      )}
      <CaptureModal showModal={captureModalOpen} setShowModal={handleCapturePress} />
      <ViewModal showModal={viewModalOpen} setShowModal={setViewModalOpen} word={selectedWord} />
    </PageWrapper>
  )
}

const $fab: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  right: spacing.md,
  bottom: spacing.md,
  padding: spacing.sm,
  aspectRatio: 1,
  borderRadius: 25,
  backgroundColor: colors.tint,
  borderWidth: 0,
  borderColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  minWidth: 0,
  minHeight: 0,
})

const $loadingContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: spacing.xxxl,
})
