import sanityClient from "../client.js";
import StaticCard from "../components/staticCard/StaticCard.jsx";
import { useRouter } from "next/router";
import Heads from "../components/head/Heads.jsx";
import ControlBtn from "../components/popup_control/ControlBtn.jsx";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import InterviewsList from "../components/dropDownCard/InterviewsList.jsx";

export default function Recommended({ pageData }) {
  const { briefSection, seo, press_list } = pageData;

  const router = useRouter();
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "Press" : "新聞"} />
      <ControlBtn />
      <main className="mb-145 layout ">
        <div className={router.locale}>
          <div className="section mt-145">
            <StaticCard data={briefSection} />
          </div>
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

  //const newsData = await sanityClient.fetch(`*[_type=='news']`);
  return {
    props: {
      pageData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}

Recommended.getLayout = function getLayout(page) {
  return <>{page}</>;
};
