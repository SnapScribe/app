import { FC } from "react"
import { TextStyle, ViewStyle, View } from "react-native"

import { ListItem } from "@/components/ListItem"
import { PageWrapper } from "@/components/PageWrapper"
import { Select } from "@/components/Select"
import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { useData } from "@/context/DataContext"
import { translate } from "@/i18n/translate"
import { TabScreenProps } from "@/navigators/TabNavigator"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

export const SettingsScreen: FC<TabScreenProps<"Settings">> = (_props) => {
  const {
    theme: { colors },
    themed,
    themeContext,
    setThemeContextOverride,
  } = useAppTheme()
  const { supportedLanguages, language, changeLanguage } = useData()

  const handleToggleTheme = () => {
    if (themeContext === "dark") setThemeContextOverride("light")
    else setThemeContextOverride("dark")
  }

  return (
    <PageWrapper tx="settingsScreen:title">
      {/* Appearance Section */}
      <View style={themed($sectionContainer)}>
        <Text style={themed($sectionHeader)} tx="settingsScreen:appearance" />
        <Switch
          containerStyle={themed($switchContainer)}
          labelStyle={themed($switchLabel)}
          value={themeContext === "dark"}
          onValueChange={() => handleToggleTheme()}
          labelTx="settingsScreen:themeSwitch"
          labelPosition="left"
          accessibilityLabel={translate("settingsScreen:themeSwitch")}
        />
      </View>

      {/* Language Section */}
      <View style={themed($sectionContainer)}>
        <Text style={themed($sectionHeader)} tx="settingsScreen:language" />
        <Select
          label=""
          placeholder={translate("settingsScreen:language")}
          options={supportedLanguages}
          value={language?.value}
          onSelect={(option) => changeLanguage(option.value as string)}
          helper=""
        />
      </View>

      {/* Account Section */}
      <View style={themed($sectionContainer)}>
        <Text style={themed($sectionHeader)} tx="settingsScreen:account" />
        <ListItem topSeparator>
          <Text tx="settingsScreen:subscription" />
        </ListItem>
      </View>

      {/* About Section */}
      <View style={themed($sectionContainer)}>
        <Text style={themed($sectionHeader)} tx="settingsScreen:about" />
        <ListItem
          topSeparator
          rightIcon="lock"
          rightIconColor={colors.tintInactive}
          onPress={() => openLinkInBrowser("https://github.com")}
        >
          <Text tx="settingsScreen:legal" />
        </ListItem>
        <ListItem
          bottomSeparator
          rightIcon="github"
          rightIconColor={colors.tintInactive}
          onPress={() => openLinkInBrowser("https://github.com")}
        >
          <Text tx="settingsScreen:code" />
        </ListItem>
      </View>
    </PageWrapper>
  )
}

const $sectionContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $sectionHeader: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: 14,
  fontWeight: "600",
  color: colors.textDim,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: spacing.xs,
  marginHorizontal: spacing.md,
})

const $switchContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: 12,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
})

const $switchLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 16,
  color: colors.text,
})
