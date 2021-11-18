import { AspectRatio } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface Props {
  image: string;
}

const Post: React.FC<Props> = ({ image }) => {
  return (
    <AspectRatio {...styles.aspect}>
      <Image
        src={image}
        alt="Flavors"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority={true}
      />
    </AspectRatio>
  );
};

export { Post };

// Styles

const styles: any = {
  aspect: {
    ratio: 1,
    width: "100%",
    overflow: "hidden",
    flex: { base: "1 1 32.5%", md: "1 1 32.5%" },
    maxWidth: { base: "32.5%", md: "32.5%" },
    marginBottom: "1%",
    marginX: "0",
  },
};
