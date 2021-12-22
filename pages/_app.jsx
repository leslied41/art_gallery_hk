import "../styles/globals.css";
import sanityClient from "../client.js";
import Layout from "../components/layout/Layout.jsx";
import { AppProvider } from "../components/context/GlobalSettings";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";
function MyApp({ Component, pageProps, settings_data }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const [popup_path, setpopup_path] = useState("");
  //console.log(data);
  return (
    <AppProvider data={settings_data}>
      {getLayout(<Component {...pageProps} />)}
    </AppProvider>
  );
}

MyApp.getInitialProps = async () => {
  const settings_data = await sanityClient.fetch(
    `*[_type=='settings']{orgnizationName,orgnizationName_cn,address,phone,social[]->,businessHours,abbreviation,exhibitions,news,about,artists}`
  );
  //console.log(data);

  return { settings_data };
};

export default appWithTranslation(MyApp);
