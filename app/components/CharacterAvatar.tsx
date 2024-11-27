import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { useCharacterState } from "../utils/store";

const CharacterAvatar = () => {
  const character = useCharacterState((state) => state.character);

  return (
    <Avatar size="xl" className="bg-[#432E54]">
      <AvatarFallbackText className="text-white">{character.name}</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: require('@/assets/images/jester.jpg'),
        }}
      />
    </Avatar>
  );
};

export default CharacterAvatar;