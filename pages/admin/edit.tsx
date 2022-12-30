import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Navbar from "../../components/EditForm/Navbar";
import useMultiStepForm from "../../utils/hooks/useMultiStepForm";
import EditMD from "../../components/EditForm/EditMD";
import TitleAndMeta from "../../components/EditForm/TitleAndMeta";
import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import generateTime from "../../utils/functions/generateTime";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { OneBlogType } from "../api/getOneBlog";
import LoadingBar from "../../utils/components/LoadingBar";

type FormDataType = {
  content: string;
  title: string;
  metaDes: string;
  keywords: string;
};

function Edit({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [content, setContent] = useState(data.content);
  const [otherFormData, setOtherFormData] = useState({
    title: data.title,
    metaDes: data.metaDescription,
    keywords: data.keywords,
  });
  const { isFirstStep, isLastStep, step, back, next } = useMultiStepForm([
    <EditMD content={content} setContent={setContent} />,
    <TitleAndMeta
      otherFormData={otherFormData}
      setOtherFormData={setOtherFormData}
    />,
  ]);
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("login"));
  }, []);

  async function finish() {
    setLoading(true);
    const formData: FormDataType = { content, ...otherFormData };
    const isEmpty = Object.values(formData).some((val) => !val);

    if (isEmpty) {
      setLoading(false);
      return alert("Please fill all the fields..!");
    }

    if (!loggedIn) {
      setLoading(false);
      return alert(
        "Sorry, but only admin can create, edit or delete a blog..!"
      );
    }
    if (!router.query.id) {
      await createNewBlog(formData, router, setLoading);
    } else {      
      await editAnExistingBlog(formData, router, setLoading);
    }
  }

  return (
    <>
      <LoadingBar show={loading} />
      <form className="edit-wrapper" onSubmit={(e) => e.preventDefault()}>
        <Navbar
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          back={back}
          next={next}
          finish={finish}
        />
        {step}
      </form>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  if (!id)
    return {
      props: {
        data: {
          title: "",
          content: "",
          metaDescription: "",
          keywords: "",
          time: "",
        },
      },
    };

  const res = await fetch(`${process.env.DOMAIN}/api/getOneBlog?id=${id}`);
  const data = (await res.json()) as OneBlogType;

  return {
    props: {
      data,
    },
  };
}

async function createNewBlog(
  formData: FormDataType,
  router: NextRouter,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  try {
    const res = await axios.post("/api/createBlog", {
      title: formData.title,
      content: formData.content,
      metaDescription: formData.metaDes,
      keywords: formData.keywords,
      time: generateTime(),
    });
    if (res.status === 200) {
      router.push("/admin/dashboard");
      setTimeout(() => {
        alert("Blog created successfully!");
      }, 500);
    }
  } catch (error) {
    setLoading(false);
    alert("Some Error occurred.. :(");
    console.log(error);
  }
}


async function editAnExistingBlog(
  formData: FormDataType,
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
        alert("Blog created successfully!");
      }, 500);
    }
  } catch (error) {
    setLoading(false);
    alert("Some Error occurred.. :(");
    console.log(error);
  }
}

export default Edit;
