import { Flex } from "@chakra-ui/react";
import React, { FC, forwardRef, useEffect, useRef, useState } from "react";
import { VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso";
import useSWR from "swr";
import { Instagram, Post as PostEntity, StyleProps } from "../../types";
import { Post } from "../Post";

interface PostWithIsPreview extends Partial<PostEntity> {
  isPreview?: boolean;
}

interface Props {
  active?: Instagram;
  previews: PostWithIsPreview[];
}

const Feed: FC<Props> = ({ active, previews }) => {
  const [posts, setPosts] = useState<PostWithIsPreview[]>([]);

  const { username } = active || {};

  const { data } = useSWR(
    username && `${process.env.NEXT_PUBLIC_API_URL}/posts/${username}`
  );

  // Merge previews & real posts
  useEffect(() => {
    previews.forEach((preview) => {
      const previewExists = posts.find(({ id }) => id === preview.id);
      if (!previewExists) {
        setPosts([preview, ...posts]);
      }
    });
  }, [previews]);

  // Reset posts on action reset
  useEffect(() => {
    if (!previews.length) {
      const nonPreviewPosts = posts.filter(({ isPreview }) => !isPreview);
      setPosts(nonPreviewPosts);
    }
  }, [previews]);

  // Update posts with fetch
  useEffect(() => {
    if (data) setPosts(data);
  }, [data]);

  const ref = useRef<VirtuosoGridHandle>(null);

  return (
    <VirtuosoGrid
      ref={ref}
      useWindowScroll
      style={{ width: "100%" }}
      totalCount={posts.length}
      overscan={9}
      components={{
        List: forwardRef(({ children }, ref) => (
          <Flex ref={ref} {...styles.list}>
            {children}
          </Flex>
        )),
        Item: forwardRef(({ children }, ref) => (
          <Flex ref={ref} {...styles.item}>
            {children}
          </Flex>
        )),
      }}
      itemContent={(index) => posts[index] && <Post post={posts[index]} />}
    />
  );
};

export { Feed };

// Styles

const styles: StyleProps = {
  list: {
    wrap: "wrap",
    justify: "space-between",
  },
  item: {
    width: "100%",
    flex: { base: "1 1 32.5%", md: "1 1 32.5%" },
    maxWidth: { base: "32.5%", md: "32.5%" },
    marginBottom: { base: "1.5%", md: "1%" },
  },
};
