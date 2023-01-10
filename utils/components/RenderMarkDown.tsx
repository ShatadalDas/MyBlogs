import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeCodeTitles from "rehype-code-titles";
import remarkGfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import { CopyCode } from "../../utils/components";
import useFont from "../hooks/useFont";

type Props = {
  content: string;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
};


function RenderMarkDown({
  content,
  element: Wrapper = "article",
  className,
}: Props) {
  const { consolas, roboto, ubuntu, lato } = useFont();
  return (
    <Wrapper
      className={`markdown 
      ${className ? className : ""} 
      ${consolas.variable} 
      ${roboto.variable} 
      ${ubuntu.variable} 
      ${lato.variable}
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeCodeTitles]}
        components={{
          pre: ({ children }) => {
            return (
              <pre className="code-block">
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
                alt={alt ? alt : "Image url not provided"}
                height={1000}
                width={1000}
                loading="lazy"
                quality={50}
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
              <code className="code-inline" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Wrapper>
  );
}

export default RenderMarkDown;
