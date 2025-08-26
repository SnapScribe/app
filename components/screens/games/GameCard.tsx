import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { FlashCard } from "@/types";
import { View } from "react-native";
import Animated from "react-native-reanimated";

const GameCard = ({ currentCard }: { currentCard: FlashCard }) => {
  return (
    <Card className="p-5 rounded-2xl w-[360px] m-3 self-center">
      <Animated.View>
        <Image
          className="mb-6 h-[240px] w-full rounded-md aspect-[263/240]"
          alt={`Image of ${currentCard.word}`}
          source={
            typeof currentCard.image === "string"
              ? { uri: currentCard.image }
              : currentCard.image
          }
        />
      </Animated.View>

      {/* left answer badge */}
      <Animated.View className="absolute left-3 top-4">
        <View className="px-3 py-2 rounded-md">
          <Text className="font-semibold text-typography-800">
            ← {currentCard.guess1}
          </Text>
        </View>
      </Animated.View>

      {/* right answer badge */}
      <Animated.View className="absolute right-3 top-4">
        <View className="px-3 py-2 rounded-md">
          <Text className="font-semibold text-typography-800">
            {currentCard.guess2} →
          </Text>
        </View>
      </Animated.View>
    </Card>
  );
};

export default GameCard;
