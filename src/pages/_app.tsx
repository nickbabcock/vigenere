import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "sanitize.css/assets.css";
import "sanitize.css/system-ui.css";
import "../styles/openprops.css";
import "../styles/global.css";
import "../styles/colors.css";
import "../styles/utilities.css";
import "../styles/tailwind-lite.css";
import type { AppProps } from "next/app";

const VigenereApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default VigenereApp;
