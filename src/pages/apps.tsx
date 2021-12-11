import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { AppStore } from "../components/AppStore";
import { Layout } from "../components/Layout";

interface Props {}

const AppsPage: NextPage<Props> = () => {
  const { data } = useSession();
  const { user } = data || {};

  const layoutProps = { user };
  const appStoreProps = {};

  return (
    <>
      <Head>
        <title>App Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <AppStore {...appStoreProps} />
      </Layout>
    </>
  );
};

export default AppsPage;
