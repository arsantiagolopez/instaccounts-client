import fs from "fs";
import type { GetStaticProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import path from "path";
import React from "react";
import { Layout } from "../components/Layout";
import { Profile } from "../components/Profile";
import { ProtectedPage } from "../types";
import { useAccounts } from "../utils/useAccounts";

interface Names {
  username: string;
  name: string;
}

interface Props {
  instagramFiles: InferGetServerSidePropsType<typeof getStaticProps>;
  names?: Names[];
}

const ProfilePage: ProtectedPage<Props> = ({ instagramFiles, names }) => {
  const { data } = useSession();
  const { user } = data || {};

  const { active } = useAccounts();

  const { name, username } =
    names?.find(({ username }) => username === active?.username) || {};

  const title = name ? `${name} (@${username})` : "Instaccounts - Profile";

  const layoutProps = { user };
  const profileProps = { instagramFiles };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Profile {...profileProps} />
      </Layout>
    </>
  );
};

// Get instagrams from public dir
export const getStaticProps: GetStaticProps = async () => {
  const instagramsDirectory = path.join(process.cwd(), "public/accounts");
  const folders = fs.readdirSync(instagramsDirectory);
  const accounts = folders.filter((str) => str[0] !== ".");

  let names: Names[] = [];

  const instagramFiles = accounts.reduce((obj, username) => {
    const dir = path.join(process.cwd(), `public/accounts/${username}`);
    const files = fs.readdirSync(dir);
    const posts = files.filter(
      (file) => file.includes(".json") && !file.includes(username)
    );

    const profileJsonFilename = files.filter(
      (file) => file.includes(username) && file.includes(".json")
    );
    const { node } = JSON.parse(
      fs.readFileSync(`${dir}/${profileJsonFilename}`, "utf8")
    );

    // Get username & name of all accounts
    const newNames = { username: node.username, name: node.full_name };
    names = [...names, ...[newNames]];
    return { ...obj, [username]: posts };
  }, {});

  return {
    props: {
      instagramFiles,
      names,
    },
  };
};

ProfilePage.isProtected = true;

export default ProfilePage;
