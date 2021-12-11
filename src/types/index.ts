import { Account, Instagram, Post, Session, User } from "./entities";

export interface StyleProps {
  [key: string]: any;
}

export interface Action {
  name: string;
  active: boolean;
}

interface PictureAndPosts {
  profilePic: string;
  posts: Post[];
}

type AccountsWithPosts = Record<string, PictureAndPosts>;

export type { User, Session, Instagram, Account, Post, AccountsWithPosts };
