import { useContext } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { ProfileContext } from "../../../context/ProfileContext";

function PreviousProfileButton() {
  const profileContext = useContext(ProfileContext);
  const { index, setIndex } = profileContext;

  function onClick() {
    setIndex(Math.max(index - 1, 0));
  }

  return (
    <Button onClick={onClick} leftIcon={<ChevronLeftIcon />}>
      Previous
    </Button>
  );
}

export default PreviousProfileButton;
