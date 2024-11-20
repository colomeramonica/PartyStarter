import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ChevronDownIcon, CircleIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useState } from "react";
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { Text } from "@/components/ui/text";
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";

interface Character {
  name: string;
  class: string;
  race: string;
  alignment: string;
  description: string;
  affiliation: string;
  status: {
    str: string;
    dex: string;
    con: string;
    int: string;
    wis: string;
    cha: string;
  };
};

const CharacterAvatar = ({ character }: { character: Character }) => (
  <Avatar size="xl" className="bg-[#4B4376]">
    <AvatarFallbackText className="text-white">{character.name}</AvatarFallbackText>
    <AvatarImage
      source={{
        uri: require('@/assets/images/jester.jpg'),
      }}
    />
  </Avatar>
);

const FormField = ({ label, value, onChange }: { label: string, value: string, onChange: (e: any) => void, type?: string }) => (
  <FormControl className="p-2">
    <FormControlLabel>
      <FormControlLabelText>{label}</FormControlLabelText>
    </FormControlLabel>
    <Input>
      <InputField type="text" value={value} onChange={onChange} />
    </Input>
  </FormControl>
);

const CharacterForm = ({ character, handleChange, t }: { character: Character, handleChange: (field: string, value: string) => void, t: (key: string) => string }) => (
  <VStack className="p-4 rounded-md w-full">
    <FormField label={t('character.name')} value={character.name} onChange={(e) => handleChange("name", e.nativeEvent.text)} />
    <FormControl className="p-2">
      <FormControlLabel>
        <FormControlLabelText>{t('character.summary')}</FormControlLabelText>
      </FormControlLabel>
      <Textarea>
        <TextareaInput type="text" value={character.description} onChange={(e) => handleChange("description", e.nativeEvent.text)} />
      </Textarea>
    </FormControl>
    <FormField label={t('character.class')} value={character.class} onChange={(e) => handleChange("class", e.nativeEvent.text)} />
    <FormField label={t('character.race')} value={character.race} onChange={(e) => handleChange("race", e.nativeEvent.text)} />
  </VStack>
);

const CharacterSheet = ({ character, handleChange, t }: { character: Character, handleChange: (field: string, value: string) => void, t: (key: string) => string }) => {
  const statusFields: (keyof Character['status'])[] = ["str", "dex", "con", "int", "wis", "cha"];
  return (
    <Box className="flex items-start justify-start p-3">
      <Heading size="md" className="font-poppins">{t('sections.sheet')}</Heading>
      <Box className="flex flex-col gap-2 items-start justify-around p-4 sm:flex-row w-full">
        {statusFields.map((field) => (
          <Box key={field} className="flex flex-col items-center">
            <Text className="font-poppins">{field.toUpperCase()}</Text>
            <Input>
              <InputField
                type="text"
                value={character.status[field]}
                onChange={(e) => handleChange(field, e.nativeEvent.text)}
                className="font-poppins max-w-[42px] w-fit"
              />
            </Input>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const BackstoryModal = ({ t, showModal, onClose, handleChange }: { t: (key: string) => string, showModal: boolean, onClose: () => void, handleChange: (field: string, value: string) => void }) => {
  return (
    <Modal isOpen={showModal} onClose={onClose} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="font-poppins text-typography-950">
            {t('modal.createBackstory')}
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} size="md" className="group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900 group-[:hover]/modal-close-button:stroke-background-700 stroke-background-400" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <VStack className="p-4 rounded-md w-full">
            <FormField label={t('modal.personalityTraits')} value="Bla bla" onChange={(e) => handleChange("personalityTraits", e.nativeEvent.text)} />
            <FormField label={t('modal.ideals')} value="Bla bla" onChange={(e) => handleChange("ideals", e.nativeEvent.text)} />
            <FormField label={t('modal.bonds')} value="Bla bla" onChange={(e) => handleChange("bonds", e.nativeEvent.text)} />
            <FormField label={t('modal.flaws')} value="Bla bla" onChange={(e) => handleChange("flaws", e.nativeEvent.text)} />
          </VStack>
          <Text>Test?</Text>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

const initialCharacter: Character = {
  name: "Jester Lavorre",
  class: "Cleric",
  race: "Tiefling",
  alignment: "Chaotic good",
  description: "Jester Lavorre is a blue tiefling with blue hair. She has a mischievous smile and a penchant for pranks. She is a cleric of the Traveler, a deity of chaos and trickery. Jester is a member of the Mighty Nein, a group of adventurers who travel the world in search of treasure and glory.",
  affiliation: "",
  status: {
    str: "14",
    dex: "14",
    con: "14",
    int: "14",
    wis: "14",
    cha: "14",
  },
};

export default function Profile() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [character, setCharacter] = useState<Character>(initialCharacter);

  const handleChange = useCallback((field: string, value: string) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [field]: value,
      status: field in prevCharacter.status ? { ...prevCharacter.status, [field]: value } : prevCharacter.status,
    }));
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center className="h-full justify-start p-3 w-full">
        <Box className="bg-white flex items-center mt-1 p-3 rounded-xl w-full">
          <CharacterAvatar character={character} />
          <Box className="flex justify-start w-full">
            <CharacterForm character={character} handleChange={handleChange} t={t} />
            <CharacterSheet character={character} handleChange={handleChange} t={t} />
            <Button size="md" variant="link" action="primary" onPress={() => setShowModal(true)}>
              <ButtonText>{t('button.backstory')}</ButtonText>
            </Button>
          </Box>
        </Box>
      </Center>
      <Center className="flex flex-row h-full justify-end p-3 rounded-xl w-full">
        <Button size="md" variant="solid" action="primary">
          <ButtonText>{t('button.save')}</ButtonText>
        </Button>
      </Center>
      <BackstoryModal
        t={t}
        showModal={showModal}
        onClose={() => setShowModal(false)}
        handleChange={handleChange}
      />
    </ScrollView>
  );
}
