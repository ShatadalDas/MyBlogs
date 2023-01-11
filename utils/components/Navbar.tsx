import Image from "next/image";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { HiPencil } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { useRouter } from "next/router";
import { useFont } from "../hooks";
import { SetLoadingContext } from "../../pages/_app";

type Props = {
  type: "index" | "dashboard" | "form" | "login";
  loading?: boolean;
  next?: () => void;
  back?: () => void;
  finish?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
};
type CompProps = {
  type: "index" | "dashboard" | "form" | "login";
  next?: () => void;
  back?: () => void;
  finish?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
};

function Navbar({ type, next, back, finish, isFirstStep, isLastStep }: Props) {
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
          <RenderButtons
            type={type}
            next={next}
            back={back}
            finish={finish}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
          />
        </ul>
      </nav>
    </header>
  );
}

function RenderButtons({
  type,
  next,
  back,
  finish,
  isFirstStep,
  isLastStep,
}: CompProps) {
  const router = useRouter();
  const setLoading = useContext(SetLoadingContext);
  switch (type) {
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
              onClick={back}
              disabled={isFirstStep}
            >
              <IoIosArrowBack />
            </button>
          </li>
          {isLastStep ? (
            <li className="navbar__items">
              <button className="navbar--done" onClick={finish}>
                <MdDone />
              </button>
            </li>
          ) : (
            <li className="navbar__items">
              <button className="navbar--next" onClick={next}>
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
