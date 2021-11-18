import { Box, Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiAt } from "react-icons/bi";
import { BsHouseDoor, BsHouseDoorFill } from "react-icons/bs";
import { IoAt } from "react-icons/io5";
import { Logo } from "../Logo";

interface Props {}

const Navigation: React.FC<Props> = () => {
  const { pathname } = useRouter();

  return (
    <Flex {...styles.wrapper}>
      <Box {...styles.logoWrapper}>
        <Logo />
      </Box>

      <Flex {...styles.icons}>
        <Link href="/">
          <IconButton
            aria-label="Home"
            icon={pathname === "/" ? <BsHouseDoorFill /> : <BsHouseDoor />}
            {...styles.icon}
          />
        </Link>
        <Link href="/accounts">
          <IconButton
            aria-label="Accounts"
            icon={pathname.includes("/accounts") ? <BiAt /> : <IoAt />}
            {...styles.icon}
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export { Navigation };

// Styles

const styles: any = {
  wrapper: {
    direction: "row",
    align: "center",
    justify: "space-between",
    width: "100%",
    height: "3em",
    borderBottom: "1px solid",
    borderBottomColor: "gray.200",
    paddingX: { base: "1em", md: "22vw" },
  },
  logoWrapper: {
    position: "relative",
    width: "7.5em",
    height: "50%",
  },
  icons: {
    direction: "row",
  },
  icon: {
    fontSize: "14pt",
    color: "gray.700",
    background: "transparent",
    marginLeft: "0.5em",
    _hover: {
      color: "black",
    },
  },
};
