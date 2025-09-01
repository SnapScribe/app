import { useState } from "react"
import { ImageStyle, ViewStyle, TextStyle, ActivityIndicator } from "react-native"
import { View } from "react-native"

import { Word } from "types"

import { AutoImage } from "@/components/AutoImage"
import { CustomModal } from "@/components/CustomModal"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

export const ViewModal = ({
  showModal,
  setShowModal,
  word,
}: {
  showModal: boolean
  setShowModal: (status: boolean) => void
  word: Word | undefined
}) => {
  const { themed } = useAppTheme()
  const [isImageLoading, setIsImageLoading] = useState(false)

  const handleImageLoadStart = () => {
    setIsImageLoading(true)
  }

  const handleImageLoadEnd = () => {
    setIsImageLoading(false)
  }

  if (!word) return null

  return (
    <CustomModal visible={showModal} onClose={() => setShowModal(false)} title="">
      <View style={themed($container)}>
        <View style={themed($imageContainer)}>
          <View style={themed($imageWrapper)}>
            <AutoImage
              style={themed($imageCard)}
              source={{ uri: word.image }}
              onLoadStart={handleImageLoadStart}
              onLoadEnd={handleImageLoadEnd}
              onError={handleImageLoadEnd}
            />

            {/* Loading indicator */}
            {isImageLoading && (
              <View style={themed($loaderContainer)}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
          </View>
        </View>

        <View style={themed($contentSection)}>
          <Text style={themed($titleText)} preset="heading">
            {word.name}
          </Text>
          {word.description && (
            <Text style={themed($descriptionText)} preset="default">
              {word.description}
            </Text>
          )}
        </View>
      </View>
    </CustomModal>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.sm,
})

const $imageContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginBottom: spacing.md,
})

const $imageWrapper: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
  width: "100%",
  maxWidth: 280,
  aspectRatio: 1,
})

const $imageCard: ThemedStyle<ImageStyle> = ({ colors }) => ({
  width: "100%",
  height: "100%",
  borderRadius: 16,
  overflow: "hidden",
  backgroundColor: colors.palette.neutral200,
  shadowColor: colors.palette.neutral800,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 4,
})

const $loaderContainer: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.3)",
  borderRadius: 16,
  zIndex: 1,
})

const $contentSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xs,
})

const $titleText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  textAlign: "center",
  marginBottom: spacing.xxs,
  color: colors.text,
  fontSize: 24,
})

const $descriptionText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  textAlign: "center",
  lineHeight: 22,
  color: colors.text,
  fontSize: 16,
  marginHorizontal: spacing.xs,
})
