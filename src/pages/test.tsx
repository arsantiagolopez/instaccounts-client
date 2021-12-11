import { Button, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { handleMutation } from "../utils/handleMutation";

interface Props {}

const TestPage: NextPage<Props> = () => {
  const handleClick = async () => {
    let username = "asantilopez";
    const { data, error } = await handleMutation("/instagrams/test", {
      username,
    });

    if (error) {
      console.log("*** error:", error);
    }

    if (data) {
      console.log("*** data:", data);
    }
  };

  return (
    <Flex direction="column">
      <Button onClick={handleClick}>Test</Button>
    </Flex>
  );
};

export default TestPage;
