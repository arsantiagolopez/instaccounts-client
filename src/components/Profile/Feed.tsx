import { Flex } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { InstagramEntity } from "../../entities/InstagramEntity";
import { PostEntity } from "../../entities/PostEntity";
import { StyleProps } from "../../types";
import { Post } from "../Post";

interface Props {
  active: InstagramEntity | null;
}

const Feed: React.FC<Props> = ({ active }) => {
  const { username } = active || {};
  const { data: posts } = useSWR(
    username && `${process.env.NEXT_PUBLIC_API_URL}/posts/${username}`
  );

  return (
    <Flex {...styles.wrapper}>
      {posts?.map((post: PostEntity) => (
        <Post key={post.id} post={post} />
      ))}
    </Flex>
  );
};

export { Feed };

// Styles

const styles: StyleProps = {
  wrapper: {
    direction: "row",
    justify: "space-between",
    wrap: "wrap",
    maxWidth: "100%",
  },
};
