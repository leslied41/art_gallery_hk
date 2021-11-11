import React, { useRef, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import Links from "../links/Links";
import Link from "next/link";
import image0 from "../../public/images/image0.png";
import image_artist from "../../public/images/artist.png";
import { useTranslation } from "next-i18next";

const MobileHeader = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, asPath, query } = router;
  console.log(pathname);
  console.log(query.slug);
  const [headerImage, setheaderImage] = useState(image0);

  useEffect(() => {
    if (pathname == "/artists") {
      setheaderImage(image_artist);
    }
    if (pathname == "/exhibitions") {
      setheaderImage(image0);
    }
  }, [pathname, query]);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.links}>
          <Links lan="true" />
        </div>
        <div className={styles.title}>
          <Link href="/" exact>
            <span>{t("organization_name")}</span>
          </Link>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMinYMin meet"
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
              <image
                id="image1"
                width="1"
                height="1"
                preserveAspectRatio="xMidYMid slice"
                xlinkHref={headerImage.src}
              ></image>
            </pattern>
          </defs>
        </svg>
      </section>
    </>
  );
};
export default MobileHeader;
