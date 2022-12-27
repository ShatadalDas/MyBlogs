import React, { useState } from "react";
import { BlogItem, Footer, Navbar, BlogItemLoading } from "../components";
import { AllBlogsType } from "./api/getAllBlogs";
import clamp from "../utils/functions/clamp";
import InfiniteScroll from "react-infinite-scroll-component";
import { InferGetServerSidePropsType } from "next";
import LoadingBar from "../utils/components/LoadingBar";
import Head from "next/head";

let start = 0;
let end = 0;

function Index(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const totalBlogs = props.totalBlogs;
  const [blogs, setBlogs] = useState<AllBlogsType[]>(props.blogs);
  const [loading, setLoading] = useState(false);

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
        <title>Blogs of Shatadal Das</title>
        <meta
          name="description"          
          content="Welcome to my blog, where we delve into the exciting world of technology and programming. From informative articles and tutorials to valuable resources, this website is dedicated to keeping you up-to-date on the latest trends and techniques in the tech industry. As a tech and programming enthusiast, I share my insights and experiences to help you learn something new every day. Follow along to stay informed and stay ahead of the curve."
        />
      </Head>

      <LoadingBar show={loading} />
      <div className="index">
        <Navbar />
        <main className="index__blogs">
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
                id={item._id}
                setLoading={setLoading}
              />
            ))}
          </InfiniteScroll>
        </main>
      </div>
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

export default Index;
