import { FC } from "react"
import { TextStyle } from "react-native"

import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { translate } from "@/i18n/translate"
import { TabScreenProps } from "@/navigators/TabNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

export const SettingsScreen: FC<TabScreenProps<"Settings">> = (_props) => {
  const {
    theme: { colors },
    themed,
    themeContext,
    setThemeContextOverride,
  } = useAppTheme()

  const handleToggleTheme = () => {
    if (themeContext === "dark") setThemeContextOverride("light")
    else setThemeContextOverride("dark")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="settingsScreen:title" style={themed($title)} />

      <ListItem topSeparator>
        <Switch
          value={themeContext === "dark"}
          onValueChange={() => handleToggleTheme()}
          labelTx="settingsScreen:themeSwitch"
          labelPosition="left"
          accessibilityLabel={translate("settingsScreen:themeSwitch")}
        />
      </ListItem>

      <ListItem topSeparator>
        <Text tx="settingsScreen:subscription" />
      </ListItem>

      <ListItem
        topSeparator
        rightIcon="lock"
        rightIconColor={colors.tintInactive}
        onPress={() => openLinkInBrowser("https://github.com")}
      >
        <Text tx="settingsScreen:legal" />
      </ListItem>

      <ListItem
        topSeparator
        bottomSeparator
        rightIcon="github"
        rightIconColor={colors.tintInactive}
        onPress={() => openLinkInBrowser("https://github.com")}
      >
        <Text tx="settingsScreen:code" />
      </ListItem>
    </Screen>
  )
}

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxxl,
})
