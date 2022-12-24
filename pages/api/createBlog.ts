import { Model } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Blogs, { BlogType } from "../../models/Blogs";
import dbConn from "../../utils/functions/dbConn";

type Data = {
  _id: string;
  title: string;
  description: string;
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | string>
) {
  if (req.method !== "POST") {
    res.send("Please try with a POST Request");
    return;
  }

  dbConn();
  const { title, content, metaDescription, time } = req.body;
  const createdBlog = await (Blogs as Model<BlogType>).create({
    title,
    content,
    metaDescription,
    time,
  });

  if (createdBlog) res.status(200).send("Blog Created Successfully...!");
  else res.status(500).send("OOPS, Something Went Wrong...!");
}
