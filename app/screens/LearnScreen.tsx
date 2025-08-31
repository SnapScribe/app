import { FC, useEffect, useRef, useState } from "react"
import { View, TextStyle, TouchableOpacity } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TabScreenProps } from "@/navigators/TabNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

export const LearnScreen: FC<TabScreenProps<"Learn">> = (_props) => {
  const { themed } = useAppTheme()
  const [ready, setReady] = useState<boolean>(false)
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView>(null)

  useEffect(() => {
    const load = async () => await requestPermission()
    if (permission && !permission.granted) load()
  }, [permission, requestPermission])

  if (!permission || !permission.granted) {
    // Camera permissions are still loading.
    return <View />
  }

  async function takePictureAsync() {
    if (cameraRef.current && ready) {
      try {
        const photo = await cameraRef.current.takePictureAsync()
        console.log("Photo taken:", photo)
        // Handle the photo here (save, display, etc.)
      } catch (error) {
        console.error("Error taking picture:", error)
      }
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CameraView
        ref={cameraRef}
        ratio="4:3"
        onCameraReady={() => setReady(true)}
        autofocus="on"
        facing="back"
        style={{ flex: 1 }}
      />
      <View>
        <TouchableOpacity onPress={takePictureAsync} disabled={!ready}>
          <Text>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="learnScreen:title" style={themed($title)} />
    </Screen>
  )
}

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})
