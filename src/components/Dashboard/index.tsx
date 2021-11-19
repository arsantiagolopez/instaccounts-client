import { Flex } from "@chakra-ui/react";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { AccountDocument } from "../../utils/types";
import { Feed } from "./Feed";
import { Insights } from "./Insights";
import { Stories } from "./Stories";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const { data: accounts, mutate }: SWRResponse<AccountDocument[], Error> =
    useSWR("/api/accounts");

  const activeAccount = accounts?.find(({ isActive }) => isActive);

  const storiesProps = { accounts, mutate, activeAccount };
  const feedProps = { accounts, activeAccount };
  const insightsProps = { activeAccount };

  return (
    <Flex {...styles.wrapper}>
      <Flex {...styles.left}>
        <Stories {...storiesProps} />
        <Feed {...feedProps} />
      </Flex>
      {accounts?.length ? (
        <Flex {...styles.right}>
          <Insights {...insightsProps} />
        </Flex>
      ) : null}
    </Flex>
  );
};

export { Dashboard };

// Styles

const styles: any = {
  wrapper: {
    direction: { base: "column", md: "row" },
    paddingX: { base: "0", md: "22vw" },
    minHeight: "calc(100vh - 3em)",
  },
  left: {
    flex: 6.5,
    direction: "column",
  },
  right: {
    flex: { base: "auto", md: 3.5 },
    position: { base: "static", md: "sticky" },
    top: "3em",
    maxWidth: { base: "100%", md: "35%" },
    alignSelf: { base: "auto", md: "flex-start" },
  },
};
