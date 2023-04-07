import '@/styles/globals.css'
import Head from 'next/head'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CWBCertificate</title>
      </Head>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
