import "../styles/tailwind.css";
import "../styles/global.css";
import "../styles/utilities.css";
import type { AppProps } from "next/app";

const VigenereApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default VigenereApp;
