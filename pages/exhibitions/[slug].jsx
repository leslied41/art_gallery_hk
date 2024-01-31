import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import sanityClient from "../../client.js";
import ExListWorks from "../../components/dropDownCard/ExListWorks.jsx";
import ExStaticCard from "../../components/exhibitions_exhibition_staticcard/ExStaticCard.jsx";
import Heads from "../../components/head/Heads.jsx";
import { usePathHistory } from "../../components/context/PathHistory.jsx";
import { exhibition_page_data, exhibition_data } from "../../groq";

export default function Expo({ expoData, exhiPageData }) {
  const router = useRouter();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();
  const { exhi_dropdown, seo } = exhiPageData || {};
  const { name_exo, name_exo_cn } = expoData[0] || {};

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? name_exo : name_exo_cn} />
      <div className="section mt-145">
        <ExStaticCard data={expoData[0]} fowardref={scrollTo} Component="h1" />
      </div>

      <div className="section mt-145 mb-145">
        <ExListWorks data={expoData[0]} />
      </div>
    </>
  );
}

export async function getStaticProps({ locale, params }) {
  const expoData = await sanityClient.fetch(exhibition_data(params.slug));
  const exhiPageData = await sanityClient.fetch(exhibition_page_data);
  return {
    props: {
      expoData,
      exhiPageData,

      // Will be passed to the page component as props
    },
    revalidate: 60,
  };
}
export async function getStaticPaths() {
  const allExpoData = await sanityClient.fetch(`*[_type=='exhibition']`);
  const path_en = allExpoData.map((expo) => {
    return { params: { slug: expo.slug?.current }, locale: "en" };
  });
  const path_tc = allExpoData.map((expo) => {
    return { params: { slug: expo.slug?.current }, locale: "tc" };
  });
  const paths = path_en.concat(path_tc);
  //for the automatically created paths, different locales path were not created, it is essential to add
  //different locale path. Otherwise, this localiztion will not work.

  return {
    paths,
    fallback: false,
  };
}
