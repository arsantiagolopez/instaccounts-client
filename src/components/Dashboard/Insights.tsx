import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Insights: React.FC<Props> = () => {
  const { image, username, name }: any = {
    id: "1",
    image: "https://avatars.githubusercontent.com/u/53582710?v=4",
    username: "flightsfromsanantonio",
    name: "Flights from San Antonio",
  };
  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.profile}>
        <Avatar src={image} {...styles.avatar} />
        <Flex {...styles.meta}>
          <Text {...styles.username}>{username}</Text>
          <Text {...styles.name}>{name}</Text>
        </Flex>
        <Text {...styles.action}>Switch</Text>
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
    paddingLeft: "0.5vw",
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
