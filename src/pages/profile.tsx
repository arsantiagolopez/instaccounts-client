import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout";
import { Profile } from "../components/Profile";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const { data } = useSession();
  const { user } = data || {};

  interface User {
    user: object | undefined;
  }

  const layoutProps: User = { user };

  return (
    <>
      <Head>
        <title>Instaccounts - {}'s Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Profile />
      </Layout>
    </>
  );
};

export default ProfilePage;
