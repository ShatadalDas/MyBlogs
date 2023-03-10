import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BlogItemLoading } from "../../components";
import BlogItem from "../../components/Dashboard/BlogItem";
import { Navbar, Footer } from "../../utils/components";
import { clamp } from "../../utils/functions";
import { AllBlogsType } from "../api/getAllBlogs";
import { SetLoadingContext } from "../_app";

let start = 0;
let end = 0;

function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const totalBlogs = props.totalBlogs;
  const [blogs, setBlogs] = useState<AllBlogsType[]>(props.blogs);
  const setLoading = useContext(SetLoadingContext);
  useEffect(() => {
    setLoading(() => false);
    return () => setLoading(() => true);
  }, [setLoading]);

  async function fetchData() {
    try {
      start = clamp(0, blogs.length, totalBlogs - 1);
      end = clamp(10, start + 10, totalBlogs);

      const res = await fetch(`/api/getAllBlogs?s=${start}&e=${end}`, {
        method: "GET",
      });
      const data = (await res.json()) as AllBlogsType[];
      setBlogs((state) => state.concat(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar type="dashboard" />
      <main className="dashboard-wrapper">
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchData}
          hasMore={blogs.length < totalBlogs}
          loader={<BlogItemLoading />}
        >
          {blogs.map((item) => (
            <BlogItem
              key={item._id}
              title={item.title}
              time={item.time}
              _id={item._id}
            />
          ))}
        </InfiniteScroll>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  let totalBlogs: number;
  let blogs: AllBlogsType[];

  const res = await fetch(`${process.env.DOMAIN}/api/totalBlogs`, {
    method: "GET",
  });
  const data = (await res.json()) as {
    count: number;
    blogs: AllBlogsType[];
  };
  totalBlogs = data.count;
  blogs = data.blogs;
  return { props: { totalBlogs, blogs } };
}

export default Dashboard;
