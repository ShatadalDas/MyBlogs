import React, { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { type OneBlogType } from "../api/getOneBlog";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeCodeTitles from "rehype-code-titles";
import remarkGfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CopyCode from "../../utils/components/CopyCode";
import { Footer } from "../../components";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import LoadingBar from "../../utils/components/LoadingBar";

function Blog({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.metaDescription} />
      </Head>

      
      <LoadingBar show={loading} />
      <div className="blog--wrapper">
        <button
          className="blog--back"
          onClick={() => {
            router.back();
            setLoading(true);
          }}
        >
          <svg
            width="47"
            height="30"
            viewBox="0 0 47 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.7537 17.3364C11.9719 17.3364 11.0795 19.4907 12.3394 20.7507L16.8668 25.278C17.6439 26.0552 17.6484 27.3138 16.8768 28.0964L16.4141 28.5657C15.6348 29.3562 14.3607 29.3607 13.5757 28.5757L1.41421 16.4142C0.633166 15.6332 0.633165 14.3668 1.41421 13.5858L13.5757 1.42428C14.3607 0.639311 15.6348 0.643829 16.4141 1.43434L16.8768 1.90361C17.6484 2.68624 17.6439 3.94484 16.8668 4.72198L12.3394 9.24934C11.0795 10.5093 11.9719 12.6636 13.7537 12.6636H44.3084C45.413 12.6636 46.3084 13.559 46.3084 14.6636V15.3364C46.3084 16.441 45.413 17.3364 44.3084 17.3364H13.7537ZM44.3084 0.981309C45.413 0.981309 46.3084 1.87674 46.3084 2.98131V3.65421C46.3084 4.75877 45.413 5.65421 44.3084 5.65421H24.9439C23.8394 5.65421 22.9439 4.75877 22.9439 3.65421V2.98131C22.9439 1.87674 23.8394 0.981309 24.9439 0.981309H34.6262H44.3084ZM44.3084 24.3458C45.413 24.3458 46.3084 25.2412 46.3084 26.3458V27.0187C46.3084 28.1233 45.413 29.0187 44.3084 29.0187H24.9439C23.8394 29.0187 22.9439 28.1233 22.9439 27.0187V26.3458C22.9439 25.2412 23.8394 24.3458 24.9439 24.3458H44.3084Z" />
          </svg>
          <span>Back</span>
        </button>
        <article className="blog">
          <h1 className="blog__title" data-time={data.time}>
            {data.title}
          </h1>
          <div className="blog__content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeCodeTitles]}
              components={{
                pre: ({ children }) => {
                  return (
                    <pre className="blog__content__code">
                      <CopyCode>{children}</CopyCode>
                      {children}
                    </pre>
                  );
                },
                img: ({ src, alt }) => {
                  return (
                    <Image
                      src={
                        src
                          ? src
                          : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg"
                      }
                      alt={alt ? alt : "An Image"}
                      height={1000}
                      width={1000}
                      loading="lazy"
                      quality={100}
                    />
                  );
                },
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <Prism language={match[1]} style={theme as any} {...props}>
                      {String(children).replace(/\n$/, "")}
                    </Prism>
                  ) : (
                    <code className="blog__content__code--inline" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {data.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  //* id has been passed as a query and not a slug
  const { id } = context.query;

  const res = await fetch(`${process.env.DOMAIN}/api/getOneBlog?id=${id}`);
  const data = (await res.json()) as OneBlogType;

  return {
    props: {
      data,
    },
  };
}

export default Blog;
