import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./VerticalLayout.module.css";
import BlockContent from "@sanity/block-content-to-react";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const VerticalLayout = ({
  name,
  name_cn,
  image,
  image_parameter,
  introduction,
  introduction_cn,
}) => {
  return (
    <>
      <div>
        <div className="oneColumn">
          <div className={styles.topcontainer}>
            <img
              src={urlFor(image.asset).url()}
              alt="works"
              className={styles.img}
            />
          </div>
        </div>
        <div className="twoColumn-11 mt-22">
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
            <p className="h3">{name}</p>
            <p className="h4">
              <BlockContent
                blocks={introduction}
                projectId="z3dq9mvc"
                dataset="production"
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default VerticalLayout;
