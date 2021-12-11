import fs from "fs";
import { GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import path from "path";
import React from "react";
import { v4 } from "uuid";
import { Dashboard } from "../components/Dashboard";
import { Layout } from "../components/Layout";
import { LoadingScreen } from "../components/Screens";
import { Signin } from "../components/Signin";
import { AccountsWithPosts } from "../types";

interface Props {
  accountsWithPosts: InferGetServerSidePropsType<typeof getStaticProps>;
}

const IndexPage: NextPage<Props> = ({ accountsWithPosts }) => {
  const { data, status } = useSession();
  const loading: boolean = status === "loading";
  const { user } = data || {};

  let title: string | undefined;
  let content: JSX.Element | undefined;

  const layoutProps = { user };
  const dashboardProps = { accountsWithPosts };

  if (!user) {
    title = "- Sign in";
    content = <Signin />;
  } else {
    content = (
      <Layout {...layoutProps}>
        <Dashboard {...dashboardProps} />
      </Layout>
    );
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

// Get instagrams and their respective posts from public dir
export const getStaticProps: GetStaticProps = async () => {
  const instagramsDir = path.join(process.cwd(), "public/accounts");
  const folders = fs.readdirSync(instagramsDir);
  const instagrams = folders.filter((str) => str[0] !== ".");

  // Posts
  const accountsWithPosts: AccountsWithPosts = instagrams.reduce(
    (obj, username) => {
      const dir = path.join(process.cwd(), `public/accounts/${username}`);
      const files = fs.readdirSync(dir);
      const pictureJsons = files.filter(
        (file) => file.includes(".json") && !file.includes(username)
      );

      const posts = pictureJsons.map((filename) => {
        let isCarousel: boolean = false;
        let carouselImages: string[] | null = null;

        const data = JSON.parse(fs.readFileSync(`${dir}/${filename}`, "utf8"));

        const {
          dimensions: { height, width },
          location,
          edge_media_to_comment: { count: comments },
          edge_media_preview_like: { count: likes },
          taken_at_timestamp,
          edge_sidecar_to_children,
        } = data.node;

        // Caption: Captions could be null
        const captionFilename = filename.replace(".json", ".txt");
        const captionPath = `${dir}/${captionFilename}`;
        let caption: string | null = null;

        if (fs.existsSync(captionPath)) {
          const content = fs.readFileSync(captionPath, "utf8");
          caption = content.toString();
        }

        // Image: Posts could be carousels
        let imageFilename = filename.replace(".json", ".jpg");
        let image = `/accounts/${username}/${imageFilename}`;

        if (edge_sidecar_to_children) {
          imageFilename = filename.replace(".json", "");

          isCarousel = true;
          carouselImages = files
            .filter(
              (str) => str.includes(imageFilename) && str.includes(".jpg")
            )
            .map((str) => `/accounts/${username}/${str}`);
          // Make first image the cover image
          image = image.replace(".jpg", "_1.jpg");
        }

        // Date: Convert from UNIX to Date()
        const timestamp = new Date(taken_at_timestamp * 1000).toString();

        return {
          id: v4(),
          username,
          height,
          width,
          image,
          caption: caption ?? null,
          location: location?.name ?? null,
          comments,
          likes,
          timestamp,
          isCarousel,
          carouselImages,
        };
      });

      // Profile picture
      const profilePicFilename = files.find((file) =>
        file.includes("profile_pic")
      );
      const profilePic = `/accounts/${username}/${profilePicFilename}`;

      return {
        ...obj,
        [username]: {
          profilePic,
          posts,
        },
      };
    },
    {}
  );

  return {
    props: {
      accountsWithPosts,
    },
  };
};

export default IndexPage;
