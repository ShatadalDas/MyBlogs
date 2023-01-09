import React, {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";
import EditMD from "../../components/EditForm/EditMD";
import TitleAndMeta from "../../components/EditForm/TitleAndMeta";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { OneBlogType } from "../api/getOneBlog";
import { useMultiStepForm } from "../../utils/hooks";
import { Navbar } from "../../utils/components";
import { createNewBlog, editAnExistingBlog } from "../../utils/functions";

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

export const StateContext = createContext({
  content: "",
  title: "",
  metaDes: "",
  keywords: "",
});
export const DispatchContext = createContext(
  (action: ActionType<Partial<BlogDataType>>) => {}
);

function Edit({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //* Initial values coming from getServerSideProps
  const initialState = {
    content: data.content,
    title: data.title,
    metaDes: data.metaDescription,
    keywords: data.keywords,
  };

  //* Responsible of maitaining all the blog data
  const [state, dispatch] = useReducer(reducer, initialState);

  //* Multistep form to take the MD and meta info seperately
  const { isFirstStep, isLastStep, step, back, next } = useMultiStepForm([
    <EditMD key={0} />,
    <TitleAndMeta key={1} />,
  ]);

  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("login"));

    return () => {
      setLoggedIn(null);
    };
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

    if (router.query.id) {
      await editAnExistingBlog(state, router, setLoading);
      return;
    }

    await createNewBlog(state, router, setLoading);
  }

  return (
    <>
      <form className="edit-wrapper" onSubmit={(e) => e.preventDefault()}>
        <Navbar
          type="form"
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          back={back}
          next={next}
          finish={finish}
          loading={loading}
        />
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            {step}
          </DispatchContext.Provider>
        </StateContext.Provider>
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
