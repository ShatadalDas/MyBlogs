import axios from "axios";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { BlogDataType } from "../../pages/admin/edit";
import generateTime from "./generateTime";

export default async function editAnExistingBlog(
  formData: BlogDataType,
  router: NextRouter,
  setLoading: Dispatch<SetStateAction<boolean>>
) {

  try {
    const res = await axios.put("/api/editBlog", {
      _id: router.query.id,
      title: formData.title,
      content: formData.content,
      metaDescription: formData.metaDes,
      keywords: formData.keywords,
      time: generateTime(),
    });
    if (res.status === 200) {
      router.push("/admin/dashboard");
      setTimeout(() => {
        alert("Blog editted successfully!");
      }, 500);
    }
  } catch (error) {
    setLoading(() => false);
    alert("Some Error occurred.. :(");
    console.log(error);
  }
}
