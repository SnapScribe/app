import { useRef, useEffect, useState, useMemo } from "react"
import { LayoutChangeEvent, ScrollView, TextStyle, ViewStyle } from "react-native"

import { Category } from "types"

import { Button } from "@/components/Button"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

export const CategoriesFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: Category[]
  selectedCategory: number
  setSelectedCategory: (id: number) => void
}) => {
  const { themed, theme } = useAppTheme()
  const scrollViewRef = useRef<ScrollView>(null)
  const [buttonWidths, setButtonWidths] = useState<number[]>([])
  const gap = theme.spacing.xs

  const snapOffsets = useMemo(() => {
    if (buttonWidths.length !== categories.length) return []
    const offsets: number[] = []
    let currentOffset = 0
    for (let i = 0; i < buttonWidths.length; i++) {
      offsets.push(currentOffset)
      currentOffset += buttonWidths[i] + gap
    }
    return offsets
  }, [buttonWidths, categories.length, gap])

  // Auto-scroll to selected category
  useEffect(() => {
    if (scrollViewRef.current && snapOffsets.length === categories.length) {
      const selectedIndex = categories.findIndex((cat) => cat.id === selectedCategory)
      if (selectedIndex >= 0) {
        scrollViewRef.current.scrollTo({
          x: snapOffsets[selectedIndex],
          animated: true,
        })
      }
    }
  }, [selectedCategory, categories, snapOffsets])

  const handleLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setButtonWidths((prev) => {
      const next = [...prev]
      next[index] = width
      return next
    })
  }

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategory(categoryId)
  }

  if (categories.length === 0) {
    return null // Handle empty state
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={themed($buttonScroll)}
      decelerationRate="fast"
      snapToOffsets={snapOffsets}
    >
      {categories.map((category, index) => {
        const isSelected = selectedCategory === category.id

        return (
          <Button
            key={category.id} // Use id instead of index for better performance
            onLayout={handleLayout(index)}
            preset={isSelected ? "reversed" : "default"}
            onPress={() => handleCategoryPress(category.id)}
            style={[themed($chipButton), isSelected && themed($selectedChipButton)]}
            textStyle={[themed($chipText), isSelected && themed($selectedChipText)]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`Category: ${category.name}`}
          >
            {category.name}
          </Button>
        )
      })}
    </ScrollView>
  )
}

const $buttonScroll: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  marginBottom: spacing.xl,
})

const $chipButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.sm,
  borderRadius: spacing.xxxl,
  alignSelf: "flex-start",
  minHeight: 44, // Accessibility minimum touch target
  minWidth: 60,
  height: "auto",
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  backgroundColor: colors.palette.neutral100,
  // Subtle shadow for depth
  shadowColor: colors.palette.neutral800,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
})

const $selectedChipButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.palette.primary500,
  backgroundColor: colors.palette.primary500,
  // Enhanced shadow for selected state
  shadowColor: colors.palette.primary500,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 4,
  transform: [{ scale: 1.02 }], // Subtle scale for emphasis
})

const $chipText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  lineHeight: 18,
  fontWeight: "500",
  color: colors.text,
  textAlign: "center",
})

const $selectedChipText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontWeight: "600",
})
