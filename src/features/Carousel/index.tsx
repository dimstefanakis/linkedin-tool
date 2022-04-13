import { useState, useEffect, useContext } from "react";
import { Flex } from "@chakra-ui/layout";
import { ProfileContext } from "../../context/ProfileContext";
import { CarouselProps } from "./interface";

function Carousel({ items }: CarouselProps) {
  const profileContext = useContext(ProfileContext);
  const [index, setIndex] = useState(0);
  profileContext.index = index;
  profileContext.setIndex = setIndex;

  return (
    <Flex w="100%" justifyContent="center">
      {items[index]}
    </Flex>
  );
}

export default Carousel;
