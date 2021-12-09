import { Account, Instagram, Post, Session, User } from "./entities";

export interface StyleProps {
  [key: string]: any;
}

export interface Action {
  name: string;
  active: boolean;
}

export type { User, Session, Instagram, Account, Post };
