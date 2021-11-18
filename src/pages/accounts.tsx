// import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { Accounts } from "../components/Accounts";
import { Layout } from "../components/Layout";

interface Props {}

const IndexPage: React.FC<Props> = () => {
  // const { data, status } = useSession();
  // const loading: boolean = status === "loading";
  // const { user } = data || {};

  return (
    <>
      <Head>
        <title>Instaccounts - Select Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Accounts />
      </Layout>
    </>
  );
};

export default IndexPage;
