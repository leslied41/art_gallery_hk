import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./HorizontalLayout.module.css";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
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
}) => {
  console.log(name);
  return (
    <>
      <div>
        <div className="twoColumn-11">
          <div className="col">
            <div className={styles.imgcontainer}>
              <img
                src={urlFor(image.asset).url()}
                alt="works"
                className={styles.img}
              />
            </div>
            <div>
              <span className="h5">
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
              <p className="h3">{name}</p>
              <div className="h4">
                {introduction && (
                  <BlockContent
                    blocks={introduction}
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                )}
              </div>
            </div>
          </div>
          {/* <div className={styles.topcontainer}>
            <img
              src={urlFor(image.asset).url()}
              alt="works"
              className={styles.img}
            />
          </div> */}
        </div>
        {/* <div className="twoColumn-11 mt-22">
          <div className="col">
            <span className="h5">
              <BlockContent
                blocks={image_parameter}
                projectId="z3dq9mvc"
                dataset="production"
              />
            </span>
          </div>
          <div className="col">
            <span className="h4">
              <BlockContent
                blocks={introduction}
                projectId="z3dq9mvc"
                dataset="production"
              />
            </span>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default HorizontalLayout;