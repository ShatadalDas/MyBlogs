import { Model } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Blogs, { BlogType } from "../../models/Blogs";
import dbConn from "../../utils/functions/dbConn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "PUT") {
    res.send("Please try with a POST Request");
    return;
  }

  dbConn();
   const { _id, title, content, metaDescription, keywords, time } = req.body;
   const createdBlog = await(Blogs as Model<BlogType>).updateOne(
     { _id },
     {
       title,
       content,
       metaDescription,
       keywords,
       time,
     }
   );

  if (createdBlog) res.status(200).send("Blog Editted Successfully...!");
  else res.status(500).send("OOPS, Something Went Wrong...!");
}
