import "../styles/globals.css";
import sanityClient from "../client.js";
import Layout from "../components/layout/Layout.jsx";
import { AppProvider } from "../components/context/GlobalSettings";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";
import { useRouter } from "next/router";
import App from "next/app";

function MyApp({ Component, pageProps, settings_data }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  //console.log(data);
  return (
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
      {getLayout(<Component {...pageProps} />)}
    </AppProvider>
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
