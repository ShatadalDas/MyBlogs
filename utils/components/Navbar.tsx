import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { HiPencil } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import LoadingBar from "./LoadingBar";
import { MdDone, MdNavigateNext } from "react-icons/md";
import { useRouter } from "next/router";

type Props = {
  type: "index" | "dashboard" | "form";
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  next?: () => void;
  back?: () => void;
  finish?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
};

function Navbar({
  type,
  next,
  back,
  finish,
  isFirstStep,
  isLastStep,
  setLoading,
  loading,
}: Props) {
  const router = useRouter();

  return (
    <header>
      <LoadingBar show={loading ? loading : false} />
      <nav className="navbar">
        <Image
          src="/logo.svg"
          alt="Logo"
          height={100}
          width={100}
          className="navbar__logo"
          onClick={() => {
            if (setLoading !== undefined) setLoading(true);
            router.back();
          }}
          title="Back"
        />
        <ul className="navbar__list">
          <RenderButtons
            type={type}
            setLoading={setLoading}
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
  setLoading,
  isFirstStep,
  isLastStep,
}: Props) {
  switch (type) {
    case "index":
      if (setLoading)
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
            <li className="navbar__items">
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
                <MdNavigateNext />
              </button>
            </li>
          )}
        </>
      );
  }
}

export default Navbar;
