import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { SlideInBottomDrawer } from "../SlideInBottomDrawer";

interface Props {}

const RequestInvite: React.FC<Props> = () => {
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
    <SlideInBottomDrawer
      trigger={
        <Text {...styles.trigger}>
          Request an invite
          <ChevronDownIcon />
        </Text>
      }
      header="Request an invite ✉️"
      callbackFunction={handleSubmit(onSubmit)}
      submit={<Text>Send request</Text>}
    >
      <form>
        <Flex {...styles.field}>
          <Input placeholder="Your name" {...styles.input} {...nameRegister} />
          {errors.name && <Text {...styles.error}>{errors.name.message}</Text>}
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
            placeholder="Account you want to manage"
            {...styles.input}
            {...accountRegister}
          />
          {errors.account && (
            <Text {...styles.error}>{errors.account.message}</Text>
          )}
        </Flex>
      </form>
    </SlideInBottomDrawer>
  );
};

export { RequestInvite };

// Styles

const styles: any = {
  trigger: {
    fontSize: "10pt",
    marginTop: "2vh",
    fontWeight: "normal",
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
};
