import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { useCallback, useState } from "react";
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import CharacterAvatar from "../components/CharacterAvatar";
import CharacterForm from "../components/CharacterForm";
import CharacterSheet from "../components/CharacterSheet";
import { useCharacterState } from "../utils/store";
import BackstoryModal from "../components/BackstoryModal";
import WelcomeDialog from "../components/WelcomeDialog";
import { createCharacter } from "@/utils/api";

export default function Profile() {
  const { t } = useTranslation();

  const character = useCharacterState((state) => state.character);
  const setCharacter = useCharacterState((state) => state.setCharacter);
  const [showModal, setShowModal] = useState(false);

  const handleSave = async () => {
    await createCharacter(character);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {!character && (
        <WelcomeDialog />
      )}
      <Center className="h-full justify-start p-3 w-full">
        <Box className="bg-white flex items-center mt-1 p-3 rounded-xl w-full">
          {character && <CharacterAvatar />}
          <Box className="flex justify-start w-full">
            <CharacterForm />
            <CharacterSheet />
          </Box>
          <Box className="flex items-start justify-start ml-4 p-4 w-full">
            <Button size="md" variant="solid" action="primary" onPress={() => setShowModal(true)}>
              <ButtonText className="underline">{t('button.backstory')}</ButtonText>
            </Button>
          </Box>
          <Box className="flex items-start justify-start ml-4 p-4 w-full">
          </Box>
        </Box>
      </Center>
      <Center className="flex flex-row h-full justify-end p-3 rounded-xl w-full">
        <Button
          className="bg-[#432E54] color-white"
          size="md"
          variant="solid"
          action="primary"
          onPress={() => { handleSave() }}>
          <ButtonText>{t('button.save')}</ButtonText>
        </Button>
      </Center>
      <BackstoryModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </ScrollView>
  );
}
