import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ExStaticCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import VerticalLayout from "./VerticalLayout.jsx";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const ExStaticCard = ({ data }) => {
  const {
    name_exo,
    name_exo_cn,
    date,
    date_cn,
    image,
    image_parameter,
    introduction,
    introduction_cn,
  } = data;
  console.log("exstaticcard");
  console.log(image);
  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <div>
            <span className="h1">{name_exo}</span>
          </div>
          <div className="mt-22">
            <span className="h4">{date}</span>
          </div>
        </div>
      </div>
      <div className="mt-89">
        <VerticalLayout
          image={image}
          image_parameter={image_parameter}
          introduction={introduction}
          introduction_cn={introduction_cn}
        />
      </div>
    </>
  );
};
export default ExStaticCard;
