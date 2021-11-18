import {
  AspectRatio,
  Avatar,
  Button,
  Circle,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

interface Props {}

const Accounts: React.FC<Props> = () => {
  const [isSelected, setIsSelected] = useState<string | null>(null);

  interface Account {
    id: string;
    image: string;
    username: string;
    meta: string | null;
  }
  const accounts: Account[] = [
    {
      id: "1234",
      image:
        "https://images.pexels.com/photos/5140629/pexels-photo-5140629.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "@flightsfromboston",
      meta: "3 to confirm",
    },
    {
      id: "5678",
      image:
        "https://images.pexels.com/photos/4449872/pexels-photo-4449872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "@flightsfromsandiego",
      meta: "1 to confirm",
    },
    {
      id: "91011",
      image:
        "https://images.pexels.com/photos/5740937/pexels-photo-5740937.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "@flightsfromsanantonio",
      meta: "7 to confirm, 2 recently posted",
    },
    {
      id: "121314",
      image:
        "https://images.pexels.com/photos/9314119/pexels-photo-9314119.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "@flightsfromnewyork",
      meta: "2 to post",
    },
    {
      id: "151617",
      image:
        "https://images.pexels.com/photos/2263683/pexels-photo-2263683.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "@flightsfromla",
      meta: "3 to confirm",
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      {accounts?.map(({ id, image, username, meta }) => (
        <Button key={id} onClick={() => setIsSelected(id)} {...styles.button}>
          <AspectRatio {...styles.aspect}>
            <Avatar src={image} name={username} {...styles.image} />
          </AspectRatio>
          <Flex {...styles.account}>
            <Flex {...styles.info}>
              <Text {...styles.username}>{username}</Text>
              <Text {...styles.meta}>
                <Circle {...styles.circle} />
                {meta}
              </Text>
            </Flex>
            {isSelected === id && (
              <Icon as={IoCheckmarkCircleSharp} {...styles.icon} />
            )}
          </Flex>
        </Button>
      ))}
    </Flex>
  );
};

export { Accounts };

// Styles

const styles: any = {
  wrapper: {
    direction: "column",
    paddingX: { base: "0", md: "22vw" },
    minHeight: "calc(100vh - 3em)",
    paddingY: "3vh",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: { base: "10vh", md: "13vh" },
    background: "transparent",
    paddingX: { base: "2em", md: "2vw" },
    _hover: {
      background: "gray.100",
    },
  },
  aspect: {
    ratio: 1,
    width: { base: "3.5em", md: "6em" },
    height: { base: "3.5em", md: "6em" },
  },
  image: {
    width: "100%",
    height: "100%",
    background: "gray.100",
    cursor: "pointer",
  },
  account: {
    flex: "1",
    direction: "row",
    justify: "space-between",
    align: "center",
    paddingLeft: { base: "1em", md: "2vw" },
    height: "100%",
  },
  info: {
    direction: "column",
    color: "gray.800",
  },
  username: {
    textAlign: "left",
    fontWeight: "bold",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    fontWeight: "normal",
    paddingTop: { base: "1", md: "1vh" },
  },
  circle: {
    size: "0.5em",
    background: "red.400",
    marginRight: "0.5em",
  },
  icon: {
    color: "green.400",
    fontSize: "18pt",
  },
};
