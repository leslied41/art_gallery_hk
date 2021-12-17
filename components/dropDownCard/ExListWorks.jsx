import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import VerticalLayout from "../exhibitions_exhibition_staticcard/VerticalLayout";
import HorizontalLayout from "../exhibitions_exhibition_staticcard/HorizontalLayout";
import Collapsible from "../collapsible/Collapsible";
import { useContext, useCallback, useRef } from "react";
import { dropDownContext } from "./DropDownCard";
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
const ExListWorks = ({ data }) => {
  const { showCard } = useContext(dropDownContext);
  const { works } = data;
  const lightGallery = useRef(null);
  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  return (
    <>
      <Collapsible showCard={showCard}>
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
          {works.map((work, index) => {
            const width = work.metadata.metadata.dimensions.width;
            const height = work.metadata.metadata.dimensions.height;

            const aspectRatio = work.metadata.metadata.dimensions.aspectRatio;
            const {
              name,
              name_cn,
              image,
              image_parameter,
              introduction,
              introduction_cn,
            } = work;
            //console.log(aspectRatio, width);
            return (
              <div key={index} data-src={urlFor(image.asset).url()}>
                {width > 750 && aspectRatio > 1 ? (
                  <div key={index} className="mt-145">
                    <VerticalLayout
                      name={name}
                      name_cn={name_cn}
                      image={image}
                      image_parameter={image_parameter}
                      introduction={introduction}
                      introduction_cn={introduction_cn}
                      width={width}
                      height={height}
                    />
                  </div>
                ) : (
                  <div key={index} className="mt-145">
                    <HorizontalLayout
                      name={name}
                      name_cn={name_cn}
                      image={image}
                      image_parameter={image_parameter}
                      introduction={introduction}
                      introduction_cn={introduction_cn}
                      width={width}
                      height={height}
                    />
                  </div>
                )}
              </div>
            );
            // if (width > 750 && aspectRatio > 1) {
            //   return (
            //     <div key={index} className="mt-118">
            //       <VerticalLayout
            //         name={name}
            //         name_cn={name_cn}
            //         image={image}
            //         image_parameter={image_parameter}
            //         introduction={introduction}
            //         introduction_cn={introduction_cn}
            //         width={width}
            //         height={height}
            //       />
            //     </div>
            //   );
            // } else {
            //   return (
            //     <div key={index} className="mt-118">
            //       <HorizontalLayout
            //         name={name}
            //         name_cn={name_cn}
            //         image={image}
            //         image_parameter={image_parameter}
            //         introduction={introduction}
            //         introduction_cn={introduction_cn}
            //         width={width}
            //         height={height}
            //       />
            //     </div>
            //   );
            // }
          })}
        </LightGallery>
      </Collapsible>
    </>
  );
};
export default ExListWorks;
