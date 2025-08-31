import { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  Platform,
  Modal,
  ModalProps,
  StyleSheet,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"

import { Text, TextProps } from "./Text"

/**
 * Floating Action Button, styled in the spirit of Ignite components.
 * Supports icon only or extended with a label, absolute positioning presets,
 * and theming-aware color presets. Can render in a Modal portal so it never scrolls.
 *
 * Example usage:
 *
 * <Fab
 *   Icon={(p) => <Icon name="plus" size={24} style={p.style} />}
 *   onPress={onAdd}
 *   position="br"
 *   tx="common:add"
 *   extended
 *   usePortal
 * />
 */

export type FabPreset = "primary" | "surface" | "reversed"
export type FabSize = "small" | "medium" | "large"
export type FabPosition = "br" | "bl" | "tr" | "tl" | "center"

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
}

export interface FabProps extends PressableProps {
  /** i18n key for the label */
  tx?: TextProps["tx"]
  /** literal label text */
  text?: TextProps["text"]
  /** i18n options */
  txOptions?: TextProps["txOptions"]

  /** show text label next to the icon */
  extended?: boolean

  /** size token for diameter and padding */
  size?: FabSize

  /** visual preset */
  preset?: FabPreset

  /** absolute positioning preset */
  position?: FabPosition

  /** enable absolute positioning. defaults true */
  absolute?: boolean

  /** render in a transparent Modal overlay so it never scrolls */
  usePortal?: boolean

  /** extra positioning offsets in points */
  offset?: Partial<Record<"top" | "right" | "bottom" | "left", number>>

  /** optional icon component renderer */
  Icon?: ComponentType<ButtonAccessoryProps>

  /** style overrides */
  style?: StyleProp<ViewStyle>
  pressedStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  pressedTextStyle?: StyleProp<TextStyle>
  disabledTextStyle?: StyleProp<TextStyle>
  disabledStyle?: StyleProp<ViewStyle>

  /** disable state */
  disabled?: boolean

  /** optional Modal props when usePortal is true */
  modalProps?: ModalProps
}

export function Fab(props: FabProps) {
  const {
    tx,
    text,
    txOptions,
    extended = false,
    size = "medium",
    preset = "primary",
    position = "br",
    absolute = true,
    usePortal = false,
    offset,
    Icon,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    modalProps,
    ...rest
  } = props

  const { themed } = useAppTheme()
  const insets = useSafeAreaInsets()

  const sizePx = SIZE_MAP[size]

  function $viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      $styles.row,
      themed($baseFabViewStyle),
      themed($fabViewPresets[preset]),
      themed(() => ({
        minHeight: sizePx,
        minWidth: sizePx,
        borderRadius: sizePx / 2,
        paddingHorizontal: extended ? 12 : 0,
      })),
      extended && themed($extendedFabViewStyle),
      absolute && themed((t) => computePlacement(t, position, offset, insets)),
      $viewStyleOverride,
      !!pressed && themed([$pressedFabViewPresets[preset], $pressedViewStyleOverride]),
      !!disabled && [$disabledViewStyleOverride, { opacity: 0.6 }],
    ]
  }

  function $textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      themed($fabTextPresets[preset]),
      $textStyleOverride,
      !!pressed && themed([$pressedFabTextPresets[preset], $pressedTextStyleOverride]),
      !!disabled && $disabledTextStyleOverride,
    ]
  }

  if (usePortal) {
    return (
      <Modal transparent presentationStyle="overFullScreen" animationType="none" {...modalProps}>
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          <View
            pointerEvents="box-none"
            style={[themed((t) => computePlacement(t, position, offset, insets)), { zIndex: 1000 }]}
          >
            <Pressable
              style={({ pressed }) => [
                $styles.row,
                themed($baseFabViewStyle),
                themed($fabViewPresets[preset]),
                {
                  minHeight: sizePx,
                  minWidth: sizePx,
                  borderRadius: sizePx / 2,
                  paddingHorizontal: extended ? 12 : 0,
                },
                extended && themed($extendedFabViewStyle),
                $viewStyleOverride,
                !!pressed && themed([$pressedFabViewPresets[preset], $pressedViewStyleOverride]),
                !!disabled && [$disabledViewStyleOverride, { opacity: 0.6 }],
              ]}
              accessibilityRole="button"
              accessibilityState={{ disabled: !!disabled }}
              accessibilityLabel={typeof text === "string" ? text : undefined}
              disabled={disabled}
              {...rest}
            >
              {(state) => (
                <>
                  {!!Icon && <Icon style={$iconStyle} pressableState={state} disabled={disabled} />}
                  {extended && (
                    <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)} />
                  )}
                </>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityLabel={typeof text === "string" ? text : undefined}
      disabled={disabled}
      {...rest}
    >
      {(state) => (
        <>
          {!!Icon && <Icon style={$iconStyle} pressableState={state} disabled={disabled} />}

          {extended && <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)} />}
        </>
      )}
    </Pressable>
  )
}

