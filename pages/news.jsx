import sanityClient from "../client.js";
import NewsList from "../components/news_list/NewsList.jsx";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import { useRouter } from "next/router";
import Heads from "../components/head/Heads.jsx";
import { useEffect, useRef } from "react";
import { useGlobalSettings } from "../components/context/GlobalSettings.jsx";

export default function News({ newsPageData, newsData }) {
  //console.log(newsData);
  const { briefSection, seo, news_list_reorder } = newsPageData;
  //console.log(news_list_reorder);
  const router = useRouter();
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();
  newsData.sort(function (a, b) {
    let dateA = new Date(a._createdAt).getTime();
    //console.log(dateA);
    let dateB = new Date(b._createdAt).getTime();
    return dateA - dateB;
  });

  //console.log(news_list_reorder);
  if (typeof news_list_reorder === "boolean") {
    if (news_list_reorder == true) {
      newsData.sort(function (a, b) {
        let dateA = new Date(a.publication_time).getTime();
        let dateB = new Date(b.publication_time).getTime();
        //console.log(dateA);
        return dateB - dateA;
      });
    }
    if (news_list_reorder == false) {
      newsData.sort(function (a, b) {
        let dateA = new Date(a.publication_time).getTime();
        let dateB = new Date(b.publication_time).getTime();
        //console.log(dateA);
        return dateA - dateB;
      });
    }
  }
  //console.log(newsData);
  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);
  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);
  //console.log(popup_path);
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "News" : "新聞"} />
      <main>
        <div className="section mt-145">
          <StaticCard data={briefSection} fowardref={scrollTo} />
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
    `*[_type=='pages'&&name=='News']{briefSection,seo,news_list_reorder}[0]`
  );
  const newsData = await sanityClient.fetch(`*[_type=='news']`);
  return {
    props: {
      newsPageData,
      newsData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
  //console.log(newsData);
}
