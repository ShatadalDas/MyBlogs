import "../styles/globals.scss";
import "./_styles/globals.scss";
import "../components/globals.scss";
import "../utils/components/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="48qvYpzsAXb5Uy2-GinHDprntgoEin-EU98SvXyj9wQ"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
