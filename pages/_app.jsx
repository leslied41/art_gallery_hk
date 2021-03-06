import "../styles/globals.css";
import sanityClient from "../client.js";
import Layout from "../components/layout/Layout.jsx";
import {
  AppProvider,
  GetAppProvider,
} from "../components/context/GlobalSettings";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps, settings_data }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    // <GetAppProvider data={settings_data}>
    <AppProvider data={settings_data}>
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
    </AppProvider>
    //</GetAppProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  const settings_data = await sanityClient.fetch(
    `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`
  );
  //console.log(data);

  return { settings_data };
};

export default MyApp;
