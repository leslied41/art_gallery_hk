import styles from "./ProjectList.module.css";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import LoadMoreCard from "../loadMoreCard/LoadMoreCard";
import { SingleProject } from "./SingleProject";

const ProjectList = ({ projectsData }) => {
  const [loaded, setloaded] = useState(true);
  const [slicedProjectData, setslicedProjectData] = useState(projectsData || []);
  const router = useRouter();
  
  useEffect(() => {
    if (!projectsData) return;
    
    if (projectsData.length < 11) {
      setloaded(false);
    } else if (projectsData.length >= 11) {
      setloaded(true);
    }
  }, [projectsData?.length]);

  useEffect(() => {
    if (!projectsData) return;
    
    const initialProjectData = projectsData.slice(0, 10);
    setslicedProjectData(initialProjectData);
  }, [projectsData]);

  const loadMore = () => {
    if (!projectsData) return;
    setslicedProjectData(projectsData);
    setloaded(!loaded);
  };

  return (
    <section className={styles.grid}>
      {slicedProjectData.map((project, index) => {
        return (
          <Fragment key={index}>
            <SingleProject project={project} />
          </Fragment>
        );
      })}
        <div className={`${styles.full} mb-42`}>
          <LoadMoreCard loaded={loaded} loadMore={loadMore} full={true} />
        </div>
    </section>
  );
};

export default ProjectList;
