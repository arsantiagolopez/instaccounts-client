import { Flex } from "@chakra-ui/react";
import React from "react";
import { Insights } from "./Insights";
import { Stories } from "./Stories";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return (
    <Flex {...styles.wrapper}>
      <Stories />
      <Insights />
    </Flex>
  );
};

export { Dashboard };

// Styles

const styles: any = {
  wrapper: {
    direction: { base: "column", md: "row" },
    paddingX: { base: "1em", md: "22vw" },
  },
};
