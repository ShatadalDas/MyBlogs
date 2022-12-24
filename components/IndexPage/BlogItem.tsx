import Link from "next/link";
import React from "react";
import createUrl from "../../utils/functions/createUrl";

type Props = {
  title: string;
  time: string;
  id: string;
};

function BlogItem({ title, time, id }: Props) {
  return (
    <Link href={`blog?q=${createUrl(title)}&id=${id}`} legacyBehavior>
      <a>
        <div className="blogitem">
          <h2 className="blogitem__title">{title}</h2>
          <p className="blogitem__time">{time}</p>
        </div>
      </a>
    </Link>
  );
}

export default BlogItem;
