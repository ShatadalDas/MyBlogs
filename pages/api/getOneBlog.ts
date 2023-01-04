import { Model } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Blogs, { BlogType } from "../../models/Blogs";
import { dbConn } from "../../utils/functions";

export type OneBlogType = {
  title: string;
  content: string;
  metaDescription: string;
  keywords: string;
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OneBlogType | string>
) {
  if (req.method !== "GET") {
    res.send("Please try with a GET Request");
    return;
  }
  try {
    dbConn();
    const { id } = req.query as { id: string };
    console.log("One Blog with id : ", id);

    let blog = await (Blogs as Model<BlogType>)
      .findById<OneBlogType>(id)
      .select("-_id -createdAt -updatedAt");

    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(500).send("OOPS, Something Went Wrong...!");
    }
  } catch (e) {
    res.status(500).send("OOPS, Something Went Wrong...!");
  }
}
