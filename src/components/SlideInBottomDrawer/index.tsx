import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  /* Trigger component that opens drawer */
  trigger: JSX.Element;
  /* Header to diplay on top of drawer */
  header?: string;
  /* Success function to call on button submit */
  callbackFunction: () => void;
  /* Submit component to call success function */
  submit: JSX.Element;
  /* Content to be displayed inside DrawerContent */
  children: JSX.Element;
}

const SlideInBottomDrawer: React.FC<Props> = ({
  trigger,
  header,
  callbackFunction,
  submit,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} {...styles.button}>
        {trigger}
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} {...styles.drawer}>
        <DrawerOverlay />
        <DrawerContent {...styles.content}>
          <DrawerHeader {...styles.header}>{header}</DrawerHeader>
          <DrawerBody {...styles.body}>{children}</DrawerBody>
          <Button onClick={callbackFunction} {...styles.request}>
            {submit}
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { SlideInBottomDrawer };

// Styles

const styles: any = {
  button: {
    variant: "unstyled",
  },
  drawer: {
    placement: "bottom",
  },
  content: {
    borderRadius: "0.25em",
    width: { base: "90vw", md: "30vw" },
    marginX: "auto",
    marginBottom: { base: "11vh", md: "15vh" },
    minHeight: "fit-content",
    paddingBottom: { base: "3vh", md: "5vh" },
  },
  header: {
    paddingTop: { base: "2vh", md: "3vh" },
    paddingX: { base: "2em", md: "3vw" },
    alignSelf: "center",
  },
  body: {
    paddingX: { base: "2em", md: "3vw" },
  },
  request: {
    position: "absolute",
    bottom: { base: "-8vh", md: "-9vh" },
    marginTop: "2vh",
    background: "white",
    color: "gray.800",
    paddingY: { base: "1.75em", md: "2em" },
    _hover: {
      background: "gray.100",
    },
    _active: {
      background: "gray.100",
    },
  },
};
