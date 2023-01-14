import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { HiPencil } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { useRouter } from "next/router";
import { useFont } from "../hooks";
import { SetLoadingContext } from "../../pages/_app";

type IndexProps = {
  type: "index";
};

type DashboardProps = {
  type: "dashboard";
};

type FormProps = {
  type: "form";
  next: () => void;
  back: () => void;
  finish: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

type LoginProps = {
  type: "login";
};

type Props = IndexProps | DashboardProps | FormProps | LoginProps;

function Navbar(props: Props) {
  const router = useRouter();
  const { lato } = useFont();
  const setLoading = useContext(SetLoadingContext);
  return (
    <header>
      <nav className={`navbar ${lato.variable}`}>
        <Image
          src="/logo.svg"
          alt="Logo"
          height={100}
          width={100}
          className="navbar__logo"
          onClick={() => {
            setLoading(() => true);
            router.back();
          }}
          title="Back"
        />
        <ul className="navbar__list">
          <RenderButtons {...props} />
        </ul>
      </nav>
    </header>
  );
}

function RenderButtons(props: Props) {
  const router = useRouter();
  const setLoading = useContext(SetLoadingContext);
  switch (props.type) {
    case "index":
      return (
        <>
          <Link href="/admin/login">
            <li className="navbar__items">
              <button
                className="navbar--admin"
                data-name="Admin"
                onClick={() => setLoading(true)}
              >
                <Image
                  src="/shield.svg"
                  alt="admin svg"
                  height={20}
                  width={20}
                />
              </button>
            </li>
          </Link>
          <Link href="https://github.com/ShatadalDas/MyBlogs" target="_blank">
            <li className="navbar__items">
              <button className="navbar--code" data-name="Code">
                <Image
                  src="/hashTag.svg"
                  alt="hashtag svg"
                  height={20}
                  width={20}
                />
              </button>
            </li>
          </Link>
        </>
      );

    case "dashboard":
      return (
        <>
          <Link href="/admin/edit">
            <li
              className="navbar__items"
              onClick={() => setLoading(() => true)}
            >
              <button
                className="navbar--write"
                data-name="Write"
                aria-label="write a new blog"
                title="write a new blog"
              >
                <HiPencil />
              </button>
            </li>
          </Link>
        </>
      );

    case "form":
      return (
        <>
          <li className="navbar__items">
            <button
              className="navbar--back"
              onClick={props.back}
              disabled={props.isFirstStep}
            >
              <IoIosArrowBack />
            </button>
          </li>
          {props.isLastStep ? (
            <li className="navbar__items">
              <button className="navbar--done" onClick={props.finish}>
                <MdDone />
              </button>
            </li>
          ) : (
            <li className="navbar__items">
              <button className="navbar--next" onClick={props.next}>
                <IoIosArrowBack />
              </button>
            </li>
          )}
        </>
      );
    case "login":
      return (
        <>
          <li
            className="navbar__items"
            onClick={() => {
              setLoading(() => true);
              router.push("/admin/dashboard");
            }}
          >
            <button className="navbar--skip">Skip</button>
          </li>
        </>
      );
  }
}

export default Navbar;
