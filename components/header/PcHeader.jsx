import React, { useRef, useEffect, useState, memo } from "react";
import styles from "./PcHeader.module.css";
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

const PcHeader = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { settings, showimg, setshowimg } = useGlobalSettings();

  const linksEl = useRef();
  const titleEl = useRef();
  const exhibitionCursor = useRef(null);
  const aboutCursor = useRef(null);
  const newsCursor = useRef(null);
  const artistsCursor = useRef(null);
  const studyCursor = useRef(null);
  const projectsCursor = useRef(null);
  const studyContainer = useRef(null);
  const projectsContainer = useRef(null);
  const aboutContainer = useRef(null);
  const exhibitionContainer = useRef(null);
  const artistsContainer = useRef(null);
  const newsContainer = useRef(null);
  const sectionEl = useRef(null);
  const [toLeft, setToLeft] = useState(0);
  const [toTop, setToTop] = useState(0);
  const [useXlink, setuseXlink] = useState();
  const artists_image = settings[0]?.artists;
  const exhibition_image = settings[0]?.exhibitions;
  const news_image = settings[0]?.news;
  const about_image = settings[0]?.about;
  const landing_image = settings[0]?.landing;
  const projects_image = settings[0]?.projects;
  const {
    link_font_size,
    cursor_font_size,
    mobile_link_font_size,
    hero_exhibition_link,
  } = settings[0] ?? {};

  useEffect(() => {
    if (pathname.indexOf("/artists") == 0) {
      setuseXlink("#image4");
    }
    if (pathname.indexOf("/exhibitions") == 0) {
      setuseXlink("#image5");
    }
    if (pathname.indexOf("/fairs-and-projects") == 0) {
      setuseXlink("#image6");
    }
    if (pathname == "/") {
      setuseXlink("#image0");
    }
    if (pathname == "/about") {
      setuseXlink("#image3");
    }
    if (pathname == "/news") {
      setuseXlink("#image2");
    }
    return () => {
      if (pathname.indexOf("/artists") == 0) {
        setuseXlink();
      }
      if (pathname.indexOf("/exhibitions") == 0) {
        setuseXlink();
      }
      if (pathname.indexOf("/fairs-and-projects") == 0) {
        setuseXlink();
      }
      if (pathname == "/") {
        setuseXlink();
      }
      if (pathname == "/about") {
        setuseXlink();
      }
      if (pathname == "/news") {
        setuseXlink();
      }
    };
  }, [pathname, query]);

  useEffect(() => {
    sectionEl.current.addEventListener("mousemove", (e) => {
      const y = e.pageY;
      const x = e.pageX;
      const scrollTop = window.pageYOffset;
      setToTop(y - scrollTop);
      setToLeft(x);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!sectionEl.current) {
        return;
      }
      if (
        (window.scrollY || window.pageYOffset) >
        sectionEl.current.offsetTop + sectionEl.current.offsetHeight
      ) {
        setshowimg(true);
      } else {
        setshowimg(false);
      }
    });
  }, []);

  useEffect(() => {
    studyContainer.current.addEventListener("mouseover", () => {
      studyCursor.current.style.display = "block";
    });
    studyContainer.current.addEventListener("mouseleave", () => {
      studyCursor.current.style.display = "none";
    });
    projectsContainer.current.addEventListener("mouseover", () => {
      projectsCursor.current.style.display = "block";
    });
    projectsContainer.current.addEventListener("mouseleave", () => {
      projectsCursor.current.style.display = "none";
    });
    newsContainer.current.addEventListener("mouseover", () => {
      newsCursor.current.style.display = "block";
    });
    newsContainer.current.addEventListener("mouseleave", () => {
      newsCursor.current.style.display = "none";
    });
    artistsContainer.current.addEventListener("mouseover", () => {
      artistsCursor.current.style.display = "block";
    });
    artistsContainer.current.addEventListener("mouseleave", () => {
      artistsCursor.current.style.display = "none";
    });
    aboutContainer.current.addEventListener("mouseover", () => {
      aboutCursor.current.style.display = "block";
    });
    aboutContainer.current.addEventListener("mouseleave", () => {
      aboutCursor.current.style.display = "none";
    });
    exhibitionContainer.current.addEventListener("mouseover", () => {
      exhibitionCursor.current.style.display = "block";
    });
    exhibitionContainer.current.addEventListener("mouseleave", () => {
      exhibitionCursor.current.style.display = "none";
    });
  }, []);
  useEffect(() => {
    exhibitionCursor.current.style.position = "fixed";
    exhibitionCursor.current.style.left = `${toLeft + 10}px`;
    exhibitionCursor.current.style.top = `${toTop + 10}px`;
    aboutCursor.current.style.position = "fixed";
    aboutCursor.current.style.left = `${toLeft + 10}px`;
    aboutCursor.current.style.top = `${toTop + 10}px`;
    artistsCursor.current.style.position = "fixed";
    artistsCursor.current.style.left = `${toLeft + 10}px`;
    artistsCursor.current.style.top = `${toTop + 10}px`;
    newsCursor.current.style.position = "fixed";
    newsCursor.current.style.left = `${toLeft + 10}px`;
    newsCursor.current.style.top = `${toTop + 10}px`;
    studyCursor.current.style.position = "fixed";
    studyCursor.current.style.left = `${toLeft + 10}px`;
    studyCursor.current.style.top = `${toTop + 10}px`;
    projectsCursor.current.style.position = "fixed";
    projectsCursor.current.style.left = `${toLeft + 10}px`;
    projectsCursor.current.style.top = `${toTop + 10}px`;
  }, [toTop, toLeft]);

  return (
    <>
      <section
        className={styles.section}
        ref={sectionEl}
        aria-label="desktop header"
      >
        <div className={styles.icon}>
          <div
            className="h2"
            style={cursor_font_size && { fontSize: `${cursor_font_size}px` }}
          >
            <span className={styles.exhIcon} ref={exhibitionCursor}>
              Exhibition
            </span>

            <span className={styles.aboutIcon} ref={aboutCursor}>
              About
            </span>

            <span className={styles.pubIcon} ref={artistsCursor}>
              Artists
            </span>

            <span className={styles.artIcon} ref={studyCursor}>
              Study
            </span>

            <span className={styles.projectsIcon} ref={projectsCursor}>
              Fairs & Projects
            </span>

            <span className={styles.newsIcon} ref={newsCursor}>
              News
            </span>
          </div>
        </div>
        <div className={styles.links} ref={linksEl}>
          <div
            className="h2"
            style={link_font_size && { fontSize: `${link_font_size}px` }}
          >
            <Links
              ariaLabel="primary navigation"
              font_size={
                router.locale == "en"
                  ? link_font_size
                    ? { fontSize: `${link_font_size - 3.5}px` }
                    : { fontSize: "32px" }
                  : link_font_size
                  ? { fontSize: `${link_font_size + 3.5}px` }
                  : { fontSize: "39px" }
              }
            />
          </div>
        </div>
        <div className={styles.title} ref={titleEl}>
          <Link href="/" exact>
            <span className="h2">
              {router.locale == "en" ? "PHD Group" : "PHD集團"}
            </span>
          </Link>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="none"
          fill="none"
          style={{ width: "100vw" }}
          viewBox="0 0 1530 888"
        >
          <Link href="/news" exact>
            <path
              fill={pathname == "/news" ? "url(#pattern0)" : "var(--white)"}
              fillRule="evenodd"
              d="M782 1v175.341c0 93.437-34.244 185.381-97 263.659-62.797 78.277-96 169.564-96 263v184H251V462.499h107.341c114.461 0 207.159-92.49 207.159-206.999L566 1h216Z"
              clipRule="evenodd"
              ref={newsContainer}
              className={`${styles.news} ${pathname == "/news" ? styles.active : ""}`}
            ></path>
          </Link>
          <Link href="/artists" exact>
            <path
              fill={
                pathname.indexOf("/artists") == 0
                  ? "url(#pattern0)"
                  : "var(--white)"
              }
              fillRule="evenodd"
              d="M781.958 176.428c0 1.347.007 2.694.021 4.041-.941 92.043-35.08 182.37-96.979 259.531-62.836 78.277-96 169.564-96 263v184h385V702.5c0-93.436-33.206-184.722-96-263-61.93-77.148-95.072-167.002-96.021-259.031.014-1.333-.021-2.707-.021-4.041Z"
              clipRule="evenodd"
              ref={artistsContainer}
              className={`${styles.artists} ${pathname.indexOf("/artists") == 0 ? styles.active : ""}`}
            ></path>
          </Link>
          <Link href="/about" exact>
            <path
              fill={pathname == "/about" ? "url(#pattern0)" : "var(--white)"}
              fillRule="evenodd"
              d="M1290 1v258c0 23.063-6.95 45.408-19.5 64.5L1209 417c-59.87 91.054-91 198.507-91 308.5V887h411V1h-239Z"
              clipRule="evenodd"
              ref={aboutContainer}
              className={`${styles.about} ${pathname == "/about" ? styles.active : ""}`}
            ></path>
          </Link>
          <Link
            href={
              hero_exhibition_link
                ? `/exhibitions/${hero_exhibition_link}`
                : "/exhibitions/"
            }
            exact
          >
            <path
              fill={
                pathname.indexOf("/exhibitions") == 0
                  ? "url(#pattern0)"
                  : "var(--white)"
              }
              fillRule="evenodd"
              d="M974 702.5V887h144V725.5c0-109.993 31.13-217.446 91-308.5l61.5-93.5c12.55-19.092 19.5-41.437 19.5-64.5V1H782l.042 175.341c0 1.334-.007 2.667-.021 4C782.97 272.37 816.07 362.352 878 439.5c62.794 78.278 96 169.564 96 263Z"
              clipRule="evenodd"
              ref={exhibitionContainer}
              className={`${styles.exhibition} ${pathname.indexOf("/exhibitions") == 0 ? styles.active : ""}`}
            ></path>
          </Link>
          <Link href="/study" exact>
            <path
              fillRule="evenodd"
              d="M1 1h250v886H1V1Z"
              clipRule="evenodd"
              ref={studyContainer}
              className={`${styles.study} ${pathname == "/study" ? styles.active : ""}`}
              fill={pathname == "/study" ? "url(#pattern0)" : "var(--white)"}
            ></path>
          </Link>
          <Link href="/fairs-and-projects" exact>
            <path
              fillRule="evenodd"
              d="M566 1H251v461.5h107.408c114.602 0 207.092-92.615 207.092-207L566 1Z"
              clipRule="evenodd"
              ref={projectsContainer}
              className={`${styles.projects} ${pathname == "/fairs-and-projects" ? styles.active : ""}`}
              fill={pathname == "/fairs-and-projects" ? "url(#pattern0)" : "var(--white)"}
            ></path>
          </Link>

          <path fill="#000" d="M1530 0v888H0V0h1530ZM2 886h248V2H2v884Zm564.5-630.498a212.526 212.526 0 0 1-.771 18.054C556.599 380.028 467.467 463.5 358.408 463.5H252V886h336V703c0-5.855.129-11.702.389-17.537 3.883-87.53 36.798-172.55 95.831-246.089 61.737-77.008 95.802-167.241 96.758-259.061l-.015-1.859c-.004-.675-.005-1.35-.005-2.025L781 2H566.998l-.498 253.502Zm215.47-50.848c-6.085 83.137-39.02 164.021-94.741 234.158l-.45.562c-.332.418-.665.835-.999 1.252-59.6 74.292-92.469 160.304-95.542 248.716A384.908 384.908 0 0 0 590 703v183h383V702.5c0-92.464-32.602-182.838-94.316-260.541l-1.464-1.833a480.992 480.992 0 0 1-4.23-5.347l-.519-.669c-.262-.337-.524-.673-.784-1.01l-.407-.528c-.354-.46-.709-.92-1.061-1.382l-.338-.443c-52.109-68.316-82.175-146.015-87.911-226.093Zm1.072-28.313-.005 2.006c-.003.668-.009 1.336-.016 2.005.929 89.631 32.434 177.334 91.461 253.088 1.417 1.819 2.85 3.63 4.298 5.434C941.706 517.316 975 608.82 975 702.5V886h142V725.5c0-110.181 31.19-217.826 91.16-309.05l61.5-93.5c12.45-18.934 19.34-41.088 19.34-63.95V2H783l.042 174.341ZM1291 2v257c0 23.265-7.01 45.8-19.66 65.05l-61.5 93.5C1150.08 508.435 1119 615.695 1119 725.5V886h409V2h-237ZM252 461.499h106.341c108.068 0 196.639-82.844 205.44-188.648a206.813 206.813 0 0 0 .65-11.972c.045-1.787.069-3.581.069-5.379v-.002L564.998 2H252v459.499Z"/>

          <defs>
            <pattern
              id="pattern0"
              width="1"
              height="1"
              patternContentUnits="objectBoundingBox"
            >
              <use
                //transform="matrix(.00129 0 0 .0016 0 -.138)"
                xlinkHref={useXlink}
              ></use>
            </pattern>
            <image
              id="image4"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              xlinkHref={artists_image ? urlFor(artists_image.asset).url() : ""}
            ></image>

            <image
              id="image0"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              xlinkHref={landing_image ? urlFor(landing_image.asset).url() : ""}
            ></image>

            <image
              id="image5"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              xlinkHref={
                exhibition_image ? urlFor(exhibition_image.asset).url() : ""
              }
            ></image>
            
            <image
              id="image6"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              xlinkHref={
                projects_image ? urlFor(projects_image.asset).url() : ""
              }
            ></image>

            <image
              id="image2"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              xlinkHref={news_image ? urlFor(news_image.asset).url() : ""}
            ></image>

            <image
              id="image3"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
              xlinkHref={about_image ? urlFor(about_image.asset).url() : ""}
            ></image>
          </defs>
        </svg>
      </section>
    </>
  );
};

export default memo(PcHeader);
