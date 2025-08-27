import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Header } from '@/components/shared/Header';
import PageWrapper from '@/components/shared/PageWrapper';
import { useData } from '@/contexts/DataContext';
import { FlashCard } from '@/types';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import GameCard from '@/components/screens/games/GameCard';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Grid, GridItem } from '@/components/ui/grid';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;
const OFFSCREEN = SCREEN_WIDTH * 1.2;

const Flashcards = () => {
  const [seen, setSeen] = useState<string[]>([]);
  const [showGuidance, setShowGuidance] = useState(true);
  const { filteredWords } = useData();
  const x = useSharedValue(0);
  const toast = useToast();

  const showAlert = useCallback(
    (severity: 'success' | 'error' | 'info', title: string) => {
      toast.show({
        placement: 'bottom right',
        duration: 500,
        render: () => (
          <Toast action={severity} variant="solid">
            <ToastTitle>{title}</ToastTitle>
          </Toast>
        ),
      });
    },
    [toast],
  );

  useEffect(() => {
    const allWordsSeen = filteredWords.length > 0 && filteredWords.length - 1 === seen.length;
    if (allWordsSeen) {
      setSeen([]);
    }
  }, [filteredWords, seen]);

  useEffect(() => {
    if (filteredWords.length === 0 || seen.length >= filteredWords.length) {
      setShowGuidance(false);
    }
  }, [filteredWords.length, seen.length]);

  const flashcardWords = useMemo(() => {
    return filteredWords.filter((w) => !seen.includes(w.name));
  }, [filteredWords, seen]);

  const currentCard: FlashCard | undefined = useMemo(() => {
    if (!flashcardWords || flashcardWords.length < 2) return;
    const idx = Math.floor(Math.random() * flashcardWords.length);
    const w = flashcardWords[idx];

    const filtered = flashcardWords.filter((word) => word !== w);
    const randomElement = filtered[Math.floor(Math.random() * filtered.length)];

    let guess1;
    let guess2;
    if (Math.random() < 0.5) {
      // guess 1 is the correct one
      guess1 = w.name;
      guess2 = randomElement.name;
    } else {
      // guess 2 is the corretc one
      guess1 = randomElement.name;
      guess2 = w.name;
    }

    return {
      word: w.name,
      image: w.image,
      guess1,
      guess2,
    };
  }, [flashcardWords]);

  const markSeen = useCallback(
    (word: string) => {
      setSeen((prev) => (prev.includes(word) ? prev : [...prev, word]));
    },
    [setSeen],
  );

  const gesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(setShowGuidance)(false);
    })
    .onUpdate((e) => {
      x.value = e.translationX;
    })
    .onEnd((e) => {
      const dir = e.translationX > 0 ? 1 : -1;
      const passed = Math.abs(e.translationX) > SWIPE_THRESHOLD;

      if (passed) {
        x.value = withTiming(dir * OFFSCREEN, { duration: 200 }, (finished) => {
          if (finished) {
            x.value = 0;
            if (currentCard) {
              runOnJS(markSeen)(currentCard.word);
              if (dir === -1) {
                // guess 1 is right
                if (currentCard.word === currentCard.guess2)
                  runOnJS(showAlert)('error', 'Wrong answer');
                else runOnJS(showAlert)('success', 'Correct answer!');
              } else {
                // guess 2 is right
                if (currentCard.word === currentCard.guess1)
                  runOnJS(showAlert)('error', 'Wrong answer');
                else runOnJS(showAlert)('success', 'Correct answer!');
              }
            }
          }
        });
      } else {
        x.value = withTiming(0, { duration: 180 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = `${interpolate(
      x.value,
      [-OFFSCREEN, 0, OFFSCREEN],
      [-12, 0, 12],
      Extrapolate.CLAMP,
    )}deg`;

    return {
      transform: [{ translateX: x.value }, { rotate }],
    };
  });

  return (
    <PageWrapper>
      <Header title="Flashcards" />
      <Center className="mt-4">
        {showGuidance && <Text className="text-center mb-2">Swipe left or right to answer</Text>}
        <Text className="text-center mb-4">
          {seen.length}/{filteredWords.length} cards
        </Text>
      </Center>
      <GestureDetector gesture={gesture}>
        <View className="flex-1 justify-center items-center">
          <Grid
            className="gap-2"
            _extra={{
              className: 'grid-cols-12',
            }}>
            <GridItem
              className="p-1 rounded-md"
              _extra={{
                className: 'col-span-12',
              }}>
              {currentCard && (
                <Animated.View style={cardStyle}>
                  <GameCard currentCard={currentCard} />
                </Animated.View>
              )}
            </GridItem>
          </Grid>
        </View>
      </GestureDetector>
    </PageWrapper>
  );
};

export default Flashcards;
