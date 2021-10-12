import styles from "./Footer.module.css";
import Link from "next/link";
import { useGlobalSettings } from "../context/GlobalSettings";
import BlockContent from "@sanity/block-content-to-react";

export default function Footer() {
  const settings = useGlobalSettings();
  //console.log(settings);
  const {
    abbreviation,
    address,
    businessHours,
    orgnizationName,
    phone,
    email,
    socialMedia,
  } = settings[0];
  console.log(socialMedia);
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className="threeColumn-211">
            <div className={styles.col1}>
              <ul>
                <li>
                  <span className="h2">
                    <BlockContent
                      blocks={orgnizationName}
                      projectId="z3dq9mvc"
                      dataset="production"
                    />
                  </span>
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
                  {socialMedia.map((item, index) => {
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
              <ul>
                <li>
                  <Link href="/artists" exact>
                    <span className="h4">Artists</span>
                  </Link>
                </li>
                <li>
                  <Link href="/exhibitions" exact>
                    <span className="h4">Exhibitions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/news" exact>
                    <span className="h4"> News</span>
                  </Link>
                </li>
                <li>
                  <Link href="/publications" exact>
                    <span className="h4"> Publications</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" exact>
                    <span className="h4">About</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
