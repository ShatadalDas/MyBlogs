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
        <link
          rel="icon"
          type="image/png"
          href="/favicon_io/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon_io/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon_io/favicon-48x48.png"
          sizes="48x48"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon_io/android-chrome-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon_io/android-chrome-512x512.png"
          sizes="512x512"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon_io/favicon.ico"
        />
        <link rel="manifest" href="/favicon_io/site.manifest" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