// sizes
const SIZE_MAP: Record<FabSize, number> = {
  small: 40,
  medium: 56,
  large: 64,
}

// base container look
const $baseFabViewStyle: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  paddingVertical: 0,
  paddingHorizontal: 0,
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
    },
    android: { elevation: 6 },
    default: {},
  }),
})

const $extendedFabViewStyle: ThemedStyle<ViewStyle> = (t) => ({
  paddingVertical: Math.max(12 - Math.floor((SIZE_MAP.medium - 56) / 2), 10),
  paddingRight: t.spacing.sm,
})

const $iconStyle: ThemedStyle<ViewStyle> = (t) => ({
  marginHorizontal: t.spacing.xs,
  zIndex: 1,
})

// color presets
const $fabViewPresets: Record<FabPreset, ThemedStyleArray<ViewStyle>> = {
  primary: [
    ({ colors }) => ({ backgroundColor: colors.palette.primary500 }),
    ({ borders }) => ({ borderWidth: borders?.width ?? 0, borderColor: "transparent" }),
  ],
  surface: [
    ({ colors }) => ({
      backgroundColor: colors.palette.neutral100,
      borderColor: colors.palette.neutral300,
      borderWidth: 1,
    }),
  ],
  reversed: [({ colors }) => ({ backgroundColor: colors.palette.neutral800 })],
}

const $fabTextPresets: Record<FabPreset, ThemedStyleArray<TextStyle>> = {
  primary: [
    ({ typography, colors }) => ({
      fontSize: 16,
      lineHeight: 20,
      fontFamily: typography.primary.medium,
      color: colors.palette.neutral100,
    }),
  ],
  surface: [
    ({ typography, colors }) => ({
      fontSize: 16,
      lineHeight: 20,
      fontFamily: typography.primary.medium,
      color: colors.palette.neutral800,
    }),
  ],
  reversed: [
    ({ typography, colors }) => ({
      fontSize: 16,
      lineHeight: 20,
      fontFamily: typography.primary.medium,
      color: colors.palette.neutral100,
    }),
  ],
}

const $pressedFabViewPresets: Record<FabPreset, ThemedStyle<ViewStyle>> = {
  primary: ({ colors }) => ({ backgroundColor: colors.palette.primary600 }),
  surface: ({ colors }) => ({ backgroundColor: colors.palette.neutral200 }),
  reversed: ({ colors }) => ({ backgroundColor: colors.palette.neutral700 }),
}

const $pressedFabTextPresets: Record<FabPreset, ThemedStyle<TextStyle>> = {
  primary: () => ({ opacity: 0.9 }),
  surface: () => ({ opacity: 0.9 }),
  reversed: () => ({ opacity: 0.9 }),
}

// placement helpers
function computePlacement(
  t: any,
  position: FabPosition,
  offset?: Partial<Record<"top" | "right" | "bottom" | "left", number>>,
  insets?: { top: number; right?: number; bottom: number; left?: number },
): ViewStyle {
  const base: ViewStyle = { position: "absolute" }

  const d = {
    top: (offset?.top ?? t.spacing.xl) + (insets?.top ?? 0),
    right: (offset?.right ?? t.spacing.xl) + (insets?.right ?? 0),
    bottom: (offset?.bottom ?? t.spacing.xl) + (insets?.bottom ?? 0),
    left: (offset?.left ?? t.spacing.xl) + (insets?.left ?? 0),
  }

  switch (position) {
    case "br":
      return { ...base, right: d.right, bottom: d.bottom }
    case "bl":
      return { ...base, left: d.left, bottom: d.bottom }
    case "tr":
      return { ...base, right: d.right, top: d.top }
    case "tl":
      return { ...base, left: d.left, top: d.top }
    case "center":
      return { ...base, left: 0, right: 0, bottom: d.bottom, alignSelf: "center" }
    default:
      return { ...base, right: d.right, bottom: d.bottom }
  }
}

export default Fab
