import { useState, useCallback } from "react"
import {
  View,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  TextStyle,
  Modal,
  Pressable,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

import { Icon } from "./Icon"
import { Text } from "./Text"
import { TextField } from "./TextField"

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface SelectProps {
  /**
   * The options to display in the select dropdown
   */
  options: SelectOption[]

  /**
   * The currently selected value
   */
  value?: string | number

  /**
   * Callback when a value is selected
   */
  onSelect: (option: SelectOption) => void

  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string

  /**
   * Label for the select input
   */
  label?: string

  /**
   * Helper text below the select
   */
  helper?: string

  /**
   * Error text (turns the input red)
   */
  error?: string

  /**
   * Whether the select is disabled
   */
  disabled?: boolean

  /**
   * Custom container style
   */
  style?: ViewStyle

  /**
   * Custom input style
   */
  inputStyle?: ViewStyle

  /**
   * Size preset
   */
  size?: "small" | "medium" | "large"

  /**
   * Whether to show search functionality
   */
  searchable?: boolean
}

export const Select = ({
  options,
  value,
  onSelect,
  placeholder = "Select an option...",
  label,
  helper,
  error,
  disabled = false,
  style: $styleOverride,
  inputStyle: $inputStyleOverride,
  size = "medium",
  searchable = false,
}: SelectProps) => {
  const { themed } = useAppTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Find the selected option
  const selectedOption = options.find((option) => option.value === value)

  // Filter options based on search query
  const filteredOptions = searchQuery
    ? options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  const handleSelect = useCallback(
    (option: SelectOption) => {
      if (!option.disabled) {
        onSelect(option)
        setIsOpen(false)
        setSearchQuery("")
      }
    },
    [onSelect],
  )

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen(true)
    }
  }, [disabled])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setSearchQuery("")
  }, [])

  const renderOption = ({ item }: { item: SelectOption }) => (
    <TouchableOpacity
      style={[
        themed($option),
        item.disabled && themed($optionDisabled),
        item.value === value && themed($optionSelected),
      ]}
      onPress={() => handleSelect(item)}
      disabled={item.disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          themed($optionText),
          item.disabled && themed($optionTextDisabled),
          item.value === value && themed($optionTextSelected),
        ]}
      >
        {item.label}
      </Text>
      {item.value === value && <Icon icon="check" />}
    </TouchableOpacity>
  )

  return (
    <View style={[themed($container), $styleOverride]}>
      {/* Label */}
      {label && (
        <Text preset="formLabel" style={themed($label)}>
          {label}
        </Text>
      )}

      {/* Select Input */}
      <TouchableOpacity
        style={[
          themed($input),
          themed($inputSizes[size]),
          error && themed($inputError),
          disabled && themed($inputDisabled),
          $inputStyleOverride,
        ]}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text
          style={[
            themed($inputText),
            !selectedOption && themed($placeholderText),
            disabled && themed($inputTextDisabled),
          ]}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Helper/Error Text */}
      {(helper || error) && (
        <Text preset="formHelper" style={[themed($helperText), error && themed($errorText)]}>
          {error || helper}
        </Text>
      )}

      {/* Dropdown Modal */}
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={handleClose}>
        <Pressable style={themed($modalBackdrop)} onPress={handleClose}>
          <View style={themed($dropdownContainer)}>
            <Pressable onPress={() => {}} style={themed($dropdown)}>
              {/* Search Input */}
              {searchable && (
                <View style={themed($searchContainer)}>
                  <Icon icon="view" />
                  <TextField
                    style={themed($searchInput)}
                    placeholder="Search options..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                  />
                </View>
              )}

              {/* Options List */}
              <FlatList
                data={filteredOptions}
                renderItem={renderOption}
                keyExtractor={(item) => String(item.value)}
                style={themed($optionsList)}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              />
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

// Styled components
const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginBottom: spacing.sm,
  backgroundColor: colors.transparent,
})

const $label: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $input: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors.palette.neutral100,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.xs,
  paddingHorizontal: spacing.md,
})

const $inputSizes = {
  small: { minHeight: 40 } as ViewStyle,
  medium: { minHeight: 48 } as ViewStyle,
  large: { minHeight: 56 } as ViewStyle,
}

const $inputError: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.error,
})

const $inputDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral200,
  opacity: 0.6,
})

const $inputText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  fontSize: 16,
  color: colors.text,
})

const $placeholderText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $inputTextDisabled: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $helperText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
})

const $modalBackdrop: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.overlay20,
})

const $dropdownContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $dropdown: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  borderRadius: spacing.sm,
  maxHeight: 300,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 8,
  borderWidth: 1,
  borderColor: colors.border,
})

const $searchContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $searchInput: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  flex: 1,
  marginLeft: spacing.sm,
  fontSize: 16,
  color: colors.text,
})

const $optionsList: ThemedStyle<ViewStyle> = () => ({
  maxHeight: 200,
})

const $option: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
})

const $optionSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary100,
})

const $optionDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  opacity: 0.5,
  backgroundColor: colors.palette.neutral200,
})

const $optionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 16,
  color: colors.text,
  flex: 1,
})

const $optionTextSelected: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
  fontWeight: "600",
})

const $optionTextDisabled: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
