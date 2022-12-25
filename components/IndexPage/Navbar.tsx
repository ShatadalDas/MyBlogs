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
        <li className="nav__item">
          <Link href="/" legacyBehavior>
            <a>
              <button className="nav--admin" data-name="Admin">
                <Image
                  src="/shield.svg"
                  alt="admin svg"
                  height={10}
                  width={10}
                />
              </button>
            </a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href="https://github.com/ShatadalDas/MyBlogs" legacyBehavior>
            <a>
              <button className="nav--code" data-name="Code">
                <Image
                  src="/hashTag.svg"
                  alt="hashtag svg"
                  height={10}
                  width={10}
                />
              </button>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
