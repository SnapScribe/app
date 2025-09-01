import { useRef, useEffect } from "react"
import { ScrollView, TextStyle, ViewStyle } from "react-native"

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
  const { themed } = useAppTheme()
  const scrollViewRef = useRef<ScrollView>(null)

  // Auto-scroll to selected category
  useEffect(() => {
    if (scrollViewRef.current && categories.length > 0) {
      const selectedIndex = categories.findIndex((cat) => cat.id === selectedCategory)
      if (selectedIndex >= 0) {
        // Calculate approximate position (button width + gap)
        const buttonWidth = 100 // approximate button width
        const gap = 8 // spacing.xs
        const scrollPosition = Math.max(0, selectedIndex * (buttonWidth + gap) - 50)

        scrollViewRef.current.scrollTo({
          x: scrollPosition,
          animated: true,
        })
      }
    }
  }, [selectedCategory, categories])

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
      snapToInterval={108} // Approximate button width for better scrolling
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id

        return (
          <Button
            key={category.id} // Use id instead of index for better performance
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
