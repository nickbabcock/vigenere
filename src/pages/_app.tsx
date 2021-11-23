import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/assets.css';
import 'sanitize.css/system-ui.css';
import type { AppProps } from 'next/app'

const VigenereApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
}

export default VigenereApp
