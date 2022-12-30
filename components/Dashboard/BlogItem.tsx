import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

type Props = {
  _id: string;
  title: string;
  time: string;
};

function BlogItem(props: Props) {
  const router = useRouter();
  return (
    <div className="dashboard-blogItem">
      <div className="dashboard-blogItem__wrapper">
        <h2>{props.title}</h2>
        <p>{props.time}</p>
      </div>
      <div className="dashboard-blogItem__btns">
        {/* <button onClick={() => router.push(`/admin/edit?id=${props._id}`)}> */}
        <Link href={`/admin/edit?id=${props._id}`}>
          <button>
            <HiPencil />
          </button>
        </Link>
        <button>
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default BlogItem;
