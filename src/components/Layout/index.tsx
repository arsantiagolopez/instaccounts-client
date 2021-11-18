import { Flex } from "@chakra-ui/react";
import React from "react";
import { Navigation } from "../Navigation";

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex {...styles.wrapper}>
      <Navigation />
      <Flex {...styles.content}>{children}</Flex>
    </Flex>
  );
};

export { Layout };

// Styles

const styles: any = {
  wrapper: {
    direction: "column",
  },
  content: {
    direction: "column",
    background: "rgba(250,250,250,0.5)",
  },
};
