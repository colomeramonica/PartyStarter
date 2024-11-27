import { useCallback, useEffect, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icon";
import { fetchClasses, fetchRaces } from '@/utils/api';
import FormField from "./FormField";
import { VStack } from "@/components/ui/vstack";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useCharacterState } from "../utils/store";


const CharacterForm = () => {
  const { t } = useTranslation();
  const [classes, setClasses] = useState<{ name: string; description: string }[]>([]);
  const [races, setRaces] = useState<{ name: string; description: string }[]>([]);
  const character = useCharacterState((state) => state.character);
  const setCharacter = useCharacterState((state) => state.setCharacter);

  const handleChange = useCallback((key: any, value: any) => {
    setCharacter({
      ...character,
      [key]: value,
    });
  }, [character, setCharacter]);

  useEffect(() => {
    const fetchClassesData = async () => {
      const classesData = await fetchClasses();
      setClasses(classesData);
    };

    const fetchRacesData = async () => {
      const classesData = await fetchRaces();
      setRaces(classesData);
    };

    fetchClassesData();
    fetchRacesData();
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
            value={character ? character.description : ""}
            className="font-poppins"
            onChange={(e) => handleChange("description", e.nativeEvent.text)} />
        </Textarea>
      </FormControl>
      <FormControl className="p-2">
        <FormControlLabel>
          <FormControlLabelText className="font-poppins">{t('character.class')}</FormControlLabelText>
        </FormControlLabel>
        <Select onValueChange={(value) => handleChange("class", value)}>
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
      <FormControl className="p-2">
        <FormControlLabel>
          <FormControlLabelText className="font-poppins">{t('character.class')}</FormControlLabelText>
        </FormControlLabel>
        <Select onValueChange={(value) => handleChange("race", value)}>
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
              {races.map((item) => (
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
    </VStack>
  );
};

export default CharacterForm;