import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { View } from "@/components/ui/view";
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Word } from "@/types";

const WordModal = ({
  showModal,
  setShowModal,
  word,
}: {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  word: Word;
}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      size="full"
    >
      <ModalBackdrop className="bg-black/80" />
      <ModalContent className="m-0 w-full h-full bg-transparent rounded-none">
        {/* Background Image */}
        <View className="absolute inset-0">
          <Image
            source={{ uri: word.image }}
            className="w-full h-full object-cover"
            alt={`Image of ${word.name}`}
          />
          {/* Gradient overlay for better text readability */}
          <View className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
        </View>

        {/* Close Button */}
        <ModalHeader className="absolute top-0 right-0 p-6 bg-transparent border-0 z-10">
          <ModalCloseButton className="p-3 bg-black/30 rounded-full backdrop-blur-sm">
            <Icon as={CloseIcon} className="text-white" size="lg" />
          </ModalCloseButton>
        </ModalHeader>

        {/* Content Overlay */}
        <ModalBody className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <VStack
            space="lg"
            className="items-center max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] text-center"
          >
            <Heading className="text-white font-bold drop-shadow-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {word.name}
            </Heading>

            <Text className="text-white drop-shadow-md text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-7 md:leading-8 px-2 sm:px-4">
              {word.description}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WordModal;
