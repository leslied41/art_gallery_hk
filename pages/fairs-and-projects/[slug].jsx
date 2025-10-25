import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import sanityClient from "../../client.js";
import ProjectListWorks from "../../components/dropDownCard/ProjectListWorks.jsx";
import ProjectStaticCard from "../../components/projects_project_staticcard/ProjectStaticCard.jsx";
import Heads from "../../components/head/Heads.jsx";
import { usePathHistory } from "../../components/context/PathHistory.jsx";
import { project_data, project_page_data } from "../../groq";

export default function Project({ projectData, projectPageData }) {
  const router = useRouter();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();
  const { seo } = projectPageData[0] || {};
  const { name_project, name_project_cn } = projectData[0] || {};

  useEffect(() => {
    setTimeout(() => {
      scrollTo.current.scrollIntoView();
    }, 200);
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? name_project : name_project_cn} />
      <div className="section mt-145">
        <ProjectStaticCard data={projectData[0]} fowardref={scrollTo} Component="h1" />
      </div>

      <div className="section mt-145 mb-145">
        <ProjectListWorks data={projectData[0]} />
      </div>
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


