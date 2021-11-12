import "../styles/globals.css";
import sanityClient from "../client.js";
import Layout from "../components/layout/Layout.jsx";
import { AppProvider } from "../components/context/GlobalSettings";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps, data }) {
  //console.log(data);
  return (
    <AppProvider data={data}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

MyApp.getInitialProps = async () => {
  const data = await sanityClient.fetch(
    `*[_type=='settings']{orgnizationName,orgnizationName_cn,address,phone,social[]->,businessHours,abbreviation,exhibitions,news,about,artists}`
  );
  //console.log(data);

  return { data };
};

export default appWithTranslation(MyApp);
