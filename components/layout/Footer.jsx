import { useEffect, useState, useRef, memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./Footer.module.css";
import { useGlobalSettings } from "../context/GlobalSettings";
import { usePathHistory } from "../context/PathHistory";
import Links from "../links/Links";
import { useBreakPoints } from "../usehooks/useBreakPoints.js";
import Logo from "../../public/images/Favicon01.svg";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Footer = () => {
  const router = useRouter();
  const { setover_footer, settings } = useGlobalSettings();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const footer_ref = useRef();
  const { isMobile } = useBreakPoints();

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

  useEffect(() => {
    const fn = () => {
      if (!footer_ref.current) {
        return;
      }
      if (
        (document.documentElement.clientHeight || window.innerHeight) >
        footer_ref.current.getBoundingClientRect().top
      ) {
        setover_footer(true);
      } else {
        setover_footer(false);
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const {
    abbreviation,
    address,
    businessHours,
    orgnizationName,
    orgnizationName_cn,
    logo,
    phone,
    email,
    social,
    link_font_size,
    cursor_font_size,
    mobile_link_font_size,
    mobile_cursor_font_size,
  } = settings[0] ?? {};

  return (
    <>
      <footer className={styles.footer} ref={footer_ref}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.col1}>
              <div className={styles.logo_container}>
                <img
                  src={logo ? urlFor(logo.asset).url() : Logo}
                  alt="logo"
                  style={{ height: "auto", width: "100%" }}
                />
              </div>
            </div>
            <div className={styles.col2}>
              <div>
                <div className={styles.row}>
                  <ul>
                    <li>
                      <span className="h4">{abbreviation}</span>
                    </li>

                    <li>
                      <Link href="/about/#visitUsLocation">
                        <span className="h4" style={{ cursor: "pointer" }}>
                          Request an appointment →
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={styles.row}>
                  <ul>
                    <li>
                      <span className="h4">{email}</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.row}>
                  <ul className={styles.socialmedia}>
                    {social?.map((item, index) => {
                      return (
                        <li key={index}>
                          <a
                            className="h4 no-underline"
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.platform}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div>
                <div className={styles.links}>
                  <div
                    className="h4"
                    style={
                      isMobile
                        ? mobile_link_font_size && {
                            fontSize: `${mobile_link_font_size}px`,
                          }
                        : link_font_size && { fontSize: `${link_font_size}px` }
                    }
                  >
                    <Links
                      ariaLabel="footer navigation"
                      font_size={
                        router.locale == "en"
                          ? isMobile
                            ? mobile_link_font_size
                              ? { fontSize: `${mobile_link_font_size - 2}px` }
                              : { fontSize: "18px" }
                            : link_font_size
                            ? { fontSize: `${link_font_size - 2}px` }
                            : { fontSize: "23px" }
                          : isMobile
                          ? mobile_link_font_size
                            ? { fontSize: `${mobile_link_font_size + 2}px` }
                            : { fontSize: "22px" }
                          : link_font_size
                          ? { fontSize: `${link_font_size + 2}px` }
                          : { fontSize: "27px" }
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default memo(Footer);
