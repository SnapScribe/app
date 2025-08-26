import { ReactNode } from "react";
import Animated from "react-native-reanimated";
import { VStack } from "../ui/vstack";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const AnimatedVStack = Animated.createAnimatedComponent(VStack);

  return (
    <AnimatedVStack space="md" className="bg-background-0 flex-1 p-2">
      <Animated.View>{children}</Animated.View>
    </AnimatedVStack>
  );
};

export default PageWrapper;
