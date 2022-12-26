import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="nav">
      <h1 className="nav__logo">
        S<span>.</span>D<span>.</span>
      </h1>

      <ul className="nav__list">
        <Link href="/">
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
