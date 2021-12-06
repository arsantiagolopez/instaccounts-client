import { Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { StyleProps } from "../../types";
import { useAccounts } from "../../utils/useAccounts";
import { Actions } from "./Actions";
import { Feed } from "./Feed";
import { Info } from "./Info";

interface Props {
  instagramFiles: { [key: string]: string[] };
}

const Profile: React.FC<Props> = ({ instagramFiles }) => {
  const { active } = useAccounts();

  const infoProps = { active, instagramFiles };
  const feedProps = { active };
  return (
    <Flex {...styles.wrapper}>
      <Info {...infoProps} />
      <Actions />
      <Divider {...styles.divider} />
      <Feed {...feedProps} />
    </Flex>
  );
};

export { Profile };

// Styles

const styles: StyleProps = {
  wrapper: {
    direction: "column",
    paddingX: { base: "0", md: "22vw" },
    minHeight: "calc(100vh - 3em)",
  },
  divider: {
    marginY: { base: "3vh", md: "5vh" },
  },
};
