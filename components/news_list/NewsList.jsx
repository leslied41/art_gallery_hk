import styles from "./NewsList.module.css";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import LoadMoreCard from "../loadMoreCard/LoadMoreCard";
import { SingleNews } from "./SingleNews";

const NewsList = ({ newsData }) => {
  const [loaded, setloaded] = useState(true);
  const [slicedNewsData, setslicedNewsData] = useState(newsData);
  const router = useRouter();
  useEffect(() => {
    if (newsData.length < 11) {
      setloaded(false);
    } else if (newsData.length >= 11) {
      setloaded(true);
    }
  }, [newsData.length]);

  useEffect(() => {
    const initialNewsData = newsData.slice(0, 10);
    setslicedNewsData(initialNewsData);
  }, []);

  const loadMore = () => {
    setslicedNewsData(newsData);
    setloaded(!loaded);
  };

  return (
    <section>
      {slicedNewsData.map((news, index) => {
        return (
          <Fragment key={index}>
            <SingleNews news={news} />
          </Fragment>
        );
      })}
      <div className={styles.grid}>
        <div className="col mb-42">
          <LoadMoreCard loaded={loaded} loadMore={loadMore} />
        </div>
        <div className="col mb-42"></div>
      </div>
    </section>
  );
};

export default NewsList;
