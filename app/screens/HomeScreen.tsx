import { FC, useCallback, useMemo, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import type { ImageStyle } from "react-native"

import { AutoImage } from "@/components/AutoImage"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { EmptyState } from "@/components/EmptyState"
import Fab from "@/components/Fab"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { useData } from "@/context/DataContext"
import { TabScreenProps } from "@/navigators/TabNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

export const HomeScreen: FC<TabScreenProps<"Home">> = (_props) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [query, setQuery] = useState<string>("")
  const { themed } = useAppTheme()
  const { categories, filteredWords } = useData()

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
    if (!query.trim()) return selectedWords
    return selectedWords.filter((word) => word.name.toLowerCase().includes(query.toLowerCase()))
  }, [selectedWords, query])

  const isSelected = useCallback(
    (categoryId: number) => (selectedCategory === categoryId ? "reversed" : "default"),
    [selectedCategory],
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="homeScreen:title" style={themed($title)} />

      {filteredWords.length > 0 && (
        <View style={themed($searchRow)}>
          <TextField
            value={query}
            onChangeText={setQuery}
            placeholder="Search words"
            autoCorrect={false}
            returnKeyType="search"
            containerStyle={themed($searchField)}
            inputWrapperStyle={themed($searchInputWrap)}
            style={themed($textInput)}
            RightAccessory={() =>
              query.trim().length > 0 ? (
                <Button
                  onPress={() => setQuery("")}
                  accessibilityLabel="Clear search"
                  style={themed($iconOnlyBtn)}
                  textStyle={themed($iconOnlyText)}
                >
                  <Icon icon="x" />
                </Button>
              ) : null
            }
          />
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={themed($buttonScroll)}
      >
        {sortedCategories.map((category, index) => (
          <Button
            key={index}
            preset={isSelected(category.id)}
            onPress={() => setSelectedCategory(category.id)}
            style={themed($chipButton)}
            textStyle={themed($chipText)}
          >
            {category.name}
          </Button>
        ))}
      </ScrollView>

      <ScrollView
        style={themed($fill)}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={themed($cardScroll)}
        keyboardShouldPersistTaps="handled"
      >
        {searchedWords.length > 0 ? (
          <View style={[$styles.row, themed($categories)]}>
            {searchedWords.map((word, index) => (
              <Card
                key={index}
                preset="default"
                style={themed($imageCard)} // remove padding and clip content
                ContentComponent={
                  <View style={themed($cardContent)}>
                    <AutoImage source={{ uri: word.image }} style={themed($cardImage)} />
                    <View style={themed($overlay)}>
                      <Text style={themed($overlayText)} weight="bold">
                        {word.name}
                      </Text>
                    </View>
                  </View>
                }
              />
            ))}
          </View>
        ) : (
          <EmptyState
            headingTx="homeScreen:emptyCard.title"
            contentTx="homeScreen:emptyCard.subtitle"
            buttonTx="homeScreen:emptyCard.button"
            ButtonProps={{ preset: "reversed" }}
          />
        )}
      </ScrollView>
    </Screen>
  )
}

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $categories: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: 8,
  padding: spacing.sm,
  marginTop: spacing.md,
  marginVertical: spacing.md,
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  gap: spacing.md,
})

const $buttonScroll: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  paddingHorizontal: spacing.xs,
  marginBottom: spacing.xl,
})

const $chipButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xl,
  paddingVertical: spacing.xs,
  borderRadius: spacing.xxxl,
  alignSelf: "flex-start",
  minHeight: 0,
  minWidth: 0,
  height: 35,
})

const $chipText: ThemedStyle<TextStyle> = () => ({
  fontSize: 12,
  lineHeight: 16,
})

const $searchRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  marginBottom: spacing.md,
})

const $searchField: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.neutral100, // tweak to your theme
  borderRadius: 24,
  paddingHorizontal: spacing.sm,
  // subtle elevation
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
})

const $searchInputWrap: ThemedStyle<ViewStyle> = () => ({
  borderWidth: 0,
  backgroundColor: "transparent",
  paddingVertical: 8,
  paddingHorizontal: 0,
})

const $textInput: ThemedStyle<TextStyle> = () => ({
  fontSize: 14,
  lineHeight: 18,
  paddingVertical: 0,
})

const $iconOnlyBtn: ThemedStyle<ViewStyle> = () => ({
  paddingHorizontal: 0,
  minWidth: 0,
  minHeight: 0,
  justifyContent: "center",
  alignItems: "center",
})

const $iconOnlyText: ThemedStyle<TextStyle> = () => ({
  fontSize: 12,
  lineHeight: 12,
})

const $imageCard: ThemedStyle<ViewStyle> = () => ({
  padding: 0,
  borderRadius: 12,
  overflow: "hidden", // ensures image corners follow the card radius
})

const $cardContent: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: 160, // adjust as needed
  position: "relative",
})

const $cardImage: ThemedStyle<ImageStyle> = () => ({
  width: "100%",
  height: "100%",
  resizeMode: "cover",
})

const $overlay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: spacing.sm,
  backgroundColor: "rgba(0,0,0,0.4)", // subtle dark gradient behind text
})

const $overlayText: ThemedStyle<TextStyle> = () => ({
  color: "white",
  alignSelf: "center",
  fontSize: 20,
})

const $fill: ThemedStyle<ViewStyle> = () => ({})

const $cardScroll: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "column",
  paddingBottom: spacing.xxxl,
})
