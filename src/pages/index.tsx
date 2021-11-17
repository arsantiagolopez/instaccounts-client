import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { Dashboard } from "../components/Dashboard";
import { LoadingScreen } from "../components/LoadingScreen";
import { Signin } from "../components/Signin";

interface Props {}

const IndexPage: React.FC<Props> = () => {
  const { data, status } = useSession();
  const loading: boolean = status === "loading";
  const { user } = data || {};

  let title: string | undefined;
  let content: JSX.Element | undefined;

  if (!user) {
    title = "- Sign in";
    content = <Signin />;
  } else {
    content = <Dashboard />;
  }

  if (loading) {
    return <LoadingScreen isFullScreen />;
  }

  return (
    <>
      <Head>
        <title>Instaccounts {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content}
    </>
  );
};

export default IndexPage;
