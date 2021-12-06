import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { StyleProps } from "../../types";

interface Props {}

const Actions: React.FC<Props> = () => {
  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.action}>
        <Avatar
          src="https://images.unsplash.com/photo-1616628188502-413f2fe46e5e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80"
          {...styles.avatar}
        />
        <Text {...styles.text}>Preview posts</Text>
      </Flex>
      <Flex {...styles.action}>
        <Avatar {...styles.avatar} />
        <Text {...styles.text}>Something else</Text>
      </Flex>
    </Flex>
  );
};

export { Actions };

// Styles

const styles: StyleProps = {
  wrapper: {
    direction: "row",
    minHeight: { base: "12vh", md: "15vh" },
    paddingX: { base: "1em", md: "3vw" },
  },
  action: {
    direction: "column",
    align: "center",
    maxWidth: { base: "25vw", md: "8vw" },
    width: "100%",
  },
  avatar: {
    width: { base: "3em", md: "4em" },
    height: { base: "3em", md: "4em" },
    boxShadow: "0 0 0 1px rgba(220,220,220,1)",
    border: "3px solid white",
    cursor: "pointer",
    _hover: {
      boxShadow: "0 0 0 1px black",
    },
  },
  text: {
    fontWeight: "semibold",
    fontSize: { base: "10pt", md: "12pt" },
    paddingTop: "2vh",
    textAlign: "center",
  },
};
