import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {}

const RequestInvite: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  interface FormData {
    name: string;
    email: string;
    account: string;
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  interface OnSubmitProps {
    name: string;
    email: string;
    account: string;
  }

  // @todo: integrate request invite

  // Request to manage other user's account
  const onSubmit = ({ name, email, account }: OnSubmitProps): void => {
    console.log(name, email, account);
    return;
    // signIn("email", { email, redirect: false });
    // setIsEmailSent(true);
    // setEmail(email);
  };

  // Form fields registration
  const nameRegister = register("name", {
    required: "Your name's required.",
  });
  const emailRegister = register("email", {
    required: "What's your email?",
    pattern: {
      // Minimal email validation
      value: /\S+@\S+\.\S+/,
      message: "Please input a valid email address",
    },
  });
  const accountRegister = register("account", {
    required: "What's the handle or email of the account you want to manage.",
  });

  return (
    <>
      <Button onClick={onOpen} rightIcon={<ChevronUpIcon />} {...styles.button}>
        Request an invite
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} {...styles.drawer}>
        <DrawerOverlay />

        <DrawerContent {...styles.content}>
          <DrawerHeader>Request an invite</DrawerHeader>
          <form>
            <DrawerBody>
              <Flex {...styles.field}>
                <Input
                  placeholder="Your name"
                  {...styles.input}
                  {...nameRegister}
                />
                {errors.name && (
                  <Text {...styles.error}>{errors.name.message}</Text>
                )}
              </Flex>
              <Flex {...styles.field}>
                <Input
                  placeholder="Your email"
                  {...styles.input}
                  {...emailRegister}
                />
                {errors.email && (
                  <Text {...styles.error}>{errors.email.message}</Text>
                )}
              </Flex>
              <Flex {...styles.field}>
                <Input
                  placeholder="User whose account you want to manage"
                  {...styles.input}
                  {...accountRegister}
                />
                {errors.account && (
                  <Text {...styles.error}>{errors.account.message}</Text>
                )}
              </Flex>
            </DrawerBody>
          </form>

          <Button onClick={handleSubmit(onSubmit)} {...styles.request}>
            Send request
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { RequestInvite };

// Styles

const styles: any = {
  drawer: {
    placement: "bottom",
  },
  button: {
    variant: "unstyled",
    fontSize: "10pt",
    marginTop: "2vh",
    fontWeight: "normal",
  },
  content: {
    borderRadius: "0.25em",
    width: { base: "90vw", md: "30vw" },
    marginX: "auto",
    marginBottom: "10vh",
    minHeight: { base: "35vh", md: "30vh" },
  },
  input: {},
  field: {
    direction: "column",
    marginTop: "2vh",
  },
  error: {
    fontSize: "10pt",
    color: "red.500",
    paddingTop: "0.75vh",
    lineHeight: "1.25em",
  },
  request: {
    position: "absolute",
    bottom: "-7vh",
    marginTop: "2vh",
    background: "white",
    color: "gray.800",
    paddingY: "1.5em",
    _hover: {
      background: "gray.100",
    },
    _active: {
      background: "gray.100",
    },
  },
};
