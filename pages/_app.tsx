import "../styles/globals.scss";
import "./_styles/globals.scss";
import "../components/globals.scss";
import "../utils/components/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
