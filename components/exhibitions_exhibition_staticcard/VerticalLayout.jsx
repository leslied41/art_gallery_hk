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
  const intro_portableText = usePortableText(
    router.locale == "en" ? introduction : introduction_cn
  );
  const parameter_portableText = usePortableText(work_parameter);
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
              />
            )}
          </div>
        </div>
        <div className="mt-30">
          <div className={styles.grid}>
            <div className="col">
              {work_parameter && (
                <span className="h4">{parameter_portableText}</span>
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
                {(introduction || introduction_cn) && intro_portableText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VerticalLayout;
