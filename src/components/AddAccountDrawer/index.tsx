import { Flex, Input, Text } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { KeyedMutator } from "swr";
import axios from "../../axios";
import { AccountDocument } from "../../utils/types";
import { SlideInBottomDrawer } from "../SlideInBottomDrawer";

interface Props {
  children: JSX.Element;
  accounts: AccountDocument[] | undefined;
  mutate: KeyedMutator<AccountDocument[]>;
}

interface FormData {
  username: string;
  password: string;
}

const AddAccountDrawer: React.FC<Props> = ({ children, accounts, mutate }) => {
  const [onSuccess, setOnSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  // Add account & mutate for better UI
  const onSubmit = async ({ username, password }: FormData): Promise<void> => {
    setIsLoading(true);
    const { status, data }: AxiosResponse = await axios.post<AccountDocument>(
      "/api/accounts/",
      { username, password }
    );
    if (status === 200) {
      setOnSuccess(true);
      mutate([...[accounts], data]);
    }
    setIsLoading(false);
  };

  // Form fields registration
  const usernameRegister: UseFormRegisterReturn = register("username", {
    required: "What's your username?",
    pattern: {
      value: /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      message: "Must be a valid username.",
    },
  });
  const passwordRegister: UseFormRegisterReturn = register("password", {
    required: "The password's required.",
  });

  // Reset onSuccess value for future submits
  useEffect(() => setOnSuccess(false), [accounts]);

  return (
    <SlideInBottomDrawer
      trigger={children}
      header="Add an account"
      submit={
        <Text onClick={handleSubmit(onSubmit)} {...styles.submit}>
          {isLoading ? "Adding Account..." : "Add Account"}
        </Text>
      }
      isLoading={isLoading}
      onSuccess={onSuccess}
    >
      <form>
        <Flex {...styles.field}>
          <Input
            placeholder="Your username"
            spellCheck="false"
            {...styles.input}
            {...usernameRegister}
          />
          {errors.username && (
            <Text {...styles.error}>{errors.username.message}</Text>
          )}
        </Flex>
        <Flex {...styles.field}>
          <Input
            placeholder="Your password"
            type="password"
            {...styles.input}
            {...passwordRegister}
          />
          {errors.password && (
            <Text {...styles.error}>{errors.password.message}</Text>
          )}
        </Flex>
      </form>
    </SlideInBottomDrawer>
  );
};

export { AddAccountDrawer };

// Styles

const styles: any = {
  trigger: {
    position: "absolute",
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
  submit: {
    paddingY: { base: "1em", md: "1.25em" },
    borderRadius: "0.25em",
  },
};
