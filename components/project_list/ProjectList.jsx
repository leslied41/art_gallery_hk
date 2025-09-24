import styles from "./ProjectList.module.css";
import { useEffect, useState, Fragment, useMemo } from "react";
import { useRouter } from "next/router";
import LoadMoreCard from "../loadMoreCard/LoadMoreCard";
import { SingleProject } from "./SingleProject";

// Helper to extract the start date from English or Chinese date string
function getStartDateTimestamp(project) {
  const enDate = project.date;
  const cnDate = project.date_cn;

  // Try English format: e.g. "March 24–30, 2025"
  if (enDate && typeof enDate === "string") {
    // Match: Month Day–Day, Year  OR  Month Day, Year
    // e.g. "March 24–30, 2025" or "March 24, 2025"
    const enMatch = enDate.match(
      /^([A-Za-z]+)\s+(\d{1,2})(?:–\d{1,2})?,\s*(\d{4})$/
    );
    if (enMatch) {
      // enMatch[1]: Month, enMatch[2]: Start Day, enMatch[3]: Year
      const month = enMatch[1];
      const day = enMatch[2];
      const year = enMatch[3];
      const dateStr = `${month} ${day}, ${year}`;
      const dateObj = new Date(dateStr);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.getTime();
      }
    }
  }

  // Try Chinese format: e.g. "2025年3月24日至30日"
  if (cnDate && typeof cnDate === "string") {
    // Match: YYYY年M月D日
    // e.g. "2025年3月24日至30日" or "2025年3月24日"
    const cnMatch = cnDate.match(
      /^(\d{4})年(\d{1,2})月(\d{1,2})日/
    );
    if (cnMatch) {
      const year = cnMatch[1];
      const month = cnMatch[2];
      const day = cnMatch[3];
      // JS Date: month is 0-based
      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
      if (!isNaN(dateObj.getTime())) {
        return dateObj.getTime();
      }
    }
  }

  // Fallback: try to parse as YYYY-MM-DD or just year
  const fallback = enDate || cnDate || "";
  if (/^\d{4}$/.test(fallback)) {
    // Only year
    const dateObj = new Date(`${fallback}-01-01`);
    return isNaN(dateObj.getTime()) ? 0 : dateObj.getTime();
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(fallback)) {
    const dateObj = new Date(fallback);
    return isNaN(dateObj.getTime()) ? 0 : dateObj.getTime();
  }

  return 0;
}

const ProjectList = ({ projectsData }) => {
  const [loaded, setloaded] = useState(true);
  const [slicedProjectData, setslicedProjectData] = useState([]);
  const router = useRouter();

  // Memoize sorted projectsData chronologically (most recent first)
  const sortedProjectsData = useMemo(() => {
    if (!projectsData) return [];
    // Sort descending (most recent first)
    return [...projectsData].sort(
      (a, b) => getStartDateTimestamp(b) - getStartDateTimestamp(a)
    );
  }, [projectsData]);

  useEffect(() => {
    if (!sortedProjectsData) return;

    if (sortedProjectsData.length < 11) {
      setloaded(false);
    } else if (sortedProjectsData.length >= 11) {
      setloaded(true);
    }
  }, [sortedProjectsData.length]);

  useEffect(() => {
    if (!sortedProjectsData) return;

    const initialProjectData = sortedProjectsData.slice(0, 10);
    setslicedProjectData(initialProjectData);
  }, [sortedProjectsData]);

  const loadMore = () => {
    if (!sortedProjectsData) return;
    setslicedProjectData(sortedProjectsData);
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
