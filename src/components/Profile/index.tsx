import { Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { Feed } from "../Feed";
import { ProfileActions } from "../ProfileActions";
import { ProfileInfo } from "../ProfileInfo";

interface Props {}

const Profile: React.FC<Props> = () => {
  return (
    <Flex {...styles.wrapper}>
      <ProfileInfo />
      <ProfileActions />
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
