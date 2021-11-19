import { Flex } from "@chakra-ui/react";
import React from "react";
import { AccountDocument } from "../../../utils/types";
import { NoAccountsScreen } from "../../Screens/NoAccountsScreen";
import { WaitingAuthorizationScreen } from "../../Screens/WaitingAuthorizationScreen";

interface Props {
  accounts: AccountDocument[] | undefined;
  active: AccountDocument | null;
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

const styles: any = {
  wrapper: {
    width: "100%",
    minHeight: {
      base: "calc(100vh - 3em - 50vh)",
      md: "calc(100vh - 3em - 50vh)",
    },
  },
};
