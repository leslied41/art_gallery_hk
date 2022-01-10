import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./HorizontalLayout.module.css";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import { useRouter } from "next/router";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const HorizontalLayout = ({
  name,
  name_cn,
  image,
  image_parameter,
  introduction,
  introduction_cn,
  width,
  height,
  index,
  getIndex,
}) => {
  const router = useRouter();
  return (
    <>
      <div>
        <div className={styles.grid}>
          <div className="col">
            <div className={styles.imgcontainer}>
              {image && (
                <img
                  key={index}
                  src={urlFor(image.asset).url()}
                  alt={image.asset._ref}
                  style={{ width: "100%" }}
                  // layout="responsive"
                  // width="100%"
                  // height="100%"
                  // objectFit="cover"
                  onClick={() => {
                    getIndex(index);
                  }}
                />
              )}
            </div>
            <div className="mt-30">
              <span className="h4">
                {image_parameter && (
                  <BlockContent
                    blocks={image_parameter}
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                )}
              </span>
            </div>
          </div>
          <div className="col">
            <div>
              {(name || name_cn) && (
                <>
                  <p className="h2">{router.locale == "en" ? name : name_cn}</p>
                  <div className="mt-30"></div>
                </>
              )}
              <div className="h3">
                {introduction && (
                  <BlockContent
                    blocks={
                      router.locale == "en" ? introduction : introduction_cn
                    }
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HorizontalLayout;
