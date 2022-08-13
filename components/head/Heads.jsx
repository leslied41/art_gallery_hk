import Head from "next/head";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import { useGlobalSettings } from "../context/GlobalSettings";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const Heads = ({ seo, name }) => {
  //console.log(seo);
  const { settings } = useGlobalSettings();
  const { site_name, site_name_cn } = settings[0] ?? {};
  const keywords = seo?.keywords?.map((item) => item.value).join();
  const router = useRouter();
  //console.log(router.asPath);
  return (
    <>
      <Head>
        <title>
          {router.locale == "en"
            ? `${site_name}${name ? "-" + name : ""}`
            : `${site_name_cn ? site_name_cn : site_name}${
                name ? "-" + name : ""
              }`}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" key="description" content={seo?.description} />
        <meta name="keywords" key="keywords" content={keywords} />
        {/* social media sharing */}
        <meta
          name="og:title"
          key="og:title"
          content={
            router.locale == "en"
              ? `${site_name}${name ? "-" + name : ""}`
              : `${site_name_cn ? site_name_cn : site_name}${
                  name ? "-" + name : ""
                }`
          }
        />
        <meta property="og:site_name" key="og:site_name" content={site_name} />
        <meta
          property="og:url"
          key="og:url"
          content={`${seo?.url}${router.asPath}`}
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:image"
          key="og:image"
          content={
            seo?.preview_image ? urlFor(seo.preview_image.asset).url() : null
          }
        />
        <meta
          property="og:description"
          key="og:description"
          content={seo?.description}
        />
        {/* twitter sharing */}
        <meta
          name="twitter:url"
          key="twitter:url"
          content={`${seo?.url}${router.asPath}`}
        />
        <meta name="twitter:card" key="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          key="twitter:title"
          content={
            router.locale == "en"
              ? `${site_name}${name ? "-" + "" + name : ""}`
              : `${site_name_cn ? site_name_cn : site_name}${
                  name ? "-" + "" + name : ""
                }`
          }
        />
        <meta
          name="twitter:description"
          key="twitter:description"
          content={seo?.description}
        />
        <meta
          name="twitter:image"
          key="twitter:image"
          content={
            seo?.preview_image ? urlFor(seo.preview_image.asset).url() : null
          }
        />
      </Head>
    </>
  );
};
export default Heads;
