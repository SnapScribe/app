import { FC } from "react"
import { TextStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TabScreenProps } from "@/navigators/TabNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

export const WordDetailScreen: FC<TabScreenProps<"WordDetail">> = (_props) => {
  const { themed } = useAppTheme()
  return (
    <Screen preset="fixed" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="learnScreen:title" style={themed($title)} />
      <Text tx="learnScreen:subtitle" style={themed($subtitle)} />
    </Screen>
  )
}

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $subtitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
