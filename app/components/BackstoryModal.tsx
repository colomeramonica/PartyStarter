import { Icon, CloseIcon } from "@/components/ui/icon";
import FormField from "./FormField";
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useCharacterState } from "../utils/store";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const BackstoryModal = ({ showModal, onClose }: { showModal: boolean, onClose: () => void }) => {
  const { t } = useTranslation();
  const character = useCharacterState((state) => state.character);
  const setCharacter = useCharacterState((state) => state.setCharacter);

  const handleChange = useCallback((key: any, value: any) => {
    setCharacter({
      ...character,
      [key]: value,
    });
  }, [character, setCharacter]);

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
            <FormField label={t('modal.personalityTraits')} value={character ? character.background : ""} onChange={(e) => handleChange("background", e.nativeEvent.text)} />
            <FormField label={t('modal.ideals')} value={character ? character.ideals : ""} onChange={(e) => handleChange("ideals", e.nativeEvent.text)} />
            <FormField label={t('modal.bonds')} value={character ? character.bonds : ""} onChange={(e) => handleChange("bonds", e.nativeEvent.text)} />
            <FormField label={t('modal.flaws')} value={character ? character.flaws : ""} onChange={(e) => handleChange("flaws", e.nativeEvent.text)} />
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default BackstoryModal;