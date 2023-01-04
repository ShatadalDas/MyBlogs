import { Model } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Blogs, { BlogType } from "../../models/Blogs";
import { dbConn } from "../../utils/functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "DELETE") {
    res.send("Please try with a POST Request");
    return;
  }

  dbConn();
  const { id } = req.query;
  const deleted = await (Blogs as Model<BlogType>).deleteOne({ _id: id });

  if (deleted) res.status(200).send("Blog Created Successfully...!");
  else res.status(500).send("OOPS, Something Went Wrong...!");
}
