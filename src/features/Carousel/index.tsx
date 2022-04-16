import { useState, useEffect, useContext } from "react";
import { Flex } from "@chakra-ui/layout";
import { ProfileContext } from "../../context/ProfileContext";
import PreviousProfileButton from "../../flat/NavigationButtons/PreviousProfileButton";
import NextProfileButton from "../../flat/NavigationButtons/NextProfileButton";
import { CarouselProps } from "./interface";

function Carousel({ items }: CarouselProps) {
  const profileContext = useContext(ProfileContext);
  const [index, setIndex] = useState(0);
  profileContext.index = index;
  profileContext.setIndex = setIndex;

  return (
    <Flex w="100%" alignItems="center" flexFlow="column">
      {items[index]}
      <Flex w="100%" mt={10} justifyContent="space-evenly">
        <PreviousProfileButton />
        <NextProfileButton />
      </Flex>
    </Flex>
  );
}

export default Carousel;
