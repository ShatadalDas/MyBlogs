import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { createUrl } from "../../utils/functions";
import useFont from "../../utils/hooks/useFont";

type Props = {
  title: string;
  time: string;
  id: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
const { work_sans, ubuntu } = useFont();

function BlogItem({ title, time, id, setLoading }: Props) {
  return (
    <Link href={`blog/${createUrl(title)}/?id=${id}`}>
      <div
        className={`${work_sans.variable} ${ubuntu.variable} blogitem`}
        onClick={() => setLoading(true)}
      >
        <h2 className={"blogitem__title"}>{title}</h2>
        <p className="blogitem__time">{time}</p>
      </div>
    </Link>
  );
}

export default BlogItem;
