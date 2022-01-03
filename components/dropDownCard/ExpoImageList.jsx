import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import { useState, useContext, useEffect } from "react";
import styles from "./ExpoImageList.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import LoadMoreCard from "../loadMoreCard/LoadMoreCard.jsx";
import Collapsible from "../collapsible/Collapsible.jsx";
import { dropDownContext } from "./DropDownCard";
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const ExpoImageList = ({ data }) => {
  const { showCard } = useContext(dropDownContext);
  const router = useRouter();
  const [loaded, setloaded] = useState(true);

  useEffect(() => {
    if (data.length < 5) {
      setloaded(false);
    } else if (data.length >= 5) {
      setloaded(true);
    }
  }, [data.length, showCard]);

  const [slicedExhibition, setSlicedExhibition] = useState(data);
  useEffect(() => {
    const initialExhibition = data.slice(0, 4);
    setSlicedExhibition(initialExhibition);
  }, [showCard]);
  const loadMore = () => {
    setSlicedExhibition(data);
    setloaded(!loaded);
  };

  return (
    <>
      <Collapsible showCard={showCard} loaded={loaded} delay={true}>
        <>
          {data.length === 0 ? (
            <div className={styles.grid}>
              <div className="col"></div>
              <div className="col mt-30">
                <div className="h3">To be announced</div>
              </div>
            </div>
          ) : (
            slicedExhibition.map((item, index) => {
              const { name_exo, name_exo_cn, date, date_cn, image, slug, _id } =
                item;

              return (
                <div className={styles.grid} key={index}>
                  <Link href={"/exhibitions/" + slug.current}>
                    <div className="col mt-30">
                      <div style={{ cursor: "pointer" }}>
                        <img
                          src={urlFor(image.asset).width(624).height(437).url()}
                          alt={name_exo}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="col mt-30">
                    <Link href={"/exhibitions/" + slug.current}>
                      <div style={{ cursor: "pointer" }}>
                        <p className="h2">
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
            })
          )}
          <div className={styles.grid}>
            <div className="col mt-30">
              <LoadMoreCard loaded={loaded} loadMore={loadMore} />
            </div>
            <div className="col mt-30">
              <div></div>
            </div>
          </div>
        </>
      </Collapsible>
    </>
  );
};
export default ExpoImageList;
