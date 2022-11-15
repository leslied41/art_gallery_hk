import { useRouter } from "next/router";
import sanityClient from "../client.js";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import Heads from "../components/head/Heads.jsx";
import ControlBtn from "../components/popup_control/ControlBtn.jsx";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import InterviewsList from "../components/dropDownCard/InterviewsList.jsx";
import { press_settings_data, press_page_data } from "../groq";

export default function Recommended({ pageData, settings_data }) {
  const { briefSection, seo, press_list } = pageData;

  const router = useRouter();
  return (
    <>
      <Heads
        seo={seo}
        name={router.locale == "en" ? "Press" : "新聞"}
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
            <DropDownCard
              title={router.locale == "en" ? "Press" : "新聞"}
              Component="h2"
            >
              <InterviewsList data={press_list} />
            </DropDownCard>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const pageDataPromise = sanityClient.fetch(press_page_data);
  const settings_dataPromise = sanityClient.fetch(press_settings_data);

  const [pageData, settings_data] = await Promise.all([
    pageDataPromise,
    settings_dataPromise,
  ]);

  return {
    props: {
      pageData,
      settings_data,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}

Recommended.getLayout = function getLayout(page) {
  return <>{page}</>;
};
