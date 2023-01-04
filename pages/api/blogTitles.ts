import { Model } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Blogs, { BlogType } from "../../models/Blogs";
import { dbConn } from "../../utils/functions";

export type BlogsTitlesType = {
  _id: string;
  title: string;
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogsTitlesType[] | string>
) {
  if (req.method !== "GET") {
    res.send("Please try with a GET Request");
    return;
  }
  try {
    dbConn();

    let blogs = await (Blogs as Model<BlogType>)
      .find<BlogsTitlesType>()
      .sort("+updatedAt")
      .select("_id title time");

    res.status(200).send(blogs);
  } catch (e) {
    res.status(500).send("OOPS, Something Went Wrong...!");
  }
}
