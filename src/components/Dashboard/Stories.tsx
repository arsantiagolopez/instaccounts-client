import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { KeyedMutator } from "swr";
import { AccountDocument } from "../../utils/types";
import { AddAccountDrawer } from "../AddAccountDrawer";

interface Props {
  accounts: AccountDocument[] | undefined;
  mutate: KeyedMutator<AccountDocument[]>;
  activeAccount: AccountDocument | undefined;
}

const Stories: React.FC<Props> = ({ accounts, mutate, activeAccount }) => {
  const ADD_NEW_IMAGE_SRC: string =
    "https://images.unsplash.com/photo-1518928215707-9fd8fd21753e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAzfHxhZGQlMjBuZXd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";

  const addAccountDrawerProps = { accounts, mutate };

  return (
    <Flex {...styles.wrapper}>
      {accounts?.length ? (
        accounts?.map(({ _id, image, username }) => (
          <Flex key={_id} {...styles.account}>
            <Avatar src={image} name={username} {...styles.avatar} />
            <Text {...styles.username}>{username}</Text>
          </Flex>
        ))
      ) : (
        <AddAccountDrawer {...addAccountDrawerProps}>
          <Flex {...styles.account}>
            <Avatar src={ADD_NEW_IMAGE_SRC} {...styles.avatar} />
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
    boxShadow: "0 0 0 2px black",
    border: "2px solid white",
    cursor: "pointer",
  },
  username: {
    textAlign: "center",
    fontSize: "9pt",
    isTruncated: true,
    paddingTop: "1",
    fontWeight: "normal",
  },
};
