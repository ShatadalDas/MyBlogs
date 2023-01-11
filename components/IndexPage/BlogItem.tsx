import Link from "next/link";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { SetLoadingContext } from "../../pages/_app";
import { createUrl } from "../../utils/functions";
import { useFont } from "../../utils/hooks";

type Props = {
  title: string;
  time: string;
  id: string;
};

function BlogItem({ title, time, id }: Props) {
  const { work_sans, ubuntu } = useFont();
  const setLoading = useContext(SetLoadingContext);

  return (
    <Link href={`blog/${createUrl(title)}/?id=${id}`}>
      <div
        className={`${work_sans.variable} ${ubuntu.variable} blogitem`}
        onClick={() => setLoading(() => true)}
      >
        <h2 className={"blogitem__title"}>{title}</h2>
        <p className="blogitem__time">{time}</p>
      </div>
    </Link>
  );
}

export default BlogItem;
