import { Model } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Blogs, { BlogType } from "../../models/Blogs";
import {dbConn} from "../../utils/functions";
import { AllBlogsType } from "./getAllBlogs";

type Data = {
  count: number;
  blogs: AllBlogsType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number | string | Data>
) {
  if (req.method !== "GET") {
    res.send("Please try with a GET Request");
    return;
  }

  try {
    dbConn();
    const count = await (Blogs as Model<BlogType>).countDocuments();
    const blogs = await(Blogs as Model<AllBlogsType>)
      .find()
      .limit(10)
      .sort("+updatedAt")
      .select("_id title description time");
    res.status(200).json({ count, blogs });
  } catch (error) {
    res.status(500).send("OOPS, Something Went Wrong...!");
  }
}
