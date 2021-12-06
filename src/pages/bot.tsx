import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { Bot } from "../components/Bot";
import { Layout } from "../components/Layout";

interface Props {}

const BotPage: React.FC<Props> = () => {
  const { data } = useSession();
  const { user } = data || {};

  const layoutProps = { user };

  return (
    <>
      <Head>
        <title>Instaccounts - Bot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Bot />
      </Layout>
    </>
  );
};

export default BotPage;
