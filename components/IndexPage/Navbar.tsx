import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
};

function Navbar({ setLoading }: Props) {
  return (
    <nav className="nav">
      <h1 className="nav__logo" aria-label="S D logo">
        <Image src="/logo.svg" height={20} width={20} alt="Logo"/>
      </h1>

      <ul className="nav__list">
        <Link href="/admin/login" onClick={() => setLoading(true)}>
          <li className="nav__item">
            <button className="nav--admin" data-name="Admin">
              <Image src="/shield.svg" alt="admin svg" height={20} width={20} />
            </button>
          </li>
        </Link>

        <Link href="https://github.com/ShatadalDas/MyBlogs" target="_blank">
          <li className="nav__item">
            <button className="nav--code" data-name="Code">
              <Image
                src="/hashTag.svg"
                alt="hashtag svg"
                height={20}
                width={20}
              />
            </button>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
