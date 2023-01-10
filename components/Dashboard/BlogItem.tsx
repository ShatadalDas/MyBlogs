import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import useFont from "../../utils/hooks/useFont";

type Props = {
  _id: string;
  title: string;
  time: string;
};

const { work_sans, ubuntu } = useFont();

function BlogItem(props: Props) {
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("login"));
  }, []);

  function handleDelete() {
    if (loggedIn === "true") {
      deleteBlog(props._id);
    } else {
      alert("Sorry, but only admin can delete, update or edit a blog!");
    }
  }
  return (
    <div
      className={`
          dashboard-blogItem 
          ${work_sans.variable} 
          ${ubuntu.variable}
      `}
    >
      <div className="dashboard-blogItem__wrapper">
        <h2>{props.title}</h2>
        <p>{props.time}</p>
      </div>
      <div className="dashboard-blogItem__btns">
        <Link href={`/admin/edit?id=${props._id}`}>
          <button>
            <HiPencil />
          </button>
        </Link>
        <button onClick={handleDelete}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

async function deleteBlog(id: string) {
  try {
    const res = await axios.delete(`/api/deleteBlog?id=${id}`);

    if (res.status === 200) {
      alert("Blog has been deleted, refresh the page to see the changes.");
    }
  } catch (e) {
    alert("Some Error occurred.. :(");
    console.log(e);
  }
}

export default BlogItem;
