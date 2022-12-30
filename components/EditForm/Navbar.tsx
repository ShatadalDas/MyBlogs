import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  isFirstStep: boolean;
  isLastStep: boolean;
  back: () => void;
  next: () => void;
  finish: () => void;
};

function Navbar({ isFirstStep, isLastStep, back, finish, next }: Props) {
  return (
    <>
      <header className="edit-frm-header">
        <h1 className="edit-frm-header__logo">
          <Link href="/admin/dashboard">
            <Image src="/logo.svg" alt="" height={50} width={50} />
          </Link>
        </h1>
        <nav className="edit-frm-header__nav">
          <button
            type="button"
            className="edit-frm-header__nav--back"
            onClick={back}
            disabled={isFirstStep}
          >
            Back
          </button>

          {isLastStep ? (
            <button
              type="submit"
              className="edit-frm-header__nav--done"
              onClick={finish}
            >
              Done
            </button>
          ) : (
            <button
              type="button"
              className="edit-frm-header__nav--next"
              onClick={next}
            >
              Next
            </button>
          )}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
