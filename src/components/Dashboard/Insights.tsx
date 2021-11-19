import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AccountDocument } from "../../utils/types";

interface Props {
  active: AccountDocument | null;
}

const Insights: React.FC<Props> = ({ active }) => {
  const { image, username, name, isAuthorized } = active || {};

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.profile}>
        <Avatar src={image} name={name} {...styles.avatar} />
        <Flex {...styles.meta}>
          <Text {...styles.username}>{username}</Text>
          <Text {...styles.name}>{name}</Text>
        </Flex>
        {isAuthorized ? (
          <Text {...styles.action}>Switch</Text>
        ) : (
          <Text {...styles.action} cursor="auto">
            Authorizing
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export { Insights };

// Styles

const styles: any = {
  wrapper: {
    direction: "column",
    paddingY: "4vh",
    height: "fit-content",
    width: "100%",
    paddingX: { base: "1em", md: "0" },
  },
  profile: {
    direction: "row",
    justify: "space-between",
    align: "center",
    paddingY: "3vh",
    paddingLeft: "2vw",
    letterSpacing: "tight",
  },
  avatar: {
    height: "3em",
    width: "3em",
  },
  meta: {
    flex: "auto",
    direction: "column",
    paddingLeft: "1vw",
    justify: "center",
    maxWidth: "60%",
  },
  username: {
    fontWeight: "bold",
    fontSize: "11pt",
    isTruncated: true,
  },
  name: {
    fontWeight: "semibold",
    fontSize: "10pt",
    color: "gray.500",
    isTruncated: true,
  },
  action: {
    fontSize: "9pt",
    color: "blue.400",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
