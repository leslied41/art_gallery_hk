import styles from "./AuthorCard.module.css";
import { useRouter } from "next/router";

const AuthorCard = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <div>
            <span className="h1" style={{ textTransform: "uppercase" }}>
              {router.locale === "en" ? "Site Credits" : "設計師及開發者"}
            </span>
          </div>
          <div>
            <div className={styles.gap}>
              <span className="h3">
                <p>
                  {router.locale == "en" ? "Web Design:" : "網站設計師:"}{" "}
                  <a
                    href="https://antony-wong.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Antony Wong
                  </a>
                </p>
                <p>
                  {router.locale == "en" ? "Web Developer:" : "網站開發者:"}{" "}
                  Zhonghui Duan at Funkie Loopie
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthorCard;
