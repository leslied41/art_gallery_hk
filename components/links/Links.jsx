import styles from "./Links.module.css";
import Link from "next/link";
import LanguageSwitch from "../languageSwitch/LanguageSwitch";
import { useRouter } from "next/router";
const Links = ({ font_size, ariaLabel }) => {
  const router = useRouter();

  return (
    <nav aria-label={ariaLabel}>
      <ul className={styles.links}>
        <li>
          <Link href="/artists" exact>
            <span>{router.locale == "en" ? "Artists" : "藝術家"}</span>
          </Link>
        </li>
        <li>
          <Link href="/exhibitions" exact>
            <span>{router.locale == "en" ? "Exhibitions" : "展覽"}</span>
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
        <li style={font_size}>
          <LanguageSwitch />
        </li>
      </ul>
    </nav>
  );
};
export default Links;
