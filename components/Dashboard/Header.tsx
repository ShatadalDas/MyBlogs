import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HiPencil } from "react-icons/hi2";

function Header() {
  const router = useRouter();
  return (
    <>
      <header className="dashboard-header">
        <Link href="/">
          <div className="dashboard-header__logo">
            <Image
              src="/logo.svg"
              height={20}
              width={20}
              alt="Logo"
              title="Home"
            />
          </div>
        </Link>

        <button
          className="dashboard-header__btn"
          data-name="Write"
          aria-label="write a new blog"
          title="write a new blog"
          onClick={() => router.push("/admin/edit")}
        >
          <HiPencil />
        </button>
      </header>
    </>
  );
}

export default Header;
