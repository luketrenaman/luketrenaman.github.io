import '@/styles/globals.css';
import '@/styles/bootstrap-grid.min.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
