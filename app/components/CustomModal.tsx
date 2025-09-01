import { ReactNode } from "react"
import { View, Modal, TouchableOpacity, Pressable, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

import { Icon } from "./Icon"
import { Text } from "./Text"

export interface ICustomModalProps {
  visible: boolean
  onClose: () => void
  title: string
  children?: ReactNode
}

export const CustomModal = ({ visible, onClose, title, children }: ICustomModalProps) => {
  const { themed } = useAppTheme()

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable style={themed($backdrop)} onPress={onClose}>
        <View style={themed($centeredView)}>
          <Pressable onPress={() => {}} style={themed($modalView)}>
            <View style={themed($modalHeader)}>
              <Text style={themed($modalTitle)} preset="subheading">
                {title}
              </Text>
              <TouchableOpacity onPress={onClose} style={themed($closeButton)}>
                <Icon icon="x" size={18} />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={themed($modalContent)}>{children}</View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  )
}

const $backdrop: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $centeredView: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.md,
})

const $modalView: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary200,
  borderRadius: spacing.lg,
  width: "100%",
  maxWidth: 400,
  shadowColor: colors.palette.neutral800,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 8,
  // Add subtle border for better definition
  borderWidth: 1,
  borderColor: colors.border,
})

const $modalHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.xl,
  paddingVertical: spacing.xxs,
})

const $modalTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  fontSize: 18,
  flex: 1, // Allows title to take available space
})

const $closeButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 25,
  height: 25,
  borderRadius: 16,
  backgroundColor: colors.palette.neutral400,
  justifyContent: "center",
  alignItems: "center",
})

const $modalContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
})
