import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Admin, { AdminType } from "../../models/Admin";
import {dbConn} from "../../utils/functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "POST") {
    res.send("Please try with a POST request");
    return;
  }

  dbConn();
  const { id, password } = req.body as {
    id: string;
    password: string;
  };

  const user = await (Admin as Model<AdminType>).findOne({
    loginId: id,
    password,
  });

  if (user) {
    res.status(200).send("Ok");
  } else {
    res.status(200).send("Invalid");
  }
}
