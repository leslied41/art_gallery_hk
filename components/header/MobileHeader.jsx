import React, { useRef, useEffect, useState } from "react";
import styles from "./MobileHeader.module.css";
import { useRouter } from "next/router";
import Links from "../links/Links";
import Link from "next/link";
// import image0 from "../../public/images/image0.png";
// import image_artist from "../../public/images/artist.png";
import { useGlobalSettings } from "../context/GlobalSettings";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const MobileHeader = () => {
  const router = useRouter();

  const { pathname, asPath, query } = router;
  const { settings } = useGlobalSettings();

  const artists_image = settings[0].artists_mobile || settings[0].artists;
  const exhibition_image =
    settings[0].exhibitions_mobile || settings[0].exhibitions;
  const news_image = settings[0].news_mobile || settings[0].news;
  const about_image = settings[0].about_mobile || settings[0].about;
  const landing_image = settings[0].landing_mobile || settings[0].landing;

  const [headerImage, setheaderImage] = useState();

  useEffect(() => {
    if (pathname.indexOf("/artists") == 0) {
      setheaderImage(artists_image);
    }
    if (pathname.indexOf("/exhibitions") == 0) {
      setheaderImage(exhibition_image);
    }
    if (pathname == "/") {
      setheaderImage(landing_image);
    }
    if (pathname == "/about") {
      setheaderImage(about_image);
      //console.log(headerImage);
    }
    if (pathname == "/news") {
      setheaderImage(news_image);
    }
  }, [pathname, query]);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.links}>
          <span className="h5">
            <Links
              font_size={
                router.locale == "en"
                  ? { fontSize: "18px" }
                  : { fontSize: "22px" }
              }
            />
          </span>
        </div>
        <div className={styles.title}>
          <Link href="/" exact>
            <span className="h5">
              {router.locale == "en" ? "PHD Group" : "PHD集團"}
            </span>
          </Link>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="none "
          style={{ width: "100vw" }}
          //preserveAspectRatio="xMinYMin meet"
          fill="none"
          viewBox="0 0 414 896"
        >
          <g clipPath="url(#clip0_37:502)">
            <path fill="#fff" d="M0 0H414V896H0z"></path>
            <path
              fill="url(#pattern1)"
              stroke="#000"
              d="M-254.5 -22.5H514.5V1003.5H-254.5z"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_37:502">
              <path fill="#fff" d="M0 0H414V896H0z"></path>
            </clipPath>
            <pattern
              id="pattern1"
              width="1"
              height="1"
              patternContentUnits="objectBoundingBox"
            >
              {headerImage && (
                <image
                  id="image1"
                  width="1"
                  height="1"
                  preserveAspectRatio="xMidYMid slice"
                  xlinkHref={urlFor(headerImage.asset).url()}
                ></image>
              )}
            </pattern>
          </defs>
        </svg>
      </section>
    </>
  );
};
export default MobileHeader;
