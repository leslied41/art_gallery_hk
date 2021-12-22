import styles from "./Links.module.css";
import Link from "next/link";
import LanguageSwitch from "../languageSwitch/LanguageSwitch";
import { useTranslation } from "next-i18next";

const Links = ({ lan }) => {
  const { t } = useTranslation("common");
  if (lan) {
    return (
      <>
        <div>
          <ul className={styles.links}>
            <li>
              <Link href="/artists" exact>
                <span className="h4">{t("artist")}</span>
              </Link>
            </li>
            <li>
              <Link href="/exhibitions" exact>
                <span className="h4">{t("exhibitions")}</span>
              </Link>
            </li>
            <li>
              <Link href="/news" exact>
                <span className="h4"> {t("news")}</span>
              </Link>
            </li>
            <li>
              <Link href="/study" exact>
                <span className="h4"> {t("publications")}</span>
              </Link>
            </li>
            <li>
              <Link href="/about" exact>
                <span className="h4">{t("about")}</span>
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
                <span className="h4">{t("artist")}</span>
              </Link>
            </li>
            <li>
              <Link href="/exhibitions" exact>
                <span className="h4">{t("exhibitions")}</span>
              </Link>
            </li>
            <li>
              <Link href="/news" exact>
                <span className="h4"> {t("news")}</span>
              </Link>
            </li>
            <li>
              <Link href="/study" exact>
                <span className="h4"> {t("publications")}</span>
              </Link>
            </li>
            <li>
              <Link href="/about" exact>
                <span className="h4">{t("about")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
};
export default Links;
