import { Flex } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  return <Flex {...styles.wrapper}></Flex>;
};

export { Dashboard };

// Styles

const styles = {
  wrapper: {},
};
