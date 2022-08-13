import styles from "./Footer.module.css";
import Link from "next/link";
import { useGlobalSettings } from "../context/GlobalSettings";
import { usePathHistory } from "../context/PathHistory";
import Links from "../links/Links";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, memo } from "react";
import Logo from "../../public/images/Favicon01.svg";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Footer = () => {
  const router = useRouter();
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const settings_data = await sanityClient.fetch(
        `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`
      );
      setSettings(settings_data);
    };
    fetchData();
  }, []);
  const { setover_footer } = useGlobalSettings();
  const { popup } = usePathHistory();

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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!footer_ref.current) {
        return;
      }

      if (
        (document.documentElement.clientHeight || window.innerHeight) >
        footer_ref.current.getBoundingClientRect().top
      ) {
        setover_footer(true);
        //console.log("over me foot");
      } else {
        setover_footer(false);
        //console.log("leave me foot");
      }
    });
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
  //console.log(link_font_size);
  //console.log(logo);
  console.log(logo);
  console.log(social);

  return (
    <>
      <div className={styles.footer} ref={footer_ref}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.col1}>
              <div className={styles.logo_container}>
                <img
                  src={logo ? urlFor(logo.asset).url() : Logo}
                  alt="logo"
                  style={{ height: "auto", width: "100%" }}
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
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Footer);
