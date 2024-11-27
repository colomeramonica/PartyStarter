import { AlertCircleIcon, DicesIcon } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCharacterState } from "../utils/store";

const CharacterSheet = () => {
  const { t } = useTranslation();
  const character = useCharacterState((state) => state.character);
  const setCharacter = useCharacterState((state) => state.setCharacter);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = useCallback((key: any, value: any) => {
    setCharacter({
      ...character,
      [key]: value,
    });
  }, [character, setCharacter]);

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

    setCharacter({
      ...character,
      ...newStatus,
    });
  };

  const statusFields = ["str", "dex", "con", "int", "wis", "cha"];

  return (
    <Box className="flex items-start justify-start ml-4 p-3">
      <Heading size="md" className="font-poppins">{t('sections.sheet')}</Heading>
      <Box className="flex flex-col gap-2 items-center justify-around p-4 sm:flex-row w-full">
        {statusFields.map((field) => (
          <Box key={field} className="flex flex-col items-center">
            <FormControl
              isInvalid={isInvalid}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-poppins">{field.toUpperCase()}</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  value={character[field]}
                  onChange={(e) => handleChange(field, e.nativeEvent.text)}
                  className="font-poppins max-w-[42px] w-fit"
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Must a number between 8 and 18
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </Box>
        ))}
        <Button className="p-3 rounded-full" onPress={rollDice}>
          <DicesIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default CharacterSheet;