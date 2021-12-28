import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import sanityClient from "../client.js";
import NewsList from "../components/news_list/NewsList.jsx";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import { useRouter } from "next/router";
import Heads from "../components/head/Heads.jsx";
import { useEffect } from "react";
import { useGlobalSettings } from "../components/context/GlobalSettings.jsx";

export default function News({ newsPageData, newsData }) {
  const { briefSection, seo } = newsPageData;
  const router = useRouter();
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;
  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);
  //console.log(popup_path);
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "News" : "新聞"} />
      <main>
        <div className="section mt-145">
          <StaticCard data={briefSection} />
        </div>
        <div className="section mt-145">
          <NewsList newsData={newsData} />
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const newsPageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='News']{briefSection,seo}[0]`
  );
  const newsData = await sanityClient.fetch(`*[_type=='news']`);
  return {
    props: {
      newsPageData,
      newsData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}
