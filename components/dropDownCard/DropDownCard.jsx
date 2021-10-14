import styles from "./DropDownCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useState, useContext } from "react";
import { I18nContext } from "react-i18next";
import { i18n } from "next-i18next";

export default function DropDownCard({ data }) {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  let Name;
  let Content;

  const { name, name_cn, content, content_cn } = data[0];

  if (i18n.language === "en") {
    Name = name;
    Content = content;
  } else if (i18n.language === "tc") {
    Name = name_cn;
    Content = content_cn;
  }
  const [showCard, setshowCard] = useState(false);
  const handleClick = () => {
    setshowCard(!showCard);
  };
  return (
    <>
      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          <div className="title">
            <span className="h2" onClick={handleClick}>
              {Name} +
            </span>
          </div>
          <div>{showCard || <hr className="hr-top" />}</div>
          <div className={styles.content}>
            {showCard && (
              <span className="h3">
                <BlockContent
                  blocks={Content}
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </span>
            )}
          </div>
          <div>{showCard && <hr className="hr-bottom" />}</div>
        </div>
      </div>
    </>
  );
}
