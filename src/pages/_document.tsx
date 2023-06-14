/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Image from 'next/image';
import Script from 'next/script';

import { AppConfig } from '@/utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="icon"
            href="/favicon.svg"
            sizes="any"
            type="image/svg+xml"
          />
          <meta name="theme-color" content="#000000" />
          <meta property="og:site_name" content="Agger Sistemas" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://agger.com.br/" />
          <meta property="og:image" content="/favicon.svg" />
          <link rel="apple-touch-icon" href="/favicon.svg" />
          {/* <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    --> */}
          <link rel="manifest" href="/manifest.json" />
          {/* <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    --> */}

          {/* <!-- Google Tag Manager (noscript) --> */}

          <noscript>
            <iframe
              title="gtmIframe"
              src="https://www.googletagmanager.com/ns.html?id=GTM-TH8253K"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          {/* <!-- End Google Tag Manager (noscript) -->
        <!-- Meta Pixel Code --> */}
          <Script
            id="metaPixel"
            dangerouslySetInnerHTML={{
              __html: `!(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
            fbq("init", "1083910262225858");
            fbq("track", "PageView");`,
            }}
          />
          <noscript>
            <Image
              alt="Facebook logo"
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1083910262225858&ev=PageView&noscript=1"
            />
          </noscript>
          {/* <!-- End Meta Pixel Code --> */}
        </Head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PG250P4F05"
        />
        <Script
          id="gtag1"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PG250P4F05');`,
          }}
        />
        <body>
          {/* <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    --> */}

          {/* <!-- RD STATION--> */}
          <Script
            type="text/javascript"
            src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js"
          />
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}

          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-225095533-1"
          />

          <Script
            id="gtag2"
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }

            gtag("js", new Date());

            gtag("config", "UA-225095533-1");`,
            }}
          />

          {/* <!-- Google Tag Manager --> */}

          <Script
            id="gtm1"
            dangerouslySetInnerHTML={{
              __html: ` (function (w, d, s, l, i) {
                w[l] = w[l] || [];

                w[l].push({
                    "gtm.start": new Date().getTime(),

                    event: "gtm.js",
                });

                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != "dataLayer" ? "&l=" + l : "";

                j.async = true;

                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;

                f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-TH8253K");`,
            }}
          />

          {/* 
        <!-- End Google Tag Manager -->

        <!--A pedido da Anna Monitoramento do RD--> */}
          <Script
            type="text/javascript"
            async
            src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/e07781a0-9c5c-44dd-8a6a-d50556c27b3f-loader.js"
          />
          {/* <!----> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
