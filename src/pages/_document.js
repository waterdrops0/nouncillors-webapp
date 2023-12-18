import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
      <Html lang="en" className="w-full h-full">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link
            rel="preload"
            href="/fonts/CrimsonPro.ttf"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="flex flex-col w-full h-full overflow-hidden bg-beige selection:bg-red selection:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
