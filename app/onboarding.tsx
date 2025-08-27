import { useCallback, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";

type Step = {
  image: string;
  text: string;
  description: string;
};
const STEPS: Step[] = [
    {
      image: 'https://picsum.photos/200/300',
      text: 'Explore',
      description: 'Take a pic of any object you want to recognise'
    },
    {
      image: 'https://picsum.photos/200/300',
      text: 'Discover',
      description: 'Get the name in your chosen language'
    },
    {
      image: 'https://picsum.photos/200/300',
      text: 'Learn',
      description: 'Play our flashcard game to know more'
    }
  ];

const Onboarding = () => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const total = STEPS.length;
  const isLast = stepIndex >= total - 1;

  const next = useCallback(() => {
    setStepIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex < total ? nextIndex : prev;
    });
  }, [total]);

  const skip = useCallback(() => router.navigate('/(tabs)/(images)'), [router]);

  const handlePrimary = useCallback(() => {
    if (isLast) {
      skip();
    } else {
      next();
    }
  }, [isLast, next, skip]);

  const current = STEPS[stepIndex];


  return (
    <View className="flex-1 items-center justify-between p-6 bg-black">
      <VStack space="xl" className="flex-1 justify-center items-center">
        <Center className="mb-8">
          <Box className="w-full h-full object-cover">
            <Image
              source={{ uri: current.image }}
              alt="Onboarding image"
              contentFit="fill"
              onLoadEnd={() => setLoading(false)}
            />
            {loading && <Skeleton />}
          </Box>

          <Text className="text-4xl font-bold text-white text-center mb-4">
            {current.text}
          </Text>
          <Text className="text-xl text-gray-300 text-center opacity-90 px-6">
            {current.description}
          </Text>
        </Center>
      </VStack>

      <HStack space="md" className="w-full px-4 mb-8">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 border-white"
          onPress={skip}
          accessibilityLabel="Skip onboarding"
        >
          <Text className="text-white font-medium">Skip</Text>
        </Button>

        <Button
          size="lg"
          className="flex-1 bg-white"
          onPress={handlePrimary}
          disabled={total === 0}
          accessibilityLabel={isLast ? "Finish onboarding" : "Continue onboarding"}
        >
          <Text className="text-black font-medium">
            {isLast ? "Get Started" : "Continue"}
          </Text>
        </Button>
      </HStack>
    </View>
  );
}

export default Onboarding;
