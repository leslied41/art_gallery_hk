import styles from "./Links.module.css";
import Link from "next/link";
import LanguageSwitch from "../languageSwitch/LanguageSwitch";
import { useRouter } from "next/router";
const Links = ({ lan }) => {
  const router = useRouter();
  if (lan) {
    return (
      <>
        <div>
          <ul className={styles.links}>
            <li>
              <Link href="/artists" exact>
                <span>{router.locale == "en" ? "Artist" : "藝術家"}</span>
              </Link>
            </li>
            <li>
              <Link href="/exhibitions" exact>
                <span>{router.locale == "en" ? "Exhibitions" : "展出"}</span>
              </Link>
            </li>
            <li>
              <Link href="/news" exact>
                <span> {router.locale == "en" ? "News" : "新聞"}</span>
              </Link>
            </li>
            <li>
              <Link href="/study" exact>
                <span> {router.locale == "en" ? "Study" : "書齋"}</span>
              </Link>
            </li>
            <li>
              <Link href="/about" exact>
                <span>{router.locale == "en" ? "About" : "關於我們"}</span>
              </Link>
            </li>
            <li>
              <LanguageSwitch />
            </li>
          </ul>
        </div>
      </>
    );
  }
  if (!lan) {
    return (
      <>
        <div>
          <ul>
            <li>
              <Link href="/artists" exact>
                <span>artist</span>
              </Link>
            </li>
            <li>
              <Link href="/exhibitions" exact>
                <span>exhibitions</span>
              </Link>
            </li>
            <li>
              <Link href="/news" exact>
                <span> news</span>
              </Link>
            </li>
            <li>
              <Link href="/study" exact>
                <span> publications</span>
              </Link>
            </li>
            <li>
              <Link href="/about" exact>
                <span>about</span>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
};
export default Links;
