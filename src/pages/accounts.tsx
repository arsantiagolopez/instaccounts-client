import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { Accounts } from "../components/Accounts";
import { Layout } from "../components/Layout";

interface Props {}

const AccountsPage: React.FC<Props> = () => {
  const { data } = useSession();
  const { user } = data || {};

  interface User {
    user: object | undefined;
  }

  const layoutProps: User = { user };

  return (
    <>
      <Head>
        <title>Instaccounts - Select Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Accounts />
      </Layout>
    </>
  );
};

export default AccountsPage;
