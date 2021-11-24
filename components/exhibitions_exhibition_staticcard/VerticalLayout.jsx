import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./VerticalLayout.module.css";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import { useRouter } from "next/router";

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
  width,
  height,
}) => {
  const router = useRouter();
  //console.log(12345);
  console.log(width, height);
  return (
    <>
      <div>
        <div className="oneColumn">
          <div className={styles.topcontainer}>
            <Image
              src={urlFor(image.asset).url()}
              width={width}
              height={height}
              alt="works"
              className={styles.img}
              layout="intrinsic"
              // layout="fill"
              // objectPosition="60% 40%"
              //when using layout fill, its parent element must be position relative and its parent must have a height.
            />
          </div>
        </div>
        <div className="mt-22">
          <div className={styles.grid}>
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
              <p className="h3">{router.locale == "en" ? name : name_cn}</p>
              <div className="h4">
                <BlockContent
                  blocks={
                    router.locale == "en" ? introduction : introduction_cn
                  }
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VerticalLayout;
