import '../styles/global.css';
import '../styles/verticalSwiper.css';

import type { AppProps } from 'next/app';
import { Asap, K2D } from 'next/font/google';
import Head from 'next/head';

const asap = Asap({ subsets: ['latin'] });
const k2d = K2D({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <style jsx global>{`
      :root {
        --asap-font: ${asap.style.fontFamily};
        --k2d-font: ${k2d.style.fontFamily};
      }
    `}</style>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Agger</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
