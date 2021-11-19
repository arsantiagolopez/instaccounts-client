import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const WaitingAuthorizationScreen: React.FC<Props> = () => {
  return (
    <Flex {...styles.wrapper}>
      <Heading {...styles.emoji}>🙂</Heading>
      <Text {...styles.text}>
        Better. Your account's being authorized. <br />
        Come back in a bit...
      </Text>
    </Flex>
  );
};

export { WaitingAuthorizationScreen };

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
