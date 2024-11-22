import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ChevronDownIcon, CircleIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useState, useEffect } from "react";
import { ScrollView, TouchableHighlight } from 'react-native';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { Text } from "@/components/ui/text";
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { AlertCircleIcon, DicesIcon } from "lucide-react-native";
import { fetchRaces, fetchClasses } from '@/utils/api';

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
  <Avatar size="xl" className="bg-[#432E54]">
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
      <FormControlLabelText className="font-poppins">{label}</FormControlLabelText>
    </FormControlLabel>
    <Input>
      <InputField type="text" className="font-poppins" value={value} onChange={onChange} />
    </Input>
  </FormControl>
);

const CharacterForm = ({ character, handleChange, t }: { character: Character, handleChange: (field: string, value: string) => void, t: (key: string) => string }) => {
  const [classes, setClasses] = useState<{ name: string; description: string }[]>([]);

  useEffect(() => {
    const fetchClassesData = async () => {
      const classesData = await fetchClasses();
      setClasses(classesData);
    };

    fetchClassesData();
  }, []);

  return (
    <VStack className="p-4 rounded-md w-full">
      <FormField label={t('character.name')} value={character.name} onChange={(e) => handleChange("name", e.nativeEvent.text)} />
      <FormControl className="p-2">
        <FormControlLabel>
          <FormControlLabelText className="font-poppins">{t('character.summary')}</FormControlLabelText>
        </FormControlLabel>
        <Textarea>
          <TextareaInput
            type="text"
            value={character.description}
            className="font-poppins"
            onChange={(e) => handleChange("description", e.nativeEvent.text)} />
        </Textarea>
      </FormControl>
      <FormControl className="p-2">
        <FormControlLabel>
          <FormControlLabelText className="font-poppins">{t('character.class')}</FormControlLabelText>
        </FormControlLabel>
        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select option" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {classes.map((item) => (
                <SelectItem
                  label={item.name}
                  value={item.name}
                  key={item.name}
                  className="font-poppins">
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </FormControl>
      <FormField
        label={t('character.race')}
        value={character.race}
        onChange={(e) => handleChange("race", e.nativeEvent.text)} />
    </VStack>
  );
};

const CharacterSheet = ({ character, handleChange, rollDice, t }: { character: Character, handleChange: (field: string, value: string) => void, rollDice: () => void, t: (key: string) => string }) => {
  const statusFields: (keyof Character['status'])[] = ["str", "dex", "con", "int", "wis", "cha"];
  return (
    <Box className="flex items-start justify-start ml-4 p-3">
      <Heading size="md" className="font-poppins">{t('sections.sheet')}</Heading>
      <Box className="flex flex-col gap-2 items-center justify-around p-4 sm:flex-row w-full">
        {statusFields.map((field) => (
          <Box key={field} className="flex flex-col items-center">
            <FormControl className="p-2">
              <FormControlLabel className="font-poppins">{field.toUpperCase()}</FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  value={character.status[field]}
                  onChange={(e) => handleChange(field, e.nativeEvent.text)}
                  className="font-poppins max-w-[42px] w-fit"
                />
              </Input>
            </FormControl>
            <FormControlHelper>
              <FormControlHelperText>
                Must be a number between 8 and 18.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Must be a number between 8 and 18.
              </FormControlErrorText>
            </FormControlError>
          </Box>
        ))}
        <Button className="p-3 rounded-full" onPress={rollDice}>
          <DicesIcon />
        </Button>
      </Box>
    </Box >
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
            <FormField label={t('modal.personalityTraits')} value="" onChange={(e) => handleChange("personalityTraits", e.nativeEvent.text)} />
            <FormField label={t('modal.ideals')} value="" onChange={(e) => handleChange("ideals", e.nativeEvent.text)} />
            <FormField label={t('modal.bonds')} value="" onChange={(e) => handleChange("bonds", e.nativeEvent.text)} />
            <FormField label={t('modal.flaws')} value="" onChange={(e) => handleChange("flaws", e.nativeEvent.text)} />
          </VStack>
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
    str: "",
    dex: "",
    con: "",
    int: "",
    wis: "",
    cha: "",
  },
};

export default function Profile() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [character, setCharacter] = useState<Character>(initialCharacter);

  const handleChange = useCallback((field: string, value: string) => {
    const numericValue = /^[0-9]{1,2}$/.test(value) ? value : '';
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [field]: value,
      status: field in prevCharacter.status ? { ...prevCharacter.status, [field]: numericValue } : prevCharacter.status,
    }));
  }, []);

  const rollDice = () => {
    const getRandomStat = () => Math.floor(Math.random() * 11) + 8;
    let stats = Array(6).fill(0);
    let sum = 0;

    let iterations = 0;
    const maxIterations = 1000;
    while (sum !== 27 && iterations < maxIterations) {
      iterations++;
      sum = 0;
      stats = stats.map(() => {
        const stat = getRandomStat();
        sum += stat;
        return stat;
      });
    }

    const newStatus = {
      str: stats[0].toString(),
      dex: stats[1].toString(),
      con: stats[2].toString(),
      int: stats[3].toString(),
      wis: stats[4].toString(),
      cha: stats[5].toString(),
    };

    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      status: newStatus,
    }));
  };

  const saveCharacter = async () => {
    try {
      await query('INSERT INTO characters (name, class, race, alignment, description, affiliation, status) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
        character.name,
        character.class,
        character.race,
        character.alignment,
        character.description,
        JSON.stringify(character.status),
      ]);
      alert('Character saved successfully!');
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Failed to save character.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center className="h-full justify-start p-3 w-full">
        <Box className="bg-white flex items-center mt-1 p-3 rounded-xl w-full">
          <CharacterAvatar character={character} />
          <Box className="flex justify-start w-full">
            <CharacterForm character={character} handleChange={handleChange} t={t} />
            <CharacterSheet character={character} handleChange={handleChange} rollDice={rollDice} t={t} />
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
        <Button className="bg-[#432E54] color-white" size="md" variant="solid" action="primary" onPress={saveCharacter}>
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
