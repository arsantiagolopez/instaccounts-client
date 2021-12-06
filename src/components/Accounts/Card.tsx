import {
  AspectRatio,
  Avatar,
  Button,
  Circle,
  Flex,
  Icon,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
// import testImage from "../../../../server/instaloader/asantilopez/2021-10-27_18-36-36_UTC_profile_pic.jpg";
import axios from "../../axios";
import { InstagramEntity } from "../../entities";
import { StyleProps } from "../../types";

interface Props {
  account: InstagramEntity;
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Card: React.FC<Props> = ({ account, activeId, setActiveId }) => {
  const [status, setStatus] = useState<string | null>(null);
  const {
    id,
    image,
    username,
    isAuthorized,
    // insights @TODO set up insights
  } = account;

  let insights: string | null = null;
  // @todo: decide on activity, e.g. "15 new likes, 5 new followers"
  let activity = insights ?? image ? "Account live" : "Loading profile...";

  // Update selected account's lastActive field to newest date
  const handleSelect = async (id: string): Promise<void> => {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/instagrams/active/${id}`
    );
    setActiveId(data?.id);
  };

  useEffect(() => {
    if (!isAuthorized) {
      setStatus("Authenticating...");
    }
  }, [account]);

  return (
    <Button onClick={() => handleSelect(id)} {...styles.button}>
      <AspectRatio {...styles.aspect}>
        {image ? (
          <Avatar src={image} {...styles.image} />
        ) : (
          <SkeletonCircle {...styles.image} />
        )}
      </AspectRatio>
      <Flex {...styles.account}>
        <Flex {...styles.info}>
          <Text {...styles.username}>{username}</Text>
          <Text {...styles.meta}>
            <Circle
              background={isAuthorized ? "green.400" : "red.400"}
              {...styles.circle}
            />
            {isAuthorized ? activity : status}
          </Text>
        </Flex>
        {activeId === id && (
          <Icon as={IoCheckmarkCircleSharp} {...styles.icon} />
        )}
      </Flex>
    </Button>
  );
};

export { Card };

// Styles

const styles: StyleProps = {
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    align: "center",
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
    align: "flex-start",
    color: "gray.800",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    fontWeight: "normal",
    paddingTop: { base: "1", md: "1vh" },
    color: "gray.500",
  },
  circle: {
    size: "0.5em",
    marginRight: "0.5em",
  },
  icon: {
    color: "green.400",
    fontSize: "18pt",
  },
};
