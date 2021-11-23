import styles from "./DropDownCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";

export const dropDownContext = React.createContext();
export default function DropDownCard({ children, title }) {
  const router = useRouter();
  const [showCard, setshowCard] = useState(false);
  const handleClick = () => {
    setshowCard(!showCard);
  };

  return (
    <>
      <dropDownContext.Provider value={{ showCard, setshowCard }}>
        <div className={styles.grid}>
          <div className="col"></div>
          <div className="col">
            <div className="title">
              <span className="h2" onClick={handleClick}>
                {title} {showCard ? "-" : "+"}
              </span>
            </div>
          </div>
        </div>
        {children}
        <div className={styles.grid}>
          <div className="col"></div>
          <div className="col">
            <div>
              <hr
                className="hr-bottom"
                style={
                  showCard ? { marginTop: "130px" } : { marginTop: "28px" }
                }
              />
            </div>
          </div>
        </div>
      </dropDownContext.Provider>
    </>
  );
}
