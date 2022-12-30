import { model, models, Schema } from "mongoose";

export type BlogType = {
  title: string;
  content: string;
  metaDescription: string;
  keywords: string;
  time: string;
};

const blogSchema = new Schema<BlogType>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Blog || model("Blog", blogSchema);
