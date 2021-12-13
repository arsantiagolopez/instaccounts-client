import { Flex } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
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

  return (
    <Flex {...styles.wrapper}>
      {posts?.map((post: Partial<PostEntity>) => (
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
