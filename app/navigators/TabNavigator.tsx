import { TextStyle, ViewStyle } from "react-native"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { EpisodeProvider } from "@/context/EpisodeContext"
import { translate } from "@/i18n/translate"
import { HomeScreen } from "@/screens/Home/HomeScreen"
import { LearnScreen } from "@/screens/LearnScreen"
import { SettingsScreen } from "@/screens/SettingsScreen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type TabParamList = {
  Home: undefined
  WordDetail: { queryIndex?: string; itemIndex?: string }
  Learn: undefined
  Settings: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <EpisodeProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: themed($tabBarLabel),
          tabBarItemStyle: themed($tabBarItem),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: translate("tabNavigator:homeTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="view" color={focused ? colors.tint : colors.tintInactive} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="Learn"
          component={LearnScreen}
          options={{
            tabBarLabel: translate("tabNavigator:learnTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="clap" color={focused ? colors.tint : colors.tintInactive} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarAccessibilityLabel: translate("tabNavigator:settingsTab"),
            tabBarLabel: translate("tabNavigator:settingsTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="settings" color={focused ? colors.tint : colors.tintInactive} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </EpisodeProvider>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  color: colors.text,
})
