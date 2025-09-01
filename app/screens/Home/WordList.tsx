import { ScrollView, View, ViewStyle } from "react-native"

import { Word } from "types"

import { Card } from "@/components/Card"
import { EmptyState } from "@/components/EmptyState"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { ThemedStyle } from "@/theme/types"

import { WordCard } from "./WordCard"

export const WordList = ({
  words,
  setCaptureModalOpen,
  openModal,
}: {
  words: Word[]
  setCaptureModalOpen: (status: boolean) => void
  openModal: (w: Word) => void
}) => {
  const { themed } = useAppTheme()

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={themed($cardScroll)}
      keyboardShouldPersistTaps="handled"
    >
      {words.length > 0 ? (
        <View style={[$styles.row, themed($categories)]}>
          {words.map((word) => (
            <Card
              key={word.id}
              preset="default"
              onPress={() => openModal(word)}
              style={themed($imageCard)}
              ContentComponent={<WordCard word={word} style={themed($cardContent)} />}
            />
          ))}
        </View>
      ) : (
        <EmptyState
          headingTx="homeScreen:emptyCard.title"
          contentTx="homeScreen:emptyCard.subtitle"
          buttonTx="homeScreen:emptyCard.button"
          buttonOnPress={() => setCaptureModalOpen(true)}
        />
      )}
    </ScrollView>
  )
}

const $categories: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  gap: spacing.md,
})

const $imageCard: ThemedStyle<ViewStyle> = () => ({
  padding: 0,
  borderRadius: 12,
  overflow: "hidden",
})

const $cardScroll: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "column",
  paddingBottom: spacing.xxxl,
  flex: 1,
})

const $cardContent: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: 160,
  position: "relative",
})
