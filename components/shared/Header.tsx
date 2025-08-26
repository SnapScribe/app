import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "react-native";

interface HeaderButtonProps {
  text: string;
  onClick: () => void;
  icon?: any;
}

interface HeaderProps {
  title: string;
  leftButton?: HeaderButtonProps;
  rightButton?: HeaderButtonProps;
}

export const Header = ({ title, leftButton, rightButton }: HeaderProps) => {
  return (
    <HStack className="h-14 items-center px-4 mb-2 sticky top-0 z-10">
      {leftButton && (
        <Pressable
          onPress={leftButton.onClick}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={leftButton.text}
        >
          <HStack
            space="xs"
            className="h-11 min-w-[64px] items-center justify-start rounded-[12px] px-3 bg-background-100"
          >
            <Icon size="lg" as={leftButton.icon} />
            <Text className="text-typography-900 font-dm-sans-medium">
              {leftButton.text}
            </Text>
          </HStack>
        </Pressable>
      )}

      <Heading size="lg" className="flex-1 text-center font-dm-sans-medium">
        {title}
      </Heading>

      {/* Right placeholder keeps title centered */}
      {rightButton && (
        <Pressable
          onPress={rightButton.onClick}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={rightButton.text}
        >
          <HStack
            space="xs"
            className="h-11 min-w-[64px] items-end justify-end rounded-[12px] px-3 bg-background-100"
          >
            <Icon size="lg" as={rightButton.icon} />
            <Text className="text-typography-900 font-dm-sans-medium">
              {rightButton.text}
            </Text>
          </HStack>
        </Pressable>
      )}
    </HStack>
  );
};
