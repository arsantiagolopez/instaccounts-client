import { Divider, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { Action, StyleProps } from "../../types";
import { useAccounts } from "../../utils/useAccounts";
import { usePreviewPosts } from "../../utils/usePreviewPosts";
import { PreviewControl } from "../PreviewControl";
import { Actions } from "./Actions";
import { Feed } from "./Feed";
import { Info } from "./Info";

interface Props {
  instagramFiles: Record<string, string[]>;
}

const Profile: React.FC<Props> = ({ instagramFiles }) => {
  const [actions, setActions] = useState<Action[]>([
    { name: "DEFAULT", active: true },
    { name: "PREVIEW", active: false },
  ]);
  const { active } = useAccounts();
  const { name: activeAction } = actions.find(({ active }) => active) || {};

  const { previews, images, setImages } = usePreviewPosts();

  const isPreviewControlActive = activeAction === "PREVIEW";

  const infoProps = { active, instagramFiles };
  const actionsProps = { actions, setActions };
  const feedProps = { active, previews };
  const previewControlProps = { actions, setActions, images, setImages };
  return (
    <Flex {...styles.wrapper}>
      <Info {...infoProps} />
      <Actions {...actionsProps} />
      <Divider {...styles.divider} />
      <Feed {...feedProps} />
      {isPreviewControlActive && <PreviewControl {...previewControlProps} />}
    </Flex>
  );
};

export { Profile };

// Styles

const styles: StyleProps = {
  wrapper: {
    direction: "column",
    paddingX: { base: "0", md: "25vw" },
    minHeight: "calc(100vh - 3em)",
  },
  divider: {
    marginY: { base: "3vh", md: "4vh" },
  },
};
