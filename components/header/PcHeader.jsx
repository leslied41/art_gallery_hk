import React, { useRef, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import Links from "../links/Links";
import Link from "next/link";
import image0 from "../../public/images/image0.png";
import { useTranslation } from "next-i18next";
const PcHeader = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const changeLanEn = () => {
    //console.log("en");
    router.push({ pathname, query }, asPath, { locale: "en" });
  };
  const changeLanTc = () => {
    router.push({ pathname, query }, asPath, { locale: "tc" });
  };

  const exhibitionCursor = useRef(null);
  const aboutCursor = useRef(null);
  const artistsCursor = useRef(null);
  const publicationsCursor = useRef(null);
  const publicationContainer = useRef(null);
  const aboutContainer = useRef(null);
  const exhibitionContainer = useRef(null);
  const artistsContainer = useRef(null);
  const sectionEl = useRef(null);
  const titleEl = useRef(null);
  const linksEl = useRef(null);
  const [toLeft, setToLeft] = useState(0);
  const [toTop, setToTop] = useState(0);

  useEffect(() => {
    sectionEl.current.addEventListener("mousemove", (e) => {
      let x = e.clientX;
      let y = e.clientY;
      //console.log(x, y);
      setToLeft(x);
      setToTop(y);
    });
  }, []);
  useEffect(() => {
    publicationContainer.current.addEventListener("mouseover", () => {
      publicationsCursor.current.style.display = "block";
      publicationsCursor.current.style.color = "var(--white)";
      publicationContainer.current.style.fill = "var(--black)";
    });
    publicationContainer.current.addEventListener("mouseleave", () => {
      publicationsCursor.current.style.display = "none";
      publicationContainer.current.style.fill = "var(--middle-gray)";
    });
    artistsContainer.current.addEventListener("mouseover", () => {
      artistsCursor.current.style.display = "block";
      artistsCursor.current.style.color = "var(--white)";
      artistsContainer.current.style.fill = "var(--black)";
    });
    artistsContainer.current.addEventListener("mouseleave", () => {
      artistsCursor.current.style.display = "none";
      artistsContainer.current.style.fill = "var(--dark-gray)";
    });
    aboutContainer.current.addEventListener("mouseover", () => {
      aboutCursor.current.style.display = "block";
      aboutCursor.current.style.color = "var(--white)";
      aboutContainer.current.style.fill = "var(--black)";
    });
    aboutContainer.current.addEventListener("mouseleave", () => {
      aboutCursor.current.style.display = "none";
      aboutContainer.current.style.fill = "var(--balck-gray)";
    });
    exhibitionContainer.current.addEventListener("mouseover", () => {
      exhibitionCursor.current.style.display = "block";
      exhibitionCursor.current.style.color = "var(--white)";
      exhibitionContainer.current.style.fill = "var(--black)";
      titleEl.current.style.color = "var(--white)";
    });
    exhibitionContainer.current.addEventListener("mouseleave", () => {
      exhibitionCursor.current.style.display = "none";
      exhibitionContainer.current.style.fill = "url(#pattern0)";
      titleEl.current.style.color = "var(--black)";
    });
    titleEl.current.addEventListener("mouseover", () => {
      exhibitionContainer.current.style.fill = "var(--black)";
      titleEl.current.style.color = "var(--white)";
    });
    linksEl.current.addEventListener("mouseover", () => {
      aboutContainer.current.style.fill = "var(--black)";
    });
  }, []);
  useEffect(() => {
    exhibitionCursor.current.style.position = "absolute";
    exhibitionCursor.current.style.left = `${toLeft + 5}px`;
    exhibitionCursor.current.style.top = `${toTop + 5}px`;
    aboutCursor.current.style.position = "absolute";
    aboutCursor.current.style.left = `${toLeft + 5}px`;
    aboutCursor.current.style.top = `${toTop + 5}px`;
    artistsCursor.current.style.position = "absolute";
    artistsCursor.current.style.left = `${toLeft + 5}px`;
    artistsCursor.current.style.top = `${toTop + 5}px`;
    publicationsCursor.current.style.position = "absolute";
    publicationsCursor.current.style.left = `${toLeft + 5}px`;
    publicationsCursor.current.style.top = `${toTop + 5}px`;
  }, [toTop, toLeft]);
  return (
    <>
      <section className={styles.section} ref={sectionEl}>
        <div className={styles.links} ref={linksEl}>
          <Links lan="true" />
        </div>
        <div className={styles.icon}>
          <span className={styles.exhIcon} ref={exhibitionCursor}>
            Exhibitions
          </span>

          <span className={styles.aboutIcon} ref={aboutCursor}>
            About
          </span>

          <span className={styles.pubIcon} ref={artistsCursor}>
            Publications
          </span>

          <span className={styles.artIcon} ref={publicationsCursor}>
            Artists
          </span>
        </div>
        <div className={styles.title} ref={titleEl}>
          <Link href="/" exact>
            <span>{t("organization_name")}</span>
          </Link>
        </div>

        <svg
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 1440 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_29:12)">
            <Link href="/artists" exact>
              <path
                d="M620.071 0C660.736 54.6639 695.948 135.266 669.929 236.342C649.355 316.267 588.116 364.47 525.31 413.906C521.876 416.609 518.437 419.316 515 422.032V422.033C518.438 419.317 521.877 416.61 525.312 413.906L525.322 413.898C536.768 404.889 548.162 395.92 559.267 386.793C719.037 433.869 850.392 547.256 921.477 695.1C1006.75 632.504 1088.28 561.696 1070.73 395.794C1055.27 249.742 1038.77 107.278 1025.95 0.000244141L620.071 0Z"
                fill="var(--middle-gray)"
                className={styles.publications}
                ref={publicationContainer}
              />
            </Link>
            <Link href="/publications" exact>
              <path
                d="M403 1024H760.2C746.2 980.675 742.011 929.68 758.893 872.593C781.308 796.796 841.656 753.036 903.548 708.157C909.521 703.825 915.509 699.483 921.478 695.101C850.393 547.257 719.037 433.869 559.267 386.793C548.159 395.923 536.761 404.894 525.312 413.906C432.664 486.833 336.604 562.444 362.635 746.53C376.31 843.233 390.124 938.894 403 1024Z"
                fill="var(--dark-gray)"
                className={styles.artists}
                ref={artistsContainer}
              />
            </Link>
            <Link href="/about" exact>
              <path
                d="M1440 1024H760.198C746.198 980.676 742.009 929.681 758.891 872.593C814.372 684.983 1102.24 693.65 1070.73 395.794C1055.27 249.742 1038.77 107.278 1025.95 0.000244141L1440 0.000252518V1024Z"
                fill="var(--balck-gray)"
                className={styles.about}
                ref={aboutContainer}
              />
            </Link>
            <Link href="/exhibitions" exact>
              <path
                className={styles.exhibitions}
                ref={exhibitionContainer}
                d="M619.999 -0.0970479C660.694 54.5685 695.963 135.207 669.929 236.342C619.005 434.168 318.955 437.654 362.633 746.53C376.308 843.234 390.122 938.895 402.998 1024H-0.00195312L-0.00194709 -0.097168L619.999 -0.0970479Z"
                // fill="var(--light-gray)"
                fill="url(#pattern0)"
              />
            </Link>
          </g>
          <defs>
            <clipPath id="clip0_29:12">
              <rect width="1440" height="1024" fill="white" />
            </clipPath>
            <pattern
              id="pattern0"
              width="1"
              height="1"
              patternContentUnits="objectBoundingBox"
            >
              {/* <use
                transform="matrix(.00083 0 0 .00063 0 0)"
                xlinkHref="#image0"
              ></use> */}
              <image
                id="image0"
                width="1"
                height="1"
                preserveAspectRatio="xMidYMid slice"
                xlinkHref={image0.src}
              ></image>
            </pattern>
          </defs>
        </svg>
      </section>
    </>
  );
};

export default PcHeader;
