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
                <span className="h4">
                  {router.locale == "en" ? "Artist" : "藝術家"}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/exhibitions" exact>
                <span className="h4">
                  {router.locale == "en" ? "Exhibitions" : "展出"}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/news" exact>
                <span className="h4">
                  {" "}
                  {router.locale == "en" ? "News" : "新聞"}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/study" exact>
                <span className="h4">
                  {" "}
                  {router.locale == "en" ? "Study" : "書齋"}
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about" exact>
                <span className="h4">
                  {router.locale == "en" ? "About" : "關於我們"}
                </span>
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
                <span className="h4">artist</span>
              </Link>
            </li>
            <li>
              <Link href="/exhibitions" exact>
                <span className="h4">exhibitions</span>
              </Link>
            </li>
            <li>
              <Link href="/news" exact>
                <span className="h4"> news</span>
              </Link>
            </li>
            <li>
              <Link href="/study" exact>
                <span className="h4"> publications</span>
              </Link>
            </li>
            <li>
              <Link href="/about" exact>
                <span className="h4">about</span>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
};
export default Links;
