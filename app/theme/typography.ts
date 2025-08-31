import { Platform } from "react-native"
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_300Light,
} from "@expo-google-fonts/dm-sans"

export const customFontsToLoad = {
  "dm-sans-light": DMSans_300Light,
  "dm-sans-regular": DMSans_400Regular,
  "dm-sans-medium": DMSans_500Medium,
  "dm-sans-semibold": DMSans_600SemiBold,
  "dm-sans-bold": DMSans_700Bold,
}

const fonts = {
  dmSans: {
    // Cross-platform Google font
    light: "dm-sans-light",
    normal: "dm-sans-regular",
    medium: "dm-sans-medium",
    semiBold: "dm-sans-semibold",
    bold: "dm-sans-bold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.dmSans,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
