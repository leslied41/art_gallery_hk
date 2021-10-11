import "../styles/globals.css";
import sanityClient from "../client.js";
import Layout from "../components/layout/Layout.jsx";
import { AppProvider } from "../components/context/GlobalSettings";

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
    `*[_type=='settings']{orgnizationName,address,phone,socialMedia,businessHours,abbreviation}`
  );
  //console.log(data);

  return { data };
};

export default MyApp;
