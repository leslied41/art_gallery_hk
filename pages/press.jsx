import sanityClient from "../client.js";
import NewsList from "../components/news_list/NewsList.jsx";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import { useRouter } from "next/router";
import Heads from "../components/head/Heads.jsx";
import ControlBtn from "../components/popup_control/ControlBtn.jsx";

export default function Press({ newsPageData, newsData }) {
  const { briefSection, seo } = newsPageData;
  const router = useRouter();
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "Recommended" : "推薦"} />
      <ControlBtn />
      <main className="mb-145 layout ">
        <div className={router.locale}>
          <div className="section mt-145">
            <StaticCard data={briefSection} />
          </div>
          <div className="section mt-145">
            <NewsList newsData={newsData} />
          </div>
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const newsPageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Recommended']{briefSection,seo}[0]`
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
}

Press.getLayout = function getLayout(page) {
  return <>{page}</>;
};