import styles from "./DropDownCard.module.css";
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
            <div
              className="title"
              style={{ cursor: "pointer", textTransform: "uppercase" }}
              onClick={handleClick}
            >
              <span className="h2">
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
              <hr className={showCard ? "hr-bottom-show" : "hr-bottom"} />
            </div>
          </div>
        </div>
      </dropDownContext.Provider>
    </>
  );
}
