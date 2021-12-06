import { Flex } from "@chakra-ui/react";
import React from "react";
import { InstagramEntity } from "../../../entities";
import { StyleProps } from "../../../types";
import { WaitingAuthorizationScreen } from "../../Screens";
import { NoAccountsScreen } from "../../Screens/NoAccountsScreen";

interface Props {
  accounts: InstagramEntity[] | undefined;
  active: InstagramEntity | null;
}

const Feed: React.FC<Props> = ({ accounts, active }) => {
  const { isAuthorized } = active || {};

  return (
    <Flex {...styles.wrapper}>
      {!accounts?.length ? (
        <NoAccountsScreen />
      ) : !isAuthorized ? (
        <WaitingAuthorizationScreen />
      ) : (
        "Success"
      )}
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
