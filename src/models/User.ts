import mongoose from "mongoose";
import { User as UserType } from "../utils/types";

const { model, models, Schema } = mongoose;

const UserSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    emailVerified: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = models.User || model<UserType>("User", UserSchema, "users");

export { User };
