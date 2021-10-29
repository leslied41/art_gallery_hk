import styles from "./Footer.module.css";
import Link from "next/link";
import { useGlobalSettings } from "../context/GlobalSettings";
import BlockContent from "@sanity/block-content-to-react";
import Links from "../links/Links";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import logo from "../../public/images/Frame.svg";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const settings = useGlobalSettings();
  //console.log(settings);
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
  //console.log(socialMedia);
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className="threeColumn-211">
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
              <div className={styles.row}>
                <ul>
                  <li>
                    <span className="h4">{abbreviation}</span>
                  </li>
                  <li>
                    <span className="h4">{address}</span>
                  </li>
                  <li>
                    <span className="h4">{businessHours}</span>
                  </li>
                  <li>
                    <Link href="/about/#visitUsLocation">
                      <span className="h4">Book A Visit →</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.row}>
                <ul>
                  <li>
                    <span className="h4">{phone}</span>
                  </li>
                  <li>
                    <span className="h4">{email}</span>
                  </li>
                </ul>
              </div>
              <div className={styles.row}>
                <ul>
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
            <div className={styles.col3}>
              <div>
                <Links />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
