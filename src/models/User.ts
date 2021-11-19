import mongoose from "mongoose";
import { UserDocument } from "../utils/types";

const { model, models, Schema } = mongoose;

const UserSchema = new Schema<UserDocument>(
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
    isAdmin: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = models.User || model<UserDocument>("User", UserSchema, "users");

export { User };
