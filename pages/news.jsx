import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import sanityClient from "../client.js";
import NewsList from "../components/newsList/NewsList.jsx";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import LoadMoreCard from "../components/loadMoreCard/LoadMoreCard.jsx";

export default function News({ newsPageData, newsData }) {
  const { briefSection } = newsPageData;
  return (
    <main>
      <div className="section mt-158">
        <StaticCard data={briefSection} />
      </div>
      <div className="section mt-118">
        <NewsList newsData={newsData} />
      </div>
    </main>
  );
}
export async function getStaticProps({ locale }) {
  const newsPageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='News']{briefSection}[0]`
  );
  const newsData = await sanityClient.fetch(`*[_type=='news']`);
  return {
    props: {
      newsPageData,
      newsData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
