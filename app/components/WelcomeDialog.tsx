import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { useCharacterState } from "../utils/store";

const WelcomeDialog = () => {
  const character = useCharacterState((state) => state.character);

  const [showAlertDialog, setShowAlertDialog] = useState(character == null);
  const handleClose = () => setShowAlertDialog(false);

  return (
    <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="font-semibold text-typography-950" size="md">
            Welcome to Party Starter!
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mb-4 mt-3">
          <Text size="sm">
            We're really happy you showed up!
            Now it's time to create your first character!
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <ButtonIcon
            variant="outline"
            action="primary"
            onPress={handleClose}
            size="sm"
          >
            <ButtonText>Let's go!</ButtonText>
          </ButtonIcon>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WelcomeDialog;