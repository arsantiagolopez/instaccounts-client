import { Flex } from "@chakra-ui/react";
import { getPosts } from "instaccounts-instafeed";
import React from "react";
import { AccountsWithPosts, StyleProps } from "../../types";

interface Props {
  accountsWithPosts: AccountsWithPosts;
}

const Apps: React.FC<Props> = ({ accountsWithPosts }) => {
  // const sortedPosts = posts.sort(
  //   (a: PostEntity, b: PostEntity) =>
  //     (b as any).timestamp - (a as any).timestamp
  // );

  const posts = getPosts(accountsWithPosts);

  return (
    <Flex {...styles.wrapper}>{posts.map((post: JSX.Element) => post)}</Flex>
  );
};

export { Apps };

// Styles

const styles: StyleProps = {
  wrapper: {
    direction: "column",
    paddingY: "0.75em",
  },
};
