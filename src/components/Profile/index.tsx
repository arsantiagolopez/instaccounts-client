import { Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { Actions } from "./Actions";
import { Feed } from "./Feed";
import { Info } from "./Info";

interface Props {}

const Profile: React.FC<Props> = () => {
  return (
    <Flex {...styles.wrapper}>
      <Info />
      <Actions />
      <Divider {...styles.divider} />
      <Feed />
    </Flex>
  );
};

export { Profile };

// Styles

const styles: any = {
  wrapper: {
    direction: "column",
    paddingX: { base: "0", md: "22vw" },
  },
  divider: {
    marginY: { base: "3vh", md: "5vh" },
  },
};
