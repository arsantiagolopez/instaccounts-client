import { AspectRatio, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { PostEntity } from "../../entities";
import { StyleProps } from "../../types";
import { Carousel } from "./Carousel";

interface Props {
  post: PostEntity;
  ratio?: number | { [key: string]: number };
}

interface CarouselProps {
  image: string;
  carouselImages?: string[];
}

const PostImage: React.FC<Props> = ({ post, ratio }) => {
  const { image, isCarousel, carouselImages } = post;

  const carouselProps: CarouselProps = { image, carouselImages };

  return (
    <AspectRatio ratio={ratio ?? 1} {...styles.aspect}>
      <>
        <Skeleton {...styles.skeleton} />
        {isCarousel ? (
          <Carousel {...carouselProps} />
        ) : (
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={true}
          />
        )}
      </>
    </AspectRatio>
  );
};

export { PostImage };

// Styles

const styles: StyleProps = {
  aspect: {
    width: "100%",
  },
  skeleton: {
    width: "100%",
    height: "100%",
  },
};
