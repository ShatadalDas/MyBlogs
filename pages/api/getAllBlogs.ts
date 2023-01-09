import { Model } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Blogs, { BlogType } from "../../models/Blogs";
import { dbConn } from "../../utils/functions";

export type AllBlogsType = {
  _id: string;
  title: string;
  content: string;
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllBlogsType[] | string>
) {
  if (req.method !== "GET") {
    res.send("Please try with a GET Request");
    return;
  }
  try {
    dbConn();
    const { s, e } = req.query as { s: string; e: string };
    console.log(req.query);

    let blogs = await (Blogs as Model<BlogType>)
      .find<AllBlogsType>({})
      .sort("+updatedAt")
      .select("_id title content time");

    blogs = blogs.slice(parseInt(s), parseInt(e));
    res.status(200).send(blogs);
  } catch (e) {
    res.status(500).send("OOPS, Something Went Wrong...!");
  }
}
