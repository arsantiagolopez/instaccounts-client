import { Flex } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Layout: React.FC<Props> = () => {
  return <Flex {...styles.wrapper}></Flex>;
};

export { Layout };

// Styles

const styles = {
  wrapper: {},
};