import "@/global.css";
import { useEffect } from "react";
import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { QueryClientProvider } from "@tanstack/react-query";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { DataContextProvider } from "@/contexts/DataContext";
import { queryClient } from "@/data/queryClient";
import ExceptionErrorPage from "@/components/screens/errors/ExceptionErrorPage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BillingContextProvider } from "@/contexts/BillingContext";

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { colorMode } = useTheme();
  const [fontsLoaded, error] = useFonts({
    "dm-sans-regular": DMSans_400Regular,
    "dm-sans-medium": DMSans_500Medium,
    "dm-sans-bold": DMSans_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <GluestackUIProvider mode={colorMode}>
      <StatusBar translucent />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
};

export default function RootLayout() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DataContextProvider>
          <BillingContextProvider>
            <GestureHandlerRootView>
              <MainLayout />
            </GestureHandlerRootView>
          </BillingContextProvider>
        </DataContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <ExceptionErrorPage err={error} />;
}
