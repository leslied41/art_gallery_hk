import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import { useState, useContext, useEffect } from "react";
import styles from "./ExpoImageList.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const ExpoImageList = ({ data, handleClick, showCard, title }) => {
  const router = useRouter();

  const [loaded, setloaded] = useState(true);

  useEffect(() => {
    if (data.length < 5) {
      setloaded(false);
    }
  }, [data.length]);

  const initialExhibition = data.slice(0, 4);
  const [slicedExhibition, setSlicedExhibition] = useState(initialExhibition);
  const loadMore = () => {
    setSlicedExhibition(data);
    setloaded(!loaded);
  };

  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <div className="title">
            <span className="h2" onClick={handleClick}>
              {/* {i18n.language === "en"
                ? data[0].exhibition_status
                : data[0].exhibition_status == "Current"
                ? "目前"
                : "未来"} */}
              {title} {showCard ? "-" : "+"}
            </span>
          </div>
          <div>{showCard || <hr className="hr-top" />}</div>
        </div>
      </div>

      {showCard && (
        <>
          {slicedExhibition.map((item, index) => {
            const { name_exo, name_exo_cn, date, date_cn, image, slug, _id } =
              item;
            // console.log(12345);
            // console.log(image);
            return (
              <div className={styles.grid} key={index}>
                <Link href={"/exhibitions/" + slug.current}>
                  <div className="col">
                    <div
                      className={styles.content}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={urlFor(image.asset).width(624).height(437).url()}
                        alt={name_exo}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </Link>
                <div className="col">
                  <Link href={"/exhibitions/" + slug.current}>
                    <div
                      className={styles.content}
                      style={{ cursor: "pointer" }}
                    >
                      <p className="h3">
                        {router.locale === "en" ? name_exo : name_exo_cn}
                      </p>
                      <p className="h3">
                        {router.locale === "en" ? date : date_cn}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className={styles.grid}>
            <div className="col">
              <div className={styles.content}>
                {loaded && (
                  <div className={styles.darkSquare}>
                    <span className={styles.loadmore} onClick={loadMore}>
                      Load More+
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div className={styles.content}></div>
            </div>
            <div className="col"></div>
            <div className="col">
              <div>{showCard && <hr className="hr-bottom" />}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ExpoImageList;
