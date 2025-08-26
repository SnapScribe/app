import { Center } from "../ui/center";
import { Link } from "../ui/link";
import { Text } from "../ui/text";
import { View } from "../ui/view";
import { VStack } from "../ui/vstack";

interface IErrorPage {
  error: string;
  description: string;
}

const ErrorPage = ({ error, description }: IErrorPage) => {
  return (
    <View className="h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-pink-400">
      <VStack space="md">
        <Center>
          <Text className="text-4xl font-bold text-white">{error}</Text>
          <Text className="text-2xl text-white">{description}</Text>
          <Link href="/" style={{ marginTop: 10 }}>
            <Text className="text-xl text-white/80">Go home</Text>
          </Link>
        </Center>
      </VStack>
    </View>
  );
};

export default ErrorPage;
