import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Info: React.FC<Props> = () => {
  const { image, username, name, bio, posts, followers, following }: any = {
    image: "https://avatars.githubusercontent.com/u/53582710?v=4",
    username: "flightsfromsanantonio",
    name: "Alexander Santiago",
    bio: "📍Midtown, TX\n\nSoftware Developer\n\n@lifeingodmode",
    posts: "231",
    followers: "5781",
    following: "1780",
  };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.profile}>
        <Avatar src={image} name={name} {...styles.avatar} />
        <Flex {...styles.info}>
          <Text {...styles.username}>{username}</Text>
          <Flex {...styles.insights}>
            <Text {...styles.text} marginRight="1.5vw">
              <b>{posts}</b> posts
            </Text>
            <Text {...styles.text} marginRight="1.5vw">
              <b>{followers}</b> followers
            </Text>
            <Text {...styles.text} marginRight="1.5vw">
              <b>{following}</b> following
            </Text>
          </Flex>
          <Flex {...styles.meta} {...styles.desktopOnly}>
            <Text {...styles.name}>{name}</Text>
            <Text {...styles.text}>{bio}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex {...styles.meta}>
        <Text {...styles.name}>{name}</Text>
        <Text {...styles.text}>{bio}</Text>
      </Flex>
    </Flex>
  );
};

export { Info };

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
    minHeight: { base: "auto", md: "30vh" },
    paddingY: { base: "1em", md: "5vh" },
    overflow: "hidden",
  },
  username: {
    fontWeight: "normal",
    fontSize: { base: "22pt", md: "26pt" },
    letterSpacing: "tight",
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "block",
    textOverflow: "ellipsis",
    width: { base: "90%", md: "100%" },
  },
  insights: {
    direction: "row",
    paddingY: { base: "0", md: "2vh" },
  },
  meta: {
    display: { base: "flex", md: "none" },
    direction: "column",
    paddingBottom: "1vh",
    paddingX: { base: "1em", md: "0" },
    minHeight: "10vh",
  },
  name: {
    fontWeight: "semibold",
    fontSize: { base: "12pt", md: "14pt" },
    paddingBottom: "1vh",
  },
  text: {
    fontSize: { base: "10pt", md: "12pt" },
  },
  desktopOnly: {
    display: { base: "none", md: "flex" },
  },
};
