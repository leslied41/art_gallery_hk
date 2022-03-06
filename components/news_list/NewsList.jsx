import styles from "./NewsList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadMoreCard from "../loadMoreCard/LoadMoreCard";
import { SingleNews } from "./SingleNews";

const NewsList = ({ newsData }) => {
  //console.log(newsData);
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
    <>
      {slicedNewsData.map((news, index) => {
        return (
          <div key={index}>
            <SingleNews news={news} />
          </div>
        );
      })}
      <div className={styles.grid}>
        <div className="col mb-42">
          <LoadMoreCard loaded={loaded} loadMore={loadMore} />
        </div>
        <div className="col mb-42"></div>
      </div>
    </>
  );
};

export default NewsList;
