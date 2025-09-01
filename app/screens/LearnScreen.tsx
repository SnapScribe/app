import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Word } from "types"

import { AutoImage } from "@/components/AutoImage"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { EmptyState } from "@/components/EmptyState"
import { PageWrapper } from "@/components/PageWrapper"
import { Text } from "@/components/Text"
import { useData } from "@/context/DataContext"
import { TabScreenProps } from "@/navigators/TabNavigator"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { sample, shuffle } from "@/utils/helpers"

export const LearnScreen: FC<TabScreenProps<"Learn">> = (_props) => {
  const { filteredWords } = useData()
  const { themed } = useAppTheme()
  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [options, setOptions] = useState<Word[]>([])
  const [guessedWords, setGuessedWords] = useState<string[]>([])
  const [gameLoading, setGameLoading] = useState<boolean>(true)
  const [imgLoading, setImgLoading] = useState<boolean>(false)

  const remaining = useMemo(
    () => filteredWords.filter((w) => !guessedWords.includes(w.name)),
    [filteredWords, guessedWords],
  )

  const nextRound = useCallback(
    (avoidName?: string) => {
      if (filteredWords.length <= 1) {
        setCurrentWord(null)
        setOptions([])
        setGameLoading(false)
        return
      }

      const pool = remaining.length > 0 ? remaining : filteredWords
      const candidates = avoidName ? pool.filter((w) => w.name !== avoidName) : pool

      const prompt = sample(candidates)
      if (!prompt) {
        setCurrentWord(null)
        setOptions([])
        setGameLoading(false)
        return
      }

      // Pick two distractors
      const distractorPool = filteredWords.filter((w) => w.name !== prompt.name)
      const numOptions = Math.min(3, filteredWords.length) // 3 or 2
      const distractors = shuffle(distractorPool).slice(0, numOptions - 1)
      const opts = shuffle([prompt, ...distractors])

      setCurrentWord(prompt)
      setOptions(opts)
      setGameLoading(false)
    },
    [filteredWords, remaining],
  )

  useEffect(() => {
    nextRound()
  }, [filteredWords, nextRound])

  const guess = useCallback(
    (name: string) => {
      if (!currentWord) return

      if (name === currentWord.name) {
        // Functional update fixes stale state
        setGuessedWords((prev) => {
          if (prev.includes(currentWord.name)) return prev
          return [...prev, currentWord.name]
        })
        alert("Great!")
      } else {
        alert(`Fail! It was ${currentWord.name}`)
      }

      setGameLoading(true)
      nextRound(currentWord.name)
    },
    [currentWord, nextRound],
  )

  if (!currentWord || gameLoading) {
    return (
      <PageWrapper tx="learnScreen:title">
        {filteredWords.length === 0 && !gameLoading ? <EmptyState /> : <Text tx="common:loading" />}
      </PageWrapper>
    )
  }

  return (
    <PageWrapper tx="learnScreen:title">
      <Card
        key={currentWord.id}
        preset="default"
        style={themed($imageCard)}
        ContentComponent={
          <View style={themed($cardContent)}>
            <AutoImage
              source={{ uri: currentWord.image }}
              style={themed($cardImage)}
              onLoadStart={() => setImgLoading(true)}
              onLoadEnd={() => setImgLoading(false)}
            />
            {imgLoading && (
              <View style={themed($loaderContainer)}>
                <ActivityIndicator size="large" />
              </View>
            )}
            <View style={themed($imageOverlay)} />
          </View>
        }
      />

      <View style={themed($optionsContainer)}>
        {options.map((opt, index) => (
          <Button
            key={index}
            onPress={() => guess(opt.name)}
            style={themed($button)}
            textStyle={themed($buttonText)}
            preset="default"
          >
            {opt.name}
          </Button>
        ))}
      </View>
    </PageWrapper>
  )
}

const $imageCard: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  padding: 0,
  borderRadius: 16,
  overflow: "hidden",
  marginBottom: spacing.lg,
  elevation: 4, // Android shadow
  shadowColor: colors.palette.neutral800, // iOS shadow
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
})

const $cardContent: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: 200, // Slightly taller for better proportions
  position: "relative",
})

const $cardImage: ThemedStyle<ImageStyle> = () => ({
  width: "100%",
  height: "100%",
  resizeMode: "cover",
})

const $imageOverlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.palette.neutral900,
  opacity: 0.05, // Very subtle overlay
})

const $optionsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm, // Modern gap property for consistent spacing
  width: "100%",
})

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  borderRadius: 12,
  marginBottom: spacing.sm,
  backgroundColor: colors.palette.primary100,
  borderWidth: 1,
  borderColor: colors.palette.primary300,
  // Add subtle press animation
  transform: [{ scale: 1 }],
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary600,
  fontWeight: "600",
  textAlign: "center",
})

const $loaderContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.tintInactive,
  zIndex: 1,
})
