import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { SetLoadingContext } from "../../pages/_app";
import { useFont } from "../../utils/hooks";

type Props = {
  _id: string;
  title: string;
  time: string;
};

function BlogItem(props: Props) {
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const { work_sans, ubuntu } = useFont();
  const setLoading = useContext(SetLoadingContext);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem("login"));
  }, []);

  async function handleDelete() {
    if (loggedIn === "true") {
      await deleteBlog(props._id);
      router.reload();
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
        <Link
          href={`/admin/edit?id=${props._id}`}
          onClick={() => setLoading(() => true)}
        >
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
      alert("Blog has been deleted, the page will be refreshed automatically.");
    }
  } catch (e) {
    alert("Some Error occurred.. :(");
    console.log(e);
  }
}

export default BlogItem;
