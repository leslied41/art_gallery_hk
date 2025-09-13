import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import sanityClient from "../client.js";
import StaticCard from "../components/staticCard/StaticCard";
import ProjectList from "../components/project_list/ProjectList";
import Heads from "../components/head/Heads.jsx";
import { usePathHistory } from "../components/context/PathHistory";
import {
  projects_page_data,
  projects_data,
} from "../groq";

export default function Project({
  projectsData,
  projectsPageData,
}) {
  const router = useRouter();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();
  const { briefSection, seo } = projectsPageData[0] || {};

  useEffect(() => {
    // scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "Fair Projects" : "博覽項目"} />
      <div>
        {briefSection && (
          <div className="section mt-145">
            <StaticCard data={briefSection} fowardref={scrollTo} Component="h1" />
          </div>
        )}
        <div className="section mt-145">
          <ProjectList projectsData={projectsData} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  const projectsPageDataPromise = sanityClient.fetch(projects_page_data);
  const projectsDataPromise = sanityClient.fetch(projects_data);

  const [projectsPageData, projectsData] = await Promise.all([
    projectsPageDataPromise,
    projectsDataPromise,
  ]);

  return {
    props: {
      projectsPageData,
      projectsData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
};
