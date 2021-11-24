import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ExStaticCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import VerticalLayout from "./VerticalLayout.jsx";
import HorizontalLayout from "./HorizontalLayout.jsx";
import { useRef, useCallback } from "react";
import LightGallery from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins if you need
import lgZoom from "lightgallery/plugins/zoom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const ExStaticCard = ({ data }) => {
  const lightGallery = useRef(null);
  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);
  const {
    name_exo,
    name_exo_cn,
    date,
    date_cn,
    image,
    image_parameter,
    introduction,
    introduction_cn,
    metadata,
  } = data;
  // console.log("exstaticcard");
  // console.log(data);
  const height = metadata.metadata.dimensions.height;
  const width = metadata.metadata.dimensions.width;
  const aspectRatio = metadata.metadata.dimensions.aspectRatio;

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
      <LightGallery
        plugins={[lgZoom]}
        counter={false}
        download={false}
        onInit={onInit}
        prevHtml="Pre"
        nextHtml="Next"
        actualSize={false}
        showZoomInOutIcons={true}
      >
        <div data-src={urlFor(image.asset).url()}>
          <div className="mt-89">
            {width > 750 && aspectRatio > 1 ? (
              <VerticalLayout
                image={image}
                image_parameter={image_parameter}
                introduction={introduction}
                introduction_cn={introduction_cn}
                width={width}
                height={height}
              />
            ) : (
              <HorizontalLayout
                image={image}
                image_parameter={image_parameter}
                introduction={introduction}
                introduction_cn={introduction_cn}
                width={width}
                height={height}
              />
            )}
          </div>
        </div>
      </LightGallery>
    </>
  );
};
export default ExStaticCard;
