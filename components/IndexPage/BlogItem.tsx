import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import createUrl from "../../utils/functions/createUrl";

type Props = {
  title: string;
  time: string;
  id: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

function BlogItem({ title, time, id, setLoading }: Props) {
  return (
    <Link href={`blog?q=${createUrl(title)}&id=${id}`} legacyBehavior>
      <a>
        <div className="blogitem" onClick={() => setLoading(true)}>
          <h2 className="blogitem__title">{title}</h2>
          <p className="blogitem__time">{time}</p>
        </div>
      </a>
    </Link>
  );
}

export default BlogItem;
