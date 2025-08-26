import React, { useEffect, useRef } from "react";
import { Slot } from "expo-router";
import { ScrollView } from "@/components/ui/scroll-view";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
  useSharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { useData } from "@/contexts/DataContext";
import PageLoader from "@/components/shared/PageLoader";

const ImagesLayout = () => {
  const { loading, error } = useData();

  const scrollViewRef = useRef<React.ElementRef<typeof ScrollView>>(null);
  const scrollY = useSharedValue(0);
  const animatedHeight = useSharedValue(340);
  const isHeaderShrunk = useSharedValue(false);

  useEffect(() => {
    if (scrollViewRef.current) {
      const targetY = isHeaderShrunk.value ? 200 : 0;

      scrollViewRef.current.scrollTo({
        y: targetY,
        animated: false,
      });

      scrollY.value = targetY;
      animatedHeight.value = isHeaderShrunk.value ? 140 : 340;
    }
  }, [scrollViewRef]);

  const handleScrollWithPosition = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    scrollY.value = y;

    isHeaderShrunk.value = y >= 200;

    animatedHeight.value = interpolate(
      y,
      [0, 200],
      [340, 140],
      Extrapolation.CLAMP,
    );
  };

  if (loading) return <PageLoader />;

  if (error) return <Text>{error.message}</Text>;

  return (
    <View className="flex-1">
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScrollWithPosition}
        scrollEventThrottle={16}
        className="bg-background-0"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Slot />
        {/* consider it like a {children} */}
      </ScrollView>
    </View>
  );
};

export default function HomeLayout() {
  return <ImagesLayout />;
}
