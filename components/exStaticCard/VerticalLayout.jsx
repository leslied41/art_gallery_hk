import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./VerticalLayout.module.css";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
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
  console.log(12345);
  console.log(image);
  return (
    <>
      <div>
        <div className="oneColumn">
          <div className={styles.topcontainer}>
            <Image
              src={urlFor(image.asset).url()}
              alt="works"
              className={styles.img}
              // layout="fill"
              objectFit="cover"
              // objectPosition="60% 40%"
              //when using layout fill, its parent element must be position relative and its parent must have a height.
              layout="responsive"
              width="1200"
              height="500"
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
            <div className="h4">
              <BlockContent
                blocks={introduction}
                projectId="z3dq9mvc"
                dataset="production"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VerticalLayout;
