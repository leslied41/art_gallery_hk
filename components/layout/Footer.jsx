import styles from "./Footer.module.css";
import Link from "next/link";
import { useGlobalSettings } from "../context/GlobalSettings";
import BlockContent from "@sanity/block-content-to-react";
import Links from "../links/Links";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import logo from "../../public/images/Frame.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  const router = useRouter();
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;
  const [isMobile, setisMobile] = useState();
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
    phone,
    email,
    social,
  } = settings[0];
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.col1}>
              <ul>
                <li>
                  <div className={styles.logo_container}>
                    <Image src={logo} alt="logo" />
                    <span className="h2">
                      <BlockContent
                        blocks={
                          router.locale === "en"
                            ? orgnizationName
                            : orgnizationName_cn
                        }
                        projectId="z3dq9mvc"
                        dataset="production"
                      />
                    </span>
                  </div>
                </li>
              </ul>
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
                  <span className="h4">
                    <Links
                      font_size={
                        router.locale == "en"
                          ? isMobile
                            ? { fontSize: "13px" }
                            : { fontSize: "16px" }
                          : isMobile
                          ? { fontSize: "17px" }
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
