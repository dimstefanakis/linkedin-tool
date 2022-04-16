import { useContext } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { ProfileContext } from "../../../context/ProfileContext";

function NextProfileButton() {
  const profileContext = useContext(ProfileContext);
  const { index, profiles, setIndex } = profileContext;

  function onClick() {
    setIndex(Math.min(profiles.length - 1, index + 1));
  }

  return (
    <Button onClick={onClick} leftIcon={<ChevronRightIcon />}>
      Next
    </Button>
  );
}

export default NextProfileButton;
