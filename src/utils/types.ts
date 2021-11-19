import { Document } from "mongoose";

export interface AccountDocument extends Document {
  userId: UserDocument["_id"];
  username: string;
  name?: string;
  password?: string;
  isAuthorized: boolean;
  image?: string;
  lastActive: Date;
}

export interface UserDocument extends Document {
  email: string;
  emailVerified?: Date;
  isAdmin?: boolean;
}
