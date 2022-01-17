import styles from "./Footer.module.css";
import Link from "next/link";
import { useGlobalSettings } from "../context/GlobalSettings";
import BlockContent from "@sanity/block-content-to-react";
import Links from "../links/Links";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Logo from "../../public/images/Favicon01.svg";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Footer() {
  const router = useRouter();
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;
  const [isMobile, setisMobile] = useState();
  const footer_ref = useRef();
  useEffect(() => {
    if (window.innerWidth < 768) {
      setisMobile(true);
    } else if (window.innerWidth >= 768) {
      setisMobile(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setisMobile(true);
        //console.log(isMobile);
      } else if (window.innerWidth >= 768) {
        setisMobile(false);
        //console.log(isMobile);
      }
    });
  }, []);
  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);
  //console.log(popup_path);

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
  } = settings[0];
  //console.log(link_font_size);
  console.log(logo);
  return (
    <>
      <div className={styles.footer} ref={footer_ref}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.col1}>
              <div className={styles.logo_container}>
                <Image
                  src={logo ? urlFor(logo.asset).url() : Logo}
                  alt="logo"
                  layout="responsive"
                  width="100%"
                  height="100%"
                />
                {/* <span
                  className="h2"
                  style={router.locale == "tc" ? { paddingTop: "25px" } : {}}
                >
                  <BlockContent
                    blocks={
                      router.locale === "en"
                        ? orgnizationName
                        : orgnizationName_cn
                    }
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                </span> */}
              </div>
            </div>
            <div className={styles.col2}>
              <div>
                <div className={styles.row}>
                  <ul>
                    <li>
                      <span className="h4">{abbreviation}</span>
                    </li>
                    {/* <li>
                    <span className="h4">{address}</span>
                  </li>
                  <li>
                    <span className="h4">{businessHours}</span>
                  </li> */}
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
                    {/* <li>
                    <span className="h4">{phone}</span>
                  </li> */}
                    <li>
                      <span className="h4">{email}</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.row}>
                  <ul className={styles.socialmedia}>
                    {social.map((item, index) => {
                      return (
                        <li key={index}>
                          <a href={item.url}>{item.platform}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div>
                <div className={styles.links}>
                  <span
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
                      font_size={
                        router.locale == "en"
                          ? isMobile
                            ? mobile_link_font_size
                              ? { fontSize: `${mobile_link_font_size - 2}px` }
                              : { fontSize: "13px" }
                            : link_font_size
                            ? { fontSize: `${link_font_size - 2}px` }
                            : { fontSize: "16px" }
                          : isMobile
                          ? mobile_link_font_size
                            ? { fontSize: `${mobile_link_font_size + 2}px` }
                            : { fontSize: "17px" }
                          : link_font_size
                          ? { fontSize: `${link_font_size + 2}px` }
                          : { fontSize: "20px" }
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
