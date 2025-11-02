import S_layout from "../components/s_layout/S_layout";
import Heads from "../components/head/Heads.jsx";
import sanityClient from "../client.js";
import { useRouter } from "next/router";
import { study_page_data, study_settings_data } from "../groq";

export default function Publications({ pageData, settings_data }) {
  const router = useRouter();
  const seo = pageData?.seo;
  
  return (
    <>
      <Heads
        seo={seo}
        name={router.locale == "en" ? "Study" : "研究"}
        settings_data={settings_data}
      />
    </>
  );
}
Publications.getLayout = function getLayout(page) {
  return <S_layout>{page}</S_layout>;
};
export async function getStaticProps({ locale }) {
  const pageDataPromise = sanityClient.fetch(study_page_data);
  const settings_dataPromise = sanityClient.fetch(study_settings_data);

  const [pageData, settings_data] = await Promise.all([
    pageDataPromise,
    settings_dataPromise,
  ]);

  return {
    props: {
      pageData,
      settings_data,
    },
    revalidate: 10,
  };
}
