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
  const studyContainer = useRef(null);
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
              d="M781.52 1v175.341c0 93.437-33.466 184.843-96.261 263.121-62.836 78.277-96.26 169.684-96.26 263.12V887H250.19V462.499h107.408c114.532 0 207.401-92.85 207.401-207.359V1H781.52z"
              clipRule="evenodd"
              ref={newsContainer}
              className={styles.news}
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
              d="M781.521 1h-.042v175.3c0 1.347.007 2.694.021 4.041-.941 92.043-34.341 181.96-96.24 259.121C622.424 517.739 589 609.146 589 702.582V887h385V702.541c0-93.436-33.466-184.843-96.26-263.121-61.93-77.148-95.291-167.05-96.24-259.079.014-1.333.021-2.666.021-4V1z"
              clipRule="evenodd"
              ref={artistsContainer}
              className={styles.artists}
            ></path>
          </Link>
          <Link href="/about" exact>
            <path
              fill={pathname == "/about" ? "url(#pattern0)" : "var(--white)"}
              fillRule="evenodd"
              d="M1529 290c-200.35 2.552-362 165.839-362 366.901V886.97h362V290z"
              clipRule="evenodd"
              ref={aboutContainer}
              className={styles.about}
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
                pathname == "/" || pathname.indexOf("/exhibitions") == 0
                  ? "url(#pattern0)"
                  : "var(--white)"
              }
              fillRule="evenodd"
              d="M565 1H1v886h249.191V462.499h107.408C472.131 462.499 565 369.649 565 255.14V1z"
              clipRule="evenodd"
              ref={exhibitionContainer}
              className={styles.exhibition}
            ></path>
          </Link>
          <Link href="/study" exact>
            <path
              fillRule="evenodd"
              d="M781.48 1v175.3c0 93.436 33.424 184.843 96.26 263.12 62.795 78.278 96.261 169.685 96.261 263.121V887H1167V656.931c0-201.062 161.65-364.348 362-366.901V1H781.48z"
              clipRule="evenodd"
              ref={studyContainer}
              className={styles.study}
              fill={pathname == "/study" ? "url(#pattern0)" : "var(--white)"}
            ></path>
          </Link>

          <path
            d="M781.48 1V.25a.75.75 0 0 0-.75.75h.75Zm96.26 438.42.585-.469-.585.469ZM974.001 887h-.75c0 .414.335.75.75.75V887ZM1167 887v.75c.42 0 .75-.336.75-.75h-.75Zm362-596.97.01.75a.75.75 0 0 0 .74-.75h-.75ZM1529 1h.75c0-.414-.33-.75-.75-.75V1ZM782.23 176.3V1h-1.5v175.3h1.5Zm96.095 262.651C815.587 360.796 782.23 269.552 782.23 176.3h-1.5c0 93.62 33.491 185.19 96.425 263.59l1.17-.939Zm96.426 263.59c0-93.62-33.533-185.19-96.426-263.59l-1.17.939c62.697 78.155 96.096 169.399 96.096 262.651h1.5Zm0 184.459V702.541h-1.5V887h1.5Zm192.249-.75H974.001v1.5H1167v-1.5Zm-.75-229.319V887h1.5V656.931h-1.5Zm362.74-367.651c-200.76 2.558-362.74 166.178-362.74 367.651h1.5c0-200.651 161.32-363.604 361.26-366.151l-.02-1.5ZM1528.25 1v289.03h1.5V1h-1.5Zm-746.77.75H1529V.25H781.48v1.5Z"
            fill="#000"
          />
          <path
            d="M781.52 1h.75a.75.75 0 0 0-.75-.75V1Zm-96.261 438.462.585.469-.585-.469ZM588.999 887v.75a.75.75 0 0 0 .75-.75h-.75Zm-338.809 0h-.75c0 .414.336.75.75.75V887Zm0-424.501v-.75a.75.75 0 0 0-.75.75h.75ZM564.999 1V.25a.75.75 0 0 0-.75.75h.75ZM780.77 1v175.341h1.5V1h-1.5Zm0 175.341c0 93.253-33.399 184.496-96.096 262.652l1.17.938c62.893-78.4 96.426-169.97 96.426-263.59h-1.5Zm-96.096 262.651c-62.934 78.401-96.425 169.97-96.425 263.59h1.5c0-93.252 33.358-184.496 96.095-262.651l-1.17-.939Zm-96.425 263.59V887h1.5V702.582h-1.5ZM250.19 887.75h338.809v-1.5H250.19v1.5Zm-.75-425.251V887h1.5V462.499h-1.5Zm108.158-.75H250.19v1.5h107.408v-1.5ZM564.249 255.14c0 114.095-92.533 206.609-206.651 206.609v1.5c114.946 0 208.151-93.185 208.151-208.109h-1.5Zm0-230.177V255.14h1.5V24.963h-1.5Zm0-23.963v23.963h1.5V1h-1.5ZM781.52.25H564.999v1.5H781.52V.25Z"
            fill="#000"
          />
          <path
            d="M781.521 1h.75a.75.75 0 0 0-.75-.75V1Zm-.042 0V.25a.75.75 0 0 0-.75.75h.75ZM685.26 439.462l.585.469-.585-.469ZM589 887h-.75c0 .414.336.75.75.75V887Zm385 0v.75a.75.75 0 0 0 .75-.75H974Zm-96.26-447.58.585-.469-.585.469ZM781.521.25h-.042v1.5h.042V.25Zm-.792.75v175.3h1.5V1h-1.5Zm0 175.3c0 1.35.007 2.699.021 4.048l1.5-.015a387.138 387.138 0 0 1-.021-4.033h-1.5Zm-94.884 263.631c61.996-77.281 95.463-167.358 96.405-259.583l-1.5-.015c-.939 91.862-34.273 181.62-96.075 258.66l1.17.938ZM589.75 702.582c0-93.252 33.358-184.496 96.095-262.651l-1.17-.939c-62.934 78.401-96.425 169.97-96.425 263.59h1.5Zm0 184.418V702.582h-1.5V887h1.5Zm-.75.75h385v-1.5H589v1.5Zm384.25-185.209V887h1.5V702.541h-1.5ZM877.155 439.89c62.696 78.155 96.095 169.399 96.095 262.651h1.5c0-93.62-33.532-185.19-96.425-263.59l-1.17.939ZM780.75 180.348c.951 92.21 34.378 182.272 96.405 259.542l1.17-.939c-61.833-77.028-95.127-166.77-96.075-258.618l-1.5.015Zm1.5 0c.014-1.335.021-2.67.021-4.007h-1.5c0 1.331-.007 2.662-.021 3.992l1.5.015Zm.021-4.007V1h-1.5v175.341h1.5Z"
            fill="#000"
          />
          <path
            d="M1529 290h.75a.759.759 0 0 0-.22-.534.773.773 0 0 0-.54-.216l.01.75Zm-362 596.97h-.75c0 .414.34.75.75.75v-.75Zm362 0v.75c.41 0 .75-.336.75-.75h-.75Zm-361.25-230.069c0-200.651 161.32-363.604 361.26-366.151l-.02-1.5c-200.76 2.558-362.74 166.178-362.74 367.651h1.5Zm0 230.069V656.901h-1.5V886.97h1.5Zm-.75.75h362v-1.5h-362v1.5Zm362.75-.75V290h-1.5v596.97h1.5Z"
            fill="#000"
          />
          <path
            d="M565 1h.5a.5.5 0 0 0-.5-.5V1ZM1 1V.5a.5.5 0 0 0-.5.5H1Zm0 886H.5a.5.5 0 0 0 .5.5v-.5Zm249.191 0v.5a.5.5 0 0 0 .5-.5h-.5Zm0-424.501v-.5a.5.5 0 0 0-.5.5h.5ZM565 .5H1v1h564v-1ZM.5 1v886h1V1h-1ZM1 887.5h249.191v-1H1v1Zm249.691-.5V462.499h-1V887h1Zm-.5-424.001h107.408v-1H250.191v1Zm107.408 0c114.808 0 207.901-93.074 207.901-207.859h-1c0 114.233-92.645 206.859-206.901 206.859v1ZM565.5 255.14V24.963h-1V255.14h1Zm0-230.177V1h-1v23.963h1Z"
            fill="#000"
          />

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
