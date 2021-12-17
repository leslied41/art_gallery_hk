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
}) => {
  const router = useRouter();
  return (
    <>
      <div>
        <div className={styles.grid}>
          <div className="col">
            <div className={styles.imgcontainer}>
              <Image
                src={urlFor(image.asset).url()}
                alt="works"
                width={width}
                height={height}
                layout="intrinsic"
              />
            </div>
            <div className="mt-30">
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
              <p className="h3">{router.locale == "en" ? name : name_cn}</p>
              <div className="h4 mt-30">
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
