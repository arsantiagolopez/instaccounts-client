import mongoose from "mongoose";
import { AccountDocument } from "../utils/types";

const { model, models, Schema } = mongoose;

const AccountSchema = new Schema<AccountDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAuthorized: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    lastActive: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Account =
  models.Account ||
  model<AccountDocument>("Account", AccountSchema, "accounts");

export { Account };
