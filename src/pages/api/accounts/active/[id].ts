import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Account } from "../../../../models";
import { dbConnect } from "../../../../utils/dbConnect";

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
 * Update account's lastActive field.
 * @method PUT.
 * @param {object} req - http request, including the query and userId.
 * @param {object} res - http response.
 * @returns an object of the updated account.
 */
const updateActiveAccountById: ReqAndResWithUserId = async (
  { query, userId },
  res
) => {
  const { id } = query;
  try {
    const account = await Account.findOneAndUpdate(
      { _id: id, userId },
      { lastActive: new Date() }
    ).select("-password");
    return res.status(200).json(account);
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
    case "PUT":
      return updateActiveAccountById(req, res);
    default:
      return res
        .status(405)
        .end({ success: false, error: `Method ${method} Not Allowed` });
  }
};

export default handler;
