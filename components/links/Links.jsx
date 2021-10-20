import styles from "./Links.module.css";
import Link from "next/link";
import LanguageSwitch from "../languageSwitch/LanguageSwitch";

const Links = ({ lan }) => {
  if (lan) {
    return (
      <>
        <div>
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
      </>
    );
  }
};
export default Links;
