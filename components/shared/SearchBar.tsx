import React from 'react';
import { Box } from '@/components/ui/box';
import { CloseCircleIcon, Icon, SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { HStack } from '../ui/hstack';

interface ISearchBar {
  query: string;
  setQuery: (q: string) => void;
}

const SearchBar = ({ query, setQuery }: ISearchBar) => {
  const handleClick = () => setQuery('');

  return (
    <HStack className="px-4 h-14 items-center bg-background-100 rounded-[18px] gap-3 flex flex-row mb-2">
      <Box className="p-3">
        <Icon as={SearchIcon} size="sm" className="text-primary-700" />
      </Box>
      <Input
        variant="underlined"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="font-dm-sans-medium text-typography-900 flex-1 text-left focus:outline-none focus:ring-0">
        <InputField
          placeholder="Search..."
          value={query}
          type="text"
          onChangeText={(text) => setQuery(text)}
          keyboardType="default"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <InputSlot
            onPress={handleClick}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            focusable>
            <InputIcon as={CloseCircleIcon} />
          </InputSlot>
        )}
      </Input>
    </HStack>
  );
};
export default SearchBar;
