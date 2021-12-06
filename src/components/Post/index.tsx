import {
  AspectRatio,
  Flex,
  Icon,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { MouseEvent, useRef, useState } from "react";
import { FaComment } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";
import { PostEntity } from "../../entities";
import { StyleProps } from "../../types";
import { PostModal } from "./PostModal";

interface Props {
  post: PostEntity;
}

const Post: React.FC<Props> = ({ post }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const wrapperRef: React.MutableRefObject<undefined> = useRef();

  const { id, image, likes, comments } = post || {};

  // Set item to hovered
  const handleItemHover = (id: boolean): void => setHovered(id);

  // Prevent ref's children form clearing hovered state
  const clearHovered = (event: MouseEvent<HTMLButtonElement>): void => {
    const { relatedTarget: hoveredNode } = event;
    // @ts-ignore
    const hoveredNodeInsideRef = wrapperRef?.current?.contains(hoveredNode);
    if (!hoveredNodeInsideRef) setHovered(false);
  };

  const postModalProps = { post, isOpen, onClose };

  return (
    <Flex
      ref={wrapperRef}
      onMouseEnter={() => handleItemHover(true)}
      onMouseOut={clearHovered}
      onClick={onOpen}
      {...styles.wrapper}
    >
      <AspectRatio {...styles.aspect}>
        <>
          <Skeleton {...styles.skeleton} />
          <Image
            src={image}
            alt={id}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={true}
          />
        </>
      </AspectRatio>
      <Flex opacity={hovered ? "1" : "0"} {...styles.meta}>
        <Text {...styles.text}>
          <Icon as={IoHeartSharp} {...styles.icon} />
          {likes}
        </Text>

        <Text {...styles.text}>
          <Icon as={FaComment} {...styles.icon} />
          {comments}
        </Text>
      </Flex>

      <PostModal {...postModalProps} />
    </Flex>
  );
};

export { Post };

// Styles

const styles: StyleProps = {
  wrapper: {
    position: "relative",
    width: "100%",
    flex: { base: "1 1 32.5%", md: "1 1 32.5%" },
    maxWidth: { base: "32.5%", md: "32.5%" },
    marginBottom: "1%",
    marginX: "0",
    cursor: "pointer",
  },
  aspect: {
    ratio: 1,
    width: "100%",
    overflow: "hidden",
  },
  skeleton: {
    height: "100%",
    width: "100%",
    startColor: "gray.100",
    endColor: "gray.200",
  },
  meta: {
    position: "absolute",
    direction: "row",
    justify: "center",
    align: "center",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
  },
  text: {
    fontSize: { base: "10pt", md: "14pt" },
    fontWeight: "semibold",
    color: "white",
    marginRight: { base: "2", md: "5" },
  },
  icon: {
    marginRight: { base: "1", md: "2" },
    marginBottom: "-0.5",
  },
};