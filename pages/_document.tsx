import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>luketrenaman.com | luke trenaman but website</title>
        <meta charSet="utf-8"/>
        <meta name="description" content="The website of Luke Trenaman"/>
        <meta name="keywords" content="luke trenaman snake maze snakemaze"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
        <link rel="author" href="https://github.com/luketrenaman" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <script defer src="https://kit.fontawesome.com/8f16aa06ce.js" crossOrigin="anonymous"></script>

        
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156935778-1"></script>
        <NextScript>
          window.dataLayer=window.dataLayer || [];
          function gtag(){'{'}dataLayer.push(arguments);{'}'}
          gtag('js', new Date());

          gtag('config', 'UA-156935778-1');
        </NextScript>
      </Head>
      <body>
        <Main />
      </body>
    </Html>
  )
}
