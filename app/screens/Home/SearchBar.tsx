import { TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { TextField } from "@/components/TextField"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

export const SearchBar = ({
  query,
  setQuery,
}: {
  query: string
  setQuery: (t: string) => void
}) => {
  const { themed } = useAppTheme()

  return (
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
        RightAccessory={() => (
          <Button
            onPress={() => setQuery("")}
            accessibilityLabel="Clear search"
            style={[themed($iconOnlyBtn), { opacity: query.trim().length > 0 ? 1 : 0 }]}
            textStyle={themed($iconOnlyText)}
            disabled={query.trim().length === 0}
          >
            <Icon icon="x" />
          </Button>
        )}
      />
    </View>
  )
}

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

const $iconOnlyBtn: ThemedStyle<ViewStyle> = ({ colors }) => ({
  paddingHorizontal: 0,
  minWidth: 0,
  minHeight: 0,
  justifyContent: "center",
  alignItems: "center",
  borderColor: colors.transparent,
})

const $iconOnlyText: ThemedStyle<TextStyle> = () => ({
  fontSize: 12,
  lineHeight: 12,
})
