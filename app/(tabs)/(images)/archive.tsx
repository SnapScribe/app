import React, { useMemo, useState } from "react";
import { Animated } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import WordCard from "@/components/screens/images/WordCard";
import { useData } from "@/contexts/DataContext";
import PageWrapper from "@/components/shared/PageWrapper";
import { Header } from "@/components/shared/Header";
import { Box } from "@/components/ui/box";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import PageLoader from "@/components/shared/PageLoader";
import SearchBar from "@/components/shared/SearchBar";
import { Word } from "@/types";

const Archive = () => {
  const params = useLocalSearchParams();
  const { categories, filteredWords } = useData();
  const [query, setQuery] = useState<string>("");

  const selectedCategory = useMemo(() => {
    const category = categories.find((c) => c.id === Number(params.category));
    return category;
  }, [params.category, categories]);

  const selectedWords = useMemo(() => {
    if (!selectedCategory) return [];
    return filteredWords.filter((w) => w.categoryId == selectedCategory.id);
  }, [selectedCategory, filteredWords]);

  const searchedWords = useMemo(() => {
    if (!query.trim()) return selectedWords;
    return selectedWords.filter((word) =>
      word.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [selectedWords, query]);

  const renderEmptyState = () => (
    <VStack className="flex-1 items-center justify-center py-12 px-6">
      <Box className="w-20 h-20 rounded-full bg-background-100 items-center justify-center mb-4">
        <Icon as={SearchIcon} size="xl" className="text-typography-400" />
      </Box>
      <Heading className="text-lg text-center mb-2 text-typography-700">
        {query.trim() ? "No matching words" : "No words found"}
      </Heading>
      <Text className="text-center text-typography-500 leading-5">
        {query.trim()
          ? `No words match "${query}". Try a different search term.`
          : "There are no words in this category yet. Start adding some words to see them here."}
      </Text>
    </VStack>
  );

  if (!selectedCategory) return <PageLoader />;

  return (
    <PageWrapper>
      <Header
        title={selectedCategory ? selectedCategory.name : "Loading..."}
        leftButton={{
          text: "Go Back",
          onClick: () => router.back(),
          icon: ArrowLeftIcon,
        }}
      />
      {selectedWords.length === 0 ? (
        renderEmptyState()
      ) : (
        <VStack space="md" className="px-5 pb-5">
          <SearchBar query={query} setQuery={setQuery} />

          {searchedWords.map((word: Word, index: number) => {
            return (
              <Animated.View key={word.id || index}>
                <WordCard word={word} />
              </Animated.View>
            );
          })}
        </VStack>
      )}
    </PageWrapper>
  );
};

export default Archive;
