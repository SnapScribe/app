import { Linking } from "react-native"

/**
 * Helper for opening a give URL in an external browser.
 */
export async function openLinkInBrowser(url: string): Promise<boolean> {
  try {
    const canOpen = await Linking.canOpenURL(url)
    if (canOpen) {
      await Linking.openURL(url)
      return true
    }
    return false
  } catch (e) {
    console.error(e)
    return false
  }
}
