import { useState } from "react"
import { ActivityIndicator, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Word } from "types"

import { AutoImage } from "@/components/AutoImage"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

export const WordCard = ({ word, style }: { word: Word; style: ViewStyle }) => {
  const { themed } = useAppTheme()
  const [imgLoading, setImgLoading] = useState<boolean>(true)

  return (
    <View style={style}>
      <AutoImage
        source={{ uri: word.image }}
        style={themed($cardImage)}
        onLoadEnd={() => setImgLoading(false)}
        onError={() => setImgLoading(false)}
      />

      {imgLoading && (
        <View style={themed($loaderContainer)}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <View style={themed($overlay)}>
        <Text style={themed($overlayText)} weight="bold">
          {word.name}
        </Text>
      </View>
    </View>
  )
}

const $cardImage: ThemedStyle<ImageStyle> = () => ({
  width: "100%",
  height: "100%",
  resizeMode: "cover",
})

const $loaderContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.tintInactive,
  zIndex: 1,
})

const $overlay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: spacing.sm,
  backgroundColor: "rgba(0,0,0,0.4)",
})

const $overlayText: ThemedStyle<TextStyle> = () => ({
  color: "white",
  alignSelf: "center",
  fontSize: 20,
})
