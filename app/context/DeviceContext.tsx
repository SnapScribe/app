import { createContext, useContext, useEffect, useMemo } from "react"
import { getUniqueId } from "react-native-device-info"
import { useMMKVString } from "react-native-mmkv"

interface DeviceContextProps {
  deviceId: string | undefined
  firstRun: string | undefined
  setFirstRun: (s: string) => void
}

const DeviceContext = createContext<DeviceContextProps>({} as DeviceContextProps)

export const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceId, setDeviceId] = useMMKVString("DeviceProvider.deviceId")
  const [firstRun, setFirstRun] = useMMKVString("DeviceProvider.firstRun")

  useEffect(() => {
    const load = async () => {
      const id = await getUniqueId()
      setDeviceId(id)
    }
    load()
  }, [setDeviceId])

  const value = useMemo(() => {
    return {
      deviceId,
      firstRun,
      setFirstRun,
    }
  }, [deviceId, firstRun, setFirstRun])

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export const useDevice = () => useContext(DeviceContext)
