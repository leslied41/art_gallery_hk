import styles from "./Links.module.css";
import Link from "next/link";
import LanguageSwitch from "../languageSwitch/LanguageSwitch";

const Links = ({ lan }) => {
  if (lan) {
    return (
      <>
        <div>
          <ul className={styles.links}>
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
