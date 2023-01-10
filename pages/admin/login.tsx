import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Navbar } from "../../utils/components";
import useFont from "../../utils/hooks/useFont";

const { lato, ubuntu } = useFont();

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [loginID, setLoginID] = useState("");
  const [pass, setPass] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [error, setError] = useState("");
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setAudio(new Audio("/error.mp3"));
  }, []);

  function handleLoginID(e: ChangeEvent<HTMLInputElement>) {
    setLoginID(e.target.value);
    setError("");
    setBtnDisabled(false);
  }

  function handlePass(e: ChangeEvent<HTMLInputElement>) {
    setPass(e.target.value);
    setError("");
    setBtnDisabled(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        id: loginID,
        password: pass,
      });

      if (res.data === "Ok") {
        sessionStorage.setItem("login", "true");
        router.push("/admin/dashboard");
        return;
      } else {
        await audio?.play();
        setError("Error");
        setBtnDisabled(true);
        navigator.vibrate(300);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Head>
        <title>Login with Admin Credentials</title>
        <meta
          name="description"
          content="Admin page, where the admin can enter correct credentials and will be allowed to create, edit or delete any blog."
        />
      </Head>

      <Navbar type="login" />
      <form
        onSubmit={handleSubmit}
        aria-label="Login form"
        className={`login-frm
        ${lato.variable}
        ${ubuntu.variable}
        `}
      >
        <div className="invalidInput" aria-hidden>
          {error}
        </div>
        <div className="login-frm__grp">
          <label className="sr-only" htmlFor="id">
            Login ID
          </label>
          <input
            onChange={handleLoginID}
            maxLength={15}
            type="text"
            id="id"
            placeholder="enter the login id"
            autoComplete="new-password"
          />
        </div>

        <div className="login-frm__grp">
          <label className="sr-only" htmlFor="pass">
            Password
          </label>
          <div className="pass-input">
            <input
              onChange={handlePass}
              maxLength={15}
              type={showPass ? "text" : "password"}
              id="pass"
              placeholder="enter the password"
              autoComplete="off"
            />
            <button
              tabIndex={0}
              className="pass-input__btn"
              onClick={() => setShowPass((val) => !val)}
              type="button"
              aria-label="Show or Hide password, button"
            >
              <IoEye
                aria-label="Eye Open Icon"
                style={{
                  display: showPass ? "none" : "inline",
                }}
              />
              <IoEyeOff
                aria-label="Eye Closed Icon"
                style={{
                  display: !showPass ? "none" : "inline",
                }}
              />
            </button>
          </div>
        </div>

        <div className="login-frm__btn">
          <button
            tabIndex={0}
            type="submit"
            disabled={
              !(loginID.length === 15 && pass.length === 15) || btnDisabled
            }
          >
            Login
          </button>
        </div>
        <Link href="/admin/dashboard">
          <p className="login-frm__guest">View as a guest</p>
        </Link>
      </form>
    </>
  );
}

export default Login;
