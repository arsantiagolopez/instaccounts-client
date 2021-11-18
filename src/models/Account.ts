import mongoose from "mongoose";

const { model, Schema } = mongoose;

const AccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    lastActive: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Account = model("Account", AccountSchema, "accounts");

export { Account };
