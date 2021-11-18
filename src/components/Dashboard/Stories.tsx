import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Stories: React.FC<Props> = () => {
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
      username: "flightsfromboston",
      meta: "3 to confirm",
    },
    {
      id: "5678",
      image:
        "https://images.pexels.com/photos/4449872/pexels-photo-4449872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "flightsfromsandiego",
      meta: "1 to confirm",
    },
    {
      id: "91011",
      image:
        "https://images.pexels.com/photos/5740937/pexels-photo-5740937.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "flightsfromsanantonio",
      meta: "7 to confirm, 2 recently posted",
    },
    {
      id: "121314",
      image:
        "https://images.pexels.com/photos/9314119/pexels-photo-9314119.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "flightsfromnewyork",
      meta: "2 to post",
    },
    {
      id: "151617",
      image:
        "https://images.pexels.com/photos/2263683/pexels-photo-2263683.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      username: "flightsfromla",
      meta: "3 to confirm",
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      {accounts?.map(({ id, image, username }) => (
        <Flex key={id} {...styles.account}>
          <Avatar src={image} name={username} {...styles.avatar} />
          <Text {...styles.username}>{username}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export { Stories };

// Styles

const styles: any = {
  wrapper: {
    flex: 6.5,
    direction: "row",
    align: "center",
    justify: "flex-start",
    paddingLeft: "0.5vw",
    paddingTop: "1vw",
    paddingBottom: "0.75vw",
    borderRadius: "0.25em",
    boxShadow: "xs",
    marginY: "4vh",
  },
  account: {
    direction: "column",
    paddingLeft: "2",
    maxWidth: "5em",
  },
  avatar: {
    width: "3.25em",
    height: "3.25em",
    alignSelf: "center",
    boxShadow: "0 0 0 2px black",
    border: "2px solid white",
    cursor: "pointer",
  },
  username: {
    fontSize: "9pt",
    isTruncated: true,
    paddingTop: "1",
  },
};
