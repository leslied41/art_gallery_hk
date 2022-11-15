import { useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import sanityClient from "../client.js";
import NewsList from "../components/news_list/NewsList.jsx";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import Heads from "../components/head/Heads.jsx";
import { usePathHistory } from "../components/context/PathHistory.jsx";
import useSort from "../components/usehooks/useSort.js";
import { news_page_data, news_data } from "../groq";

export default function News({ newsPageData, newsData }) {
  const { briefSection, seo, news_list_reorder } = newsPageData;
  const router = useRouter();
  const scrollTo = useRef();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;

  const sorted_newsData = useSort(newsData, news_list_reorder);

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "News" : "新聞"} />
      <div>
        <div className="section mt-145">
          <StaticCard data={briefSection} fowardref={scrollTo} Component="h1" />
        </div>
        <div className="section mt-145">
          <NewsList newsData={sorted_newsData} />
        </div>
      </div>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const newsPageDataPromise = sanityClient.fetch(news_page_data);
  const newsDataPromise = sanityClient.fetch(news_data);

  const [newsPageData, newsData] = await Promise.all([
    newsPageDataPromise,
    newsDataPromise,
  ]);

  return {
    props: {
      newsPageData,
      newsData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}
