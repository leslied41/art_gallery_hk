import "../styles/globals.css";
import sanityClient from "../client.js";
import Layout from "../components/layout/Layout.jsx";
import { PathHistoryProvider } from "../components/context/PathHistory";
import { useRouter } from "next/router";
import Head from "next/head";
import { global_settings_data } from "../groq";

function MyApp({ Component, pageProps, settings_data }) {
  const router = useRouter();
  const getLayout =
    Component.getLayout ||
    ((page) => <Layout settings_data={settings_data}>{page}</Layout>);

  return (
    <PathHistoryProvider>
      {router.asPath == "/" ? (
        <style jsx global>
          {`
            body {
              background: black;
            }
          `}
        </style>
      ) : (
        <style jsx global>
          {`
            body {
              background: white;
            }
          `}
        </style>
      )}
      <Head>
        <link rel="shortcut icon" href="/images/Favicon_1_AW001-01.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />

        <meta name="theme-color" content="#ffffff" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </PathHistoryProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const settings_data = await sanityClient.fetch(global_settings_data);

  return {
    settings_data,
  };
};

export default MyApp;
