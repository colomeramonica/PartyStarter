import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native";

const CharacterImage = () => (
  <Image
    className="h-[460px] rounded-md w-[320px]"
    source={require('@/assets/images/jester.jpg')}
  />
);

const CharacterInfo = () => (
  <Center className="absolute flex items-start justify-start m-5 p-3 top-[300px] w-[320px]">
    <Text className="color-white font-poppins font-semibold mt-4 text-2xl">Jester Lavorre</Text>
    <Text className="color-white font-poppins mt-1 text-xl">Cleric</Text>
    <Box className="flex flex-row gap-3 items-center mt-1">
      <Text className="bg-slate-400 color-white font-poppins p-1 rounded-full text-sm">Tiefling</Text>
      <Text className="bg-slate-400 color-white font-poppins p-1 rounded-full text-sm">Chaotic Neutral</Text>
    </Box>
    <Text className="color-white font-poppins mt-1 text-xs">Associeted with Mighty Nein</Text>
  </Center>
);

const ActionButtons = () => (
  <HStack space="md" reversed={false} className="m-2">
    <Button size="xl" className="bg-[radial-gradient(circle,rgba(215,11,26,1)_0%,rgba(227,120,132,1)_100%)] drop-shadow h-[50px] mt-2 rounded-full w-[45px]">
      <Ionicons name="heart-dislike" size={24} color="slate" />
    </Button>
    <Button size="xl" className="bg-[linear-gradient(0deg,rgba(34,171,195,1)_0%,rgba(45,253,181,1)_100%)] drop-shadow h-[50px] mt-2 rounded-full w-[45px]">
      <Ionicons name="heart" size={24} color="slate" />
    </Button>
  </HStack>
);

const CharacterDescription = () => (
  <Center className="p-3">
    <Text className="font-poppins">Jester Lavorre is a 5 feet, 3 inches tall blue tiefling with blue hair.
      She wears a pretty dress and has freckles. She wears a belt with a symbol to the Traveler on her waist.
      Her voice makes her sound younger than she is.
    </Text>
  </Center>
);

export default function Index() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center className="h-full items-center justify-center p-3 w-full">
        <Box className="bg-white flex items-center mt-1 p-3 rounded-xl w-full">
          <CharacterImage />
          <CharacterInfo />
          <Box>
            <ActionButtons />
          </Box>
          <Box>
            <CharacterDescription />
          </Box>
        </Box>
      </Center>
    </ScrollView>
  );
}
