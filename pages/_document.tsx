import { Html, Main, Head, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8"/>
        <meta name="description" content="The website of Luke Trenaman"/>
        <meta name="keywords" content="luke trenaman snake maze snakemaze"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
        <link rel="author" href="https://github.com/luketrenaman" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <script defer src="https://kit.fontawesome.com/8976e50070.js" crossOrigin="anonymous"></script>
      </Head>
      <body className="min-h-screen relative bg-backgroundPrimary text-textPrimary mb-40">
        <Main />
        <NextScript/>
      </body>
    </Html>
  );
}
