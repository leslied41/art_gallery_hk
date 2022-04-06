import styles from "./HalfWordsLayout.module.css";
import { useRouter } from "next/router";
import { usePortableText } from "../usehooks/usePortableText.js";
const WordsLayout = ({
  introduction,
  introduction_cn,
  index,
  getIndex,
  work_parameter,
  buttons,
}) => {
  const router = useRouter();
  const intro_portableText = usePortableText(
    router.locale == "en" ? introduction : introduction_cn
  );
  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <div className="h3" style={{ textAlign: "center" }}>
            {(introduction || introduction_cn) && intro_portableText}
          </div>
          <div className="btns">
            {buttons &&
              buttons.map((btn, index) => {
                const { button_link, PDF, button_name } = btn;
                return (
                  <a
                    key={index}
                    href={
                      PDF
                        ? PDF
                          ? PDF
                          : null
                        : button_link
                        ? button_link
                        : null
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="exhibition_btn">{button_name}</button>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default WordsLayout;
