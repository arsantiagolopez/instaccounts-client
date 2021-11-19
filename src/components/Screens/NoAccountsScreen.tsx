import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { AddAccountDrawer } from "../AddAccountDrawer";

interface Props {}

const NoAccountsScreen: React.FC<Props> = () => {
  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.emoji}>😕</Heading>
      <Text {...styles.text}>
        No account's been added. Add one to start managing it.
      </Text>
      <AddAccountDrawer>
        <Text {...styles.add}>Add account</Text>
      </AddAccountDrawer>
    </Flex>
  );
};

export { NoAccountsScreen };

// Styles

const styles: any = {
  wrapper: {
    direction: "column",
    justify: "center",
    align: "center",
    width: "auto",
    marginX: { base: "2em", md: "auto" },
  },
  emoji: {
    fontSize: "32pt",
    paddingY: "2vh",
  },
  text: {
    fontSize: "10pt",
    color: "gray.600",
    textAlign: "center",
  },
  add: {
    display: "inline-block",
    fontWeight: "semibold",
    textDecoration: "underline",
    cursor: "pointer",
    paddingY: "1vh",
    color: "gray.600",
  },
};
