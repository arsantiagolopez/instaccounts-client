import { Avatar, Circle, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { KeyedMutator } from "swr";
import axios from "../../axios";
import { AccountDocument } from "../../utils/types";
import { AddAccountDrawer } from "../AddAccountDrawer";

interface Props {
  accounts: AccountDocument[] | undefined;
  active: AccountDocument | null;
  mutate: KeyedMutator<AccountDocument[]>;
}

const Stories: React.FC<Props> = ({ accounts, active, mutate }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Update selected account's lastActive field to newest date
  const handleSelect = async (id: string): Promise<void> => {
    const { data } = await axios.put(`/api/accounts/active/${id}`);
    setActiveId(data?._id);

    const updatedAccounts = accounts?.map((account) => {
      const { _id, lastActive } = account;
      if (_id === data?._id) {
        return { ...account, lastActive };
      }
      return account;
    });
    // @ts-ignore
    mutate(updatedAccounts);
  };

  useEffect(() => setActiveId(active?._id), [active]);

  const addAccountDrawerProps = { accounts, mutate };

  return (
    <Flex {...styles.wrapper}>
      {accounts?.length ? (
        accounts?.map(({ _id, image, username }) => (
          <Flex key={_id} onClick={() => handleSelect(_id)} {...styles.account}>
            <Avatar
              src={image}
              name={username}
              boxShadow={
                activeId === _id
                  ? "0 0 0 2px black"
                  : "0 0 0 2px rgb(230,230,230)"
              }
              {...styles.avatar}
            />
            <Text {...styles.username}>{username}</Text>
          </Flex>
        ))
      ) : (
        <AddAccountDrawer {...addAccountDrawerProps}>
          <Flex {...styles.account}>
            <Circle {...styles.avatar}>
              <Icon as={IoAddSharp} {...styles.add} />
            </Circle>
            <Text {...styles.username} letterSpacing="tight">
              Add account
            </Text>
          </Flex>
        </AddAccountDrawer>
      )}
    </Flex>
  );
};

export { Stories };

// Styles

const styles: any = {
  wrapper: {
    direction: "row",
    align: "center",
    justify: "flex-start",
    paddingLeft: { base: "0.5em", md: "1vw" },
    paddingTop: { base: "2vh", md: "1vw" },
    paddingBottom: { base: "1vh", md: "0.75vw" },
    borderRadius: { base: "0", md: "0.25em" },
    boxShadow: "xs",
    marginY: { base: "0", md: "4vh" },
    height: "fit-content",
    minHeight: "13vh",
    background: "white",
    overflow: "scroll",
  },
  account: {
    direction: "column",
    maxWidth: "5em",
    minWidth: "5em",
    width: "5em",
  },
  avatar: {
    width: { base: "3em", md: "3.25em" },
    height: { base: "3em", md: "3.25em" },
    alignSelf: "center",
    cursor: "pointer",
    border: "2px solid white",
  },
  username: {
    textAlign: "center",
    fontSize: "9pt",
    isTruncated: true,
    paddingTop: "1",
    fontWeight: "normal",
  },
  add: {
    color: "gray.700",
    fontSize: "12pt",
  },
};
