import React, { useRef, useEffect, useState, memo } from "react";
import styles from "./MobileHeader.module.css";
import { useRouter } from "next/router";
import Links from "../links/Links";
import Link from "next/link";
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

  const artists_image_mobile = settings[0]?.artists_mobile;
  const exhibition_image_mobile = settings[0]?.exhibitions_mobile;
  const news_image_mobile = settings[0]?.news_mobile;
  const about_image_mobile = settings[0]?.about_mobile;
  const landing_image_mobile = settings[0]?.landing_mobile;
  const { link_font_size, cursor_font_size, mobile_link_font_size } =
    settings[0] ?? {};

  const [headerImage, setheaderImage] = useState();

  useEffect(() => {
    if (pathname.indexOf("/artists") == 0) {
      setheaderImage(artists_image_mobile);
    }
    if (pathname.indexOf("/exhibitions") == 0) {
      setheaderImage(exhibition_image_mobile);
    }
    if (pathname == "/") {
      setheaderImage(landing_image_mobile);
    }
    if (pathname == "/about") {
      setheaderImage(about_image_mobile);
      //console.log(headerImage);
    }
    if (pathname == "/news") {
      setheaderImage(news_image_mobile);
    }
  }, [pathname, query]);

  return (
    <>
      <section className={styles.section} aria-label="mobile header">
        <div className={styles.links}>
          <div
            className="h5"
            style={
              mobile_link_font_size && {
                fontSize: `${mobile_link_font_size}px`,
              }
            }
          >
            <Links
              ariaLabel="primary navigation"
              font_size={
                router.locale == "en"
                  ? mobile_link_font_size
                    ? { fontSize: `${mobile_link_font_size - 2}px` }
                    : { fontSize: "18px" }
                  : mobile_link_font_size
                  ? { fontSize: `${mobile_link_font_size + 2}px` }
                  : { fontSize: "22px" }
              }
            />
          </div>
        </div>
        <div className={styles.title}>
          <Link href="/" exact>
            <span className="h5">
              {router.locale == "en" ? "PHD Group" : "PHD集團"}
            </span>
          </Link>
        </div>
        {headerImage && (
          <img src={urlFor(headerImage.asset).url()} alt="cover" />
        )}
      </section>
    </>
  );
};
export default memo(MobileHeader);
