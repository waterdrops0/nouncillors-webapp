import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
      <Html lang="en" className="w-full h-full">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link
            rel="preload"
            href="/fonts/CrimsonPro.ttf"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>
        <div id="backdrop-root"></div>
        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
