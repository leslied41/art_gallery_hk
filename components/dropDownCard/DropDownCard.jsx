import styles from "./DropDownCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useState, useContext, useEffect } from "react";
import { I18nContext } from "react-i18next";
import { i18n } from "next-i18next";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function DropDownCard({ data }) {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  let Name;
  let Content;
  console.log(data);
  const { name, name_cn, content, content_cn } = data;
  //judge if the data has images
  //const containImage = data.find((expo) => expo.image.lenth != 0);

  if (i18n.language === "en") {
    Name = name;
    Content = content;
  } else if (i18n.language === "tc") {
    Name = name_cn;
    Content = content_cn;
  }
  const [showCard, setshowCard] = useState(false);
  const handleClick = () => {
    setshowCard(!showCard);
  };

  if (content) {
    return (
      <>
        <div className="twoColumn-11">
          <div className="col"></div>
          <div className="col">
            <div className="title">
              <span className="h2" onClick={handleClick}>
                {Name} +
              </span>
            </div>
            <div>{showCard || <hr className="hr-top" />}</div>
            <div className={styles.content}>
              {showCard && (
                <span className="h3">
                  <BlockContent
                    blocks={Content}
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                </span>
              )}
            </div>
            <div>{showCard && <hr className="hr-bottom" />}</div>
          </div>
        </div>
      </>
    );
  }
  if (!content) {
    const [loaded, setloaded] = useState(true);
    useEffect(() => {
      if (data.length < 5) {
        setloaded(false);
      }
    }, []);

    const initialExhibition = data.slice(0, 4);
    const [slicedExhibition, setSlicedExhibition] = useState(initialExhibition);
    const loadMore = () => {
      setSlicedExhibition(data);
      setloaded(!loaded);
    };
    return (
      <>
        <div className="twoColumn-11">
          <div className="col"></div>
          <div className="col">
            <div className="title">
              <span className="h2" onClick={handleClick}>
                {i18n.language === "en"
                  ? data[0].exhibition_status
                  : data[0].exhibition_status == "Current"
                  ? "目前"
                  : "未来"}
                {showCard ? "-" : "+"}
              </span>
            </div>
            <div>{showCard || <hr className="hr-top" />}</div>
          </div>
        </div>
        {showCard && (
          <>
            {slicedExhibition.map((item, index) => {
              const { name_exo, name_exo_cn, date, date_cn, image } = item;
              return (
                <>
                  <div className="twoColumn-11" key={index}>
                    <div className="col">
                      <div className={styles.content}>
                        <img
                          src={urlFor(image.asset).width(624).height(437).url()}
                          alt={name_exo}
                          className={styles.profileImg}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className={styles.content}>
                        <p className="h3">
                          {i18n.language === "en" ? name_exo : name_exo_cn}
                        </p>
                        <p className="h3">
                          {i18n.language === "en" ? date : date_cn}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <div className="twoColumn-11">
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
  }
}
