import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../../components/EditForm/Navbar";
import EditMD from "../../components/EditForm/EditMD";
import TitleAndMeta from "../../components/EditForm/TitleAndMeta";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { OneBlogType } from "../api/getOneBlog";
import { useMultiStepForm } from "../../utils/hooks";
import { LoadingBar } from "../../utils/components";
import {
  createNewBlog,
  editAnExistingBlog,
  generateUniqueKey,
} from "../../utils/functions";

export type BlogDataType = {
  content: string;
  title: string;
  metaDes: string;
  keywords: string;
};

export type ActionType<T> = {
  type: "update";
  payload?: T;
};

function reducer(
  state: BlogDataType,
  action: ActionType<Partial<BlogDataType>>
) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function Edit({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const initialState = {
    content: data.content,
    title: data.title,
    metaDes: data.metaDescription,
    keywords: data.keywords,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isFirstStep, isLastStep, step, back, next } = useMultiStepForm([
    <EditMD key={generateUniqueKey()} state={state} dispatch={dispatch} />,
    <TitleAndMeta
      key={generateUniqueKey()}
      state={state}
      dispatch={dispatch}
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
    const isEmpty = Object.values(state).some((val) => !val);

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
      await createNewBlog(state, router, setLoading);
    } else {
      await editAnExistingBlog(state, router, setLoading);
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

export default Edit;
