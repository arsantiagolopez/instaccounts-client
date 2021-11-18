import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const ProfileInfo: React.FC<Props> = () => {
  const { image, username, name, bio }: any = {
    image: "https://avatars.githubusercontent.com/u/53582710?v=4",
    username: "flightsfromsanantonio",
    name: "Alexander Santiago",
    bio: "📍Midtown, TX\n\nSoftware Developer\n\n@lifeingodmode",
  };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.profile}>
        <Avatar src={image} name={name} {...styles.avatar} />
        <Flex {...styles.info}>
          <Text {...styles.username}>{username}</Text>
          <Flex {...styles.meta} {...styles.desktopOnly}>
            <Text {...styles.name}>{name}</Text>
            <Text {...styles.bio}>{bio}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex {...styles.meta}>
        <Text {...styles.name}>{name}</Text>
        <Text {...styles.bio}>{bio}</Text>
      </Flex>
    </Flex>
  );
};

export { ProfileInfo };

// Styles

const styles: any = {
  wrapper: {
    direction: "column",
  },
  profile: {
    direction: "row",
  },
  avatar: {
    height: { base: "5em", md: "10em" },
    width: { base: "5em", md: "10em" },
    marginX: { base: "1em", md: "5vw" },
    marginY: { base: "1em", md: "5vh" },
  },
  info: {
    direction: "column",
    justify: "flex-start",
    align: "flex-start",
    height: { base: "auto", md: "30vh" },
    paddingY: { base: "1em", md: "5vh" },
    overflow: "hidden",
  },
  username: {
    fontWeight: "normal",
    fontSize: { base: "22pt", md: "26pt" },
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "block",
    textOverflow: "ellipsis",
    width: { base: "90%", md: "100%" },
  },
  meta: {
    display: { base: "flex", md: "none" },
    direction: "column",
    paddingTop: { base: "0", md: "3vh" },
    paddingBottom: "1vh",
    paddingX: { base: "1em", md: "0" },
    minHeight: "10vh",
  },
  name: {
    fontWeight: "semibold",
    fontSize: { base: "12pt", md: "14pt" },
    paddingBottom: "1vh",
  },
  bio: {
    fontSize: { base: "10pt", md: "12pt" },
  },
  desktopOnly: {
    display: { base: "none", md: "flex" },
  },
};
