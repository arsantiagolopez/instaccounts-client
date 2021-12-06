import { Flex } from "@chakra-ui/react";
import React from "react";
import { StyleProps } from "../../types";
import { useAccounts } from "../../utils/useAccounts";
import { Feed } from "./Feed";
import { Insights } from "./Insights";
import { Stories } from "./Stories";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const { accounts, active, mutate } = useAccounts();

  const storiesProps = { accounts, active, mutate };
  const feedProps = { accounts, active };
  const insightsProps = { active };

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

const styles: StyleProps = {
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
