import {
  AspectRatio,
  Avatar,
  Button,
  Circle,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoAddSharp, IoCheckmarkCircleSharp } from "react-icons/io5";
import useSWR, { SWRResponse } from "swr";
import axios from "../../axios";
import { AccountDocument } from "../../utils/types";
import { AddAccountDrawer } from "../AddAccountDrawer";
import { NoAccountsScreen } from "../Screens";

interface Props {}

const Accounts: React.FC<Props> = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { data: accounts, mutate }: SWRResponse<AccountDocument[], Error> =
    useSWR("/api/accounts");

  // Update selected account's lastActive field to newest date
  const handleSelect = async (id: string): Promise<void> => {
    const { data } = await axios.put(`/api/accounts/active/${id}`);
    setActiveId(data?._id);
  };

  // Set initial activeId to the last active item
  useEffect(() => {
    if (accounts) {
      const sorted = [...accounts].sort(
        (a, b) =>
          new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      );
      setActiveId(sorted[0]._id);
    }
  }, [accounts]);

  const addAccountDrawerProps = { accounts, mutate };
  return (
    <Flex {...styles.wrapper}>
      {accounts?.length ? (
        <>
          {accounts.map(({ _id, image, username }) => (
            <Button
              key={_id}
              // onClick={() => setIsSelected(_id)}
              onClick={() => handleSelect(_id)}
              {...styles.button}
            >
              <AspectRatio {...styles.aspect}>
                <Avatar src={image} name={username} {...styles.image} />
              </AspectRatio>
              <Flex {...styles.account}>
                <Flex {...styles.info}>
                  <Text {...styles.username}>{username}</Text>
                  {/* <Text {...styles.meta}>
                  <Circle {...styles.circle} />
                  {meta}
                </Text> */}
                </Flex>
                {activeId === _id && (
                  <Icon as={IoCheckmarkCircleSharp} {...styles.icon} />
                )}
              </Flex>
            </Button>
          ))}
          <AddAccountDrawer {...addAccountDrawerProps}>
            <Flex {...styles.button}>
              <Circle {...styles.aspect}>
                <Icon as={IoAddSharp} {...styles.add} />
              </Circle>
              <Flex {...styles.account}>
                <Text {...styles.username}>Add account</Text>
              </Flex>
            </Flex>
          </AddAccountDrawer>
        </>
      ) : (
        <>
          <AddAccountDrawer {...addAccountDrawerProps}>
            <Flex {...styles.button}>
              <Icon as={IoAddSharp} {...styles.add} />
              <Flex {...styles.account}>
                <Text {...styles.username}>Add account</Text>
              </Flex>
            </Flex>
          </AddAccountDrawer>
          <Flex marginY="15vh">
            <NoAccountsScreen />
          </Flex>
        </>
      )}
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
  },
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
    color: "gray.800",
  },
  username: {
    textAlign: "left",
    fontWeight: "bold",
    color: "gray.700",
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
  add: {
    color: "gray.700",
    fontSize: "22pt",
  },
};
