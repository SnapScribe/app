import { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Word } from "@/types";
import WordModal from "./WordModal";

interface IWordCard {
  word: Word;
}

const WordCard = ({ word }: IWordCard) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  }, [word]);

  return (
    <>
      <WordModal
        showModal={showModal}
        setShowModal={setShowModal}
        word={word}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View details for ${word.name}`}
        accessibilityHint="Opens word details"
        onPress={() => !loading && setShowModal(true)}
        className="rounded-[18px] bg-background-100 p-4 data-[active=true]:bg-primary-100"
      >
        <HStack className="items-center">
          <Box className="relative mr-4 h-[96px] w-[96px] overflow-hidden rounded-[16px] bg-background-200">
            <Image
              key={word.image}
              source={{ uri: word.image }}
              alt={word.name}
              contentFit="cover"
              className="h-full w-full"
              onLoadEnd={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
            {loading && (
              <Skeleton className="absolute left-0 top-0 h-full w-full" />
            )}
          </Box>

          <VStack className="flex-1" space="xs">
            <Text className="text-typography-900 font-dm-sans-medium">
              {word.name}
            </Text>
            <Text className="text-typography-700 font-dm-sans-regular">
              {word.description}
            </Text>
            <Text className="text-typography-400 font-dm-sans-regular">
              {word.createdAt}
            </Text>
          </VStack>
        </HStack>
      </Pressable>
    </>
  );
};

export default WordCard;
