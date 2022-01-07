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
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await App.getInitialProps(ctx);
  }
  const settings_data = await sanityClient.fetch(
    `*[_type=='settings']{orgnizationName,orgnizationName_cn,address,phone,email,social[]->,businessHours,abbreviation,exhibitions,news,about,artists,landing}`
  );
  //console.log(data);

  return { settings_data, pageProps };
};

export default MyApp;
