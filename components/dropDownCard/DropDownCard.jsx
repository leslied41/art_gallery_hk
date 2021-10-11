import styles from "./DropDownCard.module.css";
import { useState } from "react";
import BlockContent from "@sanity/block-content-to-react";

export default function DropDownCard({ data }) {
  const { name, content } = data[0];
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
              {name} +
            </span>
          </div>
          <div>{showCard || <hr className="hr" />}</div>
          <div className={styles.content}>
            {showCard && (
              <span className="h3">
                <BlockContent
                  blocks={content}
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
