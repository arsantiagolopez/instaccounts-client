import { Flex } from "@chakra-ui/react";
import React from "react";
import { Post } from "./Post";

interface Props {}

const Feed: React.FC<Props> = () => {
  interface PostProps {
    id: string;
    image: string;
  }

  const posts: PostProps[] = [
    {
      id: "1",
      image:
        "https://images.pexels.com/photos/3434562/pexels-photo-3434562.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "2",
      image:
        "https://images.pexels.com/photos/9402569/pexels-photo-9402569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/8681710/pexels-photo-8681710.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "4",
      image:
        "https://images.pexels.com/photos/9826033/pexels-photo-9826033.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "5",
      image:
        "https://images.pexels.com/photos/10196258/pexels-photo-10196258.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "6",
      image:
        "https://images.pexels.com/photos/8536879/pexels-photo-8536879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "7",
      image:
        "https://images.pexels.com/photos/5140629/pexels-photo-5140629.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "8",
      image:
        "https://images.pexels.com/photos/9728002/pexels-photo-9728002.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      id: "9",
      image:
        "https://images.pexels.com/photos/2670273/pexels-photo-2670273.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
  ];

  return (
    <Flex {...styles.wrapper}>
      {posts.map(({ id, image }: PostProps) => (
        <Post key={id} image={image} />
      ))}
    </Flex>
  );
};

export { Feed };

// Styles

const styles: any = {
  wrapper: {
    direction: "row",
    justify: "space-between",
    wrap: "wrap",
    maxWidth: "100%",
  },
};
