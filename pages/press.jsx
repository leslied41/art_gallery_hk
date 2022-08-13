import sanityClient from "../client.js";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import { useRouter } from "next/router";
import Heads from "../components/head/Heads.jsx";
import ControlBtn from "../components/popup_control/ControlBtn.jsx";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import InterviewsList from "../components/dropDownCard/InterviewsList.jsx";

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
      <main className="mb-145 layout ">
        <div className={router.locale}>
          {briefSection && (
            <div className="section study-mt-145">
              <StaticCard data={briefSection} />
            </div>
          )}
          <div className="section mt-145">
            <DropDownCard title={router.locale == "en" ? "Press" : "新聞"}>
              <InterviewsList data={press_list} />
            </DropDownCard>
          </div>
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const pageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Gallery Press'][0]{briefSection, seo, press_list[]->}`
  );
  const settings_data = await sanityClient.fetch(
    `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`
  );
  //const newsData = await sanityClient.fetch(`*[_type=='news']`);
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
