import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import sanityClient from "../../client.js";

export default function Expo({ expoData }) {
  return <h1>{expoData[0].name_exo}</h1>;
}

export async function getStaticProps({ locale, params }) {
  const expoData = await sanityClient.fetch(
    `*[slug.current=='${params.slug}']`
  );
  return {
    props: {
      expoData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
export async function getStaticPaths() {
  const allExpoData = await sanityClient.fetch(`*[_type=='exhibition']`);
  const path_en = allExpoData.map((expo) => {
    return { params: { slug: expo.slug.current }, locale: "en" };
  });
  const path_tc = allExpoData.map((expo) => {
    return { params: { slug: expo.slug.current }, locale: "tc" };
  });
  const paths = path_en.concat(path_tc);
  //for the automatically created paths, different locales path were not created, it is essential to add
  //different locale path. Otherwise, this localiztion will not work.

  return {
    paths,
    fallback: false,
  };
}
