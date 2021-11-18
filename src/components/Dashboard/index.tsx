import { Flex } from "@chakra-ui/react";
import React from "react";
import { Feed } from "./Feed";
import { Insights } from "./Insights";
import { Stories } from "./Stories";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.left}>
        <Stories />
        <Feed />
      </Flex>
      <Flex {...styles.right}>
        <Insights />
      </Flex>
    </Flex>
  );
};

export { Dashboard };

// Styles

const styles: any = {
  wrapper: {
    direction: { base: "column", md: "row" },
    paddingX: { base: "1em", md: "22vw" },
    minHeight: "calc(100vh - 3em)",
  },
  left: {
    flex: 6.5,
    direction: "column",
  },
  right: {
    flex: 3.5,
    position: "sticky",
    top: "3em",
    maxWidth: "35%",
    alignSelf: "flex-start",
  },
};
