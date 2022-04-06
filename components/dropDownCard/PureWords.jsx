import styles from "./PureWords.module.css";
import { useRouter } from "next/router";
import Collapsible from "../collapsible/Collapsible";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";
import { usePortableText } from "../usehooks/usePortableText";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const PureWords = ({ data, handleClick }) => {
  const router = useRouter();

  const { content, content_cn, image } = data;
  const { showCard } = useContext(dropDownContext);
  const portableText = usePortableText(
    router.locale === "en" ? content : content_cn
  );
  return (
    <>
      <Collapsible showCard={showCard}>
        <div className={styles.grid}>
          <div className="col">
            {image && (
              <div>
                <img
                  src={urlFor(image.asset).url()}
                  alt={image.asset._ref}
                  style={{ width: "100%", cursor: "pointer" }}
                />
              </div>
            )}
          </div>
          <div className="col">
            <div className="mt-28">
              <span className="h3">{portableText}</span>
            </div>
          </div>
        </div>
      </Collapsible>
    </>
  );
};
export default PureWords;
