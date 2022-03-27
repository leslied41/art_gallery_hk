import sanityClient from "../client.js";
import NewsList from "../components/news_list/NewsList.jsx";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import { useRouter } from "next/router";
import Heads from "../components/head/Heads.jsx";
import ControlBtn from "../components/popup_control/ControlBtn.jsx";

export default function Press({ newsPageData }) {
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
      <Heads seo={seo} name={router.locale == "en" ? "Recommended" : "推薦"} />
      <ControlBtn />
      <main className="mb-145 layout ">
        <div className="section mt-145">
          <StaticCard data={briefSection} />
        </div>
        <div className="section mt-145">
          <NewsList newsData={recommend_list} />
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const newsPageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Recommended']{briefSection,seo,recommend_list,recommend_list_reorder}[0]`
  );
  return {
    props: {
      newsPageData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}

Press.getLayout = function getLayout(page) {
  const router = useRouter();

  return (
    <>
      <div className={router.locale}>{page}</div>
    </>
  );
};
