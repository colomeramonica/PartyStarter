import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
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

const char = {
  name: "Jester Lavorre",
  class: "Cleric",
  race: "Tiefling",
  alignment: "Chaotic Neutral",
  description: "Jester Lavorre is a 5 feet, 3 inches tall blue tiefling with blue hair. She wears a pretty dress and has freckles. She wears a belt with a symbol to the Traveler on her waist. Her voice makes her sound younger than she is.",
  affiliation: "Mighty Nein",
}

const [character, setCharacter] = useState(char);

const handleChange = useCallback((field: string, value: string) => {
  setCharacter((prevCharacter) => ({
    ...prevCharacter,
    [field]: value,
  }));
}, []);

const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
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

const CharacterAvatar = () => (
  <Avatar size="xl">
    <AvatarFallbackText>{character.name}</AvatarFallbackText>
    <AvatarImage
      source={{
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      }}
    />
  </Avatar>
);

const CharacterForm = () => (
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

const PhotoGallery = () => (
  <Box className="flex items-center justify-center">
    <Heading className="font-poppins mt-3 text-xl">Photo Gallery</Heading>
    <HStack space="md" reversed={false} className="duration-300 hover:opacity-75 mt-2 transition-opacity">
      <input type="file" onChange={handleUpload} style={{ display: 'none' }} name="photos" />
      <Image
        size="md"
        source={{
          uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        }}
        alt="image"
        className="rounded-md"
      />
    </HStack>
  </Box>
);

export default function Profile() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center className="h-full justify-start p-3 w-full">
        <Box className="bg-white flex items-center mt-1 p-3 rounded-xl w-full">
          <Box className="flex justify-start">
            <CharacterAvatar />
          </Box>
          <CharacterForm />
          <PhotoGallery />
        </Box>
      </Center>
      <Center className="bg-white flex flex-row justify-end px-3 rounded-xl">
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Save</ButtonText>
        </Button>
      </Center>
    </ScrollView>
  )
};