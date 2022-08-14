import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="google-site-verification" content="k-9dmncBHnL9h8G4Sfg9cPZC1Wu864hlkNjRqo2SHSY" />
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@701,200,500,301,201,300,601,600,401,501,400,700&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-primary text-slate-900 bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}