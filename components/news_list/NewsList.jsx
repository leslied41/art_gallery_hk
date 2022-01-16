import styles from "./NewsList.module.css";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import { useEffect, useState } from "react";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from "next/router";
import LoadMoreCard from "../loadMoreCard/LoadMoreCard";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const NewsList = ({ newsData }) => {
  //console.log(newsData);
  const [loaded, setloaded] = useState(true);
  const [slicedNewsData, setslicedNewsData] = useState(newsData);
  const router = useRouter();
  //console.log(router.locale);
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
      {slicedNewsData.map((news) => {
        const {
          _id,
          content,
          content_cn,
          title,
          title_cn,
          news_brief,
          news_brief_cn,
          image,
          news_link,
        } = news;
        return (
          <div className={styles.grid} key={_id}>
            <div className="col mb-42">
              <a
                href={news_link ? news_link : null}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <Image
                    src={urlFor(image.asset).width(654).height(437).url()}
                    alt="works"
                    objectFit="cover"
                    layout="responsive"
                    width="654"
                    height="437"
                  />
                </div>
              </a>
            </div>
            <div className="col mb-42">
              <a
                href={news_link ? news_link : null}
                target="_blank"
                rel="noreferrer"
              >
                <p className="h2">{router.locale == "en" ? title : title_cn}</p>
                <div className="h3 mt-30">
                  <BlockContent
                    blocks={router.locale == "en" ? news_brief : news_brief_cn}
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                </div>
              </a>
            </div>
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
