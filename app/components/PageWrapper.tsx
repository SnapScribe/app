import { ReactNode } from "react"
import { TextStyle } from "react-native"

import { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { ThemedStyle } from "@/theme/types"

import { Screen } from "./Screen"
import { Text } from "./Text"

export const PageWrapper = ({ tx, children }: { tx: TxKeyPath; children: ReactNode }) => {
  const { themed } = useAppTheme()

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx={tx} style={themed($title)} />
      {children}
    </Screen>
  )
}

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
})
