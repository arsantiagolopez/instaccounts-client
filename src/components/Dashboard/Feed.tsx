import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { AccountsWithPosts, Instagram, StyleProps } from "../../types";
import { Apps } from "../Apps";
import { NoAccountsScreen } from "../Screens";

interface Props {
  accounts?: Instagram[];
  active?: Instagram;
  accountsWithPosts: AccountsWithPosts;
}

const Feed: FC<Props> = ({ accounts, active, accountsWithPosts }) => {
  const appsProps = { accountsWithPosts };
  return (
    <Flex {...styles.wrapper}>
      {!accounts?.length ? <NoAccountsScreen /> : <Apps {...appsProps} />}
    </Flex>
  );
};

export { Feed };

// Styles

const styles: StyleProps = {
  wrapper: {
    justify: "center",
    width: "100%",
    minHeight: {
      base: "calc(100vh - 3em - 50vh)",
      md: "calc(100vh - 3em - 50vh)",
    },
  },
};
