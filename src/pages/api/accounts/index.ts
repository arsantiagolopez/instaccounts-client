import argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Account } from "../../../models";
import { dbConnect } from "../../../utils/dbConnect";

// Declare types
interface WithUserIdParam {
  userId: string | unknown;
}

type ReqAndResWithUserId = (
  req: NextApiRequest & WithUserIdParam,
  res: NextApiResponse
) => Promise<void>;

type SessionWithUserId = Session | null | WithUserIdParam;

/**
 * Get all accounts managed by userId.
 * @method GET.
 * @param {object} req - http request, including the userId.
 * @param {object} res - http response.
 * @returns an array of objects of all user's managed accounts.
 */
const getAccounts: ReqAndResWithUserId = async ({ userId }, res) => {
  try {
    const accounts = await Account.find({ userId });
    // Return in order of creation (newest last)
    accounts.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/**
 * Add account to manage, pre-authorization.
 * @method POST.
 * @param {object} req - http request, including the userId and body.
 * @param {object} res - http response.
 * @returns an object of the public account details.
 */
const addAccount: ReqAndResWithUserId = async ({ userId, body }, res) => {
  let { username, password } = body;

  try {
    // Hash password with argon2
    password = await argon2.hash(password);

    // Set newly added account to active
    const account = new Account({
      username,
      password,
      userId,
      lastActive: new Date(),
    });
    await account.save();

    const { password: _, ...publicProps } = account.toObject();

    return res.status(200).json(publicProps);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// Main
const handler: ReqAndResWithUserId = async (req, res) => {
  const session: SessionWithUserId = await getSession({ req });
  const { method } = req;

  await dbConnect();
  req.userId = session?.userId;

  switch (method) {
    case "GET":
      return getAccounts(req, res);
    case "POST":
      return addAccount(req, res);
    default:
      return res
        .status(405)
        .end({ success: false, error: `Method ${method} Not Allowed` });
  }
};

export default handler;
