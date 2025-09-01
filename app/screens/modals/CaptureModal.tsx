import { useEffect, useRef, useState } from "react"
import { ViewStyle } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"

import { Button } from "@/components/Button"
import { CustomModal } from "@/components/CustomModal"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

export const CaptureModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: (status: boolean) => void
}) => {
  const [ready, setReady] = useState<boolean>(false)
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView>(null)
  const { themed } = useAppTheme()

  useEffect(() => {
    const load = async () => await requestPermission()
    if (permission && !permission.granted) load()
  }, [permission, requestPermission])

  if (!permission || !permission.granted) {
    // Camera permissions are still loading
    return null
  }

  async function takePictureAsync() {
    if (cameraRef.current && ready) {
      try {
        const photo = await cameraRef.current.takePictureAsync()
        console.log("Photo taken:", photo)
        // @todo check credits
        // @todo send the pic to the server
      } catch (error) {
        console.error("Error taking picture:", error)
      }
    }
  }

  return (
    <>
      <CustomModal visible={showModal} onClose={() => setShowModal(false)} title="Recognise object">
        <CameraView
          ref={cameraRef}
          ratio="4:3"
          onCameraReady={() => setReady(true)}
          autofocus="on"
          facing="back"
          style={themed($cameraView)}
        />
        <Button preset="reversed" onPress={takePictureAsync} disabled={!ready}>
          Snap
        </Button>
      </CustomModal>
    </>
  )
}

const $cameraView: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
