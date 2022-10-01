import sanityClient from "../client.js";
import NewsList from "../components/news_list/NewsList.jsx";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import { useRouter } from "next/router";
import Heads from "../components/head/Heads.jsx";
import ControlBtn from "../components/popup_control/ControlBtn.jsx";
import useSort from "../components/usehooks/useSort.js";
import { recommended_page_data, recommended_settings_data } from "../groq";

export default function Press({ recommendedPageData, settings_data }) {
  const { briefSection, seo, recommend_list, recommend_list_reorder } =
    recommendedPageData;
  const router = useRouter();
  const sorted_recommend_list = useSort(recommend_list, recommend_list_reorder);

  return (
    <>
      <Heads
        seo={seo}
        name={router.locale == "en" ? "Recommended" : "推薦"}
        settings_data={settings_data}
      />
      <ControlBtn />
      <div className="mb-145 layout ">
        <div className={router.locale}>
          {briefSection && (
            <div className="section study-mt-145">
              <StaticCard data={briefSection} Component="h1" />
            </div>
          )}
          <div className="section mt-145">
            <NewsList newsData={sorted_recommend_list} />
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const recommendedPageData = await sanityClient.fetch(recommended_page_data);
  const settings_data = await sanityClient.fetch(recommended_settings_data);
  return {
    props: {
      recommendedPageData,
      settings_data,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}

Press.getLayout = function getLayout(page) {
  return <>{page}</>;
};
