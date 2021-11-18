import mongoose from "mongoose";

const { model, Schema } = mongoose;

const UserSchema = new Schema(
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

const User = model("User", UserSchema, "users");

export { User };
