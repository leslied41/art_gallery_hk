import sanityClient from "../client.js";
import NewsList from "../components/news_list/NewsList.jsx";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import { useRouter } from "next/router";
import Heads from "../components/head/Heads.jsx";
import ControlBtn from "../components/popup_control/ControlBtn.jsx";

export default function Press({ newsPageData, settings_data }) {
  const { briefSection, seo, recommend_list, recommend_list_reorder } =
    newsPageData;
  const router = useRouter();
  //console.log(recommend_list_reorder);
  //default order
  recommend_list.sort(function (a, b) {
    let dateA = new Date(a._createdAt).getTime();
    //console.log(dateA);
    let dateB = new Date(b._createdAt).getTime();
    return dateA - dateB;
  });
  //reorder recommendation list
  if (typeof recommend_list_reorder === "boolean") {
    if (recommend_list_reorder == true) {
      recommend_list.sort(function (a, b) {
        let dateA = new Date(a.publication_time).getTime();
        let dateB = new Date(b.publication_time).getTime();
        //console.log(dateA);
        return dateB - dateA;
      });
    }
    if (recommend_list_reorder == false) {
      recommend_list.sort(function (a, b) {
        let dateA = new Date(a.publication_time).getTime();
        let dateB = new Date(b.publication_time).getTime();
        //console.log(dateA);
        return dateA - dateB;
      });
    }
  }
  return (
    <>
      <Heads
        seo={seo}
        name={router.locale == "en" ? "Recommended" : "推薦"}
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
            <NewsList newsData={recommend_list} />
          </div>
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const newsPageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Recommended']{briefSection,seo,recommend_list,recommend_list_reorder}[0]`
  );
  const settings_data = await sanityClient.fetch(
    `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`
  );
  return {
    props: {
      newsPageData,
      settings_data,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}

Press.getLayout = function getLayout(page) {
  return <>{page}</>;
};
