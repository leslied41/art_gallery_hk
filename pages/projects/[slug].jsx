import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import sanityClient from "../../client.js";
import ExListWorks from "../../components/dropDownCard/ExListWorks.jsx";
import ExStaticCard from "../../components/exhibitions_exhibition_staticcard/ExStaticCard.jsx";
import Heads from "../../components/head/Heads.jsx";
import { usePathHistory } from "../../components/context/PathHistory.jsx";
import { project_data, project_page_data } from "../../groq";

export default function Expo({ projectData, projectPageData }) {
  const router = useRouter();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();
  const { seo } = projectPageData || {};
  const { name_project, name_project_cn } = projectData[0] || {};

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? name_project : name_project_cn} />
      <div className="section mt-145">
        <ExStaticCard data={projectData[0]} fowardref={scrollTo} Component="h1" />
      </div>

      <div className="section mt-145 mb-145">
        <ExListWorks data={projectData[0]} />
      </div>
      {JSON.stringify(projectData[0])}
    </>
  );
}

export const getServerSideProps = async ({ locale, params }) => {
  const projectData = await sanityClient.fetch(project_data(params.slug));
  const projectPageData = await sanityClient.fetch(project_page_data);
  return {
    props: {
      projectData,
      projectPageData,
    },
  };
}
