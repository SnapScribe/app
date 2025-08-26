import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { router } from 'expo-router';

interface ICategoryCard {
  id: number;
  emoji: string;
  text: string;
}

const CategoryCard = ({ id, emoji, text }: ICategoryCard) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${text} category`}
      accessibilityHint={`Opens the ${text} category`}
      onPress={() =>
        router.push({
          pathname: '/(tabs)/(images)/archive',
          params: { category: id },
        })
      }
      className="p-3 rounded-2xl bg-background-100 flex-1 items-center gap-1 data-[active=true]:bg-primary-100">
      <Box className="h-7 w-7 bg-background-50 rounded-full items-center justify-center">
        <Text className="text-typography-400 font-dm-sans-regular">{emoji}</Text>
      </Box>
      <VStack className="flex-1 gap-1">
        <Text className="text-typography-900 font-dm-sans-regular text-[18px]">{text}</Text>
      </VStack>
    </Pressable>
  );
};

export default CategoryCard;
