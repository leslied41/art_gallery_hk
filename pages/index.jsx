import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import sanityClient from "../client.js";
import LightGallery from "lightgallery/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgMediumZoom from "lightgallery/plugins/mediumZoom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
export default function Landing({ workImages }) {
  console.log(workImages);
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  const getImages = () => {
    return workImages.map((image, index) => {
      return (
        <a
          key={index}
          className="gallery-item"
          data-src={urlFor(image.image.asset).url()}
        >
          <Image
            src={urlFor(image.image.asset).url()}
            alt="name"
            className={styles.thumbnail}
            layout="fill"
            style={{ width: "auto", height: "100%" }}
            width={image.metadata.metadata.dimensions.width}
            height={image.metadata.metadata.dimensions.height}
          />
        </a>
      );
    });
  };
  return (
    <>
      <div className="section">
        <LightGallery
          plugins={[lgZoom]}
          counter={false}
          download={false}
          onInit={onInit}
          prevHtml="Pre"
          nextHtml="Next"
          actualSize={false}
          showZoomInOutIcons={true}
          elementClassNames={styles.grid}
        >
          {getImages()}
        </LightGallery>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const workImages = await sanityClient.fetch(
    `*[_type=='work'&& references(*[slug.current=='leslie-chuneg']{_id}[0]._id)]{image,image_parameter,'metadata':image.asset->{metadata}}`
  );
  return {
    props: {
      workImages,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
