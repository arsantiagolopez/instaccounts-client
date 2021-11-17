import { Flex } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Signin: React.FC<Props> = () => {
  return <Flex {...styles.wrapper}></Flex>;
};

export { Signin };

// Styles

const styles: any = {
  wrapper: {},
};
