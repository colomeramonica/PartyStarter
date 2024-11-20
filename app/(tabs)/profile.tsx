import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useState } from "react";
import { ScrollView } from 'react-native';

interface Character {
  name: string;
  class: string;
  race: string;
  alignment: string;
  description: string;
  affiliation: string;
};

const CharacterAvatar = ({ character }: { character: Character }) => (
  <Avatar size="xl">
    <AvatarFallbackText>{character.name}</AvatarFallbackText>
    <AvatarImage
      source={{
        uri: require('../../assets/images/Jester.jpg'),
      }}
    />
  </Avatar>
);

const CharacterForm = ({ character, handleChange }: { character: Character, handleChange: (field: string, value: string) => void }) => (
  <VStack className="p-4 rounded-md w-full">
    <FormControl
      isInvalid={false}
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
      className="p-2"
    >
      <FormControlLabel>
        <FormControlLabelText>Character Name</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          type="text"
          value={character.name}
          onChange={(e) => handleChange("name", e.nativeEvent.text)}
        />
      </Input>
    </FormControl>
    <FormControl
      isInvalid={false}
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
      className="p-2"
    >
      <FormControlLabel>
        <FormControlLabelText>Character Description</FormControlLabelText>
      </FormControlLabel>
      <Textarea>
        <TextareaInput
          type="text"
          value={character.description}
          onChange={(e) => handleChange("description", e.nativeEvent.text)}
        />
      </Textarea>
    </FormControl>
    <FormControl
      isInvalid={false}
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
      className="p-2"
    >
      <FormControlLabel>
        <FormControlLabelText>Character Class</FormControlLabelText>
      </FormControlLabel>
      <Select onValueChange={(e) => handleChange("class", e)}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput className="font-poppins" placeholder="Select option" />
          <SelectIcon className="mr-5" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem className="font-poppins" label="UX Research" value="ux" />
          </SelectContent>
        </SelectPortal>
      </Select>
    </FormControl>
    <FormControl
      isInvalid={false}
      size="md"
      isDisabled={false}
      isReadOnly={false}
      isRequired={false}
      className="p-2"
    >
      <FormControlLabel>
        <FormControlLabelText>Character Race</FormControlLabelText>
      </FormControlLabel>
      <Select onValueChange={(e) => handleChange("race", e)}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput className="font-poppins" placeholder="Select option" />
          <SelectIcon className="mr-5" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem className="font-poppins" label="UX Research" value="ux" />
          </SelectContent>
        </SelectPortal>
      </Select>
    </FormControl>
  </VStack>
);

const PhotoGallery = ({ handleUpload }: { handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <Box className="flex items-center justify-center">
    <Heading className="font-poppins mt-3 text-xl">Photo Gallery</Heading>
    <HStack space="md" reversed={false} className="duration-300 hover:opacity-75 mt-2 transition-opacity">
      <label htmlFor="upload-photo">
        <Image
          size="md"
          source={{
            uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          }}
          alt="image"
          className="cursor-pointer rounded-md"
        />
      </label>
      <input
        id="upload-photo"
        type="file"
        onChange={handleUpload}
        style={{ display: 'none' }}
        name="photos"
      />
    </HStack>
  </Box>
);

export default function Profile() {
  const [character, setCharacter] = useState<Character>({
    name: "Jester Lavorre",
    class: "Cleric",
    race: "Tiefling",
    alignment: "Chaotic good",
    description: "Jester Lavorre is a blue tiefling with blue hair. She has a mischievous smile and a penchant for pranks. She is a cleric of the Traveler, a deity of chaos and trickery. Jester is a member of the Mighty Nein, a group of adventurers who travel the world in search of treasure and glory.",
    affiliation: "",
  });

  const handleChange = useCallback((field: string, value: string) => {
    setCharacter((prevCharacter: Character) => ({
      ...prevCharacter,
      [field]: value,
    }));
  }, []);

  const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0];
    // if (file) {
    //   const storageRef  = ref(storage, `images/${file.name}`);
    //   const uploadTask = uploadBytesResumable(storageRef, file);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot: any) => {
    //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log("Upload is " + progress + "% done");
    //     },
    //     (error: any) => {
    //       console.error("Upload error:", error);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
    //         console.log('File available at', downloadURL);
    //       setImage(downloadURL);
    //       });
    //     }
    //   );
    // }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center className="h-full justify-start p-3 w-full">
        <Box className="bg-white flex items-center mt-1 p-3 rounded-xl w-full">
          <CharacterAvatar character={character} />
          <Box className="flex justify-start w-full">
            <CharacterForm character={character} handleChange={handleChange} />
            <PhotoGallery handleUpload={handleUpload} />
          </Box>
        </Box>
      </Center>
      <Center className="flex flex-row h-full justify-end p-3 rounded-xl w-full">
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Save</ButtonText>
        </Button>
      </Center>
    </ScrollView>
  )
};