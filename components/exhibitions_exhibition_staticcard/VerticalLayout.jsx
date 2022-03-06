import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./VerticalLayout.module.css";
import { useRouter } from "next/router";
import { usePortableText } from "../usehooks/usePortableText.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const VerticalLayout = ({
  name,
  name_cn,
  image,
  work_parameter,
  video,

  introduction,
  introduction_cn,

  index,
  getIndex,
}) => {
  const router = useRouter();
  //console.log(12345);
  //console.log(width, height);
  return (
    <>
      <div>
        <div className="oneColumn">
          <div className={styles.topcontainer}>
            {image && (
              <img
                key={index}
                src={urlFor(image.asset).url()}
                alt={image.asset._ref}
                className={styles.img}
                onClick={() => {
                  getIndex(index);
                }}

                // layout="fill"
                // objectPosition="60% 40%"
                //when using layout fill, its parent element must be position relative and its parent must have a height.
              />
            )}
          </div>
        </div>
        <div className="mt-30">
          <div className={styles.grid}>
            <div className="col">
              {work_parameter && (
                <span className="h4">{usePortableText(work_parameter)}</span>
              )}
            </div>
            <div className="col">
              {(name || name_cn) && (
                <>
                  <p className="h2">{router.locale == "en" ? name : name_cn}</p>
                  <div className="mt-30"></div>
                </>
              )}

              <div className="h3">
                {(introduction || introduction_cn) &&
                  usePortableText(
                    router.locale == "en" ? introduction : introduction_cn
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VerticalLayout;
